# Chill Music Digital

A browser-based generative music composer built with Astro, React, and Strudel. Toggle layers, tweak parameters, and let it run in the background while a zen mode shows the time, local weather, and rotating world headlines.

---

## How the app works

The main interface is a **Layer Builder** — a set of independent music layers you can enable, mute, reorder, and tune in real time. As you make changes the app compiles all active layers into a single Strudel `stack()` expression and sends it live to the audio engine, so the music updates without stopping.

### Layers

Eight layers cover the building blocks of a chill/lofi/ambient mix:

| Layer | Category | What it does |
|---|---|---|
| Kick | Drums | Sparse warm kick (Roland TR-707, 4-bar feel) |
| Snare / Rim | Drums | Backbeat on 2 & 4 |
| Hats | Drums | Crushed hi-hats with random drops for organic feel |
| Percussion | Drums | Euclidean shaker pattern — adds swing without clutter |
| Bass | Bass | Filtered sawtooth root bass, soft attack |
| Chords | Harmony | Slow chord pad with long reverb tail |
| Melody | Melody | Sparse arpeggiated line with dotted-eighth delay |
| Texture | FX | Vinyl crackle noise — constant warmth underneath |

All layers are tuned to **85 BPM, C major** (Cmaj7 → Am7 → Fmaj7 → G7). Layers route to four independent FX buses via `.orbit()` so reverb and delay tails don't bleed into each other.

### Arrangements

Three presets load a curated subset of layers:

- **Lofi Beats** — kick, snare, hats, bass, chords
- **Ambient Wash** — chords, melody, texture (no drums)
- **Full Vibe** — all eight layers

### Zen mode

A full-screen overlay that shows:
- A large digital clock
- Local weather (fetched via browser geolocation → `/api/weather`)
- Rotating headlines from Reuters, BBC, and AP (fetched from `/api/news`, cached in KV)

### Generated code

The Layer Builder always displays the Strudel code it compiled from the current layer state. You can copy it, save it to your account, or paste it directly into any Strudel environment.

---

## Accounts and saved sketches

Users register with a **username and password** — no email required. Once signed in, named sketches (Strudel code text) can be saved and browsed later.

### How auth works

- Passwords are hashed with **PBKDF2-SHA256** (100 000 iterations, random salt) via the Web Crypto API — the raw password never touches the database.
- On login a **random 32-byte session token** is generated, stored in Cloudflare KV with a 7-day TTL, and sent to the browser as an `HttpOnly; Secure; SameSite=Lax` cookie (`chm_session`).
- All subsequent API calls read the cookie and look up the session in KV. No JWTs, no server-side state beyond KV.

### Database schema

Two tables in Cloudflare D1:

```
users    — id, username (unique), password_hash, created_at
sketches — id, user_id (→ users), name, code, created_at, updated_at
```

Sketches store only the generated Strudel code string — not layer state. Use the Load modal to copy saved code back into your own Strudel setup.

### API routes

| Method | Path | What it does |
|---|---|---|
| POST | `/api/auth/register` | Create account (username 3–32 chars, password ≥ 8 chars) |
| POST | `/api/auth/login` | Sign in, set session cookie |
| POST | `/api/auth/logout` | Clear session cookie and delete token from KV |
| GET | `/api/auth/me` | Return `{username, userId}` for the current session |
| GET | `/api/sketches` | List all sketches for the signed-in user |
| POST | `/api/sketches` | Save a new sketch `{name, code}` |
| GET | `/api/sketches/:id` | Fetch a single sketch |
| PUT | `/api/sketches/:id` | Rename or update code |
| DELETE | `/api/sketches/:id` | Delete a sketch |

---

## Running locally

The dev server runs the full Cloudflare Workers runtime locally via the Astro Cloudflare adapter's platform proxy, so D1, KV, and environment variables all behave exactly as they do in production.

### Prerequisites

- Node.js ≥ 22.12.0 (the project ships a `.nvmrc` with `24` — run `nvm use` if you have nvm)
- A Cloudflare account (free tier is fine)

### First-time setup

**1. Install dependencies**

```bash
npm install
```

**2. Log into Cloudflare**

```bash
npx wrangler login
```

**3. Create Cloudflare resources**

```bash
# Create the D1 database — copy the printed database_id into wrangler.toml
npx wrangler d1 create chillmusic

# Create the KV namespace — copy the printed id into wrangler.toml
npx wrangler kv namespace create CACHE
```

Paste the two IDs into `wrangler.toml`:

```toml
[[d1_databases]]
binding = "DB"
database_name = "chillmusic"
database_id = "<paste here>"

[[kv_namespaces]]
binding = "CACHE"
id = "<paste here>"
```

**4. Apply the schema**

```bash
# Local (offline dev — no Cloudflare account needed after this):
npx wrangler d1 execute chillmusic --local --file=schema.sql

# Remote (applies to the live D1 database):
npx wrangler d1 execute chillmusic --remote --file=schema.sql
```

> **Warning:** `schema.sql` drops and recreates all tables. Running it against the remote database will wipe existing accounts and sketches.

**5. Start the dev server**

```bash
npm run dev
```

App is available at `http://localhost:4321`.

### Dev commands

| Command | Description |
|---|---|
| `npm run dev` | Start local dev server with live Cloudflare bindings |
| `npm run build` | Production build (outputs to `dist/`) |
| `npm run preview` | Preview the production build locally |

---

## Cloudflare deployment

### How it's deployed

The app deploys as a **Cloudflare Worker with static assets** (Workers + Assets model), not as a Pages project. The build produces:

- `dist/server/` — the Worker entry point (`entry.mjs`) and `wrangler.json`
- `dist/client/` — static assets served by the Assets binding

A post-build script (`scripts/fix-wrangler-output.mjs`) cleans up the generated `wrangler.json` before deploy: it removes bindings the adapter auto-adds that this app doesn't use (SESSION, IMAGES) and strips the `pages_build_output_dir` field that would otherwise put wrangler into Pages mode.

Pushes to `main` deploy automatically via GitHub Actions (`.github/workflows/deploy.yml`).

### Required GitHub secrets

| Secret | Where to get it |
|---|---|
| `CLOUDFLARE_API_TOKEN` | dash.cloudflare.com → Profile → API Tokens → Create Token using the **"Edit Cloudflare Workers"** template |
| `CLOUDFLARE_ACCOUNT_ID` | Right sidebar of the Cloudflare dashboard homepage |

The API token must have **Workers Scripts: Edit** and **Workers KV Storage: Edit** permissions. The Pages "Edit" template is not sufficient.

### Manual deploy

```bash
npm run build
cd dist/server && npx wrangler deploy
```

### Custom domain

After the first successful deploy, go to **Cloudflare dashboard → Workers & Pages → chillmusic-digital → Settings → Domains & Routes → Add Custom Domain** and enter your domain. Cloudflare manages the DNS record automatically if the domain is already proxied through Cloudflare.

### Cloudflare bindings

The Worker uses two bindings configured in `wrangler.toml`:

| Binding | Type | Purpose |
|---|---|---|
| `DB` | D1 database | Stores users and sketches |
| `CACHE` | KV namespace | Stores session tokens and news cache |

Environment variables (`SESSION_TTL_SECONDS`, `NEWS_CACHE_TTL_SECONDS`) are also set in `wrangler.toml` under `[vars]`.
