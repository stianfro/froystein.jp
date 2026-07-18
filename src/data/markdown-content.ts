import {
  appearances,
  blogPosts,
  certifications,
  internationalFormats,
  internationalServices,
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

const internationalServiceLines = (language: Language) =>
  internationalServices.flatMap((service) => {
    const lines = [
      `### ${service.title[language]}`,
      "",
      service.description[language],
    ];

    if (service.path && service.linkLabel) {
      lines.push(
        "",
        `[${service.linkLabel[language]}](${absoluteUrl(service.path[language])})`,
      );
    }

    lines.push("");

    return lines;
  });

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
      "## 国際業務支援",
      "",
      "文化交流イベントやワークショップの企画・運営、日英商談通訳・文章翻訳、企業広報、SNS運用を支援します。",
      "",
      `[国際業務支援について詳しく見る](${absoluteUrl("/ja/international/")})`,
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
    "## International services",
    "",
    "Support is available for cultural events and workshops, Japanese and English interpreting and translation, corporate communications, and social media operations.",
    "",
    `[View international services](${absoluteUrl("/international/")})`,
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

export function internationalMarkdown(language: Language) {
  if (language === "ja") {
    return [
      ...documentHeader(
        "国際業務支援",
        "文化交流イベントやワークショップの企画・運営、日英商談通訳・文章翻訳、企業広報、SNS運用を支援します。",
        "/ja/international/",
        "/international.md",
        "English Markdown version",
      ),
      "",
      "ノルウェーと日本に関する文化交流やメディア活動で培った経験を活かしながら、その他の国や地域に関するご相談にも対応します。",
      "",
      "## 対応できる業務",
      "",
      ...internationalServiceLines("ja"),
      "## 対応形式",
      "",
      ...markdownList(internationalFormats.ja),
      "",
      "## お問い合わせ",
      "",
      "ご相談内容、希望時期、対応形式、必要な言語、返信期限をメールでお知らせください。",
      "",
      "[contact@froystein.jp にメール](mailto:contact@froystein.jp)",
    ].join("\n");
  }

  return [
    ...documentHeader(
      "International project and communications support",
      "Support for international cultural events and workshops, Japanese and English interpreting and translation, corporate communications, and social media operations.",
      "/international/",
      "/ja/international.md",
      "日本語のMarkdown版",
    ),
    "",
    "Norway and Japan are a particular area of experience, and enquiries involving other countries and regions are also welcome.",
    "",
    "## Services",
    "",
    ...internationalServiceLines("en"),
    "## Working formats",
    "",
    ...markdownList(internationalFormats.en),
    "",
    "## Contact",
    "",
    "Please include the request, preferred timing and format, required language direction, and reply deadline.",
    "",
    "[Email contact@froystein.jp](mailto:contact@froystein.jp)",
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
      "- 氏名: スティアン・フロイスタイン",
      "- ローマ字表記: Stian Froeystein",
      "- ノルウェー語表記: Stian Frøystein",
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
      "取材・出演のご相談は contact@froystein.jp までメールでお送りください。",
      "",
      "[contact@froystein.jp にメール](mailto:contact@froystein.jp)",
    ].join("\n");
  }

  return [
    ...documentHeader(
      "Norway-related media enquiries",
      "Stian Frøystein is a Norwegian engineer who has lived in Japan since 2021. Based in Tokyo, he is available for interviews and recording in Japanese or English.",
      "/media/",
      "/ja/media.md",
      "日本語のMarkdown版",
    ),
    "",
    "## Profile",
    "",
    "- Name: Stian Frøystein",
    "- Alternate names: Stian Froeystein; スティアン・フロイスタイン",
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
    "For programme and appearance enquiries, email contact@froystein.jp.",
    "",
    "[Email contact@froystein.jp](mailto:contact@froystein.jp)",
  ].join("\n");
}

export function contactMarkdown(language: Language) {
  if (language === "ja") {
    return [
      ...documentHeader(
        "お問い合わせ",
        "技術コンサルティングと、国際業務・取材のご相談では窓口が異なります。",
        "/ja/contact/",
        "/contact.md",
        "English Markdown version",
      ),
      "",
      "## 技術コンサルティング",
      "",
      "Kubernetes、クラウドネイティブ、プラットフォームエンジニアリング、SREに関するご相談は、LinkedInからご連絡ください。",
      "",
      "- Kubernetes",
      "- クラウドネイティブ技術",
      "- プラットフォームエンジニアリング",
      "- SRE",
      "",
      `[LinkedInで問い合わせる](${linkedinUrl})`,
      "",
      "## 国際業務・取材のご相談",
      "",
      "ご相談内容、希望時期、対応形式（対面・出張・オンライン）、必要な言語、返信期限をメールでお知らせください。",
      "",
      "[contact@froystein.jp にメール](mailto:contact@froystein.jp)",
    ].join("\n");
  }

  return [
    ...documentHeader(
      "Contact",
      "Technical consultancy and international or media enquiries use separate contact routes.",
      "/contact/",
      "/ja/contact.md",
      "日本語のMarkdown版",
    ),
    "",
    "## Technical consultancy",
    "",
    "For Kubernetes, cloud native, platform engineering, or SRE enquiries, contact Stian through LinkedIn.",
    "",
    "- Kubernetes",
    "- Cloud native technology",
    "- Platform engineering",
    "- SRE",
    "",
    `[Contact via LinkedIn](${linkedinUrl})`,
    "",
    "## International services and media",
    "",
    "Please email the request, preferred timing and format, required language direction, and your reply deadline.",
    "",
    "[Email contact@froystein.jp](mailto:contact@froystein.jp)",
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
