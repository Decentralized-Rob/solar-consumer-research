import Link from "next/link";
import { defineResearchArticle, type ResearchStory } from "../../lib/research-article";

export const story = {
  id: "sunrun-solar-design-changes-change-orders",
  slug: "sunrun-solar-design-changes-change-orders",
  href: "/research/sunrun-solar-design-changes-change-orders",
  title: "Sunrun Solar Panel Changes: What Its SEC Records Actually Show",
  deck: "Sunrun described reviewing design changes against signed contracts. A 2026 SEC-filed review found differences in system sizes, payments and escalators. Here is what those records establish.",
  summary: "Sunrun’s 2015 filing described change orders. A 2026 SEC-filed KPMG report listed mismatches in sampled system-size, payment and escalator figures after data revisions; it did not test customer approval.",
  seoTitle: "Sunrun Solar Panel Changes: SEC Findings & Approval",
  seoDescription: "Sunrun SEC records document design-change procedures and 2026 system-size discrepancies. Read what KPMG checked, what it did not, and Massachusetts change-order rules.",
  keywords: ["Sunrun change order", "Sunrun solar design changes", "Sunrun panel count reduced", "Sunrun fewer solar panels", "Sunrun homeowner approval", "Massachusetts solar change order", "solar panel contract changes"],
  openGraphTitle: "Sunrun Solar Design Changes: What 2015 and 2026 SEC Filings Show",
  socialDescription: "A KPMG report filed with the SEC lists differences in system capacity and contract-payment data. It did not verify customer signatures.",
  twitterDescription: "Sunrun solar panel count changes, final design approval, 2026 SEC filings and state written-change requirements.",
  lede: "Sunrun said it checked final solar designs against signed customer contracts. A 2026 SEC-filed report later recorded mismatches between some system sizes and payment terms in Sunrun’s financing data and the documents supplied for comparison. Neither record proves whether a homeowner approved a particular panel reduction.",
  publishedAt: "October 16, 2026",
  datePublished: "2026-10-16",
  dateModified: "2026-10-16",
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
const secGuarantees2026 = "https://www.sec.gov/Archives/edgar/data/1469367/000119312526318237/d129330dex991.htm";
const sunrun10q2026 = "https://www.sec.gov/Archives/edgar/data/1469367/000162828026053366/run-20260630.htm";
const maHicGuidance = "https://www.mass.gov/info-details/home-improvement-contract-sample-language";
const ma142a2 = "https://malegislature.gov/Laws/GeneralLaws/PartI/TitleXX/Chapter142A/Section2";
const ma142a17 = "https://malegislature.gov/Laws/GeneralLaws/PartI/TitleXX/Chapter142A/Section17";
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
    { name: "KPMG agreed-upon procedures report dated July 24, 2026, filed with the SEC", url: secReview2026, datePublished: "2026-07-24" },
    { name: "Leidos Engineering report on Sunrun agreement performance guarantees, filed July 2026", url: secGuarantees2026, datePublished: "2026-07-24" },
    { name: "Sunrun Form 10-Q for quarter ended June 30, 2026", url: sunrun10q2026, datePublished: "2026-08-05" },
    { name: "Massachusetts OCABR home improvement contract sample language", url: maHicGuidance, publisher: "Massachusetts OCABR" },
    { name: "Massachusetts General Laws chapter 142A, section 2", url: ma142a2, publisher: "Massachusetts Legislature" },
    { name: "Massachusetts General Laws chapter 142A, section 17", url: ma142a17, publisher: "Massachusetts Legislature" },
    { name: "FTC: Solar Power for Your Home", url: ftc, publisher: "Federal Trade Commission" },
  ],
};

