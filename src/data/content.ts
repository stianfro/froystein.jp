export type Language = "en" | "ja";

export interface Appearance {
  date: string;
  displayDate: string;
  network: Record<Language, string>;
  program: string;
  detail: Record<Language, string>;
  url?: string;
}

export interface BlogPost {
  date: string;
  displayDate: string;
  source: string;
  title: string;
  url: string;
}

export interface Certification {
  title: string;
  url: string;
}

export interface ConsultancyArea {
  summary: Record<Language, string>;
  title: Record<Language, string>;
  topics: Record<Language, string[]>;
}

export interface ConsultancyStep {
  detail: Record<Language, string>;
  title: Record<Language, string>;
}

export interface InternationalService {
  code: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  path?: Record<Language, string>;
  linkLabel?: Record<Language, string>;
}

export const appearances: Appearance[] = [
  {
    date: "2026-06-24",
    displayDate: "2026.06.24",
    network: { en: "TV Asahi", ja: "テレビ朝日" },
    program: "大下容子ワイド！スクランブル",
    detail: {
      en: "A short interview about the Norwegian national team supporters' Viking row celebration and its origins was broadcast",
      ja: "ノルウェー代表サポーターが行う「バイキング・ロウ」と、その由来について取材を受け、短いインタビューが放送",
    },
  },
  {
    date: "2026-05-01",
    displayDate: "2026.05.01",
    network: { en: "TBS", ja: "TBS" },
    program: "世界くらべてみたら",
    detail: {
      en: "Appeared in the “世界ざっくりマップ in 北欧” segment",
      ja: "「世界ざっくりマップ in 北欧」に出演",
    },
    url: "https://www.tbs.co.jp/sekakura/archive/20260501/",
  },
  {
    date: "2026-01-05",
    displayDate: "2026.01.05",
    network: { en: "Nippon TV", ja: "日本テレビ" },
    program: "世界まる見え！テレビ特捜部",
    detail: {
      en: "Appeared as a programme agent in the two-hour New Year special",
      ja: "「お年玉クイズ2時間SP」に番組エージェントとして出演",
    },
    url: "https://www.ntv.co.jp/marumie/articles/3264bz5am8pnm3hasguc.html",
  },
  {
    date: "2025-05-05",
    displayDate: "2025.05.05",
    network: { en: "Nippon TV", ja: "日本テレビ" },
    program: "世界まる見え！テレビ特捜部",
    detail: {
      en: "Appeared as a programme agent in the problem children special",
      ja: "「お騒がせな問題児大集合SP」に番組エージェントとして出演",
    },
    url: "https://www.ntv.co.jp/marumie/articles/3264j2oksgbz65pmv4y9.html",
  },
  {
    date: "2025-03-12",
    displayDate: "2025.03.12",
    network: { en: "TBS", ja: "TBS" },
    program: "世界くらべてみたら",
    detail: {
      en: "Appeared in an episode about children working in Norway’s cod-fishing industry",
      ja: "ノルウェーのタラ漁に携わる子どもたちを取り上げた回に出演",
    },
    url: "https://www.tbs.co.jp/sekakura/archive/20250312/",
  },
  {
    date: "2024-11-16",
    displayDate: "2024.11.16",
    network: { en: "Fuji TV", ja: "フジテレビ" },
    program: "チャンハウス",
    detail: {
      en: "Appeared in a segment about the Norwegian expression “nja”",
      ja: "ノルウェー語の表現「nja」を取り上げた企画に出演",
    },
  },
  {
    date: "2024-04-29",
    displayDate: "2024.04.29",
    network: { en: "Nippon TV", ja: "日本テレビ" },
    program: "世界まる見え！テレビ特捜部",
    detail: {
      en: "Appeared as a programme agent in the dangerous journeys special",
      ja: "「キケンな旅スペシャル」に番組エージェントとして出演",
    },
    url: "https://www.ntv.co.jp/marumie/articles/326441qzv32k9jhtjoon.html",
  },
  {
    date: "2024-03-04",
    displayDate: "2024.03.04",
    network: { en: "Nippon TV", ja: "日本テレビ" },
    program: "世界まる見え！テレビ特捜部",
    detail: {
      en: "Appeared as a programme agent in the Zekkyō special, for a segment about the Norwegian choir The Men's Choir",
      ja: "「絶叫SP」内、ノルウェーの合唱団「ザ・メンズ・コア」の企画に番組エージェントとして出演",
    },
    url: "https://www.ntv.co.jp/marumie/articles/32646rqy9fces51h95f2.html",
  },
  {
    date: "2023-11-13",
    displayDate: "2023.11.13",
    network: { en: "Nippon TV", ja: "日本テレビ" },
    program: "世界まる見え！テレビ特捜部",
    detail: {
      en: "Appeared as a programme agent in the True or False two-hour special",
      ja: "「ウソかマコトか？2HSP」に番組エージェントとして出演",
    },
    url: "https://www.ntv.co.jp/marumie/articles/3264f8oqkwotzuxwswar.html",
  },
  {
    date: "2023-06-05",
    displayDate: "2023.06.05",
    network: { en: "Nippon TV", ja: "日本テレビ" },
    program: "世界まる見え！テレビ特捜部",
    detail: {
      en: "Appeared as a programme agent in the working machines special",
      ja: "「世界の働くマシンSP」に番組エージェントとして出演",
    },
    url: "https://www.ntv.co.jp/marumie/articles/3264xj8rlebf8byk81jv.html",
  },
  {
    date: "2023-05-15",
    displayDate: "2023.05.15",
    network: { en: "Nippon TV", ja: "日本テレビ" },
    program: "世界まる見え！テレビ特捜部",
    detail: {
      en: "Appeared as a programme agent in the two-hour arrest special",
      ja: "「全員逮捕だ2時間SP」に番組エージェントとして出演",
    },
    url: "https://www.ntv.co.jp/marumie/articles/3264c4s4l7v2x9xw2zpt.html",
  },
  {
    date: "2023-03-27",
    displayDate: "2023.03.27",
    network: { en: "Nippon TV", ja: "日本テレビ" },
    program: "世界まる見え！テレビ特捜部",
    detail: {
      en: "Appeared as a programme agent in the 33rd anniversary three-hour special",
      ja: "「まる見え33周年 ミステリークイズ3時間SP」に番組エージェントとして出演",
    },
    url: "https://www.ntv.co.jp/marumie/articles/3264k73e3yqe1t5p5fch.html",
  },
];

