import type { Metadata } from "next";
import Link from "next/link";

const canonicalUrl = "https://solarcomplaint.com/goodleap/states";

export const metadata: Metadata = {
  title: "GoodLeap FLAG State Tracker",
  description: "Track states prioritized for GoodLeap solar-financing research, with sourced state pages for Minnesota and Virginia and a transparent publication threshold.",
  alternates: { canonical: "/goodleap/states" },
  openGraph: {
    title: "GoodLeap FLAG State Tracker",
    description: "State-by-state GoodLeap solar-financing research built around public records and primary sources.",
    url: "/goodleap/states",
    type: "website",
    images: [{ url: "https://solarcomplaint.com/og.png", width: 1200, height: 630, alt: "Solar Consumer Research" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "GoodLeap FLAG State Tracker",
    description: "State-by-state GoodLeap solar-financing research built around public records and primary sources.",
    images: ["https://solarcomplaint.com/og.png"],
  },
};

const publishedStates = [
  ["MN", "Minnesota", "Attorney General action", "Sourced research on Minnesota's solar-lending case naming GoodLeap and other lenders.", "/goodleap/states/minnesota"],
  ["VA", "Virginia", "Attorney General litigation", "Sourced research on Virginia's 2026 Power Home / Pink Energy financing litigation naming GoodLeap.", "/goodleap/states/virginia"],
] as const;

const trackedStates = [
  ["TX", "Texas", "Litigation + arbitration", "Multiple GoodLeap-specific court records are in the research set."],
  ["FL", "Florida", "Litigation", "GoodLeap-specific consumer and company litigation is under review."],
  ["NJ", "New Jersey", "Installer + financing", "Public records connecting GoodLeap financing with major installer disputes are under review."],
  ["MO", "Missouri", "Bankruptcy overlap", "GoodLeap financing records intersect with Titan Solar Power litigation and bankruptcy issues."],
  ["OH", "Ohio", "Installer litigation", "GoodLeap-related Power Home / Pink Energy records are under review."],
  ["MI", "Michigan", "Installer litigation", "Companion Power Home / Pink Energy financing records are under review."],
  ["MD", "Maryland", "Arbitration ruling", "A recent federal GoodLeap solar-financing arbitration ruling is under review."],
] as const;

export default function GoodLeapStatesPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${canonicalUrl}#page`,
    name: "GoodLeap FLAG State Tracker",
    url: canonicalUrl,
    isPartOf: { "@id": "https://solarcomplaint.com/#website" },
    publisher: { "@id": "https://solarcomplaint.com/#publisher" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <main className="gl-main">
        <section className="gl-section-intro">
          <p className="gl-kicker">FLAG State Tracker</p>
          <h1>Financing Litigation &amp; Arbitration involving GoodLeap</h1>
          <p>FLAG tracks states where GoodLeap-specific court, arbitration, Attorney General, or closely related financing records justify focused research.</p>
          <p className="gl-fineprint">FLAG is a research designation. It is not a finding of wrongdoing and does not mean every consumer in a tracked state has the same issue.</p>
        </section>

        <section className="gl-method-strip" aria-label="FLAG methodology summary">
          <div><strong>Publication threshold</strong><span>A state page goes live only after the underlying record is reviewed and the page can provide useful sources and consumer resources.</span></div>
          <div><strong>Not enough by itself</strong><span>A license, a single unsupported complaint, or generic solar activity does not justify a dedicated GoodLeap state page.</span></div>
        </section>

        <section aria-labelledby="flag-published-heading">
          <div className="gl-heading-row">
            <div>
              <p className="gl-kicker">Published research</p>
              <h2 id="flag-published-heading">Two state pages are published at launch</h2>
            </div>
            <Link href="/#questions">Free research assistance →</Link>
          </div>
          <div className="gl-state-grid">
            {publishedStates.map(([abbr, state, tag, detail, href]) => (
              <article className="gl-state-card" key={abbr}>
                <span>{abbr}</span>
                <div>
                  <small>{tag}</small>
                  <h3>{state}</h3>
                  <p>{detail}</p>
                  <Link href={href}>Open sourced state research →</Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="gl-watch-section" aria-labelledby="flag-tracked-heading">
          <div>
            <p className="gl-kicker">Current research set</p>
            <h2 id="flag-tracked-heading">Seven additional states are being tracked</h2>
            <p>These records are visible as research priorities, but they do not get dedicated public pages until the source review reaches the publication threshold.</p>
          </div>
          <div className="gl-next-grid">
            {trackedStates.map(([abbr, state, tag, why]) => (
              <article key={abbr}>
                <strong>{abbr} · {state}</strong>
                <small>{tag}</small>
                <p>{why}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="gl-license-context">
          <p className="gl-kicker">National footprint</p>
          <h2>Licensing is context, not the page strategy.</h2>
          <p>GoodLeap currently lists licenses or registrations in 46 states plus Washington, D.C. Solar Consumer Research does not create thin state pages simply because a company is licensed there.</p>
          <div className="gl-actions">
            <Link className="gl-button gl-button-primary" href="/goodleap/resources">Open consumer resources</Link>
            <Link className="gl-button" href="/#questions">Get free research assistance</Link>
          </div>
        </section>
      </main>
    </>
  );
}
