import Link from "next/link";
import { defineResearchArticle, type ResearchStory } from "../../lib/research-article";

export const story = {
  id: "sunrun-solar-design-changes-change-orders",
  slug: "sunrun-solar-design-changes-change-orders",
  href: "/research/sunrun-solar-design-changes-change-orders",
  title: "Can Sunrun Reduce Your Solar Panel Count Without Written Approval?",
  deck: "Sunrun says homeowners give final design approval. Its 2026 SEC records also identify customer-approved plans and change-order documents. State law may require more than a phone call.",
  summary: "What Sunrun says about final design approval, what its July 2026 SEC documents identify, and when Massachusetts and other states require written changes to covered home improvement contracts.",
  seoTitle: "Sunrun Panel Count Changes: Approval & Change Orders",
  seoDescription: "Can Sunrun change your panel count? Review its 2026 SEC records, design-approval statements and state written change-order requirements, including Massachusetts.",
  keywords: ["Sunrun change order", "Sunrun solar design changes", "Sunrun panel count reduced", "Sunrun fewer solar panels", "Sunrun homeowner approval", "Massachusetts solar change order", "solar panel contract changes"],
  openGraphTitle: "Can Sunrun Change Your Solar Design Without Written Approval?",
  socialDescription: "Sunrun discusses final design approval. A 2026 SEC filing lists customer-approved plans and change-order records. See when state law requires written changes.",
  twitterDescription: "Sunrun solar panel count changes, final design approval, 2026 SEC filings and state written-change requirements.",
  lede: "Sunrun says it gets a homeowner's final approval after changing a solar design. But if the revised plan has fewer panels, what did the homeowner approve? Sunrun's public documents and state contractor laws help explain what should be checked.",
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
      <p>Sunrun says it gets a homeowner's final approval after adjusting a solar design and before submitting it for permits. A July 2026 SEC-filed review identifies customer-approved plans and change-order documentation among Sunrun records supplied for a solar asset sample. Neither source tells us whether a particular homeowner approved a particular change.</p>
      <p><strong>Written means written.</strong> When an applicable state rule requires a written contract modification, a verbal conversation alone does not meet that requirement. Massachusetts, California, Connecticut, New York and New Jersey have written-change rules for covered home improvement contracts. Whether those rules apply to a particular solar lease, power purchase agreement or installation contract depends on the work and the contract.</p>
    </section>

    <section className="info-section">
      <h2>What does Sunrun say about design approval?</h2>
      <p>On its <a href={sunrunInstallation} target="_blank" rel="noreferrer">solar installation page</a>, Sunrun says its design experts make necessary adjustments after a site assessment and seek the customer's final approval. Sunrun says the approved design is then submitted to the city for permitting.</p>
      <p>That leaves a practical question if the system changes: which version was finally approved? Homeowners should compare the sales proposal, signed agreement, revised plans and final permit drawings. A design shown in a sales presentation is not necessarily the same as the design submitted for permits.</p>
    </section>

    <section className="info-section">
      <h2>What do Sunrun's 2026 SEC records show about change orders?</h2>
      <p>A <a href={secReview2026} target="_blank" rel="noreferrer">July 24, 2026 report by KPMG, filed with the SEC</a>, identifies the types of records Sunrun provided for a review of sampled solar assets. That list includes customer-approved plans, change-order documentation, solar roof plans and amendments to power purchase agreements. The report describes a portfolio of 37,595 solar assets and a sample used for agreed-upon procedures.</p>
      <p>Those records were described as some or all of the documents available for selected assets. The report does <strong>not</strong> establish that every Sunrun customer has a change order on file. KPMG also did not determine whether customer signatures were valid or whether Sunrun complied with state contract laws.</p>
      <p>Sunrun's <a href={sunrun10q2026} target="_blank" rel="noreferrer">August 2026 Form 10-Q</a> separately names construction change orders, site changes and roof conditions as factors that can delay installations or raise costs. That disclosure recognizes change orders as an installation issue. It does not establish how any individual change must be approved.</p>
    </section>

    <section className="info-section">
      <h2>Massachusetts: when must solar contract changes be written?</h2>
      <p>Massachusetts <a href={ma142a2} target="_blank" rel="noreferrer">Chapter 142A, Section 2</a> requires a written, signed contract for covered residential contracting services over $1,000. The state's <a href={maHicGuidance} target="_blank" rel="noreferrer">Office of Consumer Affairs and Business Regulation (OCABR) guidance</a> says that any modification to the original home improvement contract must be written and agreed to by both parties.</p>
      <p><strong>That is a written requirement. A phone conversation alone does not satisfy it.</strong></p>
      <p>Separately, <a href={ma142a17} target="_blank" rel="noreferrer">Chapter 142A, Section 17(2)</a> prohibits a covered contractor from departing in a material respect from contracted plans or specifications without the owner's consent. That provision requires consent; it does not, by itself, say every change requires a separate signed change-order form.</p>
      <p>Massachusetts <a href={maHicHomeowners} target="_blank" rel="noreferrer">HIC guidance</a> specifically distinguishes solar panels from the exemption for many energy-conservation devices. Still, coverage turns on the actual residential contracting work and parties involved. It should not be assumed that every provision of a Sunrun lease or power purchase agreement is governed by Chapter 142A.</p>
    </section>

    <section className="info-section">
      <h2>A Massachusetts example</h2>
      <p><em>Hypothetical example, not a report of an actual homeowner's dispute:</em> A homeowner agrees to a 24-panel solar design. After a site visit, the installer proposes 20 panels and says the homeowner agreed during a call. The homeowner later receives plans showing the smaller system.</p>
      <p>If this is a modification to a covered Massachusetts home improvement contract, OCABR's written-modification requirement matters. The installer should not treat the phone conversation as a substitute for the required written agreement. The original contract, revised design and documentation of the agreed modification would be central records to examine.</p>
      <p>The homeowner should also check the wattage of each panel, total system size in kilowatts and revised annual production estimate. Fewer panels can mean less generation, but panel count alone cannot tell you the production difference. The <a href={ftc} target="_blank" rel="noreferrer">FTC advises comparing written system size and expected production</a> before agreeing to solar terms.</p>
    </section>

    <section className="info-section">
      <h2>Other states also require written changes</h2>
      <p><strong>California:</strong> The <a href={caCslb} target="_blank" rel="noreferrer">Contractors State License Board</a> says a change to the price or scope of a covered home improvement project must be made through a written change order signed by the customer and contractor before the change.</p>
      <p><strong>Connecticut:</strong> <a href={ctLaw} target="_blank" rel="noreferrer">General Statutes Section 20-429(a)(1)(B)</a> requires changes to the terms and conditions of a covered home improvement contract to be in writing and signed by both parties, subject to a possible regulatory exception.</p>
      <p><strong>New York:</strong> <a href={nyLaw} target="_blank" rel="noreferrer">General Business Law Section 771</a> says covered home improvement contracts and all amendments must be written and signed by all parties.</p>
      <p><strong>New Jersey:</strong> <a href={njRule} target="_blank" rel="noreferrer">Administrative Code 13:45A-16.2</a> requires changes to covered home improvement contracts over $500 to be written and signed by all parties.</p>
      <p>These are home improvement contract rules, not a blanket national rule for every solar transaction. Leases, power purchase agreements, financing documents and separate construction agreements can have different legal treatment.</p>
    </section>

    <section className="info-section">
      <h2>What should a Sunrun customer check if the panel count changes?</h2>
      <p>Start with the documents. Ask for the signed customer agreement and original system proposal; the revised layout with panel make, model and wattage; updated system capacity and estimated annual generation; the version submitted for permits; and any amendment, change order or other record showing how the revised work was approved.</p>
      <p>Then compare the numbers. Did capacity or expected production change? Did the projected savings change? Did the lease payment, PPA rate or production guarantee change? Do not assume payments automatically fall because fewer panels were installed. The answer depends on the agreement.</p>
      <p>If a contractor relies on verbal approval, ask which provision of the agreement or applicable law allows it. Where written modification is required, a verbal conversation is not enough. Keep your requests and the responses in writing.</p>
    </section>

    <section className="info-section">
      <h2>Primary sources</h2>
      <p><strong>Sunrun:</strong> <a href={sunrunInstallation} target="_blank" rel="noreferrer">Installation process and final design approval</a>.</p>
      <p><strong>SEC, July 24, 2026:</strong> <a href={secReview2026} target="_blank" rel="noreferrer">KPMG agreed-upon procedures report covering Sunrun asset records</a>, including customer-approved plans and change-order documentation.</p>
      <p><strong>SEC, August 2026:</strong> <a href={sunrun10q2026} target="_blank" rel="noreferrer">Sunrun Form 10-Q for the quarter ended June 30, 2026</a>.</p>
      <p><strong>Massachusetts:</strong> <a href={maHicGuidance} target="_blank" rel="noreferrer">OCABR's written modification guidance</a>; <a href={ma142a2} target="_blank" rel="noreferrer">Chapter 142A, Section 2</a>; <a href={ma142a17} target="_blank" rel="noreferrer">Section 17</a>; <a href={maHicHomeowners} target="_blank" rel="noreferrer">HIC homeowner guidance</a>.</p>
      <p><strong>Other state requirements:</strong> <a href={caCslb} target="_blank" rel="noreferrer">California CSLB</a>; <a href={ctLaw} target="_blank" rel="noreferrer">Connecticut Section 20-429</a>; <a href={nyLaw} target="_blank" rel="noreferrer">New York Section 771</a>; <a href={njRule} target="_blank" rel="noreferrer">New Jersey 13:45A-16.2</a>.</p>
      <p><strong>Federal consumer guidance:</strong> <a href={ftc} target="_blank" rel="noreferrer">FTC: Solar Power for Your Home</a>.</p>
    </section>

    <section className="info-section">
      <h2>Related SolarComplaint.com research</h2>
      <p><Link href="/companies/sunrun">Sunrun research and consumer resources →</Link></p>
      <p><Link href="/research/sunrun-25-year-solar-contracts">Sunrun's 25-year leases and power purchase agreements →</Link></p>
      <p><Link href="/states/massachusetts">Massachusetts solar consumer resources →</Link></p>
    </section>
  </>;
}

export const article = defineResearchArticle({ story, config: articleConfig, Body: SunrunSolarDesignChangesBody });
