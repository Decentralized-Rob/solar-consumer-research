import type { Metadata } from "next";
import Link from "next/link";

const canonicalUrl = "https://solarcomplaint.com/goodleap/states";
const reviewedDate = "2026-09-03";

export const metadata: Metadata = {
  title: "GoodLeap Solar Financing by State: Lawsuits & Arbitration",
  description: "State-by-state GoodLeap solar financing research covering lawsuits, arbitration decisions, Attorney General actions, and related public records.",
  alternates: { canonical: "/goodleap/states" },
  openGraph: {
    title: "GoodLeap Solar Financing by State",
    description: "A state-by-state research tracker built from GoodLeap-specific court, arbitration, and government records.",
    url: "/goodleap/states",
    type: "website",
    images: [{ url: "https://solarcomplaint.com/og.png", width: 1200, height: 630, alt: "Solar Consumer Research" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "GoodLeap Solar Financing by State",
    description: "A state-by-state research tracker built from GoodLeap-specific court, arbitration, and government records.",
    images: ["https://solarcomplaint.com/og.png"],
  },
};

const stateRows = [
  { state: "Minnesota", record: "Attorney General lawsuit over alleged solar-loan dealer fees", status: "Published", href: "/goodleap/states/minnesota" },
  { state: "Virginia", record: "2026 Attorney General case involving Power Home / Pink Energy financing", status: "Published", href: "/goodleap/states/virginia" },
  { state: "Texas", record: "Multiple recent GoodLeap solar-financing cases and arbitration decisions", status: "Reviewing" },
  { state: "Florida", record: "Consumer litigation plus GoodLeap litigation involving solar-cancellation companies", status: "Reviewing" },
  { state: "New Jersey", record: "GoodLeap financing disputes tied to major installer failures, including Titan and Suntuity", status: "Reviewing" },
  { state: "Missouri", record: "GoodLeap consumer litigation overlapping Titan Solar Power bankruptcy issues", status: "Reviewing" },
  { state: "Ohio", record: "Power Home / Pink Energy litigation involving GoodLeap-financed consumers", status: "Reviewing" },
  { state: "Michigan", record: "Companion Power Home / Pink Energy litigation involving GoodLeap financing", status: "Reviewing" },
  { state: "Maryland", record: "2026 federal ruling on arbitration and contract formation in a GoodLeap solar-financing dispute", status: "Reviewing" },
] as const;

export default function GoodLeapStatesPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${canonicalUrl}#page`,
        name: "GoodLeap Solar Financing by State",
        description: "State-by-state GoodLeap solar financing research built from court, arbitration, and government records.",
        url: canonicalUrl,
        dateModified: reviewedDate,
        isPartOf: { "@id": "https://solarcomplaint.com/#website" },
        publisher: { "@id": "https://solarcomplaint.com/#publisher" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://solarcomplaint.com/" },
          { "@type": "ListItem", position: 2, name: "GoodLeap", item: "https://solarcomplaint.com/goodleap" },
          { "@type": "ListItem", position: 3, name: "States", item: canonicalUrl },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <main className="gl-main">
        <div className="gl-page">
          <p className="gl-eyebrow">GoodLeap state research</p>
          <h1>GoodLeap solar financing by state</h1>
          <p className="gl-deck">
            This tracker shows where we have found enough GoodLeap-specific public material to justify deeper review. We publish a full state page only after the underlying record has been opened, checked, and organized into something useful for homeowners.
          </p>
          <div className="gl-review-line">
            <span>Reviewed September 3, 2026</span><span>·</span>
            <Link href="/methodology">Methodology</Link><span>·</span>
            <Link href="/corrections">Corrections</Link>
          </div>

          <section className="gl-section" aria-labelledby="state-table-heading">
            <h2 id="state-table-heading">Current research status</h2>
            <p>
              The table is intentionally short. A state is added because of a specific public record, not because GoodLeap is licensed there or because solar complaints exist generally.
            </p>
            <div className="gl-table-wrap">
              <table className="gl-table">
                <thead>
                  <tr>
                    <th scope="col">State</th>
                    <th scope="col">Why we are looking at it</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {stateRows.map((row) => (
                    <tr key={row.state}>
                      <td>{row.href ? <Link href={row.href}>{row.state}</Link> : row.state}</td>
                      <td>{row.record}</td>
                      <td>
                        <span className={`gl-status ${row.status === "Published" ? "gl-status-live" : "gl-status-review"}`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="gl-section" aria-labelledby="flag-method-heading">
            <h2 id="flag-method-heading">Why we call this FLAG</h2>
            <p>
              FLAG stands for <strong>Financing Litigation &amp; Arbitration involving GoodLeap</strong>. It is a shorthand for this research queue. It does not mean a court or regulator has found wrongdoing, and it does not mean every GoodLeap-financed consumer in a listed state has the same issue.
            </p>
            <p>
              We generally look for one or more of the following before adding a state: an Attorney General action, a meaningful court ruling, a recurring arbitration issue, a financing dispute tied to a major installer failure, or multiple recent GoodLeap-specific records that point to the same consumer problem.
            </p>
          </section>

          <section className="gl-section" aria-labelledby="licensing-heading">
            <h2 id="licensing-heading">Licensing is useful context, but it is not the story</h2>
            <p>
              GoodLeap currently lists licenses or registrations in 46 states plus Washington, D.C. That is much broader than the company&apos;s current residential-solar availability and much broader than this research tracker. We do not create thin pages just because a company is licensed in a state.
            </p>
          </section>

          <section className="gl-help-box" aria-labelledby="state-help-heading">
            <h2 id="state-help-heading">Your state is not listed?</h2>
            <p>
              That does not mean there is no relevant public record. Send us your location and a short description of the problem and we can check the available government, court, licensing, and complaint resources.
            </p>
            <div className="gl-actions">
              <Link className="gl-button gl-button-primary" href="/#questions">Request free research assistance</Link>
              <Link className="gl-button" href="/goodleap/resources">GoodLeap consumer resources</Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
