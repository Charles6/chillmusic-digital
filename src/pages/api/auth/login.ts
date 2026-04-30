import type { APIRoute } from "astro";
import {
  verifyPassword,
  createSession,
  buildSetCookie,
  parseCookieToken,
  getSession,
} from "../../../lib/auth";

export const POST: APIRoute = async ({ request, locals }) => {
  const env = locals.runtime?.env;
  if (!env?.DB || !env?.CACHE) {
    return json({ error: "Service unavailable" }, 503);
  }

  // If already logged in, short-circuit
  const existingToken = parseCookieToken(request.headers.get("cookie"));
  const existingSession = await getSession(env.CACHE, existingToken);
  if (existingSession) {
    return json({ email: existingSession.email, userId: existingSession.userId }, 200);
  }

  let body: { email?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  const email = (body.email ?? "").trim().toLowerCase();
  const password = body.password ?? "";

  if (!email || !password) {
    return json({ error: "Email and password are required" }, 400);
  }

  const user = await env.DB.prepare("SELECT id, password_hash FROM users WHERE email = ?")
    .bind(email)
    .first<{ id: string; password_hash: string }>();

  // Constant-time-ish: still run verifyPassword even on missing user to avoid timing attacks
  const passwordOk = user
    ? await verifyPassword(password, user.password_hash)
    : (await verifyPassword(password, "00:00"), false);

  if (!user || !passwordOk) {
    return json({ error: "Invalid email or password" }, 401);
  }

  const ttl = Number(env.SESSION_TTL_SECONDS ?? 604800);
  const token = await createSession(env.CACHE, user.id, email, ttl);

  return new Response(JSON.stringify({ email, userId: user.id }), {
    status: 200,
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
