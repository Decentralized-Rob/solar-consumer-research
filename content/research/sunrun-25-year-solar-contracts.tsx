import Link from "next/link";
import { defineResearchArticle, type ResearchStory } from "../../lib/research-article";


export const story = {
  id: "sunrun-25-year-solar-contracts",
  slug: "sunrun-25-year-solar-contracts",
  href: "/research/sunrun-25-year-solar-contracts",
  title: "A 25-Year Sunrun Contract Can Have a 0% Production Guarantee",
  deck: "An SEC-filed review found the 0% term in newer Sunrun agreements. The same deal can govern years of payments, a home sale and what happens to the panels at the end.",
  summary: "Sunrun lease and PPA terms for homeowners: production guarantees, payments, home-sale transfers and buyout options.",
  seoTitle: "Sunrun 25-Year Contracts Can Have a 0% Production Guarantee",
  seoDescription: "An SEC-filed review found newer Sunrun agreements with 0% production guarantees. See what a 25-year lease or PPA says about payments, transfers and buyouts.",
  keywords: ["Sunrun 25 year contract", "Sunrun solar contract", "Sunrun lease 25 years", "Sunrun PPA", "Sunrun contract terms", "Sunrun solar lease", "Sunrun contract transfer", "Sunrun buyout", "Sunrun performance guarantee", "Sunrun Flex"],
  openGraphTitle: "A 25-Year Sunrun Contract Can Have a 0% Production Guarantee",
  socialDescription: "An SEC-filed review found a 0% guarantee in newer Sunrun agreement examples. What does your 25-year contract promise?",
  twitterDescription: "An SEC-filed review found Sunrun agreement examples with 0% production guarantees.",
  lede: "A 2026 SEC-filed review found newer Sunrun agreement examples with a 0% production guarantee. A lease or PPA can run for 25 years. Before focusing on the monthly price, find out what the contract promises about production, service, selling the home and the end of the term.",
  displayTitle: "A 25-Year Sunrun Contract Can Have a 0% Production Guarantee",
  publishedAt: "September 7, 2026", datePublished: "2026-09-07", dateModified: "2026-11-05",
  stateCodes: [], companies: ["Sunrun"],
  topics: ["Sunrun contracts", "solar leases", "power purchase agreements", "contract transfers"],
  section: "Research", featured: true,
} satisfies ResearchStory;

const sec10k = "https://www.sec.gov/Archives/edgar/data/1469367/000162828026012289/run-20251231.htm";
const julyFleetReview = "https://www.sec.gov/Archives/edgar/data/1469367/000119312526318237/d129330dex991.htm";
const ctSettlement = "https://portal.ct.gov/ag/press-releases/2026-press-releases/attorney-general-tong-announces-settlements-with-sunrun-solar-and-others-to-require-consumer-relief";
const sunrunFaq = "https://www.sunrun.com/go-solar-center/solar-faq";
const sunrunTransfer = "https://www.sunrun.com/go-solar-center/solar-terms/definition/service-transfer";
const ftcSolar = "https://consumer.ftc.gov/articles/solar-power-your-home";

export const articleConfig = {
  twitterTitle: story.seoTitle,
  schemaHeadline: story.seoTitle,
  schemaDescription: "Sunrun lease and PPA terms for selling a home, transferring the agreement, buying out the system and checking production guarantees.",
  breadcrumbLabel: "Sunrun 25-Year Solar Contracts",
  imageAlt: "Sunrun 25-year solar contract research",
  sources: [
    { name: "Sunrun 2025 Form 10-K", url: sec10k },
    { name: "Leidos Sunrun fleet review, July 2026 addendum", url: julyFleetReview },
    { name: "Connecticut Attorney General settlement", url: ctSettlement },
    { name: "Sunrun FAQ", url: sunrunFaq },
    { name: "Sunrun service transfer", url: sunrunTransfer },
    { name: "FTC solar guidance", url: ftcSolar },
  ],
};