export const blogPosts: BlogPost[] = [
  {
    date: "2026-07-10",
    displayDate: "2026.07.10",
    source: "Engineering @ Intility",
    title: "Secure Playground for Vibe Coders",
    url: "https://engineering.intility.com/article/secure-playground-for-vibe-coders",
  },
  {
    date: "2026-02-12",
    displayDate: "2026.02.12",
    source: "Engineering @ Intility",
    title:
      "Agent Teams or: How I Learned to Stop Worrying About Merge Conflicts and Love Git Worktrees",
    url: "https://engineering.intility.com/article/agent-teams-or-how-i-learned-to-stop-worrying-about-merge-conflicts-and-love-git-worktrees",
  },
  {
    date: "2025-10-10",
    displayDate: "2025.10.10",
    source: "blog.froystein.jp",
    title: "Gateway API for dummies",
    url: "https://blog.froystein.jp/en/posts/gateway-api-1/",
  },
  {
    date: "2025-06-04",
    displayDate: "2025.06.04",
    source: "blog.froystein.jp",
    title: "Configuring clients to use a container registry mirror",
    url: "https://blog.froystein.jp/en/posts/registry-mirror-2/",
  },
  {
    date: "2025-02-14",
    displayDate: "2025.02.14",
    source: "blog.froystein.jp",
    title: "How to set up a simple registry mirror in Kubernetes",
    url: "https://blog.froystein.jp/en/posts/registry-mirror-1/",
  },
  {
    date: "2025-02-13",
    displayDate: "2025.02.13",
    source: "blog.froystein.jp",
    title: "Hello World",
    url: "https://blog.froystein.jp/en/posts/hello-world/",
  },
  {
    date: "2024-09-25",
    displayDate: "2024.09.25",
    source: "Engineering @ Intility",
    title: "Architecting a Scalable Kubernetes Platform",
    url: "https://engineering.intility.com/article/architecting-a-scalable-kubernetes-platform",
  },
  {
    date: "2022-05-23",
    displayDate: "2022.05.23",
    source: "Engineering @ Intility",
    title: "Guide to High Availability in Kubernetes",
    url: "https://engineering.intility.com/article/guide-to-high-availability-in-kubernetes",
  },
];

