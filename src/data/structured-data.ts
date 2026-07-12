import type { Language } from "./content";

const siteUrl = "https://www.froystein.jp";
const websiteId = `${siteUrl}/#website`;
const organizationId = `${siteUrl}/#organization`;
const personId = `${siteUrl}/#stian-froeystein`;

const organization = {
  "@type": "Organization",
  "@id": organizationId,
  name: "Froystein Consulting Co., Ltd",
  alternateName: "株式会社フロイスタインコンサルティング",
  url: `${siteUrl}/`,
};

const website = {
  "@type": "WebSite",
  "@id": websiteId,
  name: "Froystein Consulting",
  url: `${siteUrl}/`,
  publisher: { "@id": organizationId },
  inLanguage: ["en", "ja"],
};

const person = {
  "@type": "Person",
  "@id": personId,
  name: "Stian Froeystein",
  alternateName: ["スティアン・フロイスタイン"],
  url: `${siteUrl}/media/`,
  nationality: { "@type": "Country", name: "Norway" },
  homeLocation: { "@type": "City", name: "Tokyo" },
  knowsLanguage: ["Norwegian", "Japanese", "English"],
  jobTitle: ["Representative Director", "Lead Site Reliability Engineer"],
  worksFor: [
    { "@id": organizationId },
    { "@type": "Organization", name: "Intility AS" },
  ],
  sameAs: [
    "https://github.com/stianfro",
    "https://www.linkedin.com/in/stian-fr%C3%B8ystein-1baa52103",
    "https://blog.froystein.jp/en/",
  ],
};

const descriptions: Record<Language, string> = {
  en: "Norwegian engineer living in Tokyo, fluent in Norwegian, Japanese, and English, and available for media enquiries about Norway and Japan.",
  ja: "東京在住のノルウェー出身エンジニア。ノルウェー語を母語とし、日本語・英語でノルウェーに関する取材や出演に対応。",
};

export function homeStructuredData(language: Language, path: string) {
  const url = new URL(path, siteUrl).href;

  return {
    "@context": "https://schema.org",
    "@graph": [
      website,
      organization,
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name:
          language === "ja"
            ? "Froystein Consulting | Kubernetes・クラウドネイティブ コンサルティング"
            : "Froystein Consulting | Kubernetes and Cloud Native Consultancy",
        isPartOf: { "@id": websiteId },
        about: { "@id": organizationId },
        inLanguage: language,
      },
    ],
  };
}

export function mediaStructuredData(language: Language, path: string) {
  const url = new URL(path, siteUrl).href;

  return {
    "@context": "https://schema.org",
    "@graph": [
      website,
      organization,
      { ...person, description: descriptions[language] },
      {
        "@type": "ProfilePage",
        "@id": `${url}#webpage`,
        url,
        name:
          language === "ja"
            ? "ノルウェーに関する取材・出演のご相談 | スティアン・フロイスタイン"
            : "Norway-related media enquiries | Stian Froeystein",
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": personId },
        inLanguage: language,
      },
    ],
  };
}

export function contactStructuredData(language: Language, path: string) {
  const url = new URL(path, siteUrl).href;

  return {
    "@context": "https://schema.org",
    "@graph": [
      website,
      organization,
      {
        "@type": "ContactPage",
        "@id": `${url}#webpage`,
        url,
        name: language === "ja" ? "お問い合わせ" : "Contact",
        isPartOf: { "@id": websiteId },
        about: { "@id": organizationId },
        inLanguage: language,
      },
    ],
  };
}
