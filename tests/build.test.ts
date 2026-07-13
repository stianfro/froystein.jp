import { describe, expect, test } from "bun:test";
import { readdir } from "node:fs/promises";
import { markdownResponse } from "../src/data/markdown-content";

const readOutput = (path: string) =>
  Bun.file(new URL(`../dist/${path}`, import.meta.url)).text();

const readJsonLd = (html: string) => {
  const match = html.match(
    /<script type="application\/ld\+json">([^<]+)<\/script>/,
  );

  expect(match).not.toBeNull();
  return JSON.parse(match?.[1] ?? "{}");
};

describe("static build", () => {
  test("renders the English consultancy homepage with all verified writing", async () => {
    const html = await readOutput("index.html");

    expect(html).toContain('<html lang="en">');
    expect(html).toContain("Kubernetes and");
    expect(html).toContain("Cloud Native");
    expect(html).toContain("Blog posts");
    expect((html.match(/class="post-title"/g) ?? []).length).toBe(8);
    expect(html).toContain("Secure Playground for Vibe Coders");
    expect(html).toContain("Red Hat Certified Engineer (RHCE)");
    expect(html).toContain('rel="canonical" href="https://www.froystein.jp/"');
    expect(html).toContain(
      'rel="alternate" hreflang="ja" href="https://www.froystein.jp/ja/"',
    );
    expect(html).toContain('<meta property="og:title" content="Froystein');
    expect(html).toContain('<meta name="twitter:card" content="summary">');
    expect(html).toContain('<meta name="twitter:title" content="Froystein');
    expect(html).toContain('<meta name="twitter:description" content="');
    expect(html).toContain('<script src="/analytics-config.js"></script>');
    expect(html).toContain('<script src="/analytics.js" defer></script>');
  });

  test("renders reciprocal Japanese and English profile pages", async () => {
    const [english, japanese] = await Promise.all([
      readOutput("media/index.html"),
      readOutput("ja/media/index.html"),
    ]);

    expect(english).toContain('<html lang="en">');
    expect(japanese).toContain('<html lang="ja">');
    expect(english).toContain("Stian Froeystein");
    expect(japanese).toContain("スティアン・フロイスタイン");
    expect(japanese).toContain("Lead Site Reliability Engineer, Intility AS");
    expect((japanese.match(/class="appearance-program"/g) ?? []).length).toBe(
      12,
    );
    expect(japanese).toContain("大下容子ワイド！スクランブル");
    expect(japanese).toContain("チャンハウス");
    expect(japanese).toContain("2025.03.12");
    expect(japanese).toContain(
      "https://www.tbs.co.jp/sekakura/archive/20250312/",
    );
    expect(japanese).toContain("2023.03.27");
    expect(japanese).toContain(
      'rel="alternate" hreflang="en" href="https://www.froystein.jp/media/"',
    );
    expect(english).toContain(
      'rel="alternate" hreflang="ja" href="https://www.froystein.jp/ja/media/"',
    );
  });

  test("keeps technical and media contact routes explicit", async () => {
    const [english, japanese] = await Promise.all([
      readOutput("contact/index.html"),
      readOutput("ja/contact/index.html"),
    ]);

    for (const html of [english, japanese]) {
      expect(html).toContain("mailto:media@froystein.jp");
      expect(html).toContain(
        "https://www.linkedin.com/in/stian-fr%C3%B8ystein-1baa52103",
      );
      expect(html).not.toContain('href="#contact"');
      expect(html).not.toContain('href="#company"');
    }

    expect(english).toContain("Choose the type of enquiry below.");
    expect(japanese).toContain("以下の窓口からお問い合わせください");
  });

  test("ships disabled analytics with an allowlisted event vocabulary", async () => {
    const [home, contact, media, privacy, japanesePrivacy, config, loader] =
      await Promise.all([
        readOutput("index.html"),
        readOutput("contact/index.html"),
        readOutput("media/index.html"),
        readOutput("privacy/index.html"),
        readOutput("ja/privacy/index.html"),
        readOutput("analytics-config.js"),
        readOutput("analytics.js"),
      ]);

    expect(config).toContain("enabled: false");
    expect(loader).toContain('scriptUrl ?? "/_analytics/script.js"');
    expect(loader).toContain('hostUrl ?? "/_analytics"');
    expect(loader).toContain('scriptUrl.startsWith("/")');
    expect(home).toContain('data-umami-event="article_outbound_click"');
    expect(home).toContain('data-umami-event="language_switch"');
    expect(contact).toContain('data-umami-event="consultancy_linkedin_click"');
    expect(contact).toContain('data-umami-event="media_email_click"');
    expect(media).toContain('data-umami-event-page="media"');
    expect(privacy).toContain("does not use cookies");
    expect(privacy).toContain("monthly session hash");
    expect(privacy).toContain("path without its query string");
    expect(privacy).toContain("referrer hostname");
    expect(privacy).toContain("do not contain the client IP address");
    expect(privacy).toContain("Disable analytics in this browser");
    expect(privacy).toContain("up to 13 months");
    expect(japanesePrivacy).toContain("最大14日間");
    expect(japanesePrivacy).toContain("月ごとに変わるセッションハッシュ");
    expect(japanesePrivacy).toContain("privacy@froystein.jp");

    for (const html of [home, contact, media]) {
      expect(html).not.toMatch(/data-umami-event-(?:email|url|query)=/);
    }
  });

  test("publishes a connected Organization and ProfilePage entity graph", async () => {
    const [home, media] = await Promise.all([
      readOutput("index.html"),
      readOutput("ja/media/index.html"),
    ]);
    const homeGraph = readJsonLd(home)["@graph"] as Array<
      Record<string, unknown>
    >;
    const mediaGraph = readJsonLd(media)["@graph"] as Array<
      Record<string, unknown>
    >;

    expect(homeGraph.some((node) => node["@type"] === "Organization")).toBe(
      true,
    );
    expect(homeGraph.some((node) => node["@type"] === "WebSite")).toBe(true);
    expect(mediaGraph.some((node) => node["@type"] === "ProfilePage")).toBe(
      true,
    );
    expect(
      mediaGraph.some(
        (node) =>
          node["@type"] === "Person" && node.name === "Stian Froeystein",
      ),
    ).toBe(true);
  });

  test("publishes crawler files and canonical indexable routes", async () => {
    const [robots, sitemap, llms, notFound] = await Promise.all([
      readOutput("robots.txt"),
      readOutput("sitemap-0.xml"),
      readOutput("llms.txt"),
      readOutput("404.html"),
    ]);

    expect(robots).toContain("User-agent: OAI-SearchBot\nAllow: /");
    expect(robots).toContain("User-agent: GPTBot\nDisallow: /");
    expect(robots).toContain(
      "Sitemap: https://www.froystein.jp/sitemap-index.xml",
    );
    for (const path of [
      "/",
      "/contact/",
      "/media/",
      "/ja/",
      "/ja/contact/",
      "/ja/media/",
    ]) {
      expect(sitemap).toContain(`<loc>https://www.froystein.jp${path}</loc>`);
    }
    expect(
      (sitemap.match(/<lastmod>2026-07-12T00:00:00\.000Z<\/lastmod>/g) ?? [])
        .length,
    ).toBe(8);
    expect(sitemap).not.toContain("404.html");
    expect(llms).toContain("https://www.froystein.jp/ja/media.md");
    expect(sitemap).not.toContain(".md</loc>");
    expect(notFound).toContain("Page not found");
    expect(notFound).toContain('<meta name="robots" content="noindex">');
  });

  test("publishes spec-shaped llms.txt and Markdown mirrors for every page", async () => {
    const mirrorDefinitions = [
      ["index.md", "https://www.froystein.jp/"],
      ["media.md", "https://www.froystein.jp/media/"],
      ["contact.md", "https://www.froystein.jp/contact/"],
      ["ja.md", "https://www.froystein.jp/ja/"],
      ["ja/media.md", "https://www.froystein.jp/ja/media/"],
      ["ja/contact.md", "https://www.froystein.jp/ja/contact/"],
    ] as const;
    const compatibilityPaths = [
      "index.html.md",
      "media/index.html.md",
      "contact/index.html.md",
      "ja/index.html.md",
      "ja/media/index.html.md",
      "ja/contact/index.html.md",
    ] as const;
    const [llms, dockerfile, ...outputs] = await Promise.all([
      readOutput("llms.txt"),
      Bun.file(new URL("../Dockerfile", import.meta.url)).text(),
      ...mirrorDefinitions.map(([path]) => readOutput(path)),
      ...compatibilityPaths.map((path) => readOutput(path)),
    ]);
    const mirrors = outputs.slice(0, mirrorDefinitions.length);
    const compatibilityMirrors = outputs.slice(mirrorDefinitions.length);

    expect(llms).toMatch(/^# Froystein Consulting\n\n> /);
    expect(llms.indexOf("## English")).toBeLessThan(
      llms.indexOf("## Japanese"),
    );
    expect(llms.indexOf("## Japanese")).toBeLessThan(
      llms.indexOf("## Optional"),
    );

    for (const [index, [path, canonical]] of mirrorDefinitions.entries()) {
      expect(llms).toContain(`https://www.froystein.jp/${path}`);
      expect(mirrors[index]).toMatch(/^# /);
      expect(mirrors[index]).toMatch(/\n\n> /);
      expect(mirrors[index]).toContain(`[Canonical HTML page](${canonical})`);
      expect(mirrors[index]).not.toContain("<main");
    }

    for (const [index, compatibilityMirror] of compatibilityMirrors.entries()) {
      expect(compatibilityMirror).toBe(mirrors[index]);
    }

    for (const [htmlPath, markdownPath] of [
      ["index.html", "index.md"],
      ["media/index.html", "media.md"],
      ["contact/index.html", "contact.md"],
      ["ja/index.html", "ja.md"],
      ["ja/media/index.html", "ja/media.md"],
      ["ja/contact/index.html", "ja/contact.md"],
    ]) {
      const html = await readOutput(htmlPath);
      expect(html).toContain(
        'rel="help" type="text/plain" href="/llms.txt" title="LLM content guide"',
      );
      expect(html).toContain(
        `rel="alternate" type="text/markdown" href="https://www.froystein.jp/${markdownPath}"`,
      );
    }

    expect(
      (
        mirrors[4].match(
          /^- 20\d\d\.\d\d\.\d\d, (?:TBS|フジテレビ|日本テレビ|テレビ朝日),/gm,
        ) ?? []
      ).length,
    ).toBe(12);
    expect(mirrors[4]).toContain("チャンハウス");
    expect(mirrors[0]).toContain("Secure Playground for Vibe Coders");
    expect(mirrors[2]).toContain("mailto:media@froystein.jp");
    expect(dockerfile).toContain("types { text/markdown md; }");
    expect(dockerfile).toContain("charset_types text/markdown;");
    expect(dockerfile).toContain("location = /llms.txt");
    expect(dockerfile).toContain("charset_types text/plain;");
    expect(dockerfile).toContain('X-Robots-Tag "noindex, follow"');
    expect(dockerfile).toContain("location = /sitemap-index.xml/");
    expect(dockerfile).toContain("return 301 /sitemap-index.xml;");
    expect(dockerfile).toContain("location = /sitemap-0.xml/");
    expect(dockerfile).toContain("return 301 /sitemap-0.xml;");
    expect(dockerfile).toContain('"path":"\\$uri"');
    expect(dockerfile).not.toContain("\\$request_uri");
    expect(dockerfile).not.toContain("remote_addr");
    expect(dockerfile).not.toContain("x-forwarded-for");
    expect(dockerfile).toContain('"country":"\\$http_cf_ipcountry"');

    const response = markdownResponse("# Test");
    expect(response.headers.get("content-type")).toBe(
      "text/markdown; charset=utf-8",
    );
    expect(response.headers.get("x-robots-tag")).toBe("noindex, follow");
  });

  test("keeps every production internal link resolvable", async () => {
    const pages = [
      "index.html",
      "contact/index.html",
      "media/index.html",
      "ja/index.html",
      "ja/contact/index.html",
      "ja/media/index.html",
      "privacy/index.html",
      "ja/privacy/index.html",
    ];

    for (const page of pages) {
      const html = await readOutput(page);
      const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map(
        (match) => match[1],
      );

      for (const href of hrefs) {
        if (href.startsWith("#")) {
          expect(html).toContain(`id="${href.slice(1)}"`);
          continue;
        }
        if (!href.startsWith("/")) continue;

        const path = href.split("#")[0].split("?")[0];
        const outputPath = path.endsWith("/")
          ? `${path.slice(1)}index.html`
          : path.slice(1);
        expect(
          await Bun.file(
            new URL(`../dist/${outputPath}`, import.meta.url),
          ).exists(),
        ).toBe(true);
      }
    }
  });

  test("never publishes local design prototypes", async () => {
    const files = await readdir(new URL("../dist", import.meta.url), {
      recursive: true,
    });

    expect(
      files.some(
        (file) => file.includes("design-lab") || file.includes("portrait"),
      ),
    ).toBe(false);
  });
});
