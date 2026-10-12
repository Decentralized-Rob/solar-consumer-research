import Link from "next/link";
import { defineResearchArticle, type ResearchStory } from "../../lib/research-article";

export const story = {
  id: "sunrun-mishler-roofing-lawsuit",
  slug: "sunrun-mishler-roofing-lawsuit",
  href: "/research/sunrun-mishler-roofing-lawsuit",
  title: "Connecticut Sunrun Roofing Lawsuit Settled Before Trial",
  deck: "Mishler said the roof was part of his Sunrun solar deal. Sunrun called the roofer a personal referral, then sought reimbursement from the roofing company in court.",
  summary: "The Connecticut Mishler v. Sunrun roofing case settled in August 2026 and was withdrawn in September. Read the complaint, Sunrun's cross-complaint and its summary-judgment memorandum.",
  seoTitle: "Sunrun Roofing Lawsuit in Connecticut: Mishler Case Settled",
  seoDescription: "Mishler v. Sunrun settled before an October 2026 trial. Read Connecticut court filings on the roofing referral, Sunrun's cross-complaint and the withdrawals.",
  socialDescription: "Sunrun described the roofer as a personal referral and later sought reimbursement in a cross-complaint. The Connecticut case settled before trial.",
  twitterDescription: "Mishler v. Sunrun: roofing referral, cross-complaint and September 2026 withdrawal. Primary Connecticut court records.",
  lede: "A Connecticut homeowner sued Sunrun and a roofing contractor over a roof replacement tied to a solar installation. The case settled before trial, leaving the disputed roofing arrangement without a court ruling.",
  publishedAt: "October 12, 2026",
  datePublished: "2026-10-12",
  dateModified: "2026-10-12",
  stateCodes: ["CT"],
  companies: ["Sunrun", "New Creation Home Improvements"],
  topics: ["Sunrun roofing lawsuit", "Mishler v Sunrun", "Connecticut solar lawsuit", "solar roof replacement", "solar salesperson referral", "home improvement contractor"],
  author: "Jules Young",
  authorSlug: "jules-young",
  section: "Short Read",
  featured: false,
} satisfies ResearchStory;

const docket = "https://civilinquiry.jud.ct.gov/CaseDetail/PublicCaseDetail.aspx?DocketNo=HHBCV256096501S";
const complaint = "https://civilinquiry.jud.ct.gov/DocumentInquiry/DocumentInquiry.aspx?DocumentNo=30177512";
const crossComplaint = "https://civilinquiry.jud.ct.gov/DocumentInquiry/DocumentInquiry.aspx?DocumentNo=31145839";
const sunrunMemorandum = "https://civilinquiry.jud.ct.gov/DocumentInquiry/DocumentInquiry.aspx?DocumentNo=32417267";
const settledOrder = "https://civilinquiry.jud.ct.gov/DocumentInquiry/DocumentInquiry.aspx?DocumentNo=33305031";
const withdrawal = "https://civilinquiry.jud.ct.gov/DocumentInquiry/DocumentInquiry.aspx?DocumentNo=33598262";

export const articleConfig = {
  schemaDescription: story.summary,
  breadcrumbLabel: "Mishler Sunrun roofing lawsuit",
  imageAlt: "SolarComplaint.com research on Mishler v. Sunrun, Connecticut Superior Court",
  mentions: [
    { "@type": "Organization" as const, name: "Sunrun Installation Services, Inc." },
    { "@type": "Organization" as const, name: "New Creation Home Improvements, LLC" },
    { "@type": "AdministrativeArea" as const, name: "Connecticut" },
  ],
  sources: [
    { name: "Connecticut Superior Court docket, HHB-CV25-6096501-S", url: docket, publisher: "Connecticut Judicial Branch" },
    { name: "Mishler complaint, filed June 5, 2025", url: complaint, publisher: "Connecticut Judicial Branch", datePublished: "2025-06-05" },
    { name: "Sunrun cross-complaint against New Creation, entry 106.00", url: crossComplaint, publisher: "Connecticut Judicial Branch", datePublished: "2025-10-17" },
    { name: "Sunrun summary-judgment memorandum, entry 124.00", url: sunrunMemorandum, publisher: "Connecticut Judicial Branch", datePublished: "2026-04-10" },
    { name: "Order marked settled, entry 141.00", url: settledOrder, publisher: "Connecticut Judicial Branch", datePublished: "2026-08-11" },
    { name: "Sunrun withdrawal of cross-complaint, entry 143.00", url: withdrawal, publisher: "Connecticut Judicial Branch", datePublished: "2026-09-21" },
  ],
};

