import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InfoPage } from "../../../components/info-page";
import { getResearchArticle, researchArticles } from "../../../content/research";
import { buildResearchMetadata, buildResearchStructuredData, researchEyebrow } from "../../../lib/research-article";

type ResearchPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return Array.from(researchArticles.keys(), (slug) => ({ slug }));
}

export async function generateMetadata({ params }: ResearchPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getResearchArticle(slug);
  if (!article) return {};
  const { story, config } = article;

  return buildResearchMetadata({
    story,
    seoTitle: story.seoTitle,
    seoDescription: story.seoDescription,
    socialDescription: story.socialDescription,
    twitterDescription: story.twitterDescription,
    twitterTitle: config.twitterTitle ?? story.twitterTitle,
    imageAlt: config.imageAlt,
  });
}

export default async function ResearchArticlePage({ params }: ResearchPageProps) {
  const { slug } = await params;
  const article = getResearchArticle(slug);
  if (!article) notFound();
  const { story, config, Body } = article;

  const structuredData = buildResearchStructuredData({
    story,
    seoDescription: config.schemaDescription,
    schemaHeadline: config.schemaHeadline ?? story.schemaHeadline,
    mentions: config.mentions,
    breadcrumbLabel: config.breadcrumbLabel,
    sources: config.sources,
  });

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <InfoPage className="research-story-page" eyebrow={researchEyebrow(story)} title={story.displayTitle ?? story.title} lede={story.lede ?? story.deck}>
      <Body />
    </InfoPage>
  </>;
}
