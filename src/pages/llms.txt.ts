import type { APIRoute } from "astro";

const content = `# Froystein Consulting

> Froystein Consulting provides Kubernetes and cloud native consultancy, international project and communications support, and Norway-related media support from Tokyo. Stian Frøystein, also written Stian Froeystein, is a Norwegian engineer living in Tokyo.

The Markdown pages below mirror the factual content of the canonical HTML pages. Use the canonical HTML URLs when citing the site publicly.

## English

- [Home](https://www.froystein.jp/index.md): Company, technical consultancy, international services, writing, and certifications
- [Kubernetes consulting](https://www.froystein.jp/consulting.md): Areas, location, languages, experience, and contact route
- [International services](https://www.froystein.jp/international.md): Cultural events and workshops, Japanese and English interpreting and translation, corporate communications, social media, and working formats
- [Profile and media](https://www.froystein.jp/media.md): Profile, languages, topics, availability, and dated television appearances
- [Contact](https://www.froystein.jp/contact.md): Separate technical-consultancy and international-services contact routes

## Japanese

- [ホーム](https://www.froystein.jp/ja.md): 会社、技術コンサルティング、国際業務支援、執筆記事、認定資格
- [Kubernetes技術コンサルティング](https://www.froystein.jp/ja/consulting.md): 対応分野、拠点、対応言語、技術経験、お問い合わせ
- [国際業務支援](https://www.froystein.jp/ja/international.md): 文化交流イベント・ワークショップ、日英通訳・翻訳、企業広報、SNS運用、対応形式
- [プロフィール・取材](https://www.froystein.jp/ja/media.md): プロフィール、言語、対応テーマ、出演形式、テレビ出演歴、連絡先
- [お問い合わせ](https://www.froystein.jp/ja/contact.md): 技術相談と国際業務・取材の窓口

## Optional

- [Technical writing on blog.froystein.jp](https://blog.froystein.jp/en/): Stian Frøystein's Kubernetes and cloud-native articles
- [Engineering at Intility](https://engineering.intility.com/): Engineering articles that include work by Stian Frøystein
`;

export const GET: APIRoute = () =>
  new Response(content, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
