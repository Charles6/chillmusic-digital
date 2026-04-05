import { defineConfig } from "astro/config";
import react from "@astrojs/react";

export default defineConfig({
  site: "https://charles6.github.io",
  base: "/chillmusic-digital",
  integrations: [react()],
});
