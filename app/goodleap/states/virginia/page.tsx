import Link from "next/link";

export const metadata = {
  title: "GoodLeap in Virginia | FLAG State Research",
  description: "Virginia GoodLeap solar-financing research centered on the 2026 Attorney General case involving Power Home Solar / Pink Energy and multiple lenders.",
};

const sources = [
  {
    title: "Virginia Attorney General: lawsuits and settlements index",
    href: "https://www.oag.state.va.us/consumer-protection/index.php/laws-cases/lawsuits-settlements",
    detail: "Official Consumer Protection Section index listing the Power Home Solar / Waller / Klink / GoodLeap matter.",
  },
  {
    title: "Virginia Attorney General: First Amended Complaint",
    href: "https://www.oag.state.va.us/consumer-protection/files/Lawsuits/Com-v-Waller-First-Amended-Complaint.pdf",
    detail: "Primary filing in Commonwealth of Virginia ex rel. Jay Jones v. Waller, et al., Case No. 3:26-cv-00039-REP.",
  },
  {
    title: "Virginia Attorney General: consumer complaint form",
    href: "https://www.oag.state.va.us/consumer-protection/index.php/file-a-complaint",
    detail: "Official Virginia consumer complaint channel.",
  },
];

export default function GoodLeapVirginiaPage() {
  return (
    <main className="gl-main">
      <section className="gl-section-intro">
        <p className="gl-kicker">FLAG state · Virginia</p>
        <h1>Virginia's 2026 case connects GoodLeap financing directly to the Power Home Solar record.</h1>
        <p>
          Virginia is a first-tier FLAG state because the Attorney General filed federal litigation naming GoodLeap and other lenders alongside former Power Home Solar leadership. The amended complaint contains lender-specific allegations and transaction data that make Virginia unusually useful for consumer research.
        </p>
        <p className="gl-fineprint">
          Status: active research page. The complaint contains allegations that have not necessarily been proven in court. This page does not provide legal advice.
        </p>
      </section>

      <section className="gl-method-strip" aria-label="Virginia case summary">
        <div>
          <strong>Primary case</strong>
          <span>Commonwealth of Virginia ex rel. Jay Jones v. William Jayson Waller, Kevin Anthony Klink, Cross River Bank, GoodLeap LLC, Solar Mosaic LLC, Sunlight Financial LLC, and Technology Credit Union.</span>
        </div>
        <div>
          <strong>Federal case</strong>
          <span>3:26-cv-00039-REP · U.S. District Court, Eastern District of Virginia · amended complaint filed February 3, 2026.</span>
        </div>
      </section>

      <section aria-labelledby="va-why-heading">
        <div className="gl-heading-row">
          <div>
            <p className="gl-kicker">Why Virginia is FLAGged</p>
            <h2 id="va-why-heading">The complaint includes GoodLeap-specific allegations, not just industry context.</h2>
          </div>
        </div>
        <div className="gl-section-grid">
          <article className="gl-card gl-card-compact">
            <small>Attorney General litigation</small>
            <h3>GoodLeap is a named lender defendant</h3>
            <p>The Commonwealth alleges violations of federal and Virginia consumer-protection law arising from solar lending connected to Power Home Solar.</p>
          </article>
          <article className="gl-card gl-card-compact">
            <small>Scale alleged</small>
            <h3>More than 1,000 Virginia GoodLeap loans</h3>
            <p>The amended complaint alleges that GoodLeap extended loans for Power Home solar purchases to more than 1,000 Virginia households.</p>
          </article>
          <article className="gl-card gl-card-compact">
            <small>Lender knowledge allegations</small>
            <h3>The filing cites internal complaint-rate concerns</h3>
            <p>The Commonwealth alleges that by spring 2022 GoodLeap had reported unusually high complaint rates tied to Power Home loans and investor concern over production and fraud claims.</p>
          </article>
          <article className="gl-card gl-card-compact">
            <small>Loan-disclosure allegations</small>
            <h3>The complaint challenges dealer/program fee treatment</h3>
            <p>Virginia alleges hidden loan fees and includes a redacted GoodLeap Truth in Lending example showing how the Commonwealth says a program fee should have changed the disclosed finance charge and APR.</p>
          </article>
        </div>
      </section>

      <hr className="gl-divider" />

      <section aria-labelledby="va-consumer-heading">
        <div className="gl-heading-row">
          <div>
            <p className="gl-kicker">What a Virginia borrower can check</p>
            <h2 id="va-consumer-heading">Build the transaction record first</h2>
          </div>
        </div>
        <div className="gl-section-grid">
          <article className="gl-card gl-card-compact">
            <small>Loan documents</small>
            <h3>Truth in Lending disclosure and loan agreement</h3>
            <p>Keep the original disclosure, amount financed, finance charge, APR, payment schedule, and any later versions or amendments.</p>
          </article>
          <article className="gl-card gl-card-compact">
            <small>Price comparison</small>
            <h3>System price vs. lender funding</h3>
            <p>Compare the quoted solar price with the amount financed and any records showing how much the lender actually sent to the installer.</p>
          </article>
          <article className="gl-card gl-card-compact">
            <small>Sales claims</small>
            <h3>Expected savings and production</h3>
            <p>Preserve sales proposals, savings projections, utility-bill claims, tax-credit statements, texts, emails, and recordings.</p>
          </article>
          <article className="gl-card gl-card-compact">
            <small>Installer history</small>
            <h3>Power Home / Pink Energy records</h3>
            <p>If the installer was Power Home Solar or Pink Energy, keep service requests, production records, permits, inspection history, and bankruptcy-related notices.</p>
          </article>
        </div>
      </section>

      <hr className="gl-divider" />

      <section aria-labelledby="va-sources-heading">
        <div className="gl-heading-row">
          <div>
            <p className="gl-kicker">Primary sources</p>
            <h2 id="va-sources-heading">Use the Attorney General's own record</h2>
          </div>
        </div>
        <div className="gl-section-grid">
          {sources.map((source) => (
            <a className="gl-card gl-card-compact" href={source.href} target="_blank" rel="noreferrer" key={source.href}>
              <small>Official source</small>
              <h3>{source.title}</h3>
              <p>{source.detail}</p>
            </a>
          ))}
        </div>
      </section>

      <aside className="gl-note">
        Research note: the Virginia complaint alleges more than 4,000 consumers and more than $200 million in loans across all lender defendants. The filing separately alleges that GoodLeap itself extended loans to more than 1,000 Virginia households. Keep those figures distinct.
      </aside>

      <div className="gl-actions">
        <Link className="gl-button" href="/goodleap/states">← Back to FLAG states</Link>
        <Link className="gl-button gl-button-primary" href="/goodleap/research">GoodLeap research library</Link>
      </div>
    </main>
  );
}
