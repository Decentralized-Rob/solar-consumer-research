import Link from "next/link";
import { defineResearchArticle, type ResearchStory } from "../../lib/research-article";

export const story = {
  id: "sunrun-solar-design-changes-change-orders",
  slug: "sunrun-solar-design-changes-change-orders",
  href: "/research/sunrun-solar-design-changes-change-orders",
  title: "Can Sunrun Reduce Your Solar Panel Count Without Written Approval?",
  deck: "Sunrun told investors it checked final plans against signed contracts and processed change orders. New SEC records show the system data reviewed for financing. What documents can homeowners see?",
  summary: "An examination of Sunrun SEC filings from 2015 and 2026 finds documented change-order processes and financial checks on solar designs, with state laws requiring written changes to covered contracts.",
  seoTitle: "Sunrun Panel Count Changes: Approval & Change Orders",
  seoDescription: "Sunrun SEC filings reveal how solar design changes, panel counts, production estimates and change orders are documented. Read Massachusetts and other state approval rules.",
  keywords: ["Sunrun change order", "Sunrun solar design changes", "Sunrun panel count reduced", "Sunrun fewer solar panels", "Sunrun homeowner approval", "Massachusetts solar change order", "solar panel contract changes"],
  openGraphTitle: "Sunrun Panel Count Changes: What Its Own SEC Records Reveal",
  socialDescription: "From Sunrun’s 2015 change-order process to its 2026 asset review, company records explain what should happen when a solar design changes.",
  twitterDescription: "Sunrun solar panel count changes, final design approval, 2026 SEC filings and state written-change requirements.",
  lede: "A review of Sunrun’s SEC filings reveals two sides of solar design changes: the company described checking plans and revising agreements in 2015, while its 2026 financing records track system capacity, expected production and change-order documents. What happens when the system installed on a roof differs from the one sold?",
  publishedAt: "October 16, 2026",
  datePublished: "2026-10-16",
  dateModified: "2026-10-16",
  stateCodes: ["MA", "CA", "CT", "NY", "NJ"],
  companies: ["Sunrun"],
  topics: ["Sunrun change orders", "solar design changes", "solar panel count", "homeowner approval", "written contract amendments", "home improvement contractor laws"],
  articleSection: "Investigation",
  section: "Research",
  featured: false,
} satisfies ResearchStory;

const sunrunInstallation = "https://www.sunrun.com/solar-panels";
const sec2015 = "https://www.sec.gov/Archives/edgar/data/1469367/000119312515234545/d880891ds1.htm";
const sunrunFaq = "https://www.sunrun.com/go-solar-center/solar-faq";
const secReview2026 = "https://www.sec.gov/Archives/edgar/data/1469367/000119312526318223/d149204dex991.htm";
const secGuarantees2026 = "https://www.sec.gov/Archives/edgar/data/1469367/000119312526318237/d129330dex991.htm";
const sunrun10q2026 = "https://www.sec.gov/Archives/edgar/data/1469367/000162828026053366/run-20260630.htm";
const maHicGuidance = "https://www.mass.gov/info-details/home-improvement-contract-sample-language";
const maHicHomeowners = "https://www.mass.gov/info-details/hic-homeowner-resources";
const ma142a2 = "https://malegislature.gov/Laws/GeneralLaws/PartI/TitleXX/Chapter142A/Section2";
const ma142a17 = "https://malegislature.gov/Laws/GeneralLaws/PartI/TitleXX/Chapter142A/Section17";
const caCslb = "https://cslb.ca.gov/Consumers/Hire_A_Contractor/Home_Improvement_Contracts/What_Is_A_Contract.aspx";
const ctLaw = "https://prdext2.cga.ct.gov/current/pub/chap_400.htm";
const nyLaw = "https://www.nysenate.gov/legislation/laws/GBS/771";
const njRule = "https://www.law.cornell.edu/regulations/new-jersey/N-J-A-C-13-45A-16-2";
const ftc = "https://consumer.ftc.gov/articles/solar-power-your-home";
const maInterconnection = "https://www.mass.gov/info-details/utility-interconnection-in-massachusetts";

