import Link from "next/link";
import { InfoPage } from "./info-page";

const sources = {
  wwmtClimax: {
    name: "Exclusive: Alleged victim speaks out about Portage solar panel, finance scheme",
    publisher: "WWMT News Channel 3",
    url: "https://wwmt.com/news/local/solar-panel-finance-scheme-portage-climax-attorney-general-dana-nessel-lawsuit-lien-restitution-bankrupt-michigan-complaint-wwmt",
  },
  climaxAnnouncement: {
    name: "AG Nessel Files Lawsuit Against Solar Company, Financial Institutions for Alleged Deceptive Scheme",
    publisher: "Michigan Attorney General",
    url: "https://content.govdelivery.com/accounts/MIAG/bulletins/420ac98",
  },
  climaxComplaint: {
    name: "Michigan Attorney General federal complaint against Climax Solar and finance defendants",
    publisher: "Michigan Attorney General / U.S. District Court for the Western District of Michigan",
    url: "https://www.michigan.gov/ag/-/media/Project/Websites/AG/releases/2026/July/Climax-Solar-Complaint.pdf",
  },
  agComplaints: {
    name: "File a Complaint",
    publisher: "Michigan Attorney General",
    url: "https://www.michigan.gov/ag/complaints",
  },
  homeImprovementWarning: {
    name: "AG Nessel Reminds Michiganders to Research Home Improvement Offers",
    publisher: "Michigan Attorney General",
    url: "https://www.michigan.gov/ag/news/press-releases/2026/06/10/ag-nessel-reminds-michiganders-to-research-home-improvement-offers",
  },
  laraComplaint: {
    name: "Make a complaint about a licensed professional or business",
    publisher: "Michigan Department of Licensing and Regulatory Affairs",
    url: "https://www.michigan.gov/lara/i-need-to/make-a-complaint-about-a-licensed-professional-or-business",
  },
  laraVerify: {
    name: "Find or verify a licensed professional or business",
    publisher: "Michigan Department of Licensing and Regulatory Affairs",
    url: "https://www.michigan.gov/lara/i-need-to/find-or-verify-a-licensed-professional-or-business",
  },
  bccEnforcement: {
    name: "Bureau of Construction Codes Enforcement Section",
    publisher: "Michigan Department of Licensing and Regulatory Affairs",
    url: "https://www.michigan.gov/lara/bureau-list/bcc/sections/enforcement-section",
  },
  buildingPermits: {
    name: "Building Permit Information",
    publisher: "Michigan Department of Licensing and Regulatory Affairs",
    url: "https://www.michigan.gov/lara/bureau-list/bcc/sections/permit-section/permits/building-permit-information",
  },
  electricalPermits: {
    name: "Electrical Permit Information",
    publisher: "Michigan Department of Licensing and Regulatory Affairs",
    url: "https://www.michigan.gov/lara/bureau-list/bcc/sections/permit-section/permits/electrical-permit-information",
  },
  jurisdictionList: {
    name: "Statewide Jurisdiction List",
    publisher: "Michigan Department of Licensing and Regulatory Affairs",
    url: "https://www.michigan.gov/lara/-/media/Project/Websites/lara/bcc-media/ASD/StatewideJurisdictionList.pdf",
  },
  mpscComplaints: {
    name: "MPSC Inquiries & Complaints",
    publisher: "Michigan Public Service Commission",
    url: "https://www.michigan.gov/mpsc/consumer/complaints",
  },
  solarTips: {
    name: "Solar Power Consumer Tips",
    publisher: "Michigan Public Service Commission",
    url: "https://www.michigan.gov/mpsc/consumer/be-informed/tips/solar-power-consumer-tips",
  },
  distributedGeneration: {
    name: "Distributed Generation",
    publisher: "Michigan Public Service Commission",
    url: "https://www.michigan.gov/mpsc/consumer/electricity/distributed-generation",
  },
  interconnection: {
    name: "What is Interconnection?",
    publisher: "Michigan Public Service Commission",
    url: "https://www.michigan.gov/mpsc/consumer/electricity/what-is-interconnection",
  },
  utilityContacts: {
    name: "Utility Interconnection Contacts",
    publisher: "Michigan Public Service Commission",
    url: "https://www.michigan.gov/mpsc/consumer/electricity/utility-interconnection-contacts",
  },
  difsComplaints: {
    name: "Filing a Complaint with DIFS",
    publisher: "Michigan Department of Insurance and Financial Services",
    url: "https://www.michigan.gov/difs/consumers/complaint",
  },
  consumerProtectionAct: {
    name: "Michigan Consumer Protection Act",
    publisher: "Michigan Legislature",
    url: "https://www.legislature.mi.gov/Laws/MCL?objectName=mcl-Act-331-of-1976",
  },
  homeSolicitationAct: {
    name: "Michigan Home Solicitation Sales Act",
    publisher: "Michigan Legislature",
    url: "https://www.legislature.mi.gov/Laws/Index?ObjectName=mcl-Act-227-of-1971",
  },
  cfpbComplaint: {
    name: "Submit a complaint about a financial product or service",
    publisher: "Consumer Financial Protection Bureau",
    url: "https://www.consumerfinance.gov/complaint/",
  },
  ftcReportFraud: {
    name: "ReportFraud.ftc.gov",
    publisher: "Federal Trade Commission",
    url: "https://reportfraud.ftc.gov/",
  },
  pinkEnergyAppeal: {
    name: "Aaron Hall v. Trivest Partners L.P.",
    publisher: "U.S. Court of Appeals for the Sixth Circuit via Justia",
    url: "https://law.justia.com/cases/federal/appellate-courts/ca6/25-1538/25-1538-2026-06-16.html",
  },
  pinkEnergySettlement: {
    name: "Order preliminarily approving class action settlement with William Waller",
    publisher: "U.S. District Court for the Eastern District of Michigan via Justia",
    url: "https://law.justia.com/cases/federal/district-courts/michigan/miedce/4%3A2022cv12743/365873/169/",
  },
  pinkEnergySettlementSite: {
    name: "Power Home Solar / Pink Energy settlement information",
    publisher: "Settlement administrator",
    url: "https://www.solarricosettlement.com/",
  },
  solarForAll: {
    name: "MI Solar for All",
    publisher: "Michigan Department of Environment, Great Lakes, and Energy",
    url: "https://www.michigan.gov/egle/about/organization/climate-and-energy/mi-healthy-climate-plan/funding/ggrf/mi-solar",
  },
  solarForAllAdvisory: {
    name: "MI Solar For All consumer advisory",
    publisher: "Michigan Department of Environment, Great Lakes, and Energy",
    url: "https://www.michigan.gov/egle/about/organization/climate-and-energy/mi-healthy-climate-plan/funding/ggrf/mi-solar/advisory",
  },
};

