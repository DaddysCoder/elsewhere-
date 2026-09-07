import { sendNotification, corsHeaders } from "./resend.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders(),
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

async function handleSubscribe(request, env) {
  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const { email } = await readJson(request);
  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return json({ error: "Valid email required" }, 400);
  }

  try {
    await sendNotification(env, {
      subject: "else{where} — new newsletter signup",
      text: `New signup: ${email}`,
    });
    return json({ ok: true });
  } catch (err) {
    console.error(err);
    return json({ error: "Could not send notification" }, 502);
  }
}

async function handleThread(request, env) {
  if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const { message } = await readJson(request);
  if (typeof message !== "string" || message.trim().length === 0) {
    return json({ error: "Message required" }, 400);
  }

  try {
    await sendNotification(env, {
      subject: "else{where} — new community thread",
      text: message.trim(),
    });
    return json({ ok: true });
  } catch (err) {
    console.error(err);
    return json({ error: "Could not send notification" }, 502);
  }
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
    if (url.pathname === "/api/thread") return handleThread(request, env);

    return json({ error: "Not found" }, 404);
  },
};