export function SunrunMishlerRoofingBody() {
  return <>
    <nav className="case-question-links" aria-label="Breadcrumb"><Link href="/">Home</Link><Link href="/research">Research</Link><Link href="/companies/sunrun">Sunrun</Link><span aria-current="page">Mishler roofing case</span></nav>
    <p className="page-updated">By <Link href="/authors/jules-young">Jules Young</Link></p>

    <section className="info-section">
      <p>Christopher Mishler sued Sunrun Installation Services, Sunrun salesperson Jeffery Celniker and New Creation Home Improvements in June 2025. His <a href={complaint} target="_blank" rel="noreferrer">Connecticut Superior Court complaint</a> alleges that a roof replacement was arranged alongside a 25-year Sunrun solar lease, that he had no separate contract with New Creation and that the new roof began leaking.</p>
      <p>The <a href={docket} target="_blank" rel="noreferrer">official docket for <em>Mishler v. Sunrun</em>, HHB-CV25-6096501-S</a>, now lists the case as withdrawn on September 22, 2026. An <a href={settledOrder} target="_blank" rel="noreferrer">August 11 order</a> recorded it as settled. The previously scheduled October 8 trial did not take place.</p>
    </section>

    <section className="info-section">
      <h2>How the roofing work was described</h2>
      <p>Mishler alleges that on March 2, 2024, Celniker introduced Dennis Bubenheimer in a text message about a “complimentary roof upgrade,” calling him “our Roofing Projects Manager.” The language appears in the <a href={complaint} target="_blank" rel="noreferrer">homeowner’s complaint</a>; it does not by itself establish Bubenheimer’s employment or contractual relationship with Sunrun.</p>
      <p>According to the complaint, New Creation replaced the roof on April 25, 2024. Sunrun installed the solar system the following month. Mishler said he noticed leaks on May 23 and later alleged improper roofing work and a missing permit. Those are allegations, not court findings.</p>
      <p>Mishler also alleges that Sunrun subsequently characterized Celniker’s introduction as a <a href={complaint} target="_blank" rel="noreferrer">personal referral to the roofer</a>. In its <a href={sunrunMemorandum} target="_blank" rel="noreferrer">April 10, 2026 summary-judgment memorandum</a>, Sunrun likewise argued that its salesperson provided a personal referral and that New Creation, rather than Sunrun, performed the roofing work.</p>
    </section>

    <section className="info-section">
      <h2>What Sunrun sought from New Creation</h2>
      <p>Sunrun denied liability for the alleged roof damage. Its <a href={crossComplaint} target="_blank" rel="noreferrer">October 17, 2025 cross-complaint against New Creation</a> argued that the roofer should indemnify Sunrun if Sunrun were held liable or settled Mishler’s claims. Sunrun also requested reimbursement for money it said it had paid New Creation for the roofing work.</p>
      <p>The reimbursement request is part of Sunrun’s pleading. It does not independently establish the amounts paid, the contract governing those payments or who ultimately bore the roofing costs. The <a href={sunrunMemorandum} target="_blank" rel="noreferrer">summary-judgment memorandum</a> sets out Sunrun’s position that New Creation was responsible for the roofing installation.</p>
    </section>

    <section className="info-section">
      <h2>How the case ended</h2>
      <p>The <a href={docket} target="_blank" rel="noreferrer">court docket</a> records a settlement order dated August 11, a withdrawal of action filed September 15, <a href={withdrawal} target="_blank" rel="noreferrer">Sunrun’s withdrawal of its cross-complaint</a> on September 21 and a final withdrawal of action on September 22, 2026.</p>
      <p>No trial verdict determined who hired the roofer or who was responsible for the alleged defects. The public docket does not disclose settlement terms, whether the solar lease was rescinded or how any repair costs were allocated. A settlement is not an admission of wrongdoing.</p>
      <p>For homeowners researching similar arrangements, the documents identify the questions raised in this case: who arranged the roofing work, which agreements covered it and who paid the contractor. The publicly filed pleadings state the competing positions; they do not resolve those questions.</p>
      <p>For related reporting, see <Link href="/research/sunrun-parra-roof-arbitration">another Sunrun roof-dispute case in California</Link> and <Link href="/research/sunrun-25-year-solar-contracts">SolarComplaint.com’s review of Sunrun’s long-term solar agreements</Link>.</p>
    </section>

    <section className="info-section">
      <h2>Primary sources</h2>
      <p><strong>Connecticut Judicial Branch.</strong> <a href={docket} target="_blank" rel="noreferrer">Official case docket, HHB-CV25-6096501-S</a>, including final withdrawal on September 22, 2026.</p>
      <p><strong>Mishler, June 5, 2025.</strong> <a href={complaint} target="_blank" rel="noreferrer">Original complaint</a>, including allegations about the roof replacement, salesperson communications and claimed damage.</p>
      <p><strong>Sunrun, October 17, 2025.</strong> <a href={crossComplaint} target="_blank" rel="noreferrer">Cross-complaint against New Creation (entry 106.00)</a>, including the reimbursement and indemnification requests.</p>
      <p><strong>Sunrun, April 10, 2026.</strong> <a href={sunrunMemorandum} target="_blank" rel="noreferrer">Memorandum supporting its motion for summary judgment (entry 124.00)</a>, describing the asserted personal referral.</p>
      <p><strong>Connecticut Superior Court, August 11, 2026.</strong> <a href={settledOrder} target="_blank" rel="noreferrer">Order marked settled (entry 141.00)</a>.</p>
      <p><strong>Sunrun, September 21, 2026.</strong> <a href={withdrawal} target="_blank" rel="noreferrer">Withdrawal of cross-complaint against New Creation (entry 143.00)</a>.</p>
    </section>

    <section className="info-section">
      <h2>Related research</h2>
      <p><Link href="/companies/sunrun">Sunrun lawsuits, investigations and consumer resources →</Link></p>
      <p><Link href="/states/connecticut">Connecticut solar complaints and consumer resources →</Link></p>
      <p><Link href="/research/sunrun-parra-roof-arbitration">California Sunrun roof-damage dispute →</Link></p>
    </section>
  </>;
}

export const article = defineResearchArticle({ story, config: articleConfig, Body: SunrunMishlerRoofingBody });
