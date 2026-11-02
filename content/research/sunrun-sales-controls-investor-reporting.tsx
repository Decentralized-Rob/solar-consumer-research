import Link from "next/link";
import { defineResearchArticle, type ResearchStory } from "../../lib/research-article";

export const story = {
  id: "sunrun-sales-controls-investor-reporting",
  slug: "sunrun-sales-controls-investor-reporting",
  href: "/research/sunrun-sales-controls-investor-reporting",
  title: "Sunrun's Sales Controls Face an Investor Test a Decade in the Making",
  deck: "Sunrun settled securities cases concerning IPO disclosures and customer cancellations, then agreed to governance reforms. Its 2026 proxy still promotes strong sales-integrity controls.",
  summary: "Sunrun investor analysis of its 2015 IPO, 2016–2019 securities and derivative cases, $32 million and $2.5 million settlements, 2019 governance reforms and 2026 financial disclosures.",
  seoTitle: "Sunrun RUN Stock: Sales Controls, SEC Filings and Contract Risk",
  seoDescription: "Sunrun (RUN) investors: trace 2015–2019 securities litigation, contract cancellations, governance reforms and 2026 sales-integrity disclosures.",
  keywords: ["Sunrun stock", "RUN stock", "Sunrun SEC filings", "Sunrun investor relations", "Sunrun sales controls", "Sunrun contract cancellations", "Sunrun shareholder lawsuit", "Sunrun 2026 earnings", "Sunrun securitization", "Sunrun consumer settlements"],
  openGraphTitle: "Sunrun's Sales Integrity Claims Face a Decade of Investor Questions",
  socialDescription: "Sunrun faced investor lawsuits over contract-cancellation reporting in 2017. Its 2026 proxy still promotes strong sales controls. Here is what the financial filings reveal.",
  twitterDescription: "Sunrun (RUN): cancellation reporting litigation, repeated investor assurances, contract-financing requirements and Q3 disclosure questions.",
  lede: "Sunrun told investors in 2019 that sales-incentive controls helped prevent misconduct. The question of how customer contracts are counted and controlled had already reached federal court. With another earnings report approaching, the paper trail reaches back to its 2015 IPO.",
  publishedAt: "November 2, 2026",
  datePublished: "2026-11-02",
  dateModified: "2026-11-02",
  stateCodes: [],
  companies: ["Sunrun"],
  topics: ["Sunrun investor reporting", "Sunrun SEC filings", "solar contract cancellations", "sales integrity controls", "solar securitization", "contract enforceability", "quarterly earnings"],
  author: "Jules Young",
  authorSlug: "jules-young",
  section: "Research",
  featured: true,
} satisfies ResearchStory;

const investor2017 = "https://www.sec.gov/Archives/edgar/data/1469367/000146936718000031/sunrun10k2017.htm";
const investor2019 = "https://www.sec.gov/Archives/edgar/data/1469367/000146936719000094/sunrun10q2019q1.htm";
const proxy2019 = "https://investors.sunrun.com/filings-financials/sec-filings/content/0001469367-19-000082/sunrunproxy2019.htm";
const proxy2021 = "https://investors.sunrun.com/filings-financials/sec-filings/content/0001469367-21-000102/sunrunproxy2021.htm";
const proxy2024 = "https://investors.sunrun.com/filings-financials/sec-filings/content/0001469367-24-000082/run-20240429.htm";
const proxy2026 = "https://investors.sunrun.com/filings-financials/sec-filings/content/0001469367-26-000029/run-20260415.htm";
const sec2025 = "https://www.sec.gov/Archives/edgar/data/1469367/000162828026012289/run-20251231.htm";
const q22026 = "https://www.sec.gov/Archives/edgar/data/1469367/000162828026053366/run-20260630.htm";
const q2Earnings = "https://www.sec.gov/Archives/edgar/data/1469367/000162828026053349/exhibit991q226.htm";
const luna = "https://investors.sunrun.com/filings-financials/sec-filings/content/0001628280-26-012289/ex1015-conformedlunasenior.htm";
const kpmg = "https://www.sec.gov/Archives/edgar/data/1469367/000119312526318223/d149204dex991.htm";
const ctComplaint = "https://portal.ct.gov/-/media/ag/press_releases/2024/2024-07-01-sunrun-complaint.pdf";
const ctSettlement = "https://portal.ct.gov/ag/press-releases/2026-press-releases/attorney-general-tong-announces-settlements-with-sunrun-solar-and-others-to-require-consumer-relief";
const azConsent = "https://www.azag.gov/consumer/sunrun";
const txInquiry = "https://www.texasattorneygeneral.gov/news/releases/attorney-general-ken-paxton-launches-major-initiative-combat-widespread-fraud-companies-selling";
const q3Announcement = "https://investors.sunrun.com/news-events/press-releases/detail/383/sunrun-announces-date-for-third-quarter-2026-earnings-report";
const cancellationReporting = "https://www.utilitydive.com/news/report-former-managers-say-sunrun-manipulated-sales-data-in-leadup-to-2015/443453/";