export const articleConfig = {
  schemaDescription: story.summary,
  breadcrumbLabel: "Sunrun solar design changes",
  imageAlt: "SolarComplaint.com research on Sunrun solar design changes and state written change-order requirements",
  mentions: [
    { "@type": "Organization" as const, name: "Sunrun Inc." },
    { "@type": "AdministrativeArea" as const, name: "Massachusetts" },
    { "@type": "AdministrativeArea" as const, name: "California" },
    { "@type": "AdministrativeArea" as const, name: "Connecticut" },
    { "@type": "AdministrativeArea" as const, name: "New York" },
    { "@type": "AdministrativeArea" as const, name: "New Jersey" },
  ],
  sources: [
    { name: "Sunrun initial registration statement, June 25, 2015, customer service and operations", url: sec2015, datePublished: "2015-06-25" },
    { name: "Sunrun solar installation and design approval guidance", url: sunrunInstallation, publisher: "Sunrun" },
    { name: "Sunrun FAQ: final design in Contracts & Docs and performance guarantee", url: sunrunFaq, publisher: "Sunrun" },
    { name: "KPMG agreed-upon procedures report dated July 24, 2026, filed with the SEC", url: secReview2026, datePublished: "2026-07-24" },
    { name: "Leidos Engineering report on Sunrun agreement performance guarantees, filed July 2026", url: secGuarantees2026, datePublished: "2026-07-24" },
    { name: "Sunrun Form 10-Q for quarter ended June 30, 2026", url: sunrun10q2026, datePublished: "2026-08-05" },
    { name: "Massachusetts OCABR home improvement contract sample language", url: maHicGuidance, publisher: "Massachusetts OCABR" },
    { name: "Massachusetts General Laws chapter 142A, section 2", url: ma142a2, publisher: "Massachusetts Legislature" },
    { name: "Massachusetts General Laws chapter 142A, section 17", url: ma142a17, publisher: "Massachusetts Legislature" },
    { name: "Massachusetts HIC homeowner resources", url: maHicHomeowners, publisher: "Massachusetts OCABR" },
    { name: "Massachusetts DOER utility interconnection guidance", url: maInterconnection, publisher: "Massachusetts DOER" },
    { name: "California Contractors State License Board: Home Improvement Contracts", url: caCslb, publisher: "California CSLB" },
    { name: "Connecticut General Statutes section 20-429", url: ctLaw, publisher: "Connecticut General Assembly" },
    { name: "New York General Business Law section 771", url: nyLaw, publisher: "New York State Senate" },
    { name: "New Jersey Administrative Code 13:45A-16.2", url: njRule },
    { name: "FTC: Solar Power for Your Home", url: ftc, publisher: "Federal Trade Commission" },
  ],
};

