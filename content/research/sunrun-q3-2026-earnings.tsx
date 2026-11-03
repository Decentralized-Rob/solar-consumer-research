import Link from "next/link";
import { defineResearchArticle, type ResearchStory } from "../../lib/research-article";

export const story = {
  id: "sunrun-q3-2026-earnings",
  slug: "sunrun-q3-2026-earnings",
  href: "/research/sunrun-q3-2026-earnings",
  title: "Sunrun Q3 Earnings: Consumer Complaints and the Contracts Behind Wall Street\'s Financing",
  deck: "Before Sunrun reports November 4, analysts have cut price targets, Connecticut has ordered reviews of covered fraud claims, and an independent rating agency has documented 37,595 customer contracts behind a securities deal.",
  summary: "Sunrun Q3 2026 earnings preview: analyst EPS and revenue estimates, price target cuts, Connecticut's Sunrun settlement, independent reporting on contract disputes, and KBRA-rated solar securities.",
  seoTitle: "Sunrun Q3 2026 Earnings: Consumer Complaints & Contract Risk",
  seoDescription: "Sunrun reports Nov. 4. Analyst forecasts, price-target cuts, Connecticut\'s fraud-claims review and 37,595 contracts backing a rated securities deal.",
  keywords: ["Sunrun Q3 2026 earnings", "Sunrun earnings November 4", "Sunrun earnings report", "RUN stock earnings", "Sunrun earnings estimates", "Sunrun analyst price targets", "Sunrun Connecticut settlement", "Sunrun consumer complaints", "Sunrun solar securitization"],
  openGraphTitle: "Sunrun Q3 Earnings: Consumer Complaints and Wall Street\'s Solar Contracts",
  socialDescription: "Ahead of Sunrun's Nov. 4 earnings, a settlement requires a fraud-claims review while a rating agency documents thousands of solar customer agreements backing securities.",
  twitterDescription: "Sunrun Q3 earnings, Wall Street forecasts, contract disputes and the rating-agency records behind long-term solar financing.",
  lede: "Wall Street puts a value on long-term solar customer contracts. Connecticut is requiring Sunrun to investigate allegations that some of those agreements were sold improperly. Both stories are unfolding ahead of the company's November 4 earnings report.",
  publishedAt: "November 2, 2026",
  datePublished: "2026-11-02",
  dateModified: "2026-11-02",
  stateCodes: [],
  companies: ["Sunrun"],
  topics: ["Sunrun quarterly earnings", "RUN stock", "analyst estimates", "solar customer agreements", "Connecticut consumer settlement", "solar asset-backed securities"],
  author: "Jules Young",
  authorSlug: "jules-young",
  section: "Research",
  featured: true,
} satisfies ResearchStory;

const sunrunEarningsDate = "https://investors.sunrun.com/news-events/press-releases/detail/383/sunrun-announces-date-for-third-quarter-2026-earnings-report";
const zacksForecast = "https://www.zacks.com/stock/news/3017186/sunrun-run-earnings-expected-to-grow-should-you-buy";
const marketbeatForecast = "https://www.marketbeat.com/earnings/reports/2026-11-4-sunrun-inc-stock/";
const tipranksTargets = "https://www.tipranks.com/stocks/run/forecast";
const marketbeatTargets = "https://www.marketbeat.com/stocks/NASDAQ/RUN/forecast/";
const simplyWallSt = "https://simplywall.st/stocks/us/capital-goods/nasdaq-run/sunrun/news/is-connecticut-sales-settlement-altering-the-investment-case";
const ctSettlement = "https://portal.ct.gov/ag/press-releases/2026-press-releases/attorney-general-tong-announces-settlements-with-sunrun-solar-and-others-to-require-consumer-relief";
const kbra = "https://www.kbra.com/publications/bdyBnzTn/kbra-assigns-ratings-to-sunrun-quintus-issuer-2026-2-llc?format=web";
const gbh = "https://www.wgbh.org/news/local/2025-04-28/solar-panel-company-accused-of-shady-business-in-massachusetts";
const bloomberg2017 = "https://news.bloomberglaw.com/securities-law/sunrun-falls-on-report-of-sec-inquiry-into-solar-cancellations-1";
const wsj2017 = "https://www.wsj.com/articles/solar-company-sunrun-was-manipulating-sales-data-say-former-managers-1495445402";
const sfBusinessTimes = "https://www.bizjournals.com/sanfrancisco/bizwomen/news/latest-news/2017/05/solar-company-manipulated-sales-data-former.html";
const q2Independent = "https://www.utilitydive.com/news/sunrun-rooftop-solar-battery-earnings/827458/";
const q2Source = "https://www.sec.gov/Archives/edgar/data/1469367/000162828026053349/exhibit991q226.htm";

