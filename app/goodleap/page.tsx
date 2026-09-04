import type { Metadata } from "next";
import Link from "next/link";

const canonicalUrl = "https://solarcomplaint.com/goodleap";
const reviewedDate = "2026-09-03";

export const metadata: Metadata = {
  title: "GoodLeap Solar Financing: Lawsuits, Arbitration & Consumer Research",
  description:
    "GoodLeap solar financing research based on court records, Attorney General actions, arbitration rulings, and official consumer resources.",
  alternates: { canonical: "/goodleap" },
  openGraph: {
    title: "GoodLeap Solar Financing: What the Public Record Shows",
    description: "Independent research on GoodLeap solar financing using court records, government filings, and primary sources.",
    url: "/goodleap",
    type: "website",
    images: [{ url: "https://solarcomplaint.com/og.png", width: 1200, height: 630, alt: "Solar Consumer Research" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "GoodLeap Solar Financing: What the Public Record Shows",
    description: "Independent research on GoodLeap solar financing using court records, government filings, and primary sources.",
    images: ["https://solarcomplaint.com/og.png"],
  },
};

const publishedStates = [
  {
    abbr: "MN",
    state: "Minnesota",
    detail: "The Attorney General sued GoodLeap and three other solar lenders in 2024 over alleged hidden dealer fees in financed solar transactions.",
    href: "/goodleap/states/minnesota",
  },
  {
    abbr: "VA",
    state: "Virginia",
    detail: "A 2026 Attorney General case names GoodLeap among lenders connected to the Power Home Solar / Pink Energy record.",
    href: "/goodleap/states/virginia",
  },
] as const;

export default function GoodLeapHubPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${canonicalUrl}#page`,
        name: "GoodLeap Solar Financing: What the Public Record Shows",
        description: "Independent research on GoodLeap solar financing using court records, government filings, and primary sources.",
        url: canonicalUrl,
        dateModified: reviewedDate,
        isPartOf: { "@id": "https://solarcomplaint.com/#website" },
        publisher: { "@id": "https://solarcomplaint.com/#publisher" },
        about: { "@type": "Organization", name: "GoodLeap, LLC" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://solarcomplaint.com/" },
          { "@type": "ListItem", position: 2, name: "GoodLeap", item: canonicalUrl },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <main className="gl-main">
        <div className="gl-page">
          <p className="gl-eyebrow">GoodLeap research</p>
          <h1>GoodLeap solar financing: what the public record shows</h1>
          <p className="gl-deck">
            GoodLeap appears in a growing set of solar-financing lawsuits, Attorney General cases, and arbitration disputes. This section pulls the strongest public records into one place and keeps allegations, court rulings, and broader industry context separate.
          </p>
          <div className="gl-review-line">
            <span>Reviewed September 3, 2026</span><span>·</span>
            <Link href="/methodology">How we verify records</Link><span>·</span>
            <Link href="/corrections">Corrections</Link>
          </div>
          <div className="gl-actions">
            <Link className="gl-button gl-button-primary" href="/#questions">Get free research assistance</Link>
            <Link className="gl-button" href="/goodleap/states">Browse GoodLeap research by state</Link>
          </div>

          <div className="gl-summary">
            <p>
              We are starting with states where the GoodLeap-specific record is substantial enough to be useful to homeowners. That means court filings, government actions, or meaningful arbitration decisions, not simply a license or an isolated complaint.
            </p>
            <div className="gl-number-line" aria-label="GoodLeap research status">
              <span><strong>9</strong> states under focused review</span>
              <span><strong>2</strong> full state pages published</span>
              <span><strong>46 + D.C.</strong> licenses or registrations listed by GoodLeap</span>
            </div>
          </div>

          <section className="gl-section" aria-labelledby="published-research-heading">
            <h2 id="published-research-heading">Published research</h2>
            <p>These are the first two state pages where we have completed a source review and can show readers the underlying record directly.</p>
            <div className="gl-published-list">
              {publishedStates.map((item) => (
                <article className="gl-published-item" key={item.abbr}>
                  <span className="gl-state-abbr" aria-hidden="true">{item.abbr}</span>
                  <div>
                    <h3>{item.state}</h3>
                    <p>{item.detail}</p>
                    <Link href={item.href}>Read the {item.state} research →</Link>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="gl-section" aria-labelledby="flag-heading">
            <h2 id="flag-heading">What FLAG means here</h2>
            <p>
              We use <strong>FLAG</strong> as shorthand for <strong>Financing Litigation &amp; Arbitration involving GoodLeap</strong>. It is an editorial research label, not a legal finding and not a claim that every GoodLeap-financed system in a state has a problem.
            </p>
            <p>
              Seven more states are being reviewed now: Texas, Florida, New Jersey, Missouri, Ohio, Michigan, and Maryland. The <Link className="gl-text-link" href="/goodleap/states">state tracker</Link> explains why each one is on the list and whether a full page has been published.
            </p>
          </section>

          <section className="gl-help-box" aria-labelledby="research-help-heading">
            <h2 id="research-help-heading">Have a GoodLeap solar financing issue?</h2>
            <p>
              Send your state, city or town, and a short description of what happened. We will look for public records, regulators, complaint channels, and other source-backed information that may help you understand what is already out there.
            </p>
            <div className="gl-actions">
              <Link className="gl-button gl-button-primary" href="/#questions">Request free research assistance</Link>
              <Link className="gl-button" href="/goodleap/resources">Official consumer resources</Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