export function SunrunSolarDesignChangesBody() {
  return <>
    <nav className="case-question-links" aria-label="Breadcrumb"><Link href="/">Home</Link><Link href="/research">Research</Link><Link href="/companies/sunrun">Sunrun</Link><span aria-current="page">Design changes</span></nav>

    <section className="info-section case-notice">
      <strong>What the records show</strong>
      <p>Sunrun told investors in 2015 that it reviewed final solar plans against signed customer contracts and processed change orders when required. A July 2026 SEC-filed report identifies customer-approved plans, change-order documents and system production figures among the records used to review solar assets for financing. Sunrun also tells customers they will review their final design before installation. Together, these statements put one question at the center of a reduced-panel installation: <strong>which design was approved, and where is the record of that approval?</strong></p>
    </section>

    <section className="info-section">
      <h2>Sunrun described a change-order process more than a decade ago</h2>
      <p>In its <a href={sec2015} target="_blank" rel="noreferrer">June 25, 2015 registration statement</a>, Sunrun described what happened after a customer signed an agreement. An installer performed a site audit, checked the roof and shading, and prepared the final plans. Sunrun said those plans were reviewed against the executed contract and that a change order would be processed if required. It also said the company generated a second estimate of solar production and modified the homeowner agreement if the expected output moved beyond specified thresholds.</p>
      <p>The same filing described software designed to help technicians validate a sold system against actual roof conditions and process change orders during site visits. That was Sunrun&apos;s account of its operations in 2015, not a description of every current project. It establishes something important about the company&apos;s history: design changes, production estimates and contract revisions were recognized parts of its post-sale workflow. Today, Sunrun&apos;s <a href={sunrunFaq} target="_blank" rel="noreferrer">customer FAQ</a> says homeowners review the final layout and expected production before installation.</p>
    </section>

    <section className="info-section">
      <h2>The 2026 financing review tracks more than panel count</h2>
      <p>Sunrun&apos;s more recent records provide another view. A <a href={secReview2026} target="_blank" rel="noreferrer">July 24, 2026 report filed with the SEC</a> describes KPMG&apos;s work on a solar asset portfolio that, in its final data file, contained 37,595 systems. KPMG selected 300 assets for agreed-upon procedures and compared specified attributes with records supplied by Sunrun. Those attributes included <strong>system size in kilowatts, estimated first-year production, customer payments and performance-guarantee percentages</strong>. The source documents listed in the report include customer-approved plans, change-order documentation, roof plans and amendments to power purchase agreements.</p>
      <p>This was an asset-data review for a financing transaction, not a test of whether every customer had signed a revised design. The document categories were described as some or all of the records available for a selected asset. Still, the list is revealing: the same numbers homeowners rely on when deciding whether a system meets their needs also matter when Sunrun&apos;s assets are examined for financing. The <a href={sunrun10q2026} target="_blank" rel="noreferrer">company&apos;s August 2026 quarterly filing</a> separately names construction change orders and site changes among factors affecting installation costs and schedules.</p>
    </section>

    <section className="info-section">
      <h2>A smaller system raises a production question</h2>
      <p>A drop in solar panel count may change the system&apos;s total capacity, but the effect depends on each panel&apos;s wattage, its placement and the revised production model. It can also change the economics of a long-term agreement. Sunrun&apos;s records distinguish projected annual generation from the minimum production promised under a guarantee. A <a href={secGuarantees2026} target="_blank" rel="noreferrer">July 2026 engineering report filed with the SEC</a> says examples of newer agreements reviewed carried performance-guarantee percentages of 90%, 85% or 0%, depending on the contract.</p>
      <p>Those are different figures. A system could satisfy its contractual minimum while producing less electricity than the original sales estimate. That makes the revised annual production projection, the guarantee and the customer&apos;s payment terms worth examining together. A homeowner should be able to see what changed between the first proposal and the final system.</p>
    </section>

    <section className="info-section">
      <h2>Massachusetts law puts written changes at the center</h2>
      <p><a href={ma142a2} target="_blank" rel="noreferrer">Massachusetts General Laws Chapter 142A, Section 2</a> requires a written, signed agreement for covered home improvement work exceeding $1,000. The state&apos;s Office of Consumer Affairs and Business Regulation says in its <a href={maHicGuidance} target="_blank" rel="noreferrer">official contract guidance</a> that modifications to the original contract must be in writing and agreed to by both parties. <strong>Where that requirement applies, verbal approval does not replace the required written modification.</strong> Separately, <a href={ma142a17} target="_blank" rel="noreferrer">Section 17(2)</a> prohibits material departures from agreed plans or specifications without the owner&apos;s consent.</p>
      <p>Consider a Massachusetts homeowner who accepts a 24-panel system. After the site assessment, the installer changes the design to 20 panels and says the homeowner approved the reduction over the phone. For a covered home improvement contract requiring written modification, the phone call is not the written agreement. The revised plan, updated production estimate and record of the agreed change are the documents to examine. This is a hypothetical example. The construction agreement and any solar lease or power purchase agreement must be identified separately when determining which requirements govern the work.</p>
    </section>

    <section className="info-section">
      <h2>Written-change rules extend beyond Massachusetts</h2>
      <p><strong>California</strong> requires written, signed change orders for changes in price or scope under covered home improvement contracts, according to the <a href={caCslb} target="_blank" rel="noreferrer">Contractors State License Board</a>. <strong>Connecticut</strong> <a href={ctLaw} target="_blank" rel="noreferrer">General Statutes Section 20-429</a> requires written, signed changes to covered contract terms, subject to regulatory exceptions. <strong>New York</strong> <a href={nyLaw} target="_blank" rel="noreferrer">General Business Law Section 771</a> requires covered contracts and amendments to be in writing and signed, while <strong>New Jersey</strong> <a href={njRule} target="_blank" rel="noreferrer">Administrative Code 13:45A-16.2</a> imposes written-change rules on covered contracts over $500. These laws govern particular types of home improvement work; their application depends on the state and the agreement.</p>
    </section>

    <section className="info-section">
      <h2>How to follow the records on your own roof</h2>
      <p>Sunrun tells homeowners to find their agreement and system design in the <a href={sunrunFaq} target="_blank" rel="noreferrer">Sunrun app or online account under Contracts &amp; Docs</a>. The building department can provide the permit application and approved plans. Compare those documents with the original proposal and the installed equipment, including panel count, panel model, wattage, total system size and expected annual production. Utility interconnection records can help confirm approved capacity; permission to operate is authorization to connect, not a substitute for the panel layout.</p>
      <p>Next, compare the initial production estimate with the final projection and any guaranteed minimum. Check the monthly lease payment or power purchase rate against the revised design. Then ask Sunrun for the change order, amended agreement or other record establishing approval of the final specifications. <strong>The key finding from the documents is simple: Sunrun has long described formal ways to handle design changes, and its 2026 filings show why final system specifications matter. Homeowners need those same specifications and the record of what they agreed to.</strong></p>
    </section>

    <section className="info-section">
      <h2>Primary sources</h2>
      <p><a href={sec2015} target="_blank" rel="noreferrer">Sunrun&apos;s 2015 registration statement</a> describes plan reviews and change orders. The <a href={secReview2026} target="_blank" rel="noreferrer">July 2026 KPMG report</a> identifies records and financial attributes checked for sampled solar assets, and the <a href={secGuarantees2026} target="_blank" rel="noreferrer">July 2026 engineering report</a> describes performance guarantees. See also <a href={sunrun10q2026} target="_blank" rel="noreferrer">Sunrun&apos;s August 2026 Form 10-Q</a>, its <a href={sunrunFaq} target="_blank" rel="noreferrer">current FAQ</a> and the <a href={ftc} target="_blank" rel="noreferrer">FTC&apos;s solar consumer guidance</a>.</p>
      <p>State sources: <a href={ma142a2} target="_blank" rel="noreferrer">Massachusetts Chapter 142A, Section 2</a>, <a href={ma142a17} target="_blank" rel="noreferrer">Section 17</a>, <a href={maHicGuidance} target="_blank" rel="noreferrer">OCABR guidance</a>, <a href={caCslb} target="_blank" rel="noreferrer">California CSLB</a>, <a href={ctLaw} target="_blank" rel="noreferrer">Connecticut Section 20-429</a>, <a href={nyLaw} target="_blank" rel="noreferrer">New York Section 771</a> and <a href={njRule} target="_blank" rel="noreferrer">New Jersey regulations</a>.</p>
    </section>

    <section className="info-section">
      <h2>Related SolarComplaint.com research</h2>
      <p>Read <Link href="/companies/sunrun">SolarComplaint.com&apos;s Sunrun research</Link>, the investigation of <Link href="/research/sunrun-25-year-solar-contracts">Sunrun&apos;s long-term solar contracts</Link> and <Link href="/states/massachusetts">Massachusetts solar consumer resources</Link>.</p>
    </section>
  </>;
}

export const article = defineResearchArticle({ story, config: articleConfig, Body: SunrunSolarDesignChangesBody });
