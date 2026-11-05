import Link from "next/link";
import { defineResearchArticle, type ResearchStory } from "../../lib/research-article";

export const story = {
  id: "sunrun-38-billion-contract-validity",
  slug: "sunrun-38-billion-contract-validity",
  href: "/research/sunrun-38-billion-contract-validity",
  title: "Sunrun Reports $38.9 Billion in Future Revenue. Courts Are Questioning Customer Signatures.",
  deck: "A sentence about signed customer agreements survived 21 SEC reports. New Jersey courts and Connecticut regulators have been examining how those contracts were obtained.",
  summary: "Sunrun reported $38.9 billion in future contracted revenue in November 2026. Five years of SEC statements meet New Jersey signature cases, Connecticut cancellation remedies and Supreme Court disclosure precedent.",
  seoTitle: "Sunrun $38.9B Future Revenue and Disputed Customer Signatures",
  seoDescription: "Sunrun's November 2026 10-Q reports $38.9B in future contract revenue. Read the repeated SEC wording, New Jersey signature cases, and Connecticut remedies.",
  keywords: ["Sunrun $38.9 billion", "Sunrun investor disclosure", "Sunrun forged signature lawsuit", "Sunrun signed customer agreements", "Sunrun Q3 2026 10-Q", "Macquarie securities law", "Sunrun contract cancellation"],
  openGraphTitle: "Sunrun's $38.9 Billion Contract Question",
  socialDescription: "Twenty-one Sunrun SEC reports describe signed customer agreements. New Jersey judges and Connecticut regulators have been examining how those agreements were executed.",
  twitterDescription: "Sunrun Q3 2026: $38.9B in future contracted revenue, repeated signed-agreement language, and court disputes over signatures.",
  lede: "Sunrun's November 4 SEC filing reports $38.9 billion in contracted but unrecognized revenue. Five years of language about signed customer agreements now sit beside federal litigation over who actually signed them.",
  publishedAt: "November 5, 2026",
  datePublished: "2026-11-05",
  dateModified: "2026-11-05",
  stateCodes: [],
  companies: ["Sunrun"],
  topics: ["Sunrun SEC filings", "Sunrun investor reporting", "contract authentication", "disputed signatures", "solar PPAs", "securities disclosures"],
  author: "Jules Young",
  authorSlug: "jules-young",
  section: "Research",
  featured: true,
} satisfies ResearchStory;

const q3 = "https://investors.sunrun.com/filings-financials/sec-filings/content/0001628280-26-070158/run-20260930.htm";
const q32021 = "https://investors.sunrun.com/filings-financials/sec-filings/content/0001469367-21-000237/run-20210930.htm";
const diaz = "https://www.govinfo.gov/content/pkg/USCOURTS-njd-1_24-cv-11462/pdf/USCOURTS-njd-1_24-cv-11462-0.pdf";
const ct = "https://portal.ct.gov/ag/press-releases/2026-press-releases/attorney-general-tong-announces-settlements-with-sunrun-solar-and-others-to-require-consumer-relief";
const macquarie = "https://www.law.cornell.edu/supremecourt/text/22-1165";
const luna = "https://investors.sunrun.com/filings-financials/sec-filings/content/0001628280-26-012289/ex1015-conformedlunasenior.htm";
const federalOrder = "https://docs.justia.com/cases/federal/district-courts/california/candce/3:2017cv02537/311169/90";
const investor2019 = "https://www.sec.gov/Archives/edgar/data/1469367/000146936719000094/sunrun10q2019q1.htm";

