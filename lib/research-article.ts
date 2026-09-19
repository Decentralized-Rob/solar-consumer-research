import type { Metadata } from "next";
import type { ResearchStory } from "./research-stories";

const baseUrl = "https://solarcomplaint.com";
const defaultImage = `${baseUrl}/og.png`;

export type ResearchSource = {
  name: string;
  url: string;
};

export type ResearchArticleConfig = {
  story: ResearchStory;
  seoTitle?: string;
  seoDescription?: string;
  socialDescription?: string;
  twitterDescription?: string;
  sources?: ResearchSource[];
  breadcrumbLabel?: string;
  imageAlt?: string;
};

export function buildResearchMetadata({
  story,
  seoTitle,
  seoDescription,
  socialDescription,
  twitterDescription,
  imageAlt,
}: ResearchArticleConfig): Metadata {
  const title = seoTitle ?? story.title;
  const description = seoDescription ?? story.summary;
  const social = socialDescription ?? story.deck;
  const authorUrl = story.authorSlug ? `${baseUrl}/authors/${story.authorSlug}` : undefined;

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
      authors: authorUrl ? [authorUrl] : undefined,
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
      title: story.title,
      description: twitterDescription ?? social,
      images: [defaultImage],
    },
  };
}

export function buildResearchStructuredData({
  story,
  seoDescription,
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
        headline: story.title,
        description: seoDescription ?? story.summary,
        datePublished: story.datePublished,
        dateModified: story.dateModified,
        inLanguage: "en-US",
        articleSection: story.articleSection ?? story.section ?? "Research",
        mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
        author,
        publisher: { "@id": `${baseUrl}/#publisher` },
        about,
        citation: sources.map((source) => source.url),
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
