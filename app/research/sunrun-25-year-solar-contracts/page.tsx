import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "../../../components/info-page";

const canonicalUrl = "https://solarcomplaint.com/research/sunrun-25-year-solar-contracts";
const sec10k = "https://www.sec.gov/Archives/edgar/data/1469367/000162828026012289/run-20251231.htm";
const q2Results = "https://investors.sunrun.com/news-events/press-releases/detail/378/sunrun-reports-second-quarter-2026-financial-results";
const ftcSolar = "https://consumer.ftc.gov/articles/solar-power-your-home";

export const metadata: Metadata = {
  title: "Sunrun 25-Year Solar Contracts: Homeowner vs. Investor View",
  description: "Sunrun solar leases and PPAs can run 20 or 25 years. See what Sunrun tells investors about long-term customer agreements, recurring cash flows, renewals, transfers and subscriber value, alongside what homeowners should examine in the contract.",
  keywords: ["Sunrun 25 year contract", "Sunrun solar contract", "Sunrun lease 25 years", "Sunrun PPA", "Sunrun contract terms", "Sunrun solar lease", "Sunrun contract transfer", "Sunrun subscriber value"],
  alternates: { canonical: "/research/sunrun-25-year-solar-contracts" },
  openGraph: {
    title: "Sunrun’s 25-Year Solar Contracts: The Homeowner View and the Investor View",
    description: "A source-backed comparison of how a long-term Sunrun customer agreement looks from the roof and from the financial statements.",
    url: "/research/sunrun-25-year-solar-contracts",
    type: "article",
    publishedTime: "2026-09-07",
    modifiedTime: "2026-09-07",
    authors: ["https://solarcomplaint.com/about"],
    section: "Editorial Analysis",
    images: [{ url: "https://solarcomplaint.com/og.png", width: 1200, height: 630, alt: "Sunrun 25-year solar contracts editorial analysis" }],
  },
  twitter: { card: "summary_large_image", title: "Sunrun’s 25-Year Solar Contracts", description: "The homeowner view and the investor view.", images: ["https://solarcomplaint.com/og.png"] },
};

