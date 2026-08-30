import Link from "next/link";

export const metadata = {
  title: "GoodLeap in Minnesota | FLAG State Research",
  description: "Minnesota GoodLeap solar-financing research, including Attorney General litigation, dealer-fee allegations, federal consumer-finance context, and official consumer resources.",
};

const sources = [
  {
    title: "Minnesota Attorney General: March 2024 solar-lending lawsuit",
    href: "https://www.ag.state.mn.us/Office/Communications/2024/03/08_SolarLending.asp",
    detail: "Official announcement of State of Minnesota v. GoodLeap LLC, et al., Hennepin County Court File No. 27-CV-24-3558.",
  },
  {
    title: "Minnesota Attorney General: filed complaint",
    href: "https://www.ag.state.mn.us/Office/Communications/2024/docs/SolarLending_Complaint.pdf",
    detail: "Primary court filing containing the State's allegations against GoodLeap and three other solar lenders.",
  },
  {
    title: "CFPB: Solar Financing Issue Spotlight",
    href: "https://www.consumerfinance.gov/data-research/research-reports/issue-spotlight-solar-financing/",
    detail: "Federal consumer-finance analysis of solar-specific loans; the CFPB cites the Minnesota GoodLeap case in its discussion of dealer fees.",
  },
  {
    title: "Minnesota Attorney General: file a consumer complaint",
    href: "https://www.ag.state.mn.us/Office/Complaint.asp",
    detail: "Official complaint channel for Minnesota consumers.",
  },
];

export default function GoodLeapMinnesotaPage() {
  return (
    <main className="gl-main">
      <section className="gl-section-intro">
        <p className="gl-kicker">FLAG state · Minnesota</p>
        <h1>Minnesota has one of the clearest public GoodLeap enforcement records.</h1>
        <p>
          Minnesota is a first-tier FLAG state because its Attorney General filed a consumer-protection case naming GoodLeap directly and published the underlying complaint. The case focuses on the pricing and disclosure of solar-loan financing.
        </p>
        <p className="gl-fineprint">
          Status: active research page. Allegations in complaints are allegations, not findings of liability. This page does not provide legal advice.
        </p>
      </section>

      <section className="gl-method-strip" aria-label="Minnesota case summary">
        <div>
          <strong>Primary case</strong>
          <span>State of Minnesota v. GoodLeap LLC, Sunlight Financial LLC, Solar Mosaic LLC, and Dividend Solar Finance LLC.</span>
        </div>
        <div>
          <strong>Court file</strong>
          <span>27-CV-24-3558 · Hennepin County District Court · filed March 8, 2024.</span>
        </div>
      </section>

      <section aria-labelledby="mn-why-heading">
        <div className="gl-heading-row">
          <div>
            <p className="gl-kicker">Why Minnesota is FLAGged</p>
            <h2 id="mn-why-heading">The record goes beyond isolated consumer complaints.</h2>
          </div>
        </div>
        <div className="gl-section-grid">
          <article className="gl-card gl-card-compact">
            <small>Attorney General action</small>
            <h3>GoodLeap is a named defendant</h3>
            <p>The Minnesota Attorney General sued GoodLeap and three other solar lenders under state consumer-protection and lending laws.</p>
          </article>
          <article className="gl-card gl-card-compact">
            <small>Dealer-fee allegations</small>
            <h3>The case centers on the financed price</h3>
            <p>The State alleges that upfront lender fees were embedded in financed solar prices without being adequately identified to borrowers.</p>
          </article>
          <article className="gl-card gl-card-compact">
            <small>Market-wide allegations</small>
            <h3>The complaint alleges substantial statewide impact</h3>
            <p>The Attorney General alleges the four lenders collected about $35 million in hidden fees across more than 5,000 Minnesota solar systems since 2017. That figure applies to the defendants collectively, not GoodLeap alone.</p>
          </article>
          <article className="gl-card gl-card-compact">
            <small>Federal relevance</small>
            <h3>CFPB later cited the Minnesota case</h3>
            <p>The CFPB's 2024 solar-financing report cites the Minnesota complaint in its discussion of dealer fees and loan-principal markups.</p>
          </article>
        </div>
      </section>

      <hr className="gl-divider" />

      <section aria-labelledby="mn-consumer-heading">
        <div className="gl-heading-row">
          <div>
            <p className="gl-kicker">What a Minnesota borrower can check</p>
            <h2 id="mn-consumer-heading">Documents that matter</h2>
          </div>
        </div>
        <div className="gl-section-grid">
          <article className="gl-card gl-card-compact">
            <small>Compare prices</small>
            <h3>Cash price vs. financed price</h3>
            <p>Look for any difference between the cash system price, sales proposal, amount financed, and the amount actually paid to the installer.</p>
          </article>
          <article className="gl-card gl-card-compact">
            <small>Loan disclosures</small>
            <h3>Finance charge and amount financed</h3>
            <p>Keep the Truth in Lending disclosure, loan agreement, payment schedule, and any dealer or program-fee references.</p>
          </article>
          <article className="gl-card gl-card-compact">
            <small>Sales record</small>
            <h3>What was represented before signing</h3>
            <p>Save proposals, texts, emails, recordings, utility-savings estimates, tax-credit representations, and versions of the contract.</p>
          </article>
          <article className="gl-card gl-card-compact">
            <small>Installer record</small>
            <h3>Who sold and installed the system</h3>
            <p>Financing disputes often overlap with installer conduct. Keep installer contracts, permits, inspection records, completion documents, and service history.</p>
          </article>
        </div>
      </section>

      <hr className="gl-divider" />

      <section aria-labelledby="mn-sources-heading">
        <div className="gl-heading-row">
          <div>
            <p className="gl-kicker">Primary sources</p>
            <h2 id="mn-sources-heading">Start with the official record</h2>
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
        Research note: the $35 million and 5,000-system figures are allegations covering all four lender defendants in the Minnesota case. They should not be presented as GoodLeap-only totals unless a later source isolates GoodLeap's share.
      </aside>

      <div className="gl-actions">
        <Link className="gl-button" href="/goodleap/states">← Back to FLAG states</Link>
        <Link className="gl-button gl-button-primary" href="/goodleap/research">GoodLeap research library</Link>
      </div>
    </main>
  );
}