const canonicalUrl = "https://solarcomplaint.com/states/michigan";

export function MichiganResourcePage() {
  const sourceList = Object.values(sources);
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${canonicalUrl}#page`,
        url: canonicalUrl,
        name: "Michigan Solar Complaints, Financing & Consumer Resources",
        description:
          "Michigan solar complaint resources, installer and financing issues, permits and utility approval, current enforcement cases, and official state sources.",
        dateModified: "2026-09-05",
        inLanguage: "en-US",
        spatialCoverage: { "@type": "AdministrativeArea", name: "Michigan" },
        isPartOf: { "@id": "https://solarcomplaint.com/#website" },
        about: [
          { "@type": "Thing", name: "Michigan solar complaints" },
          { "@type": "Thing", name: "Michigan solar financing complaints" },
          { "@type": "Thing", name: "Climax Solar Michigan" },
          { "@type": "Thing", name: "Michigan solar permits and interconnection" },
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
          { "@type": "ListItem", position: 3, name: "Michigan", item: canonicalUrl },
        ],
      },
    ],
  };

  return (
    <InfoPage
      className="state-resource-page michigan-resource-page"
      eyebrow="Michigan solar consumer resources · reviewed September 5, 2026"
      title="Have a solar problem in Michigan?"
      lede="Find trusted information, real cases, and official resources based on what is happening with your project."
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <nav className="case-question-links" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <Link href="/resources">State resources</Link>
        <span aria-current="page">Michigan</span>
      </nav>

      <section id="start-here" className="state-source-section" aria-labelledby="start-here-title">
        <div className="state-source-section-heading">
          <span>Start with the problem</span>
          <h2 id="start-here-title">What is happening with your solar project?</h2>
        </div>
        <div className="state-source-grid">
          <article>
            <span>Sales, contracts, communication</span>
            <h3>Problem with the solar company</h3>
            <p>Misrepresentation, unfinished work, cancellation problems, contract disputes, or a company that stopped responding.</p>
            <a href="#company-problem">Start here ↓</a>
          </article>
          <article>
            <span>Permits, inspection, PTO</span>
            <h3>System installed but not working</h3>
            <p>Check permit, inspection, interconnection, utility approval, and production records before assuming the problem has one cause.</p>
            <a href="#system-not-working">Start here ↓</a>
          </article>
          <article>
            <span>License and local records</span>
            <h3>Check the installer or contractor</h3>
            <p>Use state licensing tools and the correct building authority to check contractor status, permits, inspections, and enforcement records.</p>
            <a href="#check-installer">Start here ↓</a>
          </article>
          <article>
            <span>Loans, collections, liens</span>
            <h3>Loan or financing problem</h3>
            <p>Separate the installer dispute from the financing issue. Loan terms, collections, credit reporting, liens, or UCC filings may involve a separate finance company.</p>
            <a href="#financing-problem">Start here ↓</a>
          </article>
        </div>
      </section>

      <section id="featured-michigan" className="state-source-lead" aria-labelledby="featured-michigan-title">
        <div className="state-source-meta">
          <span>Featured in Michigan</span>
          <span>Climax Solar · July 15, 2026 lawsuit</span>
        </div>
        <h2 id="featured-michigan-title">Michigan sued Climax Solar, its owner, and multiple finance companies</h2>
        <p>
          The Michigan Attorney General filed a federal public-enforcement lawsuit alleging deceptive solar sales, rushed electronic contracting, project failures, and finance-side conduct involving origination, funding, servicing, collection, reporting, and enforcement. The complaint identifies 1,689 Climax-originated Michigan loans totaling about $81.26 million and alleges about $22.14 million in financing charges were embedded in financed prices rather than separately disclosed.
        </p>
        <p className="state-source-note">
          These are allegations in a pending lawsuit, not court findings. The Attorney General is seeking relief that includes restitution, changes or cancellation of certain loans, refunds or credits, credit-reporting corrections, release of liens or UCC filings, and civil penalties where authorized.
        </p>
        <a href={sources.wwmtClimax.url} target="_blank" rel="noreferrer">Read the WWMT homeowner story ↗</a><br />
        <a href={sources.climaxAnnouncement.url} target="_blank" rel="noreferrer">Michigan Attorney General announcement ↗</a><br />
        <a href={sources.climaxComplaint.url} target="_blank" rel="noreferrer">Read the full federal complaint ↗</a>
        <p><Link href="/research/solar-sales-financing-after-complaint">See the broader solar sales and financing research →</Link></p>
      </section>

      <section id="michigan-cases" className="state-case-feature" aria-labelledby="michigan-cases-title">
        <div className="state-source-meta">
          <span>Michigan cases and developments</span>
          <span>Power Home Solar / Pink Energy · 2026</span>
        </div>
        <h2 id="michigan-cases-title">A separate Michigan case involving Power Home Solar / Pink Energy is still developing</h2>
        <p>
          In June 2026, the Sixth Circuit held that the Michigan district court lacked personal jurisdiction over the Trivest defendants, reversed the jurisdiction ruling, and vacated the May 23, 2025 order denying their motions to compel arbitration. In July, the Eastern District of Michigan preliminarily approved a proposed class settlement with former Power Home Solar founder William Waller only. That settlement does not resolve the broader litigation against every defendant.
        </p>
        <a href={sources.pinkEnergyAppeal.url} target="_blank" rel="noreferrer">Read the June 16 Sixth Circuit opinion ↗</a><br />
        <a href={sources.pinkEnergySettlement.url} target="_blank" rel="noreferrer">Read the July 28 preliminary-approval order ↗</a><br />
        <a href={sources.pinkEnergySettlementSite.url} target="_blank" rel="noreferrer">Settlement information site ↗</a>
      </section>

      <section className="state-source-section" aria-labelledby="michigan-resources-title">
        <div className="state-source-section-heading">
          <span>Explore Michigan resources</span>
          <h2 id="michigan-resources-title">Official sources grouped by the problem you are trying to solve</h2>
        </div>

        <details id="company-problem" className="state-research-status">
          <summary><strong>Problem with the solar company</strong></summary>
          <p>Start by preserving the contract, sales materials, payment records, emails, texts, project timeline, permit records, and photos. Then choose the complaint route that matches the conduct you are documenting.</p>
          <p><a href={sources.agComplaints.url} target="_blank" rel="noreferrer">Michigan Attorney General complaint directory ↗</a></p>
          <p><a href={sources.homeImprovementWarning.url} target="_blank" rel="noreferrer">Michigan AG home-improvement consumer warning ↗</a></p>
          <p><Link href="/guides/solar-complaint-record-checklist">Solar complaint record checklist →</Link></p>
        </details>

        <details id="system-not-working" className="state-research-status">
          <summary><strong>System installed but not working</strong></summary>
          <p>A system can stall at permitting, inspection, interconnection, utility approval, or later production. Use the records below to identify which step is incomplete before deciding where to complain.</p>
          <p><a href={sources.solarTips.url} target="_blank" rel="noreferrer">MPSC Solar Power Consumer Tips ↗</a></p>
          <p><a href={sources.interconnection.url} target="_blank" rel="noreferrer">MPSC: What is interconnection? ↗</a></p>
          <p><a href={sources.distributedGeneration.url} target="_blank" rel="noreferrer">MPSC Distributed Generation resources ↗</a></p>
          <p><a href={sources.utilityContacts.url} target="_blank" rel="noreferrer">Utility interconnection contacts ↗</a></p>
          <p>The MPSC complaint process is for utility issues within the Commission&apos;s authority; it is not a general complaint route against a solar installer.</p>
          <p><a href={sources.mpscComplaints.url} target="_blank" rel="noreferrer">MPSC utility complaint information ↗</a></p>
        </details>

        <details id="check-installer" className="state-research-status">
          <summary><strong>Check the installer or contractor</strong></summary>
          <p>Michigan licensing and building authority can depend on the work and location. Check the state licensing record, then identify the authority that handled the permit and inspection.</p>
          <p><a href={sources.laraVerify.url} target="_blank" rel="noreferrer">Verify a licensed professional or business through LARA ↗</a></p>
          <p><a href={sources.laraComplaint.url} target="_blank" rel="noreferrer">LARA complaint route ↗</a></p>
          <p><a href={sources.buildingPermits.url} target="_blank" rel="noreferrer">Michigan building permit information ↗</a></p>
          <p><a href={sources.electricalPermits.url} target="_blank" rel="noreferrer">Michigan electrical permit information ↗</a></p>
          <p><a href={sources.jurisdictionList.url} target="_blank" rel="noreferrer">Statewide building-code jurisdiction list ↗</a></p>
          <p><a href={sources.bccEnforcement.url} target="_blank" rel="noreferrer">Bureau of Construction Codes enforcement ↗</a></p>
        </details>

        <details id="financing-problem" className="state-research-status">
          <summary><strong>Loan or financing problem</strong></summary>
          <p>Keep the loan agreement, payment history, any UCC or lien notices, credit-reporting records, cancellation requests, and communications with both the installer and finance company. A financing complaint may need a different route from an installation complaint.</p>
          <p>If the issue involves a financial institution or consumer lender regulated by Michigan, DIFS investigates complaints involving banks, credit unions, mortgages, and other consumer financial products.</p>
          <p><a href={sources.difsComplaints.url} target="_blank" rel="noreferrer">Michigan DIFS financial-services complaint information ↗</a></p>
          <p><a href={sources.cfpbComplaint.url} target="_blank" rel="noreferrer">Consumer Financial Protection Bureau complaint ↗</a></p>
          <p><a href={sources.ftcReportFraud.url} target="_blank" rel="noreferrer">Federal Trade Commission ReportFraud ↗</a></p>
          <p><a href={sources.agComplaints.url} target="_blank" rel="noreferrer">Michigan Attorney General complaint directory ↗</a></p>
          <p><Link href="/federal-resources">Federal solar complaint and consumer resources →</Link></p>
        </details>

        <details id="michigan-law" className="state-research-status">
          <summary><strong>Michigan laws and consumer rights</strong></summary>
          <p>These are primary legal sources. SolarComplaint.com does not determine whether a law applies to a particular contract or dispute.</p>
          <p><a href={sources.consumerProtectionAct.url} target="_blank" rel="noreferrer">Michigan Consumer Protection Act ↗</a></p>
          <p><a href={sources.homeSolicitationAct.url} target="_blank" rel="noreferrer">Michigan Home Solicitation Sales Act ↗</a></p>
        </details>

        <details id="additional-records" className="state-research-status">
          <summary><strong>Additional resources and official records</strong></summary>
          <p>Use these when you need a broader federal route, a documentation checklist, or more source-backed solar research.</p>
          <p><Link href="/federal-resources">Federal resources →</Link></p>
          <p><Link href="/guides">Consumer guides →</Link></p>
          <p><Link href="/research">Research library →</Link></p>
          <p><Link href="/resources">All state resources →</Link></p>
        </details>
      </section>

      <section className="state-source-section" aria-labelledby="michigan-notices-title">
        <div className="state-source-section-heading">
          <span>Current Michigan notices</span>
          <h2 id="michigan-notices-title">Program status worth checking before you rely on older solar information</h2>
        </div>
        <div className="state-source-grid">
          <article>
            <span>State program · paused</span>
            <h3>MI Solar for All is paused</h3>
            <p>EGLE says the program received a termination letter from the U.S. Environmental Protection Agency dated August 7, 2025 and that Michigan is working with the Attorney General on next steps. EGLE also warns that MI Solar for All has not distributed promotional advertisements and says it is not aware of a state or federal program providing solar installation at no cost.</p>
            <a href={sources.solarForAll.url} target="_blank" rel="noreferrer">Check the current MI Solar for All status ↗</a><br />
            <a href={sources.solarForAllAdvisory.url} target="_blank" rel="noreferrer">Read the MI Solar For All consumer advisory ↗</a>
          </article>
        </div>
      </section>

      <div className="state-page-links">
        <Link href="/research/solar-sales-financing-after-complaint">Solar sales and financing research →</Link>
        <Link href="/federal-resources">Federal resources →</Link>
        <Link href="/guides">Consumer guides →</Link>
        <Link href="/resources">All state resources →</Link>
      </div>
    </InfoPage>
  );
}
