import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

const lastModifiedByPath = new Map(
  ["/", "/contact/", "/media/", "/ja/", "/ja/contact/", "/ja/media/"].map(
    (path) => [path, "2026-07-12"],
  ),
);

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
