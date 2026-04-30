import type { APIRoute } from "astro";
import { parseCookieToken, deleteSession, buildClearCookie } from "../../../lib/auth";

export const POST: APIRoute = async ({ request, locals }) => {
  const env = locals.runtime?.env;
  const token = parseCookieToken(request.headers.get("cookie"));

  if (token && env?.CACHE) {
    await deleteSession(env.CACHE, token);
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      "content-type": "application/json",
      "set-cookie": buildClearCookie(),
    },
  });
};
