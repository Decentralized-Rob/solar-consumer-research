import type { Metadata } from "next";
import Link from "next/link";
import "../freedom-hub.css";

const canonicalUrl = "https://solarcomplaint.com/cases/freedom-forever/what-happened";
const reutersUrl = "https://www.reuters.com/sustainability/climate-energy/us-rooftop-solar-installers-cut-jobs-restructure-homeowner-subsidy-expires-2026-02-05/";
const pvFilingUrl = "https://pv-magazine-usa.com/2026/04/15/residential-solar-company-freedom-forever-files-chapter-11-bankruptcy/";
const solarPowerWorldUrl = "https://www.solarpowerworldonline.com/2026/04/residential-solar-installer-freedom-forever-files-bankruptcy/";
const latitudeUrl = "https://www.latitudemedia.com/news/what-freedom-forevers-bankruptcy-says-about-residential-solar-today/";
const strettoUrl = "https://chapter11cases.com/blogs/news/project-sunshine-freedom-forever-pivots-from-survival-to-sale";
const bloombergLawUrl = "https://news.bloomberglaw.com/environment-and-energy/freedom-forever-to-liquidate-after-insider-sale-effort-collapse";
const chapter7Url = "https://pv-magazine-usa.com/2026/09/09/freedom-forever-bankruptcy-converted-to-chapter-7-liquidation-key-dates-set/";
const courtUrl = "https://www.deb.uscourts.gov/";

