# Chill Music Digital

Chill Music Digital is a browser-based generative trance composer built with Astro, React, and Strudel. It combines a layer-based music builder with a full-screen zen mode that shows a clock, local weather, and rotating world headlines while your mix plays.

## What It Does

- Builds generative trance loops from stacked layers like kick, hats, bass, pad, arp, lead, and noise
- Lets you tweak layer parameters, solo or mute parts, reorder layers, and switch between preset arrangements
- Generates the current Strudel code alongside the controls so the music system stays inspectable
- Includes a zen mode with:
  - a large digital clock
  - local weather from browser geolocation
  - rotating Reuters, BBC, and Associated Press headlines

## Stack

- Astro
- React
- styled-components
- Strudel

## Local Development

```bash
npm install
npm run dev
```

Other scripts:

- `npm run build`
- `npm run preview`

## GitHub Pages

This repo is configured to deploy automatically to GitHub Pages on every push to `main` using GitHub Actions.

Expected site URL:

`https://charles6.github.io/chillmusic-digital/`

If GitHub Pages has not been enabled yet, set the source to `GitHub Actions` in the repository Pages settings.
