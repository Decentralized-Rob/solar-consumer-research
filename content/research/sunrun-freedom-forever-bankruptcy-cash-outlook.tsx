import Link from "next/link";
import { defineResearchArticle, type ResearchStory } from "../../lib/research-article";

export const story = {
  id: "sunrun-freedom-forever-bankruptcy-cash-outlook",
  slug: "sunrun-freedom-forever-bankruptcy-cash-outlook",
  href: "/research/sunrun-freedom-forever-bankruptcy-cash-outlook",
  title: "Sunrun Called Its Freedom Forever Sales Exposure ‘Quite Small.’ Then It Cut Its Cash Outlook",
  deck: "GLJ Research warned that Freedom Forever’s bankruptcy would hurt Sunrun’s sales. By August, Sunrun counted the bankruptcy among the reasons its outside sales channel had shrunk by more than 70% from a year earlier.",
  summary: "Gordon Johnson of GLJ Research linked the Freedom Forever bankruptcy and Texas solar investigation to his Sunrun bear case. Sunrun later cited the bankruptcy as a factor in falling affiliate volume.",
  seoTitle: "Sunrun Cut Its Cash Outlook After Freedom Forever’s Bankruptcy",
  seoDescription: "GLJ warned Freedom Forever’s bankruptcy would hurt Sunrun’s sales. Sunrun later cited it as affiliate volume fell. Here’s what the earnings calls show.",
  openGraphTitle: "Sunrun, Freedom Forever and the Cash Outlook GLJ Warned About",
  socialDescription: "Sunrun called its remaining Freedom Forever sales exposure small in May. By August, it cited the bankruptcy as one reason affiliate volume fell more than 70%.",
  stateCodes: ["CT", "TX"],
  companies: ["Sunrun", "Freedom Forever"],
  topics: ["Freedom Forever bankruptcy", "Sunrun earnings", "GLJ Research", "Texas solar investigation", "Connecticut Sunrun settlement"],
  publishedAt: "November 15, 2026",
  datePublished: "2026-11-15",
  dateModified: "2026-11-15",
  author: "Solar Consumer Research",
  section: "Research",
} satisfies ResearchStory;

const glj = "https://glj-research.com/2026/04/16/sunrun-run-freedom-forever-bankruptcy-validates-glj-solar-resi-bear-thesis-affiliate-channel-collapse-exposes-structural-vulnerabilities/";
const fly = "https://www.tipranks.com/news/the-fly/glj-says-freedom-forever-bankruptcy-eliminates-distribution-channel-for-sunrun-thefly-news";
const texas = "https://www.texasattorneygeneral.gov/news/releases/attorney-general-ken-paxton-launches-major-initiative-combat-widespread-fraud-companies-selling";
const cbs = "https://www.cbsnews.com/texas/news/texas-investigation-rooftop-solar-industry-cbs-news-texas/";
const mayCall = "https://d1io3yog0oux5.cloudfront.net/_ac1d664da78801417cdf8c888e3b3c45/sunrun/db/418/4125/webcast_transcript/Sunrun-1Q2026-Transcript.pdf#page=7";
const augustCall = "https://d1io3yog0oux5.cloudfront.net/_a2fba73bde7c1a73509047e28e0afd09/sunrun/db/418/4137/webcast_transcript/Sunrun-2Q2026-Transcript.pdf#page=5";
const augustResults = "https://www.sec.gov/Archives/edgar/data/1469367/000162828026053349/exhibit991q226.htm";
const novemberResults = "https://www.sec.gov/Archives/edgar/data/1469367/000162828026070143/exhibit991q326.htm";
const quarterlyFiling = "https://investors.sunrun.com/filings-financials/sec-filings/content/0001628280-26-070158/run-20260930.htm";
const connecticut = "https://portal.ct.gov/ag/press-releases/2026-press-releases/attorney-general-tong-announces-settlements-with-sunrun-solar-and-others-to-require-consumer-relief";
const citi = "https://www.reportgem.com/en/research/real-time/937612.html";
const analystRatings = "https://www.tipranks.com/stocks/run/forecast";
const quintus = "https://www.kbra.com/publications/bdyBnzTn/kbra-assigns-ratings-to-sunrun-quintus-issuer-2026-2-llc?format=web";

const articleConfig = {
  breadcrumbLabel: "Sunrun and Freedom Forever",
  imageAlt: "Solar Consumer Research",
  mentions: [
    { "@type": "Organization" as const, name: "GLJ Research" },
    { "@type": "Organization" as const, name: "Sunrun Inc." },
    { "@type": "Organization" as const, name: "Freedom Forever LLC" },
  ],
  sources: [
    { name: "GLJ Research’s Freedom Forever bankruptcy note", url: glj, datePublished: "2026-04-16" },
    { name: "The Fly’s account of Gordon Johnson’s note", url: fly, publisher: "The Fly" },
    { name: "Texas attorney general’s residential solar investigation announcement", url: texas, datePublished: "2026-04-03" },
    { name: "CBS News Texas reporting on the investigation and Sunrun’s response", url: cbs },
    { name: "Sunrun Q1 earnings call, page 7", url: mayCall, datePublished: "2026-05-06" },
    { name: "Sunrun Q2 earnings call, page 5", url: augustCall, datePublished: "2026-08-05" },
    { name: "Sunrun Q2 earnings release filed with the SEC", url: augustResults, datePublished: "2026-08-05" },
    { name: "Sunrun Q3 earnings release filed with the SEC", url: novemberResults, datePublished: "2026-11-04" },
    { name: "Public excerpt of Citi’s post-earnings note", url: citi, datePublished: "2026-11-05" },
    { name: "Connecticut attorney general’s Sunrun settlement announcement", url: connecticut, datePublished: "2026-10-23" },
    { name: "Sunrun Q3 Form 10-Q", url: quarterlyFiling, datePublished: "2026-11-04" },
    { name: "KBRA rating announcement for Quintus 2026-2", url: quintus },
  ],
};