export const certifications: Certification[] = [
  {
    title: "Red Hat Certified OpenShift Administrator",
    url: "https://www.credly.com/badges/417725b8-2350-472c-85d4-f1db952371f7/public_url",
  },
  {
    title: "Red Hat Certified Engineer (RHCE)",
    url: "https://www.credly.com/badges/2f24df96-a500-4175-b0a1-97142609c93c/public_url",
  },
  {
    title: "Red Hat Certified System Administrator (RHCSA)",
    url: "https://www.credly.com/badges/12c4dcdb-2833-446e-bf69-eb0bda710d74/public_url",
  },
];

export const consultancyAreas: ConsultancyArea[] = [
  {
    title: {
      en: "Kubernetes platform architecture",
      ja: "Kubernetesプラットフォーム設計",
    },
    summary: {
      en: "Review or design the technical boundaries of a Kubernetes platform so that infrastructure choices match the organisation operating it.",
      ja: "Kubernetesプラットフォームの技術的な境界を整理し、インフラの選択と運用する組織の体制を合わせます。",
    },
    topics: {
      en: [
        "Cluster and platform architecture",
        "Networking, storage, access, and tenancy",
        "Lifecycle, upgrades, and change boundaries",
      ],
      ja: [
        "クラスタとプラットフォームのアーキテクチャ",
        "ネットワーク、ストレージ、アクセス、テナンシー",
        "ライフサイクル、アップグレード、変更範囲",
      ],
    },
  },
  {
    title: {
      en: "Reliability and operations",
      ja: "信頼性と運用",
    },
    summary: {
      en: "Connect reliability goals to practical operating routines, ownership, observability, incident readiness, and safe platform changes.",
      ja: "信頼性の目標を、運用手順、責任範囲、オブザーバビリティ、障害対応、プラットフォーム変更の進め方につなげます。",
    },
    topics: {
      en: [
        "Availability and failure-mode reviews",
        "Operational ownership and incident readiness",
        "Observability and change safety",
      ],
      ja: [
        "可用性と障害モードのレビュー",
        "運用責任と障害対応の準備",
        "オブザーバビリティと安全な変更",
      ],
    },
  },
  {
    title: {
      en: "Platform engineering",
      ja: "プラットフォームエンジニアリング",
    },
    summary: {
      en: "Define a platform contract that gives application teams useful defaults and self-service paths without hiding operational reality.",
      ja: "運用の実態を隠さずに、アプリケーションチームへ実用的な標準とセルフサービスの経路を提供するプラットフォーム契約を整理します。",
    },
    topics: {
      en: [
        "Developer workflows and platform interfaces",
        "GitOps, automation, and reusable patterns",
        "Guardrails, documentation, and feedback loops",
      ],
      ja: [
        "開発者ワークフローとプラットフォームのインターフェース",
        "GitOps、自動化、再利用可能なパターン",
        "ガードレール、ドキュメント、フィードバックループ",
      ],
    },
  },
];

export const consultancySteps: ConsultancyStep[] = [
  {
    title: { en: "Establish context", ja: "前提を整理" },
    detail: {
      en: "Document the current platform, the teams using it, operational constraints, and the decision that needs to be made.",
      ja: "現在のプラットフォーム、利用するチーム、運用上の制約、判断が必要な事項を整理します。",
    },
  },
  {
    title: { en: "Review evidence", ja: "根拠を確認" },
    detail: {
      en: "Inspect architecture and operating material, then identify assumptions, failure modes, ownership gaps, and tradeoffs.",
      ja: "アーキテクチャと運用資料を確認し、前提、障害モード、責任範囲の不足、トレードオフを明確にします。",
    },
  },
  {
    title: { en: "Recommend a path", ja: "進め方を提案" },
    detail: {
      en: "Produce a practical sequence of decisions and changes, including risks, dependencies, and points that need validation.",
      ja: "リスク、依存関係、検証が必要な点を含め、判断と変更を現実的な順序にまとめます。",
    },
  },
  {
    title: { en: "Review the change", ja: "変更をレビュー" },
    detail: {
      en: "Review implementation decisions and update the recommendation when new operational evidence changes the tradeoffs.",
      ja: "実装上の判断をレビューし、新しい運用データによってトレードオフが変わった場合は提案を更新します。",
    },
  },
];

