import { sendNotification, corsHeaders } from "./resend.js";
import { hashPassword, verifyPassword, randomId, initialsFrom } from "./crypto.js";
import {
  createSession,
  userFromRequest,
  publicUser,
  sessionCookie,
  clearSessionCookie,
  readCookie,
} from "./session.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders(),
      ...extraHeaders,
    },
  });
}

async function readJson(request) {
  try {
    return await request.json();
  } catch {
    return {};
  }
}

function redirect(location, headers = {}) {
  return new Response(null, {
    status: 302,
    headers: { Location: location, ...headers },
  });
}

function threadTitle(message) {
  const first = message.trim().split(/\n/)[0].trim();
  return first.length > 140 ? `${first.slice(0, 137)}…` : first;
}

async function notifyQuietly(env, payload) {
  try {
    await sendNotification(env, payload);
  } catch (err) {
    console.error(err);
  }
}

async function handleSubscribe(request, env) {
  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);
  const { email } = await readJson(request);
  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return json({ error: "Valid email required" }, 400);
  }
  const normalized = email.trim().toLowerCase();
  await env.DB.prepare("INSERT OR IGNORE INTO subscribers (email, created_at) VALUES (?, ?)")
    .bind(normalized, new Date().toISOString())
    .run();
  await notifyQuietly(env, {
    subject: "else{where} — new newsletter signup",
    text: `New signup: ${normalized}`,
  });
  return json({ ok: true });
}

async function listThreads(env) {
  const { results } = await env.DB.prepare(
    `SELECT t.id, t.author_name AS authorName, t.author_initials AS authorInitials,
            t.title, t.body, t.created_at AS createdAt,
            (SELECT COUNT(*) FROM replies r WHERE r.thread_id = t.id) AS replyCount
     FROM threads t
     ORDER BY t.created_at DESC`,
  ).all();
  return json({ ok: true, threads: results ?? [] });
}

async function getThread(env, id) {
  const thread = await env.DB.prepare(
    `SELECT id, author_name AS authorName, author_initials AS authorInitials,
            title, body, created_at AS createdAt
     FROM threads WHERE id = ?`,
  )
    .bind(id)
    .first();
  if (!thread) return json({ error: "Not found" }, 404);
  const { results } = await env.DB.prepare(
    `SELECT id, author_name AS authorName, author_initials AS authorInitials,
            body, created_at AS createdAt
     FROM replies WHERE thread_id = ? ORDER BY created_at ASC`,
  )
    .bind(id)
    .all();
  return json({ ok: true, thread, replies: results ?? [] });
}

async function createThread(request, env) {
  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);
  const { message, name } = await readJson(request);
  if (typeof message !== "string" || message.trim().length === 0) {
    return json({ error: "Message required" }, 400);
  }
  const user = await userFromRequest(env, request);
  const authorName = user?.displayName || (typeof name === "string" && name.trim()) || "visitor";
  const authorInitials = user?.initials || initialsFrom(authorName, user?.email);
  const body = message.trim();
  const id = randomId();
  await env.DB.prepare(
    `INSERT INTO threads (id, author_name, author_initials, title, body, created_at)
     VALUES (?, ?, ?, ?, ?, ?)`,
  )
    .bind(id, authorName, authorInitials, threadTitle(body), body, new Date().toISOString())
    .run();
  await notifyQuietly(env, {
    subject: "else{where} — new community thread",
    text: `${authorName}: ${body}`,
  });
  return json({ ok: true, id });
}

async function createReply(request, env, threadId) {
  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);
  const thread = await env.DB.prepare("SELECT id FROM threads WHERE id = ?").bind(threadId).first();
  if (!thread) return json({ error: "Not found" }, 404);
  const { body, name } = await readJson(request);
  if (typeof body !== "string" || body.trim().length === 0) {
    return json({ error: "Message required" }, 400);
  }
  const user = await userFromRequest(env, request);
  const authorName = user?.displayName || (typeof name === "string" && name.trim()) || "visitor";
  const authorInitials = user?.initials || initialsFrom(authorName, user?.email);
  const id = randomId();
  await env.DB.prepare(
    `INSERT INTO replies (id, thread_id, author_name, author_initials, body, created_at)
     VALUES (?, ?, ?, ?, ?, ?)`,
  )
    .bind(id, threadId, authorName, authorInitials, body.trim(), new Date().toISOString())
    .run();
  return json({ ok: true, id });
}

async function handleLogin(request, env) {
  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);
  const { email, password } = await readJson(request);
  if (typeof email !== "string" || !EMAIL_RE.test(email) || typeof password !== "string") {
    return json({ error: "Email and password required" }, 400);
  }
  const row = await env.DB.prepare(
    "SELECT id, email, password_hash, display_name AS displayName, initials FROM users WHERE email = ?",
  )
    .bind(email.trim().toLowerCase())
    .first();
  if (!row?.password_hash || !(await verifyPassword(password, row.password_hash))) {
    return json({ error: "Could not sign in" }, 401);
  }
  const sessionId = await createSession(env, row.id);
  return json({ ok: true, user: publicUser(row) }, 200, {
    "Set-Cookie": sessionCookie(sessionId, request),
  });
}