export const articleConfig = {
  schemaHeadline: story.title,
  schemaDescription: story.summary,
  breadcrumbLabel: "Sunrun Q3 2026 earnings",
  imageAlt: "Sunrun Q3 2026 earnings and independent consumer contract research",
  mentions: [
    { "@type": "Organization" as const, name: "Sunrun Inc." },
    { "@type": "Organization" as const, name: "KBRA" },
  ],
  sources: [
    { name: "Sunrun official November 4 earnings schedule", url: sunrunEarningsDate, datePublished: "2026-10-07" },
    { name: "Zacks Q3 2026 earnings consensus, October 28", url: zacksForecast, datePublished: "2026-10-28" },
    { name: "MarketBeat Q3 earnings estimates and prior-quarter comparison", url: marketbeatForecast },
    { name: "TipRanks analyst ratings and October 2026 target changes", url: tipranksTargets },
    { name: "MarketBeat analyst target-change history", url: marketbeatTargets },
    { name: "Simply Wall St on Connecticut settlement and Sunrun investment case", url: simplyWallSt, datePublished: "2026-10-30" },
    { name: "Connecticut Attorney General October 23 Sunrun settlement announcement", url: ctSettlement, publisher: "Connecticut Office of the Attorney General", datePublished: "2026-10-23" },
    { name: "KBRA August 26 ratings for Sunrun Quintus Issuer 2026-2", url: kbra, datePublished: "2026-08-26" },
    { name: "GBH investigation of Massachusetts Sunrun lawsuits and complaints", url: gbh, datePublished: "2025-04-28" },
    { name: "Bloomberg 2017 report of SEC cancellation-disclosure inquiry and stock reaction", url: bloomberg2017, datePublished: "2017-05-03" },
    { name: "Wall Street Journal original interviews with former Sunrun managers", url: wsj2017, datePublished: "2017-05-22" },
    { name: "San Francisco Business Times follow-up with company response", url: sfBusinessTimes, datePublished: "2017-05-24" },
    { name: "Utility Dive's independent August 2026 earnings and sales-channel reporting", url: q2Independent, datePublished: "2026-08-10" },
    { name: "Sunrun second-quarter earnings results, filed with SEC", url: q2Source, datePublished: "2026-08-05" },
  ],
};