export const articleConfig = {
  breadcrumbLabel: "Sunrun $38.9 billion contract investigation",
  imageAlt: "SolarComplaint analysis of Sunrun signed agreements, court filings and $38.9 billion in contracted revenue",
  sources: [
    { name: "Sunrun Form 10-Q, quarter ended September 30, 2026 (filed November 4)", url: q3, datePublished: "2026-11-04" },
    { name: "Sunrun Form 10-Q, quarter ended September 30, 2021", url: q32021, datePublished: "2021-11-04" },
    { name: "Diaz v. Sunrun, Document 7, July 18, 2025", url: diaz, datePublished: "2025-07-18" },
    { name: "Connecticut Attorney General settlement release, October 23, 2026", url: ct, datePublished: "2026-10-23", publisher: "Connecticut Attorney General" },
    { name: "Macquarie Infrastructure Corp. v. Moab Partners, Supreme Court 2024", url: macquarie, datePublished: "2024-04-12" },
    { name: "Sunrun Project Luna senior credit agreement, Exhibit 10.15", url: luna },
    { name: "July 19, 2018 federal securities dismissal order", url: federalOrder, datePublished: "2018-07-19" },
    { name: "Sunrun first-quarter 2019 SEC filing describing securities settlement", url: investor2019 },
  ],
};

