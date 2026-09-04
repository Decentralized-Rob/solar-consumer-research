import type { Metadata } from "next";
import Link from "next/link";

const canonicalUrl = "https://solarcomplaint.com/goodleap/resources";
const reviewedDate = "2026-09-03";

export const metadata: Metadata = {
  title: "GoodLeap Solar Financing Resources for Consumers",
  description: "Official federal and state resources for consumers researching GoodLeap solar loans, financing disclosures, sales claims, and related disputes.",
  alternates: { canonical: "/goodleap/resources" },
  openGraph: {
    title: "GoodLeap Solar Financing Resources for Consumers",
    description: "Official consumer-finance and solar resources for homeowners researching GoodLeap-related issues.",
    url: "/goodleap/resources",
    type: "website",
    images: [{ url: "https://solarcomplaint.com/og.png", width: 1200, height: 630, alt: "Solar Consumer Research" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "GoodLeap Solar Financing Resources for Consumers",
    description: "Official consumer-finance and solar resources for homeowners researching GoodLeap-related issues.",
    images: ["https://solarcomplaint.com/og.png"],
  },
};

const federalResources = [
  {
    title: "CFPB Solar Financing Issue Spotlight",
    href: "https://www.consumerfinance.gov/data-research/research-reports/issue-spotlight-solar-financing/",
    detail: "Federal analysis of solar-specific loans, dealer fees, tax-credit representations, payment changes, and projected savings.",
  },
  {
    title: "FTC consumer alert on solar scams and sales claims",
    href: "https://consumer.ftc.gov/consumer-alerts/2024/09/solar-energy-rising-popularity-so-are-scams",
    detail: "Federal guidance on contracts, pressure tactics, hidden fees, sales claims, and reporting suspected scams.",
  },
  {
    title: "U.S. Department of Energy Homeowner’s Guide to Solar",
    href: "https://www.energy.gov/cmei/systems/homeowners-guide-solar",
    detail: "Federal homeowner guidance on financing, installers, contracts, ownership, and consumer protection.",
  },
] as const;

export default function GoodLeapResourcesPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${canonicalUrl}#page`,
        name: "GoodLeap Solar Financing Resources for Consumers",
        description: "Official federal and state resources for consumers researching GoodLeap solar financing issues.",
        url: canonicalUrl,
        inLanguage: "en-US",
        dateModified: reviewedDate,
        isPartOf: { "@id": "https://solarcomplaint.com/#website" },
        publisher: { "@id": "https://solarcomplaint.com/#publisher" },
        about: { "@type": "Organization", name: "GoodLeap, LLC" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://solarcomplaint.com/" },
          { "@type": "ListItem", position: 2, name: "GoodLeap", item: "https://solarcomplaint.com/goodleap" },
          { "@type": "ListItem", position: 3, name: "Resources", item: canonicalUrl },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <main className="gl-main">
        <div className="gl-page">
          <p className="gl-eyebrow">Consumer resources</p>
          <h1>Official resources for GoodLeap solar financing questions</h1>
          <p className="gl-deck">
            If you are trying to understand a GoodLeap solar loan or financing dispute, start with the agencies and source documents that explain how these transactions are regulated. This page keeps those links separate from our case research.
          </p>
          <div className="gl-review-line">
            <time dateTime={reviewedDate}>Reviewed September 3, 2026</time><span>·</span>
            <Link href="/methodology">Methodology</Link><span>·</span>
            <Link href="/corrections">Corrections</Link>
          </div>

          <section className="gl-section" aria-labelledby="federal-resources-heading">
            <h2 id="federal-resources-heading">Federal guidance worth reading first</h2>
            <p>
              These are not GoodLeap enforcement pages. They explain the broader federal consumer-finance and solar issues that show up repeatedly in the public record, including dealer fees, disclosures, savings claims, tax-credit representations, and contract terms.
            </p>
            <ol className="gl-source-list">
              {federalResources.map((resource) => (
                <li key={resource.href}>
                  <a href={resource.href} target="_blank" rel="noreferrer">{resource.title}</a>
                  <span>{resource.detail}</span>
                </li>
              ))}
            </ol>
          </section>

          <section className="gl-section" aria-labelledby="state-research-heading">
            <h2 id="state-research-heading">Published GoodLeap state research</h2>
            <p>We currently have full source-reviewed pages for Minnesota and Virginia.</p>
            <div className="gl-published-list">
              <article className="gl-published-item">
                <span className="gl-state-abbr" aria-hidden="true">MN</span>
                <div>
                  <h3>Minnesota</h3>
                  <p>Attorney General litigation over alleged solar-loan dealer fees, with the filed complaint and CFPB context.</p>
                  <Link href="/goodleap/states/minnesota">Read the Minnesota research →</Link>
                </div>
              </article>
              <article className="gl-published-item">
                <span className="gl-state-abbr" aria-hidden="true">VA</span>
                <div>
                  <h3>Virginia</h3>
                  <p>2026 Attorney General litigation involving Power Home / Pink Energy, GoodLeap, and other lenders.</p>
                  <Link href="/goodleap/states/virginia">Read the Virginia research →</Link>
                </div>
              </article>
            </div>
          </section>

          <section className="gl-section" aria-labelledby="other-resources-heading">
            <h2 id="other-resources-heading">State complaint and regulatory resources</h2>
            <p>
              GoodLeap-specific research is only one part of a solar dispute. SolarComplaint.com&apos;s state pages collect Attorney General complaint channels, licensing agencies, utility or solar regulators, and other official resources that may be relevant even when GoodLeap is not the only company involved.
            </p>
            <div className="gl-actions">
              <Link className="gl-button" href="/states">Browse state resources</Link>
              <Link className="gl-button" href="/federal-resources">Federal solar consumer resources</Link>
            </div>
          </section>

          <section className="gl-help-box" aria-labelledby="resource-help-heading">
            <h2 id="resource-help-heading">Not sure which record or agency applies?</h2>
            <p>
              Send us your state, city or town, and a short description of the problem. We can help identify the public sources and official complaint routes worth checking.
            </p>
            <div className="gl-actions">
              <Link className="gl-button gl-button-primary" href="/#questions">Request free research assistance</Link>
              <Link className="gl-button" href="/goodleap/states">GoodLeap state tracker</Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
