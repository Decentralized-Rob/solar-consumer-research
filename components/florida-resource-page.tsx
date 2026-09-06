import Link from "next/link";
import { getStateSolarCase } from "../lib/state-research";
import { getTitanStateBankruptcy, titanBankruptcyCourtUrl } from "../lib/titan-state-research";
import { AccountPanel } from "./account-panel";
import { InfoPage } from "./info-page";

const sources = {
  firstFederalOrder: {
    name: "Dow v. SunRun, Inc. — October 30, 2025 remand order",
    publisher: "U.S. District Court for the Middle District of Florida via Justia",
    url: "https://law.justia.com/cases/federal/district-courts/florida/flmdce/8%3A2025cv02459/447334/10/",
  },
  laterFederalDocket: {
    name: "Dow v. SunRun, Inc. — later federal docket",
    publisher: "U.S. District Court for the Middle District of Florida via Justia",
    url: "https://dockets.justia.com/docket/florida/flmdce/8%3A2025cv03324/450866",
  },
  solarDisclosure: {
    name: "Florida Statutes § 520.23 — Disclosures required",
    publisher: "Florida Senate",
    url: "https://www.flsenate.gov/Laws/Statutes/2026/520.23",
  },
  solarPenalties: {
    name: "Florida Statutes § 520.25 — Penalties",
    publisher: "Florida Legislature",
    url: "https://leg.state.fl.us/Statutes/index.cfm?App_mode=Display_Statute&Search_String=&URL=0500-0599%2F0520%2FSections%2F0520.25.html",
  },
  agComplaint: {
    name: "Florida Attorney General consumer complaint form",
    publisher: "Florida Attorney General",
    url: "https://www.myfloridalegal.com/consumer-protection/consumer-complaint-form",
  },
  dbprLicense: {
    name: "Verify a Florida licensee",
    publisher: "Florida Department of Business and Professional Regulation",
    url: "https://www.myfloridalicense.com/wl11.asp?mode=2",
  },
  dbprComplaint: {
    name: "DBPR Division of Regulation complaints",
    publisher: "Florida Department of Business and Professional Regulation",
    url: "https://www2.myfloridalicense.com/division-of-regulation/complaints/",
  },
};

const canonicalUrl = "https://solarcomplaint.com/states/florida";

const disclosureChecks = [
  {
    title: "Roof warranties",
    text: "Florida's solar disclosure law calls for a description of any roof warranties.",
    cite: "§ 520.23(23)",
  },
  {
    title: "Roof replacement",
    text: "The disclosure must warn that replacing a roof may require reinstalling the solar system.",
    cite: "§ 520.23(24)",
  },
  {
    title: "System removal fees",
    text: "One-time and recurring fees must be described, including estimated system-removal fees when applicable.",
    cite: "§ 520.23(10)",
  },
  {
    title: "Liens and UCC filings",
    text: "The disclosure addresses liens and whether a UCC-1 or fixture filing will be made.",
    cite: "§ 520.23(28)-(29)",
  },
  {
    title: "Selling the home",
    text: "Transfer restrictions and lease-transfer conditions must be disclosed when applicable.",
    cite: "§ 520.23(30)-(31)",
  },
  {
    title: "Financing and total cost",
    text: "The statute requires total-cost and financing disclosures, including interest and other fees.",
    cite: "§ 520.23(6), (11)-(12)",
  },
  {
    title: "Cancellation window",
    text: "The disclosure generally must notify a buyer or lessee of at least a three-business-day rescission period, subject to statutory exceptions.",
    cite: "§ 520.23(13)",
  },
  {
    title: "Who installs and services it",
    text: "Installer and maintenance-provider contact information and valid state contractor license numbers are part of the required disclosures when applicable.",
    cite: "§ 520.23(2)-(3)",
  },
];