export default function SunrunContractsEditorial() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Article", "@id": `${canonicalUrl}#article`, headline: "Sunrun’s 25-Year Solar Contracts: The Homeowner View and the Investor View", description: "A source-backed analysis of Sunrun’s long-term solar leases and PPAs from the homeowner and investor perspectives.", datePublished: "2026-09-07", dateModified: "2026-09-07", inLanguage: "en-US", articleSection: "Editorial Analysis", mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl }, author: { "@type": "Organization", name: "Solar Consumer Research", url: "https://solarcomplaint.com/about" }, publisher: { "@id": "https://solarcomplaint.com/#publisher" }, about: [{ "@type": "Organization", name: "Sunrun Inc." }, { "@type": "Thing", name: "Residential solar leases" }, { "@type": "Thing", name: "Solar power purchase agreements" }], citation: [sec10k, q2Results, ftcSolar] },
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://solarcomplaint.com/" }, { "@type": "ListItem", position: 2, name: "Research", item: "https://solarcomplaint.com/research" }, { "@type": "ListItem", position: 3, name: "Sunrun 25-Year Solar Contracts", item: canonicalUrl }] }
    ]
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <InfoPage className="research-story-page" eyebrow="Editorial Analysis · September 7, 2026" title="Sunrun’s 25-Year Solar Contracts" lede="The homeowner view and the investor view are two sides of the same agreement. Sunrun’s own filings make the financial side unusually clear.">
      <nav className="case-question-links" aria-label="Breadcrumb"><Link href="/">Home</Link><Link href="/research">Research</Link><Link href="/companies/sunrun">Sunrun</Link><span aria-current="page">25-year contracts</span></nav>
      <nav className="case-question-links" aria-label="Article navigation"><a href="#term">How long?</a><a href="#homeowner">Homeowner view</a><a href="#investor">Investor view</a><a href="#transfer">Selling the home</a><a href="#questions">Contract checklist</a><a href="#sources">Primary sources</a></nav>

      <section className="info-section case-notice"><strong>The key fact</strong><p>Sunrun tells the SEC that its Customer Agreements, meaning solar leases and power purchase agreements, typically have initial terms of 20 or 25 years. Its 2025 Form 10-K also says rates can be fixed for the contract term or increase at a predetermined annual percentage.</p></section>

      <section id="term" className="info-section"><h2>How long is a Sunrun solar contract?</h2><p>For Sunrun’s solar-as-a-service customers, 20 or 25 years is not an incidental detail. It is the basic structure of the economic relationship. Sunrun says it constructs or arranges a home energy system and the customer receives electricity at set prices under a Customer Agreement, typically for an initial 20- or 25-year term.</p><p>That is also why a homeowner should evaluate the agreement differently from an ordinary home-improvement purchase. A 25-year agreement can remain relevant through roof work, system service, electricity-rate changes and a future home sale.</p><p><a href={sec10k} target="_blank" rel="noreferrer">Read Sunrun’s 2025 Form 10-K at the SEC ↗</a></p></section>

      <section id="homeowner" className="info-section"><p className="eyebrow">The homeowner view</p><h2>A solar system on the roof can create a decades-long contractual relationship</h2><p>From the homeowner’s side, the practical questions are concrete: What is the starting price? Does it escalate? Who owns the equipment? Who receives tax benefits? What performance is promised? Who handles maintenance and roof work? What happens if the house is sold? What does early termination or purchase cost?</p><p>The Federal Trade Commission specifically advises consumers considering solar leases and PPAs to examine the contract length, payment increases, maintenance, minimum production, early termination charges, sale-of-home obligations and end-of-contract options. The FTC also warns that future utility rates are difficult to predict, which matters when a solar proposal compares decades of projected solar payments with projected utility costs.</p><p><a href={ftcSolar} target="_blank" rel="noreferrer">FTC: Solar Power for Your Home ↗</a></p></section>

      <section id="investor" className="info-section"><p className="eyebrow">The investor view</p><h2>The same contract is a long-duration financial asset</h2><p>Sunrun describes these agreements differently when explaining its economics to investors. Its 2025 Form 10-K says Customer Agreements provide recurring customer payments, typically over 20 or 25 years. It says these assets are attractive to investors because of the long-term, recurring nature of the cash flows, customer credit quality, the non-discretionary nature of energy and Sunrun’s historical loss rates.</p><p>The scale is material. Sunrun reported approximately <strong>$37.3 billion in contracted but not yet recognized revenue</strong> as of December 31, 2025. The company said the vast majority of existing Customer Agreements had at least ten years remaining.</p><p>In its second-quarter 2026 results, Sunrun reported <strong>$59,377 of Subscriber Value</strong> and <strong>$55,033 of Contracted Subscriber Value</strong> per subscriber addition for the quarter. For valuation purposes, Sunrun says it assumes a 30-year customer relationship: a five-year renewal for a 25-year initial agreement and a ten-year renewal for a 20-year initial agreement.</p><p><a href={q2Results} target="_blank" rel="noreferrer">Sunrun Q2 2026 financial results and unit economics ↗</a></p></section>

      <section className="info-section case-notice"><strong>That difference in perspective matters</strong><p>To a homeowner, the agreement is a recurring household obligation attached to an energy system on the property. To Sunrun and its investors, the agreement also represents a stream of expected cash flows with measurable financial value. Neither description cancels the other. Reading both is a better way to understand what a 25-year solar agreement actually represents.</p></section>

      <section id="transfer" className="info-section"><h2>What happens to a Sunrun contract when you sell your house?</h2><p>A home sale is one of the most important points to understand before signing a long-term solar agreement. Sunrun’s 2025 Form 10-K says it has completed thousands of service transfers and that, from inception through December 31, 2025, the aggregate expected net present value of Customer Agreements after assignment represented approximately 100% of their value before assignment.</p><p>That is an investor-level description of transfer economics, not a promise that every homeowner transfer will be effortless. The controlling document for an individual homeowner is the actual agreement. Review its assignment, transfer, purchase and sale-of-home provisions before relying on a salesperson’s description.</p></section>

      <section id="questions" className="info-section"><h2>Before signing a 25-year Sunrun lease or PPA, find these terms</h2><p>Do not rely on the proposal headline alone. Locate the provisions governing the initial term; starting monthly or per-kWh price; annual escalator, if any; production guarantee; equipment ownership; maintenance and service; roof removal and reinstallation; transfer when the home is sold; early termination; purchase options and pricing; renewal; and end-of-term removal.</p><p>If a sales representation is important to the decision, preserve the proposal, emails, texts and any other written material alongside the final contract. Compare the final agreement against what was represented before signing.</p><p><Link href="/companies/sunrun">See the Sunrun Consumer Resource Center →</Link><br/><Link href="/companies/sunrun/ethics-compliance">Sunrun ethics and compliance complaint guide →</Link><br/><Link href="/states">Find state-specific solar consumer resources →</Link></p></section>

      <section id="sources" className="info-section"><h2>Primary sources</h2><p><strong>U.S. Securities and Exchange Commission.</strong> <a href={sec10k} target="_blank" rel="noreferrer">Sunrun Inc. 2025 Form 10-K ↗</a> — customer-agreement terms, escalators, transfers, recurring payments and contracted revenue.</p><p><strong>Sunrun Investor Relations.</strong> <a href={q2Results} target="_blank" rel="noreferrer">Second Quarter 2026 Financial Results ↗</a> — subscriber value, contracted subscriber value and the company’s 30-year customer-relationship assumption.</p><p><strong>Federal Trade Commission.</strong> <a href={ftcSolar} target="_blank" rel="noreferrer">Solar Power for Your Home ↗</a> — consumer guidance for evaluating leases, PPAs, escalators, transfers, termination and long-term utility-cost comparisons.</p></section>

      <section className="info-section"><h2>Continue researching Sunrun</h2><p><Link href="/companies/sunrun">Sunrun complaints, investigations and consumer resources →</Link><br/><Link href="/research/solar-sales-financing-after-complaint">Solar sales, financing and what happens after a complaint →</Link><br/><Link href="/research">More Solar Consumer Research →</Link><br/><Link href="/methodology">Research methodology and sourcing standards →</Link></p></section>
    </InfoPage>
  </>;
}
