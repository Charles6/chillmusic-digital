import type { APIRoute } from "astro";
import { parseCookieToken, getSession } from "../../../lib/auth";

// GET /api/user/preferences — load saved preferences
export const GET: APIRoute = async ({ request, locals }) => {
  const env = locals.runtime?.env;
  const session = await getSession(env?.CACHE ?? null, parseCookieToken(request.headers.get("cookie")));

  if (!session) {
    return json({ error: "Not authenticated" }, 401);
  }

  const row = await env!.DB.prepare("SELECT bpm, active_layers, layer_params FROM preferences WHERE user_id = ?")
    .bind(session.userId)
    .first<{ bpm: number; active_layers: string; layer_params: string }>();

  if (!row) {
    return json({ preferences: null }, 200);
  }

  return json({
    preferences: {
      bpm: row.bpm,
      activeLayers: JSON.parse(row.active_layers),
      layerParams: JSON.parse(row.layer_params),
    },
  }, 200);
};

// PUT /api/user/preferences — save current preferences
export const PUT: APIRoute = async ({ request, locals }) => {
  const env = locals.runtime?.env;
  const session = await getSession(env?.CACHE ?? null, parseCookieToken(request.headers.get("cookie")));

  if (!session) {
    return json({ error: "Not authenticated" }, 401);
  }

  let body: { bpm?: number; activeLayers?: string[]; layerParams?: Record<string, unknown> };
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  const bpm = Number(body.bpm ?? 130);
  const activeLayers = JSON.stringify(body.activeLayers ?? []);
  const layerParams = JSON.stringify(body.layerParams ?? {});
  const now = Date.now();

  await env!.DB.prepare(`
    INSERT INTO preferences (user_id, bpm, active_layers, layer_params, updated_at)
    VALUES (?, ?, ?, ?, ?)
    ON CONFLICT(user_id) DO UPDATE SET
      bpm = excluded.bpm,
      active_layers = excluded.active_layers,
      layer_params = excluded.layer_params,
      updated_at = excluded.updated_at
  `)
    .bind(session.userId, bpm, activeLayers, layerParams, now)
    .run();

  return json({ ok: true }, 200);
};

function json(body: object, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}
