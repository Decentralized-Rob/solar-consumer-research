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
  lede: "Sunrun reports earnings November 4 after analyst price-target cuts and a Connecticut settlement requiring reviews of disputed customer contracts. Independent rating records show how long-term Sunrun agreements also support Wall Street financing.",
  publishedAt: "November 2, 2026",
  datePublished: "2026-11-02",
  dateModified: "2026-11-05",
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
      <p><strong>TL;DR:</strong> Sunrun reports earnings November 4 amid analyst price-target cuts and a <a href={ctSettlement} target="_blank" rel="noreferrer">Connecticut settlement</a> that could trigger contract cancellations and restitution.</p>

      <p><a href={kbra} target="_blank" rel="noreferrer">KBRA identifies 37,595 Sunrun solar contracts backing securities</a>. How does Sunrun account for disputed contracts when valuing those customer payments?</p>

      <h2>The customer contracts behind Sunrun\&rsquo;s earnings</h2>
      <p>Sunrun&rsquo;s next earnings report arrives Wednesday, November 4, 2026, after the market closes, with a conference call scheduled for 4:30 p.m. Eastern. Investors will be watching revenue, cash generation and the company&rsquo;s transition toward more direct sales. They also have a consumer-contract issue to examine. The October 23 Connecticut settlement requires Sunrun to investigate covered claims of deceptive or unauthorized sales, with remedies that can include refunds, cancellations and equipment removal. Those agreements are central to the company&rsquo;s business: Sunrun expects payments from customers over decades, and those projected payments also underpin financing transactions.</p>

      <p>The connection between consumer contracts and Wall Street&rsquo;s interests has surfaced before. Reports of an SEC inquiry into Sunrun&rsquo;s handling of canceled contracts shook the stock in 2017. The latest settlement brings that history back into focus just as analysts are revising their financial expectations for the business.</p>
    </section>

    <section id="estimates" className="info-section">
      <h2>Sunrun Q3 2026 earnings: estimates and analyst cuts</h2>
      <p><a href={zacksForecast} target="_blank" rel="noreferrer">Zacks Equity Research reported on October 28</a> that analysts expected Sunrun to earn $0.26 per share on $804.1 million in third-quarter revenue, an increase of about 11% from the prior year. Zacks said the earnings-per-share consensus had risen nearly 50% over the preceding month. <a href={marketbeatForecast} target="_blank" rel="noreferrer">MarketBeat displayed a different forecast</a> of about $0.20 per share on $757.53 million in revenue. The estimates vary by provider, but both put Wednesday&rsquo;s results in the spotlight.</p>

      <p>Price targets tell another part of the story. <a href={tipranksTargets} target="_blank" rel="noreferrer">TipRanks</a> and <a href={marketbeatTargets} target="_blank" rel="noreferrer">MarketBeat</a> report October reductions from Morgan Stanley ($15 to $10), JPMorgan ($14 to $12), Goldman Sachs ($13 to $11), BMO Capital Markets ($10.50 to $7.75) and Mizuho ($18 to $15). Most of those revisions preceded Connecticut&rsquo;s October 23 announcement. They show analysts had already been reassessing Sunrun ahead of the next results, even as some maintained positive ratings.</p>

      <p>Sunrun&rsquo;s second-quarter report helps explain the scrutiny. It recorded 19,793 new subscribers, down 31% from a year earlier, and reduced its 2026 cash-generation outlook to $200 million–$375 million, excluding specified equipment investments. <a href={q2Independent} target="_blank" rel="noreferrer">Utility Dive reported</a> that Sunrun was moving away from reliance on outside sales affiliates and expanding its direct-sales operation, with Freedom Forever&rsquo;s bankruptcy adding to the disruption. Those are measurable pressures for Wednesday&rsquo;s call. The underlying operating figures are available in the <a href={q2Source} target="_blank" rel="noreferrer">second-quarter results</a>.</p>
    </section>

    <section id="settlement" className="info-section">
      <h2>Consumer complaints become a Wall Street question</h2>
      <p>The <a href={ctSettlement} target="_blank" rel="noreferrer">Connecticut Attorney General&rsquo;s settlement</a>, announced October 23, requires Sunrun to review covered allegations of fraudulent sales and respond within 60 days. The company agreed to pay $300,000 to the state, while eligible consumers may receive credits, cash relief, contract cancellation or system removal. Restitution carries no stated cap. The agreement also addresses contract delivery and dispute resolution. Its financial consequences will depend on how many cases qualify and what remedies follow, figures investors have reason to ask about when reviewing Sunrun&rsquo;s customer metrics and future cash-flow assumptions.</p>

      <p>The issue is beginning to appear in investment coverage. On October 30, <a href={simplyWallSt} target="_blank" rel="noreferrer">Simply Wall St examined whether the Connecticut settlement changes the Sunrun investment case</a>, including possible cancellations and the cost of stronger sales compliance. The question reaches beyond the immediate $300,000 state payment. Sunrun&rsquo;s projected customer payments depend on agreements being enforceable and customers continuing to pay. If agreements are canceled or amended, investors need to know how those changes are counted, valued and reported.</p>

      <p>An independent rating-agency announcement supplies the financing connection. <a href={kbra} target="_blank" rel="noreferrer">KBRA reported on August 26</a> that Sunrun Quintus Issuer 2026-2 was backed by 37,595 residential solar leases and power purchase agreements, representing approximately $359.7 million in discounted solar asset balances. About 90% of that discounted balance came from PPAs with monthly payments. Securities investors depend on cash collections from these contracts over time. That makes customer-agreement quality a financial issue for the parties arranging, rating and buying the securities.</p>

      <p><strong>November 5 update:</strong> Sunrun&apos;s November 4 SEC filing reports $38.9 billion in contracted future revenue. SolarComplaint&apos;s <Link href="/research/sunrun-38-billion-contract-validity">new investigation</Link> examines the company&apos;s repeated statements about signed agreements alongside federal signature disputes and Connecticut&apos;s contract-cancellation requirements.</p>

      <p>The public rating announcement describes the portfolio, but it does not answer how every contested agreement is handled as it moves through financing and servicing. Investors can ask which controls identify complaints, contract cancellations and disputed payments; which parties verify the underlying records; and what happens to collateral when an agreement is unwound. Those answers could help establish how closely Sunrun&rsquo;s contract-value reporting reflects the experience of the customers making the payments.</p>
    </section>

    <section id="history" className="info-section">
      <h2>Sunrun&rsquo;s older cancellation controversy has new relevance</h2>
      <p>In 2017, <a href={bloomberg2017} target="_blank" rel="noreferrer">Bloomberg reported a sharp decline in Sunrun shares</a> following news of an SEC inquiry into the disclosure of canceled solar contracts. <a href={wsj2017} target="_blank" rel="noreferrer">The Wall Street Journal interviewed former Sunrun sales managers</a> who alleged that canceled deals had remained in internal reporting around the company&rsquo;s 2015 IPO. The <a href={sfBusinessTimes} target="_blank" rel="noreferrer">San Francisco Business Times</a> subsequently reported Sunrun&rsquo;s response. The controversy put the treatment of customer cancellations before investors years ahead of the current Connecticut settlement.</p>

      <p>The consumer record has continued to grow. In April 2025, <a href={gbh} target="_blank" rel="noreferrer">GBH News and Boston University researchers</a> identified more than 420 lawsuits filed by Sunrun against Massachusetts customers since 2023, along with at least two dozen lawsuits brought by homeowners. GBH also reported approximately 170 complaints to the state attorney general during its review period. Those figures show the scale of the conflict over Sunrun customer relationships in one state. They also offer a concrete starting point for examining whether complaint volumes and resolutions are visible in the financial accounts investors rely on.</p>

      <p>Wednesday&rsquo;s earnings release can answer some of this. Analysts can compare subscriber additions, the full-year outlook and cash generation with the prior quarter. The harder questions concern how many customer agreements require review, what Sunrun expects that process to cost, how cancellations affect contracted customer value, and whether financing partners receive updated information when disputes change the expected payments. Sunrun&rsquo;s earnings coverage should follow the customer agreement all the way from the sale to the asset-backed securities it supports.</p>
    </section>

    <section id="sources" className="info-section">
      <p><strong>Reporting sources:</strong> <a href={zacksForecast} target="_blank" rel="noreferrer">Zacks earnings forecast</a>, <a href={marketbeatForecast} target="_blank" rel="noreferrer">MarketBeat estimates</a>, <a href={ctSettlement} target="_blank" rel="noreferrer">Connecticut Attorney General</a>, <a href={kbra} target="_blank" rel="noreferrer">KBRA&rsquo;s securitization report</a>, <a href={gbh} target="_blank" rel="noreferrer">GBH&rsquo;s Massachusetts investigation</a>, <a href={wsj2017} target="_blank" rel="noreferrer">The Wall Street Journal</a> and <a href={simplyWallSt} target="_blank" rel="noreferrer">Simply Wall St</a>. Research checked November 2, 2026, ahead of Sunrun&rsquo;s Q3 results.</p>
      <p>Related coverage: <Link href="/companies/sunrun">Sunrun Research Center</Link>, <Link href="/cases/connecticut-attorney-general-sunrun-lawsuit">Connecticut&rsquo;s Sunrun case</Link> and <Link href="/research/sunrun-25-year-solar-contracts">Sunrun&rsquo;s 25-year solar agreements</Link>.</p>
    </section>
  </>;
}

export const article = defineResearchArticle({ story, config: articleConfig, Body: SunrunQ3EarningsBody });
