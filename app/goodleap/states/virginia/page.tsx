import type { Metadata } from "next";
import Link from "next/link";

const canonicalUrl = "https://solarcomplaint.com/goodleap/states/virginia";
const publishedDate = "2026-09-03";
const reviewedDate = "2026-09-03";

export const metadata: Metadata = {
  title: "GoodLeap in Virginia: 2026 Solar Financing Lawsuit",
  description: "Virginia GoodLeap solar financing research based on the 2026 Attorney General case involving Power Home Solar / Pink Energy and multiple lenders.",
  alternates: { canonical: "/goodleap/states/virginia" },
  openGraph: {
    title: "GoodLeap in Virginia: 2026 Solar Financing Lawsuit",
    description: "Primary-source research on Virginia's 2026 Power Home / Pink Energy financing case naming GoodLeap.",
    url: "/goodleap/states/virginia",
    type: "article",
    images: [{ url: "https://solarcomplaint.com/og.png", width: 1200, height: 630, alt: "Solar Consumer Research" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "GoodLeap in Virginia: 2026 Solar Financing Lawsuit",
    description: "Primary-source research on Virginia's 2026 Power Home / Pink Energy financing case naming GoodLeap.",
    images: ["https://solarcomplaint.com/og.png"],
  },
};

const sources = [
  {
    title: "Virginia Attorney General: lawsuits and settlements index",
    href: "https://www.oag.state.va.us/consumer-protection/index.php/laws-cases/lawsuits-settlements",
    detail: "Official Consumer Protection Section index listing the Power Home Solar / Waller / Klink / GoodLeap matter.",
  },
  {
    title: "Virginia Attorney General: First Amended Complaint",
    href: "https://www.oag.state.va.us/consumer-protection/files/Lawsuits/Com-v-Waller-First-Amended-Complaint.pdf",
    detail: "Primary filing in Commonwealth of Virginia ex rel. Jay Jones v. Waller, et al., Case No. 3:26-cv-00039-REP.",
  },
  {
    title: "Virginia Attorney General: consumer complaint form",
    href: "https://www.oag.state.va.us/consumer-protection/index.php/file-a-complaint",
    detail: "Official Virginia consumer complaint channel.",
  },
  {
    title: "CFPB: Solar Financing Issue Spotlight",
    href: "https://www.consumerfinance.gov/data-research/research-reports/issue-spotlight-solar-financing/",
    detail: "Federal consumer-finance research on solar-specific loans, dealer fees, tax-credit representations, payment changes, and savings claims.",
  },
] as const;

export default function GoodLeapVirginiaPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${canonicalUrl}#article`,
        headline: "GoodLeap in Virginia: 2026 Solar Financing Lawsuit",
        description: "Primary-source research on Virginia's 2026 Power Home / Pink Energy financing case naming GoodLeap.",
        url: canonicalUrl,
        datePublished: publishedDate,
        dateModified: reviewedDate,
        author: { "@id": "https://solarcomplaint.com/#publisher" },
        publisher: { "@id": "https://solarcomplaint.com/#publisher" },
        isPartOf: { "@id": "https://solarcomplaint.com/#website" },
        about: [
          { "@type": "Organization", name: "GoodLeap, LLC" },
          { "@type": "Thing", name: "Residential solar financing" },
          { "@type": "Organization", name: "Power Home Solar / Pink Energy" },
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://solarcomplaint.com/" },
          { "@type": "ListItem", position: 2, name: "GoodLeap", item: "https://solarcomplaint.com/goodleap" },
          { "@type": "ListItem", position: 3, name: "States", item: "https://solarcomplaint.com/goodleap/states" },
          { "@type": "ListItem", position: 4, name: "Virginia", item: canonicalUrl },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <main className="gl-main">
        <article className="gl-article">
          <p className="gl-eyebrow">GoodLeap in Virginia</p>
          <h1>Virginia&apos;s 2026 case ties GoodLeap financing to the Power Home Solar record</h1>
          <p className="gl-deck">
            The Virginia Attorney General&apos;s amended federal complaint names GoodLeap and other lenders alongside former Power Home Solar leadership. Unlike a general industry warning, the filing contains lender-specific allegations and transaction figures that can be checked directly against the source.
          </p>
          <div className="gl-review-line">
            <span>Published September 3, 2026</span><span>·</span>
            <span>Reviewed against cited sources</span><span>·</span>
            <Link href="/methodology">Methodology</Link><span>·</span>
            <Link href="/corrections">Corrections</Link>
          </div>

          <dl className="gl-key-facts">
            <div><dt>Case</dt><dd>Commonwealth of Virginia ex rel. Jay Jones v. William Jayson Waller, Kevin Anthony Klink, Cross River Bank, GoodLeap LLC, Solar Mosaic LLC, Sunlight Financial LLC, and Technology Credit Union</dd></div>
            <div><dt>Federal case</dt><dd>3:26-cv-00039-REP, U.S. District Court for the Eastern District of Virginia</dd></div>
            <div><dt>Amended complaint</dt><dd>Filed February 3, 2026</dd></div>
            <div><dt>What this page covers</dt><dd>The Commonwealth&apos;s GoodLeap-specific allegations, the scale alleged, and the records a Virginia borrower can compare with their own transaction.</dd></div>
          </dl>

          <section className="gl-section" aria-labelledby="va-case-heading">
            <h2 id="va-case-heading">What the Virginia filing says about GoodLeap</h2>
            <p>
              The <a className="gl-text-link" href="https://www.oag.state.va.us/consumer-protection/files/Lawsuits/Com-v-Waller-First-Amended-Complaint.pdf" target="_blank" rel="noreferrer">First Amended Complaint</a> alleges that GoodLeap extended loans for Power Home solar purchases to more than 1,000 Virginia households. The filing also makes broader allegations against multiple lender defendants and former Power Home leadership.
            </p>
            <p>
              Virginia alleges that by spring 2022 GoodLeap had reported unusually high complaint rates connected to Power Home loans and that investor concerns had surfaced around production and fraud claims. Those statements are allegations in a complaint. They are not findings that have necessarily been proven in court.
            </p>
            <p>
              The complaint also challenges the treatment of dealer or program fees in solar financing and includes a redacted GoodLeap Truth in Lending example showing how the Commonwealth says a program fee should have affected the disclosed finance charge and APR.
            </p>
          </section>

          <section className="gl-section" aria-labelledby="va-scale-heading">
            <h2 id="va-scale-heading">The numbers need to be kept separate</h2>
            <p>
              This is one place where summaries can become misleading very quickly. The Virginia complaint alleges more than 4,000 consumers and more than $200 million in loans across all lender defendants. It separately alleges that GoodLeap itself extended loans to more than 1,000 Virginia households.
            </p>
            <p>
              We keep those figures distinct because the larger numbers do not belong to GoodLeap alone. That distinction is easy to lose when court complaints are compressed into headlines or social posts.
            </p>
          </section>

          <section className="gl-section" aria-labelledby="va-consumer-heading">
            <h2 id="va-consumer-heading">What a Virginia borrower can compare</h2>
            <p>If your financing is connected to Power Home Solar or Pink Energy, the most useful records to collect are:</p>
            <ul className="gl-bullets">
              <li>the original Truth in Lending disclosure and complete GoodLeap loan agreement;</li>
              <li>the amount financed, finance charge, APR, and payment schedule;</li>
              <li>the quoted solar-system price and any record showing what the lender funded to the installer;</li>
              <li>sales proposals, savings projections, tax-credit statements, texts, emails, and recordings;</li>
              <li>service requests, production records, permits, inspections, and bankruptcy-related notices tied to Power Home / Pink Energy.</li>
            </ul>
            <p>
              The value of those records is comparative. They can show whether the documents in an individual transaction resemble the issues described in the public filing, but they do not establish liability on their own.
            </p>
          </section>

          <aside className="gl-note">
            <strong>Research note:</strong> the Virginia complaint&apos;s 4,000-consumer and $200 million figures cover all lender defendants. The complaint separately attributes more than 1,000 Virginia household loans to GoodLeap. We do not combine those numbers.
          </aside>

          <section className="gl-section" aria-labelledby="va-sources-heading">
            <h2 id="va-sources-heading">Primary sources</h2>
            <ol className="gl-source-list">
              {sources.map((source) => (
                <li key={source.href}>
                  <a href={source.href} target="_blank" rel="noreferrer">{source.title}</a>
                  <span>{source.detail}</span>
                </li>
              ))}
            </ol>
          </section>

          <section className="gl-help-box" aria-labelledby="va-help-heading">
            <h2 id="va-help-heading">Need help researching a Virginia GoodLeap issue?</h2>
            <p>
              Send your city or town and a short description of what happened. We can help identify public records and official complaint or regulatory resources that may be relevant.
            </p>
            <div className="gl-actions">
              <Link className="gl-button gl-button-primary" href="/#questions">Request free research assistance</Link>
              <Link className="gl-button" href="/states/virginia">Virginia solar consumer resources</Link>
              <Link className="gl-button" href="/goodleap/states">GoodLeap state tracker</Link>
            </div>
          </section>
        </article>
      </main>
    </>
  );
}
