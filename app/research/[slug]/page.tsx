import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InfoPage } from "../../../components/info-page";
import { getResearchContent, researchContent } from "../../../content/research";
import { buildResearchMetadata, buildResearchStructuredData, researchEyebrow } from "../../../lib/research-article";
import { getResearchStory } from "../../../lib/research-stories";

type ResearchPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return Object.keys(researchContent).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ResearchPageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = getResearchStory(slug);
  const content = getResearchContent(slug);
  if (!story || !content) return {};

  return buildResearchMetadata({
    story,
    seoTitle: story.seoTitle,
    seoDescription: story.seoDescription,
    socialDescription: story.socialDescription,
    twitterDescription: story.twitterDescription,
    imageAlt: content.imageAlt,
  });
}

export default async function ResearchArticlePage({ params }: ResearchPageProps) {
  const { slug } = await params;
  const story = getResearchStory(slug);
  const content = getResearchContent(slug);
  if (!story || !content) notFound();

  const structuredData = buildResearchStructuredData({
    story,
    seoDescription: content.schemaDescription,
    breadcrumbLabel: content.breadcrumbLabel,
    sources: content.sources,
  });
  const Body = content.Body;

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <InfoPage className="research-story-page" eyebrow={researchEyebrow(story)} title={story.displayTitle ?? story.title} lede={story.lede ?? story.deck}>
      <Body />
    </InfoPage>
  </>;
}
