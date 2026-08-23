import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "../../components/info-page";

export const metadata: Metadata = {
  title: "How to File a Complaint Against Sunrun",
  description:
    "Find the right official agency for a Sunrun complaint, organize your records, and use state and federal consumer-protection resources.",
  alternates: { canonical: "/file-a-complaint-against-sunrun" },
  openGraph: {
    title: "How to File a Complaint Against Sunrun",
    description:
      "A practical guide to finding the right official complaint channel for a Sunrun sales, installation, utility, or financing concern.",
    url: "/file-a-complaint-against-sunrun",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to File a Complaint Against Sunrun",
    description: "Find the right official complaint channel for a Sunrun concern.",
  },
};

const issueRoutes = [
  {
    issue: "Sales promises, misleading information, or contract concerns",
    route: "Your state attorney general or consumer-protection office",
    detail: "Use the official consumer complaint route for the state where the sale or project occurred. State procedures and available remedies differ.",
  },
  {
    issue: "Roof work, installation quality, permits, inspections, or contractor licensing",
    route: "Local building department and the relevant state licensing agency",
    detail: "Keep permit records, inspection results, photographs, and the name of every contractor or subcontractor involved.",
  },
  {
    issue: "Utility billing, meter, interconnection, or permission-to-operate problem",
    route: "Your utility first, then the state utility regulator when appropriate",
    detail: "Save your utility account records, interconnection documents, and all written responses before escalating.",
  },
  {
    issue: "Solar loan, PACE financing, credit reporting, or debt collection",
    route: "The lender or servicer first, then the CFPB when it handles the product",
    detail: "The company that sold or installed the system may not be the lender. Identify the lender named in your financing documents.",
  },
  {
    issue: "Fraud or deceptive business practices",
    route: "Your state consumer-protection office and, when appropriate, the FTC",
    detail: "A report can help an agency identify patterns, but it does not decide a private dispute or guarantee an individual result.",
  },
];

export default function FileAComplaintAgainstSunrunPage() {
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "How to File a Complaint Against Sunrun",
    description: "A guide to finding official complaint channels for residential solar sales, installation, utility, and financing concerns.",
    url: "https://solarcomplaint.com/file-a-complaint-against-sunrun",
    dateModified: "2026-08-23",
    isPartOf: { "@id": "https://solarcomplaint.com/#website" },
    publisher: { "@id": "https://solarcomplaint.com/#publisher" },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Solar Consumer Research", item: "https://solarcomplaint.com" },
        { "@type": "ListItem", position: 2, name: "How to File a Complaint Against Sunrun", item: "https://solarcomplaint.com/file-a-complaint-against-sunrun" },
      ],
    },
  };

  return (
    <InfoPage
      className="complaint-guide-page"
      eyebrow="Official complaint routes"
      title="How to file a complaint against Sunrun."
      lede="Start with the agency that handles your specific issue. A sales complaint, an installation problem, a utility dispute, and a financing concern may belong in different places."
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <section className="complaint-guide-answer" aria-labelledby="quick-answer-title">
        <p>Quick answer</p>
        <h2 id="quick-answer-title">Choose your state, identify the problem, and use the matching official complaint channel.</h2>
        <div><Link className="button button--primary" href="/resources">Choose your state</Link><Link className="button button--secondary" href="/federal-resources">Federal resources</Link></div>
      </section>
      <section className="info-section" aria-labelledby="before-filing-title">
        <h2 id="before-filing-title">Before you file</h2>
        <p>Save copies of the documents that show what was promised, agreed, installed, financed, or reported. Do not rely only on a verbal account.</p>
        <ul className="complaint-guide-checklist"><li>Signed agreement, proposal, change orders, and any cancellation notice</li><li>Loan, lease, PPA, or PACE financing documents</li><li>Permits, inspection records, utility interconnection documents, and production records</li><li>Photos, repair estimates, invoices, and a dated timeline of communications</li></ul>
      </section>
      <section className="complaint-guide-routes" aria-labelledby="routes-title">
        <div className="complaint-guide-section-heading"><span>Match the problem to the agency</span><h2 id="routes-title">Where should you file?</h2></div>
        <div className="complaint-guide-route-list">{issueRoutes.map((item, index) => <article key={item.issue}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{item.issue}</h3><strong>{item.route}</strong><p>{item.detail}</p></div></article>)}</div>
      </section>
      <section className="info-section" aria-labelledby="written-complaint-title"><h2 id="written-complaint-title">Make the complaint usable</h2><p>State the facts in date order. Identify the company and project address, name the documents you attached, explain what you want investigated or corrected, and keep proof of submission. Avoid guessing about motives or legal conclusions. The record is stronger when it stays specific.</p></section>
      <section className="complaint-guide-sources" aria-labelledby="sources-title">
        <div><p>Official national sources</p><h2 id="sources-title">Use federal channels only when they fit the issue.</h2></div>
        <div className="complaint-guide-source-links"><a href="https://www.consumerfinance.gov/complaint/" target="_blank" rel="noreferrer"><strong>Consumer Financial Protection Bureau</strong><span>Financial products and services, including eligible solar financing concerns ↗</span></a><a href="https://reportfraud.ftc.gov/" target="_blank" rel="noreferrer"><strong>Federal Trade Commission</strong><span>Report suspected fraud or deceptive business practices ↗</span></a></div>
      </section>
      <section className="info-section" aria-labelledby="court-title"><h2 id="court-title">Court or arbitration comes after the paperwork review</h2><p>Read the dispute-resolution section of your own agreement before considering a lawsuit, small claims case, or arbitration. It may contain notice requirements, deadlines, or other procedures. This page does not determine whether a claim is valid or which legal option applies.</p></section>
      <div className="state-page-links complaint-guide-footer-links"><Link href="/resources">Browse official state complaint resources →</Link><Link href="/guides">Read the document-organizing guide →</Link><Link href="/#questions">Ask a research question →</Link></div>
    </InfoPage>
  );
}