export function SunrunSolarDesignChangesBody() {
  return <>
    <nav className="case-question-links" aria-label="Breadcrumb"><Link href="/">Home</Link><Link href="/research">Research</Link><Link href="/companies/sunrun">Sunrun</Link><span aria-current="page">Design changes</span></nav>

    <section className="info-section case-notice">
      <strong>What the documents establish</strong>
      <p>Sunrun said in a <a href={sec2015} target="_blank" rel="noreferrer">2015 SEC filing</a> that it reviewed final solar plans against executed agreements and processed change orders when required. In a <a href={secReview2026} target="_blank" rel="noreferrer">July 2026 SEC-filed KPMG report</a>, selected system sizes, payment amounts and annual escalators did not match the comparison documents. Some differences remained in Sunrun&apos;s revised data file. KPMG did not authenticate customer signatures or determine whether a homeowner approved a design change.</p>
    </section>

    <section className="info-section">
      <h2>Sunrun described formal change orders in 2015</h2>
      <p>In its <a href={sec2015} target="_blank" rel="noreferrer">June 2015 registration statement</a>, Sunrun explained that an installer inspected the roof and shading after a customer signed. The company then prepared a final design, reviewed it against the executed contract and processed a change order when required. It also generated a second production estimate, modifying the homeowner agreement if projected output changed beyond certain thresholds.</p>
      <p>That was Sunrun&apos;s description of its procedures in 2015, not proof the procedure was followed at every home or remains unchanged today. On its <a href={sunrunInstallation} target="_blank" rel="noreferrer">current solar installation page</a>, Sunrun says its designers make necessary adjustments and obtain the customer&apos;s final approval before submitting plans for permits. That statement describes Sunrun&apos;s process; it does not itself establish what any specific homeowner approved.</p>
    </section>

    <section className="info-section">
      <h2>KPMG found differences in the 2026 financing data</h2>
      <p>On <a href={secReview2026} target="_blank" rel="noreferrer">July 24, 2026</a>, KPMG reported agreed-upon procedures for a Sunrun solar-asset financing transaction. Its final portfolio data file covered <strong>37,595 solar assets</strong>. KPMG had selected a random sample of 300 from an earlier 37,599-asset file. It compared selected data fields with documents supplied by Sunrun, including contracts, customer-approved plans, roof plans, design reports and change-order records where available.</p>
      <p><strong>Exhibit D of the report still listed differences after Sunrun revised its data file.</strong> For example, KPMG reported:</p>
      <ul>
        <li>For one selected system, <strong>1.84 kW</strong> in the revised data versus <strong>2.28 kW</strong> in the provided information; for another, <strong>11.13 kW</strong> versus <strong>10.92 kW</strong>.</li>
        <li>For a sampled agreement, a first-year monthly payment of <strong>$95.72</strong> in the data versus <strong>$102.41</strong> in the provided information.</li>
        <li>For another sample, an annual payment escalator of <strong>2.90%</strong> in the data versus <strong>3.90%</strong> in the provided information.</li>
      </ul>
      <p>These are mismatches between a financing data file and supplied records. They are <strong>not evidence of how many panels were installed, who approved the system, or whether any individual customer was overcharged</strong>. The report also identified 108 initial inverter-manufacturer data exceptions attributed by Sunrun to an Excel formula error; those did not appear in its final exception table.</p>
      <p>KPMG specifically said it made no representation about the validity or execution of the customer contracts it received. The work was not an audit of installation quality, consumer consent or compliance with state law. The distinction matters: a financing record can be checked for consistency without establishing that the homeowner agreed to the final design.</p>
    </section>

    <section className="info-section">
      <h2>Panel count, system size and guaranteed production are different</h2>
      <p>A system&apos;s capacity in kilowatts depends on panel count and each panel&apos;s wattage. A lower panel count does not necessarily establish the exact capacity or energy loss without knowing the equipment and layout. KPMG&apos;s system-size exceptions do not establish that panels were physically removed from any roof.</p>
      <p>Projected annual generation is also different from a contract&apos;s production guarantee. A separate <a href={secGuarantees2026} target="_blank" rel="noreferrer">2026 engineering review filed with the SEC</a> reported guarantee percentages of 90%, 85% or 0% in samples of newer Sunrun agreements. A homeowner comparing an original proposal with a revised design needs the panel models, total capacity, annual production projection, guarantee formula and payment terms, not just the panel count.</p>
    </section>

    <section className="info-section">
      <h2>Massachusetts requires written changes for covered home improvements</h2>
      <p><a href={ma142a2} target="_blank" rel="noreferrer">Massachusetts General Laws Chapter 142A, Section 2</a> generally requires a written contract for covered residential contracting work over $1,000. The state&apos;s <a href={maHicGuidance} target="_blank" rel="noreferrer">home improvement contract guidance</a> says modifications to the original contract must be in writing and agreed to by both parties. Separately, <a href={ma142a17} target="_blank" rel="noreferrer">Section 17(2)</a> prohibits material deviations from plans or specifications without the owner&apos;s consent.</p>
      <p>The two requirements are related but not identical: the written-modification guidance applies to covered home improvement contracts, while the consent provision does not itself say every type of solar lease amendment must be signed. Whether these protections apply depends on the work performed, the parties and the contracts involved. The SEC filings do not determine whether Massachusetts law was followed on any individual installation.</p>
    </section>

    <section className="info-section">
      <h2>How to check whether your final solar design matches</h2>
      <p>Start with the proposal and signed agreement. Then get the final panel layout, the building department&apos;s approved plans, the utility interconnection record and the as-built equipment list. Sunrun&apos;s <a href={sunrunFaq} target="_blank" rel="noreferrer">customer FAQ</a> describes access to agreements and final-design documents through its app or online account. A utility&apos;s permission to operate is not evidence that the homeowner approved the panel layout.</p>
      <p>Compare panel count and model, system capacity in kW, projected annual generation, the guarantee and the payment terms across the original and final documents. If those changed, ask for the dated change order, amended agreement or other record of approval. Sunrun&apos;s descriptions of its process and the SEC-filed data review do not answer that homeowner-specific question without the actual records.</p>
    </section>

    <section className="info-section">
      <h2>Primary sources</h2>
      <p><a href={sec2015} target="_blank" rel="noreferrer">Sunrun&apos;s 2015 registration statement</a> describes plan reviews and change orders. The <a href={secReview2026} target="_blank" rel="noreferrer">July 2026 KPMG report</a> identifies records and financial attributes checked for sampled solar assets, and the <a href={secGuarantees2026} target="_blank" rel="noreferrer">July 2026 engineering report</a> describes performance guarantees. See also <a href={sunrun10q2026} target="_blank" rel="noreferrer">Sunrun&apos;s August 2026 Form 10-Q</a>, its <a href={sunrunFaq} target="_blank" rel="noreferrer">current FAQ</a> and the <a href={ftc} target="_blank" rel="noreferrer">FTC&apos;s solar consumer guidance</a>.</p>
      <p>Massachusetts sources: <a href={ma142a2} target="_blank" rel="noreferrer">Chapter 142A, Section 2</a>, <a href={ma142a17} target="_blank" rel="noreferrer">Section 17</a> and <a href={maHicGuidance} target="_blank" rel="noreferrer">state home improvement contract guidance</a>.</p>
    </section>

    <section className="info-section">
      <h2>Related SolarComplaint.com research</h2>
      <p>Read <Link href="/companies/sunrun">SolarComplaint.com&apos;s Sunrun research</Link>, the investigation of <Link href="/research/sunrun-25-year-solar-contracts">Sunrun&apos;s long-term solar contracts</Link> and <Link href="/states/massachusetts">Massachusetts solar consumer resources</Link>.</p>
    </section>
  </>;
}

export const article = defineResearchArticle({ story, config: articleConfig, Body: SunrunSolarDesignChangesBody });
