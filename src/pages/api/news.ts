import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";
import { getNews } from "../../lib/news";

export const GET: APIRoute = async () => {
  const kv = env.CACHE ?? null;
  const ttl = Number(env.NEWS_CACHE_TTL_SECONDS ?? 300);

  try {
    const items = await getNews(kv, ttl);
    return new Response(JSON.stringify(items), {
      status: 200,
      headers: {
        "content-type": "application/json",
        // Allow the CDN edge cache to serve this for up to the TTL too
        "cache-control": `public, max-age=${ttl}`,
      },
    });
  } catch {
    return new Response(JSON.stringify([]), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  }
};