export function SunrunContractsBody() {
  return <>
    <nav className="case-question-links" aria-label="Breadcrumb"><Link href="/">Home</Link><Link href="/research">Research</Link><Link href="/companies/sunrun">Sunrun</Link><span aria-current="page">25-year contracts</span></nav>
      <nav className="case-question-links" aria-label="Article navigation"><a href="#homeowner">For homeowners</a><a href="#guarantee">Production guarantee</a><a href="#term">Contract length</a><a href="#transfer">Selling the home</a><a href="#end">End of term</a><a href="#questions">Contract checklist</a><a href="#sources">Sources</a></nav>

      <section id="homeowner" className="info-section case-notice">
        <h2>TL;DR</h2>
        <p>An SEC-filed engineering review found newer Sunrun agreement examples with production guarantees of 90%, 85% or 0%. The percentage and refund formula in your signed contract tell you what protection you have.</p>
        <p>Sunrun leases and PPAs typically start with 20- or 25-year terms. Payments can rise; selling the house can mean a transfer, prepayment or purchase. At the end of a lease, purchase, renewal and removal are separate choices.</p>
      </section>

      <section id="guarantee" className="info-section"><h2>Does a Sunrun lease or PPA guarantee solar production?</h2><p>The Leidos review says newer agreements it examined had guarantee percentages of 90%, 85% or 0%. Most agreements supplied for review compared guaranteed output with actual output every two years and provided a refund when the guarantee was missed. At 0%, that provision promises no minimum output. Find the percentage and refund formula in your own signed agreement.</p><p>The review also says the battery agreements it examined did not promise uninterrupted backup capacity during every outage. Read solar production and battery backup terms separately.</p><p><a href={julyFleetReview} target="_blank" rel="noreferrer">SEC-filed review of agreement terms ↗</a></p></section>

      <section id="new" className="info-section"><p className="eyebrow">What the records show</p><h2>Several kinds of 25-year agreement</h2><p>A Leidos engineering review filed with the SEC says Sunrun began offering SHIFT, Flex and Storage Add-on agreements in 2024. The agreement types it reviewed typically ran 25 years from the in-service date; the storage-only lease example ran 10 years. Leidos reviewed examples supplied by Sunrun and said terms vary by location and system.</p><p><a href={julyFleetReview} target="_blank" rel="noreferrer">Read the SEC-filed Leidos review ↗</a></p></section>

      <section id="term" className="info-section"><h2>How long is a Sunrun solar contract?</h2><p>Sunrun’s 2025 Form 10-K describes Customer Agreements as typically having initial terms of 20 or 25 years. These agreements cover systems Sunrun says it monitors, maintains and insures during the contract term.</p><p>The payment structure depends on the agreement. Sunrun’s filings say rates may be fixed for the contract term or increase at a predetermined annual percentage. Flex agreements can work differently: Sunrun’s financial disclosures distinguish between a minimum contracted payment and additional billings tied to electricity consumption.</p><p><a href={sec10k} target="_blank" rel="noreferrer">Sunrun 2025 Form 10-K at the SEC ↗</a></p></section>

      <section id="transfer" className="info-section"><h2>What happens to a Sunrun contract when you sell your house?</h2><p>Sunrun’s Form 10-K says a customer selling a home may purchase the system or assign the Customer Agreement to the buyer, provided the buyer meets applicable credit requirements and accepts the agreement. The filing also says a seller may prepay some or all remaining payments to reduce or eliminate the rate paid by the buyer.</p><p>Sunrun’s updated 2026 service-transfer page describes the same basic process from the consumer side: the solar agreement or service plan moves from one homeowner to another during a sale. The exact rights, requirements and purchase options still come from the homeowner’s actual agreement.</p><p><a href={sunrunTransfer} target="_blank" rel="noreferrer">Sunrun’s 2026 service-transfer explanation ↗</a></p></section>

      <section id="end" className="info-section"><h2>What happens at the end of a Sunrun lease?</h2><p>Sunrun’s current FAQ says a lease customer reaching the end of the agreement has three options: purchase the system at its then fair-market value, renew the lease annually or have Sunrun remove the system. Sunrun says there is no automatic default among those choices.</p><p>That end-of-term choice is different from an early buyout or purchase during the initial contract term. For those questions, the individual agreement controls the timing and pricing provisions.</p><p><a href={sunrunFaq} target="_blank" rel="noreferrer">Sunrun’s current agreement FAQ ↗</a></p></section>

      <section id="questions" className="info-section"><h2>What to check in your Sunrun agreement</h2><p>Find the initial term; starting monthly or per-kWh price; annual escalator or Flex billing formula; production-guarantee percentage and refund formula; equipment ownership; maintenance and service terms; roof removal and reinstallation terms; home-sale transfer requirements; purchase or early-termination provisions; renewal language; and end-of-term options.</p><p>Keep the final signed agreement with the proposal and any later amendments. Sunrun says customers can retrieve agreements through its app or online account under Contracts &amp; Docs.</p><p>Connecticut’s October 2026 settlement gives covered customers a cancellation route when they say they never received their contract and Sunrun cannot prove delivery. That is a remedy under the <a href={ctSettlement} target="_blank" rel="noreferrer">Connecticut settlement ↗</a>, not a general term of every Sunrun agreement.</p><p><Link href="/companies/sunrun">Sunrun Consumer Resource Center →</Link><br/><Link href="/states">State-specific solar consumer resources →</Link></p></section>

      <section className="info-section"><h2>Why Sunrun values these agreements</h2><p>The company also counts expected payments from long-term customer agreements in its financial reports. <Link href="/research/sunrun-customer-contract-value">Read the separate analysis of Sunrun’s contract value and renewal assumptions →</Link></p></section>

      <section id="sources" className="info-section"><h2>Primary sources</h2><p><strong>SEC-filed engineering review.</strong> <a href={julyFleetReview} target="_blank" rel="noreferrer">Leidos fleet review and July 2026 addendum ↗</a> — examples of agreement terms, production guarantees and battery-backup language.</p><p><strong>Connecticut Attorney General.</strong> <a href={ctSettlement} target="_blank" rel="noreferrer">October 2026 settlement announcement ↗</a> — contract-delivery remedy for covered customers.</p><p><strong>U.S. Securities and Exchange Commission.</strong> <a href={sec10k} target="_blank" rel="noreferrer">Sunrun Inc. 2025 Form 10-K ↗</a> — agreement terms, escalators and transfers.</p><p><strong>Sunrun.</strong> <a href={sunrunFaq} target="_blank" rel="noreferrer">Solar FAQ ↗</a> and <a href={sunrunTransfer} target="_blank" rel="noreferrer">2026 Service Transfer guide ↗</a> — current company descriptions of agreement access, end-of-term choices and home-sale transfers.</p><p><strong>Federal Trade Commission.</strong> <a href={ftcSolar} target="_blank" rel="noreferrer">Solar Power for Your Home ↗</a> — federal consumer guidance for comparing solar leases and PPAs.</p></section>

      <section className="info-section"><h2>Continue researching Sunrun</h2><p><Link href="/companies/sunrun">Sunrun complaints, investigations and consumer resources →</Link><br/><Link href="/research/sunrun-home-depot-sales-home-visit">Sunrun at Home Depot: shopper says store pitch followed him home →</Link><br/><Link href="/research/solar-sales-financing-after-complaint">Solar sales, financing and what happens after a complaint →</Link><br/><Link href="/research">More Solar Consumer Research →</Link><br/><Link href="/methodology">Research methodology and sourcing standards →</Link></p></section>
  </>;
}


export const article = defineResearchArticle({ story, config: articleConfig, Body: SunrunContractsBody });