export function FloridaResourcePage() {
  const sourceList = Object.values(sources);
  const floridaEnforcement = getStateSolarCase("FL");
  const titanBankruptcy = getTitanStateBankruptcy("FL");
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${canonicalUrl}#page`,
        url: canonicalUrl,
        name: "Sunrun Roof Dispute in Florida: Homeowner Alleged $8,000 Removal Cost and $35,000 Buyout",
        description:
          "Florida solar consumer research centered on a Sunrun roof-removal lawsuit, Florida solar disclosure requirements, official complaint routes, contractor-license checks, and free public-source research assistance.",
        dateModified: "2026-09-06",
        inLanguage: "en-US",
        spatialCoverage: { "@type": "AdministrativeArea", name: "Florida" },
        isPartOf: { "@id": "https://solarcomplaint.com/#website" },
        about: [
          { "@type": "Thing", name: "Sunrun roof disputes in Florida" },
          { "@type": "Thing", name: "Sunrun roof replacement in Florida" },
          { "@type": "Thing", name: "Florida solar panel removal costs" },
          { "@type": "Thing", name: "Florida solar contract disclosures" },
          { "@type": "Thing", name: "Florida solar complaints" },
          { "@type": "Thing", name: "Titan Solar Power Florida bankruptcy" },
        ],
        citation: [
          ...sourceList.map((source) => ({
            "@type": "WebPage",
            name: source.name,
            url: source.url,
            provider: { "@type": "Organization", name: source.publisher },
          })),
          floridaEnforcement && {
            "@type": "WebPage",
            name: floridaEnforcement.title,
            url: floridaEnforcement.url,
            provider: { "@type": "Organization", name: floridaEnforcement.publisher },
          },
          titanBankruptcy && {
            "@type": "WebPage",
            name: `${titanBankruptcy.debtorName} bankruptcy case reference`,
            url: titanBankruptcyCourtUrl,
            provider: { "@type": "Organization", name: "U.S. Bankruptcy Court for the District of Arizona" },
          },
        ].filter(Boolean),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://solarcomplaint.com/" },
          { "@type": "ListItem", position: 2, name: "State resources", item: "https://solarcomplaint.com/resources" },
          { "@type": "ListItem", position: 3, name: "Florida", item: canonicalUrl },
        ],
      },
    ],
  };

  return (
    <InfoPage
      className="state-resource-page florida-resource-page"
      eyebrow="Florida solar consumer resources · reviewed September 6, 2026"
      title="Sunrun Roof Dispute in Florida: Homeowner Alleged $8,000 Removal Cost and $35,000 Buyout"
      lede="A Florida homeowner alleged that Sunrun would not remove its solar panels so she could replace a leaking roof unless she signed a new agreement and paid more than $8,000. When she sought cancellation instead, she alleged Sunrun demanded about $35,000 to buy out the contract."
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <nav className="florida-hero-action" aria-label="Featured Florida case">
        <a href="#sunrun-roof-case">Read the Florida case →</a>
      </nav>

      <section className="florida-help-strip" aria-labelledby="florida-help-title">
        <div>
          <span>Free Research Assistance</span>
          <h2 id="florida-help-title">Have a Florida solar situation of your own?</h2>
          <p>Tell us the company, your Florida city or town, and what happened. We can help locate relevant public records and official sources.</p>
        </div>
        <a href="#research-help">Request research help</a>
      </section>

      <section className="florida-situation-section" aria-labelledby="florida-situation-title">
        <h2 id="florida-situation-title">Start with your situation</h2>
        <div className="florida-situation-grid">
          <a href="#research-help"><strong>Sunrun or another company</strong><span>Research the company and public record →</span></a>
          <a href="#sunrun-roof-case"><strong>Roof or installation issues</strong><span>See the Florida Sunrun roof case →</span></a>
          <a href="#florida-disclosures"><strong>Loan, lease or buyout</strong><span>Check Florida disclosure requirements →</span></a>
          <a href="#florida-routes"><strong>System not working</strong><span>Find the official Florida route →</span></a>
        </div>
        <a className="florida-situation-law" href="#florida-disclosures"><strong>What Florida law requires</strong><span>Check the solar disclosure items →</span></a>
      </section>

      <section id="sunrun-roof-case" className="florida-case-hero" aria-labelledby="sunrun-roof-case-title">
        <div className="florida-case-copy">
          <p className="florida-kicker">Featured Florida Sunrun case</p>
          <h2 id="sunrun-roof-case-title">Sunrun roof replacement dispute: panel removal, a new agreement and a contract buyout.</h2>
          <p>
            According to an October 2025 federal court order summarizing Linda Dow&apos;s amended complaint, she entered a 25-year Sunrun contract in 2019. After learning in September 2024 that her roof was leaking, she sought to replace it. The order says she alleged Sunrun refused to remove the panels unless she agreed to sign a new contract and pay more than $8,000, the estimated panel-removal cost.
          </p>
          <p>
            Dow then sought to cancel. The court order says Sunrun demanded a $35,000 buyout. She retained an attorney and later sued, alleging three violations of the Florida Consumer Collection Practices Act. Those claims were allegations, not findings that Sunrun violated the law.
          </p>
          <div className="florida-case-actions">
            <a href={sources.firstFederalOrder.url} target="_blank" rel="noreferrer">Read the federal court order ↗</a>
            <a href={sources.laterFederalDocket.url} target="_blank" rel="noreferrer">See the later docket and settlement ↗</a>
          </div>
        </div>

        <div className="florida-case-numbers" aria-label="Key figures in the Dow v. SunRun case">
          <article>
            <strong>25 years</strong>
            <span>Sunrun contract described by the court</span>
          </article>
          <article>
            <strong>$8,000+</strong>
            <span>alleged panel-removal cost</span>
          </article>
          <article>
            <strong>$35,000</strong>
            <span>alleged contract buyout demand</span>
          </article>
          <article>
            <strong>3 claims</strong>
            <span>FCCPA violations alleged in the amended complaint</span>
          </article>
        </div>
      </section>

      <section className="florida-judge-callout" aria-labelledby="judge-callout-title">
        <span>What the federal judge actually said</span>
        <h2 id="judge-callout-title">One Sunrun removal-cost argument was called a “red herring.”</h2>
        <p>
          In deciding whether the first federal case belonged in federal court, Judge Kathryn Kimball Mizelle rejected Sunrun&apos;s attempt to include the $8,000 panel-removal cost in the amount in controversy. The order called that theory a “red herring” and later said of Sunrun&apos;s additional theories, “None are persuasive.” Those statements addressed federal jurisdiction, not whether Sunrun committed the consumer-law violations Dow alleged.
        </p>
        <a href={sources.firstFederalOrder.url} target="_blank" rel="noreferrer">Read the relevant court order ↗</a>
      </section>

      <section className="florida-timeline" aria-labelledby="florida-timeline-title">
        <div className="florida-section-heading">
          <span>Case timeline</span>
          <h2 id="florida-timeline-title">From roof leak to settlement.</h2>
        </div>
        <ol>
          <li>
            <span>September 2024</span>
            <p>Dow learned of a roof leak and sought a roof replacement estimated at $23,000. The later federal order summarized her allegation that Sunrun would not remove its panels unless she signed a new agreement and paid more than $8,000.</p>
          </li>
          <li>
            <span>August 2025</span>
            <p>Dow sued in Pasco County and filed an amended complaint alleging three violations of the Florida Consumer Collection Practices Act.</p>
          </li>
          <li>
            <span>October 30, 2025</span>
            <p>The Middle District of Florida sent the first removed case back to state court after finding Sunrun had not established the federal amount-in-controversy requirement.</p>
          </li>
          <li>
            <span>December 2025 to January 2026</span>
            <p>Sunrun removed the Pasco County case to federal court again and moved to compel arbitration. The parties then jointly asked to stay the case for binding arbitration, which the court granted on January 6.</p>
          </li>
          <li>
            <span>April 2026</span>
            <p>The federal docket reports that mediation held April 2 ended in settlement. Public docket entries do not disclose the settlement terms.</p>
          </li>
        </ol>
      </section>

      <section id="florida-disclosures" className="florida-disclosure-section" aria-labelledby="florida-disclosures-title">
        <div className="florida-section-heading">
          <span>Florida paperwork check</span>
          <h2 id="florida-disclosures-title">Florida solar sales and leases covered by § 520.23 require a separate disclosure. Check yours.</h2>
          <p>
            Florida Statutes § 520.23 requires a separate written disclosure, separately acknowledged by the buyer or lessee, covering dozens of items when applicable. Several of them matter directly when a homeowner later needs roof work or wants to sell the home.
          </p>
        </div>

        <div className="florida-disclosure-list">
          {disclosureChecks.map((item) => (
            <details key={item.title}>
              <summary>
                <span>{item.title}</span>
                <small>{item.cite}</small>
              </summary>
              <p>{item.text}</p>
            </details>
          ))}
        </div>

        <div className="florida-law-note">
          <strong>Important distinction</strong>
          <p>The Dow lawsuit did not establish that Sunrun violated § 520.23. The disclosure requirements are included here so Florida homeowners can compare their own paperwork with the current statute.</p>
          <div>
            <a href={sources.solarDisclosure.url} target="_blank" rel="noreferrer">Read Florida § 520.23 ↗</a>
            <a href={sources.solarPenalties.url} target="_blank" rel="noreferrer">Read Florida § 520.25 penalties ↗</a>
          </div>
        </div>
      </section>

      <section className="florida-penalty-card" aria-labelledby="florida-penalty-title">
        <p className="florida-kicker">Why the disclosure matters</p>
        <h2 id="florida-penalty-title">Florida law attaches consequences to a willful and intentional violation.</h2>
        <p>
          Section 520.25 says a seller who willfully and intentionally violates this part may face a noncriminal fine up to the cost of the distributed-energy system. It also provides a potential owner recovery or setoff involving finance charges and fees, plus attorney fees and costs. Whether that provision applies to a particular agreement depends on the facts and the law governing that transaction.
        </p>
        <a href={sources.solarPenalties.url} target="_blank" rel="noreferrer">Read the current Florida statute ↗</a>
      </section>

      <section id="florida-routes" className="florida-routes" aria-labelledby="florida-routes-title">
        <div className="florida-section-heading">
          <span>Official Florida routes</span>
          <h2 id="florida-routes-title">Use the route that matches the situation.</h2>
        </div>
        <div className="florida-route-grid">
          <a href={sources.agComplaint.url} target="_blank" rel="noreferrer">
            <span>Consumer transaction</span>
            <strong>Florida Attorney General complaint</strong>
            <p>For complaints about deceptive or unfair business conduct in a consumer transaction.</p>
            <b>Open official complaint route ↗</b>
          </a>
          <a href={sources.dbprLicense.url} target="_blank" rel="noreferrer">
            <span>Contractor check</span>
            <strong>Verify a Florida license</strong>
            <p>Check the contractor or business name, license type, current status, and public license record.</p>
            <b>Search DBPR records ↗</b>
          </a>
          <a href={sources.dbprComplaint.url} target="_blank" rel="noreferrer">
            <span>Licensed or unlicensed activity</span>
            <strong>File a DBPR complaint</strong>
            <p>DBPR explains complaint routes for regulated professionals and suspected unlicensed activity.</p>
            <b>Open DBPR complaint information ↗</b>
          </a>
          <Link href="/companies/sunrun">
            <span>SolarComplaint.com research</span>
            <strong>Sunrun complaints, lawsuits and enforcement</strong>
            <p>Continue into documented Sunrun investigations, enforcement actions, settlements, and cases from other states.</p>
            <b>Browse Sunrun research →</b>
          </Link>
        </div>
      </section>

      {floridaEnforcement && (
        <section className="florida-judge-callout" aria-labelledby="florida-enforcement-title">
          <span>Existing Florida enforcement record</span>
          <h2 id="florida-enforcement-title">{floridaEnforcement.title}</h2>
          <p>{floridaEnforcement.summary}</p>
          <small>{floridaEnforcement.publisher} · Source dated {floridaEnforcement.publishedAt}</small>
          <a href={floridaEnforcement.url} target="_blank" rel="noreferrer">Read the Florida Attorney General source ↗</a>
        </section>
      )}

      {titanBankruptcy && (
        <section className="florida-penalty-card" aria-labelledby="florida-titan-title">
          <p className="florida-kicker">Florida Titan Solar Power record</p>
          <h2 id="florida-titan-title">Titan Solar Power FL, Inc. appears in the Chapter 7 bankruptcy record.</h2>
          <p>
            The U.S. Bankruptcy Court for the District of Arizona lists <strong>{titanBankruptcy.debtorName}</strong> as an associated Titan debtor under case <strong>{titanBankruptcy.caseNumber}</strong>. That listing identifies the Florida-named debtor; it does not determine the status of an individual customer&apos;s contract, loan, warranty, or bankruptcy claim.
          </p>
          <a href={titanBankruptcyCourtUrl} target="_blank" rel="noreferrer">View the official Titan bankruptcy case hub ↗</a>
          <p><Link href="/cases/titan-solar-power/warranty-after-bankruptcy">Titan Solar Power warranty after bankruptcy →</Link></p>
        </section>
      )}

      <section className="florida-more-research" aria-labelledby="florida-more-title">
        <div>
          <span>Keep researching</span>
          <h2 id="florida-more-title">Florida is one part of the record.</h2>
        </div>
        <div>
          <Link href="/cases/titan-solar-power">Titan Solar Power closure and bankruptcy tracker →</Link>
          <Link href="/federal-resources">Federal solar consumer resources →</Link>
          <Link href="/guides">Solar consumer guides →</Link>
          <Link href="/resources">Choose another state →</Link>
        </div>
      </section>

      <section id="research-help" className="florida-research-cta" aria-labelledby="research-help-title">
        <p className="florida-kicker">Free Research Assistance</p>
        <h2 id="research-help-title">Need help finding the Florida record that fits your situation?</h2>
        <p>Use the form with your Florida city or town, the company involved, and a brief description. We can help identify relevant public records and official sources. Do not send account numbers, passwords, government ID, or unredacted contracts.</p>
        <AccountPanel defaultStateCode="FL" />
      </section>
    </InfoPage>
  );
}
