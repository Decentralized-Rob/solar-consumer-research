import Link from "next/link";
import { defineResearchArticle, type ResearchStory } from "../../lib/research-article";

export const story = {
  id: "sunrun-25-year-solar-contracts",
  slug: "sunrun-25-year-solar-contracts",
  href: "/research/sunrun-25-year-solar-contracts",
  title: "Sunrun’s 25-Year Solar Contract: What Are You Actually Agreeing To?",
  deck: "The monthly price is only the beginning. The agreement also sets the rules for production, repairs, a home sale and what happens when the term ends.",
  summary: "What a Sunrun lease or power purchase agreement means for your payments, production guarantee, home sale and end-of-term options.",
  seoTitle: "Sunrun’s 25-Year Solar Contract: What Are You Actually Agreeing To?",
  seoDescription: "What does a Sunrun 25-year lease or PPA actually require? Read the terms behind payments, production guarantees, selling your home and buying the system.",
  keywords: ["Sunrun 25 year contract", "Sunrun solar contract", "Sunrun lease 25 years", "Sunrun PPA", "Sunrun contract terms", "Sunrun solar lease", "Sunrun contract transfer", "Sunrun buyout", "Sunrun performance guarantee", "Sunrun Flex"],
  openGraphTitle: "Sunrun’s 25-Year Solar Contract: What Are You Actually Agreeing To?",
  socialDescription: "A Sunrun solar contract can last 25 years. Here are the terms that matter after the sales pitch is over.",
  twitterDescription: "What a Sunrun 25-year lease or PPA actually says about payments, production and your home.",
  lede: "A Sunrun solar contract can last 25 years. The monthly payment gets most of the attention during a sale. The agreement also decides what Sunrun owes you if the system underproduces, what happens if you move and whether you can buy the equipment later.",
  displayTitle: "Sunrun’s 25-Year Solar Contract: What Are You Actually Agreeing To?",
  publishedAt: "September 7, 2026", datePublished: "2026-09-07", dateModified: "2026-11-05",
  stateCodes: [], companies: ["Sunrun"],
  topics: ["Sunrun contracts", "solar leases", "power purchase agreements", "contract transfers"],
  section: "Research", featured: true,
} satisfies ResearchStory;

const sec10k = "https://www.sec.gov/Archives/edgar/data/1469367/000162828026012289/run-20251231.htm";
const leidosReview = "https://www.sec.gov/Archives/edgar/data/1469367/000119312526318237/d129330dex991.htm";
const sunrunFaq = "https://www.sunrun.com/go-solar-center/solar-faq";

export const articleConfig = {
  twitterTitle: story.seoTitle,
  schemaHeadline: story.seoTitle,
  schemaDescription: story.summary,
  breadcrumbLabel: "Sunrun 25-Year Solar Contracts",
  imageAlt: "Sunrun 25-year solar contract research",
  sources: [
    { name: "Sunrun 2025 Form 10-K", url: sec10k },
    { name: "Leidos Sunrun fleet review, July 2026 addendum", url: leidosReview },
    { name: "Sunrun solar FAQ", url: sunrunFaq },
  ],
};

export function SunrunContractsBody() {
  return <>
    <nav className="case-question-links" aria-label="Breadcrumb"><Link href="/">Home</Link><Link href="/research">Research</Link><Link href="/companies/sunrun">Sunrun</Link><span aria-current="page">25-year contracts</span></nav>

    <p><strong>TL;DR:</strong> A Sunrun lease or power purchase agreement usually lasts 20 or 25 years. You pay for solar service while Sunrun owns and maintains the system. Your price may rise each year, and the production guarantee may be lower than you expect. Selling the house or buying the equipment can bring another set of terms into play. The signed agreement, including any changes, is where your actual numbers and options are spelled out.</p>

    <section className="info-section">
      <h2>What are you paying for?</h2>
      <p>Sunrun calls its leases and power purchase agreements <a href={sec10k} target="_blank" rel="noreferrer">Customer Agreements</a>. In its 2025 annual filing, the company says these arrangements typically run for 20 or 25 years. Sunrun generally owns the system and says it monitors, maintains and insures it during that term. You get to use the electricity and make the payments set by the agreement.</p>
      <p>The price on day one may not be the price in year ten. Sunrun says rates can stay fixed or rise by a set percentage each year. A prepaid deal changes the monthly bill, and a Flex agreement can include a minimum payment plus charges tied to electricity use. Check the actual payment schedule and billing formula. A quoted monthly amount alone does not tell you the total cost.</p>
    </section>

    <section className="info-section">
      <h2>What if the panels produce less than promised?</h2>
      <p>A <a href={leidosReview} target="_blank" rel="noreferrer">Leidos review filed with the SEC</a> examined examples of Sunrun agreements and found production guarantees of 90%, 85% or 0% in newer contracts. Most of the agreements supplied for review compared actual production with guaranteed production every two years, with a refund if the system fell short. The examples varied by product and location.</p>
      <p>A 0% guarantee does not mean the system is expected to produce nothing. It means that provision sets no minimum production threshold that would trigger a shortfall refund. Look for the percentage, the measurement period and the refund rate in your own agreement. If you have a battery, read its backup terms separately: the agreements Leidos reviewed did not promise uninterrupted backup during every outage.</p>
    </section>

    <section className="info-section">
      <h2>If you sell the house</h2>
      <p>The solar agreement does not simply disappear at closing. Sunrun says a seller can purchase the system or transfer the agreement to a buyer who meets its credit requirements and accepts the terms. The seller may also prepay some or all of the remaining payments to lower the buyer&rsquo;s bill. Sunrun&rsquo;s <a href={sec10k} target="_blank" rel="noreferrer">annual filing</a> says it may look to the original customer for remaining payments if the system is neither purchased nor the agreement assigned.</p>
      <p>That makes the transfer clause worth reading long before you list the house. Ask what the buyer must accept, what a prepayment would cost and how a purchase price is calculated. Those are different routes with different costs.</p>
    </section>

    <section className="info-section">
      <h2>Can you buy the system or end the agreement?</h2>
      <p>Sunrun&rsquo;s <a href={sunrunFaq} target="_blank" rel="noreferrer">current FAQ</a> says a lease customer reaching the end of the term can buy the system at its then fair market value, renew annually or have Sunrun remove it. The FAQ says there is no automatic default, while Sunrun&rsquo;s <a href={sec10k} target="_blank" rel="noreferrer">annual filing</a> describes agreements that typically renew automatically. Check the renewal language in your signed version. Buying during the original term is a separate matter: Sunrun says purchases after installation are available at specific times defined in the agreement.</p>
      <p>If you already have a system, get the final signed agreement and any amendments. Sunrun says copies are available in its app or online account under Contracts &amp; Docs. Compare those documents with what you were told about price increases, production, repairs, a future sale and removal. Those terms will matter for years after the installation crew leaves.</p>
    </section>

    <p>Sunrun also reports the expected value of these long-term agreements to investors. <Link href="/research/sunrun-customer-contract-value">Read the separate article on how Sunrun values customer contracts.</Link></p>

    <section className="info-section"><h2>Sources</h2><p><a href={sec10k} target="_blank" rel="noreferrer">Sunrun 2025 Form 10-K</a>; <a href={leidosReview} target="_blank" rel="noreferrer">SEC-filed Leidos review</a>; <a href={sunrunFaq} target="_blank" rel="noreferrer">Sunrun solar FAQ</a>.</p></section>
  </>;
}

export const article = defineResearchArticle({ story, config: articleConfig, Body: SunrunContractsBody });
