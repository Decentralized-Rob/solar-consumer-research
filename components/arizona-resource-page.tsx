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
        name: "Arizona Solar Complaints: Sunrun Settlement, State Rules and Where to File",
        description:
          "Arizona solar complaint routes, Sunrun and Vivint Solar settlement terms, contractor complaints, contract disclosures, warranties, interconnection and official state sources.",
        dateModified: "2026-08-29",
        inLanguage: "en-US",
        spatialCoverage: { "@type": "AdministrativeArea", name: "Arizona" },
        isPartOf: { "@id": "https://solarcomplaint.com/#website" },
        about: [
          { "@type": "Thing", name: "Arizona solar complaints" },
          { "@type": "Thing", name: "Sunrun Arizona settlement" },
          { "@type": "Thing", name: "Arizona solar contracts" },
          { "@type": "Thing", name: "Arizona solar contractor complaints" },
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
      eyebrow="Arizona solar consumer resources · reviewed August 29, 2026"
      title="Arizona Solar Complaints: Sunrun Settlement, State Rules and Where to File"
      lede="Arizona has different complaint routes depending on the problem. This page starts with the major Arizona solar records, then shows where to file and what state law says about contracts, installation and interconnection."
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <nav className="case-question-links" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <Link href="/resources">State resources</Link>
        <span aria-current="page">Arizona</span>
      </nav>

      <section id="arizona-record" className="state-source-section" aria-labelledby="arizona-record-title">
        <div className="state-source-section-heading">
          <span>Arizona solar record</span>
          <h2 id="arizona-record-title">What is happening in Arizona</h2>
        </div>
        <div className="state-source-grid">
          <article>
            <span>Sunrun and Vivint Solar · May 22, 2025</span>
            <h3>$1.25 million Arizona settlement and a two-year restitution process</h3>
            <p>Arizona&apos;s court-approved agreement with Sunrun and Vivint Solar includes $600,000 in civil penalties, $50,000 in fees and costs, and a $600,000 Total Restitution Amount. It also sets complaint-handling, roof-work and home-transfer requirements.</p>
            <a href="#sunrun-settlement">Read what the agreement requires ↓</a>
            <p><Link href="/companies/sunrun">See other documented Sunrun investigations and enforcement →</Link></p>
          </article>
          <article>
            <span>Vision Solar · July 27, 2023</span>
            <h3>Arizona joined a solar-sales and telemarketing lawsuit</h3>
            <p>Arizona, the U.S. Department of Justice and the Federal Trade Commission sued Vision Solar and related defendants over alleged telemarketing violations and alleged misrepresentations involving residential solar sales. The allegations are claims in the case, not findings by this site.</p>
            <a href={sources.visionSolar.url} target="_blank" rel="noreferrer">Read the Arizona AG announcement ↗</a>
          </article>
          <article>
            <span>APS rooftop-solar surcharge · June 16, 2026</span>
            <h3>Court of Appeals vacated the surcharge decision</h3>
            <p>The Arizona Attorney General reports that the Court of Appeals vacated the Corporation Commission decision authorizing a special APS rooftop-solar surcharge and sent the matter back for further proceedings. This is a utility-rate issue.</p>
            <a href={sources.apsSolarSurcharge.url} target="_blank" rel="noreferrer">Read the Arizona AG update ↗</a>
          </article>
          <article>
            <span>Titan Solar Power · Chapter 7</span>
            <h3>Titan Solar Power AZ, Inc. is listed in the Arizona bankruptcy cases</h3>
            <p>The U.S. Bankruptcy Court for the District of Arizona lists Titan Solar Power AZ, Inc. under case <strong>2:24-bk-04979-DPC</strong>. The listing does not determine the status of an individual customer&apos;s loan, warranty or bankruptcy claim.</p>
            <Link href="/cases/titan-solar-power">Titan Solar Power bankruptcy tracker →</Link><br />
            <Link href="/cases/titan-solar-power/warranty-after-bankruptcy">Titan warranty-after-bankruptcy research →</Link>
          </article>
        </div>
      </section>

      <section id="where-to-complain" className="state-source-section" aria-labelledby="where-to-complain-title">
        <div className="state-source-section-heading">
          <span>Arizona complaint routes</span>
          <h2 id="where-to-complain-title">Where to file an Arizona solar complaint</h2>
        </div>
        <div className="state-source-grid">
          <article>
            <span>Sales, advertising, contracts</span>
            <h3>Arizona Attorney General</h3>
            <p>The Attorney General investigates consumer complaints involving deceptive or unfair practices in the sale or advertising of goods and services. Its complaint guidance asks for events in date order and copies of contracts, advertisements, warranties, proof of payment and other supporting records.</p>
            <a href={sources.agComplaint.url} target="_blank" rel="noreferrer">File an Arizona consumer complaint ↗</a>
          </article>
          <article>
            <span>Installation, workmanship, licensing</span>
            <h3>Arizona Registrar of Contractors</h3>
            <p>The ROC investigates alleged violations of licensed and unlicensed contracting laws. A workmanship complaint can lead to a jobsite inspection and, when the investigator finds work below minimum industry standards, a written directive for corrective work.</p>
            <a href={sources.rocComplaint.url} target="_blank" rel="noreferrer">Open the ROC complaint process ↗</a>
          </article>
          <article>
            <span>Utility rates, billing, utility service</span>
            <h3>Arizona Corporation Commission</h3>
            <p>The ACC can investigate certain disputes involving regulated utilities, including rates, billing responsibility, utility service and utility procedures. Its Consumer Services page specifically says it cannot assist with complaints regarding solar companies.</p>
            <a href={sources.accConsumer.url} target="_blank" rel="noreferrer">ACC Utilities Consumer Services ↗</a>
          </article>
          <article>
            <span>Sunrun and Vivint Solar</span>
            <h3>Arizona settlement complaint route</h3>
            <p>The Attorney General has a dedicated page for consumers seeking relief under the 2025 Sunrun agreement. It also explains what to do when the complaint involves a new Sunrun or Vivint Solar issue outside the settlement process.</p>
            <a href={sources.sunrunSettlement.url} target="_blank" rel="noreferrer">Arizona AG Sunrun settlement page ↗</a>
          </article>
        </div>
        <p><Link href="/resources">Compare complaint resources for other states →</Link></p>
      </section>

      <section id="sunrun-settlement" className="state-source-lead" aria-labelledby="sunrun-settlement-title">
        <div className="state-source-meta"><span>Sunrun and Vivint Solar</span><span>Maricopa County Superior Court · May 22, 2025</span></div>
        <h2 id="sunrun-settlement-title">What the Arizona Sunrun settlement actually requires</h2>
        <p>
          Arizona sued Sunrun Inc. and Vivint Solar Inc. under the Arizona Consumer Fraud Act over alleged conduct involving solar marketing, advertising, sales and leasing. The case ended in a court-approved stipulated consent agreement. Sunrun and Vivint Solar denied the allegations, and the agreement says the settlement is not an admission of wrongdoing.
        </p>
        <p>
          The agreement sets <strong>$600,000 in civil penalties</strong>, <strong>$50,000 in attorney&apos;s fees and costs</strong>, and a <strong>$600,000 Total Restitution Amount</strong>. The restitution amount is not limited to cash checks. The agreement allows qualifying resolutions to include cash, credits, rate reductions, contract changes or cancellations, repairs, labor and other relief. If the credited restitution is below $600,000 after the two-year restitution period, the remaining amount is paid to the State for the Consumer Protection-Consumer Fraud Revolving Fund.
        </p>
        <p className="state-source-note">
          The agreement covers eligible complaints received during the two years after May 22, 2025 and unresolved complaints received before that date. The Arizona Attorney General directs eligible consumers to file through the Sunrun complaint route listed on its settlement page.
        </p>
        <p className="state-source-note">
          The consent agreement says only the State and the defendants may enforce its terms and that it creates no private right of action. It also says the agreement does not limit private parties&apos; other remedies under applicable law.
        </p>
        <a href={sources.sunrunSettlement.url} target="_blank" rel="noreferrer">Arizona AG settlement instructions ↗</a><br />
        <a href={sources.sunrunAgreement.url} target="_blank" rel="noreferrer">Read the consent agreement, including ¶¶ 62–63 ↗</a>
        <p><Link href="/research/solar-sales-financing-after-complaint">Read our broader research on solar sales, financing and complaint handling →</Link></p>
      </section>

      <section className="state-source-section" aria-labelledby="settlement-details-title">
        <div className="state-source-section-heading">
          <span>Complaint handling</span>
          <h2 id="settlement-details-title">How Sunrun has to handle Arizona complaints under the agreement</h2>
        </div>
        <div className="state-source-grid">
          <article>
            <span>Tracking</span>
            <h3>Unique complaint number</h3>
            <p>An Arizona consumer who contacts customer service with an issue or question must be assigned a unique complaint number so the issue and outcome can be tracked.</p>
            <a href={sources.sunrunAgreement.url} target="_blank" rel="noreferrer">Agreement ¶ 17 ↗</a>
          </article>
          <article>
            <span>Initial response</span>
            <h3>Two-business-day response target</h3>
            <p>Sunrun must use commercially reasonable efforts to staff customer service at levels sufficient to provide a response within two business days. A read receipt or generic automated reply does not count.</p>
            <a href={sources.sunrunAgreement.url} target="_blank" rel="noreferrer">Agreement ¶ 18 ↗</a>
          </article>
          <article>
            <span>Still unresolved</span>
            <h3>Written status updates</h3>
            <p>If the issue is still unresolved 60 days after the initial response, the agreement requires a written status update. It then calls for commercially reasonable efforts to send another written update at least every 30 days while the matter remains unresolved.</p>
            <a href={sources.sunrunAgreement.url} target="_blank" rel="noreferrer">Agreement ¶ 21 ↗</a>
          </article>
          <article>
            <span>180-day provisions</span>
            <h3>There are two separate 180-day timeframes</h3>
            <p>For general complaint handling, the agreement requires at least 180 days of resolution efforts after the initial response before Sunrun determines that a mutually agreeable resolution cannot be reached. For an Eligible Complaint under the restitution process, the agreement calls for 180 days of informal resolution efforts after receipt before an additional resolution attempt and specified options.</p>
            <a href={sources.sunrunAgreement.url} target="_blank" rel="noreferrer">Agreement ¶¶ 21 and 43–45 ↗</a>
          </article>
        </div>
      </section>

      <section className="state-case-feature" aria-labelledby="sunrun-remedies-title">
        <div className="state-source-meta"><span>Restitution process</span><span>Agreement ¶¶ 42–49</span></div>
        <h2 id="sunrun-remedies-title">What can count toward the $600,000 restitution amount</h2>
        <p>
          The agreement lists several forms of relief that can be credited toward the Total Restitution Amount. They include cash payments, credits, rate reductions, reduced monthly payments, reductions to annual increases, contract cancellations, waived amounts, repairs, free labor, system removal or reinstallation work, and other contractual adjustments.
        </p>
        <p>
          Those are categories allowed by the agreement. They are not a promise that every eligible consumer will receive a particular remedy or dollar amount.
        </p>
        <a href={sources.sunrunAgreement.url} target="_blank" rel="noreferrer">Read the restitution provisions ↗</a>
      </section>

      <section className="state-source-section" aria-labelledby="sunrun-specific-problems-title">
        <div className="state-source-section-heading">
          <span>Sunrun contract issues</span>
          <h2 id="sunrun-specific-problems-title">Roof work and selling a home</h2>
        </div>
        <div className="state-source-grid">
          <article>
            <span>Roof removal and reinstallation</span>
            <h3>If the panels have to come off for roof work</h3>
            <p>The agreement requires a written estimate of the cost to remove and reinstall the system. If the customer agrees to pay that cost, Sunrun must use commercially reasonable efforts to schedule the work, with a goal of completing removal within 90 days of the customer&apos;s notification. After the customer reports that the roof or other construction work is finished, the agreement sets another 90-day goal for reinstallation and reactivation.</p>
            <p>When delay beyond those periods is not caused by forces outside Sunrun&apos;s control, the agreement provides for credits, refunds or payments for certain lease payments, fees or charges that accrue during the excess delay.</p>
            <a href={sources.sunrunAgreement.url} target="_blank" rel="noreferrer">Agreement ¶¶ 30–32 ↗</a>
          </article>
          <article>
            <span>Home sale and lease transfer</span>
            <h3>If you are selling a home with Sunrun solar</h3>
            <p>After notice of a pending or completed home sale, the agreement requires a reasonable lease-assignment form and an updated buyout price within 30 days. It also sets timelines for any required credit review and for moving invoices to an approved assignee after closing.</p>
            <p>The agreement says Sunrun and Vivint Solar may not unreasonably hinder or delay an assignment.</p>
            <a href={sources.sunrunAgreement.url} target="_blank" rel="noreferrer">Agreement ¶¶ 33–37 ↗</a>
          </article>
        </div>
      </section>

      <section id="contract-rules" className="state-case-feature" aria-labelledby="contract-rules-title">
        <div className="state-source-meta"><span>Arizona law</span><span>A.R.S. § 44-1763</span></div>
        <h2 id="contract-rules-title">What Arizona law requires in a solar contract</h2>
        <p>
          For agreements covered by A.R.S. § 44-1763, the contract must be signed and dated, use at least ten-point type, and include a separately acknowledged right to rescind for at least three business days after signing and before installation.
        </p>
        <p>
          The statute also requires disclosures about total price or cost, interest and fees, payment terms, certain tax incentives and conditions, warranty or maintenance transfers, restrictions affecting transfer of the system or the property, and the total cost of maintaining and operating the system over its life.
        </p>
        <p className="state-source-note">
          Savings claims have additional rules. A sales document or presentation that states or suggests financial savings must substantiate the methodology used to calculate those savings. The statute also contains rules for historical and projected utility-rate comparisons and warns that utility rates, rate structures and tax incentives can change. Section 44-1763 also contains an exception for certain transactions involving the sale or transfer of the real property.
        </p>
        <a href={sources.contracts.url} target="_blank" rel="noreferrer">Read A.R.S. § 44-1763 ↗</a>
      </section>

      <section className="state-source-section" aria-labelledby="contract-check-title">
        <div className="state-source-section-heading">
          <span>What to save</span>
          <h2 id="contract-check-title">If the dispute is about what the salesperson promised</h2>
        </div>
        <div className="state-source-grid">
          <article>
            <span>Price and financing</span>
            <h3>Contract, financing and payment schedule</h3>
            <p>Keep the signed agreement, financing documents and proposal showing the system price, installation or service fees, payment amount, payment frequency and any annual increase.</p>
            <a href={sources.contracts.url} target="_blank" rel="noreferrer">Arizona contract disclosures ↗</a>
          </article>
          <article>
            <span>Savings claims</span>
            <h3>Utility bill and savings projections</h3>
            <p>Keep screenshots, proposals, emails and texts showing projected utility bills or savings. Arizona law specifically addresses the methodology and rate assumptions behind savings claims.</p>
            <a href={sources.contracts.url} target="_blank" rel="noreferrer">Read the savings provisions ↗</a>
          </article>
          <article>
            <span>Tax claims</span>
            <h3>Tax-credit and incentive statements</h3>
            <p>Keep written statements about tax credits, rebates or eligibility. Arizona&apos;s contract statute requires certain incentive disclosures, and the Attorney General&apos;s solar-sales guide warns about promises of a tax credit to a consumer who does not have taxable income.</p>
            <a href={sources.solarSalesGuide.url} target="_blank" rel="noreferrer">Arizona AG solar sales guide ↗</a>
          </article>
          <article>
            <span>Home sale or transfer</span>
            <h3>Transfer restrictions and approvals</h3>
            <p>Arizona law requires disclosure of certain restrictions or third-party approvals affecting transfer of the system or the real property. Keep transfer documents and communications about selling or refinancing the home.</p>
            <a href={sources.contracts.url} target="_blank" rel="noreferrer">Read the transfer provisions ↗</a>
          </article>
        </div>
      </section>

      <section id="warranty-installation" className="state-source-section" aria-labelledby="warranty-installation-title">
        <div className="state-source-section-heading">
          <span>Installation and warranty</span>
          <h2 id="warranty-installation-title">Arizona rules for warranties and contractor work</h2>
        </div>
        <div className="state-source-grid">
          <article>
            <span>Warranty and performance</span>
            <h3>Written warranty information</h3>
            <p>A.R.S. § 44-1762 sets warranty or energy-production-output requirements for covered solar devices and requires a written statement describing warranty responsibilities and performance data.</p>
            <a href={sources.warranties.url} target="_blank" rel="noreferrer">Read A.R.S. § 44-1762 ↗</a>
          </article>
          <article>
            <span>Contractor license</span>
            <h3>Check the installer</h3>
            <p>For covered installations, Arizona law requires an individual installing a photovoltaic device to possess the appropriate contractor&apos;s license. The Registrar of Contractors provides the state license search.</p>
            <a href={sources.rocSearch.url} target="_blank" rel="noreferrer">Search Arizona contractor licenses ↗</a>
          </article>
          <article>
            <span>Installation standards</span>
            <h3>Fire, safety and building codes</h3>
            <p>A.R.S. § 44-1762 requires covered solar installations to comply with applicable fire, safety and building codes and other applicable federal, state and local laws.</p>
            <a href={sources.warranties.url} target="_blank" rel="noreferrer">Read the installation standards ↗</a>
          </article>
          <article>
            <span>Workmanship complaint</span>
            <h3>Photos, permits and inspection records</h3>
            <p>For workmanship concerns, keep photos, inspection reports, permits, repair estimates and license information. The ROC complaint process may include a jobsite inspection.</p>
            <a href={sources.rocComplaint.url} target="_blank" rel="noreferrer">Arizona ROC formal complaint ↗</a>
          </article>
        </div>
      </section>

      <section id="utility-interconnection" className="state-case-feature" aria-labelledby="utility-interconnection-title">
        <div className="state-source-meta"><span>Utility and interconnection</span><span>A.R.S. §§ 44-1763 and 44-1764</span></div>
        <h2 id="utility-interconnection-title">When the problem is interconnection or the utility</h2>
        <p>
          A.R.S. § 44-1764 requires a complete interconnection application to the utility before a covered distributed-energy system is installed, energized or interconnected. The statute says the system may be installed if the utility does not approve or deny the application within 60 days. It also allows a utility with fewer than 75,000 customers to waive the section&apos;s requirements.
        </p>
        <p>
          Separately, A.R.S. § 44-1763 says recurring payments under a distributed-energy system lease may not begin until the system is energized and interconnected. For disputes with a regulated utility over rates, billing, service or procedures, the ACC may be the relevant route. The ACC says it does not handle complaints against solar companies.
        </p>
        <a href={sources.interconnection.url} target="_blank" rel="noreferrer">Read A.R.S. § 44-1764 ↗</a><br />
        <a href={sources.accConsumer.url} target="_blank" rel="noreferrer">Arizona Corporation Commission Consumer Services ↗</a>
      </section>

      <section id="sales-red-flags" className="state-source-section" aria-labelledby="sales-red-flags-title">
        <div className="state-source-section-heading">
          <span>Arizona Attorney General</span>
          <h2 id="sales-red-flags-title">Solar sales claims the state says consumers should question</h2>
        </div>
        <div className="state-source-grid">
          <article>
            <span>Pressure to sign</span>
            <h3>Claims that you must sign immediately</h3>
            <p>The Attorney General warns about salespeople insisting that a contract must be signed then and there. Keep messages, appointment notes and any claimed deadline.</p>
            <a href={sources.solarSalesGuide.url} target="_blank" rel="noreferrer">Read the Arizona AG guide ↗</a>
          </article>
          <article>
            <span>Cost and savings</span>
            <h3>Claims that solar costs nothing or creates instant savings</h3>
            <p>The AG warns about claims that solar will cost nothing or produce instant savings. Arizona law also requires substantiation when a solar sales document or presentation states or suggests financial savings.</p>
            <a href={sources.solarSalesGuide.url} target="_blank" rel="noreferrer">Arizona AG solar sales guide ↗</a>
          </article>
          <article>
            <span>Utility affiliation</span>
            <h3>Claims of working for or with a utility</h3>
            <p>The AG guide tells consumers to verify claims that a salesperson works for or with a utility. In a separate 2023 lawsuit, Arizona also alleged that Vision Solar telemarketers at times falsely claimed affiliation with a utility company or government agency. Those allegations were claims in the lawsuit, not findings by this site.</p>
            <a href={sources.visionSolar.url} target="_blank" rel="noreferrer">Read the Arizona enforcement record ↗</a>
          </article>
          <article>
            <span>Electronic documents</span>
            <h3>Email accounts and signatures</h3>
            <p>The AG specifically warns consumers not to allow a company to create an email account for them or sign documents on their behalf. Keep the complete electronic contract package and any records showing how documents were sent or signed.</p>
            <a href={sources.solarSalesGuide.url} target="_blank" rel="noreferrer">Read the Arizona AG guide ↗</a>
          </article>
        </div>
      </section>

      <section className="state-case-feature" aria-labelledby="document-checklist-title">
        <div className="state-source-meta"><span>Before you file</span><span>Keep the originals</span></div>
        <h2 id="document-checklist-title">Documents worth keeping</h2>
        <p>
          Keep the sales proposal, complete signed or electronic contract, financing or lease documents, tax-credit or savings statements, utility bills from before and after installation, production records, permits, inspections, contractor-license information, roof or repair records, cancellation attempts, complaint numbers and company correspondence. The Arizona Attorney General recommends putting events in date order, using dates when possible, sending copies of supporting records and keeping the originals.
        </p>
        <a href={sources.agComplaint.url} target="_blank" rel="noreferrer">Arizona Attorney General complaint guidance ↗</a>
        <p><Link href="/guides">Browse Solar Consumer Research consumer guides →</Link></p>
      </section>

      <section className="state-source-section" aria-labelledby="related-research-title">
        <div className="state-source-section-heading">
          <span>SolarComplaint.com</span>
          <h2 id="related-research-title">Related research</h2>
        </div>
        <div className="state-source-grid">
          <article>
            <span>Company research</span>
            <h3>Sunrun investigations and enforcement</h3>
            <p>Follow documented state actions involving Sunrun without blending investigations, lawsuits and settlements together.</p>
            <Link href="/companies/sunrun">Open the Sunrun research hub →</Link>
          </article>
          <article>
            <span>Featured research</span>
            <h3>Solar sales, financing and complaint handling</h3>
            <p>Compare Arizona&apos;s settlement with separate government records from Texas and Michigan.</p>
            <Link href="/research/solar-sales-financing-after-complaint">Read the research →</Link>
          </article>
          <article>
            <span>Case tracker</span>
            <h3>Titan Solar Power</h3>
            <p>Bankruptcy records, warranty research and customer resources for former Titan customers.</p>
            <Link href="/cases/titan-solar-power">Open the Titan tracker →</Link>
          </article>
          <article>
            <span>More research</span>
            <h3>Solar Consumer Research archive</h3>
            <p>Browse published research, company pages and case trackers.</p>
            <Link href="/research">Browse research →</Link>
          </article>
        </div>
      </section>

      <section id="sources" className="state-source-section" aria-labelledby="sources-title">
        <div className="state-source-section-heading">
          <span>{String(sourceList.length).padStart(2, "0")} official sources</span>
          <h2 id="sources-title">Primary Arizona sources</h2>
        </div>
        <div className="state-source-grid">
          {sourceList.map((source) => (
            <article key={source.url}>
              <span>Official source</span>
              <h3>{source.name}</h3>
              <p>{source.publisher}</p>
              <a href={source.url} target="_blank" rel="noreferrer">Open source ↗</a>
            </article>
          ))}
        </div>
      </section>

      <section className="info-section case-notice" aria-label="About these sources">
        <strong>About these sources</strong>
        <p>
          This page summarizes statutes, agency guidance, a court-approved settlement and other public records. The original source controls when the exact wording of a deadline, remedy or legal requirement matters. This page does not determine whether a particular contract violates Arizona law or whether a consumer qualifies for settlement relief.
        </p>
      </section>

      <div className="state-page-links">
        <Link href="/companies/sunrun">Sunrun investigations and settlements →</Link>
        <Link href="/research/solar-sales-financing-after-complaint">Related research →</Link>
        <Link href="/cases/titan-solar-power">Titan Solar Power tracker →</Link>
        <Link href="/resources">Choose another state →</Link>
        <Link href="/guides">Consumer guides →</Link>
      </div>
    </InfoPage>
  );
}