function SunrunFreedomForeverBody() {
  return <>
    <nav className="case-question-links" aria-label="Breadcrumb">
      <Link href="/">Home</Link><Link href="/research">Research</Link><Link href="/companies/sunrun">Sunrun</Link><span aria-current="page">Freedom Forever and Sunrun</span>
    </nav>
    <p className="page-updated">By <Link href="/about">Solar Consumer Research</Link></p>

    <section className="info-section">
      <p>Gordon Johnson was already telling investors to sell Sunrun when Freedom Forever filed for bankruptcy on April 15. The GLJ Research analyst said Sunrun was losing a “significant distribution channel.” He called the bankruptcy and a Texas consumer-protection investigation involving both companies “critical real-time validation of our bear thesis on Sunrun.” GLJ’s price target was $4.63. <a href={glj}>GLJ’s April 16 note</a> · <a href={fly}>Quotes reported by The Fly</a></p>

      <p>Texas had announced its investigation 12 days before the bankruptcy filing. The attorney general demanded records from Sunrun, Freedom Forever and other solar companies about how they measured customers’ electricity savings and what they told homeowners about contracts, warranties and service. Sunrun told CBS News Texas it would cooperate and said four of the complaints referenced by the state concerned Sunrun over the preceding two years. The company said it had resolved all four. GLJ’s public excerpt gives no separate dollar estimate for the Texas investigation. <a href={texas}>Texas AG announcement</a> · <a href={cbs}>Sunrun’s response to CBS News Texas</a> · <Link href="/cases/freedom-forever">Freedom Forever bankruptcy records</Link></p>
    </section>

    <section className="info-section">
      <h2>Sunrun counted the bankruptcy among the reasons sales fell</h2>
      <p>On May 6, Roth Capital analyst Philip Shen asked what exposure Sunrun still had to Freedom Forever. President Paul Dickson said business with the installer had been falling for three years and described the remaining pace of new sales as “quite small.” <a href={mayCall}>Sunrun’s May earnings call, page 7</a></p>

      <p>In August, CFO Danny Abajian said volume through outside sales partners had fallen more than 70% from a year earlier. He cited Sunrun’s own decision to scale back those partnerships and trouble among dealers. “This includes the impact of the bankruptcy of our partner, Freedom Forever,” he said. Sunrun gave no breakdown of how much of the decline came from that one partner. <a href={augustCall}>Sunrun’s August earnings call, page 5</a></p>

      <p>Sunrun lowered its 2026 Cash Generation forecast in August from $250 million–$450 million to $200 million–$375 million. Management cited weaker volume from outside partners, a slower ramp in its own sales operation and higher capital costs. In November, it put the figure at about $200 million, the bottom of August’s range. Cash Generation is a company-defined measure. All three forecasts exclude equipment investments tied to preserving tax-credit eligibility. <a href={augustResults}>August earnings release</a> · <a href={novemberResults}>November earnings release</a></p>

      <p>Citi kept its Buy rating after the November results. Its public research excerpt put Sunrun’s revised forecast $25 million below Citi’s earlier estimate and discussed sales volumes and capital costs. The excerpt gives no estimate for costs tied to consumer-protection cases. <a href={citi}>Citi’s note excerpt</a> · <a href={analystRatings}>Analyst ratings</a> · <Link href="/research/sunrun-q3-2026-earnings">Sunrun’s full Q3 results and Wall Street estimates</Link></p>
    </section>

    <section className="info-section">
      <h2>Connecticut’s settlement can change contracts Sunrun already sold</h2>
      <p>Connecticut’s October agreement requires Sunrun to pay the state $300,000 and respond to covered fraud complaints within 60 days. Where Sunrun substantiates fraud, relief can include a refund, a lower bill or contract cancellation. The attorney general says restitution has no cap. In Texas, two homeowners told CBS News that Sunrun separately agreed to cancel their contract and pay them $15,000. <a href={connecticut}>Connecticut AG announcement</a> · <a href={cbs}>CBS News Texas account of the homeowner settlement</a></p>

      <p>Sunrun’s November filing gives no Connecticut-specific estimate. The records reviewed here give no estimate of what Sunrun will spend on claims or how much billing could end if contracts are canceled. Customer payments matter to investors because existing agreements back some Sunrun financing deals. KBRA identified 37,595 agreements behind one 2026 deal. The public deal summary does not identify which contracts, if any, are covered by the Connecticut settlement. <a href={quarterlyFiling}>Sunrun’s November 10-Q, litigation note</a> · <a href={quintus}>KBRA’s Quintus 2026-2 rating announcement</a></p>

      <h2>Disputing a Sunrun contract?</h2>
      <p>Save your contract, any cancellation notice and the bills that came after it. <Link href="/cases/connecticut-attorney-general-sunrun-lawsuit">Check which sales are covered and what relief Connecticut secured</Link>, or <Link href="/research/sunrun-complaints-what-to-check">find where to file a Sunrun complaint in your state</Link>.</p>
    </section>
  </>;
}

export const article = defineResearchArticle({ story, config: articleConfig, Body: SunrunFreedomForeverBody });