async function handleRequestAccess(request, env) {
  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);
  const { email, password, name } = await readJson(request);
  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return json({ error: "Valid email required" }, 400);
  }
  if (typeof password !== "string" || password.length < 8) {
    return json({ error: "Password must be at least 8 characters" }, 400);
  }
  const normalized = email.trim().toLowerCase();
  const displayName =
    (typeof name === "string" && name.trim()) || normalized.split("@")[0];
  const existing = await env.DB.prepare("SELECT id FROM users WHERE email = ?")
    .bind(normalized)
    .first();
  if (existing) return json({ error: "An account with that email already exists" }, 409);

  const id = randomId();
  await env.DB.prepare(
    `INSERT INTO users (id, email, password_hash, display_name, initials, created_at)
     VALUES (?, ?, ?, ?, ?, ?)`,
  )
    .bind(
      id,
      normalized,
      await hashPassword(password),
      displayName,
      initialsFrom(displayName, normalized),
      new Date().toISOString(),
    )
    .run();
  await notifyQuietly(env, {
    subject: "else{where} — access request",
    text: `New account: ${displayName} <${normalized}>`,
  });
  const sessionId = await createSession(env, id);
  const user = await env.DB.prepare(
    "SELECT id, email, display_name AS displayName, initials FROM users WHERE id = ?",
  )
    .bind(id)
    .first();
  return json({ ok: true, user: publicUser(user) }, 200, {
    "Set-Cookie": sessionCookie(sessionId, request),
  });
}

async function handleLogout(request, env) {
  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);
  const id = readCookie(request);
  if (id) await env.DB.prepare("DELETE FROM sessions WHERE id = ?").bind(id).run();
  return json({ ok: true }, 200, { "Set-Cookie": clearSessionCookie(request) });
}

async function handleMe(request, env) {
  const user = await userFromRequest(env, request);
  return json({ ok: true, user: user ? publicUser(user) : null });
}

async function startGithub(request, env) {
  if (!env.GITHUB_CLIENT_ID) {
    return redirect("/login?error=github");
  }
  const state = randomId();
  const url = new URL("https://github.com/login/oauth/authorize");
  url.searchParams.set("client_id", env.GITHUB_CLIENT_ID);
  url.searchParams.set("redirect_uri", new URL("/api/auth/github/callback", request.url).href);
  url.searchParams.set("scope", "read:user user:email");
  url.searchParams.set("state", state);
  const secure = new URL(request.url).protocol === "https:" ? "; Secure" : "";
  return redirect(url.href, {
    "Set-Cookie": `elsewhere_oauth=${state}; HttpOnly; Path=/; SameSite=Lax; Max-Age=600${secure}`,
  });
}

async function finishGithub(request, env) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code") || "";
  const state = url.searchParams.get("state") || "";
  const expected = readCookie(request, "elsewhere_oauth");
  if (!env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET || !code || !state || state !== expected) {
    return redirect("/login?error=github");
  }

  const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: new URL("/api/auth/github/callback", request.url).href,
    }),
  });
  const tokenBody = await tokenRes.json().catch(() => ({}));
  if (!tokenBody.access_token) return redirect("/login?error=github");

  const ghHeaders = {
    Authorization: `Bearer ${tokenBody.access_token}`,
    Accept: "application/vnd.github+json",
    "User-Agent": "elsewhere-lab",
  };
  const profile = await fetch("https://api.github.com/user", { headers: ghHeaders }).then((r) =>
    r.json(),
  );
  const emails = await fetch("https://api.github.com/user/emails", { headers: ghHeaders }).then((r) =>
    r.json(),
  );
  const primary = Array.isArray(emails)
    ? emails.find((e) => e.primary && e.verified)?.email || emails.find((e) => e.verified)?.email
    : "";
  const email = (primary || profile.email || "").toLowerCase();
  if (!email) return redirect("/login?error=github");

  const githubId = String(profile.id);
  let user = await env.DB.prepare(
    "SELECT id, email, display_name AS displayName, initials FROM users WHERE github_id = ? OR email = ?",
  )
    .bind(githubId, email)
    .first();

  if (!user) {
    const id = randomId();
    const displayName = profile.name || profile.login || email.split("@")[0];
    await env.DB.prepare(
      `INSERT INTO users (id, email, github_id, display_name, initials, created_at)
       VALUES (?, ?, ?, ?, ?, ?)`,
    )
      .bind(id, email, githubId, displayName, initialsFrom(displayName, email), new Date().toISOString())
      .run();
    user = { id, email, displayName, initials: initialsFrom(displayName, email) };
  } else if (!user.github_id) {
    await env.DB.prepare("UPDATE users SET github_id = ? WHERE id = ?").bind(githubId, user.id).run();
  }

  const sessionId = await createSession(env, user.id);
  const secure = url.protocol === "https:" ? "; Secure" : "";
  const headers = new Headers({ Location: "/community" });
  headers.append("Set-Cookie", sessionCookie(sessionId, request));
  headers.append("Set-Cookie", `elsewhere_oauth=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0${secure}`);
  return new Response(null, { status: 302, headers });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (!url.pathname.startsWith("/api/")) {
      return new Response("Not found", { status: 404 });
    }

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders() });
    }

    if (url.pathname === "/api/subscribe") return handleSubscribe(request, env);
    if (url.pathname === "/api/threads" && request.method === "GET") return listThreads(env);
    if (url.pathname === "/api/thread") return createThread(request, env);

    const threadMatch = url.pathname.match(/^\/api\/threads\/([^/]+)$/);
    if (threadMatch) return getThread(env, threadMatch[1]);

    const replyMatch = url.pathname.match(/^\/api\/threads\/([^/]+)\/replies$/);
    if (replyMatch) return createReply(request, env, replyMatch[1]);

    if (url.pathname === "/api/login") return handleLogin(request, env);
    if (url.pathname === "/api/logout") return handleLogout(request, env);
    if (url.pathname === "/api/request-access") return handleRequestAccess(request, env);
    if (url.pathname === "/api/me") return handleMe(request, env);
    if (url.pathname === "/api/auth/github") return startGithub(request, env);
    if (url.pathname === "/api/auth/github/callback") return finishGithub(request, env);

    return json({ error: "Not found" }, 404);
  },
};
