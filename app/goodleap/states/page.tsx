import type { Metadata } from "next";
import Link from "next/link";

const canonicalUrl = "https://solarcomplaint.com/goodleap/states";
const reviewedDate = "2026-09-16";

export const metadata: Metadata = {
  title: "GoodLeap Solar Financing by State: Lawsuits & Arbitration",
  description: "State-by-state GoodLeap solar financing research covering lawsuits, arbitration decisions, Attorney General actions, and related public records.",
  alternates: { canonical: "/goodleap/states" },
  openGraph: { title: "GoodLeap Solar Financing by State", description: "A state-by-state research tracker built from GoodLeap-specific court, arbitration, and government records.", url: "/goodleap/states", type: "website" },
};

type StateRow = { state: string; record: string; status: "Published" | "Reviewing"; href: string | null; stateHref: string };
const stateRows: StateRow[] = [
  { state: "Minnesota", record: "Attorney General lawsuit over alleged solar-loan dealer fees", status: "Published", href: "/goodleap/states/minnesota", stateHref: "/states/minnesota" },
  { state: "Virginia", record: "2026 Attorney General case involving Power Home / Pink Energy financing", status: "Published", href: "/goodleap/states/virginia", stateHref: "/states/virginia" },
  { state: "Texas", record: "Lopez and Quayle are among recent federal solar-financing cases involving GoodLeap; active matters are tracked without implying a merits finding", status: "Reviewing", href: null, stateHref: "/states/texas" },
  { state: "Florida", record: "Consumer litigation plus GoodLeap's 2026 litigation involving solar-cancellation companies", status: "Reviewing", href: null, stateHref: "/states/florida" },
  { state: "New Jersey", record: "GoodLeap financing disputes tied to installer failures, including the Titan/Sunbeam record", status: "Reviewing", href: null, stateHref: "/states/new-jersey" },
  { state: "Missouri", record: "GoodLeap consumer litigation overlapping Titan Solar Power bankruptcy issues", status: "Reviewing", href: null, stateHref: "/states/missouri" },
  { state: "Ohio", record: "Power Home / Pink Energy litigation involving GoodLeap-financed consumers", status: "Reviewing", href: null, stateHref: "/states/ohio" },
  { state: "Michigan", record: "Power Home / Pink Energy financing records plus the state's broader solar enforcement record", status: "Reviewing", href: null, stateHref: "/states/michigan" },
  { state: "Maryland", record: "August 2026 federal ruling on arbitration and contract formation in Arias v. GoodLeap", status: "Reviewing", href: null, stateHref: "/states/maryland" },
];

export default function GoodLeapStatesPage() {
  const structuredData = { "@context": "https://schema.org", "@type": "CollectionPage", "@id": `${canonicalUrl}#page`, name: "GoodLeap Solar Financing by State", description: "State-by-state GoodLeap solar financing research built from court, arbitration, and government records.", url: canonicalUrl, dateModified: reviewedDate, isPartOf: { "@id": "https://solarcomplaint.com/#website" }, publisher: { "@id": "https://solarcomplaint.com/#publisher" } };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    <main className="gl-main"><div className="gl-page">
      <p className="gl-eyebrow">GoodLeap state research</p>
      <h1>GoodLeap solar financing by state</h1>
      <p className="gl-deck">A focused map of GoodLeap-specific government actions and court records, connected to SolarComplaint.com&apos;s broader state consumer resources.</p>
      <div className="gl-review-line"><time dateTime={reviewedDate}>Reviewed September 16, 2026</time><span>·</span><Link href="/methodology">Methodology</Link><span>·</span><Link href="/corrections">Corrections</Link></div>

      <section className="gl-section" aria-labelledby="state-table-heading"><h2 id="state-table-heading">Current research status</h2><p>A state is added because of a specific GoodLeap record, not simply because the company is licensed there. The state-resource link gives the broader complaint and regulator context.</p>
        <div className="gl-table-wrap"><table className="gl-table"><thead><tr><th>State</th><th>Why we are looking at it</th><th>Status</th></tr></thead><tbody>{stateRows.map((row)=><tr key={row.state}><td>{row.href?<><Link href={row.href}>{row.state} GoodLeap research</Link><br/><Link href={row.stateHref}>State resources →</Link></>:<Link href={row.stateHref}>{row.state} state resources →</Link>}</td><td>{row.record}</td><td><span className={`gl-status ${row.status==="Published"?"gl-status-live":"gl-status-review"}`}>{row.status}</span></td></tr>)}</tbody></table></div>
      </section>

      <section className="gl-section"><h2>Fresh records in the queue</h2><p>The September review found newer 2026 developments in Maryland, Texas and Florida. Maryland&apos;s Arias ruling concerns arbitration and contract formation. Texas has active GoodLeap solar-financing litigation including Quayle. Florida includes both consumer litigation and GoodLeap&apos;s own case against solar-cancellation businesses. These records are being treated according to what the court actually decided, not as findings on unresolved allegations.</p><p><Link className="gl-text-link" href="/cases/titan-solar-power">See the Titan Solar Power record where installer failure and financing overlap →</Link></p></section>

      <section className="gl-section"><h2>Why we call this FLAG</h2><p>FLAG stands for <strong>Financing Litigation &amp; Arbitration involving GoodLeap</strong>. It is an internal editorial shorthand for this research queue. It is not a legal finding.</p></section>
      <section className="gl-help-box"><h2>Need a state checked?</h2><p>Send your state, city or town, and a short description. We can check government, court, licensing, and complaint records.</p><div className="gl-actions"><Link className="gl-button gl-button-primary" href="/#questions">Request free research assistance</Link><Link className="gl-button" href="/goodleap/resources">GoodLeap consumer resources</Link></div></section>
    </div></main>
  </>;
}
