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

// GET /api/sketches/:id
export const GET: APIRoute = async ({ params, request }) => {
  if (!env.DB || !env.CACHE) {
    return json({ error: "Service unavailable" }, 503);
  }

  const session = await getSession(env.CACHE, parseCookieToken(request.headers.get("cookie")));
  if (!session) {
    return json({ error: "Not authenticated" }, 401);
  }

  const id = params.id;
  if (!id) {
    return json({ error: "Missing sketch id" }, 400);
  }

  const row = await env.DB.prepare(
    "SELECT id, name, code, settings, created_at, updated_at FROM sketches WHERE id = ? AND user_id = ?",
  )
    .bind(id, session.userId)
    .first<SketchRow>();

  if (!row) {
    return json({ error: "Sketch not found" }, 404);
  }

  return json(
    {
      sketch: {
        id: row.id,
        name: row.name,
        code: row.code,
        settings: parseStoredSettings(row.settings),
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      },
    },
    200,
  );
};

// PUT /api/sketches/:id — rename or update code
export const PUT: APIRoute = async ({ params, request }) => {
  if (!env.DB || !env.CACHE) {
    return json({ error: "Service unavailable" }, 503);
  }

  const session = await getSession(env.CACHE, parseCookieToken(request.headers.get("cookie")));
  if (!session) {
    return json({ error: "Not authenticated" }, 401);
  }

  const id = params.id;
  if (!id) {
    return json({ error: "Missing sketch id" }, 400);
  }

  let body: { name?: string; code?: string; settings?: unknown };
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  const existing = await env.DB.prepare(
    "SELECT id, name, code, settings, created_at, updated_at FROM sketches WHERE id = ? AND user_id = ?",
  )
    .bind(id, session.userId)
    .first<SketchRow>();

  if (!existing) {
    return json({ error: "Sketch not found" }, 404);
  }

  const name = body.name !== undefined ? body.name.trim() : existing.name;
  const code = body.code !== undefined ? body.code : existing.code;

  if (!name) {
    return json({ error: "Name is required" }, 400);
  }
  if (name.length > 120) {
    return json({ error: "Name must be 120 characters or fewer" }, 400);
  }
  if (code.length > 100_000) {
    return json({ error: "Code is too large" }, 413);
  }

  const now = Date.now();
  let settings = existing.settings;
  if (body.settings !== undefined) {
    try {
      settings = serializeSettings(body.settings);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Invalid settings";
      return json({ error: message }, message.includes("large") ? 413 : 400);
    }
  }

  await env.DB.prepare(
    "UPDATE sketches SET name = ?, code = ?, settings = ?, updated_at = ? WHERE id = ? AND user_id = ?",
  )
    .bind(name, code, settings, now, id, session.userId)
    .run();

  return json(
    {
      sketch: {
        id,
        name,
        code,
        createdAt: existing.created_at,
        updatedAt: now,
        settings: parseStoredSettings(settings),
      },
    },
    200,
  );
};

// DELETE /api/sketches/:id
export const DELETE: APIRoute = async ({ params, request }) => {
  if (!env.DB || !env.CACHE) {
    return json({ error: "Service unavailable" }, 503);
  }

  const session = await getSession(env.CACHE, parseCookieToken(request.headers.get("cookie")));
  if (!session) {
    return json({ error: "Not authenticated" }, 401);
  }

  const id = params.id;
  if (!id) {
    return json({ error: "Missing sketch id" }, 400);
  }

  const result = await env.DB.prepare(
    "DELETE FROM sketches WHERE id = ? AND user_id = ?",
  )
    .bind(id, session.userId)
    .run();

  if (!result.meta.changes) {
    return json({ error: "Sketch not found" }, 404);
  }

  return json({ ok: true }, 200);
};

function json(body: object, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}
