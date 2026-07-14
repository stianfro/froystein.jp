import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

const lastModifiedByPath = new Map([
  ["/", "2026-07-14"],
  ["/consulting/", "2026-07-14"],
  ["/contact/", "2026-07-14"],
  ["/international/", "2026-07-14"],
  ["/media/", "2026-07-14"],
  ["/privacy/", "2026-07-12"],
  ["/ja/", "2026-07-14"],
  ["/ja/consulting/", "2026-07-14"],
  ["/ja/contact/", "2026-07-14"],
  ["/ja/international/", "2026-07-14"],
  ["/ja/media/", "2026-07-14"],
  ["/ja/privacy/", "2026-07-12"],
]);

export default defineConfig({
  site: "https://www.froystein.jp",
  output: "static",
  trailingSlash: "always",
  integrations: [
    sitemap({
      filter: (page) => page !== "https://www.froystein.jp/404.html",
      serialize(item) {
        item.lastmod = lastModifiedByPath.get(new URL(item.url).pathname);
        return item;
      },
    }),
  ],
});
