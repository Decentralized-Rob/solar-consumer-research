import Link from "next/link";
import { defineResearchArticle, type ResearchStory } from "../../lib/research-article";

export const story = {
  id: "sunrun-sales-controls-investor-reporting",
  slug: "sunrun-sales-controls-investor-reporting",
  href: "/research/sunrun-sales-controls-investor-reporting",
  title: "Sunrun's Sales Controls Faced Lawsuits for a Decade. The Oversight Language Barely Changed.",
  deck: "Shareholders challenged Sunrun's cancellation reporting in 2017. Court settlements, state enforcement actions and the company's own filings document what followed.",
  summary: "Sunrun faced two securities settlements, a vendor-oversight settlement and years of consumer enforcement. Its SEC and proxy statements kept describing strict sales and contractor controls.",
  seoTitle: "Sunrun Sales Controls: 2017 Investor Cases to 2026 Enforcement",
  seoDescription: "A decade of Sunrun sales practices: $32M and $2.5M shareholder settlements, $5.5M telemarketing settlement, repeated SEC oversight claims and 2026 enforcement.",
  keywords: ["Sunrun shareholder lawsuit", "Sunrun sales controls", "Sunrun vendor oversight", "Sunrun securities litigation", "Sunrun contract cancellations", "Sunrun SEC disclosures", "Sunrun Arizona settlement", "Sunrun Connecticut settlement"],
  openGraphTitle: "A Decade of Sunrun Sales-Control Claims and Court Records",
  socialDescription: "From 2017 cancellation allegations to 2026 consumer enforcement, Sunrun kept describing strict sales and contractor oversight in investor filings.",
  twitterDescription: "Sunrun's sales controls: earlier shareholder lawsuits, vendor compliance obligations, repeated SEC claims, and new state requirements.",
  lede: "Sunrun was defending its cancellation reporting in court in 2017. By 2026, regulators were ordering new contract checks and customer remedies. In between, the company kept telling investors how closely it supervised its sales operation.",
  publishedAt: "November 5, 2026",
  datePublished: "2026-11-05",
  dateModified: "2026-11-05",
  stateCodes: [],
  companies: ["Sunrun"],
  topics: ["Sunrun sales practices", "Sunrun investor reporting", "third-party contractor oversight", "shareholder litigation", "customer cancellations", "solar consumer enforcement"],
  author: "Jules Young",
  authorSlug: "jules-young",
  section: "Research",
  featured: false,
} satisfies ResearchStory;

const sec2021 = "https://investors.sunrun.com/filings-financials/sec-filings/content/0001469367-22-000033/run-20211231.htm";
const sec2026 = "https://investors.sunrun.com/filings-financials/sec-filings/content/0001628280-26-070158/run-20260930.htm";
const sec2018 = "https://www.sec.gov/Archives/edgar/data/1469367/000146936719000041/sunrun10k2018.htm";
const sec2019 = "https://www.sec.gov/Archives/edgar/data/1469367/000146936719000094/sunrun10q2019q1.htm";
const sec2019annual = "https://www.sec.gov/Archives/edgar/data/1469367/000146936720000061/sunrun10k2019.htm";
const judge2018 = "https://docs.justia.com/cases/federal/district-courts/california/candce/3:2017cv02537/311169/90";
const proxy2019 = "https://investors.sunrun.com/filings-financials/sec-filings/content/0001469367-19-000082/sunrunproxy2019.htm";
const proxy2026 = "https://investors.sunrun.com/filings-financials/sec-filings/content/0001469367-26-000029/run-20260415.htm";
const wsj = "https://www.wsj.com/articles/solar-company-sunrun-was-manipulating-sales-data-say-former-managers-1495445402";
const sfbt = "https://www.bizjournals.com/sanfrancisco/bizwomen/news/latest-news/2017/05/solar-company-manipulated-sales-data-former.html";
const slovin = "https://www.govinfo.gov/content/pkg/USCOURTS-cand-4_15-cv-05340/pdf/USCOURTS-cand-4_15-cv-05340-9.pdf";
const slovinOrder = "https://law.justia.com/cases/federal/district-courts/california/candce/4%3A2015cv05340/293131/213/";
const ct = "https://portal.ct.gov/ag/press-releases/2026-press-releases/attorney-general-tong-announces-settlements-with-sunrun-solar-and-others-to-require-consumer-relief";
const az = "https://www.azag.gov/sites/default/files/2025-06/2025-05-22%20SUNRUN%20STIPULATED%20CONSENT%20AGREEMENT.pdf";
const gbh = "https://www.wgbh.org/news/local/2025-04-28/solar-panel-company-accused-of-shady-business-in-massachusetts";
const wfsb = "https://www.wfsb.com/2024/07/18/exclusive-ct-attorney-general-files-lawsuit-against-sunrun/";
const cbs = "https://www.cbsnews.com/texas/news/texas-investigation-rooftop-solar-industry-cbs-news-texas/";
const utilityDive = "https://www.utilitydive.com/news/sunrun-rooftop-solar-battery-earnings/827458/";

