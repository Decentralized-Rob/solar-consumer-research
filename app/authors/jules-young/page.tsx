import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "../../../components/info-page";

const canonicalUrl = "https://solarcomplaint.com/authors/jules-young";

export const metadata: Metadata = {
  title: "Jules Young | SolarComplaint.com",
  description: "Jules Young is SolarComplaint.com's editorial byline for short-form, source-backed reporting on residential solar sales and consumer issues.",
  alternates: { canonical: "/authors/jules-young" },
  openGraph: { url: "/authors/jules-young" },
};

export default function JulesYoungPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${canonicalUrl}#profile`,
    url: canonicalUrl,
    name: "Jules Young | SolarComplaint.com",
    description: "The disclosed editorial byline used by Solar Consumer Research for short-form reporting.",
    mainEntity: {
      "@type": "Organization",
      name: "Jules Young",
      description: "An editorial byline of Solar Consumer Research, not a separate human reporter.",
      parentOrganization: { "@id": "https://solarcomplaint.com/#publisher" },
    },
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <InfoPage
      eyebrow="Editorial byline"
      title="Jules Young"
      lede="Short-form reporting with a curious eye, a little personality and the receipts to back it up."
    >
      <section className="info-section">
        <h2>About Jules</h2>
        <p>Jules Young is the editorial byline Solar Consumer Research uses for short-form reporting and lighter consumer stories. Jules is a house voice, not a separate human reporter.</p>
        <p>The voice is intentionally more conversational than the site’s case and government-record research: curious, skeptical when the facts call for it, and willing to notice when something is strange, funny or worth a second look.</p>
      </section>

      <section className="info-section">
        <h2>The reporting standard doesn’t change</h2>
        <p>Stories published under this byline are sourced and reviewed under the same Solar Consumer Research standards as the rest of the site. Primary records come first when they are available. Claims are attributed. Sources are linked so readers can check the work.</p>
        <p><Link href="/methodology">Read the research methodology →</Link><br/><Link href="/corrections">Corrections policy →</Link></p>
      </section>

      <section className="info-section">
        <h2>Latest from Jules</h2>
        <p><Link href="/research/massachusetts-solar-cost-2026">What Solar Costs in Massachusetts Right Now →</Link></p>
        <p><Link href="/research/sunrun-home-depot-sales-home-visit">Sunrun at Home Depot: Shopper Says Store Pitch Followed Him Home →</Link></p>
      </section>
    </InfoPage>
  </>;
}