export const articleConfig = {
  schemaDescription: story.summary,
  schemaHeadline: story.title,
  breadcrumbLabel: "Sunrun investor reporting and sales controls",
  imageAlt: "SolarComplaint investigation into Sunrun shareholder disclosures, sales controls and customer-contract reporting",
  mentions: [
    { "@type": "Organization" as const, name: "Sunrun Inc." },
    { "@type": "Organization" as const, name: "U.S. Securities and Exchange Commission" },
  ],
  sources: [
    { name: "Sunrun 2017 Form 10-K, shareholder cancellation litigation", url: investor2017, datePublished: "2018-02-28" },
    { name: "Sunrun first-quarter 2019 Form 10-Q, final approval of $2.5 million federal settlement", url: investor2019 },
    { name: "Sunrun 2018 Form 10-K: IPO settlement and cancellation amendments", url: "https://www.sec.gov/Archives/edgar/data/1469367/000146936719000041/sunrun10k2018.htm" },
    { name: "Sunrun 2019 Form 10-K: shareholder derivative governance settlement", url: "https://www.sec.gov/Archives/edgar/data/1469367/000146936720000061/sunrun10k2019.htm" },
    { name: "July 19, 2018 judicial order on cancellation-reporting pleadings", url: "https://www.govinfo.gov/content/pkg/USCOURTS-cand-3_17-cv-02537/pdf/USCOURTS-cand-3_17-cv-02537-1.pdf", datePublished: "2018-07-19" },
    { name: "Sunrun 2019 proxy, sales incentive controls", url: proxy2019 },
    { name: "Sunrun 2021 proxy, repeated sales integrity language", url: proxy2021 },
    { name: "Sunrun 2024 proxy, sales code and integrity language", url: proxy2024 },
    { name: "Sunrun 2026 proxy, sales incentives and controls", url: proxy2026, datePublished: "2026-04-15" },
    { name: "Sunrun 2025 Form 10-K", url: sec2025 },
    { name: "Sunrun Q2 2026 Form 10-Q", url: q22026 },
    { name: "Sunrun Q2 2026 earnings release, SEC exhibit", url: q2Earnings, datePublished: "2026-08-05" },
    { name: "Sunrun Project Luna consolidated credit agreement, Exhibit 10.15", url: luna },
    { name: "KPMG July 2026 agreed-upon-procedures report", url: kpmg, datePublished: "2026-07-24" },
    { name: "Connecticut Attorney General 2024 complaint", url: ctComplaint, publisher: "Connecticut Attorney General", datePublished: "2024-07-01" },
    { name: "Connecticut Attorney General 2026 settlement announcement", url: ctSettlement, publisher: "Connecticut Attorney General", datePublished: "2026-10-23" },
    { name: "Arizona Attorney General Sunrun consent agreement", url: azConsent, publisher: "Arizona Attorney General" },
    { name: "Texas Attorney General solar investigative demands", url: txInquiry, publisher: "Texas Attorney General", datePublished: "2026-04-03" },
    { name: "Sunrun November 4 earnings announcement", url: q3Announcement, datePublished: "2026-10-07" },
    { name: "Utility Dive reporting on the 2017 cancellation controversy", url: cancellationReporting, datePublished: "2017-05-24" },
  ],
};

