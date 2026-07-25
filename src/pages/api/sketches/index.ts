import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";
import { parseCookieToken, getSession } from "../../../lib/auth";
import { parseStoredSettings, serializeSettings } from "../../../lib/sketchPersistence";

interface SketchRow {
  id: string;
  name: string;
  code: string;
  settings: string | null;
  created_at: number;
  updated_at: number;
}

function serialize(row: SketchRow) {
  return {
    id: row.id,
    name: row.name,
    code: row.code,
    settings: parseStoredSettings(row.settings),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

// GET /api/sketches — list all sketches for the current user
export const GET: APIRoute = async ({ request }) => {
  if (!env.DB || !env.CACHE) {
    return json({ error: "Service unavailable" }, 503);
  }

  const session = await getSession(env.CACHE, parseCookieToken(request.headers.get("cookie")));
  if (!session) {
    return json({ error: "Not authenticated" }, 401);
  }

  const result = await env.DB.prepare(
    "SELECT id, name, code, settings, created_at, updated_at FROM sketches WHERE user_id = ? ORDER BY updated_at DESC",
  )
    .bind(session.userId)
    .all<SketchRow>();

  return json({ sketches: (result.results ?? []).map(serialize) }, 200);
};

// POST /api/sketches — create a new sketch
export const POST: APIRoute = async ({ request }) => {
  if (!env.DB || !env.CACHE) {
    return json({ error: "Service unavailable" }, 503);
  }

  const session = await getSession(env.CACHE, parseCookieToken(request.headers.get("cookie")));
  if (!session) {
    return json({ error: "Not authenticated" }, 401);
  }

  let body: { name?: string; code?: string; settings?: unknown };
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  const name = (body.name ?? "").trim();
  const code = body.code ?? "";

  if (!name) {
    return json({ error: "Name is required" }, 400);
  }
  if (name.length > 120) {
    return json({ error: "Name must be 120 characters or fewer" }, 400);
  }
  if (code.length > 100_000) {
    return json({ error: "Code is too large" }, 413);
  }
  let settings: string | null;
  try {
    settings = serializeSettings(body.settings);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid settings";
    return json({ error: message }, message.includes("large") ? 413 : 400);
  }

  const id = crypto.randomUUID();
  const now = Date.now();

  await env.DB.prepare(
    "INSERT INTO sketches (id, user_id, name, code, settings, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
  )
    .bind(id, session.userId, name, code, settings, now, now)
    .run();

  return json(
    {
      sketch: {
        id,
        name,
        code,
        settings: parseStoredSettings(settings),
        createdAt: now,
        updatedAt: now,
      },
    },
    201,
  );
};

function json(body: object, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}
