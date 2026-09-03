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

const flagPillars = [
  ["$", "Financing", "Loans, payments, and financing agreements."],
  ["§", "Litigation", "Court records involving GoodLeap or related parties."],
  ["A", "Arbitration", "Orders and disputes involving arbitration."],
  ["G", "Government", "Attorney General and regulator records."],
] as const;

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
              <Link className="gl-button" href="/goodleap/states">Open the FLAG State Tracker</Link>
            </div>
          </div>
          <aside className="gl-hero-panel">
            <p className="gl-kicker">Current research footprint</p>
            <dl>
              <div><dt>46 + D.C.</dt><dd>states / district where GoodLeap lists licenses or registrations</dd></div>
              <div><dt>9</dt><dd>states in the current FLAG research set</dd></div>
              <div><dt>2</dt><dd>state research pages published at launch</dd></div>
            </dl>
            <p className="gl-fineprint">Licensing does not mean every state has the same GoodLeap solar activity or consumer issues.</p>
          </aside>
        </section>

        <section className="gl-flag-feature" aria-labelledby="gl-flag-feature-title">
          <div className="gl-flag-feature-top">
            <div className="gl-flag-feature-copy">
              <div className="gl-flag-word" aria-hidden="true">FLAG</div>
              <h2 id="gl-flag-feature-title">Financing Litigation &amp; Arbitration involving GoodLeap</h2>
              <span className="gl-flag-accent" aria-hidden="true" />
              <p>FLAG identifies states where the public record is strong enough to justify focused GoodLeap research. It is a research designation, not a finding of wrongdoing.</p>
            </div>

            <div className="gl-flag-visual">
              <div className="gl-us-map" aria-label="Nine FLAG research states: Minnesota, Michigan, Ohio, Missouri, New Jersey, Maryland, Virginia, Texas, and Florida">
                <div className="gl-us-map-shape" aria-hidden="true" />
                <span className="gl-map-state gl-map-mn">MN</span>
                <span className="gl-map-state gl-map-mi">MI</span>
                <span className="gl-map-state gl-map-oh">OH</span>
                <span className="gl-map-state gl-map-mo">MO</span>
                <span className="gl-map-state gl-map-nj">NJ</span>
                <span className="gl-map-state gl-map-md">MD</span>
                <span className="gl-map-state gl-map-va">VA</span>
                <span className="gl-map-state gl-map-tx">TX</span>
                <span className="gl-map-state gl-map-fl">FL</span>
              </div>

              <div className="gl-flag-feature-side">
                <div className="gl-flag-count" aria-label="9 FLAG research states">
                  <strong>9</strong>
                  <span>FLAG<br />States</span>
                </div>
                <Link className="gl-flag-cta" href="/goodleap/states">
                  <span className="gl-flag-cta-arrow" aria-hidden="true">→</span>
                  <span><strong>FLAG State Tracker</strong><small>See published and tracked states.</small></span>
                </Link>
              </div>
            </div>
          </div>

          <div className="gl-flag-pillars">
            {flagPillars.map(([icon, title, copy]) => (
              <div className="gl-flag-pillar" key={title}>
                <span className="gl-flag-pillar-icon" aria-hidden="true">{icon}</span>
                <div><h3>{title}</h3><p>{copy}</p></div>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="gl-published-heading">
          <div className="gl-heading-row">
            <div>
              <p className="gl-kicker">Published state research</p>
              <h2 id="gl-published-heading">Start with the sourced pages that are live now</h2>
            </div>
            <Link href="/goodleap/states">View tracker →</Link>
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
            <h2 id="gl-tracked-heading">Seven more states are in the current FLAG research set</h2>
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
