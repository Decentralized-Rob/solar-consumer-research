import Link from "next/link";
import { defineResearchArticle, type ResearchStory } from "../../lib/research-article";

export const story = {
  id: "sunrun-mishler-roofing-lawsuit",
  slug: "sunrun-mishler-roofing-lawsuit",
  href: "/research/sunrun-mishler-roofing-lawsuit",
  title: "Mishler v. Sunrun: Connecticut Roofing Lawsuit Settled Before Trial",
  deck: "The homeowner alleges the roof was arranged with his solar deal. Sunrun called the roofer a personal referral, then sought reimbursement in a cross-complaint.",
  summary: "Mishler v. Sunrun settled and was withdrawn before trial. Connecticut court filings document the disputed roofing arrangement, a personal referral and Sunrun's reimbursement request.",
  seoTitle: "Sunrun Roofing Lawsuit: Mishler Case Settled in Connecticut",
  seoDescription: "Mishler v. Sunrun settled before trial in 2026. Read the official Connecticut filings on the roofer referral, Sunrun's reimbursement request and withdrawal.",
  socialDescription: "Sunrun called the roofer a personal referral. Its court filing also sought reimbursement for roofing payments. The Connecticut case settled before trial.",
  twitterDescription: "Connecticut court records: Mishler v. Sunrun roofing lawsuit, referral and reimbursement claims, settlement and withdrawal.",
  lede: "A Connecticut lawsuit over roofing work arranged before a Sunrun solar installation settled before trial. The filings document different accounts of the roofing arrangement.",
  publishedAt: "October 12, 2026",
  datePublished: "2026-10-12",
  dateModified: "2026-10-12",
  stateCodes: ["CT"],
  companies: ["Sunrun", "New Creation Home Improvements"],
  topics: ["Mishler v Sunrun", "Sunrun roofing lawsuit", "Connecticut Sunrun lawsuit", "solar roof replacement", "solar roofing referral", "home improvement contractor"],
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
      <p>Christopher Mishler signed a 25-year Sunrun solar lease in January 2024. In his <a href={complaint} target="_blank" rel="noreferrer">June 2025 complaint</a>, he alleges the project included a new roof before the solar panels were installed. He says he never signed a separate roofing contract with New Creation Home Improvements.</p>
      <p>According to Mishler&apos;s complaint, New Creation replaced the roof on April 25, 2024, and Sunrun installed the solar system the following month. Mishler says he discovered leaks on May 23. He sued Sunrun Installation Services, salesperson Jeffrey Celniker and New Creation, alleging defects in the roofing work and that a required permit had not been obtained.</p>
    </section>

    <section className="info-section">
      <h2>The roofing referral</h2>
      <p>According to <a href={complaint} target="_blank" rel="noreferrer">Mishler&apos;s complaint</a>, Celniker sent a March 2, 2024 text about scheduling a “complimentary roof upgrade” and introduced Dennis Bubenheimer as “our Roofing Projects Manager.”</p>
      <p>Sunrun took a different position in its <a href={sunrunMemorandum} target="_blank" rel="noreferrer">April 10, 2026 summary-judgment memorandum</a>. It called the introduction a “personal referral” and argued that New Creation performed the roof work independently. Sunrun said its involvement was limited to scheduling so the solar installation could proceed after the roof was completed.</p>
    </section>

    <section className="info-section">
      <h2>Sunrun&apos;s reimbursement request</h2>
      <p>In an <a href={crossComplaint} target="_blank" rel="noreferrer">October 17, 2025 cross-complaint</a>, Sunrun denied responsibility for the alleged roofing damage and sought indemnification from New Creation if it became liable to Mishler.</p>
      <p>The filing also asked for <a href={crossComplaint} target="_blank" rel="noreferrer">reimbursement of money Sunrun said it had paid New Creation</a> for the roofing work. Its later <a href={sunrunMemorandum} target="_blank" rel="noreferrer">summary-judgment memorandum</a> sought a ruling that New Creation had a duty to indemnify Sunrun.</p>
      <p>The pleadings leave the underlying arrangement in dispute: who engaged New Creation, what agreement covered its work and who paid for it?</p>
    </section>

    <section className="info-section">
      <h2>Settled and withdrawn</h2>
      <p>The <a href={docket} target="_blank" rel="noreferrer">Connecticut Superior Court docket</a> records an <a href={settledOrder} target="_blank" rel="noreferrer">August 11, 2026 order marked settled</a>. Mishler filed a withdrawal on September 15. <a href={withdrawal} target="_blank" rel="noreferrer">Sunrun withdrew its cross-complaint</a> on September 21, and the action was withdrawn September 22.</p>
      <p>The October 8 trial did not take place. The public docket does not disclose the settlement terms or resolve the parties&apos; competing accounts of the roofing arrangement.</p>
      <h2>What homeowners should know</h2>
      <p>When a solar company offers a roof upgrade with a solar lease, confirm who holds the roofing contract, who is named on the permits and which company is responsible for the roof warranty. In Mishler&apos;s case, Sunrun described the roofer as a personal referral and denied responsibility for the roofing work.</p>
      <p>Before signing, obtain copies of the solar and roofing agreements, check contractor licensing and permit requirements, and get warranty responsibilities in writing. See the free <Link href="/states/connecticut">Connecticut solar consumer resources</Link> for official state complaint information.</p>
      <p>Related SolarComplaint.com research covers <Link href="/research/sunrun-parra-roof-arbitration">another Sunrun roof dispute in California</Link> and <Link href="/research/sunrun-25-year-solar-contracts">Sunrun&apos;s 25-year solar contracts</Link>.</p>
    </section>

    <section className="info-section">
      <h2>Primary sources</h2>
      <p><strong>Connecticut Judicial Branch:</strong> <a href={docket} target="_blank" rel="noreferrer">Mishler v. Sunrun, docket HHB-CV25-6096501-S</a>, case history and withdrawals.</p>
      <p><strong>June 5, 2025:</strong> <a href={complaint} target="_blank" rel="noreferrer">Mishler&apos;s complaint</a>, including the alleged March 2 salesperson text and roofing claims.</p>
      <p><strong>October 17, 2025:</strong> <a href={crossComplaint} target="_blank" rel="noreferrer">Sunrun&apos;s cross-complaint against New Creation, entry 106.00</a>.</p>
      <p><strong>April 10, 2026:</strong> <a href={sunrunMemorandum} target="_blank" rel="noreferrer">Sunrun&apos;s summary-judgment memorandum, entry 124.00</a>.</p>
      <p><strong>August 11, 2026:</strong> <a href={settledOrder} target="_blank" rel="noreferrer">Court order marked settled, entry 141.00</a>.</p>
      <p><strong>September 21, 2026:</strong> <a href={withdrawal} target="_blank" rel="noreferrer">Sunrun&apos;s withdrawal of its cross-complaint, entry 143.00</a>.</p>
    </section>

    <section className="info-section">
      <h2>Related research</h2>
      <p><Link href="/companies/sunrun">Sunrun lawsuits, investigations and consumer resources →</Link></p>
      <p><Link href="/states/connecticut">Connecticut solar consumer resources →</Link></p>
      <p><Link href="/research/sunrun-parra-roof-arbitration">California Sunrun roof dispute →</Link></p>
    </section>
  </>;
}

export const article = defineResearchArticle({ story, config: articleConfig, Body: SunrunMishlerRoofingBody });