export function SunrunContractValidityBody() {
  return <>
    <nav className="case-question-links" aria-label="Breadcrumb"><Link href="/">Home</Link><Link href="/research">Research</Link><Link href="/companies/sunrun">Sunrun</Link><span aria-current="page">Contract validity and revenue</span></nav>
    <p className="page-updated">By <Link href="/authors/jules-young">Jules Young</Link></p>

    <section className="info-section">
      <p><strong>TL;DR:</strong> Sunrun's November 4, 2026 filing puts contracted but unrecognized revenue at $38.9 billion. Its statement about signed customer agreements has survived five years of quarterly and annual reports. During that period, New Jersey federal judges examined disputed signatures and Connecticut imposed a process that can end in contract cancellations. Those proceedings raise a financial reporting question: what do the company's contract-authentication records show?</p>
      <p>Sunrun's <a href={q3} target="_blank" rel="noreferrer">third-quarter Form 10-Q</a> reported $38.9 billion in contracted revenue that it has yet to recognize. Most of it is expected over the remaining life of customer leases and power purchase agreements. The same filing lists $17.41 billion in net energy-system assets. These are separate accounting measures, both tied to a business built on customer contracts lasting decades.</p>
      <p>In Note 5, under energy-system assets, Sunrun states:</p>
      <blockquote><p>All energy systems, including construction-in-progress, have been leased to or are subject to signed Customer Agreements with customers.</p></blockquote>
      <p>SolarComplaint traced that statement across 21 annual and quarterly reports from <a href={q32021} target="_blank" rel="noreferrer">the third quarter of 2021</a> through <a href={q3} target="_blank" rel="noreferrer">September 2026</a>. The early reports said <em>solar energy systems</em>. The wording about signed agreements remained. Sunrun continued publishing it as courts began scrutinizing the electronic signing records attached to its long-term contracts.</p>
    </section>

    <section className="info-section">
      <h2>Five New Jersey lawsuits over signatures</h2>
      <p>In <a href={diaz} target="_blank" rel="noreferrer"><em>Diaz v. Sunrun</em></a>, decided July 18, 2025, Chief U.S. District Judge Renée Marie Bumb reviewed a 25-year agreement a homeowner said she never signed. Sunrun's email asking her to review and sign the agreement was sent at 2:27 p.m. The contract already carried an electronic signature time-stamped 11:30 a.m. Its related data indicated the document had been sent, viewed and signed in less than three minutes.</p>
      <p>Judge Bumb identified four other New Jersey lawsuits involving similar signature disputes: <em>Valerio</em>, <em>Pereira</em>, <em>Tighe</em> and <em>Baldassano</em>. She wrote:</p>
      <blockquote><p>In this District alone, Sunrun has been sued on numerous occasions based upon strikingly similar allegations of forged customer signatures.</p></blockquote>
      <p>The judge declined to compel arbitration at that stage and ordered limited discovery into whether the agreement had been formed. An earlier court had also ordered examination of agreement execution in <em>Baldassano</em>. The court records show exactly what became disputed: the identity of the signer, the timing of electronic acceptance and the customer's opportunity to review the contract.</p>
      <p><Link href="/research/sunrun-new-jersey-complaints-lawsuits">Read the New Jersey investigation and original case documents</Link>, including the decisions, filed exhibits and docket history behind the five cases.</p>
    </section>

    <section className="info-section">
      <h2>Connecticut adds a cost to failed verification</h2>
      <p>On October 23, 2026, the <a href={ct} target="_blank" rel="noreferrer">Connecticut Attorney General announced a settlement</a> after litigation alleging forged signatures, impersonation and deceptive solar sales. Sunrun agreed to pay $300,000 to the state, investigate covered fraud complaints and respond within 60 days. The remedies include credits, compensation, cancellation and equipment removal for qualifying consumers.</p>
      <p>The settlement addresses a basic recordkeeping problem. When a consumer says the contract was never provided, Sunrun must produce proof of delivery or permit cancellation under the agreement's terms. The records behind that process can show how many agreements need to be unwound and what the remedies cost.</p>
      <p>Sunrun filed its <a href={q3} target="_blank" rel="noreferrer">quarterly report</a> twelve days after the settlement announcement. Its signed-agreement statement remained in the filing.</p>
    </section>

    <section className="info-section">
      <h2>Why this matters under securities law</h2>
      <p>The Supreme Court's April 2024 ruling in <a href={macquarie} target="_blank" rel="noreferrer"><em>Macquarie Infrastructure Corp. v. Moab Partners</em></a> draws a distinction between remaining silent and giving investors a statement that becomes misleading because material information was omitted. The latter can support a Rule 10b-5(b) securities claim. Sunrun's affirmative description of signed agreements, its broader risk disclosures and its knowledge of contract disputes can be examined together under that framework.</p>
      <p>Sunrun's financing documents show why execution records matter. The <a href={luna} target="_blank" rel="noreferrer">Project Luna senior credit agreement</a> sets eligibility conditions tied to legally enforceable contracts and compliant origination. It also describes how defective, canceled or terminated assets affect collateral calculations. The contract records can therefore influence more than a customer billing dispute.</p>
      <p>Sunrun has faced investor scrutiny over cancellation reporting before. In a <a href={federalOrder} target="_blank" rel="noreferrer">July 2018 ruling</a>, a federal judge demanded a more specific connection between alleged delayed cancellation reporting, Sunrun's published metrics and executive knowledge. That case later settled for $2.5 million, as recorded in a <a href={investor2019} target="_blank" rel="noreferrer">2019 SEC filing</a>. Our <Link href="/research/sunrun-sales-controls-investor-reporting">separate investigation into Sunrun's sales controls and shareholder lawsuits</Link> follows that earlier paper trail.</p>
    </section>

    <section className="info-section">
      <h2>What the filings still don't quantify</h2>
      <p>Sunrun reports projected contract revenue to the nearest hundred million dollars. Its public reporting does not give investors a comparable count of agreements challenged for unauthorized signatures, the number canceled following those investigations or their effect on financing pools and projected payments.</p>
      <p>The company's November 4 filing supplies the financial stakes. The New Jersey opinions establish a recurring problem courts have been asked to examine. Connecticut's agreement creates a way to measure the resulting cancellations and remedies. The missing numbers are now specific enough to ask for.</p>
      <p><Link href="/companies/sunrun">More Sunrun investigations</Link> · <Link href="/cases/connecticut-attorney-general-sunrun-lawsuit">Connecticut court record and settlement</Link> · <Link href="/research/sunrun-25-year-solar-contracts">How Sunrun's long-term contracts work</Link></p>
    </section>
  </>;
}

export const article = defineResearchArticle({ story, config: articleConfig, Body: SunrunContractValidityBody });
