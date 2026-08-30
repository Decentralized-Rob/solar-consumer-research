import Link from "next/link";

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
        <p>Use the GoodLeap hub for GoodLeap-specific research. Use SolarComplaint.com’s state and federal resource pages for broader complaint routes, regulators, licensing, laws, and general solar consumer information.</p>
      </section>

      <div className="gl-actions">
        <Link className="gl-button gl-button-primary" href="/federal-resources">SolarComplaint federal resources</Link>
        <Link className="gl-button" href="/goodleap/states">GoodLeap FLAG state resources</Link>
      </div>

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

      <aside className="gl-note">
        State-specific GoodLeap pages should link directly to the relevant Attorney General, regulator, licensing authority, court records, and official complaint channels. Those state links belong on the state page where they have context rather than in one oversized national directory.
      </aside>
    </main>
  );
}
