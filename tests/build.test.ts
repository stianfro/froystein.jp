import { describe, expect, test } from "bun:test";

const readOutput = (path: string) =>
  Bun.file(new URL(`../dist/${path}`, import.meta.url)).text();

describe("static build", () => {
  test("renders the existing homepage as semantic static HTML", async () => {
    const html = await readOutput("index.html");

    expect(html).toContain('<html lang="en">');
    expect(html).toContain("<h1>Froystein Consulting</h1>");
    expect(html).toContain("Gateway API for dummies");
    expect(html).toContain("株式会社フロイスタインコンサルティング");
    expect(html).toContain('rel="canonical" href="https://www.froystein.jp/"');
    expect(html).not.toMatch(/<script[^>]+src=/);
  });

  test("publishes crawler files and a missing-page document", async () => {
    const [robots, sitemap, notFound] = await Promise.all([
      readOutput("robots.txt"),
      readOutput("sitemap-0.xml"),
      readOutput("404.html"),
    ]);

    expect(robots).toContain("User-agent: *\nAllow: /");
    expect(robots).toContain(
      "Sitemap: https://www.froystein.jp/sitemap-index.xml",
    );
    expect(sitemap).toContain("<loc>https://www.froystein.jp/</loc>");
    expect(sitemap).not.toContain("404.html");
    expect(notFound).toContain("Page not found");
    expect(notFound).toContain('<meta name="robots" content="noindex">');
  });
});