export function SunrunQ3EarningsBody() {
  return <>
    <nav className="case-question-links" aria-label="Breadcrumb"><Link href="/">Home</Link><Link href="/research">Research</Link><Link href="/companies/sunrun">Sunrun</Link><span aria-current="page">Q3 2026 earnings</span></nav>
    <p className="page-updated">By <Link href="/authors/jules-young">Jules Young</Link></p>
    <section className="info-section">
      <p><strong>TL;DR:</strong> Sunrun reports Q3 earnings November 4 as major Wall Street firms cut their price targets. <a href={ctSettlement} target="_blank" rel="noreferrer">Connecticut has ordered a review of covered consumer-fraud claims</a> that could lead to contract cancellations and restitution with no stated cap. <a href={kbra} target="_blank" rel="noreferrer">KBRA documented 37,595 Sunrun solar leases and PPAs backing a rated securities transaction</a>. Investors have a direct question for the earnings call: how do disputed and canceled customer agreements affect the numbers Sunrun reports and the contracts used in its financing?</p>
    </section>

    <section className="info-section">
      <p>Sunrun reports third-quarter 2026 earnings on <strong>Wednesday, November 4, after the market closes</strong>. Its earnings call is scheduled for <strong>4:30 p.m. Eastern</strong>. Wall Street will scrutinize revenue, customer additions and cash generation. It should also scrutinize the customer agreements behind those numbers, including what happens when contracts are disputed or canceled.</p>
      <p>On October 23, Connecticut announced a settlement requiring Sunrun to investigate covered allegations of fraudulent sales and provide responses within 60 days. Remedies can include credits, cash payments, contract cancellation and equipment removal. Restitution has no set cap. In August, an independent credit-rating agency described a Sunrun securities transaction backed by tens of thousands of solar leases and power purchase agreements. That puts a financial question squarely before the market: <strong>how does Sunrun verify and account for the agreements on which its long-term forecasts depend?</strong></p>
    </section>

    <section id="estimates" className="info-section">
      <h2>Sunrun Q3 2026 earnings: the numbers analysts expect</h2>
      <p><a href={zacksForecast} target="_blank" rel="noreferrer">Zacks Equity Research, October 28</a>, reported a consensus forecast of <strong>$0.26 in earnings per share and $804.1 million in revenue</strong> for the September quarter. That revenue forecast would be about 11% higher than a year earlier. Zacks said its EPS consensus had risen 49.86% over the preceding 30 days.</p>
      <p>A different provider, <a href={marketbeatForecast} target="_blank" rel="noreferrer">MarketBeat</a>, displayed approximately <strong>$0.20 per share and $757.53 million in revenue</strong>. The two providers use different earnings estimates. Both figures are pre-earnings forecasts.</p>
      <p>The comparisons matter because Sunrun's second-quarter performance did not erase operational pressure. Its August results recorded <strong>19,793 subscriber additions, down 31% year over year</strong>, while the company reduced its full-year 2026 cash-generation guidance to <strong>$200 million–$375 million</strong>, excluding specified equipment investments. <a href={q2Independent} target="_blank" rel="noreferrer">Utility Dive reported</a> on the shift from outside affiliate sales to a larger direct-sales operation, including the disruption associated with Freedom Forever's bankruptcy. <a href={q2Source} target="_blank" rel="noreferrer">The figures appear in the underlying quarterly results</a>.</p>
    </section>

    <section id="analysts" className="info-section">
      <h2>Wall Street has been cutting Sunrun price targets</h2>
      <p>Several investment banks reduced their Sunrun targets in October, even while many maintained Buy or equivalent ratings. The independently compiled <a href={tipranksTargets} target="_blank" rel="noreferrer">TipRanks forecast history</a> and <a href={marketbeatTargets} target="_blank" rel="noreferrer">MarketBeat analyst records</a> show these changes:</p>
      <ul>
        <li><strong>Morgan Stanley:</strong> $15 to $10, October 14.</li>
        <li><strong>JPMorgan:</strong> $14 to $12, October 19.</li>
        <li><strong>BMO Capital Markets:</strong> $10.50 to $7.75, reported October 20.</li>
        <li><strong>Goldman Sachs:</strong> $13 to $11, October 8.</li>
        <li><strong>Mizuho:</strong> $18 to $15, reported October 29.</li>
      </ul>
      <p>Most of those target cuts came before Connecticut announced its October 23 settlement. Investors now have the settlement's potential contract cancellations and restitution obligations to consider alongside an already pressured outlook.</p>
      <p>On October 30, <a href={simplyWallSt} target="_blank" rel="noreferrer">Simply Wall St explicitly put the settlement into its Sunrun investment analysis</a>, discussing potential cancellations, consumer relief and the future cost of sales compliance. Consumer enforcement has entered the investor-facing discussion ahead of earnings.</p>
    </section>

    <section id="settlement" className="info-section">
      <h2>Connecticut can force the question earnings headlines miss</h2>
      <p>The <a href={ctSettlement} target="_blank" rel="noreferrer">Connecticut Attorney General's October 23 announcement</a> describes a settlement arising from alleged deceptive sales practices involving Sunrun and other defendants. Sunrun agreed to pay <strong>$300,000 to the state</strong> and investigate covered fraud complaints. If a qualifying claim is substantiated, relief may include contract cancellation or removal of the system. A customer who says they never received a contract can cancel when Sunrun cannot prove delivery under the settlement's terms. Sunrun must fund an independent arbitrator in the event of a dispute.</p>
      <p>There is no stated ceiling on restitution under the agreement. The number of claims reviewed, contracts canceled and systems removed will determine the scale of the response. Those are figures investors should demand.</p>
      <p>For investors, this creates questions with measurable answers: How many accounts enter review? How many result in credits, cancellations or removals? Where do those outcomes appear in the company's customer metrics, revenue assumptions and financing arrangements?</p>
    </section>

    <section id="bonds" className="info-section">
      <h2>The Wall Street connection is documented by a credit-rating agency</h2>
      <p><a href={kbra} target="_blank" rel="noreferrer">KBRA's August 26, 2026 rating announcement</a> describes Sunrun Quintus Issuer 2026-2, an asset-backed securities transaction collateralized by <strong>37,595 residential solar leases and power purchase agreements</strong>. KBRA reported an aggregate discounted solar asset balance of approximately <strong>$359.7 million</strong> using a 7.5% discount rate. Roughly 90% of that discounted balance came from PPAs with monthly payments, 4.8% from leases and 5.2% from hedged solar renewable energy certificates.</p>
      <p>In plain language, investors are buying securities whose financial performance depends in part on expected payments from household solar agreements over many years. Customer contracts are therefore more than sales paperwork. They underpin forecast cash flows and capital-market transactions.</p>
      <p>The public rating materials make the investor exposure tangible. <strong>What checks identify disputed, canceled or unenforceable customer agreements before and after they enter financed portfolios?</strong> Which parties review those records, and how are problems reflected in collections and asset valuations?</p>
    </section>

    <section id="history" className="info-section">
      <h2>Sunrun has faced the customer-cancellation question before</h2>
      <p>This is not the first time Sunrun customer-contract reporting has reached investors. In May 2017, <a href={bloomberg2017} target="_blank" rel="noreferrer">Bloomberg reported that Sunrun shares fell sharply</a> after a Wall Street Journal report of an SEC inquiry into disclosure of canceled solar contracts. Later that month, <a href={wsj2017} target="_blank" rel="noreferrer">The Wall Street Journal interviewed former Sunrun managers</a> who alleged that cancellations had been delayed in internal reporting around the company's 2015 IPO. The <a href={sfBusinessTimes} target="_blank" rel="noreferrer">San Francisco Business Times</a> followed the reporting and published the company's response.</p>
      <p>A separate independent investigation gives the customer side of the record. <a href={gbh} target="_blank" rel="noreferrer">GBH News, reporting in April 2025 with Boston University researchers, counted more than 420 Massachusetts lawsuits filed by Sunrun against customers since 2023</a> and at least two dozen homeowner suits. GBH also reported approximately 170 complaints to the Massachusetts Attorney General over the period examined. The volume of filings documents how frequently Sunrun customer agreements have reached courts and regulators in one state.</p>
      <p>Put together, the historical reporting and current settlement establish why the quality of the underlying agreement deserves attention in earnings coverage. Sunrun's customer relationships are presented as durable economic assets. Courts, regulators and homeowners have repeatedly tested individual agreements and the sales practices used to obtain them.</p>
    </section>

    <section id="questions" className="info-section">
      <h2>Five questions for Sunrun's November 4 earnings call</h2>
      <ol>
        <li><strong>Complaint exposure:</strong> How many contracts are subject to the Connecticut review, and has the company estimated the possible remedies or costs?</li>
        <li><strong>Contract accounting:</strong> How are substantiated cancellations reflected in subscriber counts, contracted-value metrics and revenue forecasts?</li>
        <li><strong>Financing:</strong> What happens when a disputed or canceled agreement is part of a financed asset pool, and what replacement or repurchase provisions apply?</li>
        <li><strong>Sales oversight:</strong> What measurable results have followed the shift from affiliate-originated sales to Sunrun's direct-sales model?</li>
        <li><strong>Operating performance:</strong> Can subscriber growth, unit economics and cash generation improve against the reduced full-year outlook?</li>
      </ol>
      <p>Those answers would let investors follow the money from a customer's agreement to the future payments that support Sunrun's financing.</p>
    </section>

    <section id="faq" className="info-section">
      <h2>Sunrun Q3 2026 earnings: quick answers</h2>
      <h3>When does Sunrun report Q3 2026 earnings?</h3>
      <p>Wednesday, November 4, 2026, after the U.S. market close. The conference call is scheduled for 4:30 p.m. ET. <a href={sunrunEarningsDate} target="_blank" rel="noreferrer">See the official schedule</a>.</p>
      <h3>What are analysts expecting from Sunrun?</h3>
      <p>As of October 28, Zacks reported $0.26 EPS and $804.1 million in revenue; MarketBeat displayed a different estimate of about $0.20 EPS and $757.53 million revenue. These figures may change before publication of actual results.</p>
      <h3>Does the Connecticut settlement affect Sunrun shareholders?</h3>
      <p>It creates financial and operational obligations for Sunrun, including investigations and potential relief with no stated restitution cap. Investors should look for the number of claims reviewed and the costs of cancellations, credits and system removals.</p>
      <h3>Are Sunrun solar contracts used to back securities?</h3>
      <p>Yes. KBRA documented a 2026 transaction backed by 37,595 residential solar leases and PPAs. That independently confirms a direct financial link between long-term customer payments and asset-backed securities.</p>
    </section>

    <section id="sources" className="info-section">
      <h2>Original documents and independent reporting</h2>
      <p><strong>Earnings and analysts:</strong> <a href={zacksForecast} target="_blank" rel="noreferrer">Zacks earnings forecast</a>; <a href={marketbeatForecast} target="_blank" rel="noreferrer">MarketBeat Q3 estimates</a>; <a href={tipranksTargets} target="_blank" rel="noreferrer">TipRanks analyst target history</a>; <a href={sunrunEarningsDate} target="_blank" rel="noreferrer">November 4 earnings call schedule</a>.</p>
      <p><strong>Consumer enforcement and credit:</strong> <a href={ctSettlement} target="_blank" rel="noreferrer">Connecticut Attorney General settlement</a>; <a href={kbra} target="_blank" rel="noreferrer">KBRA securitization ratings</a>; <a href={simplyWallSt} target="_blank" rel="noreferrer">Simply Wall St investor commentary</a>.</p>
      <p><strong>Independent reporting:</strong> <a href={gbh} target="_blank" rel="noreferrer">GBH Massachusetts lawsuit investigation</a>; <a href={bloomberg2017} target="_blank" rel="noreferrer">Bloomberg 2017 SEC inquiry report</a>; <a href={wsj2017} target="_blank" rel="noreferrer">Wall Street Journal former-manager interviews</a>; <a href={q2Independent} target="_blank" rel="noreferrer">Utility Dive on Sunrun's sales transition</a>.</p>
      <p>Research checked November 2, 2026. This is a pre-earnings report; Q3 results were not available at the time of writing. Estimates and analyst targets are attributed to their respective providers.</p>
    </section>

    <section className="info-section">
      <h2>More Sunrun research</h2>
      <p><Link href="/companies/sunrun">Sunrun Research Center</Link> · <Link href="/cases/connecticut-attorney-general-sunrun-lawsuit">Connecticut settlement and lawsuit</Link> · <Link href="/research/sunrun-25-year-solar-contracts">The homeowner and investor sides of 25-year solar agreements</Link> · <Link href="/research/solar-sales-financing-after-complaint">What happens to solar financing after complaints</Link></p>
    </section>
  </>;
}

export const article = defineResearchArticle({ story, config: articleConfig, Body: SunrunQ3EarningsBody });
