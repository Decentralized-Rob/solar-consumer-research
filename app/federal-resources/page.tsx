import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "../../components/info-page";
import { resources } from "../../lib/content";

export const metadata: Metadata = {
  title: "Federal Solar Complaint and Consumer Resources",
  description:
    "Official federal complaint channels for residential solar financing, fraud reports, and consumer-protection concerns.",
  alternates: { canonical: "/federal-resources" },
  openGraph: {
    title: "Federal Solar Complaint and Consumer Resources",
    description:
      "Official federal channels for solar financing complaints, fraud reports, and consumer-protection concerns.",
    url: "/federal-resources",
  },
};

const federalResources = resources.filter(
  (resource) => resource.id === "federal-cfpb-complaint" || resource.id === "federal-ftc-report-fraud",
);

export default function FederalResourcesPage() {
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Federal solar complaint and consumer resources",
    description:
      "Official federal complaint channels for residential solar financing and consumer-fraud concerns.",
    url: "https://solarcomplaint.com/federal-resources",
    dateModified: "2026-08-21",
    publisher: { "@id": "https://solarcomplaint.com/#publisher" },
  };

  return (
    <InfoPage
      className="state-resource-page"
      eyebrow="Federal consumer resources"
      title="Federal solar complaint resources."
      lede="Official national channels for reporting consumer-finance and fraud concerns connected to residential solar. State agencies may handle separate contract, licensing, utility, or installation issues."
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />

      <section className="state-source-section" aria-labelledby="federal-sources-title">
        <div className="state-source-section-heading">
          <span>{String(federalResources.length).padStart(2, "0")} verified sources</span>
          <h2 id="federal-sources-title">Official federal complaint channels</h2>
        </div>
        <div className="state-source-grid">
          {federalResources.map((resource) => (
            <article key={resource.id}>
              <span>Federal government</span>
              <h3>{resource.title}</h3>
              <p>{resource.summary}</p>
              <small>{resource.publisher} · Verified {resource.lastVerified}</small>
              <a href={resource.url} target="_blank" rel="noreferrer">Open official source ↗</a>
            </article>
          ))}
        </div>
      </section>

      <section className="info-section">
        <h2>When state resources may be more relevant</h2>
        <p>Contractor licensing, permits, inspections, utility service, state consumer-protection complaints, and court records are generally organized on the relevant state page.</p>
      </section>

      <div className="state-page-links">
        <Link href="/resources">Browse state resources →</Link>
        <Link href="/guides">Browse consumer guides →</Link>
      </div>
    </InfoPage>
  );
}
