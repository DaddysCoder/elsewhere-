import { randomId } from "./crypto.js";

const COOKIE = "elsewhere_session";
const TTL_MS = 30 * 24 * 60 * 60 * 1000;

export function readCookie(request, name = COOKIE) {
  const raw = request.headers.get("Cookie") || "";
  const parts = raw.split(";").map((p) => p.trim());
  for (const part of parts) {
    if (part.startsWith(`${name}=`)) return decodeURIComponent(part.slice(name.length + 1));
  }
  return "";
}

export function sessionCookie(id, request) {
  const secure = new URL(request.url).protocol === "https:" ? "; Secure" : "";
  return `${COOKIE}=${encodeURIComponent(id)}; HttpOnly; Path=/; SameSite=Lax; Max-Age=${Math.floor(TTL_MS / 1000)}${secure}`;
}

export function clearSessionCookie(request) {
  const secure = new URL(request.url).protocol === "https:" ? "; Secure" : "";
  return `${COOKIE}=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0${secure}`;
}

export async function createSession(env, userId) {
  const id = randomId();
  const expires = new Date(Date.now() + TTL_MS).toISOString();
  await env.DB.prepare("INSERT INTO sessions (id, user_id, expires_at) VALUES (?, ?, ?)")
    .bind(id, userId, expires)
    .run();
  return id;
}

export async function userFromRequest(env, request) {
  const id = readCookie(request);
  if (!id) return null;
  const row = await env.DB.prepare(
    `SELECT users.id, users.email, users.display_name AS displayName, users.initials
     FROM sessions JOIN users ON users.id = sessions.user_id
     WHERE sessions.id = ? AND sessions.expires_at > ?`,
  )
    .bind(id, new Date().toISOString())
    .first();
  return row || null;
}

export function publicUser(row) {
  return {
    id: row.id,
    email: row.email,
    displayName: row.displayName,
    initials: row.initials,
  };
}
