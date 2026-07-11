import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://www.froystein.jp",
  output: "static",
  trailingSlash: "always",
  integrations: [
    sitemap({
      filter: (page) => page !== "https://www.froystein.jp/404.html",
    }),
  ],
});
