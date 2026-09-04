import type { Metadata } from "next";
import Link from "next/link";

const canonicalUrl = "https://solarcomplaint.com/goodleap/states/minnesota";
const publishedDate = "2026-09-03";
const reviewedDate = "2026-09-03";

export const metadata: Metadata = {
  title: "GoodLeap in Minnesota: Attorney General Solar Loan Case",
  description: "Minnesota GoodLeap solar financing research covering the Attorney General lawsuit, alleged dealer fees, CFPB context, and official consumer resources.",
  alternates: { canonical: "/goodleap/states/minnesota" },
  openGraph: {
    title: "GoodLeap in Minnesota: Attorney General Solar Loan Case",
    description: "Primary-source research on Minnesota's solar-lending case naming GoodLeap and three other lenders.",
    url: "/goodleap/states/minnesota",
    type: "article",
    images: [{ url: "https://solarcomplaint.com/og.png", width: 1200, height: 630, alt: "Solar Consumer Research" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "GoodLeap in Minnesota: Attorney General Solar Loan Case",
    description: "Primary-source research on Minnesota's solar-lending case naming GoodLeap and three other lenders.",
    images: ["https://solarcomplaint.com/og.png"],
  },
};

const sources = [
  {
    title: "Minnesota Attorney General: March 2024 solar-lending lawsuit",
    href: "https://www.ag.state.mn.us/Office/Communications/2024/03/08_SolarLending.asp",
    detail: "Official announcement of State of Minnesota v. GoodLeap LLC, et al., Hennepin County Court File No. 27-CV-24-3558.",
  },
  {
    title: "Minnesota Attorney General: filed complaint",
    href: "https://www.ag.state.mn.us/Office/Communications/2024/docs/SolarLending_Complaint.pdf",
    detail: "Primary court filing containing the State's allegations against GoodLeap and three other solar lenders.",
  },
  {
    title: "CFPB: Solar Financing Issue Spotlight",
    href: "https://www.consumerfinance.gov/data-research/research-reports/issue-spotlight-solar-financing/",
    detail: "Federal analysis of solar-specific lending. The CFPB cites the Minnesota complaint in its discussion of dealer fees.",
  },
  {
    title: "Minnesota Attorney General: file a consumer complaint",
    href: "https://www.ag.state.mn.us/Office/Complaint.asp",
    detail: "Official complaint channel for Minnesota consumers.",
  },
] as const;

export default function GoodLeapMinnesotaPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${canonicalUrl}#article`,
        headline: "GoodLeap in Minnesota: Attorney General Solar Loan Case",
        description: "Primary-source research on Minnesota's solar-lending case naming GoodLeap and three other lenders.",
        url: canonicalUrl,
        mainEntityOfPage: canonicalUrl,
        image: "https://solarcomplaint.com/og.png",
        inLanguage: "en-US",
        datePublished: publishedDate,
        dateModified: reviewedDate,
        author: { "@id": "https://solarcomplaint.com/#publisher" },
        publisher: { "@id": "https://solarcomplaint.com/#publisher" },
        isPartOf: { "@id": "https://solarcomplaint.com/#website" },
        about: [
          { "@type": "Organization", name: "GoodLeap, LLC" },
          { "@type": "Thing", name: "Residential solar financing" },
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://solarcomplaint.com/" },
          { "@type": "ListItem", position: 2, name: "GoodLeap", item: "https://solarcomplaint.com/goodleap" },
          { "@type": "ListItem", position: 3, name: "States", item: "https://solarcomplaint.com/goodleap/states" },
          { "@type": "ListItem", position: 4, name: "Minnesota", item: canonicalUrl },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <main className="gl-main">
        <article className="gl-article">
          <p className="gl-eyebrow">GoodLeap in Minnesota</p>
          <h1>Minnesota&apos;s solar-loan case puts GoodLeap directly in the public record</h1>
          <p className="gl-deck">
            In March 2024, the Minnesota Attorney General sued GoodLeap and three other solar lenders over alleged hidden dealer fees in financed residential solar transactions. The complaint is public, detailed, and later cited by the CFPB.
          </p>
          <div className="gl-review-line">
            <time dateTime={publishedDate}>Published September 3, 2026</time><span>·</span>
            <span>Reviewed against cited sources</span><span>·</span>
            <Link href="/methodology">Methodology</Link><span>·</span>
            <Link href="/corrections">Corrections</Link>
          </div>

          <dl className="gl-key-facts">
            <div><dt>Case</dt><dd>State of Minnesota v. GoodLeap LLC, Sunlight Financial LLC, Solar Mosaic LLC, and Dividend Solar Finance LLC</dd></div>
            <div><dt>Court file</dt><dd>27-CV-24-3558, Hennepin County District Court</dd></div>
            <div><dt>Filed</dt><dd>March 8, 2024</dd></div>
            <div><dt>What this page covers</dt><dd>The State&apos;s allegations, the financing issues it identified, and the official records a Minnesota borrower can review.</dd></div>
          </dl>

          <section className="gl-section" aria-labelledby="mn-case-heading">
            <h2 id="mn-case-heading">What Minnesota alleges</h2>
            <p>
              The <a className="gl-text-link" href="https://www.ag.state.mn.us/Office/Communications/2024/03/08_SolarLending.asp" target="_blank" rel="noreferrer">Attorney General&apos;s announcement</a> says the State sued GoodLeap, Sunlight Financial, Solar Mosaic, and Dividend Solar over the way solar-loan dealer fees were allegedly built into financed prices and disclosed to borrowers.
            </p>
            <p>
              The Attorney General&apos;s summary says its investigation found about $35 million in alleged hidden fees on nearly 5,000 loans financing Minnesota residential solar purchases. Those figures cover the four lender defendants collectively. They are not GoodLeap-only totals.
            </p>
            <p>
              The complaint also matters beyond Minnesota. In 2024, the <a className="gl-text-link" href="https://www.consumerfinance.gov/data-research/research-reports/issue-spotlight-solar-financing/" target="_blank" rel="noreferrer">Consumer Financial Protection Bureau</a> cited the Minnesota case in a broader report on solar-specific lending, dealer fees, tax-credit representations, payment changes, and projected savings.
            </p>
          </section>

          <section className="gl-section" aria-labelledby="mn-why-heading">
            <h2 id="mn-why-heading">Why this record is useful to a homeowner</h2>
            <p>
              The Minnesota case gives consumers something more concrete than a complaint count or online review. It identifies a specific financing theory, names the lenders, and provides a primary filing that can be compared with a borrower&apos;s own paperwork.
            </p>
            <p>If you are reviewing a Minnesota solar loan, the documents most worth putting side by side are:</p>
            <ul className="gl-bullets">
              <li>the original solar proposal and any stated cash price;</li>
              <li>the final amount financed and Truth in Lending disclosure;</li>
              <li>payment schedules, dealer-fee or program-fee references, and later amendments;</li>
              <li>texts, emails, recordings, tax-credit claims, and utility-savings estimates from the sale;</li>
              <li>installer contracts, permits, inspection records, completion documents, and service history.</li>
            </ul>
            <p>
              None of those documents, by itself, proves that the Minnesota Attorney General&apos;s allegations apply to an individual transaction. They are simply the records that make a meaningful comparison possible.
            </p>
          </section>

          <aside className="gl-note">
            <strong>Research note:</strong> the Attorney General&apos;s $35 million and nearly 5,000-loan figures cover the four lender defendants collectively. We do not attribute those totals to GoodLeap alone unless a source isolates GoodLeap&apos;s share.
          </aside>

          <section className="gl-section" aria-labelledby="mn-sources-heading">
            <h2 id="mn-sources-heading">Primary sources</h2>
            <ol className="gl-source-list">
              {sources.map((source) => (
                <li key={source.href}>
                  <a href={source.href} target="_blank" rel="noreferrer">{source.title}</a>
                  <span>{source.detail}</span>
                </li>
              ))}
            </ol>
          </section>

          <section className="gl-help-box" aria-labelledby="mn-help-heading">
            <h2 id="mn-help-heading">Need help researching a Minnesota GoodLeap issue?</h2>
            <p>
              Send your city or town and a short description of what happened. We can help identify public records and official complaint or regulatory resources that may be relevant.
            </p>
            <div className="gl-actions">
              <Link className="gl-button gl-button-primary" href="/#questions">Request free research assistance</Link>
              <Link className="gl-button" href="/states/minnesota">Minnesota solar consumer resources</Link>
              <Link className="gl-button" href="/goodleap/states">GoodLeap state tracker</Link>
            </div>
          </section>
        </article>
      </main>
    </>
  );
}
