# Chill Music Digital

Chill Music Digital is a browser-based generative trance composer built with Astro, React, and Strudel. It combines a layer-based music builder with a full-screen zen mode that shows a clock, local weather, and rotating world headlines while your mix plays.

## What It Does

- Builds generative trance loops from stacked layers like kick, hats, bass, pad, arp, lead, and noise
- Lets you tweak layer parameters, solo or mute parts, reorder layers, and switch between preset arrangements
- Generates the current Strudel code alongside the controls so the music system stays inspectable
- Includes a zen mode with:
  - a large digital clock
  - local weather via browser geolocation (proxied through `/api/weather`)
  - rotating Reuters, BBC, and Associated Press headlines (proxied through `/api/news`)

## Stack

- Astro (SSR, Cloudflare adapter)
- React
- styled-components
- Strudel
- Cloudflare Pages, D1, KV

## Local Development

The app runs with the Cloudflare Workers runtime locally via `wrangler`. You need the Wrangler CLI and a local D1 database to run the full stack.

### Prerequisites

- Node.js 20+
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

**3. Create the Cloudflare resources**

```bash
# Create the D1 database — copy the database_id it prints into wrangler.toml
npx wrangler d1 create chillmusic

# Create the KV namespace — copy the id it prints into wrangler.toml
npx wrangler kv namespace create CACHE
```

Open `wrangler.toml` and replace the two `placeholder-replace-after-...` values with the IDs printed above.

**4. Apply the database schema**

```bash
# Against your remote D1 instance:
npx wrangler d1 execute chillmusic --remote --file=schema.sql

# Or against a local D1 instance for offline dev:
npx wrangler d1 execute chillmusic --local --file=schema.sql
```

**5. Start the dev server**

```bash
npm run dev
```

This starts Astro with the Cloudflare platform proxy enabled, so D1 and KV bindings work exactly as they do in production. The app is available at `http://localhost:4321`.

### Useful scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local dev server with Cloudflare bindings |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build locally |

## Deploying to Cloudflare Pages

Pushes to `main` deploy automatically via GitHub Actions. The workflow uses the `cloudflare/wrangler-action` and requires two repository secrets:

| Secret | Where to find it |
|---|---|
| `CLOUDFLARE_API_TOKEN` | dash.cloudflare.com → Profile → API Tokens → Create Token (use the "Edit Cloudflare Workers" template) |
| `CLOUDFLARE_ACCOUNT_ID` | Right sidebar of the Cloudflare dashboard |

To deploy manually from your machine:

```bash
npm run build
npx wrangler pages deploy dist --project-name=chillmusic-digital
```

### Custom domain

After the first deploy, go to your Cloudflare Pages project → Settings → Custom domains and add `chillmusic.digital`. Cloudflare manages the DNS record automatically since the domain is already on Cloudflare.

## Accounts (coming soon)

The backend API routes for accounts are already implemented (`/api/auth/*`, `/api/user/preferences`, `schema.sql`) but the frontend login UI is commented out. Search for `commented out until accounts are enabled` to find all the relevant spots.
