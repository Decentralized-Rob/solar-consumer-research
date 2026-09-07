import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "../../../components/info-page";

const canonicalUrl = "https://solarcomplaint.com/guides/massachusetts-30-day-demand-letter";
const publishedDate = "2026-09-04";
const reviewedDate = "2026-09-04";
const officialDemandLetterUrl = "https://www.mass.gov/info-details/30-day-demand-letter";

export const metadata: Metadata = {
  title: "Massachusetts 30-Day Demand Letter: Chapter 93A Requirements",
  description:
    "A source-backed summary of the Massachusetts 30-day demand letter requirements, required information, delivery guidance, exceptions, and response period.",
  alternates: { canonical: "/guides/massachusetts-30-day-demand-letter" },
  openGraph: {
    title: "Massachusetts 30-Day Demand Letter: Chapter 93A Requirements",
    description: "What Massachusetts says a 30-day demand letter must contain and when the requirement applies.",
    url: "/guides/massachusetts-30-day-demand-letter",
    type: "article",
    images: [{ url: "https://solarcomplaint.com/og.png", width: 1200, height: 630, alt: "Solar Consumer Research" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Massachusetts 30-Day Demand Letter: Chapter 93A Requirements",
    description: "Official Massachusetts requirements for a Chapter 93A 30-day demand letter.",
    images: ["https://solarcomplaint.com/og.png"],
  },
};

export default function MassachusettsDemandLetterGuidePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${canonicalUrl}#article`,
        headline: "Massachusetts 30-Day Demand Letter: Chapter 93A Requirements",
        description:
          "A source-backed summary of the Massachusetts 30-day demand letter requirements, required information, delivery guidance, exceptions, and response period.",
        url: canonicalUrl,
        mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
        image: ["https://solarcomplaint.com/og.png"],
        inLanguage: "en-US",
        datePublished: publishedDate,
        dateModified: reviewedDate,
        author: { "@id": "https://solarcomplaint.com/#publisher" },
        publisher: { "@id": "https://solarcomplaint.com/#publisher" },
        isPartOf: { "@id": "https://solarcomplaint.com/#website" },
        about: [
          { "@type": "Thing", name: "Massachusetts Consumer Protection Act" },
          { "@type": "Thing", name: "30-day demand letter" },
          { "@type": "AdministrativeArea", name: "Massachusetts" },
        ],
        citation: [{ "@type": "CreativeWork", name: "30 Day Demand Letter", url: officialDemandLetterUrl }],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://solarcomplaint.com/" },
          { "@type": "ListItem", position: 2, name: "Guides", item: "https://solarcomplaint.com/guides" },
          { "@type": "ListItem", position: 3, name: "Massachusetts 30-day demand letter", item: canonicalUrl },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <InfoPage
        eyebrow="Massachusetts consumer guide"
        title="Massachusetts 30-day demand letter requirements"
        lede="Massachusetts guidance says consumers asserting certain claims over unfair or deceptive business practices generally must send the business a written demand 30 days before filing the claim in court. The letter must identify the complaint, the harm suffered, and the relief requested."
      >
        <nav className="case-question-links" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <Link href="/guides">Guides</Link>
          <span aria-current="page">Massachusetts 30-day demand letter</span>
        </nav>

        <section className="info-section case-notice" aria-label="Guide status">
          <strong>Official requirements, not a personalized template</strong>
          <p>
            Published and reviewed September 4, 2026 against the Massachusetts 30 Day Demand Letter page. This page summarizes the state&apos;s published requirements and does not determine whether Chapter 93A applies to a particular solar dispute.
          </p>
        </section>

        <section className="info-section">
          <h2>What is a Massachusetts 30-day demand letter?</h2>
          <p>
            It is a written demand used before certain consumer claims under the Massachusetts Consumer Protection Act, Chapter 93A. Massachusetts says the business must be given 30 days before the consumer files the claim in court, and the business has 30 days to make a written response.
          </p>
          <p>
            Whether a solar dispute qualifies as an unfair or deceptive practice is a legal question. A contract problem, service failure, billing dispute, financing issue, or installation problem does not automatically establish a Chapter 93A violation.
          </p>
        </section>

        <section className="info-section">
          <h2>What information must the letter include?</h2>
          <p>The Massachusetts page lists four core categories:</p>
          <ol>
            <li><strong>Your full name and address.</strong></li>
            <li><strong>The conduct you say was unfair or deceptive.</strong> Include the relevant dates and important facts.</li>
            <li><strong>The injury or loss you say resulted.</strong> Explain the money or property loss tied to the conduct.</li>
            <li><strong>The relief you demand.</strong> State what you are asking the business to do, including any amount of money demanded.</li>
          </ol>
          <p>
            Massachusetts provides a sample letter on the official page. SolarComplaint.com does not replace that sample with a third-party form because the facts and requested relief can differ significantly from one dispute to another.
          </p>
        </section>

        <section className="info-section">
          <h2>How should the letter be sent?</h2>
          <p>
            Massachusetts says certified mail with return receipt is not required by the statute, but recommends it as proof of delivery. The state also recommends sending the letter by regular mail and keeping a copy for your records.
          </p>
        </section>

        <section className="info-section">
          <h2>Are there exceptions to the 30-day letter requirement?</h2>
          <p>
            Yes. The Massachusetts page identifies exceptions when the merchant does not maintain a place of business or keep assets in Massachusetts, and when the consumer raises the claim as a counterclaim or cross-claim after the merchant has already taken legal action. Other procedural questions should be checked against the current law or discussed with a qualified attorney.
          </p>
        </section>

        <section className="info-section">
          <h2>What happens after the business receives the letter?</h2>
          <p>
            The state says the business has 30 days to respond in writing. If the business makes a settlement offer, later court proceedings can be affected by whether that offer is found reasonable. The official page also explains the circumstances in which damages or attorney&apos;s fees may be available after a court finding.
          </p>
          <p>
            Those outcomes depend on the facts and the court. Sending a demand letter by itself does not establish liability or guarantee damages.
          </p>
        </section>

        <section className="info-section">
          <h2>Read the official Massachusetts instructions</h2>
          <p>
            <a href={officialDemandLetterUrl} target="_blank" rel="noreferrer">Mass.gov: 30 Day Demand Letter ↗</a>
          </p>
        </section>

        <section className="info-section">
          <h2>Related SolarComplaint.com guides</h2>
          <p><Link href="/guides/massachusetts-solar-complaint">How to file a solar complaint with the Massachusetts Attorney General</Link></p>
          <p><Link href="/guides/solar-complaint-record-checklist">Build a solar complaint record before contacting an agency</Link></p>
          <p><Link href="/states/massachusetts">Massachusetts solar complaint and consumer resources</Link></p>
        </section>
      </InfoPage>
    </>
  );
}
