import Link from "next/link";
import { InfoPage } from "./info-page";

const sources = {
  agComplaint: {
    name: "Arizona Attorney General consumer complaint",
    publisher: "Arizona Attorney General",
    url: "https://www.azag.gov/complaints/consumer",
  },
  sunrunSettlement: {
    name: "Sunrun Consent Agreement consumer information",
    publisher: "Arizona Attorney General",
    url: "https://www.azag.gov/consumer/sunrun",
  },
  sunrunAgreement: {
    name: "Stipulated Consent Agreement: State of Arizona v. Sunrun Inc. and Vivint Solar Inc.",
    publisher: "Arizona Attorney General / Maricopa County Superior Court",
    url: "https://www.azag.gov/sites/default/files/2025-06/2025-05-22%20SUNRUN%20STIPULATED%20CONSENT%20AGREEMENT.pdf",
  },
  solarSalesGuide: {
    name: "Door-to-Door Solar Sales consumer protection guide",
    publisher: "Arizona Attorney General",
    url: "https://www.azag.gov/sites/default/files/2025-03/outreach_consumer_solar_final.pdf",
  },
  contracts: {
    name: "A.R.S. § 44-1763: Distributed energy generation system agreements and disclosures",
    publisher: "Arizona Legislature",
    url: "https://www.azleg.gov/ars/44/01763.htm",
  },
  warranties: {
    name: "A.R.S. § 44-1762: Solar energy device warranties and installation standards",
    publisher: "Arizona Legislature",
    url: "https://www.azleg.gov/ars/44/01762.htm",
  },
  interconnection: {
    name: "A.R.S. § 44-1764: Distributed energy generation systems and interconnection",
    publisher: "Arizona Legislature",
    url: "https://www.azleg.gov/ars/44/01764.htm",
  },
  rocComplaint: {
    name: "File a formal contractor complaint",
    publisher: "Arizona Registrar of Contractors",
    url: "https://roc.az.gov/file-complaint",
  },
  rocSearch: {
    name: "Arizona Registrar of Contractors license search",
    publisher: "Arizona Registrar of Contractors",
    url: "https://roc.az.gov/",
  },
  accConsumer: {
    name: "Utilities Consumer Services",
    publisher: "Arizona Corporation Commission",
    url: "https://www.azcc.gov/utilities/consumer-services",
  },
  apsSolarSurcharge: {
    name: "Court of Appeals vacates APS rooftop-solar surcharge decision",
    publisher: "Arizona Attorney General",
    url: "https://www.azag.gov/press-release/court-appeals-sides-attorney-general-mayes-vacates-corporation-commissions-solar",
  },
  visionSolar: {
    name: "Arizona residential-solar enforcement action involving Vision Solar",
    publisher: "Arizona Attorney General",
    url: "https://www.azag.gov/press-release/attorney-general-mayes-sues-residential-solar-installation-company-and-telemarketer",
  },
  titanBankruptcy: {
    name: "Titan Solar Power bankruptcy case hub",
    publisher: "U.S. Bankruptcy Court for the District of Arizona",
    url: "https://www.azb.uscourts.gov/re-titan-solar-power-inc-and-its-affiliates",
  },
};

const canonicalUrl = "https://solarcomplaint.com/states/arizona";