export const metadata: Metadata = {
  title: "Freedom Forever Bankruptcy 2026: What Happened Before Chapter 7",
  description:
    "A sourced 2026 Freedom Forever bankruptcy timeline covering market exits, layoffs, Chapter 11, the failed Project Sunshine sale process, and Chapter 7 liquidation.",
  keywords: [
    "what happened to Freedom Forever",
    "Freedom Forever bankruptcy",
    "Freedom Forever bankruptcy 2026",
    "Freedom Forever Chapter 7",
    "Freedom Forever out of business",
    "Freedom Forever liquidation",
    "Freedom Forever solar",
  ],
  alternates: { canonical: "/cases/freedom-forever/what-happened" },
  openGraph: {
    title: "What Happened to Freedom Forever? From National Solar Installer to Chapter 7",
    description: "A 2026 bankruptcy timeline reconstructed from court records and reporting on the warning signs, Chapter 11 filing, failed sale process and Chapter 7 conversion.",
    url: "/cases/freedom-forever/what-happened",
    type: "article",
    publishedTime: "2026-09-09",
    modifiedTime: "2026-09-09",
    authors: ["https://solarcomplaint.com/about"],
    section: "Freedom Forever Research",
    images: [{ url: "https://solarcomplaint.com/og.png", width: 1200, height: 630, alt: "Solar Consumer Research" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "What Happened to Freedom Forever?",
    description: "The 2026 timeline from market exits and layoffs to Chapter 11, a failed sale process and Chapter 7 liquidation.",
    images: ["https://solarcomplaint.com/og.png"],
  },
};

const sources = [
  { name: "Reuters, Feb. 5, 2026", url: reutersUrl },
  { name: "pv magazine USA, Apr. 15, 2026", url: pvFilingUrl },
  { name: "Solar Power World, Apr. 15, 2026", url: solarPowerWorldUrl },
  { name: "Latitude Media, June 1, 2026", url: latitudeUrl },
  { name: "Stretto Intelligence, June 21, 2026", url: strettoUrl },
  { name: "Bloomberg Law, Aug. 4, 2026", url: bloombergLawUrl },
  { name: "pv magazine USA, Sept. 9, 2026", url: chapter7Url },
  { name: "U.S. Bankruptcy Court, District of Delaware", url: courtUrl },
];

export default function FreedomForeverWhatHappened() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "NewsArticle",
        "@id": `${canonicalUrl}#article`,
        headline: "What Happened to Freedom Forever? From National Solar Installer to Chapter 7",
        description:
          "A sourced 2026 bankruptcy timeline covering Freedom Forever's market exits, layoffs, Chapter 11 filing, failed sale process and Chapter 7 liquidation.",
        image: ["https://solarcomplaint.com/og.png"],
        datePublished: "2026-09-09",
        dateModified: "2026-09-09",
        inLanguage: "en-US",
        articleSection: "Freedom Forever Research",
        mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
        isPartOf: { "@id": "https://solarcomplaint.com/#website" },
        author: { "@type": "Organization", name: "Solar Consumer Research", url: "https://solarcomplaint.com/about" },
        publisher: { "@id": "https://solarcomplaint.com/#publisher" },
        about: { "@type": "Organization", name: "Freedom Forever LLC" },
        citation: sources.map((source) => ({ "@type": "CreativeWork", name: source.name, url: source.url })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://solarcomplaint.com/" },
          { "@type": "ListItem", position: 2, name: "Freedom Forever", item: "https://solarcomplaint.com/cases/freedom-forever" },
          { "@type": "ListItem", position: 3, name: "What Happened to Freedom Forever?", item: canonicalUrl },
        ],
      },
    ],
  };

  return (
    <div className="ff-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <main className="ff-article">
        <nav className="ff-article-breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link><span>/</span>
          <Link href="/cases/freedom-forever">Freedom Forever</Link><span>/</span>
          <span aria-current="page">What happened</span>
        </nav>

        <p className="ff-article-kicker">Freedom Forever investigation · Story 01 of 06</p>
        <h1>What Happened to Freedom Forever? From National Solar Installer to Chapter 7</h1>
        <p className="ff-article-deck">
          This 2026 bankruptcy timeline follows the public record from Freedom Forever&apos;s market exits and layoffs through Chapter 11, an unsuccessful sale process and Chapter 7 liquidation.
        </p>
        <div className="ff-article-meta">
          <strong>Solar Consumer Research</strong>
          <span>Published September 9, 2026</span>
          <span>Last reviewed September 9, 2026</span>
          <span>Sources linked inline</span>
        </div>

        <article className="ff-article-body">
          <div className="ff-article-callout">
            <strong>For Freedom Forever customers now</strong>
            <p>
              Freedom Forever is in Chapter 7 liquidation. The attempted sale did not produce a buyer that simply took over the company. An individual homeowner&apos;s loan, lease, PPA, equipment warranty or unfinished installation may still involve a separate finance company, system owner or manufacturer. The <Link href="/cases/freedom-forever">Freedom Forever consumer research hub</Link> is organized around those separate paths.
            </p>
          </div>

          <p>
            Freedom Forever filed for bankruptcy on April 15, 2026, after signs of contraction were already public. On February 5, <a href={reutersUrl} target="_blank" rel="noreferrer">Reuters reported</a> that the company, then described as the nation&apos;s No. 2 residential installer behind Sunrun, had left 10 of roughly 30 state markets and reduced its workforce by about 20%. Reuters attributed those figures to Freedom Forever policy director Ben Airth.
          </p>
          <p>
            The April filing followed that pullback. Freedom Forever was shrinking its footprint while the residential-solar market was dealing with high interest rates, reduced incentives in some states and the end of the federal homeowner solar tax credit after 2025. Reuters placed the company among several installers cutting jobs or restructuring during the same period.
          </p>

          <h2>Freedom Forever&apos;s scale before the bankruptcy</h2>
          <p>
            Founded in 2011, Freedom Forever grew into a large national residential-solar installation platform. <a href={solarPowerWorldUrl} target="_blank" rel="noreferrer">Solar Power World reported</a> when the bankruptcy was filed that the company had installed nearly 2 GW of residential solar and had operated across 35 states, Puerto Rico and Washington, D.C. The publication had ranked Freedom Forever first among residential contractors on its 2025 Top Solar Contractors list by installed kilowatts.
          </p>
          <p>
            <a href={pvFilingUrl} target="_blank" rel="noreferrer">pv magazine USA reported</a>, citing Wood Mackenzie, that Freedom Forever held an estimated 6.1% of the U.S. residential solar market in 2025, second only to Sunrun by that measure.
          </p>
          <p>
            The company&apos;s operating model involved more than one party in many customer transactions. Outside sales organizations could originate projects for Freedom Forever to install, while financing or system ownership could sit with other companies. <a href={latitudeUrl} target="_blank" rel="noreferrer">Latitude Media&apos;s June investigation</a> examined those dealer and third-party ownership relationships as part of its reporting on the collapse.
          </p>

          <h2>February 2026: market exits and layoffs</h2>
          <p>
            Reuters&apos; February 5 report documented the 10-market pullback and roughly 20% workforce reduction more than two months before the bankruptcy filing. The report placed those cuts against a residential-solar market under pressure from financing costs and policy changes.
          </p>
          <p>
            Latitude later interviewed former employees and industry participants. Its June report described branch closures, tighter equipment availability and internal awareness that the business was under stress before April. Latitude also examined the effect of Mosaic&apos;s June 2025 bankruptcy. Mosaic had financed Freedom Forever projects and later appeared as the largest listed creditor in Freedom Forever&apos;s bankruptcy reporting.
          </p>
          <p>
            The reporting points to several pressures before the filing. It does not establish a single court-determined cause of Freedom Forever&apos;s failure.
          </p>

          <h2>April 15: Freedom Forever files Chapter 11</h2>
          <p>
            Freedom Forever filed Chapter 11 in the U.S. Bankruptcy Court for the District of Delaware on April 15, 2026. <a href={pvFilingUrl} target="_blank" rel="noreferrer">pv magazine USA reported from the filing</a> that the company listed estimated assets of $100 million to $500 million and estimated liabilities of $500 million to $1 billion.
          </p>
          <p>
            The creditor disclosures showed extensive ties to the solar-finance and equipment sectors. pv magazine reported roughly $114 million owed to Mosaic Funding, while <a href={solarPowerWorldUrl} target="_blank" rel="noreferrer">Solar Power World reported a Mosaic claim of nearly $120 million</a>. The filings also listed substantial amounts owed to equipment suppliers.
          </p>
          <p>
            Chapter 11 left several outcomes possible. The company could pursue a reorganization, sell assets or seek a plan sponsor under court supervision. At that point, liquidation was not yet the final outcome.
          </p>

          <h2>Project Sunshine: the search for a buyer or plan sponsor</h2>
          <p>
            By June, Freedom Forever was pursuing an accelerated sale process. <a href={strettoUrl} target="_blank" rel="noreferrer">Stretto Intelligence reported</a> that the process, called Project Sunshine, was designed to test two paths: a sale of substantially all assets under section 363 of the Bankruptcy Code or a Chapter 11 plan backed by a sponsor.
          </p>
          <p>
            Stretto reported that no stalking-horse bidder had been selected when the process was proposed. In bankruptcy sales, a stalking-horse bid can establish a baseline transaction before an auction. Freedom Forever entered the process without one already in place.
          </p>
          <p>
            For customers, the absence of a completed transaction meant there was no basis to say another company had taken over Freedom Forever. A later deal could have changed control of assets or projects, but no such takeover had occurred at that stage.
          </p>

          <h2>August: the sale process ends without a transaction</h2>
          <p>
            <a href={bloombergLawUrl} target="_blank" rel="noreferrer">Bloomberg Law reported on August 4</a> that Freedom Forever asked the bankruptcy court to convert the case to Chapter 7 after the sale effort failed and the company said it lacked sufficient funds to continue the Chapter 11 case.
          </p>
          <p>
            Conversion would shift the case from a management-led Chapter 11 process to liquidation administered by a Chapter 7 trustee.
          </p>

          <h2>August 7: Chapter 7 liquidation</h2>
          <p>
            The court converted the case from Chapter 11 to Chapter 7 on August 7, 2026. <a href={chapter7Url} target="_blank" rel="noreferrer">pv magazine USA reported on September 9</a> that Alfred T. Giuliano was appointed Chapter 7 trustee. The <a href={courtUrl} target="_blank" rel="noreferrer">Delaware Bankruptcy Court&apos;s Freedom Forever notice</a> identifies case 26-10522 as converted to Chapter 7 and directs potential creditors to claims information.
          </p>
          <p>
            Freedom Forever therefore did not emerge from Chapter 11 as a reorganized operating company. The attempted sale process also did not produce a buyer that stepped into Freedom Forever&apos;s role as a whole.
          </p>

          <div className="ff-article-timeline" aria-label="Freedom Forever bankruptcy timeline">
            <div><time>Feb. 5, 2026</time><p>Reuters reports that Freedom Forever left 10 state markets and reduced its workforce by about 20%.</p></div>
            <div><time>Apr. 15, 2026</time><p>Freedom Forever files Chapter 11 in Delaware, listing estimated liabilities of $500 million to $1 billion and estimated assets of $100 million to $500 million.</p></div>
            <div><time>June 2026</time><p>Freedom Forever pursues the Project Sunshine process seeking either an asset sale or a Chapter 11 plan sponsor.</p></div>
            <div><time>Aug. 4, 2026</time><p>Freedom Forever asks to convert the case to Chapter 7 after the sale effort fails and the company says it lacks funds to continue Chapter 11.</p></div>
            <div><time>Aug. 7, 2026</time><p>The court converts the case to Chapter 7 liquidation.</p></div>
            <div><time>Sept. 9, 2026</time><p>Current court and bankruptcy reporting detail claims information and orders affecting stranded projects.</p></div>
          </div>

          <h2>What the bankruptcy means for customers now</h2>
          <p>
            Freedom Forever&apos;s corporate status is settled for now: the company is in Chapter 7 liquidation. Customer-specific questions are more complicated. A solar loan, lease, PPA, manufacturer warranty, unfinished installation or service issue can involve companies other than Freedom Forever.
          </p>
          <p>
            September bankruptcy reporting says several former financing or project partners obtained court relief allowing them to pursue contractual remedies involving stranded projects. The effect depends on the homeowner&apos;s actual agreements and project status, so those developments are being tracked separately from this corporate timeline.
          </p>
          <p>
            Homeowners can use the <Link href="/cases/freedom-forever">Freedom Forever consumer research hub</Link> to match the names on their sales contract, installation paperwork and financing documents with the relevant research path before assuming which company controls the next step.
          </p>

          <section className="ff-article-sources" aria-labelledby="sources-heading">
            <h2 id="sources-heading">Sources used in this article</h2>
            <ol>
              {sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.name} ↗</a></li>)}
            </ol>
          </section>

          <div className="ff-article-return">
            <span>Freedom Forever research</span>
            <strong>This is Story 01 in the six-part Freedom Forever source project.</strong>
            <Link href="/cases/freedom-forever">Return to the Freedom Forever hub →</Link>
          </div>
        </article>
      </main>
    </div>
  );
}
