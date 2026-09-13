import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import "./freedom-hub.css";
import "./freedom-hub-redesign.css";

const canonicalUrl = "https://solarcomplaint.com/cases/freedom-forever";
const courtUrl = "https://www.deb.uscourts.gov/";
const currentBankruptcyReport = "https://pv-magazine-usa.com/2026/09/09/freedom-forever-bankruptcy-converted-to-chapter-7-liquidation-key-dates-set/";
const texasAgUrl = "https://oag.state.tx.us/news/releases/attorney-general-ken-paxton-launches-major-initiative-combat-widespread-fraud-companies-selling";
const californiaOrderUrl = "https://www2.cslb.ca.gov/CompletedPDF/Accusations/N2022-286/N2022-286-20240904-Order.pdf";
const massSmartUrl = "https://www.mass.gov/info-details/smart-compliance-reports-and-audits";
const reutersUrl = "https://www.reuters.com/sustainability/climate-energy/us-rooftop-solar-installers-cut-jobs-restructure-homeowner-subsidy-expires-2026-02-05/";

export const metadata: Metadata = {
  title: "Freedom Forever Bankruptcy & Customer Help | Chapter 7 Tracker",
  description:
    "Freedom Forever bankruptcy status, Chapter 7 deadlines, stranded solar project paths, financing-partner developments, regulatory records, and source-backed customer research.",
  keywords: [
    "Freedom Forever bankruptcy",
    "Freedom Forever Chapter 7",
    "Freedom Forever customer help",
    "Freedom Forever solar bankruptcy",
    "Freedom Forever warranty",
    "Freedom Forever GoodLeap",
    "Freedom Forever Sunrun",
    "Freedom Forever proof of claim",
  ],
  alternates: { canonical: "/cases/freedom-forever" },
  openGraph: {
    title: "Freedom Forever Bankruptcy & Customer Help",
    description:
      "A source-backed consumer research hub for Freedom Forever's Chapter 7 bankruptcy, unfinished projects, financing partners, deadlines and regulatory records.",
    url: "/cases/freedom-forever",
    type: "website",
    images: [{ url: "https://solarcomplaint.com/og.png", width: 1200, height: 630, alt: "Solar Consumer Research" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Freedom Forever Bankruptcy & Customer Help",
    description: "Chapter 7 status, unfinished projects, financing partners, deadlines and source-backed customer research.",
    images: ["https://solarcomplaint.com/og.png"],
  },
};

const stories = [
  {
    number: "01",
    label: "Report",
    title: "What Happened to Freedom Forever? From National Solar Installer to Chapter 7",
    published: "September 9, 2026",
    href: "/cases/freedom-forever/what-happened",
  },
  {
    number: "02",
    label: "Investigation",
    title: "Before the Bankruptcy: The Freedom Forever Warning Signs Were Already Public",
    published: "September 13, 2026",
    href: "/cases/freedom-forever/warning-signs",
  },
  {
    number: "03",
    label: "Report",
    title: "Freedom Forever Solar Loans: Years of Homeowner Disputes Before the Collapse",
  },
  {
    number: "04",
    label: "Investigation",
    title: "Inside the Freedom Forever Dealer Network: Who Actually Sold the Solar System?",
  },
  {
    number: "05",
    label: "Report",
    title: "Freedom Forever Customers Left With Installed Solar That Was Never Turned On",
  },
  {
    number: "06",
    label: "Report",
    title: "After Freedom Forever: GoodLeap, Sunrun, EverBright and Stranded Projects",
  },
];

const sources = [
  { type: "Official court", title: "U.S. Bankruptcy Court, District of Delaware", copy: "Current court notice for Freedom Forever case 26-10522 and claims information.", href: courtUrl },
  { type: "Current reporting", title: "Chapter 7 conversion and stranded-project orders", copy: "September 9 reporting on conversion, deadlines and financing-partner relief.", href: currentBankruptcyReport },
  { type: "State regulator", title: "California CSLB disciplinary order", copy: "Stipulated settlement and disciplinary order involving Freedom Forever's California contractor license.", href: californiaOrderUrl },
  { type: "Attorney General", title: "Texas solar investigation", copy: "Texas Attorney General announcement naming Freedom Forever among companies receiving civil investigative demands.", href: texasAgUrl },
  { type: "State program", title: "Massachusetts SMART compliance record", copy: "Massachusetts records showing prior warnings that were later remedied.", href: massSmartUrl },
];

const financePartners = ["Credit Human", "EnFin", "EverBright", "GoodLeap", "Participate", "Project Solar", "Sunrun"];

function ExternalLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return <a className={className} href={href} target="_blank" rel="noreferrer">{children}</a>;
}

function Chevron() {
  return <span className="ffr-chevron" aria-hidden="true">›</span>;
}

export default function FreedomForeverHub() {
  const preferredSourceAttributes = {
    "google-add-preferred-source-btn": "",
    "data-theme": "light",
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: "Freedom Forever Bankruptcy & Customer Help",
        description:
          "Source-backed consumer research covering Freedom Forever's Chapter 7 bankruptcy, unfinished solar projects, financing partners, regulatory records and customer-help paths.",
        inLanguage: "en-US",
        dateModified: "2026-09-13",
        isPartOf: { "@id": "https://solarcomplaint.com/#website" },
        publisher: { "@id": "https://solarcomplaint.com/#publisher" },
        about: { "@type": "Organization", name: "Freedom Forever LLC" },
        citation: sources.map((source) => ({ "@type": "CreativeWork", name: source.title, url: source.href })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://solarcomplaint.com/" },
          { "@type": "ListItem", position: 2, name: "Research", item: "https://solarcomplaint.com/research" },
          { "@type": "ListItem", position: 3, name: "Freedom Forever", item: canonicalUrl },
        ],
      },
      {
        "@type": "ItemList",
        "@id": `${canonicalUrl}#research-series`,
        name: "Freedom Forever research series",
        itemListElement: stories.map((story, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: story.title,
          ...(story.href ? { url: `https://solarcomplaint.com${story.href}` } : {}),
        })),
      },
    ],
  };

  return (
    <div className="ff-shell ffr-shell" id="top">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <a className="ffr-assistance" href="/#questions">
        Need help with a solar issue? <strong>Free research assistance</strong> <span aria-hidden="true">→</span>
      </a>

      <header className="ffr-header">
        <Link className="ffr-wordmark" href="/" aria-label="SolarComplaint home">
          <Image src="/brand/solarcomplaint.svg" alt="" width={650} height={110} priority unoptimized />
        </Link>

        <details className="ffr-menu">
          <summary aria-label="Open site menu"><span aria-hidden="true">☰</span><span className="ffr-menu-label">Menu</span></summary>
          <div className="ffr-menu-panel">
            <div className="ffr-menu-top">
              <Link href="/" aria-label="SolarComplaint home">
                <Image src="/brand/solarcomplaint.svg" alt="" width={650} height={110} unoptimized />
              </Link>
              <span>Close ×</span>
            </div>

            <nav aria-label="Site navigation">
              <details open>
                <summary>Research <span>⌃</span></summary>
                <div>
                  <Link href="/research">Latest research</Link>
                  <Link href="/companies/sunrun">Sunrun Research</Link>
                  <Link href="/cases/freedom-forever">Freedom Forever</Link>
                  <Link href="/cases/titan-solar-power">Titan Solar Power</Link>
                </div>
              </details>
              <Link className="ffr-menu-row" href="/resources">States <Chevron /></Link>
              <details>
                <summary>Guides &amp; Resources <span>⌄</span></summary>
                <div>
                  <Link href="/federal-resources">Federal resources</Link>
                  <Link href="/guides">Consumer guides</Link>
                </div>
              </details>
              <Link className="ffr-menu-row" href="/#questions">Ask SolarComplaint <Chevron /></Link>
              <Link className="ffr-menu-row" href="/about">About <Chevron /></Link>
            </nav>

            <div className="ffr-menu-feature">
              <span>Featured research</span>
              <strong>Freedom Forever</strong>
              <p>2 of 6 stories published</p>
              <Link href="/cases/freedom-forever/warning-signs">Read the latest investigation →</Link>
            </div>
          </div>
        </details>
      </header>

      <main className="ffr-main">
        <nav className="ffr-breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link><span>›</span><Link href="/research">Research</Link><span>›</span><span aria-current="page">Freedom Forever</span>
        </nav>

        <section className="ffr-intro">
          <p className="ffr-eyebrow">Freedom Forever research center</p>
          <h1>Freedom Forever</h1>
          <p className="ffr-intro-deck">Source-backed research on the bankruptcy, unfinished projects, financing companies, regulatory actions and what happened before the collapse.</p>
          <div className="ffr-status" aria-label="Current Freedom Forever bankruptcy status">
            <strong>Chapter 7 liquidation</strong>
            <span>Case 26-10522</span>
            <span>Claim deadline: Oct. 16, 2026</span>
          </div>
          <p className="ffr-reviewed">Last reviewed September 13, 2026</p>
        </section>

        <section className="ffr-editorial" aria-label="Freedom Forever research and reporting">
          <ExternalLink className="ffr-lead" href={currentBankruptcyReport}>
            <span className="ffr-story-label">Update</span>
            <h2>Freedom Forever is now in Chapter 7 liquidation</h2>
            <p>The case was converted from Chapter 11 to Chapter 7. Current court information identifies claims deadlines and the Chapter 7 trustee.</p>
            <div><time dateTime="2026-09-09">Sep. 9, 2026</time><b>Read update ↗</b></div>
          </ExternalLink>

          <Link className="ffr-story" href="/cases/freedom-forever/what-happened">
            <span className="ffr-story-label">Report</span>
            <h2>What Happened to Freedom Forever? From National Solar Installer to Chapter 7</h2>
            <p>A sourced timeline of market exits, layoffs, Chapter 11, the failed sale process and Chapter 7 liquidation.</p>
            <div><time dateTime="2026-09-09">Sep. 9, 2026</time><b>Read report →</b></div>
          </Link>

          <Link className="ffr-story" href="/cases/freedom-forever/warning-signs">
            <span className="ffr-story-label">Investigation</span>
            <h2>Before the Bankruptcy: The Freedom Forever Warning Signs Were Already Public</h2>
            <p>Government records, regulatory action, market exits and layoffs that were public before the April 2026 bankruptcy filing.</p>
            <div><time dateTime="2026-09-13">Sep. 13, 2026</time><b>Read investigation →</b></div>
          </Link>
        </section>

        <section className="ffr-router" aria-labelledby="ffr-situation-title">
          <h2 id="ffr-situation-title">What are you dealing with?</h2>
          <p>Jump to the part of the research record that matches your situation.</p>
          <div className="ffr-link-list">
            <a href="#project-guidance"><span>Installation stopped</span><Chevron /></a>
            <a href="#project-guidance"><span>Installed, not operating</span><Chevron /></a>
            <a href="#warranty-service"><span>Service or warranty issue</span><Chevron /></a>
            <a href="#finance-partners"><span>Financing or payment problem</span><Chevron /></a>
            <a href="#bankruptcy-record"><span>Money, deposit or refund owed</span><Chevron /></a>
          </div>
        </section>

        <section className="ffr-router" aria-labelledby="ffr-research-title">
          <h2 id="ffr-research-title">Research Freedom Forever</h2>
          <p>Open the records, reporting and source material behind the hub.</p>
          <div className="ffr-link-list">
            <a href="#bankruptcy-record"><span>Bankruptcy &amp; court records</span><Chevron /></a>
            <a href="#finance-partners"><span>Financing partners</span><Chevron /></a>
            <a href="#regulatory-record"><span>Regulatory actions</span><Chevron /></a>
            <a href="#research-series"><span>Full six-story research series</span><Chevron /></a>
            <a href="#source-desk"><span>Key documents &amp; sources</span><Chevron /></a>
          </div>
        </section>

        <section className="ffr-updates" aria-labelledby="ffr-updates-title">
          <div className="ffr-section-title-row">
            <h2 id="ffr-updates-title">Latest Freedom Forever updates</h2>
            <Link href="/updates">View all →</Link>
          </div>
          <Link href="/cases/freedom-forever/warning-signs"><time>Sep. 13</time><span>Investigation published: the warning signs before bankruptcy</span><Chevron /></Link>
          <ExternalLink href={currentBankruptcyReport}><time>Sep. 9</time><span>Chapter 7 status, claims information and stranded-project orders updated</span><Chevron /></ExternalLink>
          <Link href="/cases/freedom-forever/what-happened"><time>Sep. 9</time><span>Report published: What Happened to Freedom Forever?</span><Chevron /></Link>
        </section>

        <section className="ffr-record" aria-labelledby="ffr-record-title">
          <div className="ffr-section-title-row">
            <h2 id="ffr-record-title">Detailed research record</h2>
          </div>

          <details id="bankruptcy-record">
            <summary><span>Bankruptcy &amp; court record</span><span>+</span></summary>
            <div className="ffr-detail-body">
              <p><strong>Current status:</strong> Chapter 7 liquidation, U.S. Bankruptcy Court for the District of Delaware, case 26-10522.</p>
              <p>Current reporting identifies October 16, 2026 as the proof-of-claim deadline for standard creditors, former employees and customers with certain unfulfilled deposits or warranty claims.</p>
              <p><ExternalLink href={courtUrl}>Open the court notice ↗</ExternalLink> <ExternalLink href={currentBankruptcyReport}>Read the current bankruptcy update ↗</ExternalLink></p>
            </div>
          </details>

          <details id="project-guidance">
            <summary><span>Unfinished and stranded projects</span><span>+</span></summary>
            <div className="ffr-detail-body">
              <p>Start by matching the company names on the sales agreement, installation paperwork and financing documents. Freedom Forever may have been the installer while a separate dealer, lender, lease company or PPA owner controls another part of the project.</p>
              <p>For a project that never started or never reached permission to operate, keep permits, inspection records, equipment information and communications together before contacting the companies still attached to the project.</p>
            </div>
          </details>

          <details id="finance-partners">
            <summary><span>Financing partners</span><span>+</span></summary>
            <div className="ffr-detail-body">
              <p>September 9 bankruptcy reporting identifies former financing or project partners including {financePartners.join(", ")}. The report says the court authorized contractual remedies related to stranded projects. The effect depends on the homeowner&apos;s actual agreement.</p>
              <p><ExternalLink href={currentBankruptcyReport}>Read the source reporting ↗</ExternalLink></p>
            </div>
          </details>

          <details id="warranty-service">
            <summary><span>Warranty &amp; service</span><span>+</span></summary>
            <div className="ffr-detail-body">
              <p>Installer closure does not automatically determine whether panel, inverter or battery manufacturer coverage still exists. Separate Freedom Forever&apos;s workmanship or production promises from the equipment manufacturer&apos;s warranty.</p>
              <p>Keep model numbers, contracts, service tickets, inspection failures, permission-to-operate records and photos together.</p>
            </div>
          </details>

          <details id="regulatory-record">
            <summary><span>Regulatory actions</span><span>+</span></summary>
            <div className="ffr-detail-body ffr-source-links">
              <ExternalLink href={californiaOrderUrl}><strong>California CSLB disciplinary order</strong><span>Official contractor-license record ↗</span></ExternalLink>
              <ExternalLink href={texasAgUrl}><strong>Texas Attorney General solar investigation</strong><span>Official AG announcement ↗</span></ExternalLink>
              <ExternalLink href={massSmartUrl}><strong>Massachusetts SMART compliance history</strong><span>Official state program record ↗</span></ExternalLink>
            </div>
          </details>

          <details id="research-series">
            <summary><span>Freedom Forever research series</span><span>+</span></summary>
            <div className="ffr-detail-body ffr-series-list">
              {stories.map((story) => story.href ? (
                <Link href={story.href} key={story.number}>
                  <span>{story.number}</span><div><small>{story.label} · Published {story.published}</small><strong>{story.title}</strong></div><Chevron />
                </Link>
              ) : (
                <div className="ffr-series-planned" key={story.number}>
                  <span>{story.number}</span><div><small>{story.label} · Research queue</small><strong>{story.title}</strong></div><span>Planned</span>
                </div>
              ))}
            </div>
          </details>

          <details id="source-desk">
            <summary><span>Key documents &amp; sources</span><span>+</span></summary>
            <div className="ffr-detail-body ffr-source-links">
              {sources.map((source) => (
                <ExternalLink href={source.href} key={source.title}>
                  <strong>{source.title}</strong>
                  <span>{source.type} · {source.copy} ↗</span>
                </ExternalLink>
              ))}
              <ExternalLink href={reutersUrl}><strong>Reuters, February 5, 2026</strong><span>Market exits and workforce reduction reporting ↗</span></ExternalLink>
            </div>
          </details>
        </section>

        <section className="ffr-preferred" id="preferred-source">
          <div>
            <p>Follow this reporting in Google</p>
            <h2>Choose SolarComplaint.com as a Preferred Source.</h2>
          </div>
          <div className="ffr-preferred-action">
            <div {...preferredSourceAttributes} />
          </div>
        </section>
      </main>

      <footer className="ffr-footer">
        <strong>SolarComplaint</strong>
        <p>Independent consumer research. General information only; not legal or financial advice.</p>
        <div><Link href="/about">About</Link><Link href="/methodology">Methodology</Link><Link href="/corrections">Corrections</Link><a href="#top">Back to top ↑</a></div>
      </footer>
    </div>
  );
}
