// URL-fragment serialization for shareable sketch state.
//
// Encoded payload (kept short — it lives in the URL):
//   { v: 1, b: bpm, k: keyId, p: progressionId,
//     l: [{ id, e: enabled, m: muted, o: order, p: params }, ...] }

const VERSION = 1;
const HASH_KEY = "s";

function base64urlEncode(str) {
  const b64 = typeof btoa === "function"
    ? btoa(unescape(encodeURIComponent(str)))
    : Buffer.from(str, "utf8").toString("base64");
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64urlDecode(str) {
  const padded = str.replace(/-/g, "+").replace(/_/g, "/") +
    "===".slice((str.length + 3) % 4);
  const b64 = typeof atob === "function"
    ? decodeURIComponent(escape(atob(padded)))
    : Buffer.from(padded, "base64").toString("utf8");
  return b64;
}

export function encodeState({ context, layers }) {
  const payload = {
    v: VERSION,
    b: context.bpm,
    k: context.keyId,
    p: context.progressionId,
    l: layers.map((layer) => ({
      id: layer.id,
      e: layer.enabled ? 1 : 0,
      m: layer.muted ? 1 : 0,
      o: layer.order,
      p: layer.params,
    })),
  };
  return base64urlEncode(JSON.stringify(payload));
}

export function decodeState(encoded) {
  try {
    const obj = JSON.parse(base64urlDecode(encoded));
    if (!obj || obj.v !== VERSION) return null;
    return obj;
  } catch {
    return null;
  }
}

export function readHashState() {
  if (typeof window === "undefined") return null;
  const hash = window.location.hash.replace(/^#/, "");
  if (!hash) return null;
  const params = new URLSearchParams(hash);
  const encoded = params.get(HASH_KEY);
  if (!encoded) return null;
  return decodeState(encoded);
}

export function writeHashState(state) {
  if (typeof window === "undefined") return;
  const encoded = encodeState(state);
  const params = new URLSearchParams();
  params.set(HASH_KEY, encoded);
  const next = `#${params.toString()}`;
  if (window.location.hash !== next) {
    history.replaceState(null, "", `${window.location.pathname}${window.location.search}${next}`);
  }
}

export function shareUrl(state) {
  if (typeof window === "undefined") return "";
  const encoded = encodeState(state);
  return `${window.location.origin}${window.location.pathname}#${HASH_KEY}=${encoded}`;
}

// Merge decoded layer overrides onto a fresh BUILTIN_LAYERS clone, ignoring
// unknown ids/params so future schema changes don't break old links.
export function applyDecodedLayers(baseLayers, decodedLayers) {
  if (!Array.isArray(decodedLayers)) return baseLayers;
  const byId = new Map(decodedLayers.map((d) => [d.id, d]));
  return baseLayers.map((layer) => {
    const d = byId.get(layer.id);
    if (!d) return layer;
    const params = { ...layer.params };
    if (d.p && typeof d.p === "object") {
      for (const key of Object.keys(layer.params)) {
        if (key in d.p) params[key] = d.p[key];
      }
    }
    return {
      ...layer,
      enabled: d.e ? true : false,
      muted: d.m ? true : false,
      order: typeof d.o === "number" ? d.o : layer.order,
      params,
    };
  });
}
