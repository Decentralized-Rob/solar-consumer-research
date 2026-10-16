import Link from "next/link";
import { defineResearchArticle, type ResearchStory } from "../../lib/research-article";

export const story = {
  id: "sunrun-solar-design-changes-change-orders",
  slug: "sunrun-solar-design-changes-change-orders",
  href: "/research/sunrun-solar-design-changes-change-orders",
  title: "Can Sunrun Reduce Your Solar Panel Count Without Written Approval?",
  deck: "Sunrun says it seeks final design approval before permitting. Its 2026 SEC records identify customer-approved plans and change-order documentation, while state laws determine when changes must be written.",
  summary: "What Sunrun says about final design approval, what its July 2026 SEC documents identify, and when Massachusetts and other states require written changes to covered home improvement contracts.",
  seoTitle: "Sunrun Panel Count Changes: Approval & Change Orders",
  seoDescription: "Can Sunrun change your panel count? Review its 2026 SEC records, design-approval statements and state written change-order requirements, including Massachusetts.",
  keywords: ["Sunrun change order", "Sunrun solar design changes", "Sunrun panel count reduced", "Sunrun fewer solar panels", "Sunrun homeowner approval", "Massachusetts solar change order", "solar panel contract changes"],
  openGraphTitle: "Can Sunrun Change Your Solar Design Without Written Approval?",
  socialDescription: "Sunrun discusses final design approval. A 2026 SEC filing lists customer-approved plans and change-order records. See when state law requires written changes.",
  twitterDescription: "Sunrun solar panel count changes, final design approval, 2026 SEC filings and state written-change requirements.",
  lede: "Sunrun says homeowners approve final solar designs before permitting, and its 2026 SEC records identify change-order documents among customer records. When the panel count changes, what exactly was approved, and does state law require that approval in writing?",
  publishedAt: "October 16, 2026",
  datePublished: "2026-10-16",
  dateModified: "2026-10-16",
  stateCodes: ["MA", "CA", "CT", "NY", "NJ"],
  companies: ["Sunrun"],
  topics: ["Sunrun change orders", "solar design changes", "solar panel count", "homeowner approval", "written contract amendments", "home improvement contractor laws"],
  section: "Research",
  featured: false,
} satisfies ResearchStory;

