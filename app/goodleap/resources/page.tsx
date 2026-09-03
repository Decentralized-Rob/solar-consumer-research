import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "GoodLeap Consumer Resources",
  description: "Official federal and state consumer resources relevant to GoodLeap solar financing, loans, sales claims, and residential solar disputes.",
  alternates: { canonical: "/goodleap/resources" },
  openGraph: {
    title: "GoodLeap Consumer Resources",
    description: "Official consumer-finance and solar resources for homeowners researching GoodLeap-related issues.",
    url: "/goodleap/resources",
    type: "website",
    images: [{ url: "https://solarcomplaint.com/og.png", width: 1200, height: 630, alt: "Solar Consumer Research" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "GoodLeap Consumer Resources",
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
    title: "FTC solar consumer alert",
    href: "https://consumer.ftc.gov/consumer-alerts/2024/09/solar-energy-rising-popularity-so-are-scams",
    detail: "Federal consumer guidance on solar sales claims, contracts, pressure tactics, hidden fees, and reporting suspected scams.",
  },
  {
    title: "U.S. Department of Energy Homeowner’s Guide to Solar",
    href: "https://www.energy.gov/cmei/systems/homeowners-guide-solar",
    detail: "Federal homeowner guidance covering solar decisions, financing, installers, contracts, system ownership, and consumer protection.",
  },
] as const;

export default function GoodLeapResourcesPage() {
  return (
    <main className="gl-main">
      <section className="gl-section-intro">
        <p className="gl-kicker">Consumer resources</p>
        <h1>GoodLeap consumer resources</h1>
        <p>Use this page for official federal guidance and the published GoodLeap state research pages. SolarComplaint.com’s broader state and federal directories cover complaint routes, regulators, licensing, and general residential-solar resources.</p>
      </section>

      <div className="gl-actions">
        <Link className="gl-button gl-button-primary" href="/#questions">Get free research assistance</Link>
        <Link className="gl-button" href="/federal-resources">SolarComplaint federal resources</Link>
        <Link className="gl-button" href="/goodleap/states">FLAG State Tracker</Link>
      </div>

      <hr className="gl-divider" />

      <section aria-labelledby="published-state-resources-heading">
        <div className="gl-heading-row">
          <div>
            <p className="gl-kicker">Published state research</p>
            <h2 id="published-state-resources-heading">State-specific GoodLeap resources</h2>
          </div>
        </div>
        <div className="gl-section-grid">
          <Link className="gl-card gl-card-compact" href="/goodleap/states/minnesota">
            <small>Minnesota</small>
            <h3>Attorney General case and complaint resources</h3>
            <p>Primary filings, federal financing context, and Minnesota consumer resources.</p>
          </Link>
          <Link className="gl-card gl-card-compact" href="/goodleap/states/virginia">
            <small>Virginia</small>
            <h3>Attorney General litigation and complaint resources</h3>
            <p>Primary filings, lender-specific allegations, federal financing context, and Virginia consumer resources.</p>
          </Link>
        </div>
      </section>

      <hr className="gl-divider" />

      <section aria-labelledby="federal-authorities-heading">
        <div className="gl-heading-row">
          <div>
            <p className="gl-kicker">Federal authorities</p>
            <h2 id="federal-authorities-heading">Start with primary government guidance</h2>
          </div>
        </div>
        <div className="gl-section-grid">
          {federalResources.map((resource) => (
            <a className="gl-card gl-card-compact" href={resource.href} target="_blank" rel="noreferrer" key={resource.href}>
              <small>Official federal resource</small>
              <h3>{resource.title}</h3>
              <p>{resource.detail}</p>
            </a>
          ))}
        </div>
      </section>

      <aside className="gl-note">This site provides research help, not legal advice. If you need help identifying the public records or complaint channels that may fit your situation, use the free research-assistance form on SolarComplaint.com.</aside>
    </main>
  );
}
