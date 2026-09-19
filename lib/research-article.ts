import type React from "react";
import type { Metadata } from "next";
const baseUrl = "https://solarcomplaint.com";
const defaultImage = `${baseUrl}/og.png`;

export type ResearchStory = {
  id: string;
  slug: string;
  href: string;
  title: string;
  deck: string;
  summary: string;
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string[];
  openGraphTitle?: string;
  articleSection?: string;
  socialDescription?: string;
  twitterDescription?: string;
  twitterTitle?: string;
  schemaHeadline?: string;
  lede?: string;
  displayTitle?: string;
  publishedAt: string;
  datePublished: string;
  dateModified: string;
  stateCodes: string[];
  companies: string[];
  topics: string[];
  author?: string;
  authorSlug?: string;
  section?: "Short Read" | "Research";
  featured?: boolean;
};

export type ResearchSource = {
  name: string;
  url: string;
  datePublished?: string;
  publisher?: string;
};

export type ResearchArticleConfig = {
  story: ResearchStory;
  seoTitle?: string;
  seoDescription?: string;
  socialDescription?: string;
  twitterDescription?: string;
  twitterTitle?: string;
  schemaHeadline?: string;
  mentions?: Array<{ "@type": "Organization" | "AdministrativeArea"; name: string }>;
  sources?: ResearchSource[];
  breadcrumbLabel?: string;
  imageAlt?: string;
};

export type ResearchArticleDefinition = {
  story: ResearchStory;
  config: Omit<ResearchArticleConfig, "story">;
  Body: React.ComponentType;
};

export function defineResearchArticle(article: ResearchArticleDefinition) {
  return article;
}

export function buildResearchMetadata({
  story,
  seoTitle,
  seoDescription,
  socialDescription,
  twitterDescription,
  twitterTitle,
  imageAlt,
}: ResearchArticleConfig): Metadata {
  const title = seoTitle ?? story.title;
  const description = seoDescription ?? story.summary;
  const social = socialDescription ?? story.deck;
  const authorUrl = story.authorSlug ? `${baseUrl}/authors/${story.authorSlug}` : `${baseUrl}/about`;

  return {
    title,
    description,
    keywords: story.keywords ?? story.topics,
    alternates: { canonical: story.href },
    openGraph: {
      title: story.openGraphTitle ?? story.title,
      description: social,
      url: story.href,
      type: "article",
      publishedTime: story.datePublished,
      modifiedTime: story.dateModified,
      authors: [authorUrl],
      section: story.articleSection ?? story.section ?? "Research",
      images: [{
        url: defaultImage,
        width: 1200,
        height: 630,
        alt: imageAlt ?? `${story.title} research from SolarComplaint.com`,
      }],
    },
    twitter: {
      card: "summary_large_image",
      title: twitterTitle ?? story.twitterTitle ?? story.title,
      description: twitterDescription ?? social,
      images: [defaultImage],
    },
  };
}

export function buildResearchStructuredData({
  story,
  seoDescription,
  schemaHeadline,
  mentions,
  sources = [],
  breadcrumbLabel,
}: ResearchArticleConfig) {
  const canonicalUrl = `${baseUrl}${story.href}`;
  const authorUrl = story.authorSlug ? `${baseUrl}/authors/${story.authorSlug}` : `${baseUrl}/about`;
  const author = story.author
    ? {
        "@type": "Organization",
        name: `${story.author}, an editorial byline of Solar Consumer Research`,
        url: authorUrl,
      }
    : {
        "@type": "Organization",
        name: "Solar Consumer Research",
        url: authorUrl,
      };

  const about = [
    ...story.companies.map((name) => ({ "@type": "Organization", name })),
    ...story.topics.map((name) => ({ "@type": "Thing", name })),
  ];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${canonicalUrl}#article`,
        headline: schemaHeadline ?? story.schemaHeadline ?? story.title,
        description: seoDescription ?? story.summary,
        image: [defaultImage],
        datePublished: story.datePublished,
        dateModified: story.dateModified,
        inLanguage: "en-US",
        articleSection: story.articleSection ?? story.section ?? "Research",
        mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
        author,
        publisher: { "@id": `${baseUrl}/#publisher` },
        about,
        ...(mentions ? { mentions } : {}),
        citation: sources.map((source) =>
          source.datePublished || source.publisher
            ? {
                "@type": "CreativeWork",
                name: source.name,
                url: source.url,
                ...(source.datePublished ? { datePublished: source.datePublished } : {}),
                ...(source.publisher
                  ? { publisher: { "@type": "GovernmentOrganization", name: source.publisher } }
                  : {}),
              }
            : source.url,
        ),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${baseUrl}/` },
          { "@type": "ListItem", position: 2, name: "Research", item: `${baseUrl}/research` },
          { "@type": "ListItem", position: 3, name: breadcrumbLabel ?? story.title, item: canonicalUrl },
        ],
      },
    ],
  };
}

function formatResearchDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

export function researchEyebrow(story: ResearchStory) {
  const section = story.articleSection ?? story.section ?? "Research";
  const updated = story.dateModified !== story.datePublished;
  const displayDate = updated ? formatResearchDate(story.dateModified) : story.publishedAt;
  return `${section} · ${updated ? "Updated " : ""}${displayDate}`;
}