const sunrunInstallation = "https://www.sunrun.com/solar-panels";
const secReview2026 = "https://www.sec.gov/Archives/edgar/data/1469367/000119312526318223/d149204dex991.htm";
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
    { name: "Sunrun solar installation and design approval guidance", url: sunrunInstallation, publisher: "Sunrun" },
    { name: "KPMG agreed-upon procedures report dated July 24, 2026, filed with the SEC", url: secReview2026, datePublished: "2026-07-24" },
    { name: "Sunrun Form 10-Q for quarter ended June 30, 2026", url: sunrun10q2026, datePublished: "2026-08-05" },
    { name: "Massachusetts OCABR home improvement contract sample language", url: maHicGuidance, publisher: "Massachusetts OCABR" },
    { name: "Massachusetts General Laws chapter 142A, section 2", url: ma142a2, publisher: "Massachusetts Legislature" },
    { name: "Massachusetts General Laws chapter 142A, section 17", url: ma142a17, publisher: "Massachusetts Legislature" },
    { name: "Massachusetts HIC homeowner resources", url: maHicHomeowners, publisher: "Massachusetts OCABR" },
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
      <strong>The short version</strong>
      <p>Sunrun says it seeks a homeowner&apos;s final approval after adjusting a solar design and before sending that design for permits. Its 2026 SEC filings also refer to customer-approved plans and change-order documentation. Those records do not prove how any individual design change was authorized, but they raise a useful question for homeowners: if the proposed panel count changes, where is the approval recorded? In states that require written modifications to covered home improvement contracts, verbal approval alone does not meet that requirement.</p>
    </section>

    <section className="info-section">
      <h2>Sunrun says homeowners approve the final design</h2>
      <p>A solar proposal can change after the sale. Roof measurements, shading, equipment placement and other site conditions may affect the final layout. On its <a href={sunrunInstallation} target="_blank" rel="noreferrer">solar installation page</a>, Sunrun says its design experts make necessary adjustments after the site assessment and get the customer&apos;s final approval before submitting the plans for permitting. Sunrun does not specify on that page what form the approval takes.</p>
      <p>If the initial proposal showed one panel count and the permit plan shows another, the homeowner needs to know which design was approved and when. The sales proposal, signed agreement, revised layout and permitted plans may each show a different stage of the project. A change in panel count also warrants a look at system capacity, expected annual production and the financial terms tied to the system. Fewer panels do not, by themselves, establish how much electricity production will change; panel wattage and the revised design matter too.</p>
    </section>

    <section className="info-section">
      <h2>What Sunrun&apos;s 2026 SEC filing tells us</h2>
      <p>A <a href={secReview2026} target="_blank" rel="noreferrer">July 24, 2026 KPMG report filed with the SEC</a> describes a review involving a Sunrun portfolio of 37,595 solar assets. In defining the source documents available for sampled assets, the report lists customer-approved plans, change-order documentation, roof plans and amendments to solar power purchase agreements, among other records. KPMG compared selected asset attributes, including system size and estimated first-year generation, with supporting documents. The report is unusually useful because it identifies the types of records involved in Sunrun&apos;s asset documentation.</p>
      <p>There is a limit to what it proves. The report says the listed documents represented <em>some or all</em> of the records supplied for each selected asset; it does not say every Sunrun customer has a signed change order. KPMG expressly declined to make representations about the validity, accuracy or execution of the contracts. In its <a href={sunrun10q2026} target="_blank" rel="noreferrer">August 2026 Form 10-Q</a>, Sunrun also identifies construction change orders, site changes and roof conditions as possible sources of delay or higher installation costs. Neither filing establishes whether a particular design change complied with a state&apos;s contract requirements.</p>
    </section>

    <section className="info-section">
      <h2>Massachusetts requires written changes for covered home improvement contracts</h2>
      <p>Under <a href={ma142a2} target="_blank" rel="noreferrer">Massachusetts General Laws Chapter 142A, Section 2</a>, covered residential contracting work exceeding $1,000 requires a written, signed contract. The Massachusetts Office of Consumer Affairs and Business Regulation goes further in its <a href={maHicGuidance} target="_blank" rel="noreferrer">official home improvement contract guidance</a>: modifications to the original contract must be written and agreed to by both parties. <strong>Where that requirement applies, saying the homeowner agreed during a telephone call is not a substitute for the required written modification.</strong></p>
      <p>Another provision, <a href={ma142a17} target="_blank" rel="noreferrer">Chapter 142A, Section 17(2)</a>, prohibits covered contractors from materially departing from agreed plans or specifications without the owner&apos;s consent. Consent and a written contract modification are related questions, but the statute&apos;s consent provision does not itself say that every change requires a separately signed form bearing the words “change order.” The legal requirements depend on whether the work and agreement fall under the home improvement law. A Sunrun lease or power purchase agreement should not automatically be treated as the same thing as a covered construction contract.</p>
      <p>Consider a hypothetical Massachusetts homeowner who agrees to a 24-panel system. After a site visit, the installer reduces the design to 20 panels and later says the homeowner consented by phone. If the reduction modifies a home improvement contract subject to the written-modification requirement described in OCABR&apos;s guidance, that conversation alone does not meet the written requirement. The original agreement, revised design and written record of the change would matter, along with any revised production estimate. <em>This is an illustration, not an account of an actual homeowner or Sunrun project.</em></p>
    </section>

    <section className="info-section">
      <h2>Other states also put changes in writing</h2>
      <p>Massachusetts is not alone. In <strong>California</strong>, the <a href={caCslb} target="_blank" rel="noreferrer">Contractors State License Board</a> says changes to the price or scope of covered home improvement work require a written change order signed by the customer and contractor before the change. <strong>Connecticut</strong> <a href={ctLaw} target="_blank" rel="noreferrer">General Statutes Section 20-429</a> requires changes to the terms and conditions of covered home improvement contracts to be written and signed by both parties, subject to a possible regulatory exception.</p>
      <p>In <strong>New York</strong>, <a href={nyLaw} target="_blank" rel="noreferrer">General Business Law Section 771</a> requires covered home improvement contracts and their amendments to be in writing and signed by all parties. <strong>New Jersey</strong> <a href={njRule} target="_blank" rel="noreferrer">Administrative Code 13:45A-16.2</a> imposes written, signed requirements for changes to covered home improvement contracts over $500. These laws do not create one nationwide rule for every solar project. Homeowners must identify the contract, the type of work and the state law that applies before deciding whether verbal consent was legally sufficient.</p>
    </section>

    <section className="info-section">
      <h2>What Sunrun customers should compare</h2>
      <p>Start with the version of the project you originally accepted. Compare it with the final layout, permit drawings and equipment installed on the roof, paying attention to the panel model, wattage, total system capacity and projected annual output. The <a href={ftc} target="_blank" rel="noreferrer">Federal Trade Commission&apos;s solar guidance</a> recommends examining the system and financial terms before committing to a project. If those terms change, ask for the updated figures rather than assuming the original production estimate or promised savings still applies.</p>
      <p>Then ask for the documents showing how the change was approved: any revised agreement, amendment, change order or other written authorization required by the applicable contract and law. Compare the monthly payment or power purchase rate and any production guarantee with the revised system. If the company relies on verbal consent, request an explanation of how that complies with the requirements governing the work. Keeping the answers in writing makes it easier to understand which design and terms the parties actually agreed to.</p>
    </section>

    <section className="info-section">
      <h2>Primary sources</h2>
      <p>Sunrun&apos;s <a href={sunrunInstallation} target="_blank" rel="noreferrer">installation guidance</a> describes final design approval. The <a href={secReview2026} target="_blank" rel="noreferrer">July 2026 KPMG report</a> and <a href={sunrun10q2026} target="_blank" rel="noreferrer">Sunrun&apos;s August 2026 Form 10-Q</a> provide the SEC disclosures discussed above. Massachusetts requirements and guidance appear in <a href={ma142a2} target="_blank" rel="noreferrer">Chapter 142A, Section 2</a>, <a href={ma142a17} target="_blank" rel="noreferrer">Section 17</a> and <a href={maHicGuidance} target="_blank" rel="noreferrer">OCABR&apos;s contract guidance</a>.</p>
      <p>The other state requirements are documented by the <a href={caCslb} target="_blank" rel="noreferrer">California Contractors State License Board</a>, <a href={ctLaw} target="_blank" rel="noreferrer">Connecticut Section 20-429</a>, <a href={nyLaw} target="_blank" rel="noreferrer">New York Section 771</a> and <a href={njRule} target="_blank" rel="noreferrer">New Jersey&apos;s consumer protection regulation</a>. The <a href={ftc} target="_blank" rel="noreferrer">FTC&apos;s homeowner guide</a> provides additional information about evaluating solar offers.</p>
    </section>

    <section className="info-section">
      <h2>Related SolarComplaint.com research</h2>
      <p>Continue with <Link href="/companies/sunrun">SolarComplaint.com&apos;s Sunrun research</Link>, its reporting on <Link href="/research/sunrun-25-year-solar-contracts">Sunrun&apos;s long-term solar contracts</Link>, and <Link href="/states/massachusetts">Massachusetts solar consumer resources</Link>.</p>
    </section>
  </>;
}

export const article = defineResearchArticle({ story, config: articleConfig, Body: SunrunSolarDesignChangesBody });