export const articleConfig = {
  breadcrumbLabel: "Sunrun sales oversight and shareholder cases",
  imageAlt: "Sunrun sales controls and litigation, 2015 to 2026",
  sources: [
    { name: "Sunrun 2018 Form 10-K, securities settlement record", url: sec2018 },
    { name: "Sunrun first-quarter 2019 Form 10-Q, federal securities settlement", url: sec2019 },
    { name: "Sunrun 2019 Form 10-K, shareholder derivative governance changes", url: sec2019annual },
    { name: "In re Sunrun Inc. Securities Litigation, order dated July 19, 2018", url: judge2018, datePublished: "2018-07-19" },
    { name: "Sunrun 2019 proxy statement, sales-incentive controls", url: proxy2019 },
    { name: "Sunrun 2026 proxy statement, sales ethics", url: proxy2026 },
    { name: "Sunrun 2021 annual report, partner standards", url: sec2021 },
    { name: "Sunrun September 2026 10-Q, contractor risk", url: sec2026, datePublished: "2026-11-04" },
    { name: "Wall Street Journal, original interviews with former Sunrun managers", url: wsj, datePublished: "2017-05-22" },
    { name: "San Francisco Business Times follow-up on cancellation reporting", url: sfbt, datePublished: "2017-05-24" },
    { name: "Slovin v. Sunrun filed compliance stipulation", url: slovin },
    { name: "Slovin final approval order", url: slovinOrder, datePublished: "2019-07-19" },
    { name: "Arizona May 2025 Sunrun consent agreement", url: az, datePublished: "2025-05-22", publisher: "Arizona Attorney General" },
    { name: "Connecticut October 2026 Sunrun settlement", url: ct, datePublished: "2026-10-23", publisher: "Connecticut Attorney General" },
    { name: "GBH News Massachusetts Sunrun court investigation", url: gbh, datePublished: "2025-04-28" },
    { name: "WFSB I-Team on Sunrun outside sales and installation partners", url: wfsb, datePublished: "2024-07-18" },
    { name: "CBS News Texas solar consumer investigation", url: cbs, datePublished: "2026-04-30" },
    { name: "Utility Dive Sunrun affiliate sales transition", url: utilityDive, datePublished: "2026-08-10" },
  ],
};

