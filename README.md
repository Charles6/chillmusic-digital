# Chill Music Digital

A browser-based generative trance composer built with Astro, React, and Strudel. Build arrangements from live musical layers, sequence complete sections, shape the mix, and let it run while Zen mode shows the time, local weather, and rotating world headlines.

## Latest update

- Expanded the composer to 13 phrase-aware trance layers and six section presets.
- Added an editable song timeline, quantized preset launches, and a non-destructive Energy macro.
- Added per-layer gain and pan controls, a master headroom estimate, and complete save/share persistence for the performance state.
- Improved mix stability with gentler ducking onset, bounded supersaw unison, and safer Anthem Peak voicing.
- Reworked the interface for desktop, tablet, and mobile with larger touch targets and horizontally scrollable timeline sections.
- Added a reduced-motion-aware Zen transition: the two main panels slide apart like doors and return before the Zen screen unmounts.

---

## How the app works

The main interface is a **Layer Builder** — a set of independent music layers you can enable, mute, reorder, and tune in real time. As you make changes the app compiles all active layers into a single Strudel `stack()` expression and sends it live to the audio engine, so the music updates without stopping.

### Layers

Thirteen layers cover the rhythmic, harmonic, melodic, and structural roles of trance. One Strudel cycle equals one 4/4 bar, so fills and filter movements align to real 4-, 8-, and 16-bar phrases.

| Layer | Category | What it does |
|---|---|---|
| Four-on-the-Floor Kick | Drums | Quarter-note anchor plus sidechain-style ducking for the musical buses |
| Clap / Snare | Drums | Beats 2 and 4 with deterministic phrase-ending fills |
| Closed Hats | Drums | Accented 8th/16th-note propulsion with restrained humanization |
| Open Hat / Ride | Drums | Independent offbeat lift or peak-energy ride control |
| Percussion / Fill | Drums | Light 16-step Euclidean support and bar-8 punctuation |
| Rolling Bass Engine | Bass | Linked offbeat sub and short rolling mid-bass between kick hits |
| Wide Trance Pad | Harmony | One voice-led chord per bar with 16-bar filter movement |
| Gated Chord Pluck | Harmony | Rhythmic chord stabs in straight, offbeat, or syncopated gates |
| Sixteenth Arpeggio | Melody | Chord-tone motion with deterministic four-bar turns |
| Lead Hook | Melody | An eight-bar A/A′/B/A″ motif with controlled repetition and climax |
| Countermelody | Melody | Sparse answers placed in the lead hook's rests |
| Transitions | FX | Phrase-length noise rises and section-start crashes |
| Atmosphere | FX | High-passed stereo air without rhythmic clutter |

Defaults aim for **138 BPM, A minor** using `i → VI → III → VII` (Am → F → C → G). The kick and bass form one composite rhythmic engine: kick notes occupy the quarter-note downbeats while bass fills the intervening 16ths. The kick ducks bass, harmony, and melody orbits to keep the low end clear.

Harmony remains voice-led, while lead hooks now use chord tones on strong positions and stepwise scale tones between them. Random deletion is confined mainly to quiet percussion; important musical layers evolve through deterministic 4-, 8-, and 16-bar changes.

### Arrangements

Six section-aware presets load a curated layer set, tempo, progression, and tuned parameter mix:

- **DJ Intro** — mix-friendly kick, offbeat bass, sparse hats, atmosphere, and a 16-bar rise
- **Progressive Drive** — balanced rolling groove, pad, gated pluck, and arp without the lead
- **Airy Breakdown** — spacious pad, half-speed arp, call-and-response lead, and countermelody
- **Tension Build** — rolls, dense percussion, opening filters, and a strong riser before the drop
- **Anthem Peak** — the controlled full stack with hook, counterline, octave bass, pad, pluck, and arp
- **Afterglow** — resolved outro with gentler offbeat low end and fewer foreground events

### Performance workflow

- The **Song Timeline** chains editable preset sections with 4-, 8-, 16-, 32-, or 64-bar lengths and advances them automatically.
- Manual preset launches can happen immediately or be queued to the next 1-, 4-, or 8-bar boundary.
- The **Energy** macro non-destructively coordinates drum intensity, filter brightness, harmonic air, melodic presence, and transition strength. At 50% it leaves the saved layer parameters unchanged.
- Every expanded layer has independent **channel gain and stereo pan** controls after its sound-generation chain.
- The master **Headroom** meter estimates combined layer load after channel and master gain, warning when the mix is likely to run hot.

Timeline, quantization, energy, and mixer values are included in account saves and share links. Older saves and links load with neutral performance defaults.

### Zen mode

