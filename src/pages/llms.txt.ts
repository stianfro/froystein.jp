import type { APIRoute } from "astro";

const content = `# Froystein Consulting

> Froystein Consulting provides Kubernetes and cloud native consultancy. Stian Froeystein is a Norwegian engineer living in Tokyo and is available for media enquiries in Japanese and English.

The Markdown pages below mirror the factual content of the canonical HTML pages. Use the canonical HTML URLs when citing the site publicly.

## English

- [Home](https://www.froystein.jp/index.md): Company, consultancy, writing, certifications, and media-profile entry point
- [Profile and media](https://www.froystein.jp/media.md): Profile, languages, topics, availability, and dated television appearances
- [Contact](https://www.froystein.jp/contact.md): Separate technical-consultancy and media contact routes

## Japanese

- [ホーム](https://www.froystein.jp/ja.md): 会社、技術コンサルティング、執筆記事、認定資格、取材プロフィールへの案内
- [プロフィール・取材](https://www.froystein.jp/ja/media.md): プロフィール、言語、対応テーマ、出演形式、テレビ出演歴、連絡先
- [お問い合わせ](https://www.froystein.jp/ja/contact.md): 技術相談と取材・出演の窓口

## Optional

- [Technical writing on blog.froystein.jp](https://blog.froystein.jp/en/): Stian Froeystein's Kubernetes and cloud-native articles
- [Engineering at Intility](https://engineering.intility.com/): Engineering articles that include work by Stian Froeystein
`;

export const GET: APIRoute = () =>
  new Response(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