export function SunrunSalesControlsBody() {
  return <>
    <nav className="case-question-links" aria-label="Breadcrumb"><Link href="/">Home</Link><Link href="/research">Research</Link><Link href="/companies/sunrun">Sunrun</Link><span aria-current="page">Sales controls</span></nav>
    <p className="page-updated">By <Link href="/authors/jules-young">Jules Young</Link></p>

    <section className="info-section">
      <p><strong>TL;DR:</strong> Sunrun faced shareholder lawsuits over contract-cancellation reporting beginning in 2017. Separate cases produced $32 million and $2.5 million settlements. A telemarketing case led to years of vendor-compliance obligations. Sunrun continued describing its sales and partner controls in investor filings as states later imposed additional requirements for consumer complaints and contract verification.</p>
      <p>Sunrun's sales practices were an investor issue well before the current wave of signature disputes. In May 2017, former sales managers told <a href={wsj} target="_blank" rel="noreferrer">The Wall Street Journal</a> that canceled solar contracts were kept in company sales reports longer than they should have been around the company's 2015 initial public offering. <a href={sfbt} target="_blank" rel="noreferrer">The San Francisco Business Times</a> reported additional accounts and Sunrun's response: the company said its review of audit records found no evidence for the specific claim that cancellation dates had been moved to 2099.</p>
      <p>Investors sued. They wanted to know whether customers who had already canceled their agreements were still being counted in reported business metrics. The case reached a question that has followed Sunrun for years: what do the company's customer records say, and when did management know?</p>
    </section>

    <section className="info-section">
      <h2>Two securities settlements, two different cases</h2>
      <p>A California state securities case challenged statements associated with Sunrun's 2015 IPO, including business practices and later allegations concerning cancellations. It settled for <strong>$32 million</strong> in 2018. Sunrun's <a href={sec2018} target="_blank" rel="noreferrer">2018 annual report</a> records the settlement, including $30.1 million funded by insurers.</p>
      <p>A separate federal case challenged Sunrun's cancellation reporting in its 2015–2017 disclosures. On July 19, 2018, Judge Vince Chhabria <a href={judge2018} target="_blank" rel="noreferrer">dismissed the amended complaint with leave to amend</a>. The plaintiffs needed stronger facts connecting cancellations to published metrics and to what senior executives knew. The parties later settled for <strong>$2.5 million</strong>, funded by insurers, as disclosed in Sunrun's <a href={sec2019} target="_blank" rel="noreferrer">2019 quarterly report</a>.</p>
      <p>Shareholder derivative cases brought by the Barbara Sue Sklar Living Trust and Olsen then led to a 2019 settlement requiring corporate governance measures. Sunrun recorded those obligations in its <a href={sec2019annual} target="_blank" rel="noreferrer">2019 annual report</a>. The actual settlement terms and implementation records are the documents needed to examine what changed inside the company.</p>
    </section>

    <section className="info-section">
      <h2>The promises Sunrun kept repeating</h2>
      <p>Sunrun's <a href={proxy2019} target="_blank" rel="noreferrer">2019 proxy</a> described uncapped sales commissions and internal controls meant to ensure awards were earned by salespeople acting with integrity. The <a href={proxy2026} target="_blank" rel="noreferrer">2026 proxy</a> continued discussing sales incentives, its code of conduct and controls meant to enforce consumer-protection requirements.</p>
      <p>Its <a href={sec2021} target="_blank" rel="noreferrer">2021 annual report</a> made a related claim about the outside businesses that helped sell and install its systems:</p>
      <blockquote><p>We have a variety of stringent quality standards that we apply in the selection, supervision, and oversight of our third-party suppliers and solar partners.</p></blockquote>
      <p>The <a href={sec2026} target="_blank" rel="noreferrer">November 4, 2026 filing</a> carries the same assurance with the term <em>energy system partners</em> replacing <em>solar partners</em>:</p>
      <blockquote><p>We have a variety of stringent quality standards that we apply in the selection, supervision, and oversight of our third-party suppliers and energy system partners.</p></blockquote>
      <p>Both filings go on to describe written agreements and monitoring of partner compliance. They also acknowledge that outside partners can disregard Sunrun's standards. The description of the oversight system remained essentially the same as regulators put more specific requirements into court-approved agreements.</p>
    </section>

    <section className="info-section">
      <h2>A vendor settlement had already required audits</h2>
      <p>In <em>Slovin v. Sunrun</em>, consumers brought a 2015 class action over allegedly unlawful telemarketing calls. A court approved a <a href={slovinOrder} target="_blank" rel="noreferrer">$5.5 million settlement in 2019</a>. The <a href={slovin} target="_blank" rel="noreferrer">filed agreement's Section 12</a> imposed four years of vendor-compliance measures: screening, complaint records, investigations, quarterly random audits with independent assistance and contractual authority to withhold payments from vendors responsible for unlawful calls.</p>
      <p>Section 12.10 of the same agreement preserves a notable distinction. Sunrun accepted monitoring obligations but stipulated that those measures could not themselves be used as evidence that Sunrun controlled the vendors or was responsible for their violations. The agreement gives an unusually specific picture of how oversight and vendor responsibility were addressed in one settlement.</p>
    </section>

    <section className="info-section">
      <h2>Regulators imposed new requirements in 2025 and 2026</h2>
      <p>Arizona's <a href={az} target="_blank" rel="noreferrer">May 2025 consent agreement</a> required Sunrun to maintain complaint-response procedures, customer updates, personnel training and coordination with third-party installers. It also provided for financial penalties and restitution. These were written operating requirements addressing the same customer-contact and contractor relationships that Sunrun had been describing in its investor disclosures.</p>
      <p>Connecticut's <a href={ct} target="_blank" rel="noreferrer">October 23, 2026 settlement</a> followed allegations of forged signatures, impersonation and deceptive sales. It requires fraud-complaint investigations, responses within 60 days and remedies that can include cancellation and system removal. In specified cases where customers say they never received contracts, Sunrun must establish delivery or permit cancellation.</p>
      <p>Independent reporting adds a measure of the disputes outside those settlements. <a href={gbh} target="_blank" rel="noreferrer">GBH News and Boston University researchers</a> documented more than 420 lawsuits Sunrun filed against Massachusetts customers since 2023, at least two dozen homeowner-initiated suits and about 170 complaints to the state attorney general during the period reviewed. In Connecticut, the <a href={wfsb} target="_blank" rel="noreferrer">WFSB I-Team</a> reported Sunrun's position that sales and installation personnel in the state's case were outside contractors and that its partners were expected to meet strict conduct standards.</p>
      <p>In Texas, <a href={cbs} target="_blank" rel="noreferrer">CBS News</a> reported on customers whose panels had been removed for roof repairs while Sunrun bills continued. Following the reporting, the customers confirmed a settlement canceling their agreement and providing $15,000. Sunrun told CBS that formal complaints represented a small portion of its customer base.</p>
    </section>

    <section className="info-section">
      <h2>The sales model changed. What happened to the controls?</h2>
      <p>Sunrun began shifting business away from outside affiliate sales toward its own sales force. <a href={utilityDive} target="_blank" rel="noreferrer">Utility Dive reported in August 2026</a> that Sunrun tied slower subscriber additions to that transition, the onboarding of new direct salespeople and the bankruptcy of partner Freedom Forever. The channel change raises a measurable question: whether bringing sales directly inside the company changed the problems that previous controls were intended to catch.</p>
      <p>Sunrun has published years of descriptions of its sales standards and contractor supervision. Its public filings offer far fewer figures on how many sales agreements failed verification, how many partner violations were substantiated, which corrective actions followed and what those corrections cost. The company has disclosed settlements and individual financial outcomes. A consistent series measuring the controls themselves would show how well they worked.</p>
      <p>The separate <Link href="/research/sunrun-38-billion-contract-validity">investor investigation of $38.9 billion in contracted future revenue</Link> examines what customer-signature disputes mean for financial reporting. The <Link href="/research/sunrun-new-jersey-complaints-lawsuits">New Jersey case review</Link> follows the underlying court records, without duplicating them here.</p>
      <p><Link href="/companies/sunrun">Sunrun research hub</Link> · <Link href="/cases/connecticut-attorney-general-sunrun-lawsuit">Connecticut settlement record</Link> · <Link href="/methodology">Research methodology</Link></p>
    </section>
  </>;
}

export const article = defineResearchArticle({ story, config: articleConfig, Body: SunrunSalesControlsBody });
