import {
  appearances,
  blogPosts,
  certifications,
  mediaFormats,
  mediaTopics,
  type Language,
} from "./content";

const siteUrl = "https://www.froystein.jp";
const linkedinUrl =
  "https://www.linkedin.com/in/stian-fr%C3%B8ystein-1baa52103";

const absoluteUrl = (path: string) => new URL(path, siteUrl).href;

const documentHeader = (
  title: string,
  summary: string,
  canonicalPath: string,
  alternatePath: string,
  alternateLabel: string,
) => [
  `# ${title}`,
  "",
  `> ${summary}`,
  "",
  `[Canonical HTML page](${absoluteUrl(canonicalPath)})`,
  "",
  `[${alternateLabel}](${absoluteUrl(alternatePath)})`,
];

const markdownList = (items: string[]) => items.map((item) => `- ${item}`);

const appearanceLines = (language: Language) =>
  appearances.map((appearance) => {
    const source = appearance.url
      ? language === "ja"
        ? ` ([公式放送ページ](${appearance.url}))`
        : ` ([Official episode page](${appearance.url}))`
      : "";

    return `- ${appearance.displayDate}, ${appearance.network[language]}, ${appearance.program}: ${appearance.detail[language]}${source}`;
  });

const postLines = () =>
  blogPosts.map(
    (post) =>
      `- ${post.displayDate}, ${post.source}: [${post.title}](${post.url})`,
  );

const certificationLines = () =>
  certifications.map(
    (certification) => `- [${certification.title}](${certification.url})`,
  );

export function homeMarkdown(language: Language) {
  if (language === "ja") {
    return [
      ...documentHeader(
        "Froystein Consulting",
        "株式会社フロイスタインコンサルティングは、Kubernetesとクラウドネイティブ技術に関するコンサルティングを提供しています。",
        "/ja/",
        "/index.md",
        "English Markdown version",
      ),
      "",
      "## 会社情報",
      "",
      "- 会社名: 株式会社フロイスタインコンサルティング",
      "- 拠点: 東京",
      "- 設立: 2021年",
      "- 対応言語: 日本語、英語、ノルウェー語",
      "",
      "## 技術コンサルティング",
      "",
      "Kubernetes、クラウドネイティブ、プラットフォームエンジニアリング、SREに関するご相談に対応しています。",
      "",
      `[技術相談の窓口](${absoluteUrl("/ja/contact/")})`,
      "",
      "## プロフィール・取材",
      "",
      "スティアン・フロイスタインは、東京在住のノルウェー出身エンジニアです。日本語・英語でのテレビ出演、取材、番組リサーチに対応しています。",
      "",
      `[プロフィールとテレビ出演歴](${absoluteUrl("/ja/media/")})`,
      "",
      "## Blog posts",
      "",
      ...postLines(),
      "",
      "## 認定資格",
      "",
      ...certificationLines(),
    ].join("\n");
  }

  return [
    ...documentHeader(
      "Froystein Consulting",
      "Froystein Consulting provides consultancy services for Kubernetes, cloud native technology, platform engineering, and SRE.",
      "/",
      "/ja.md",
      "日本語のMarkdown版",
    ),
    "",
    "## Company",
    "",
    "- Company: Froystein Consulting Co., Ltd",
    "- Location: Tokyo",
    "- Established: 2021",
    "- Languages: English, Japanese, and Norwegian",
    "",
    "## Technical consultancy",
    "",
    "Consultancy is available for Kubernetes, cloud native technology, platform engineering, and SRE.",
    "",
    `[Technical consultancy contact](${absoluteUrl("/contact/")})`,
    "",
    "## Profile and media",
    "",
    "Stian Froeystein is a Norwegian engineer living in Tokyo. He is available for television, interviews, and programme research in Japanese or English.",
    "",
    `[Profile and TV appearances](${absoluteUrl("/media/")})`,
    "",
    "## Blog posts",
    "",
    ...postLines(),
    "",
    "## Certifications",
    "",
    ...certificationLines(),
  ].join("\n");
}

