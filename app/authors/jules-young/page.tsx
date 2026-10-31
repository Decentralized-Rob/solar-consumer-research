import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "../../../components/info-page";
import { getResearchStoriesForAuthor } from "../../../lib/research-stories";

const canonicalUrl = "https://solarcomplaint.com/authors/jules-young";

export const metadata: Metadata = {
  title: "Jules Young | SolarComplaint.com",
  description: "Jules Young covers residential solar sales, contracts, enforcement actions, and consumer issues for SolarComplaint.com.",
  alternates: { canonical: "/authors/jules-young" },
  openGraph: { url: "/authors/jules-young" },
};

export default function JulesYoungPage() {
  const stories = getResearchStoriesForAuthor("jules-young");
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${canonicalUrl}#profile`,
    url: canonicalUrl,
    name: "Jules Young | SolarComplaint.com",
    description: "Reporting on residential solar sales, contracts and consumer issues at SolarComplaint.com.",
    mainEntity: {
      "@type": "Organization",
      name: "Jules Young",
      description: "Residential solar research and reporting for SolarComplaint.com.",
      parentOrganization: { "@id": "https://solarcomplaint.com/#publisher" },
    },
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <InfoPage
      eyebrow="SolarComplaint.com reporting"
      title="Jules Young"
      lede="Reporting on residential solar sales, contracts, consumer disputes, and state enforcement actions."
    >
      <section className="info-section">
        <h2>About Jules</h2>
        <p>Jules Young covers solar sales practices, homeowner contracts, consumer complaints, and enforcement actions.</p>
        <p>Reporting draws on original complaints, court filings, agency records, and company documents, with links to the underlying sources.</p>
      </section>

      <section className="info-section">
        <h2>The reporting standard doesn’t change</h2>
        <p>Stories published under this byline are sourced and reviewed under the same Solar Consumer Research standards as the rest of the site. Primary records come first when they are available. Claims are attributed. Sources are linked so readers can check the work.</p>
        <p><Link href="/methodology">Read the research methodology →</Link><br/><Link href="/corrections">Corrections policy →</Link></p>
      </section>

      <section className="info-section">
        <h2>Latest from Jules</h2>
        {stories.map((story) => (
          <p key={story.id}><Link href={story.href}>{story.title} →</Link></p>
        ))}
      </section>
    </InfoPage>
  </>;
}
