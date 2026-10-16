import Link from "next/link";
import { defineResearchArticle, type ResearchStory } from "../../lib/research-article";

export const story = {
  id: "sunrun-solar-design-changes-change-orders",
  slug: "sunrun-solar-design-changes-change-orders",
  href: "/research/sunrun-solar-design-changes-change-orders",
  title: "Can Sunrun Reduce Your Solar Panel Count Without Written Approval?",
  deck: "Sunrun says customers approve final solar designs. Its 2026 SEC records identify change-order documents, while state laws spell out when changes require written approval.",
  summary: "Sunrun design approvals, 2026 SEC change-order records and the written contract-change requirements in Massachusetts, California, Connecticut, New York and New Jersey.",
  seoTitle: "Sunrun Panel Count Changes: Approval & Change Orders",
  seoDescription: "Can Sunrun change your panel count? Review its 2026 SEC records, design-approval statements and state written change-order requirements, including Massachusetts.",
  keywords: ["Sunrun change order", "Sunrun solar design changes", "Sunrun panel count reduced", "Sunrun fewer solar panels", "Sunrun homeowner approval", "Massachusetts solar change order", "solar panel contract changes"],
  openGraphTitle: "Can Sunrun Change Your Solar Design Without Written Approval?",
  socialDescription: "Sunrun discusses final design approval. A 2026 SEC filing lists customer-approved plans and change-order records. See when state law requires written changes.",
  twitterDescription: "Sunrun solar panel count changes, final design approval, 2026 SEC filings and state written-change requirements.",
  lede: "Sunrun says homeowners approve the final solar design before permitting. Its 2026 SEC records identify change-order documents. If the panel count changes after the sale, homeowners need to know which design they approved and whether state law requires that change in writing.",
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
      <p>Sunrun says it obtains final design approval before submitting a solar installation for permits. Its 2026 SEC-filed records identify customer-approved plans and change-order documents among the materials used to review solar assets. In Massachusetts and several other states, changes to covered home improvement contracts must be in writing. <strong>If written approval is required, a phone conversation is not enough.</strong></p>
    </section>

    <section className="info-section">
      <h2>Which solar design did the homeowner approve?</h2>
      <p>Solar installations often change between the sales proposal and final construction plans. Roof measurements, shading and equipment placement can force adjustments to the original layout. On its <a href={sunrunInstallation} target="_blank" rel="noreferrer">installation page</a>, Sunrun says its design experts make the necessary adjustments after a site assessment and obtain the homeowner&apos;s final approval before sending the design for permits.</p>
      <p>That approval matters if a homeowner was sold one system and a smaller one was eventually installed. Compare the initial proposal, signed agreement, final design and permit drawings. A reduction in panel count can change the total system capacity and expected electricity production, although the exact impact also depends on panel wattage, placement and other design details. Homeowners should see the revised production estimate and understand any effect on their payments or production guarantee before accepting the change.</p>
    </section>

    <section className="info-section">
      <h2>Sunrun&apos;s 2026 SEC records identify change-order documents</h2>
      <p>A <a href={secReview2026} target="_blank" rel="noreferrer">July 24, 2026 report by KPMG filed with the SEC</a> describes a review involving 37,595 Sunrun solar assets. Among the documents identified for sampled assets were customer-approved plans, change-order records, solar roof plans and amendments to power purchase agreements. KPMG also compared system capacity and estimated first-year electricity generation against supporting records. The filing shows that design and change-order documentation are part of the records Sunrun supplies for asset reviews.</p>
      <p>Sunrun&apos;s <a href={sunrun10q2026} target="_blank" rel="noreferrer">August 2026 Form 10-Q</a> separately lists construction change orders, site changes and roof conditions among factors that can affect installation schedules and costs. Taken together, these disclosures put contract changes and revised plans squarely within Sunrun&apos;s documented installation process. A homeowner whose panel count changed has good reason to request the final plans and the paperwork recording the approved change.</p>
    </section>

    <section className="info-section">
      <h2>Massachusetts: covered contract changes must be written</h2>
      <p><a href={ma142a2} target="_blank" rel="noreferrer">Massachusetts General Laws Chapter 142A, Section 2</a> requires written, signed contracts for covered residential home improvement work exceeding $1,000. The state&apos;s Office of Consumer Affairs and Business Regulation says in its <a href={maHicGuidance} target="_blank" rel="noreferrer">home improvement contract guidance</a> that modifications to the original contract must be in writing and agreed to by both parties. <strong>For work covered by this requirement, verbal approval is not a written modification.</strong></p>
      <p>Massachusetts <a href={ma142a17} target="_blank" rel="noreferrer">Chapter 142A, Section 17(2)</a> also prohibits contractors from materially departing from agreed plans or specifications without the homeowner&apos;s consent. The statute addresses consent, while OCABR&apos;s guidance addresses how covered contract changes are documented. The distinction is important when reviewing a changed solar design: identify the construction contract involved, compare the agreed specifications and look for the written change. A solar lease or power purchase agreement may involve different terms from the contract for physical installation work.</p>
      <p><strong>Example:</strong> A Massachusetts homeowner agrees to a 24-panel system. After the site assessment, the installer reduces the design to 20 panels and later says the customer agreed during a phone call. For a modification governed by Massachusetts&apos; written home improvement contract requirements, the phone call does not replace the written agreement. The homeowner would want the revised layout, updated production estimate and written approval of the change. <em>This example is hypothetical.</em></p>
    </section>

    <section className="info-section">
      <h2>California, Connecticut, New York and New Jersey</h2>
      <p>Other states also require written changes to covered home improvement contracts. In <strong>California</strong>, the <a href={caCslb} target="_blank" rel="noreferrer">Contractors State License Board</a> explains that changes to a covered project&apos;s price or scope require a written change order signed by the customer and contractor before the changed work begins. Under <strong>Connecticut</strong> <a href={ctLaw} target="_blank" rel="noreferrer">General Statutes Section 20-429</a>, changes to covered home improvement contract terms must be written and signed by both parties, subject to regulatory exceptions.</p>
      <p><strong>New York</strong> <a href={nyLaw} target="_blank" rel="noreferrer">General Business Law Section 771</a> requires written, signed home improvement contracts and amendments for work within the law&apos;s scope. <strong>New Jersey</strong> <a href={njRule} target="_blank" rel="noreferrer">Administrative Code 13:45A-16.2</a> requires written, signed changes to covered home improvement contracts exceeding $500. The specific requirements differ, but the message for homeowners is clear: check the law governing the work before accepting a contractor&apos;s claim that a verbal conversation was enough.</p>
    </section>

    <section className="info-section">
      <h2>What to request when Sunrun changes the panel count</h2>
      <p>Ask Sunrun for the original proposal and agreement, the final panel layout, the permit drawings and the records showing approval of any change. Compare the number and model of panels, wattage, total system capacity and estimated annual production. Then review the monthly payment or power purchase rate, projected savings and production guarantee against the revised system. The <a href={ftc} target="_blank" rel="noreferrer">Federal Trade Commission&apos;s solar consumer guidance</a> explains why written system specifications and financial terms matter.</p>
      <p>If the documents differ, ask which design governs the installation and for the written amendment or change order where one is required. A homeowner should not have to guess which system the final agreement covers. The plans and contract records should answer that question.</p>
    </section>

    <section className="info-section">
      <h2>Primary sources</h2>
      <p>Read <a href={sunrunInstallation} target="_blank" rel="noreferrer">Sunrun&apos;s installation guidance</a>, the <a href={secReview2026} target="_blank" rel="noreferrer">July 2026 SEC-filed asset review</a> and <a href={sunrun10q2026} target="_blank" rel="noreferrer">Sunrun&apos;s August 2026 Form 10-Q</a>. For Massachusetts, see <a href={ma142a2} target="_blank" rel="noreferrer">Chapter 142A, Section 2</a>, <a href={ma142a17} target="_blank" rel="noreferrer">Section 17</a> and <a href={maHicGuidance} target="_blank" rel="noreferrer">OCABR&apos;s contract guidance</a>. State comparisons draw on <a href={caCslb} target="_blank" rel="noreferrer">California CSLB</a>, <a href={ctLaw} target="_blank" rel="noreferrer">Connecticut Section 20-429</a>, <a href={nyLaw} target="_blank" rel="noreferrer">New York Section 771</a> and <a href={njRule} target="_blank" rel="noreferrer">New Jersey regulations</a>.</p>
    </section>

    <section className="info-section">
      <h2>Related SolarComplaint.com research</h2>
      <p>Explore <Link href="/companies/sunrun">SolarComplaint.com&apos;s Sunrun research</Link>, its reporting on <Link href="/research/sunrun-25-year-solar-contracts">Sunrun&apos;s long-term solar contracts</Link> and <Link href="/states/massachusetts">Massachusetts solar consumer resources</Link>.</p>
    </section>
  </>;
}

export const article = defineResearchArticle({ story, config: articleConfig, Body: SunrunSolarDesignChangesBody });