export function SunrunInvestorReportingBody() {
  return <>
    <nav className="case-question-links" aria-label="Breadcrumb"><Link href="/">Home</Link><Link href="/research">Research</Link><Link href="/companies/sunrun">Sunrun</Link><span aria-current="page">Investor reporting</span></nav>
    <p className="page-updated">By <Link href="/authors/jules-young">Jules Young</Link></p>

    <section className="info-section">
      <p><strong>TL;DR:</strong> Sunrun investors were questioning contract-cancellation reporting nearly a decade ago. Separate securities cases resulted in $32 million and $2.5 million settlements, followed by a governance-reform settlement, while the company has repeatedly assured shareholders that its incentive controls protect sales integrity. New consumer enforcement and SEC-filed financing requirements make the effectiveness of those controls a financial reporting question ahead of the November 4, 2026 earnings release.</p>

      <p>In May 2017, Sunrun faced shareholder litigation over how the company had reported customers who signed solar agreements but cancelled before installation. The complaints concerned disclosures made from 2015, around the time of Sunrun's initial public offering, through early 2017. Former sales managers separately told the press that cancellations had been delayed in internal reporting. Sunrun said its internal review found no evidence that sales employees had changed cancellation dates in the way alleged.</p>


      <p>The shareholder history reaches beyond the 2017 federal case. In 2016, investors sued over disclosures surrounding Sunrun's 2015 IPO, including net-metering programs, business practices and financial arrangements. A February 2018 amended complaint added allegations about the effects of customer cancellations. Sunrun's <a href="https://www.sec.gov/Archives/edgar/data/1469367/000146936719000041/sunrun10k2018.htm" target="_blank" rel="noreferrer">2018 Form 10-K</a> records a $32 million settlement approved December 14, 2018. Insurers funded $30.1 million, and Sunrun accrued $1.9 million.</p>

      <p>The separate federal cancellation-reporting suit began in May 2017. In a <a href="https://www.govinfo.gov/content/pkg/USCOURTS-cand-3_17-cv-02537/pdf/USCOURTS-cand-3_17-cv-02537-1.pdf" target="_blank" rel="noreferrer">July 19, 2018 order</a>, the judge dismissed the latest complaint with permission to amend because it did not sufficiently explain the importance of alleged delayed cancellation reporting to reported operating metrics or establish what senior executives knew. The parties then settled for $2.5 million, with final approval on March 4, 2019. Sunrun's <a href={investor2019} target="_blank" rel="noreferrer">2019 quarterly report</a> states the settlement was insurer-funded.</p>

      <p>Two additional shareholder actions, filed in 2017 and 2018, challenged corporate governance over cancellation-related disclosures. The <em>Barbara Sue Sklar Living Trust</em> and <em>Olsen</em> derivative cases settled on terms requiring Sunrun to adopt corporate governance measures. Final approval came November 29, 2019. Sunrun disclosed the obligation in its <a href="https://www.sec.gov/Archives/edgar/data/1469367/000146936720000061/sunrun10k2019.htm" target="_blank" rel="noreferrer">2019 Form 10-K</a>, but its litigation summary did not enumerate the reforms. The settlement stipulation and proof of implementation remain records investors should examine.</p>

      <p>By the time that settlement received final approval, Sunrun was giving shareholders a recurring assurance about the integrity of its sales operation. Its <a href={proxy2019} target="_blank" rel="noreferrer">2019 proxy statement</a> explained that sales commissions were uncapped but internal controls helped ensure awards went to salespeople who acted with integrity and discouraged problematic behavior. Substantially similar statements appeared in its <a href={proxy2021} target="_blank" rel="noreferrer">2021</a> and <a href={proxy2024} target="_blank" rel="noreferrer">2024</a> proxy statements. The <a href={proxy2026} target="_blank" rel="noreferrer">April 2026 proxy</a> again describes strong internal controls over incentive awards and a sales code of conduct intended to enforce consumer-protection compliance.</p>

      <p>This is the documented history behind the present investigation. Cancellation reporting allegations were filed in 2017 and added to the earlier IPO case in 2018; shareholder derivative claims led to governance reforms in 2019. Sunrun's assurances about sales integrity were appearing in shareholder materials by at least 2019. Now, in 2026, regulators have required the company to investigate certain contract-fraud claims and provide relief that can include cancellation and system removal. Shareholders have been given years of descriptions of the controls, but far less detail about their measurable results.</p>
    </section>

    <section className="info-section">
      <h2>Contracts are the financial asset</h2>
      <p>Sunrun reported approximately <strong>$38.6 billion in contracted revenue awaiting recognition</strong> at June 30, 2026. That figure, from its <a href={q22026} target="_blank" rel="noreferrer">second-quarter Form 10-Q</a>, includes future amounts expected to be recognized under long-term customer agreements. It is not cash in the bank. It measures the future revenue the company says existing agreements are expected to produce under its accounting policies, with roughly 5% scheduled for recognition over the following year.</p>

      <p>The same quarter brought a deterioration in new-customer economics. Subscriber additions fell 31% year over year to 19,793. Contracted Subscriber Value per addition increased to $55,033, but Contracted Net Subscriber Value fell 61% to $5,100. Sunrun reduced its 2026 cash-generation forecast to $200 million to $375 million, excluding specified equipment investments. The figures appear in the company's <a href={q2Earnings} target="_blank" rel="noreferrer">August 5 SEC-filed earnings release</a>.</p>

      <p>Customer acquisition is therefore both a source of projected value and an increasingly expensive part of the business. The question is not merely how many agreements Sunrun originates. It is how many remain enforceable, how often the company must modify or unwind them, and what costs follow when sales practices fail its own standards or applicable law.</p>

      <p>Sunrun's published financial sensitivity analysis makes clear that estimated portfolio value depends on collection assumptions. At a 6% discount rate, its June 2026 Contracted Gross Earning Assets estimate was $16.86 billion using a 0% annualized net default assumption. The estimate falls to approximately $15.41 billion at a 0.75% annualized net default rate. That $1.45 billion difference is a model sensitivity, not a calculation of contract-fraud losses. It demonstrates the financial importance of what happens to expected customer payments.</p>

      <p>For additional background, SolarComplaint has examined the <Link href="/research/sunrun-25-year-solar-contracts">homeowner and investor sides of Sunrun's 25-year customer agreements</Link>. Those terms underpin years of projected payments, service obligations and possible contract transfers.</p>
    </section>

    <section className="info-section">
      <h2>What regulators have required Sunrun to do</h2>
      <p>The <a href={ctComplaint} target="_blank" rel="noreferrer">Connecticut Attorney General's July 2024 complaint</a> described transactions involving disputed signatures, alleged impersonation and long-term solar contracts that homeowners said they had not authorized. Connecticut's <a href={ctSettlement} target="_blank" rel="noreferrer">October 23, 2026 settlement announcement</a> requires Sunrun to review specified fraud complaints and provide remedies, including possible credits, compensation, cancellation and equipment removal. Sunrun agreed to pay the state $300,000, and consumer restitution has no fixed cap.</p>

      <p>Connecticut went further than requiring a payment. The settlement calls for new verification procedures and a complaint process that examines available contract histories, verification records and other sales documents. Where a qualifying consumer says the contract was never provided and Sunrun cannot prove delivery, the agreement permits cancellation. The resulting records can show how many agreements the company must correct or unwind after a sales-integrity failure. SolarComplaint's <Link href="/cases/connecticut-attorney-general-sunrun-lawsuit">Connecticut investigation</Link> links to the filed complaint and stipulated judgment.</p>

      <p>Other states have challenged different parts of the same customer-acquisition and servicing operation. <a href={azConsent} target="_blank" rel="noreferrer">Arizona's May 2025 consent agreement</a> established relief and complaint-handling requirements for eligible Sunrun consumers. In April 2026, <a href={txInquiry} target="_blank" rel="noreferrer">Texas issued investigative demands</a> seeking records about solar sales claims, contract terms and customer representations. These actions concern different transactions and legal provisions, but each tests a business process that Sunrun has repeatedly told investors is subject to compliance controls.</p>

      <p>The company continues to rely on outside sales channels. Its <a href={sec2025} target="_blank" rel="noreferrer">2025 Form 10-K</a> explains that partners generate customers and that Sunrun maintains contractual oversight and compliance requirements. The same business model places Sunrun's name on the long-term customer agreements. Shareholders should be able to assess the effectiveness of those controls whether a contract originated through a direct employee or a third-party sales organization.</p>
    </section>

    <section className="info-section">
      <h2>The promises in the financing documents</h2>
      <p>Sunrun makes more specific promises when customer agreements support financing. Its <a href={luna} target="_blank" rel="noreferrer">Project Luna credit agreement, filed as Exhibit 10.15</a>, requires eligible assets to have legally enforceable customer contracts, materially compliant origination and installation, and accurate asset records. Schedule I addresses amendments and ordinary-course change orders. The agreement also requires customer agreements and modifications to be maintained electronically in the designated files.</p>

      <p>These requirements are tied to applicable law in the states where systems are installed. A company's internal classification of a document as an executed agreement cannot replace the consent or contract formalities required by law. The agreement itself provides that defective, cancelled, terminated and defaulted solar assets receive a zero discounted solar asset balance in the facility's relevant collateral calculations. This establishes a financial mechanism for handling contract defects, rather than just a statement of company policy.</p>

      <p>Another SEC-filed record shows where a published verification exercise stops. In its <a href={kpmg} target="_blank" rel="noreferrer">July 2026 agreed-upon-procedures report</a> for a separate securitization, KPMG compared selected portfolio data with supporting records and found discrepancies in certain system capacities, payment figures and other attributes. The engagement did not verify customer execution of contracts or whether asset origination complied with federal, state or local law. The review was designed for a different purpose from assessing homeowner authorization.</p>

      <p>This leaves investors with an identifiable information gap. The financing arrangements require legally compliant, enforceable agreements. The independent data review did not test that legal condition. The financial reports do not provide a comparable company-wide series showing how many contracts were later found unauthorized, cancelled for sales misconduct or excluded from eligible financing assets.</p>

      <p>SolarComplaint previously examined <Link href="/research/sunrun-solar-design-changes-change-orders">Sunrun's system-design changes, contract records and SEC-filed data comparisons</Link>. That research illustrates why changes to the financial attributes of a system and changes to a customer's actual agreement must be traced to their source documents.</p>
    </section>

    <section className="info-section">
      <h2>What shareholders should get from the next reporting cycle</h2>
      <p>In its June 2026 10-Q, Sunrun said it did not expect the outcome of existing legal proceedings to materially affect its consolidated financial position, operations or cash flows. That assessment came before Connecticut announced its October settlement. Sunrun has <a href={q3Announcement} target="_blank" rel="noreferrer">scheduled third-quarter earnings for November 4, 2026, after the market closes</a>, with an investor call at 4:30 p.m. Eastern. Connecticut's agreement was announced after the September quarter ended, so the accompanying reporting should be examined for any subsequent-event or legal-contingency discussion.</p>

      <p>There are specific numbers investors could use to test the controls management has described for years. How many customer agreements were investigated for authorization or sales-integrity problems? How many findings were substantiated, and how many contracts were corrected, cancelled or removed from financing eligibility? What did restitution, system removal, customer credits, contract-acquisition reversals and defective-asset remedies cost? Did any sales commissions get withheld or recovered because personnel failed the integrity standards cited in the proxy statements?</p>

      <p>The larger question goes back to Sunrun's earlier history. Contract cancellations were a shareholder-reporting controversy in 2017. Sales integrity became a recurring assurance in its proxies. In 2026, the company is under new requirements to investigate disputed contracts and fund consumer remedies, while its financial filings continue to place enormous value on future customer payments.</p>

      <p>Sunrun publishes detailed measures of the value created by its customer agreements. Investors can now ask for equally detailed measures of the contracts that its own controls fail to protect, and what those failures cost. The next quarter's financial results are a timely place to begin.</p>
    </section>

    <section className="info-section">
      <h2>Source documents</h2>
      <p><strong>Earlier shareholder record:</strong> <a href={investor2017} target="_blank" rel="noreferrer">2017 Form 10-K on contract-cancellation securities litigation</a> and <a href={investor2019} target="_blank" rel="noreferrer">2019 10-Q recording final approval of the $2.5 million settlement</a>. <a href={proxy2019} target="_blank" rel="noreferrer">2019 proxy</a>, <a href={proxy2021} target="_blank" rel="noreferrer">2021 proxy</a>, <a href={proxy2024} target="_blank" rel="noreferrer">2024 proxy</a> and <a href={proxy2026} target="_blank" rel="noreferrer">2026 proxy</a> show repeated descriptions of sales-incentive integrity controls.</p>
      <p><strong>Current financial records:</strong> <a href={sec2025} target="_blank" rel="noreferrer">2025 Form 10-K</a>; <a href={q22026} target="_blank" rel="noreferrer">June 2026 Form 10-Q</a>; <a href={q2Earnings} target="_blank" rel="noreferrer">Q2 earnings exhibit</a>; <a href={luna} target="_blank" rel="noreferrer">Project Luna financing agreement</a>; <a href={kpmg} target="_blank" rel="noreferrer">KPMG July 2026 asset-data procedures</a>.</p>
      <p><strong>Enforcement and upcoming results:</strong> <a href={ctComplaint} target="_blank" rel="noreferrer">Connecticut complaint</a> and <a href={ctSettlement} target="_blank" rel="noreferrer">October 2026 settlement</a>; <a href={azConsent} target="_blank" rel="noreferrer">Arizona agreement</a>; <a href={txInquiry} target="_blank" rel="noreferrer">Texas investigation announcement</a>; <a href={q3Announcement} target="_blank" rel="noreferrer">November 4 earnings schedule</a>.</p>
      <p><Link href="/companies/sunrun">More Sunrun reporting and official case documents</Link> · <Link href="/companies/sunrun/ethics-compliance">Sunrun's published ethics and compliance policies</Link> · <Link href="/methodology">Research methodology</Link></p>
    </section>
  </>;
}

export const article = defineResearchArticle({ story, config: articleConfig, Body: SunrunInvestorReportingBody });
