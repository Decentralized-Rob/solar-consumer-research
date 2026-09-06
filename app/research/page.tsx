import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "../../components/info-page";
import { researchStories } from "../../lib/research-stories";

const canonicalUrl = "https://solarcomplaint.com/research";

export const metadata: Metadata = {
  title: "Residential Solar Research, Lawsuits and Enforcement",
  description:
    "Source-backed residential solar research covering lawsuits, investigations, settlements, financing, complaints, and company-specific case tracking.",
  alternates: { canonical: "/research" },
  openGraph: {
    title: "Residential Solar Research, Lawsuits and Enforcement",
    description: "Original source-backed research and case tracking for residential solar consumers.",
    url: "/research",
    type: "website",
    images: [{ url: "https://solarcomplaint.com/og.png", width: 1200, height: 630, alt: "Solar Consumer Research" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Residential Solar Research, Lawsuits and Enforcement",
    description: "Original source-backed research and case tracking for residential solar consumers.",
    images: ["https://solarcomplaint.com/og.png"],
  },
};

export default function ResearchPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${canonicalUrl}#page`,
        name: "Residential Solar Research, Lawsuits and Enforcement",
        description: "Original source-backed research and case tracking for residential solar consumers.",
        url: canonicalUrl,
        isPartOf: { "@id": "https://solarcomplaint.com/#website" },
        publisher: { "@id": "https://solarcomplaint.com/#publisher" },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: researchStories.map((story, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "Article",
              headline: story.title,
              description: story.deck,
              datePublished: story.datePublished,
              dateModified: story.dateModified,
              url: `https://solarcomplaint.com${story.href}`,
            },
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://solarcomplaint.com/" },
          { "@type": "ListItem", position: 2, name: "Research", item: canonicalUrl },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <InfoPage
        eyebrow="Solar Consumer Research"
        title="Source-backed research on residential solar"
        lede="Original reporting, document analysis, enforcement tracking, and company-specific research built around primary government records."
      >
        <nav className="case-question-links" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-current="page">Research</span>
        </nav>

        <section className="info-section case-notice">
          <strong>How this section works</strong>
          <p>Research stories connect the original government record to the relevant state and company pages. Lawsuits, investigations, settlements, and allegations are labeled separately. Source links remain available on the story itself and on the related resource pages.</p>
        </section>

        <section className="state-source-section" aria-labelledby="featured-research-title">
          <div className="state-source-section-heading">
            <span>{String(researchStories.length).padStart(2, "0")} featured stor{researchStories.length === 1 ? "y" : "ies"}</span>
            <h2 id="featured-research-title">Featured research</h2>
          </div>
          <div className="state-source-grid">
            {researchStories.map((story) => (
              <article key={story.id}>
                <span>Source-backed analysis</span>
                <h3><Link href={story.href}>{story.title}</Link></h3>
                <p>{story.deck}</p>
                <small>Published {story.publishedAt} · Michigan · Texas · Arizona</small>
                <Link href={story.href}>Read the source-backed breakdown →</Link>
              </article>
            ))}
          </div>
        </section>

        <section className="info-section">
          <h2>Company and case trackers</h2>
          <p><Link href="/goodleap">GoodLeap Consumer Resource Center: solar financing, FLAG state tracking, and official consumer resources →</Link></p>
          <p><Link href="/companies/sunrun">Sunrun: investigations, enforcement, settlements, and documented cases →</Link></p>
          <p><Link href="/cases/titan-solar-power">Titan Solar Power: closure, bankruptcy, customer resources, and updates →</Link></p>
          <p><Link href="/cases/connecticut-attorney-general-sunrun-lawsuit">Connecticut Attorney General lawsuit involving Sunrun →</Link></p>
        </section>

        <section className="info-section">
          <h2>Research standards</h2>
          <p>Solar Consumer Research prioritizes government records and primary documents, keeps procedural status clear, and separates source facts from analysis. Read the full <Link href="/methodology">research methodology</Link> or <Link href="/corrections">submit a correction</Link>.</p>
        </section>
      </InfoPage>
    </>
  );
}