export function ArizonaResourcePage() {
  const sourceList = Object.values(sources);
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${canonicalUrl}#page`,
        url: canonicalUrl,
        name: "Arizona Solar Complaints, Sunrun Settlement & Consumer Rights",
        description:
          "Arizona solar consumer resources covering Sunrun settlement relief, Attorney General complaints, contractor complaints, solar contract disclosures, warranties, interconnection, and utility disputes.",
        dateModified: "2026-08-29",
        inLanguage: "en-US",
        spatialCoverage: { "@type": "AdministrativeArea", name: "Arizona" },
        isPartOf: { "@id": "https://solarcomplaint.com/#website" },
        about: [
          { "@type": "Thing", name: "Arizona solar complaints" },
          { "@type": "Thing", name: "Arizona residential solar consumer protection" },
          { "@type": "Thing", name: "Sunrun Arizona settlement" },
          { "@type": "Thing", name: "Arizona solar contracts" },
        ],
        mainEntity: {
          "@type": "ItemList",
          itemListElement: sourceList.map((source, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "WebPage",
              name: source.name,
              url: source.url,
              provider: { "@type": "Organization", name: source.publisher },
            },
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://solarcomplaint.com/" },
          { "@type": "ListItem", position: 2, name: "State resources", item: "https://solarcomplaint.com/resources" },
          { "@type": "ListItem", position: 3, name: "Arizona", item: canonicalUrl },
        ],
      },
    ],
  };

  return (
    <InfoPage
      className="state-resource-page arizona-resource-page"
      eyebrow="Arizona solar consumer guide · reviewed August 29, 2026"
      title="Arizona Solar Complaints, Sunrun Settlement & Consumer Rights"
      lede="Start here if you have a residential solar problem in Arizona. This page separates complaints against a solar company from contractor and utility disputes, then explains the Arizona-specific contract rules and the court-approved Sunrun settlement."
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <nav className="case-question-links" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <Link href="/resources">State resources</Link>
        <span aria-current="page">Arizona</span>
      </nav>

      <nav className="state-question-nav" aria-label="Arizona solar consumer questions">
        <a href="#sunrun-settlement">Sunrun or Vivint Solar complaint?</a>
        <a href="#where-to-complain">Where should I file an Arizona solar complaint?</a>
        <a href="#contract-rules">What does Arizona require in a solar contract?</a>
        <a href="#warranty-installation">What does Arizona say about warranties and installation?</a>
        <a href="#utility-interconnection">Is the problem with the solar company or my utility?</a>
        <a href="#sales-red-flags">What sales claims should I document?</a>
        <a href="#current-arizona">What else is happening with Arizona rooftop solar?</a>
        <a href="#sources">Open the primary sources</a>
      </nav>

      <section id="sunrun-settlement" className="state-source-lead" aria-labelledby="sunrun-settlement-title">
        <div className="state-source-meta"><span>Arizona Sunrun settlement</span><span>Maricopa County Superior Court · May 22, 2025</span></div>
        <h2 id="sunrun-settlement-title">Arizona&apos;s Sunrun settlement is more than a $1.25 million headline</h2>
        <p>
          Arizona filed a consumer-fraud action against Sunrun Inc. and Vivint Solar Inc. and resolved it through a court-approved stipulated consent agreement. The State alleged violations of the Arizona Consumer Fraud Act involving solar marketing, advertising, sales and leasing. Sunrun and Vivint Solar denied the allegations, and the agreement states that the settlement is not an admission of wrongdoing.
        </p>
        <p>
          The agreement requires <strong>$600,000 in consumer restitution</strong>, <strong>$600,000 in civil penalties</strong>, and <strong>$50,000 in attorney&apos;s fees and costs</strong>. The Arizona Attorney General&apos;s consumer page says eligible consumers may seek restitution, repairs and/or service-contract modification.
        </p>
        <p className="state-source-note">
          The agreement defines an eligible complaint broadly as an Arizona consumer or customer complaint, issue or question received by Sunrun during the two years following the agreement&apos;s effective date, plus unresolved complaints received before the effective date. Eligibility and the available resolution depend on the agreement and the individual facts.
        </p>
        <a href={sources.sunrunSettlement.url} target="_blank" rel="noreferrer">Arizona AG: Sunrun settlement instructions ↗</a>
      </section>

      <section className="state-source-section" aria-labelledby="settlement-details-title">
        <div className="state-source-section-heading">
          <span>What the agreement requires</span>
          <h2 id="settlement-details-title">The complaint-handling rules are unusually specific</h2>
        </div>
        <div className="state-source-grid">
          <article>
            <span>Complaint tracking</span>
            <h3>A unique complaint number</h3>
            <p>When an Arizona consumer contacts customer service with an issue or question, the agreement requires a unique complaint number so the matter and its outcome can be tracked.</p>
            <a href={sources.sunrunAgreement.url} target="_blank" rel="noreferrer">Consent agreement ¶¶ 16–18 ↗</a>
          </article>
          <article>
            <span>Initial response</span>
            <h3>Two-business-day response target</h3>
            <p>Sunrun must use commercially reasonable efforts to staff customer service at levels sufficient to provide a response within two business days. Read receipts and generic automated replies do not count as a response.</p>
            <a href={sources.sunrunAgreement.url} target="_blank" rel="noreferrer">Consent agreement ¶ 18 ↗</a>
          </article>
          <article>
            <span>Unresolved complaints</span>
            <h3>Written status updates</h3>
            <p>If a matter is still unresolved 60 days after the initial response, the agreement requires a written status update. It then calls for commercially reasonable efforts to send another written update at least every 30 days while resolution efforts continue.</p>
            <a href={sources.sunrunAgreement.url} target="_blank" rel="noreferrer">Consent agreement ¶¶ 20–21 ↗</a>
          </article>
          <article>
            <span>Resolution period</span>
            <h3>At least 180 days of resolution efforts</h3>
            <p>The agreement says Sunrun must attempt to resolve the complaint for at least 180 days after its initial response before determining that a mutually agreeable resolution cannot be reached.</p>
            <a href={sources.sunrunAgreement.url} target="_blank" rel="noreferrer">Consent agreement ¶ 21 ↗</a>
          </article>
        </div>
      </section>

      <section className="state-case-feature" aria-labelledby="sunrun-remedies-title">
        <div className="state-source-meta"><span>Potential complaint resolutions</span><span>Read the agreement before relying on any remedy</span></div>
        <h2 id="sunrun-remedies-title">Cash is only one form of relief contemplated by the settlement</h2>
        <p>
          The restitution section recognizes several ways an eligible complaint may be resolved and credited toward the $600,000 restitution amount. Those include cash payments, credits, rate reductions, reduced monthly payments, reductions to annual increases, contract cancellations, waived amounts, repairs, free labor, system removal or reinstallation work, and other contractual adjustments. Those categories do not mean every consumer is entitled to every remedy.
        </p>
        <p>
          If an eligible complaint remains unresolved after 180 days, the agreement also requires at least one additional attempt to resolve it using specified options that can include contractual restitution, continuing a lease with a cash payment or credit, and mediation or arbitration when the consumer&apos;s contract provides for those processes.
        </p>
        <a href={sources.sunrunAgreement.url} target="_blank" rel="noreferrer">Read the restitution provisions, ¶¶ 42–49 ↗</a>
      </section>

      <section className="state-source-section" aria-labelledby="sunrun-specific-problems-title">
        <div className="state-source-section-heading">
          <span>High-intent consumer questions</span>
          <h2 id="sunrun-specific-problems-title">Roof work and home sales have their own settlement rules</h2>
        </div>
        <div className="state-source-grid">
          <article>
            <span>Roof removal and reinstallation</span>
            <h3>What if the panels have to come off for a roof?</h3>
            <p>The agreement requires a written estimated removal/reinstallation cost. After the customer agrees to the cost, it sets a goal of completing removal within 90 days. After roof or construction work is finished, it sets another 90-day goal for reinstallation and reactivation. The agreement also provides for certain credits, refunds or payments when delay beyond those periods is within Sunrun&apos;s control.</p>
            <a href={sources.sunrunAgreement.url} target="_blank" rel="noreferrer">Consent agreement ¶¶ 30–32 ↗</a>
          </article>
          <article>
            <span>Home sale and lease transfer</span>
            <h3>What if I am selling a home with Sunrun solar?</h3>
            <p>After notice of a pending or completed home sale, the agreement requires a reasonable lease-assignment form and updated buyout price within 30 days. It also addresses credit review, billing transfer and refunds after an approved assignment, and says assignments may not be unreasonably hindered or delayed.</p>
            <a href={sources.sunrunAgreement.url} target="_blank" rel="noreferrer">Consent agreement ¶¶ 33–37 ↗</a>
          </article>
        </div>
      </section>

      <section id="where-to-complain" className="state-source-section" aria-labelledby="where-to-complain-title">
        <div className="state-source-section-heading">
          <span>Complaint routing</span>
          <h2 id="where-to-complain-title">Where should I file an Arizona solar complaint?</h2>
        </div>
        <div className="state-source-grid">
          <article>
            <span>Sales, advertising, contracts</span>
            <h3>Arizona Attorney General</h3>
            <p>Use the Attorney General&apos;s consumer complaint process for alleged deceptive or unfair practices involving the sale or advertising of goods and services. The office asks consumers to provide a dated chronology and copies of contracts, advertisements, warranties, proof of payment and correspondence.</p>
            <a href={sources.agComplaint.url} target="_blank" rel="noreferrer">File an Arizona consumer complaint ↗</a>
          </article>
          <article>
            <span>Installation, workmanship, licensing</span>
            <h3>Arizona Registrar of Contractors</h3>
            <p>The ROC investigates alleged violations of licensed and unlicensed contracting laws. Its formal complaint process can include a jobsite inspection, a written directive for corrective work and, when warranted, referral to the ROC legal process.</p>
            <a href={sources.rocComplaint.url} target="_blank" rel="noreferrer">Open the ROC complaint process ↗</a>
          </article>
          <article>
            <span>Utility rates, billing, utility service</span>
            <h3>Arizona Corporation Commission</h3>
            <p>The ACC can investigate certain disputes involving regulated utilities, including rates, billing responsibility and utility service. Its Consumer Services page expressly says it cannot assist with complaints regarding solar companies.</p>
            <a href={sources.accConsumer.url} target="_blank" rel="noreferrer">ACC Utilities Consumer Services ↗</a>
          </article>
          <article>
            <span>Sunrun / Vivint settlement</span>
            <h3>Follow the settlement complaint route</h3>
            <p>For a complaint seeking relief under the Sunrun agreement, use the complaint instructions on the Arizona Attorney General&apos;s dedicated Sunrun settlement page. A new issue may also need to be reported separately to the Attorney General as instructed there.</p>
            <a href={sources.sunrunSettlement.url} target="_blank" rel="noreferrer">Arizona AG Sunrun settlement page ↗</a>
          </article>
        </div>
      </section>

      <section id="contract-rules" className="state-case-feature" aria-labelledby="contract-rules-title">
        <div className="state-source-meta"><span>Arizona-specific solar law</span><span>A.R.S. § 44-1763</span></div>
        <h2 id="contract-rules-title">Arizona law requires unusually detailed solar contract disclosures</h2>
        <p>
          Arizona&apos;s distributed-energy contract statute applies to agreements governing the financing, sale or lease of covered systems. Among other things, the agreement must be signed and dated, use at least ten-point type, and include a separately acknowledged right to rescind for at least three business days after signing and before installation.
        </p>
        <p>
          The statute also requires disclosures about total cost, interest and fees, payment terms, tax incentives and conditions, warranty or maintenance transfers, restrictions on transferring the system or the underlying property, and the total costs of maintaining and operating the system over its life.
        </p>
        <p className="state-source-note">
          Savings claims receive special treatment. If a solar sales document or presentation states or suggests that a system will create financial savings, Arizona law requires the methodology to be substantiated. Specific comparative estimates are also subject to historical-rate and projected-rate disclosure requirements. The statute warns that utility rates, rate structures and tax incentives can change.
        </p>
        <a href={sources.contracts.url} target="_blank" rel="noreferrer">Read A.R.S. § 44-1763 ↗</a>
      </section>

      <section className="state-source-section" aria-labelledby="contract-check-title">
        <div className="state-source-section-heading">
          <span>Documents to compare</span>
          <h2 id="contract-check-title">If the dispute is about what you were promised, preserve both the sales pitch and the contract</h2>
        </div>
        <div className="state-source-grid">
          <article>
            <span>Costs and financing</span>
            <h3>Total price, fees and payment schedule</h3>
            <p>Keep the signed agreement, financing documents and any proposal showing the system price, dealer or installation charges, payment amount, payment frequency and escalator or annual increase.</p>
            <a href={sources.contracts.url} target="_blank" rel="noreferrer">Compare against the Arizona disclosure statute ↗</a>
          </article>
          <article>
            <span>Savings claims</span>
            <h3>Utility bill and savings projections</h3>
            <p>Keep screenshots, proposals, emails and texts showing projected utility bills or savings. Arizona law specifically addresses the methodology and rate assumptions behind savings claims.</p>
            <a href={sources.contracts.url} target="_blank" rel="noreferrer">Read the savings provisions ↗</a>
          </article>
          <article>
            <span>Tax claims</span>
            <h3>Tax-credit and incentive representations</h3>
            <p>Keep any written statement about tax credits, rebates or who qualifies. Arizona&apos;s contract statute requires disclosure of identified incentives and conditions when they are used in determining the purchase price, and the Attorney General warns consumers about promises of tax credits when they do not have taxable income.</p>
            <a href={sources.solarSalesGuide.url} target="_blank" rel="noreferrer">Arizona AG solar sales guide ↗</a>
          </article>
          <article>
            <span>Transfer and sale of home</span>
            <h3>Restrictions on transferring the system or property</h3>
            <p>Arizona law requires disclosure of certain restrictions or third-party approvals affecting transfer of the system or the real property to which it is attached. Preserve transfer documents and any communications about selling or refinancing the home.</p>
            <a href={sources.contracts.url} target="_blank" rel="noreferrer">Read the transfer disclosures ↗</a>
          </article>
        </div>
      </section>

      <section id="warranty-installation" className="state-source-section" aria-labelledby="warranty-installation-title">
        <div className="state-source-section-heading">
          <span>Installation and warranty</span>
          <h2 id="warranty-installation-title">Arizona also regulates the physical solar installation</h2>
        </div>
        <div className="state-source-grid">
          <article>
            <span>Warranty and performance</span>
            <h3>Written warranty and performance information</h3>
            <p>A.R.S. § 44-1762 establishes warranty or energy-output-guarantee requirements for covered solar devices and requires a written statement describing warranty responsibilities and performance data.</p>
            <a href={sources.warranties.url} target="_blank" rel="noreferrer">Read A.R.S. § 44-1762 ↗</a>
          </article>
          <article>
            <span>Licensed installation</span>
            <h3>Check the contractor license</h3>
            <p>The statute requires an individual installing a photovoltaic device to possess the appropriate contractor license. The Arizona Registrar of Contractors provides the state license search and complaint system.</p>
            <a href={sources.rocSearch.url} target="_blank" rel="noreferrer">Search Arizona contractor licenses ↗</a>
          </article>
          <article>
            <span>Codes and workmanship</span>
            <h3>Fire, safety and building codes still apply</h3>
            <p>Arizona law requires solar installations to comply with applicable fire, safety and building codes and other state, federal and local requirements. Contractor failures can also be subject to ROC discipline.</p>
            <a href={sources.warranties.url} target="_blank" rel="noreferrer">Read the installation standards ↗</a>
          </article>
          <article>
            <span>Complaint process</span>
            <h3>Document the physical condition of the system and roof</h3>
            <p>For installation or workmanship concerns, preserve photos, inspection reports, permits, repair estimates and the installer&apos;s license information. The ROC complaint process may include a jobsite inspection.</p>
            <a href={sources.rocComplaint.url} target="_blank" rel="noreferrer">Arizona ROC formal complaint ↗</a>
          </article>
        </div>
      </section>

      <section id="utility-interconnection" className="state-case-feature" aria-labelledby="utility-interconnection-title">
        <div className="state-source-meta"><span>Utility vs. solar-company dispute</span><span>A.R.S. §§ 44-1763 and 44-1764</span></div>
        <h2 id="utility-interconnection-title">A system that is installed is not necessarily a system that is energized and interconnected</h2>
        <p>
          Arizona law generally requires a complete interconnection application to the utility before a covered distributed-energy system is installed, energized or interconnected, subject to the statute&apos;s timing rules and exceptions. Separately, A.R.S. § 44-1763 says recurring payments under a distributed-energy system lease may not begin until the system is energized and interconnected.
        </p>
        <p>
          If the dispute concerns the installer&apos;s promises or conduct, the Attorney General or ROC may be the relevant state route. If the dispute is about a regulated utility&apos;s rates, billing, service or procedures, the ACC may be relevant. The ACC expressly says it does not handle complaints against solar companies.
        </p>
        <a href={sources.interconnection.url} target="_blank" rel="noreferrer">Read A.R.S. § 44-1764 ↗</a><br />
        <a href={sources.accConsumer.url} target="_blank" rel="noreferrer">Arizona Corporation Commission Consumer Services ↗</a>
      </section>

      <section id="sales-red-flags" className="state-source-section" aria-labelledby="sales-red-flags-title">
        <div className="state-source-section-heading">
          <span>Arizona AG consumer guidance</span>
          <h2 id="sales-red-flags-title">What solar sales claims should I document?</h2>
        </div>
        <div className="state-source-grid">
          <article>
            <span>High-pressure sale</span>
            <h3>“Sign right now”</h3>
            <p>The Arizona Attorney General warns consumers about salespeople insisting that a contract must be signed immediately. Preserve the messages, appointment notes and any deadline or limited-time claim.</p>
            <a href={sources.solarSalesGuide.url} target="_blank" rel="noreferrer">Read the Arizona AG guide ↗</a>
          </article>
          <article>
            <span>Cost and savings</span>
            <h3>“Solar will cost nothing” or create instant savings</h3>
            <p>The AG warns against claims that installing solar will cost nothing or automatically create immediate savings. Arizona law also requires substantiation when sales material claims financial savings.</p>
            <a href={sources.solarSalesGuide.url} target="_blank" rel="noreferrer">Arizona AG solar sales guide ↗</a>
          </article>
          <article>
            <span>Utility affiliation</span>
            <h3>“We work with your utility”</h3>
            <p>The AG guide tells consumers to verify claims that a salesperson works for or with a utility. Arizona&apos;s 2023 Vision Solar enforcement action also alleged false utility or government-affiliation representations by telemarketers.</p>
            <a href={sources.visionSolar.url} target="_blank" rel="noreferrer">Read the Arizona enforcement record ↗</a>
          </article>
          <article>
            <span>Electronic documents</span>
            <h3>Someone creates an email account or signs for you</h3>
            <p>The AG specifically warns consumers not to allow a company to create an email account for them or sign documents on their behalf. Preserve access records, signature pages and the complete electronic contract package.</p>
            <a href={sources.solarSalesGuide.url} target="_blank" rel="noreferrer">Read the Arizona AG guide ↗</a>
          </article>
        </div>
      </section>

      <section id="current-arizona" className="state-source-section" aria-labelledby="current-arizona-title">
        <div className="state-source-section-heading">
          <span>Current Arizona solar record</span>
          <h2 id="current-arizona-title">Recent Arizona rooftop-solar developments worth separating from company complaints</h2>
        </div>
        <div className="state-source-grid">
          <article>
            <span>APS rooftop-solar surcharge · June 16, 2026</span>
            <h3>Arizona Court of Appeals vacated the surcharge decision</h3>
            <p>The Arizona Attorney General reports that the Court of Appeals vacated the Corporation Commission decision authorizing a special APS rooftop-solar surcharge and remanded the matter for further proceedings. This is a utility-rate issue, not a finding about a solar installer.</p>
            <a href={sources.apsSolarSurcharge.url} target="_blank" rel="noreferrer">Read the Arizona AG update ↗</a>
          </article>
          <article>
            <span>Titan Solar Power · Chapter 7</span>
            <h3>Arizona has a state-named Titan debtor</h3>
            <p>The U.S. Bankruptcy Court for the District of Arizona lists <strong>Titan Solar Power AZ, Inc.</strong> under case <strong>2:24-bk-04979-DPC</strong>. That bankruptcy record does not determine the status of an individual customer&apos;s loan, warranty or claim.</p>
            <Link href="/cases/titan-solar-power/warranty-after-bankruptcy">Titan warranty-after-bankruptcy research →</Link>
            <a href={sources.titanBankruptcy.url} target="_blank" rel="noreferrer">Official bankruptcy case hub ↗</a>
          </article>
        </div>
      </section>

      <section className="state-case-feature" aria-labelledby="document-checklist-title">
        <div className="state-source-meta"><span>Before filing</span><span>Build one clean record</span></div>
        <h2 id="document-checklist-title">What documents should an Arizona solar consumer keep?</h2>
        <p>
          Keep the complete sales proposal, signed or electronic contract, financing or lease documents, tax-credit or savings representations, utility bills from before and after installation, production records, permits and inspections, contractor-license information, roof or repair records, cancellation attempts, complaint numbers, and company correspondence. For an AG complaint, the state specifically recommends a dated chronology and copies of supporting records while keeping the originals.
        </p>
        <a href={sources.agComplaint.url} target="_blank" rel="noreferrer">Arizona Attorney General complaint guidance ↗</a>
      </section>

      <section id="sources" className="state-source-section" aria-labelledby="sources-title">
        <div className="state-source-section-heading">
          <span>{String(sourceList.length).padStart(2, "0")} primary sources</span>
          <h2 id="sources-title">Arizona solar consumer source library</h2>
        </div>
        <div className="state-source-grid">
          {sourceList.map((source) => (
            <article key={source.url}>
              <span>Primary source</span>
              <h3>{source.name}</h3>
              <p>{source.publisher}</p>
              <a href={source.url} target="_blank" rel="noreferrer">Open source ↗</a>
            </article>
          ))}
        </div>
      </section>

      <section className="info-section case-notice" aria-label="Source boundary">
        <strong>Source boundary</strong>
        <p>
          This page summarizes statutes, agency guidance, court-approved settlement terms and current public records. It does not determine whether a particular contract violates Arizona law or whether a particular consumer qualifies for settlement relief. Use the linked primary source when the wording of a deadline, remedy or requirement matters.
        </p>
      </section>

      <div className="state-page-links">
        <Link href="/companies/sunrun">Sunrun investigations and settlements →</Link>
        <Link href="/research/solar-sales-financing-after-complaint">Related source-backed research →</Link>
        <Link href="/cases/titan-solar-power">Titan Solar Power tracker →</Link>
        <Link href="/resources">Choose another state →</Link>
        <Link href="/guides">Browse consumer guides →</Link>
      </div>
    </InfoPage>
  );
}
