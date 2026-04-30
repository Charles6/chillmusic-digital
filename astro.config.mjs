import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  site: "https://chillmusic.digital",
  output: "server",
  adapter: cloudflare({
    platformProxy: { enabled: true },
    cloudflareModules: true,
  }),
  integrations: [react()],
});
