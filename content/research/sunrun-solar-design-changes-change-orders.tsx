import Link from "next/link";
import { defineResearchArticle, type ResearchStory } from "../../lib/research-article";

export const story = {
  id: "sunrun-solar-design-changes-change-orders",
  slug: "sunrun-solar-design-changes-change-orders",
  href: "/research/sunrun-solar-design-changes-change-orders",
  title: "Sunrun SEC Filings Detail Solar Change Orders and Data Discrepancies",
  deck: "Sunrun described a formal process for revising solar designs in 2015. A 2026 KPMG report documented discrepancies in system sizes and contract-payment data.",
  summary: "Sunrun’s SEC filings describe plan reviews and asset-data discrepancies. Massachusetts permit research identifies conflicting panel counts within submitted solar plans.",
  seoTitle: "Sunrun Solar Panel Changes: SEC Records & Change Orders",
  seoDescription: "Sunrun changed your solar design or panel count? Compare Massachusetts permit records, SEC filings and written change-order and homeowner approval requirements.",
  keywords: ["Sunrun change order", "Sunrun solar design changes", "Sunrun panel count reduced", "Sunrun fewer solar panels", "Sunrun homeowner approval", "Massachusetts solar change order", "solar panel contract changes"],
  openGraphTitle: "Sunrun Solar Design Changes: SEC Records and Change Orders",
  socialDescription: "Sunrun described final-plan reviews in 2015. A 2026 SEC-filed KPMG report records discrepancies in system capacity, payments and escalators.",
  twitterDescription: "What Sunrun’s 2015 design-change process and 2026 KPMG asset-data report show about solar contracts and approvals.",
  lede: "Sunrun told investors it checked final solar designs against signed contracts and processed change orders when needed. Eleven years later, an SEC-filed KPMG report documented discrepancies in the system sizes and payment terms of sampled solar assets. The records show why a homeowner’s approved design and final contract details matter.",
  publishedAt: "October 16, 2026",
  datePublished: "2026-10-16",
  dateModified: "2026-11-24",
  stateCodes: ["MA"],
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
const kpmgSecuritization = "https://kpmg.com/us/en/capabilities-services/audit-services/structured-finance/securitization.html";
const secGuarantees2026 = "https://www.sec.gov/Archives/edgar/data/1469367/000119312526318237/d129330dex991.htm";
const sunrun10q2026 = "https://www.sec.gov/Archives/edgar/data/1469367/000162828026053366/run-20260630.htm";
const maHicGuidance = "https://www.mass.gov/info-details/home-improvement-contract-sample-language";
const ma142a2 = "https://malegislature.gov/Laws/GeneralLaws/PartI/TitleXX/Chapter142A/Section2";
const ma142a17 = "https://malegislature.gov/Laws/GeneralLaws/PartI/TitleXX/Chapter142A/Section17";
const lancasterSolar = "https://lancaster.patriotpermitpro.com/index.php?act=process&id=5119";
const lancasterElectrical = "https://lancaster.patriotpermitpro.com/index.php?act=process&id=5120";
const ftc = "https://consumer.ftc.gov/articles/solar-power-your-home";

export const articleConfig = {
  schemaDescription: story.summary,
  breadcrumbLabel: "Sunrun solar design changes",
  imageAlt: "SolarComplaint.com research on Sunrun solar design changes and state written change-order requirements",
  mentions: [
    { "@type": "Organization" as const, name: "Sunrun Inc." },
    { "@type": "AdministrativeArea" as const, name: "Massachusetts" },
  ],
  sources: [
    { name: "Sunrun initial registration statement, June 25, 2015, customer service and operations", url: sec2015, datePublished: "2015-06-25" },
    { name: "Sunrun solar installation and design approval guidance", url: sunrunInstallation, publisher: "Sunrun" },
    { name: "Sunrun FAQ: final design in Contracts & Docs and performance guarantee", url: sunrunFaq, publisher: "Sunrun" },
    { name: "KPMG agreed-upon procedures report dated July 24, 2026, filed with the SEC", url: secReview2026, publisher: "KPMG LLP", datePublished: "2026-07-24" },
    { name: "KPMG U.S. securitization services and agreed-upon procedures", url: kpmgSecuritization, publisher: "KPMG LLP" },
    { name: "Leidos Engineering report on Sunrun agreement performance guarantees, filed July 2026", url: secGuarantees2026, datePublished: "2026-07-24" },
    { name: "Sunrun Form 10-Q for quarter ended June 30, 2026", url: sunrun10q2026, datePublished: "2026-08-05" },
    { name: "Massachusetts OCABR home improvement contract sample language", url: maHicGuidance, publisher: "Massachusetts OCABR" },
    { name: "Massachusetts General Laws chapter 142A, section 2", url: ma142a2, publisher: "Massachusetts Legislature" },
    { name: "Massachusetts General Laws chapter 142A, section 17", url: ma142a17, publisher: "Massachusetts Legislature" },
    { name: "Lancaster, Massachusetts solar permit application 26-00577, original attachments indexed November 18, 2026", url: lancasterSolar },
    { name: "Lancaster electrical permit application 26-00578", url: lancasterElectrical },
    { name: "FTC: Solar Power for Your Home", url: ftc, publisher: "Federal Trade Commission" },
  ],
};

export function SunrunSolarDesignChangesBody() {
  return <>
    <nav className="case-question-links" aria-label="Breadcrumb"><Link href="/">Home</Link><Link href="/research">Research</Link><Link href="/companies/sunrun">Sunrun</Link><span aria-current="page">Design changes</span></nav>

    <section className="info-section">
      <h2>Sunrun described a formal change-order process</h2>
      <p>In a <a href={sec2015} target="_blank" rel="noreferrer">June 2015 registration statement filed with the SEC</a>, Sunrun described what happened after a homeowner signed a solar agreement. An installer inspected the roof and measured shading, then prepared a final system design. Sunrun said it reviewed those plans against the executed contract and processed a change order when required. It also prepared a second production estimate and modified the homeowner agreement when the expected output changed beyond specified thresholds.</p>
      <p>Sunrun still describes a final-design approval step on its <a href={sunrunInstallation} target="_blank" rel="noreferrer">solar installation page</a>. The company says designers account for conditions identified at the property, make necessary adjustments and obtain the customer&apos;s final approval before plans go to permitting. The 2015 filing and current guidance both describe how revisions are supposed to enter the project record.</p>
    </section>

    <section className="info-section">
      <h2>A 2026 review found discrepancies in solar-asset data</h2>
      <p>In July 2026, <a href={kpmgSecuritization} target="_blank" rel="noreferrer">KPMG LLP</a>, an accounting firm whose structured-finance services include agreed-upon procedures, prepared a <a href={secReview2026} target="_blank" rel="noreferrer">report filed with the SEC</a> for Sunrun Quintus Issuer 2026-2, a solar-asset financing transaction. The SEC filing identifies Sunrun as the company that paid KPMG for the work. KPMG selected 300 assets from a file containing 37,599 systems. Sunrun subsequently supplied a final portfolio file containing 37,595 assets. For the selected systems, KPMG compared specified data fields with material Sunrun provided, including contracts, design plans, amendments and change-order documents where available.</p>
      <p>The report&apos;s Exhibit D lists discrepancies remaining after Sunrun revised the data. One selected system was recorded at <strong>1.84 kW</strong> in the final file, compared with <strong>2.28 kW</strong> in the supplied comparison information. Another was recorded at <strong>11.13 kW</strong> against <strong>10.92 kW</strong>. These figures describe differences in the records reviewed, rather than a count of panels on a homeowner&apos;s roof.</p>
      <p>Other differences concerned payment terms. For one sampled agreement, the first-year monthly payment was <strong>$95.72</strong> in the data file and <strong>$102.41</strong> in the supplied information. For another, an annual escalator appeared as <strong>2.90%</strong> in the data and <strong>3.90%</strong> in the comparison material. The original review also recorded 108 inverter-manufacturer exceptions that Sunrun attributed to an Excel formula error; those entries were absent from the final exception table.</p>
      <p>KPMG was hired to compare specified information used in the financing transaction. Its report says it made no representation about whether the customer contracts had been validly executed. It also did not inspect installed systems or determine whether individual homeowners had approved revised designs. The reported discrepancies establish differences between a financial data file and the material used to check it.</p>
    </section>

    <section className="info-section">
      <h2>Massachusetts permit investigation: 20 panels or 14?</h2>
      <p>SolarComplaint.com&apos;s November 18 review of original municipal permit attachments in Lancaster, Massachusetts identified conflicting equipment specifications in a Sunrun project. The customer approval and work-assignment package generated August 25, 2026 lists 20 panels and 8.2 kW. The submitted solar plan set lists the same capacity and panel count on its cover and electrical diagram, but its site-plan table on page 2 lists 14 modules. The battery illustration on page 3 identifies Franklin equipment, while the cover and electrical diagram specify a Tesla Powerwall 3.</p>
      <p>The town issued solar permit S-2026-0030 and wiring permit E-2026-147 on September 14. The source records are the <a href={lancasterSolar} target="_blank" rel="noreferrer">solar application 26-00577 and its attachments</a> and the <a href={lancasterElectrical} target="_blank" rel="noreferrer">electrical application 26-00578</a>. The relevant downloaded attachments are the customer approval/work assignment (PDF page 2) and solar plans (PDF pages 1, 2, 3 and 5). The conflicting entries establish a discrepancy within the submitted paperwork; they do not establish the equipment actually installed or whether a later revision was approved.</p>
      <p>For this project, the records that would resolve the discrepancy are the controlling dated plan revision, the corresponding customer approval or written change order, any amended permit and the final equipment or inspection record. Unlike the KPMG asset-data exceptions, these are discrepancies within a municipal project file. Both illustrate why a single field in a permit or portfolio cannot establish which design a customer agreed to.</p>
    </section>

    <section className="info-section">
      <h2>Why the final design matters to homeowners</h2>
      <p>Panel count is only one part of a solar design. Panel wattage, roof placement and the production model determine the system&apos;s capacity and expected annual generation. The final agreement also sets the payment terms and any production guarantee. In a <a href={secGuarantees2026} target="_blank" rel="noreferrer">separate 2026 engineering review filed with the SEC</a>, sampled newer Sunrun agreements carried guarantee percentages of 90%, 85% or 0%, depending on the contract.</p>
      <p>That makes the approved layout, system capacity, projected production, guarantee and price important records to compare whenever a design changes. Sunrun&apos;s 2015 filing described an internal process for revising those documents. KPMG&apos;s 2026 report shows that some system and payment information supplied for financing still differed across records after revisions.</p>
    </section>

    <section className="info-section">
      <h2>Massachusetts law requires written modifications for covered work</h2>
      <p><a href={ma142a2} target="_blank" rel="noreferrer">Massachusetts General Laws Chapter 142A, Section 2</a> requires written, signed contracts for covered residential contracting work over $1,000. The state&apos;s <a href={maHicGuidance} target="_blank" rel="noreferrer">home improvement contract guidance</a> says modifications must be in writing and agreed to by both parties. For changes covered by that requirement, a phone conversation alone does not provide the written modification. <a href={ma142a17} target="_blank" rel="noreferrer">Section 17(2)</a> separately prohibits material departures from agreed plans or specifications without the homeowner&apos;s consent.</p>
      <p>A written modification and the homeowner&apos;s consent address related requirements. The relevant contracts must first be identified: home improvement work and a solar lease or power purchase agreement can involve different agreements and parties. A document titled &ldquo;change order&rdquo; is one way of recording a modification, but the title of the document does not replace the need to show what was changed and what both parties agreed to.</p>
    </section>

    <section className="info-section">
      <h2>Following the paper trail</h2>
      <p>Homeowners can compare the original sales proposal and executed contract with the final layout, building permits, utility interconnection records and installed equipment list. Sunrun&apos;s <a href={sunrunFaq} target="_blank" rel="noreferrer">customer FAQ</a> directs customers to agreement and design documents in the app or online account. The comparison should cover panel models and quantities, total capacity in kilowatts, projected annual generation, production guarantees and payment terms.</p>
      <p>When those details changed, the next record to locate is the dated modification or other written approval of the revised specifications. That document connects the proposed system to the design ultimately submitted and installed. It is the practical question raised by Sunrun&apos;s own process and the differences documented in the SEC-filed asset review.</p>
    </section>

    <section className="info-section">
      <h2>Primary sources</h2>
      <p><a href={sec2015} target="_blank" rel="noreferrer">Sunrun&apos;s 2015 registration statement</a> describes plan reviews and change orders. The <a href={secReview2026} target="_blank" rel="noreferrer">July 2026 KPMG report</a> identifies records and financial attributes checked for sampled solar assets, and the <a href={secGuarantees2026} target="_blank" rel="noreferrer">July 2026 engineering report</a> describes performance guarantees. See also <a href={sunrun10q2026} target="_blank" rel="noreferrer">Sunrun&apos;s August 2026 Form 10-Q</a>, its <a href={sunrunFaq} target="_blank" rel="noreferrer">current FAQ</a> and the <a href={ftc} target="_blank" rel="noreferrer">FTC&apos;s solar consumer guidance</a>.</p>
      <p>Massachusetts sources: <a href={ma142a2} target="_blank" rel="noreferrer">Chapter 142A, Section 2</a>, <a href={ma142a17} target="_blank" rel="noreferrer">Section 17</a> and <a href={maHicGuidance} target="_blank" rel="noreferrer">state home improvement contract guidance</a>.</p>
    </section>

    <section className="info-section">
      <h2>Related SolarComplaint.com research</h2>
      <p>Read <Link href="/companies/sunrun">SolarComplaint.com&apos;s Sunrun research</Link>, the investigation of <Link href="/research/sunrun-25-year-solar-contracts">Sunrun&apos;s long-term solar contracts</Link> and <Link href="/states/massachusetts">Massachusetts solar consumer resources</Link>. If your system was changed, use the <Link href="/guides/massachusetts-solar-complaint">Massachusetts complaint filing guide</Link> to organize the documents and contact the Attorney General.</p>
    </section>
  </>;
}

export const article = defineResearchArticle({ story, config: articleConfig, Body: SunrunSolarDesignChangesBody });
