// Post-processes the wrangler.json that @astrojs/cloudflare@13 generates in
// dist/server/ before deployment. Fixes three issues:
//
//  1. SESSION KV binding is auto-added by the adapter even though this app
//     uses its own session system (via the CACHE binding). Remove it so
//     wrangler deploy doesn't complain about a binding with no ID.
//
//  2. CACHE appears twice due to a merge quirk in the adapter. Deduplicate
//     by keeping the first occurrence of each binding name.
//
//  3. IMAGES binding is added for compile-time image optimization support,
//     which this app doesn't use. Remove it to avoid spurious binding errors.

import { readFileSync, writeFileSync } from "fs";

const path = "dist/server/wrangler.json";
const cfg = JSON.parse(readFileSync(path, "utf8"));

// Remove bindings the app doesn't use, then deduplicate by name.
const seen = new Set();
cfg.kv_namespaces = (cfg.kv_namespaces ?? []).filter((kv) => {
  if (kv.binding === "SESSION") return false;
  if (seen.has(kv.binding)) return false;
  seen.add(kv.binding);
  return true;
});

// IMAGES binding — not used.
delete cfg.images;

writeFileSync(path, JSON.stringify(cfg, null, 2));
console.log("dist/server/wrangler.json cleaned.");
