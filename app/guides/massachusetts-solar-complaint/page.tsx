import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "../../../components/info-page";

const canonicalUrl = "https://solarcomplaint.com/guides/massachusetts-solar-complaint";
const publishedDate = "2026-09-04";
const reviewedDate = "2026-09-04";
const agoComplaintUrl = "https://www.mass.gov/how-to/file-a-consumer-complaint";

export const metadata: Metadata = {
  title: "How to File a Solar Complaint with the Massachusetts Attorney General",
  description:
    "A source-backed guide to the Massachusetts Attorney General consumer complaint process for homeowners dealing with a residential solar company.",
  alternates: { canonical: "/guides/massachusetts-solar-complaint" },
  openGraph: {
    title: "How to File a Solar Complaint with the Massachusetts Attorney General",
    description:
      "Official Massachusetts complaint steps, what to save, and what the Attorney General asks consumers to do after filing.",
    url: "/guides/massachusetts-solar-complaint",
    type: "article",
    images: [{ url: "https://solarcomplaint.com/og.png", width: 1200, height: 630, alt: "Solar Consumer Research" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to File a Solar Complaint with the Massachusetts Attorney General",
    description: "Official Massachusetts complaint steps for residential solar consumers.",
    images: ["https://solarcomplaint.com/og.png"],
  },
};

export default function MassachusettsSolarComplaintGuidePage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${canonicalUrl}#article`,
        headline: "How to File a Solar Complaint with the Massachusetts Attorney General",
        description:
          "A source-backed guide to the Massachusetts Attorney General consumer complaint process for homeowners dealing with a residential solar company.",
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
          { "@type": "Thing", name: "Residential solar consumer complaints" },
          { "@type": "AdministrativeArea", name: "Massachusetts" },
          { "@type": "GovernmentOrganization", name: "Massachusetts Attorney General's Office" },
        ],
        citation: [{ "@type": "CreativeWork", name: "File a consumer complaint", url: agoComplaintUrl }],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://solarcomplaint.com/" },
          { "@type": "ListItem", position: 2, name: "Guides", item: "https://solarcomplaint.com/guides" },
          { "@type": "ListItem", position: 3, name: "Massachusetts solar complaint", item: canonicalUrl },
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
        title="How to file a solar complaint with the Massachusetts Attorney General"
        lede="Massachusetts consumers can file a complaint with the Attorney General's Consumer Advocacy & Response Division online or by mail. The AGO says it can help with most consumer issues, including home-improvement contracts, business closures, debt collection, financing, and utility-bill disputes."
      >
        <nav className="case-question-links" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <Link href="/guides">Guides</Link>
          <span aria-current="page">Massachusetts solar complaint</span>
        </nav>

        <section className="info-section case-notice" aria-label="Guide status">
          <strong>Source-backed procedure</strong>
          <p>
            Published and reviewed September 4, 2026 against the Massachusetts Attorney General's current consumer complaint instructions. This page explains a public filing process; it does not assess an individual claim or provide legal advice.
          </p>
        </section>

        <section className="info-section">
          <h2>Can you file a solar complaint with the Massachusetts Attorney General?</h2>
          <p>
            Yes. The Attorney General's complaint system is available to consumers having a problem with a business. The AGO lists home-improvement contracts, business closures, debt collection, mortgage and loan issues, and utility-bill disputes among common consumer matters it handles. A solar complaint may involve one or more of those subjects depending on what happened.
          </p>
          <p>
            The filing itself does not mean the Attorney General has found that a company violated the law, and the complaint process does not guarantee a particular outcome.
          </p>
        </section>

        <section className="info-section">
          <h2>What should you prepare before filing?</h2>
          <p>
            Build a short factual timeline first. Note the important dates, company and salesperson names, amounts paid or financed, what was promised in writing, what was installed or not completed, and what remains unresolved. Keep the contract, proposal, financing documents, permits, inspection records, utility bills, production records, service records, and written communications together.
          </p>
          <p>
            The AGO's current online instructions say not to send additional documentation after filing unless the office asks for it. Keep your records available rather than repeatedly submitting material the agency has not requested.
          </p>
        </section>

        <section className="info-section">
          <h2>How do you file the complaint?</h2>
          <ol>
            <li><strong>Use the official AGO complaint page.</strong> Review the filing instructions and open the state's online complaint form.</li>
            <li><strong>Describe the problem with dates and facts.</strong> Separate what your documents show from conclusions or assumptions.</li>
            <li><strong>Save your submission.</strong> The AGO says consumers have an opportunity to save or print a copy after filing.</li>
            <li><strong>Do not file a duplicate complaint.</strong> If you already filed about the same issue and need to add information or ask a question, the AGO directs consumers to its Consumer Hotline instead.</li>
          </ol>
        </section>

        <section className="info-section">
          <h2>Where is the official Massachusetts complaint form?</h2>
          <p>
            Start with the Massachusetts Attorney General's official instructions. That page contains the current online filing link, mail instructions, hotline information, and filing notes.
          </p>
          <p>
            <a href={agoComplaintUrl} target="_blank" rel="noreferrer">Massachusetts Attorney General: File a consumer complaint ↗</a>
          </p>
        </section>

        <section className="info-section">
          <h2>Related SolarComplaint.com research</h2>
          <p>
            <Link href="/states/massachusetts">Massachusetts solar complaint and consumer resources</Link>
          </p>
          <p>
            <Link href="/guides/solar-complaint-record-checklist">Build a solar complaint record before you file</Link>
          </p>
          <p>
            <Link href="/guides/massachusetts-30-day-demand-letter">Massachusetts 30-day demand letter requirements</Link>
          </p>
        </section>
      </InfoPage>
    </>
  );
}
