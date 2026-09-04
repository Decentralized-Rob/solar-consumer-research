import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "../../../components/info-page";

const canonicalUrl = "https://solarcomplaint.com/guides/solar-complaint-record-checklist";
const publishedDate = "2026-09-04";
const reviewedDate = "2026-09-04";
const ftcComplaintUrl = "https://consumer.ftc.gov/articles/sample-customer-complaint-letter";
const ftcResolutionUrl = "https://consumer.ftc.gov/articles/solving-problems-business-returns-refunds-and-other-resolutions";
const massComplaintRecordUrl = "https://www.mass.gov/info-details/resolving-a-consumer-complaint";

export const metadata: Metadata = {
  title: "Solar Complaint Document Checklist: Build a Clean Project Record",
  description:
    "A practical, source-backed checklist for organizing solar contracts, financing records, permits, service history, bills, production records, and communications before filing a complaint.",
  alternates: { canonical: "/guides/solar-complaint-record-checklist" },
  openGraph: {
    title: "Solar Complaint Document Checklist: Build a Clean Project Record",
    description: "What to organize before contacting a solar company, regulator, consumer agency, or research service.",
    url: "/guides/solar-complaint-record-checklist",
    type: "article",
    images: [{ url: "https://solarcomplaint.com/og.png", width: 1200, height: 630, alt: "Solar Consumer Research" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Solar Complaint Document Checklist: Build a Clean Project Record",
    description: "A source-backed checklist for organizing a residential solar dispute.",
    images: ["https://solarcomplaint.com/og.png"],
  },
};

export default function SolarComplaintRecordChecklistPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${canonicalUrl}#article`,
        headline: "Solar Complaint Document Checklist: Build a Clean Project Record",
        description:
          "A practical, source-backed checklist for organizing solar contracts, financing records, permits, service history, bills, production records, and communications before filing a complaint.",
        url: canonicalUrl,
        mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
        image: ["https://solarcomplaint.com/og.png"],
        inLanguage: "en-US",
        datePublished: publishedDate,
        dateModified: reviewedDate,
        author: { "@id": "https://solarcomplaint.com/#publisher" },
        publisher: { "@id": "https://solarcomplaint.com/#publisher" },
        isPartOf: { "@id": "https://solarcomplaint.com/#website" },
        about: [{ "@type": "Thing", name: "Residential solar consumer complaints" }],
        citation: [
          { "@type": "CreativeWork", name: "Sample Customer Complaint Letter", url: ftcComplaintUrl },
          { "@type": "CreativeWork", name: "Solving Problems With a Business", url: ftcResolutionUrl },
          { "@type": "CreativeWork", name: "Resolving a consumer complaint", url: massComplaintRecordUrl },
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://solarcomplaint.com/" },
          { "@type": "ListItem", position: 2, name: "Guides", item: "https://solarcomplaint.com/guides" },
          { "@type": "ListItem", position: 3, name: "Solar complaint record checklist", item: canonicalUrl },
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
        eyebrow="Consumer record checklist"
        title="Build a clean solar complaint record before you file"
        lede="Put the contract, financing records, permits, bills, production data, service history, and written communications in date order before contacting a company or agency. A clean record makes it easier to explain what happened without mixing documents, assumptions, and unresolved questions."
      >
        <nav className="case-question-links" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <Link href="/guides">Guides</Link>
          <span aria-current="page">Solar complaint record checklist</span>
        </nav>

        <section className="info-section case-notice" aria-label="Guide status">
          <strong>General record-preparation guide</strong>
          <p>
            Published and reviewed September 4, 2026 against current FTC and Massachusetts consumer guidance. Individual agencies have their own submission rules, so check the receiving agency before sending attachments.
          </p>
        </section>

        <section className="info-section">
          <h2>What documents should you save for a solar complaint?</h2>
          <p>
            Save the documents that show what was sold, what was financed, what was installed, what the system produced, what you paid, and how the company responded when a problem was reported. Keep original files intact and work from copies when an agency or business asks for documents.
          </p>
        </section>

        <section className="info-section">
          <h2>Start with the contract and financing file</h2>
          <ul>
            <li>Solar purchase agreement, lease, or power purchase agreement.</li>
            <li>Loan agreement, financing disclosures, payment schedule, and lender correspondence.</li>
            <li>Sales proposal, savings estimate, system design, and any written promises or addenda.</li>
            <li>Roofing, electrical, battery, or other related contracts and change orders.</li>
            <li>Electronic signature records or copies showing when documents were received and signed.</li>
          </ul>
        </section>

        <section className="info-section">
          <h2>Add the installation and permitting record</h2>
          <ul>
            <li>Permit applications and issued permits.</li>
            <li>Approved plans, engineering documents, and equipment specifications.</li>
            <li>Inspection records and correction notices.</li>
            <li>Permission-to-operate or interconnection records from the utility.</li>
            <li>Installation photos, especially where the dispute involves equipment placement, roof work, incomplete work, or property damage.</li>
          </ul>
        </section>

        <section className="info-section">
          <h2>Document performance, billing, and service problems</h2>
          <ul>
            <li>Electric bills from before and after installation.</li>
            <li>Solar production records or monitoring screenshots for the relevant dates.</li>
            <li>Loan, lease, or PPA bills and payment history.</li>
            <li>Service tickets, technician notes, repair invoices, warranty claims, and replacement-equipment records.</li>
            <li>Dates when the system was offline, underperforming, or waiting for service.</li>
          </ul>
        </section>

        <section className="info-section">
          <h2>Build a short communication timeline</h2>
          <p>
            FTC guidance recommends keeping notes about attempts to resolve a consumer problem, including who you spoke with, when you spoke, and what was promised. For a solar dispute, add emails, texts, portal messages, support tickets, and letters in chronological order. Save screenshots of online forms or chats before they disappear.
          </p>
          <p>
            Keep the timeline factual. For example: “June 4: reported inverter fault through support portal; ticket 1234 opened” is more useful than a conclusion about why the company did or did not respond.
          </p>
        </section>

        <section className="info-section">
          <h2>Write down the unresolved question</h2>
          <p>
            End the file with a short statement of what remains unresolved. Examples include a missing permit, disputed signature, unexplained service charge, production shortfall, collection notice, warranty question, or disagreement over who is responsible for repairs. This keeps the complaint focused on the issue the documents can help establish.
          </p>
        </section>

        <section className="info-section">
          <h2>Do not automatically send the whole file</h2>
          <p>
            Agencies use different intake rules. Some ask for supporting documents immediately; others specifically tell consumers to wait until documentation is requested. Keep the complete record for yourself, then follow the instructions of the company, regulator, Attorney General, court, or other recipient you are contacting.
          </p>
        </section>

        <section className="info-section">
          <h2>Primary consumer guidance</h2>
          <p><a href={ftcResolutionUrl} target="_blank" rel="noreferrer">FTC: Solving Problems With a Business ↗</a></p>
          <p><a href={ftcComplaintUrl} target="_blank" rel="noreferrer">FTC: Sample Customer Complaint Letter ↗</a></p>
          <p><a href={massComplaintRecordUrl} target="_blank" rel="noreferrer">Mass.gov: Resolving a consumer complaint ↗</a></p>
        </section>

        <section className="info-section">
          <h2>Related SolarComplaint.com guides</h2>
          <p><Link href="/guides/massachusetts-solar-complaint">How to file a solar complaint with the Massachusetts Attorney General</Link></p>
          <p><Link href="/guides/massachusetts-30-day-demand-letter">Massachusetts 30-day demand letter requirements</Link></p>
          <p><Link href="/resources">Consumer complaint and research resources</Link></p>
        </section>
      </InfoPage>
    </>
  );
}