export function mediaMarkdown(language: Language) {
  if (language === "ja") {
    return [
      ...documentHeader(
        "ノルウェーに関する取材・出演のご相談",
        "スティアン・フロイスタインは、2021年から日本に在住するノルウェー出身のエンジニアです。東京都を拠点とし、日本語・英語での取材や収録に対応しています。",
        "/ja/media/",
        "/media.md",
        "English Markdown version",
      ),
      "",
      "## プロフィール",
      "",
      "- 氏名: Stian Froeystein（スティアン・フロイスタイン）",
      "- 出身・在住: ノルウェー出身、東京都在住",
      "- 言語: ノルウェー語（母語）、日本語・英語（流暢）",
      "- 日本在住歴: 2021年から",
      "- 現職: 株式会社フロイスタインコンサルティング 代表取締役",
      "- 現職: Lead Site Reliability Engineer, Intility AS",
      "- その他: 元・日本ノルウェー協会副会長",
      "- 技術経験: Linux、クラウド基盤、Kubernetes、SREに約11年",
      "",
      "ノルウェーの文化や生活については、ノルウェーで育った経験と、2021年から日本で生活している経験に基づいてお話しします。IT・クラウド分野については、2015年からの実務経験に基づいて対応します。",
      "",
      "## 対応できるテーマ",
      "",
      ...markdownList(mediaTopics.ja),
      "",
      "## 対応形式",
      "",
      ...markdownList(mediaFormats.ja),
      "",
      "## テレビ出演歴",
      "",
      ...appearanceLines("ja"),
      "",
      "## 対応方法",
      "",
      "- 東京での対面",
      "- オンライン",
      "- 電話",
      "- 急なご相談にも対応",
      "",
      "## お問い合わせ",
      "",
      "取材・出演のご相談は media@froystein.jp までメールでお送りください。",
      "",
      "[media@froystein.jp にメール](mailto:media@froystein.jp)",
    ].join("\n");
  }

  return [
    ...documentHeader(
      "Norway-related media enquiries",
      "Stian Froeystein is a Norwegian engineer who has lived in Japan since 2021. Based in Tokyo, he is available for interviews and recording in Japanese or English.",
      "/media/",
      "/ja/media.md",
      "日本語のMarkdown版",
    ),
    "",
    "## Profile",
    "",
    "- Name: Stian Froeystein（スティアン・フロイスタイン）",
    "- From and based: Norway; Tokyo, Japan",
    "- Languages: Norwegian (native), Japanese and English (fluent)",
    "- In Japan: Since 2021",
    "- Current role: Representative Director, Froystein Consulting Co., Ltd",
    "- Current role: Lead Site Reliability Engineer, Intility AS",
    "- Other: Former Vice President of the Norway-Japan Society",
    "- Engineering experience: About 11 years across Linux, cloud infrastructure, Kubernetes, and SRE",
    "",
    "For Norwegian culture and daily life, Stian speaks from his experience of growing up in Norway and living in Japan. For IT and cloud topics, he draws on professional experience since 2015.",
    "",
    "## Topics",
    "",
    ...markdownList(mediaTopics.en),
    "",
    "## Formats",
    "",
    ...markdownList(mediaFormats.en),
    "",
    "## TV appearances",
    "",
    ...appearanceLines("en"),
    "",
    "## Availability",
    "",
    "- Tokyo in person",
    "- Remote",
    "- Phone",
    "- Short notice",
    "",
    "## Contact",
    "",
    "For programme and appearance enquiries, email media@froystein.jp.",
    "",
    "[Email media@froystein.jp](mailto:media@froystein.jp)",
  ].join("\n");
}

export function contactMarkdown(language: Language) {
  if (language === "ja") {
    return [
      ...documentHeader(
        "お問い合わせ",
        "技術コンサルティングと、取材・出演のご相談では窓口が異なります。",
        "/ja/contact/",
        "/contact.md",
        "English Markdown version",
      ),
      "",
      "## 技術コンサルティング",
      "",
      "Kubernetes、クラウドネイティブ、プラットフォームエンジニアリング、SREに関するご相談は、LinkedInからご連絡ください。",
      "",
      `[LinkedInで問い合わせる](${linkedinUrl})`,
      "",
      "## 取材・出演のご相談",
      "",
      "番組名または媒体名、ご相談内容、ご希望の日時と形式（対面・オンライン・電話）、返信期限をメールでお知らせください。内容を確認し、対応可能な場合に折り返しご連絡します。",
      "",
      "[media@froystein.jp にメール](mailto:media@froystein.jp)",
    ].join("\n");
  }

  return [
    ...documentHeader(
      "Contact",
      "Technical consultancy and media enquiries use separate contact routes.",
      "/contact/",
      "/ja/contact.md",
      "日本語のMarkdown版",
    ),
    "",
    "## Technical consultancy",
    "",
    "For Kubernetes, cloud native, platform engineering, or SRE enquiries, contact Stian through LinkedIn.",
    "",
    `[Contact via LinkedIn](${linkedinUrl})`,
    "",
    "## Media enquiries",
    "",
    "Please email the programme or publication name, enquiry details, preferred date and format, and your reply deadline. I will review the details and reply when I can assist.",
    "",
    "[Email media@froystein.jp](mailto:media@froystein.jp)",
  ].join("\n");
}

export function markdownResponse(content: string) {
  return new Response(`${content.trim()}\n`, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "X-Robots-Tag": "noindex, follow",
    },
  });
}
