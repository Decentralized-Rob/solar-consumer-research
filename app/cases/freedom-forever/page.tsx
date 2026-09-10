import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import "./freedom-hub.css";

const canonicalUrl = "https://solarcomplaint.com/cases/freedom-forever";
const courtUrl = "https://www.deb.uscourts.gov/";
const currentBankruptcyReport = "https://pv-magazine-usa.com/2026/09/09/freedom-forever-bankruptcy-converted-to-chapter-7-liquidation-key-dates-set/";
const texasAgUrl = "https://oag.state.tx.us/news/releases/attorney-general-ken-paxton-launches-major-initiative-combat-widespread-fraud-companies-selling";
const californiaOrderUrl = "https://www2.cslb.ca.gov/CompletedPDF/Accusations/N2022-286/N2022-286-20240904-Order.pdf";
const massSmartUrl = "https://www.mass.gov/info-details/smart-compliance-reports-and-audits";

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

const situationCards = [
  { title: "Installation never started", copy: "Identify the seller, installer and finance company before deciding which record or claim path applies.", href: "#project-status" },
  { title: "Panels installed, no PTO", copy: "Check the financing or system-owner relationship and whether another contractor can complete inspection and permission to operate.", href: "#finance-partners" },
  { title: "System needs service", copy: "Separate equipment-manufacturer coverage from Freedom Forever workmanship or production-guarantee questions.", href: "#warranty-service" },
  { title: "Roof or workmanship issue", copy: "Preserve contracts, permits, photos, inspection records and contractor-license information before escalating.", href: "#regulatory-record" },
  { title: "Loan or financing problem", copy: "Start with the company named on the financing agreement. The installer, dealer and lender may be different companies.", href: "#finance-partners" },
  { title: "Refund or payment owed", copy: "A money claim against Freedom Forever may intersect with the bankruptcy. Verify the current court deadline before acting.", href: "#bankruptcy-status" },
  { title: "Warranty question", copy: "Determine whether the obligation belongs to Freedom Forever or to the manufacturer of the inverter, panels or battery.", href: "#warranty-service" },
  { title: "Not sure who sold it", copy: "Freedom Forever used dealer relationships. The sales company on your paperwork may not be the installer or finance company.", href: "#dealer-model" },
];

const financePartners = ["Credit Human", "EnFin", "EverBright", "GoodLeap", "Participate", "Project Solar", "Sunrun"];

const stories = [
  {
    number: "01",
    title: "What Happened to Freedom Forever? From National Solar Installer to Chapter 7",
    status: "Published",
    href: "/cases/freedom-forever/what-happened",
  },
  {
    number: "02",
    title: "Before the Bankruptcy: The Freedom Forever Warning Signs Were Already Public",
    status: "Research queue",
  },
  {
    number: "03",
    title: "Freedom Forever Solar Loans: Years of Homeowner Disputes Before the Collapse",
    status: "Research queue",
  },
  {
    number: "04",
    title: "Inside the Freedom Forever Dealer Network: Who Actually Sold the Solar System?",
    status: "Research queue",
  },
  {
    number: "05",
    title: "Freedom Forever Customers Left With Installed Solar That Was Never Turned On",
    status: "Research queue",
  },
  {
    number: "06",
    title: "After Freedom Forever: GoodLeap, Sunrun, EverBright and Stranded Projects",
    status: "Research queue",
  },
];

const sources = [
  { type: "Official court", title: "U.S. Bankruptcy Court, District of Delaware", copy: "Current court notice for Freedom Forever case 26-10522 and claims information.", href: courtUrl },
  { type: "Current reporting", title: "Chapter 7 conversion and stranded-project orders", copy: "September 9 reporting on conversion, deadlines and financing-partner relief.", href: currentBankruptcyReport },
  { type: "State regulator", title: "California CSLB disciplinary order", copy: "Stipulated settlement and disciplinary order involving Freedom Forever's California contractor license.", href: californiaOrderUrl },
  { type: "Attorney General", title: "Texas solar investigation", copy: "Texas Attorney General announcement naming Freedom Forever among companies receiving civil investigative demands.", href: texasAgUrl },
  { type: "State program", title: "Massachusetts SMART compliance record", copy: "Massachusetts records showing prior warnings that were later remedied.", href: massSmartUrl },
];

function ExternalLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return <a className={className} href={href} target="_blank" rel="noreferrer">{children}</a>;
}

export default function FreedomForeverHub() {
  const preferredSourceAttributes = {
    "google-add-preferred-source-btn": "",
    "data-theme": "light",
    "data-lang": "en",
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
        dateModified: "2026-09-09",
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
          { "@type": "ListItem", position: 2, name: "Freedom Forever", item: canonicalUrl },
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
    <div className="ff-shell" id="top">
      <Script src="https://news.google.com/swg/js/v1/publisher.js" strategy="afterInteractive" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <header className="ff-header">
        <Link href="/" aria-label="Solar Consumer Research home">
          <Image src="/brand/solar-consumer-research.svg" alt="" width={690} height={104} priority unoptimized />
        </Link>
        <nav aria-label="Freedom Forever page navigation">
          <a href="#project-status">Start here</a>
          <a href="#bankruptcy-status">Bankruptcy</a>
          <a href="#featured-investigation">Investigation</a>
          <a href="#source-desk">Sources</a>
          <a className="ff-header-cta" href="#preferred-source">Follow our reporting</a>
        </nav>
      </header>

      <main>
        <section className="ff-hero">
          <div className="ff-kicker"><span>Freedom Forever consumer research</span><i /><span>Last reviewed September 9, 2026</span></div>
          <div className="ff-hero-grid">
            <div>
              <div className="ff-status-pill"><span /> Chapter 7 liquidation</div>
              <h1>Freedom Forever is in Chapter 7. The next step depends on where your project stopped.</h1>
              <p className="ff-deck">
                A source-backed research hub for homeowners sorting out unfinished installations, financing, service, warranties, bankruptcy claims and the companies now involved.
              </p>
              <div className="ff-actions">
                <a className="ff-button ff-button-primary" href="#project-status">Find your situation</a>
                <Link className="ff-button ff-button-secondary" href="/cases/freedom-forever/what-happened">Read what happened</Link>
              </div>
            </div>
            <aside className="ff-status-card" aria-label="Current Freedom Forever bankruptcy status">
              <p>Current case status</p>
              <dl>
                <div><dt>Case</dt><dd>26-10522</dd></div>
                <div><dt>Chapter</dt><dd>7 liquidation</dd></div>
                <div><dt>Court</dt><dd>District of Delaware</dd></div>
                <div><dt>Creditors meeting</dt><dd>Sept. 22, 2026</dd></div>
                <div><dt>Claim deadline</dt><dd>Oct. 16, 2026</dd></div>
              </dl>
              <ExternalLink href={courtUrl}>Open the court notice <span>↗</span></ExternalLink>
            </aside>
          </div>
        </section>

        <section className="ff-deadline" id="bankruptcy-status" aria-label="Bankruptcy deadline notice">
          <div><span>Active deadline</span><strong>October 16, 2026</strong></div>
          <p>
            The Delaware Bankruptcy Court is directing potential Freedom Forever creditors who have not filed a claim to its claims information page. Current reporting identifies October 16 as the proof-of-claim deadline for standard creditors, former employees and customers with certain unfulfilled deposits or warranty claims.
          </p>
          <div className="ff-deadline-links">
            <ExternalLink href={courtUrl}>Court notice ↗</ExternalLink>
            <ExternalLink href={currentBankruptcyReport}>Deadline reporting ↗</ExternalLink>
          </div>
        </section>

        <section className="ff-section" id="project-status">
          <div className="ff-section-heading">
            <div><p>Start here</p><h2>What happened to your project?</h2></div>
            <span>The useful question is not just whether Freedom Forever went bankrupt. It is which company controls the next step in your specific project.</span>
          </div>
          <div className="ff-situation-grid">
            {situationCards.map((item) => (
              <a href={item.href} className="ff-situation-card" key={item.title}>
                <span>Research path</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
                <b>Go to the relevant section →</b>
              </a>
            ))}
          </div>
        </section>

        <section className="ff-section ff-featured" id="featured-investigation">
          <div className="ff-featured-label"><span>Featured investigation</span><b>Story 01 of 06</b></div>
          <div className="ff-featured-grid">
            <div>
              <p className="ff-eyebrow">Published September 9, 2026</p>
              <h2>What Happened to Freedom Forever?</h2>
              <p className="ff-featured-deck">From national solar installer to Chapter 11, a failed sale process and Chapter 7 liquidation.</p>
              <p>
                The story begins before the bankruptcy filing. Reuters documented market exits and layoffs in February. Bankruptcy records then showed a company carrying far more estimated liabilities than assets. A later sale process failed to produce a buyer or restructuring sponsor.
              </p>
              <Link className="ff-button ff-button-primary" href="/cases/freedom-forever/what-happened">Read the investigation</Link>
            </div>
            <aside>
              <span>Why this story is first</span>
              <p>Its core chronology is largely settled, making it the best anchor article while newer customer and court developments continue to change.</p>
              <div className="ff-source-stack">
                <ExternalLink href="https://www.reuters.com/sustainability/climate-energy/us-rooftop-solar-installers-cut-jobs-restructure-homeowner-subsidy-expires-2026-02-05/">Reuters · Feb. 5 ↗</ExternalLink>
                <ExternalLink href="https://www.solarpowerworldonline.com/2026/04/residential-solar-installer-freedom-forever-files-bankruptcy/">Solar Power World · Apr. 15 ↗</ExternalLink>
                <ExternalLink href="https://www.latitudemedia.com/news/what-freedom-forevers-bankruptcy-says-about-residential-solar-today/">Latitude Media · June 1 ↗</ExternalLink>
                <ExternalLink href="https://chapter11cases.com/blogs/news/project-sunshine-freedom-forever-pivots-from-survival-to-sale">Stretto Intelligence · June 21 ↗</ExternalLink>
              </div>
            </aside>
          </div>
        </section>

        <section className="ff-section" id="research-series">
          <div className="ff-section-heading">
            <div><p>Freedom Forever series</p><h2>Six stories, one growing source record.</h2></div>
            <span>The feature position will rotate as newer investigations publish. Older stories remain live, indexed and linked from this hub.</span>
          </div>
          <div className="ff-story-list">
            {stories.map((story) => {
              const content = (
                <>
                  <span className="ff-story-number">{story.number}</span>
                  <div><small>{story.status}</small><h3>{story.title}</h3></div>
                  <b>{story.href ? "Read →" : "Planned"}</b>
                </>
              );
              return story.href ? <Link className="ff-story-row ff-story-live" href={story.href} key={story.number}>{content}</Link> : <div className="ff-story-row" key={story.number}>{content}</div>;
            })}
          </div>
        </section>

        <section className="ff-section ff-muted" id="finance-partners">
          <div className="ff-section-heading">
            <div><p>Stranded projects</p><h2>Financing partners are part of the next chapter.</h2></div>
            <span>September 9 reporting says the bankruptcy court granted former financing partners relief allowing contractual remedies on unfinished projects. The exact path still depends on the homeowner&apos;s agreement.</span>
          </div>
          <div className="ff-partner-grid">
            {financePartners.map((partner) => <div className="ff-partner" key={partner}><span>Reported finance / project partner</span><strong>{partner}</strong></div>)}
          </div>
          <p className="ff-source-note">
            Source: <ExternalLink href={currentBankruptcyReport}>pv magazine USA, September 9, 2026 ↗</ExternalLink>. The report says the court authorized these companies to pursue contractual remedies related to stranded projects. This hub does not assume the same remedy applies to every homeowner.
          </p>
        </section>

        <section className="ff-section" id="dealer-model">
          <div className="ff-section-heading">
            <div><p>Know the roles</p><h2>The company that sold it may not be the company that financed it.</h2></div>
            <span>Freedom Forever operated with dealer relationships and third-party financing. That makes document matching essential after the installer disappears.</span>
          </div>
          <div className="ff-role-flow" aria-label="Typical Freedom Forever project roles">
            <div><small>Sales</small><strong>Dealer / sales organization</strong><p>May be the company or representative that first contacted the homeowner.</p></div>
            <i>→</i>
            <div><small>Installation</small><strong>Freedom Forever</strong><p>Installer / EPC role on many projects.</p></div>
            <i>→</i>
            <div><small>Money / ownership</small><strong>Lender or system owner</strong><p>May control financing, lease, PPA or post-bankruptcy project decisions.</p></div>
          </div>
          <p className="ff-source-note">The dealer structure is documented in Freedom Forever&apos;s historical dealer materials and bankruptcy reporting. A dedicated dealer-network investigation is part of this series.</p>
        </section>

        <section className="ff-section" id="warranty-service">
          <div className="ff-section-heading">
            <div><p>Warranty and service</p><h2>Separate Freedom Forever promises from manufacturer coverage.</h2></div>
            <span>Installer closure does not automatically answer whether a panel, inverter or battery manufacturer warranty still exists.</span>
          </div>
          <div className="ff-checklist">
            <div><b>01</b><p>Find the equipment manufacturer and model numbers.</p></div>
            <div><b>02</b><p>Locate the Freedom Forever contract and any production-guarantee language.</p></div>
            <div><b>03</b><p>Identify the lender, lease company or PPA owner separately.</p></div>
            <div><b>04</b><p>Keep service tickets, inspection failures, PTO records and photos together.</p></div>
          </div>
        </section>

        <section className="ff-section ff-regulatory" id="regulatory-record">
          <div className="ff-section-heading">
            <div><p>Regulatory record</p><h2>Official records predate the bankruptcy.</h2></div>
            <span>These are government records, not crowdsourced complaints. Each state action has a different posture and should be read on its own terms.</span>
          </div>
          <div className="ff-reg-grid">
            <ExternalLink href={californiaOrderUrl} className="ff-reg-card"><small>California</small><h3>Contractor disciplinary order</h3><p>CSLB stipulated settlement and disciplinary order involving Freedom Forever&apos;s contractor license.</p><b>Open official order ↗</b></ExternalLink>
            <ExternalLink href={texasAgUrl} className="ff-reg-card"><small>Texas</small><h3>2026 solar investigation</h3><p>The Attorney General named Freedom Forever among companies receiving Civil Investigative Demands.</p><b>Open AG announcement ↗</b></ExternalLink>
            <ExternalLink href={massSmartUrl} className="ff-reg-card"><small>Massachusetts</small><h3>SMART compliance history</h3><p>State records say Freedom Forever previously received warnings and remedied the identified instances by January 31, 2023.</p><b>Open state record ↗</b></ExternalLink>
          </div>
        </section>

        <section className="ff-section ff-source-desk" id="source-desk">
          <div className="ff-section-heading">
            <div><p>Source desk</p><h2>Start with the record, then read the reporting.</h2></div>
            <span>The hub distinguishes court and government records from reporting and company statements. New articles will cite sources inline where the factual claim appears.</span>
          </div>
          <div className="ff-source-grid">
            {sources.map((source, index) => (
              <ExternalLink className="ff-source-card" href={source.href} key={source.title}>
                <b>{String(index + 1).padStart(2, "0")}</b>
                <small>{source.type}</small>
                <h3>{source.title}</h3>
                <p>{source.copy}</p>
                <span>Open source ↗</span>
              </ExternalLink>
            ))}
          </div>
        </section>

        <section className="ff-preferred" id="preferred-source">
          <div>
            <p>Follow this reporting in Google</p>
            <h2>Make SolarComplaint.com a Preferred Source.</h2>
            <span>Google can show more SolarComplaint.com reporting in Top Stories and highlight it for readers who choose the site as a preferred source.</span>
          </div>
          <div className="ff-preferred-action">
            <div {...preferredSourceAttributes} />
            <small>Google&apos;s official Preferred Sources control</small>
          </div>
        </section>
      </main>

      <footer className="ff-footer">
        <strong>Solar Consumer Research</strong>
        <p>Independent consumer research. General information only; not legal or financial advice.</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </div>
  );
}
