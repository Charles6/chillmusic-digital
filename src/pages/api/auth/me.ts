import type { APIRoute } from "astro";
import { parseCookieToken, getSession } from "../../../lib/auth";

export const GET: APIRoute = async ({ request, locals }) => {
  const env = locals.runtime?.env;
  const token = parseCookieToken(request.headers.get("cookie"));
  const session = await getSession(env?.CACHE ?? null, token);

  if (!session) {
    return new Response(JSON.stringify({ user: null }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ user: { email: session.email, userId: session.userId } }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
};
