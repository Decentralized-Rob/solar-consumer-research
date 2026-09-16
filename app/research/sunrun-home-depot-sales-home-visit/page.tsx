import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "../../../components/info-page";

const canonicalUrl = "https://solarcomplaint.com/research/sunrun-home-depot-sales-home-visit";
const coolDownSource = "https://www.thecooldown.com/green-home/home-depot-shopper-sunrun-fake-number/";
const sunrun10k = "https://www.sec.gov/Archives/edgar/data/1469367/000162828026012289/run-20251231.htm";

export const metadata: Metadata = {
  title: "Sunrun at Home Depot: Shopper Says Store Pitch Led to Home Visit",
  description: "A Home Depot shopper told Reddit that a Sunrun sales encounter was followed by a visit to the shopper's home. Here is what was reported and what Sunrun says about its retail sales channels.",
  alternates: { canonical: "/research/sunrun-home-depot-sales-home-visit" },
  openGraph: {
    title: "Sunrun at Home Depot: Shopper Says Store Pitch Led to Home Visit",
    description: "A short read on a September 2026 Sunrun sales story and the company's established retail sales channel.",
    url: "/research/sunrun-home-depot-sales-home-visit",
    type: "article",
    publishedTime: "2026-09-16",
    modifiedTime: "2026-09-16",
    authors: ["https://solarcomplaint.com/about"],
    section: "Short Read",
    images: [{ url: "https://solarcomplaint.com/og.png", width: 1200, height: 630, alt: "SolarComplaint.com short read about Sunrun sales at Home Depot" }],
  },
  twitter: { card: "summary_large_image", title: "Sunrun at Home Depot: Shopper Says Store Pitch Led to Home Visit", description: "What was reported, plus context on Sunrun's retail sales channel.", images: ["https://solarcomplaint.com/og.png"] },
};

export default function SunrunHomeDepotShortRead() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${canonicalUrl}#article`,
        headline: "Sunrun at Home Depot: Shopper Says Store Pitch Led to Home Visit",
        description: "A short read on a reported Sunrun sales encounter at Home Depot and Sunrun's established retail sales channel.",
        datePublished: "2026-09-16",
        dateModified: "2026-09-16",
        inLanguage: "en-US",
        articleSection: "Short Read",
        mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
        author: { "@type": "Organization", name: "Solar Consumer Research", url: "https://solarcomplaint.com/about" },
        publisher: { "@id": "https://solarcomplaint.com/#publisher" },
        about: [{ "@type": "Organization", name: "Sunrun Inc." }, { "@type": "Organization", name: "The Home Depot" }, { "@type": "Thing", name: "Residential solar sales" }],
        citation: [coolDownSource, sunrun10k],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://solarcomplaint.com/" },
          { "@type": "ListItem", position: 2, name: "Research", item: "https://solarcomplaint.com/research" },
          { "@type": "ListItem", position: 3, name: "Sunrun at Home Depot", item: canonicalUrl },
        ],
      },
    ],
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <InfoPage className="research-story-page" eyebrow="Short Read · September 16, 2026" title="Sunrun at Home Depot: Shopper Says Store Pitch Led to Home Visit" lede="A shopper says a Sunrun sales conversation inside Home Depot did not end at the store.">
      <nav className="case-question-links" aria-label="Breadcrumb"><Link href="/">Home</Link><Link href="/research">Research</Link><Link href="/companies/sunrun">Sunrun</Link><span aria-current="page">Home Depot sales</span></nav>

      <section className="info-section">
        <p>The Cool Down reported September 16 on a Reddit user's encounter with a Sunrun salesperson inside a Home Depot. According to the account, the shopper gave a real home address but a fake phone number and email address. The shopper said someone later showed up at the home.</p>
        <p>The report does not establish who arranged the visit, what information was entered into a sales system, or whether the visit followed a standard Sunrun process. The original Reddit account is the source of the claim.</p>
        <p><a href={coolDownSource} target="_blank" rel="noreferrer">Read the September 16 report from The Cool Down ↗</a></p>
      </section>

      <section className="info-section">
        <h2>Why are Sunrun salespeople at Home Depot?</h2>
        <p>Sunrun's retail presence is not unusual for the company. In its 2025 annual filing with the SEC, Sunrun said it reaches customers through several sales channels, including retail, canvassing, field marketing, in-home sales and strategic retail partnerships.</p>
        <p>That broader sales model helps explain why a homeowner may first encounter Sunrun while shopping rather than while actively looking for a solar company.</p>
        <p><a href={sunrun10k} target="_blank" rel="noreferrer">Read Sunrun's 2025 Form 10-K at the SEC ↗</a></p>
      </section>

      <section className="info-section">
        <h2>Considering Sunrun after a retail sales pitch?</h2>
        <p>A store conversation can be the beginning of a much longer decision. Sunrun offers solar leases and power purchase agreements that can run for decades. Before moving forward, homeowners can compare the sales pitch with the contract terms, research the company and check consumer resources in their state.</p>
        <p><Link href="/research/sunrun-25-year-solar-contracts">See how Sunrun's long-term solar contracts work →</Link><br/><Link href="/companies/sunrun">Research Sunrun complaints, investigations and consumer resources →</Link><br/><Link href="/states">Find solar consumer resources in your state →</Link></p>
      </section>

      <section className="info-section">
        <h2>Sources</h2>
        <p><strong>The Cool Down.</strong> <a href={coolDownSource} target="_blank" rel="noreferrer">Home Depot shopper gives Sunrun fake number, says a rep showed up at his house anyway ↗</a>, September 16, 2026.</p>
        <p><strong>U.S. Securities and Exchange Commission.</strong> <a href={sunrun10k} target="_blank" rel="noreferrer">Sunrun Inc. 2025 Form 10-K ↗</a> — Sunrun's description of its sales and customer-acquisition channels.</p>
      </section>

      <section className="info-section">
        <h2>More Sunrun research</h2>
        <p><Link href="/companies/sunrun">Sunrun Consumer Resource Center →</Link><br/><Link href="/research/sunrun-25-year-solar-contracts">Sunrun's 25-year solar contracts →</Link><br/><Link href="/research/solar-sales-financing-after-complaint">Solar sales, financing and what happens after a complaint →</Link></p>
      </section>
    </InfoPage>
  </>;
}
