import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";
import { parseCookieToken, getSession } from "../../../lib/auth";

export const GET: APIRoute = async ({ request }) => {
  const token = parseCookieToken(request.headers.get("cookie"));
  const session = await getSession(env.CACHE, token);

  if (!session) {
    return new Response(JSON.stringify({ user: null }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  }

  return new Response(
    JSON.stringify({ user: { username: session.username, userId: session.userId } }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    },
  );
};
