import type { Metadata } from "next";
import Link from "next/link";
import "../freedom-hub.css";

const canonicalUrl = "https://solarcomplaint.com/cases/freedom-forever/warning-signs";
const massSmartUrl = "https://www.mass.gov/info-details/smart-compliance-reports-and-audits";
const californiaMinutesUrl = "https://cslb.ca.gov/Resources/BoardMinutes/2024/C1_-_June_13-14%2C_2024_Board_Minutes.pdf";
const californiaOrderUrl = "https://www2.cslb.ca.gov/CompletedPDF/Accusations/N2022-286/N2022-286-20240904-Order.pdf";
const reutersUrl = "https://www.reuters.com/sustainability/climate-energy/us-rooftop-solar-installers-cut-jobs-restructure-homeowner-subsidy-expires-2026-02-05/";
const texasAgUrl = "https://oag.state.tx.us/news/releases/attorney-general-ken-paxton-launches-major-initiative-combat-widespread-fraud-companies-selling";
const bouchyDeclarationUrl = "https://documents.elevenflo.com/uuid_database_8_14_23/12b022c3-419b-40af-90e8-70c48c0d9c2d.pdf";

export const metadata: Metadata = {
  title: "Freedom Forever Complaints & Warning Signs Before Bankruptcy",
  description:
    "Government records, regulatory action, layoffs and market exits that were public before Freedom Forever filed Chapter 11 bankruptcy in April 2026.",
  keywords: [
    "Freedom Forever complaints",
    "Freedom Forever warning signs",
    "Freedom Forever bankruptcy",
    "Freedom Forever lawsuit",
    "Freedom Forever California complaints",
    "Freedom Forever Texas investigation",
    "Freedom Forever layoffs",
    "Freedom Forever out of business",
  ],
  alternates: { canonical: "/cases/freedom-forever/warning-signs" },
  openGraph: {
    title: "Before the Bankruptcy: The Freedom Forever Warning Signs Were Already Public",
    description:
      "A source-backed look at regulatory records, complaints, market exits and layoffs that were public before Freedom Forever filed Chapter 11.",
    url: "/cases/freedom-forever/warning-signs",
    type: "article",
    publishedTime: "2026-09-13",
    modifiedTime: "2026-09-13",
    authors: ["https://solarcomplaint.com/about"],
    section: "Freedom Forever Research",
    images: [{ url: "https://solarcomplaint.com/og.png", width: 1200, height: 630, alt: "Solar Consumer Research" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Freedom Forever Warning Signs Before Bankruptcy",
    description: "The public record before Freedom Forever's April 2026 bankruptcy filing.",
    images: ["https://solarcomplaint.com/og.png"],
  },
};

const sources = [
  { name: "Massachusetts SMART compliance reports and audits", type: "State program record", url: massSmartUrl },
  { name: "California CSLB Board Minutes, June 13-14, 2024", type: "State regulator record", url: californiaMinutesUrl },
  { name: "California CSLB stipulated settlement and disciplinary order", type: "State regulator order", url: californiaOrderUrl },
  { name: "Reuters, Feb. 5, 2026", type: "Independent reporting", url: reutersUrl },
  { name: "Texas Attorney General, Apr. 3, 2026", type: "Attorney General record", url: texasAgUrl },
  { name: "Supplemental Declaration of Brett Bouchy, Docket No. 52, Apr. 23, 2026", type: "Bankruptcy court filing", url: bouchyDeclarationUrl },
];

export default function FreedomForeverWarningSigns() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "NewsArticle",
        "@id": `${canonicalUrl}#article`,
        headline: "Before the Bankruptcy: The Freedom Forever Warning Signs Were Already Public",
        description:
          "Government records, regulatory action, layoffs and market exits that were public before Freedom Forever filed Chapter 11 bankruptcy in April 2026.",
        image: ["https://solarcomplaint.com/og.png"],
        datePublished: "2026-09-13",
        dateModified: "2026-09-13",
        inLanguage: "en-US",
        articleSection: "Freedom Forever Research",
        mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
        isPartOf: [
          { "@id": "https://solarcomplaint.com/#website" },
          { "@type": "CreativeWorkSeries", name: "Freedom Forever Research Series", url: "https://solarcomplaint.com/cases/freedom-forever" },
        ],
        author: { "@type": "Organization", name: "Solar Consumer Research", url: "https://solarcomplaint.com/about" },
        publisher: { "@id": "https://solarcomplaint.com/#publisher" },
        about: { "@type": "Organization", name: "Freedom Forever LLC" },
        mentions: [
          { "@type": "Organization", name: "California Contractors State License Board" },
          { "@type": "GovernmentOrganization", name: "Office of the Attorney General of Texas" },
          { "@type": "Organization", name: "Massachusetts Department of Energy Resources" },
          { "@type": "Organization", name: "GoodLeap" },
          { "@type": "Organization", name: "EnFin" },
        ],
        citation: sources.map((source) => ({ "@type": "CreativeWork", name: source.name, url: source.url })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://solarcomplaint.com/" },
          { "@type": "ListItem", position: 2, name: "Freedom Forever", item: "https://solarcomplaint.com/cases/freedom-forever" },
          { "@type": "ListItem", position: 3, name: "Warning signs before bankruptcy", item: canonicalUrl },
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
          <span aria-current="page">Warning signs</span>
        </nav>

        <p className="ff-article-kicker">Freedom Forever investigation · Story 02 of 06</p>
        <h1>Before the Bankruptcy: The Freedom Forever Warning Signs Were Already Public</h1>
        <p className="ff-article-deck">
          Years before Freedom Forever entered bankruptcy, state regulators had documented compliance issues and contractor complaints. By early 2026, the company was leaving markets and cutting staff. Twelve days before the Chapter 11 filing, the Texas Attorney General publicly named Freedom Forever in a solar-industry investigation.
        </p>
        <div className="ff-article-meta">
          <strong>Solar Consumer Research</strong>
          <span>Published September 13, 2026</span>
          <span>Last reviewed September 13, 2026</span>
          <span>Sources linked inline</span>
        </div>

        <article className="ff-article-body">
          <div className="ff-article-callout">
            <strong>What was public before the bankruptcy?</strong>
            <p>
              Massachusetts recorded earlier compliance warnings. California later put Freedom Forever&apos;s contractor license under formal discipline and three years of probation. Reuters reported major market exits and layoffs in February 2026. On April 3, the Texas Attorney General announced an investigation that included Freedom Forever. The company filed Chapter 11 twelve days later.
            </p>
          </div>

          <p>
            When Freedom Forever filed Chapter 11 on April 15, 2026, the collapse looked sudden to many homeowners. The public record had been building for years.
          </p>
          <p>
            The records came from different agencies and involved different issues. Read together, they show that regulatory scrutiny and business contraction were already visible before the bankruptcy filing.
          </p>

          <h2>What warning signs were public before Freedom Forever filed bankruptcy?</h2>
          <p>
            The clearest public record starts with state compliance and contractor oversight, then shifts to visible business contraction. Massachusetts recorded earlier compliance warnings that Freedom Forever later remedied. California put the company under formal license discipline in 2024. Reuters reported major market exits and layoffs in February 2026. Texas named Freedom Forever in a solar-industry investigation on April 3. Freedom Forever filed Chapter 11 twelve days later.
          </p>

          <h2>January 2023: Massachusetts says earlier compliance issues were remedied</h2>
          <p>
            Massachusetts reviewed low-income solar projects under its SMART program in 2021 and 2022. The state says applicants received a warning for each instance of noncompliance. Applicants with three or more warnings were suspended from submitting new SMART applications for 12 months.
          </p>
          <p>
            Freedom Forever appears on the state&apos;s list of entities that had two or fewer instances and received warnings. <a href={massSmartUrl} target="_blank" rel="noreferrer">Massachusetts says Freedom Forever remedied the identified instances of noncompliance on January 31, 2023.</a>
          </p>
          <p>
            That gives the series an early official record. The state says the identified issues were remedied.
          </p>

          <h2>June 2024: California publicly identifies Freedom Forever as a complaint concern</h2>
          <p>
            At a June 2024 meeting, the California Contractors State License Board discussed Freedom Forever in its public board minutes. <a href={californiaMinutesUrl} target="_blank" rel="noreferrer">The minutes say Freedom Forever was facing an accusation and possible license revocation.</a>
          </p>
          <p>
            The same minutes identify Freedom Forever as one of the companies targeted by CSLB&apos;s Multiple Offender Unit, which focused on solar contractors with a significant number of complaints.
          </p>
          <p>
            This was a public record from the state agency responsible for contractor licensing in California.
          </p>

          <h2>October 2024: California puts the license on three years of probation</h2>
          <p>
            California adopted a stipulated settlement and disciplinary order on September 4, 2024. <a href={californiaOrderUrl} target="_blank" rel="noreferrer">The order took effect October 4.</a>
          </p>
          <p>
            The order revoked Freedom Forever&apos;s California contractor license, stayed the revocation and placed the company on probation for three years. Freedom Forever was required to maintain a $100,000 disciplinary bond or cash deposit and pay $29,747.81 in investigation and enforcement costs.
          </p>
          <p>
            The order also required a Solar Complaint Resolution Program. CSLB estimated that the program would begin with approximately 45 unresolved consumer complaints involving Freedom Forever.
          </p>

          <h2>February 2026: Freedom Forever leaves markets and cuts staff</h2>
          <p>
            By early 2026, the warning signs were no longer limited to regulatory records. <a href={reutersUrl} target="_blank" rel="noreferrer">Reuters reported on February 5</a> that Freedom Forever had left 10 of roughly 30 state markets and reduced its workforce by about 20 percent. Reuters attributed those figures to Freedom Forever policy director Ben Airth.
          </p>
          <p>
            Freedom Forever was still a major national installer. The scale of the pullback made the change visible well beyond one state or one branch.
          </p>
          <p>
            Reuters also placed the cuts inside a broader residential-solar downturn shaped by financing costs, policy changes and the end of the federal homeowner solar tax credit after 2025.
          </p>

          <h2>April 3: Texas Attorney General names Freedom Forever in solar investigation</h2>
          <p>
            On April 3, 2026, the Texas Attorney General announced a solar-industry investigation and said it had issued Civil Investigative Demands to Freedom Forever and several other companies. <a href={texasAgUrl} target="_blank" rel="noreferrer">The Attorney General said the investigation concerned possible deceptive practices involving claimed electricity-bill savings, system performance, equipment, contract terms and company policies.</a>
          </p>
          <p>
            The office said more than 100 complaints had been filed collectively against the companies named in the initiative. The announcement did not assign that total to Freedom Forever alone.
          </p>
          <p>
            Freedom Forever filed Chapter 11 twelve days after the Texas announcement.
          </p>

          <h2>What Freedom Forever later told the bankruptcy court</h2>
          <p>
            The bankruptcy case later added a detailed company account of the financial pressure building before the filing. In an April 23 declaration filed under penalty of perjury, Freedom Forever CEO Brett Bouchy described payment problems with finance companies that he said began in 2024 and accelerated through 2025.
          </p>
          <p>
            <a href={bouchyDeclarationUrl} target="_blank" rel="noreferrer">The declaration says delayed or withheld finance-company payments led to delayed payments to Freedom Forever&apos;s Independent Authorized Dealers.</a> Freedom Forever said dealer attrition then reduced new project originations and revenue, creating a feedback loop that further weakened the business.
          </p>
          <p>
            The declaration identifies EnFin, GoodLeap and other finance partners in Freedom Forever&apos;s account of those payment problems. It also says third-party financing supported the substantial majority of new customer contracts originated through the dealer network.
          </p>

          <div className="ff-article-timeline" aria-label="Freedom Forever warning signs timeline">
            <div><time>Jan. 31, 2023</time><p>Massachusetts says Freedom Forever remedied earlier SMART compliance issues.</p></div>
            <div><time>June 2024</time><p>California CSLB publicly discusses Freedom Forever&apos;s accusation, possible license revocation and Multiple Offender Unit attention.</p></div>
            <div><time>Oct. 4, 2024</time><p>California&apos;s disciplinary order takes effect, with the stayed revocation and three-year probation.</p></div>
            <div><time>Feb. 5, 2026</time><p>Reuters reports 10 market exits and an approximately 20% workforce reduction.</p></div>
            <div><time>Apr. 3, 2026</time><p>Texas names Freedom Forever in a solar-industry investigation.</p></div>
            <div><time>Apr. 15, 2026</time><p>Freedom Forever files Chapter 11 bankruptcy in Delaware.</p></div>
          </div>

          <h2>What homeowners can take from the timeline</h2>
          <p>
            The date a project changed can matter as much as the bankruptcy date. A stalled installation, service problem or financing dispute may have started while Freedom Forever was still operating nationally.
          </p>
          <p>
            Keep the sales agreement, installation contract, financing papers, permits, inspection records, emails and service history together. Identify the company that sold the system, the company that installed it and the company named on any loan, lease or power purchase agreement. They may not be the same company.
          </p>
          <p>
            <Link href="/cases/freedom-forever/what-happened">Story 01 follows what happened next</Link>, from the 2026 market pullback through Chapter 11, the failed sale process and Chapter 7 liquidation. The <Link href="/cases/freedom-forever">Freedom Forever research hub</Link> separates the current paths for unfinished projects, financing, service, warranties and bankruptcy claims.
          </p>

          <section className="ff-article-sources" aria-labelledby="sources-heading">
            <h2 id="sources-heading">Sources used in this article</h2>
            <ol>
              {sources.map((source) => (
                <li key={source.url}>
                  <a href={source.url} target="_blank" rel="noreferrer">{source.name} ↗</a>
                  <span> · {source.type}</span>
                </li>
              ))}
            </ol>
          </section>

          <div className="ff-article-return">
            <span>Freedom Forever research</span>
            <strong>This is Story 02 in the six-part Freedom Forever source project.</strong>
            <Link href="/cases/freedom-forever">Return to the Freedom Forever hub →</Link>
          </div>
        </article>
      </main>
    </div>
  );
}
