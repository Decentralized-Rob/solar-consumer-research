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
const slovinStipulation = "https://www.govinfo.gov/content/pkg/USCOURTS-cand-4_15-cv-05340/pdf/USCOURTS-cand-4_15-cv-05340-9.pdf";
const slovinOrder = "https://law.justia.com/cases/federal/district-courts/california/candce/4%3A2015cv05340/293131/213/";
const vivint2022 = "https://www.sec.gov/Archives/edgar/data/1469367/000146936722000118/run-20220630.htm";
const vivintSecurities = "https://securities.stanford.edu/filings-case.html?id=107195";
const muddyReport = "https://muddywatersresearch.com/research/run/just-making-it-up/";
const sunrunMuddyReply = "https://investors.sunrun.com/news-events/press-releases/detail/296/deceptive-short-seller-muddy-waters-once-again-has-its";
const wsjManagers = "https://www.wsj.com/articles/solar-company-sunrun-was-manipulating-sales-data-say-former-managers-1495445402";
const sfBusinessTimes = "https://www.bizjournals.com/sanfrancisco/bizwomen/news/latest-news/2017/05/solar-company-manipulated-sales-data-former.html";
const gbhInvestigation = "https://www.wgbh.org/news/local/2025-04-28/solar-panel-company-accused-of-shady-business-in-massachusetts";
const gbhMethod = "https://www.wgbh.org/news/local/2025-05-21/gbh-daily-solar-scams-investigation";
const wfsbReport = "https://www.wfsb.com/2024/07/18/exclusive-ct-attorney-general-files-lawsuit-against-sunrun/";
const cbsTexas = "https://www.cbsnews.com/texas/news/texas-investigation-rooftop-solar-industry-cbs-news-texas/";
const kprcTexas = "https://www.click2houston.com/news/local/2026/04/03/state-investigates-solar-companies-over-claims-of-deceptive-savings-contracts/";
const utilityDive2026 = "https://www.utilitydive.com/news/sunrun-rooftop-solar-battery-earnings/827458/";
const bloomberg2023 = "https://news.bloombergtax.com/financial-accounting/sunpower-restatement-sunrun-short-report-sink-solar-stocks";
const insideInvestigator = "https://insideinvestigator.org/tong-settles-deceptive-solar-sales-suit/";
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
    { name: "Slovin v. Sunrun 2019 telemarketing settlement, Section 12 injunctive requirements", url: slovinStipulation, datePublished: "2019-01-29" },
    { name: "July 19, 2019 final settlement approval in Slovin v. Sunrun", url: slovinOrder, datePublished: "2019-07-19" },
    { name: "Sunrun second-quarter 2022 Form 10-Q on inherited Vivint securities settlement", url: vivint2022 },
    { name: "Vivint Solar 2019 securities case filed record and 2022 judgment", url: vivintSecurities },
    { name: "Muddy Waters Research 2023 criticism of subscriber counts", url: muddyReport, datePublished: "2023-10-25" },
    { name: "Sunrun October 25, 2023 rebuttal to Muddy Waters subscriber comparison", url: sunrunMuddyReply, datePublished: "2023-10-25" },
    { name: "Wall Street Journal May 2017 original reporting, interviews with former Sunrun managers", url: wsjManagers, datePublished: "2017-05-22" },
    { name: "San Francisco Business Times follow-up and Sunrun executive response, May 2017", url: sfBusinessTimes, datePublished: "2017-05-24" },
    { name: "GBH News investigation of Sunrun Massachusetts cases and 170 state complaints", url: gbhInvestigation, datePublished: "2025-04-28" },
    { name: "GBH reporter Jenifer McKim explains court-data collection method", url: gbhMethod, datePublished: "2025-05-21" },
    { name: "WFSB I-Team investigation, Sunrun response on outside sales and installation", url: wfsbReport, datePublished: "2024-07-18" },
    { name: "CBS News Texas April 2026 investigative reporting and Sunrun response", url: cbsTexas, datePublished: "2026-04-30" },
    { name: "KPRC Houston reporting on contract cancellation and Sunrun response", url: kprcTexas, datePublished: "2026-04-03" },
    { name: "Utility Dive analysis of Sunrun affiliate-sales transition", url: utilityDive2026, datePublished: "2026-08-10" },
    { name: "Bloomberg News reporting on October 2023 Sunrun short-seller challenge", url: bloomberg2023, datePublished: "2023-10-25" },
    { name: "Inside Investigator independent reporting on October 2026 settlement", url: insideInvestigator, datePublished: "2026-10-26" },
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
      <p><strong>TL;DR:</strong> Sunrun investors were questioning contract-cancellation reporting nearly a decade ago. Separate securities cases resulted in $32 million and $2.5 million settlements, and a 2015 telemarketing class action settled for $5.5 million; shareholder derivative litigation produced governance reforms, while the company has repeatedly assured shareholders that its incentive controls protect sales integrity. New consumer enforcement and SEC-filed financing requirements make the effectiveness of those controls a financial reporting question ahead of the November 4, 2026 earnings release.</p>

      <p>In May 2017, Sunrun faced shareholder litigation over how the company had reported customers who signed solar agreements but cancelled before installation. The complaints concerned disclosures made from 2015, around the time of Sunrun&apos;s initial public offering, through early 2017. Former sales managers separately told the press that cancellations had been delayed in internal reporting. Sunrun said its internal review found no evidence that sales employees had changed cancellation dates in the way alleged.</p>


      <p>Original reporting provided more than the allegations eventually recited in the lawsuits. In May 2017, <a href={wsjManagers} target="_blank" rel="noreferrer">The Wall Street Journal interviewed former Sunrun sales managers</a> who said cancellations were delayed in internal reporting around the 2015 IPO. The <a href={sfBusinessTimes} target="_blank" rel="noreferrer">San Francisco Business Times</a> reported that four former managers had described similar practices, including a former Hawaii regional manager who alleged that cancelled deals were kept in the pipeline. Sunrun responded that it examined digital audit records and found no evidence for the specific allegation that cancellation dates had been moved to 2099. The independent reporting identifies people who worked inside the business and documents the company&apos;s contemporaneous response.</p>

      <p>The shareholder history reaches beyond the 2017 federal case. In 2016, investors sued over disclosures surrounding Sunrun&apos;s 2015 IPO, including net-metering programs, business practices and financial arrangements. A February 2018 amended complaint added allegations about the effects of customer cancellations. Sunrun&apos;s <a href="https://www.sec.gov/Archives/edgar/data/1469367/000146936719000041/sunrun10k2018.htm" target="_blank" rel="noreferrer">2018 Form 10-K</a> records a $32 million settlement approved December 14, 2018. Insurers funded $30.1 million, and Sunrun accrued $1.9 million.</p>

      <p>The separate federal cancellation-reporting suit began in May 2017. In a <a href="https://www.govinfo.gov/content/pkg/USCOURTS-cand-3_17-cv-02537/pdf/USCOURTS-cand-3_17-cv-02537-1.pdf" target="_blank" rel="noreferrer">July 19, 2018 order</a>, the judge dismissed the latest complaint with permission to amend because it did not sufficiently explain the importance of alleged delayed cancellation reporting to reported operating metrics or establish what senior executives knew. The parties then settled for $2.5 million, with final approval on March 4, 2019. Sunrun&apos;s <a href={investor2019} target="_blank" rel="noreferrer">2019 quarterly report</a> states the settlement was insurer-funded.</p>

      <p>Two additional shareholder actions, filed in 2017 and 2018, challenged corporate governance over cancellation-related disclosures. The <em>Barbara Sue Sklar Living Trust</em> and <em>Olsen</em> derivative cases settled on terms requiring Sunrun to adopt corporate governance measures. Final approval came November 29, 2019. Sunrun disclosed the obligation in its <a href="https://www.sec.gov/Archives/edgar/data/1469367/000146936720000061/sunrun10k2019.htm" target="_blank" rel="noreferrer">2019 Form 10-K</a>, but its litigation summary did not enumerate the reforms. The settlement stipulation and proof of implementation remain records investors should examine.</p>

      <p>By the time that settlement received final approval, Sunrun was giving shareholders a recurring assurance about the integrity of its sales operation. Its <a href={proxy2019} target="_blank" rel="noreferrer">2019 proxy statement</a> explained that sales commissions were uncapped but internal controls helped ensure awards went to salespeople who acted with integrity and discouraged problematic behavior. Substantially similar statements appeared in its <a href={proxy2021} target="_blank" rel="noreferrer">2021</a> and <a href={proxy2024} target="_blank" rel="noreferrer">2024</a> proxy statements. The <a href={proxy2026} target="_blank" rel="noreferrer">April 2026 proxy</a> again describes strong internal controls over incentive awards and a sales code of conduct intended to enforce consumer-protection compliance.</p>

      <p>This is the documented history behind the present investigation. Cancellation reporting allegations were filed in 2017 and added to the earlier IPO case in 2018; shareholder derivative claims led to governance reforms in 2019. Sunrun&apos;s assurances about sales integrity were appearing in shareholder materials by at least 2019. Now, in 2026, regulators have required the company to investigate certain contract-fraud claims and provide relief that can include cancellation and system removal. Shareholders have been given years of descriptions of the controls, but far less detail about their measurable results.</p>
    </section>

    <section className="info-section">
      <h2>Contracts are the financial asset</h2>
      <p>Sunrun reported approximately <strong>$38.6 billion in contracted revenue awaiting recognition</strong> at June 30, 2026. That figure, from its <a href={q22026} target="_blank" rel="noreferrer">second-quarter Form 10-Q</a>, includes future amounts expected to be recognized under long-term customer agreements. It is not cash in the bank. It measures the future revenue the company says existing agreements are expected to produce under its accounting policies, with roughly 5% scheduled for recognition over the following year.</p>

      <p>The same quarter brought a deterioration in new-customer economics. Subscriber additions fell 31% year over year to 19,793. Contracted Subscriber Value per addition increased to $55,033, but Contracted Net Subscriber Value fell 61% to $5,100. Sunrun reduced its 2026 cash-generation forecast to $200 million to $375 million, excluding specified equipment investments. The figures appear in the company&apos;s <a href={q2Earnings} target="_blank" rel="noreferrer">August 5 SEC-filed earnings release</a>.</p>

      <p>Industry reporters have documented how management is changing that acquisition model. <a href={utilityDive2026} target="_blank" rel="noreferrer">Utility Dive&apos;s August 2026 earnings analysis</a> described Sunrun&apos;s move from outside affiliate sales toward its own sales force. Management linked slower sales to reductions in the affiliate channel, a longer onboarding process for direct representatives and the bankruptcy of Freedom Forever, a major partner. Those operational explanations are relevant to what investors are told about the company&apos;s ability to supervise and value customers acquired through different sales channels.</p>

      <p>Customer acquisition is therefore both a source of projected value and an increasingly expensive part of the business. The question is not merely how many agreements Sunrun originates. It is how many remain enforceable, how often the company must modify or unwind them, and what costs follow when sales practices fail its own standards or applicable law.</p>

      <p>Sunrun&apos;s published financial sensitivity analysis makes clear that estimated portfolio value depends on collection assumptions. At a 6% discount rate, its June 2026 Contracted Gross Earning Assets estimate was $16.86 billion using a 0% annualized net default assumption. The estimate falls to approximately $15.41 billion at a 0.75% annualized net default rate. That $1.45 billion difference is a model sensitivity, not a calculation of contract-fraud losses. It demonstrates the financial importance of what happens to expected customer payments.</p>

      <p>Sunrun's reported subscriber count was challenged again in October 2023, this time by short seller Muddy Waters. Its <a href={muddyReport} target="_blank" rel="noreferrer">report</a> compared Sunrun's non-GAAP subscriber figures with data supplied to the U.S. Energy Information Administration and suggested the gap affected asset valuation and investment tax credit assumptions. Sunrun issued a <a href={sunrunMuddyReply} target="_blank" rel="noreferrer">same-day rebuttal</a>, arguing that it counts installed customers while EIA data reflects operational and billed systems, excludes prepaid subscribers and follows a different reporting purpose. The dispute supplies an earlier, direct investor-facing example of management being asked to reconcile customer counts across reporting systems. Neither side's public statement settled the factual debate.</p>

      <p><a href={bloomberg2023} target="_blank" rel="noreferrer">Bloomberg News reported</a> that Sunrun&apos;s shares fell as much as 13% after the October 2023 short-seller allegations. The market reaction underscores why reconciliations of subscriber counts and contract status are not simply back-office questions.</p>

      <p>For additional background, SolarComplaint has examined the <Link href="/research/sunrun-25-year-solar-contracts">homeowner and investor sides of Sunrun&apos;s 25-year customer agreements</Link>. Those terms underpin years of projected payments, service obligations and possible contract transfers.</p>
    </section>

    <section className="info-section">
      <h2>What regulators have required Sunrun to do</h2>
      <p>The <a href={ctComplaint} target="_blank" rel="noreferrer">Connecticut Attorney General&apos;s July 2024 complaint</a> described transactions involving disputed signatures, alleged impersonation and long-term solar contracts that homeowners said they had not authorized. Connecticut&apos;s <a href={ctSettlement} target="_blank" rel="noreferrer">October 23, 2026 settlement announcement</a> requires Sunrun to review specified fraud complaints and provide remedies, including possible credits, compensation, cancellation and equipment removal. Sunrun agreed to pay the state $300,000, and consumer restitution has no fixed cap.</p>

      <p>Connecticut went further than requiring a payment. The settlement calls for new verification procedures and a complaint process that examines available contract histories, verification records and other sales documents. Where a qualifying consumer says the contract was never provided and Sunrun cannot prove delivery, the agreement permits cancellation. The resulting records can show how many agreements the company must correct or unwind after a sales-integrity failure. SolarComplaint&apos;s <Link href="/cases/connecticut-attorney-general-sunrun-lawsuit">Connecticut investigation</Link> links to the filed complaint and stipulated judgment.</p>

      <p>Other states have challenged different parts of the same customer-acquisition and servicing operation. <a href={azConsent} target="_blank" rel="noreferrer">Arizona&apos;s May 2025 consent agreement</a> established relief and complaint-handling requirements for eligible Sunrun consumers. In April 2026, <a href={txInquiry} target="_blank" rel="noreferrer">Texas issued investigative demands</a> seeking records about solar sales claims, contract terms and customer representations. These actions concern different transactions and legal provisions, but each tests a business process that Sunrun has repeatedly told investors is subject to compliance controls.</p>

    </section>

    <section className="info-section">
      <h2>What independent reporting found</h2>

      <p>In Massachusetts, <a href={gbhInvestigation} target="_blank" rel="noreferrer">GBH News conducted its own review of court records and homeowner disputes</a>. Working with Boston University student researchers, it identified more than 420 lawsuits Sunrun filed against Massachusetts customers since 2023 and at least two dozen homeowner lawsuits alleging fraud, damage or related problems. The reporting also found approximately 170 complaints concerning Sunrun submitted to the Massachusetts Attorney General during that period, more than for any other solar company in the state. Reporter Jenifer McKim <a href={gbhMethod} target="_blank" rel="noreferrer">described the data collection process</a> and said journalists interviewed about two dozen affected homeowners. Sunrun told GBH that serious claims were rare and that its approach to debt collection was measured and customer-focused.</p>

      <p>That independent docket count places real numbers beside the general assurances. Hundreds of court filings are not hundreds of proven sales violations. They are evidence of the volume of contractual disputes reaching Massachusetts courts, and they deserve examination alongside the measures Sunrun uses to report customer retention, collections and cancellations.</p>

      <p>In July 2024, <a href={wfsbReport} target="_blank" rel="noreferrer">Connecticut&apos;s WFSB I-Team published Sunrun&apos;s response to the state&apos;s lawsuit</a>. Sunrun stressed that the sales representatives and installation crews involved were outside contractors, and said it required partners to follow strict conduct and quality standards. The station also interviewed homeowners who described roof problems, disputed work and difficulty obtaining contract cancellation. The company&apos;s response repeated the same oversight theme that appears in its investor filings, while distinguishing the people performing the work from Sunrun employees.</p>

      <p>The <a href={cbsTexas} target="_blank" rel="noreferrer">CBS News Texas I-Team reported in April 2026</a> on a couple who said they continued receiving bills after their leased panels stopped operating and were removed for roof repairs. After CBS interviewed the customers, they confirmed a settlement cancelling the Sunrun agreement and awarding $15,000. Sunrun told CBS that only four of the complaints referenced by the Texas Attorney General involved its business in the prior two years and said formal concerns represented a small fraction of its customer base. The company was defending its overall complaint record while the broadcaster documented a specific cancellation and payment.</p>

      <p>In another Texas investigation, <a href={kprcTexas} target="_blank" rel="noreferrer">Houston station KPRC</a> reported on homeowner Frances Holt, who said a sales pitch and subsequent installation left her facing a demand exceeding $134,000 under the agreement. Following the reporting, Sunrun apologized for failing to meet its customer-service standards and agreed to remove the solar system without charge. These independently reported outcomes show that corrections and cancellations are occurring. Investors still lack a consolidated public accounting of their frequency and cost.</p>

      <p><a href={insideInvestigator} target="_blank" rel="noreferrer">Inside Investigator&apos;s October 2026 account</a> separately examined Connecticut&apos;s settlement requirements, including sales verification, independent auditing, investigation deadlines and the prohibition on certain conduct by salespeople. That adds a current independent account of the controls now being required by a regulator, alongside Sunrun&apos;s own descriptions of the controls it already had.</p>

    </section>

    <section className="info-section">

      <p>A fourth proceeding documented how Sunrun dealt with outside vendors years before the current enforcement actions. In <em>Slovin v. Sunrun</em>, filed in November 2015, consumers brought a class action over allegedly unlawful telemarketing calls. A <a href={slovinOrder} target="_blank" rel="noreferrer">federal judge approved a $5.5 million settlement in July 2019</a>. The <a href={slovinStipulation} target="_blank" rel="noreferrer">court-filed agreement, Section 12</a>, required four years of compliance measures: vendor due diligence, investigations and recordkeeping for complaints, quarterly random vendor audits with independent assistance, and contractual measures allowing payments to be withheld from vendors that made unlawful calls.</p>

      <p>Section 12.10 of that same agreement expressly prevents the compliance measures from being used as evidence that Sunrun controlled those vendors, that they were its agents, or that Sunrun was legally responsible for their alleged violations. The arrangement put substantial monitoring obligations on Sunrun while preserving a contractual boundary around vendor responsibility. It also required records of the allegations, investigation results, responses and final resolutions. For investors, the recurring question is how management measures these oversight programs and accounts for their cost and effectiveness.</p>

      <p>Sunrun also inherited a distinct securities dispute when it acquired Vivint Solar in October 2020. The <em>Crumrine</em> and <em>Li</em> lawsuits, first filed against Vivint in 2019, alleged that unauthorized customer contracts and other improper sales practices inflated reported sales and installed megawatts. After the acquisition, Sunrun disclosed the case and its disposition in the <a href={vivint2022} target="_blank" rel="noreferrer">June 2022 Form 10-Q</a>. The parties settled for $1.25 million, and final approval came May 9, 2022. Sunrun reported that insurance reduced its accrual to $550,000. The <a href={vivintSecurities} target="_blank" rel="noreferrer">case history</a> concerns Vivint's pre-acquisition operations, but the resolution appeared in Sunrun's financial disclosures following the acquisition.</p>

      <p>The company continues to rely on outside sales channels. Its <a href={sec2025} target="_blank" rel="noreferrer">2025 Form 10-K</a> explains that partners generate customers and that Sunrun maintains contractual oversight and compliance requirements. The same business model places Sunrun&apos;s name on the long-term customer agreements. Shareholders should be able to assess the effectiveness of those controls whether a contract originated through a direct employee or a third-party sales organization.</p>
    </section>

    <section className="info-section">
      <h2>The promises in the financing documents</h2>
      <p>Sunrun makes more specific promises when customer agreements support financing. Its <a href={luna} target="_blank" rel="noreferrer">Project Luna credit agreement, filed as Exhibit 10.15</a>, requires eligible assets to have legally enforceable customer contracts, materially compliant origination and installation, and accurate asset records. Schedule I addresses amendments and ordinary-course change orders. The agreement also requires customer agreements and modifications to be maintained electronically in the designated files.</p>

      <p>These requirements are tied to applicable law in the states where systems are installed. A company&apos;s internal classification of a document as an executed agreement cannot replace the consent or contract formalities required by law. The agreement itself provides that defective, cancelled, terminated and defaulted solar assets receive a zero discounted solar asset balance in the facility&apos;s relevant collateral calculations. This establishes a financial mechanism for handling contract defects, rather than just a statement of company policy.</p>

      <p>Another SEC-filed record shows where a published verification exercise stops. In its <a href={kpmg} target="_blank" rel="noreferrer">July 2026 agreed-upon-procedures report</a> for a separate securitization, KPMG compared selected portfolio data with supporting records and found discrepancies in certain system capacities, payment figures and other attributes. The engagement did not verify customer execution of contracts or whether asset origination complied with federal, state or local law. The review was designed for a different purpose from assessing homeowner authorization.</p>

      <p>This leaves investors with an identifiable information gap. The financing arrangements require legally compliant, enforceable agreements. The independent data review did not test that legal condition. The financial reports do not provide a comparable company-wide series showing how many contracts were later found unauthorized, cancelled for sales misconduct or excluded from eligible financing assets.</p>

      <p>SolarComplaint previously examined <Link href="/research/sunrun-solar-design-changes-change-orders">Sunrun&apos;s system-design changes, contract records and SEC-filed data comparisons</Link>. That research illustrates why changes to the financial attributes of a system and changes to a customer&apos;s actual agreement must be traced to their source documents.</p>
    </section>

    <section className="info-section">
      <h2>What shareholders should get from the next reporting cycle</h2>
      <p>In its June 2026 10-Q, Sunrun said it did not expect the outcome of existing legal proceedings to materially affect its consolidated financial position, operations or cash flows. That assessment came before Connecticut announced its October settlement. Sunrun has <a href={q3Announcement} target="_blank" rel="noreferrer">scheduled third-quarter earnings for November 4, 2026, after the market closes</a>, with an investor call at 4:30 p.m. Eastern. Connecticut&apos;s agreement was announced after the September quarter ended, so the accompanying reporting should be examined for any subsequent-event or legal-contingency discussion.</p>

      <p>There are specific numbers investors could use to test the controls management has described for years. How many customer agreements were investigated for authorization or sales-integrity problems? How many findings were substantiated, and how many contracts were corrected, cancelled or removed from financing eligibility? What did restitution, system removal, customer credits, contract-acquisition reversals and defective-asset remedies cost? Did any sales commissions get withheld or recovered because personnel failed the integrity standards cited in the proxy statements?</p>

      <p>The larger question goes back to Sunrun&apos;s earlier history. Contract cancellations were a shareholder-reporting controversy in 2017. Sales integrity became a recurring assurance in its proxies. In 2026, the company is under new requirements to investigate disputed contracts and fund consumer remedies, while its financial filings continue to place enormous value on future customer payments.</p>

      <p>Sunrun publishes detailed measures of the value created by its customer agreements. Investors can now ask for equally detailed measures of the contracts that its own controls fail to protect, and what those failures cost. The next quarter&apos;s financial results are a timely place to begin.</p>
    </section>

    <section className="info-section">
      <h2>Source documents</h2>
      <p><strong>Independent reporting:</strong> <a href={wsjManagers} target="_blank" rel="noreferrer">Wall Street Journal, May 2017 former-manager reporting</a>; <a href={sfBusinessTimes} target="_blank" rel="noreferrer">San Francisco Business Times, May 2017 follow-up</a>; <a href={gbhInvestigation} target="_blank" rel="noreferrer">GBH Massachusetts court-data investigation</a> and <a href={gbhMethod} target="_blank" rel="noreferrer">reporting methodology</a>; <a href={wfsbReport} target="_blank" rel="noreferrer">WFSB I-Team Connecticut reporting</a>; <a href={cbsTexas} target="_blank" rel="noreferrer">CBS News Texas I-Team</a>; <a href={kprcTexas} target="_blank" rel="noreferrer">KPRC Houston reporting</a>; <a href={utilityDive2026} target="_blank" rel="noreferrer">Utility Dive 2026 sales-channel analysis</a>; <a href={bloomberg2023} target="_blank" rel="noreferrer">Bloomberg 2023 investor reaction</a>; and <a href={insideInvestigator} target="_blank" rel="noreferrer">Inside Investigator 2026 Connecticut settlement report</a>.</p>
      <p><strong>Earlier shareholder record:</strong> <a href={investor2017} target="_blank" rel="noreferrer">2017 Form 10-K on contract-cancellation securities litigation</a> and <a href={investor2019} target="_blank" rel="noreferrer">2019 10-Q recording final approval of the $2.5 million settlement</a>. <a href={proxy2019} target="_blank" rel="noreferrer">2019 proxy</a>, <a href={proxy2021} target="_blank" rel="noreferrer">2021 proxy</a>, <a href={proxy2024} target="_blank" rel="noreferrer">2024 proxy</a> and <a href={proxy2026} target="_blank" rel="noreferrer">2026 proxy</a> show repeated descriptions of sales-incentive integrity controls.</p>
      <p><strong>Current financial records:</strong> <a href={sec2025} target="_blank" rel="noreferrer">2025 Form 10-K</a>; <a href={q22026} target="_blank" rel="noreferrer">June 2026 Form 10-Q</a>; <a href={q2Earnings} target="_blank" rel="noreferrer">Q2 earnings exhibit</a>; <a href={luna} target="_blank" rel="noreferrer">Project Luna financing agreement</a>; <a href={kpmg} target="_blank" rel="noreferrer">KPMG July 2026 asset-data procedures</a>.</p>
      <p><strong>Enforcement and upcoming results:</strong> <a href={ctComplaint} target="_blank" rel="noreferrer">Connecticut complaint</a> and <a href={ctSettlement} target="_blank" rel="noreferrer">October 2026 settlement</a>; <a href={azConsent} target="_blank" rel="noreferrer">Arizona agreement</a>; <a href={txInquiry} target="_blank" rel="noreferrer">Texas investigation announcement</a>; <a href={q3Announcement} target="_blank" rel="noreferrer">November 4 earnings schedule</a>.</p>
      <p><Link href="/companies/sunrun">More Sunrun reporting and official case documents</Link> · <Link href="/companies/sunrun/ethics-compliance">Sunrun&apos;s published ethics and compliance policies</Link> · <Link href="/methodology">Research methodology</Link></p>
    </section>
  </>;
}

export const article = defineResearchArticle({ story, config: articleConfig, Body: SunrunInvestorReportingBody });
