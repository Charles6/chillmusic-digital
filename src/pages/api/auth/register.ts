import type { APIRoute } from "astro";
import { hashPassword, createSession, buildSetCookie } from "../../../lib/auth";

export const POST: APIRoute = async ({ request, locals }) => {
  const env = locals.runtime?.env;
  if (!env?.DB || !env?.CACHE) {
    return json({ error: "Service unavailable" }, 503);
  }

  let body: { email?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  const email = (body.email ?? "").trim().toLowerCase();
  const password = body.password ?? "";

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: "A valid email is required" }, 400);
  }
  if (password.length < 8) {
    return json({ error: "Password must be at least 8 characters" }, 400);
  }

  const existing = await env.DB.prepare("SELECT id FROM users WHERE email = ?")
    .bind(email)
    .first();
  if (existing) {
    return json({ error: "An account with that email already exists" }, 409);
  }

  const passwordHash = await hashPassword(password);
  const userId = crypto.randomUUID();
  const now = Date.now();

  await env.DB.prepare(
    "INSERT INTO users (id, email, password_hash, created_at) VALUES (?, ?, ?, ?)",
  )
    .bind(userId, email, passwordHash, now)
    .run();

  const ttl = Number(env.SESSION_TTL_SECONDS ?? 604800);
  const token = await createSession(env.CACHE, userId, email, ttl);

  return new Response(JSON.stringify({ email, userId }), {
    status: 201,
    headers: {
      "content-type": "application/json",
      "set-cookie": buildSetCookie(token, ttl),
    },
  });
};

function json(body: object, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}