A full-screen overlay that shows:

- A large digital clock
- Local weather (fetched via browser geolocation → `/api/weather`)
- Rotating headlines from Reuters, BBC, and AP (fetched from `/api/news`, cached in KV)

Entering Zen mode slides the two composer panels to opposite sides like a pair of doors. Clicking the Zen screen brings both panels back before the overlay closes. The transition respects the operating system's reduced-motion preference.

### Responsive interface

The two-panel desktop layout collapses to a single column on tablets and phones. Controls use larger touch targets, transport actions reflow into a compact grid, long timelines scroll horizontally, and dialogs fit within the visible mobile viewport without introducing page-level horizontal overflow.

### Generated code

The Layer Builder always displays the Strudel code it compiled from the current layer state. You can copy it, save it to your account, or paste it directly into any Strudel environment.

---

## Accounts and saved sketches

Users register with a **username and password** — no email required. Once signed in, named sketches can be saved and loaded later.

### How auth works

- Passwords are hashed with **PBKDF2-SHA256** (100 000 iterations, random salt) via the Web Crypto API — the raw password never touches the database.
- On login a **random 32-byte session token** is generated, stored in Cloudflare KV with a 7-day TTL, and sent to the browser as an `HttpOnly; Secure; SameSite=Lax` cookie (`chm_session`).
- All subsequent API calls read the cookie and look up the session in KV. No JWTs, no server-side state beyond KV.

### Database schema

Two tables in Cloudflare D1:

```
users    — id, username (unique), password_hash, created_at
sketches — id, user_id (→ users), name, code, settings, created_at, updated_at
```

Sketches store the generated Strudel code plus a versioned Layer Builder settings payload. Loading a sketch restores its tempo, harmony, layer order and parameters, mute/solo state, arrangement, volume, channel mix, Energy setting, launch quantization, and song timeline. Existing code-only sketches remain available to copy.

### API routes

| Method | Path | What it does |
|---|---|---|
| POST | `/api/auth/register` | Create account (username 3–32 chars, password ≥ 8 chars) |
| POST | `/api/auth/login` | Sign in, set session cookie |
| POST | `/api/auth/logout` | Clear session cookie and delete token from KV |
| GET | `/api/auth/me` | Return `{username, userId}` for the current session |
| GET | `/api/sketches` | List all sketches for the signed-in user |
| POST | `/api/sketches` | Save a new sketch `{name, code, settings}` |
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

For an existing database, preserve its data by applying the migration instead:

```bash
npx wrangler d1 migrations apply chillmusic --local
npx wrangler d1 migrations apply chillmusic --remote
```

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

Pushes to `main` deploy automatically via GitHub Actions (`.github/workflows/deploy.yml`). The workflow:

1. Installs the locked dependencies with `npm ci`.
2. Builds the Astro Worker bundle.
3. Applies pending D1 migrations to the production database.
4. Deploys `dist/server` with Wrangler.

The production endpoints are:

- `https://chillmusic.digital`
- `https://www.chillmusic.digital`

### Required GitHub secrets

| Secret | Where to get it |
|---|---|
| `CLOUDFLARE_API_TOKEN` | dash.cloudflare.com → Profile → API Tokens → Create Token using the **"Edit Cloudflare Workers"** template |
| `CLOUDFLARE_ACCOUNT_ID` | Right sidebar of the Cloudflare dashboard homepage |

The API token must have **Workers Scripts: Edit** and **Workers KV Storage: Edit** permissions. The Pages "Edit" template is not sufficient.

### Manual deploy

```bash
npm run build
npx wrangler d1 migrations apply chillmusic --remote
cd dist/server
npx wrangler deploy
```

### Custom domain

The `chillmusic.digital` and `www.chillmusic.digital` hostnames are already declared in `wrangler.toml`. Cloudflare manages their routes for the `chillmusic-digital` Worker; the zone and DNS records must remain active in the same Cloudflare account.

### Verify a release

For an automatic release, open the repository's **Actions** tab and wait for the **Deploy to Cloudflare Workers** workflow to finish. Then load `https://chillmusic.digital` and confirm that the composer opens, the audio engine reaches `READY`, and `/api/auth/me` returns a response.

### Cloudflare bindings

The Worker uses two bindings configured in `wrangler.toml`:

| Binding | Type | Purpose |
|---|---|---|
| `DB` | D1 database | Stores users and sketches |
| `CACHE` | KV namespace | Stores session tokens and news cache |

Environment variables (`SESSION_TTL_SECONDS`, `NEWS_CACHE_TTL_SECONDS`) are also set in `wrangler.toml` under `[vars]`.
