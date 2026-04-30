/// <reference types="astro/client" />
/// <reference types="@cloudflare/workers-types" />

interface Env {
  DB: D1Database;
  CACHE: KVNamespace;
  SESSION_TTL_SECONDS: string;
  NEWS_CACHE_TTL_SECONDS: string;
}

type Runtime = import("@astrojs/cloudflare").Runtime<Env>;

declare namespace App {
  interface Locals extends Runtime {}
}