export const internationalServices: InternationalService[] = [
  {
    code: "CULTURE",
    title: {
      en: "Cultural events and workshops",
      ja: "文化交流イベント・ワークショップ",
    },
    description: {
      en: "Planning and delivery of international cultural events and workshops, from the initial concept and participant coordination through on-site operation.",
      ja: "国際的な文化交流イベントやワークショップについて、企画立案、関係者との調整、当日の運営まで対応します。",
    },
  },
  {
    code: "LANGUAGE",
    title: {
      en: "Japanese and English language support",
      ja: "日英の通訳・翻訳",
    },
    description: {
      en: "Two-way Japanese and English interpreting for business meetings and written translation. Interpreting experience includes meetings in the game software sector.",
      ja: "日本語から英語、英語から日本語の両方向で、商談通訳と文章翻訳に対応します。ゲームソフトウェア分野での商談通訳経験があります。",
    },
  },
  {
    code: "COMMUNICATIONS",
    title: {
      en: "Corporate communications and social media",
      ja: "企業広報・SNS運用",
    },
    description: {
      en: "Planning and delivery for corporate communications and social media operations, adapted to the organisation, audience, and project.",
      ja: "企業や団体、対象となる方々、プロジェクトの目的に合わせて、企業広報とSNS運用の企画・実行を支援します。",
    },
  },
  {
    code: "MEDIA",
    title: {
      en: "Norway-related media support",
      ja: "ノルウェー関連のメディア対応",
    },
    description: {
      en: "Television and video appearances, interviews, programme research, and cultural context relating to Norway and Japan.",
      ja: "ノルウェーと日本に関するテレビ・動画出演、取材、番組リサーチ、文化的背景の確認に対応します。",
    },
    path: { en: "/media/", ja: "/ja/media/" },
    linkLabel: {
      en: "View media topics and appearances",
      ja: "取材テーマと出演歴を見る",
    },
  },
];

export const internationalFormats: Record<Language, string[]> = {
  en: ["Kanto in person", "Travel within Japan", "Remote"],
  ja: ["関東圏での対面", "日本国内への出張", "オンライン"],
};

export const mediaTopics: Record<Language, string[]> = {
  en: [
    "Norwegian culture, customs, society, and daily life",
    "Differences between Norway and Japan",
    "Japan from a Norwegian perspective",
    "Working life and social values in Norway",
    "Norwegian pronunciation and cultural context",
    "Programme research and fact-checking",
    "Technology, digitalisation, and IT in Norway",
    "Kubernetes, cloud native technology, and SRE",
  ],
  ja: [
    "ノルウェーの文化、習慣、社会、日常生活",
    "ノルウェーと日本の違い",
    "ノルウェー人から見た日本",
    "ノルウェーでの働き方や社会的な価値観",
    "ノルウェー語の発音確認、文化的背景の確認",
    "番組リサーチや事実確認",
    "ノルウェーの技術、デジタル化、IT事情",
    "Kubernetes、クラウドネイティブ、SRE",
  ],
};

export const mediaFormats: Record<Language, string[]> = {
  en: [
    "Television and video appearances",
    "Interviews and reporting",
    "Programme research and information",
    "Radio and podcasts",
    "Events and guest participation",
    "Remote recording and phone consultation",
  ],
  ja: [
    "テレビ・動画出演",
    "インタビュー・取材",
    "番組リサーチ・情報提供",
    "ラジオ・ポッドキャスト",
    "イベント登壇・ゲスト参加",
    "オンライン収録・電話確認",
  ],
};
