import Link from "next/link";

const flagStates = [
  ["MN", "Minnesota", "Attorney General action", "Dealer-fee and solar-financing allegations involving GoodLeap and other lenders."],
  ["VA", "Virginia", "Attorney General litigation", "2026 litigation tied to the former Power Home / Pink Energy sales ecosystem."],
  ["TX", "Texas", "Litigation + arbitration", "Multiple GoodLeap solar-financing disputes, arbitration rulings, and appellate decisions."],
  ["FL", "Florida", "Litigation", "Consumer solar-financing cases plus GoodLeap litigation involving solar-cancellation companies."],
  ["NJ", "New Jersey", "Installer + financing", "Cases involving GoodLeap financing and major installers including Titan and Suntuity."],
  ["MO", "Missouri", "Bankruptcy overlap", "GoodLeap financing disputes with a direct Titan Solar Power bankruptcy connection."],
  ["OH", "Ohio", "Installer litigation", "Pink Energy / Power Home litigation involving GoodLeap financing."],
  ["MI", "Michigan", "Installer litigation", "Companion Pink Energy / Power Home financing disputes."],
  ["MD", "Maryland", "Arbitration ruling", "Recent federal ruling involving GoodLeap and a residential solar financing dispute."],
] as const;

const researchNext = [
  ["NC", "North Carolina", "Recent arbitrability, credit-reporting, and debt-collection issues."],
  ["LA", "Louisiana", "Recent consumer case naming GoodLeap and a solar installer."],
  ["OR", "Oregon", "Recent case involving GoodLeap and Freedom Forever Oregon."],
  ["NV", "Nevada", "Recent Truth in Lending litigation involving GoodLeap."],
  ["PA", "Pennsylvania", "Substantive solar-financing litigation, but current source depth is thinner."],
  ["CO", "Colorado", "Solar Truth in Lending litigation plus current GoodLeap solar availability."],
] as const;

export default function GoodLeapStatesPage() {
  return (
    <main className="gl-main">
      <section className="gl-section-intro">
        <p className="gl-kicker">FLAG State Tracker</p>
        <h1>Financing Litigation & Arbitration involving GoodLeap</h1>
        <p>
          We track states where GoodLeap-specific court cases, arbitration disputes, attorney general actions,
          installer failures, or closely related financing issues create a meaningful consumer research record.
        </p>
        <p className="gl-fineprint">FLAG is a research designation. It does not mean GoodLeap has been found liable or that every consumer in a FLAG state has the same issue.</p>
      </section>

      <section className="gl-method-strip" aria-label="FLAG methodology summary">
        <div><strong>What can FLAG a state?</strong><span>AG action, significant litigation, arbitration decisions, installer-bankruptcy overlap, or multiple recent GoodLeap-specific records.</span></div>
        <div><strong>What does not?</strong><span>A license alone, a single unsupported complaint, or generic solar activity.</span></div>
      </section>

      <section aria-labelledby="flag-current-heading">
        <div className="gl-heading-row">
          <div>
            <p className="gl-kicker">Current FLAG states</p>
            <h2 id="flag-current-heading">Nine states currently clear the first research threshold</h2>
          </div>
          <Link href="/goodleap/research">Research library →</Link>
        </div>
        <div className="gl-state-grid">
          {flagStates.map(([abbr, state, tag, detail]) => (
            <article className="gl-state-card" key={abbr}>
              <span>{abbr}</span>
              <div>
                <small>{tag}</small>
                <h3>{state}</h3>
                <p>{detail}</p>
                <em>Dedicated state research page planned</em>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="gl-watch-section" aria-labelledby="flag-next-heading">
        <div>
          <p className="gl-kicker">Research next</p>
          <h2 id="flag-next-heading">States with meaningful activity but not enough depth yet</h2>
          <p>These remain below FLAG-page status until the source record is stronger.</p>
        </div>
        <div className="gl-next-grid">
          {researchNext.map(([abbr, state, why]) => (
            <article key={abbr}>
              <strong>{abbr} · {state}</strong>
              <p>{why}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="gl-license-context">
        <p className="gl-kicker">National footprint</p>
        <h2>Licensing is the outer boundary, not the page strategy.</h2>
        <p>
          GoodLeap currently lists licenses or registrations in 46 states plus Washington, D.C. We do not plan to create 46 thin state pages.
          A state earns deeper coverage when the GoodLeap-specific source record is useful to consumers.
        </p>
      </section>
    </main>
  );
}
