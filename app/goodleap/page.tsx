import type { Metadata } from "next";
import Link from "next/link";

const canonicalUrl = "https://solarcomplaint.com/goodleap";

export const metadata: Metadata = {
  title: "GoodLeap Solar Financing Research and Consumer Resources",
  description:
    "Source-backed GoodLeap solar financing research, FLAG state tracking, official consumer resources, and free research assistance from Solar Consumer Research.",
  alternates: { canonical: "/goodleap" },
  openGraph: {
    title: "GoodLeap Solar Financing Research and Consumer Resources",
    description: "Independent GoodLeap solar financing research built around court records, government sources, and consumer resources.",
    url: "/goodleap",
    type: "website",
    images: [{ url: "https://solarcomplaint.com/og.png", width: 1200, height: 630, alt: "Solar Consumer Research" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "GoodLeap Solar Financing Research and Consumer Resources",
    description: "Independent GoodLeap solar financing research and consumer resources.",
    images: ["https://solarcomplaint.com/og.png"],
  },
};

const publishedStates = [
  {
    abbr: "MN",
    state: "Minnesota",
    tag: "Attorney General action",
    detail: "Primary-source research on Minnesota's solar-lending case naming GoodLeap and other lenders.",
    href: "/goodleap/states/minnesota",
  },
  {
    abbr: "VA",
    state: "Virginia",
    tag: "Attorney General litigation",
    detail: "Primary-source research on Virginia's 2026 Power Home / Pink Energy financing case naming GoodLeap.",
    href: "/goodleap/states/virginia",
  },
] as const;

const trackedStates = ["Texas", "Florida", "New Jersey", "Missouri", "Ohio", "Michigan", "Maryland"];

export default function GoodLeapHubPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${canonicalUrl}#page`,
        name: "GoodLeap Solar Financing Research and Consumer Resources",
        description: "Independent GoodLeap solar financing research built around court records, government sources, and consumer resources.",
        url: canonicalUrl,
        isPartOf: { "@id": "https://solarcomplaint.com/#website" },
        publisher: { "@id": "https://solarcomplaint.com/#publisher" },
        about: { "@type": "Organization", name: "GoodLeap" },
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
        <section className="gl-hero gl-hero-grid">
          <div>
            <p className="gl-kicker">Independent consumer research</p>
            <h1>GoodLeap Solar Financing Research</h1>
            <p>Track documented state actions, solar-financing litigation, arbitration rulings, and official consumer resources.</p>
            <div className="gl-actions">
              <Link className="gl-button gl-button-primary" href="/#questions">Get free research assistance</Link>
              <Link className="gl-button" href="/goodleap/states">Browse GoodLeap state research</Link>
            </div>
          </div>
          <aside className="gl-hero-panel">
            <p className="gl-kicker">Current research footprint</p>
            <dl>
              <div><dt>9</dt><dd>states in the current FLAG research set</dd></div>
              <div><dt>2</dt><dd>state research pages published now</dd></div>
            </dl>
            <p className="gl-fineprint">GoodLeap lists licenses or registrations in 46 states plus Washington, D.C. Licensing alone does not determine where we publish state research.</p>
          </aside>
        </section>

        <section className="gl-flag-feature" aria-labelledby="gl-flag-feature-title">
          <div className="gl-heading-row">
            <div>
              <p className="gl-kicker">FLAG State Tracker</p>
              <h2 id="gl-flag-feature-title">Financing Litigation &amp; Arbitration involving GoodLeap</h2>
            </div>
            <Link className="gl-button gl-button-primary" href="/goodleap/states">Open tracker</Link>
          </div>
          <p>
            FLAG is our research category for states with enough GoodLeap-specific court, arbitration, Attorney General,
            or closely related financing records to justify focused review.
          </p>
          <p className="gl-fineprint">9 states tracked · 2 full state pages published · FLAG is not a finding of wrongdoing.</p>
        </section>

        <section aria-labelledby="gl-published-heading">
          <div className="gl-heading-row">
            <div>
              <p className="gl-kicker">Published state research</p>
              <h2 id="gl-published-heading">Start with the sourced pages available now</h2>
            </div>
            <Link href="/goodleap/states">View all tracked states →</Link>
          </div>
          <div className="gl-state-grid">
            {publishedStates.map((item) => (
              <article className="gl-state-card" key={item.abbr}>
                <span>{item.abbr}</span>
                <div>
                  <small>{item.tag}</small>
                  <h3>{item.state}</h3>
                  <p>{item.detail}</p>
                  <Link href={item.href}>Open sourced state research →</Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="gl-watch-section" aria-labelledby="gl-tracked-heading">
          <div>
            <p className="gl-kicker">Tracked for deeper review</p>
            <h2 id="gl-tracked-heading">Seven more states are in the current research set</h2>
            <p>These states have GoodLeap-specific public records under review. Dedicated pages will be published only when the source record is complete enough to be useful.</p>
          </div>
          <div className="gl-chip-list">
            {trackedStates.map((state) => <span key={state}>{state}</span>)}
          </div>
        </section>

        <section aria-labelledby="gl-help-heading">
          <div className="gl-heading-row">
            <div>
              <p className="gl-kicker">Consumer help</p>
              <h2 id="gl-help-heading">Need help finding the public record for your situation?</h2>
            </div>
          </div>
          <div className="gl-section-grid">
            <Link className="gl-card gl-card-compact" href="/#questions">
              <small>Free research assistance</small>
              <h3>Tell us what happened</h3>
              <p>Use SolarComplaint.com’s existing research-help form. We can help identify public records, regulators, complaint channels, and other source-based resources that may fit your situation.</p>
            </Link>
            <Link className="gl-card gl-card-compact" href="/goodleap/resources">
              <small>Official guidance</small>
              <h3>GoodLeap consumer resources</h3>
              <p>Start with federal consumer-finance and solar guidance, then move into state-specific resources where available.</p>
            </Link>
            <Link className="gl-card gl-card-compact" href="/federal-resources">
              <small>Federal resources</small>
              <h3>Broader solar consumer protection</h3>
              <p>Use SolarComplaint.com’s federal resource page for agencies, financing guidance, and national consumer-protection information.</p>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
