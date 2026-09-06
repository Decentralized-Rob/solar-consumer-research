import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "../../../components/info-page";
import { featuredStateSources } from "../../../lib/featured-state-sources";
import { featuredResearchStory } from "../../../lib/research-stories";

const texasSource = featuredStateSources.TX[0];
const arizonaAgreement = featuredStateSources.AZ[0];
const connecticutSource = "https://portal.ct.gov/ag/press-releases/2024-press-releases/attorney-general-tong-sues-sunrun";
const arizonaSettlementPage = "https://www.azag.gov/consumer/sunrun";
const floridaRoofOrder = "https://ecf.flmd.uscourts.gov/cgi-bin/show_public_doc?2025-02459-10-8-cv=";
const canonicalUrl = "https://solarcomplaint.com/companies/sunrun";

export const metadata: Metadata = {
  title: "Sunrun Lawsuits, Investigations and Solar Consumer Resources",
  description:
    "Track documented state lawsuits, investigations, settlements, ethics resources, and official consumer information involving Sunrun, with direct links to primary sources.",
  keywords: [
    "Sunrun lawsuit",
    "Sunrun investigation",
    "Sunrun settlement",
    "Sunrun complaints",
    "Sunrun ethics complaint",
    "Sunrun roof dispute",
    "Sunrun solar consumer resources",
  ],
  alternates: { canonical: "/companies/sunrun" },
  openGraph: {
    title: "Sunrun Lawsuits, Investigations and Solar Consumer Resources",
    description: "A source-based hub for documented state actions and consumer research involving Sunrun.",
    url: "/companies/sunrun",
    type: "website",
    images: [{ url: "https://solarcomplaint.com/og.png", width: 1200, height: 630, alt: "Solar Consumer Research" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sunrun Lawsuits, Investigations and Solar Consumer Resources",
    description: "A source-based hub for documented state actions and consumer research involving Sunrun.",
    images: ["https://solarcomplaint.com/og.png"],
  },
};

export default function SunrunCompanyPage() {
  const actions = [
    {
      type: "Investigation",
      state: "Texas",
      date: "April 3, 2026",
      title: "Texas residential solar investigation involving Sunrun",
      summary: texasSource.summary,
      source: texasSource.url,
      stateHref: "/states/texas",
    },
    {
      type: "Lawsuit",
      state: "Florida",
      date: "October 30, 2025",
      title: "Florida Sunrun roof-removal and contract-buyout dispute",
      summary: "A federal court order summarizes a Florida homeowner's allegations that Sunrun would not remove panels for a roof replacement unless she signed a new agreement and paid more than $8,000, and that Sunrun later demanded about $35,000 to buy out the contract. The case later proceeded toward arbitration and the federal docket reported a settlement in April 2026. The allegations were not findings of wrongdoing.",
      source: floridaRoofOrder,
      stateHref: "/states/florida",
    },
    {
      type: "Settlement",
      state: "Arizona",
      date: "May 22, 2025",
      title: "Arizona settlement with Sunrun and Vivint Solar",
      summary: "Arizona's court-approved agreement resolves allegations concerning solar sales practices and includes consumer-relief and complaint-handling requirements. Sunrun and Vivint Solar denied the allegations, and the agreement is not an admission of wrongdoing.",
      source: arizonaAgreement.url,
      stateHref: "/states/arizona",
    },
    {
      type: "Lawsuit",
      state: "Connecticut",
      date: "July 19, 2024",
      title: "Connecticut Attorney General lawsuit naming Sunrun",
      summary: "Connecticut alleges unlawful residential-solar sales conduct involving contracts, signatures, permits, and non-functioning systems. The allegations remain allegations unless established through the court process.",
      source: connecticutSource,
      stateHref: "/states/connecticut",
    },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${canonicalUrl}#page`,
        name: "Sunrun Lawsuits, Investigations and Solar Consumer Resources",
        description: "A source-based hub for documented state actions and consumer research involving Sunrun.",
        url: canonicalUrl,
        dateModified: "2026-09-06",
        isPartOf: { "@id": "https://solarcomplaint.com/#website" },
        publisher: { "@id": "https://solarcomplaint.com/#publisher" },
        about: { "@type": "Organization", name: "Sunrun" },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: actions.map((action, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: { "@type": "CreativeWork", name: action.title, description: action.summary, url: action.source },
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://solarcomplaint.com/" },
          { "@type": "ListItem", position: 2, name: "Research", item: "https://solarcomplaint.com/research" },
          { "@type": "ListItem", position: 3, name: "Sunrun", item: canonicalUrl },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <InfoPage
        eyebrow="Company research · Sunrun"
        title="Sunrun investigations, enforcement and documented cases"
        lede="A source-based index of state actions involving Sunrun, with the procedural status of each matter kept separate and direct links to the government record."
      >
        <nav className="case-question-links" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <Link href="/research">Research</Link>
          <span aria-current="page">Sunrun</span>
        </nav>

        <section className="info-section case-notice">
          <strong>Status matters</strong>
          <p>
            An investigation is not a finding of wrongdoing. Lawsuit allegations are not court findings. A settlement can resolve disputed claims without an admission of wrongdoing. This page labels each action separately and does not treat them as one case.
          </p>
        </section>

        <section className="info-section">
          <h2>Sunrun ethics &amp; compliance</h2>
          <p>
            SolarComplaint.com maintains a separate source guide to Sunrun’s current AllVoices reporting route, Code of Business Conduct and Ethics, Whistleblower Policy, Vendor Code of Conduct, and publicly identified leadership responsibilities.
          </p>
          <p><Link href="/companies/sunrun/ethics-compliance">Open the Sunrun ethics and compliance guide →</Link></p>
        </section>

        <section className="state-source-section" aria-labelledby="sunrun-actions-title">
          <div className="state-source-section-heading">
            <span>{String(actions.length).padStart(2, "0")} documented actions</span>
            <h2 id="sunrun-actions-title">Investigations &amp; enforcement</h2>
          </div>
          <div className="state-source-grid">
            {actions.map((action) => (
              <article key={`${action.state}-${action.type}`}>
                <span>{action.state} · {action.type}</span>
                <h3>{action.title}</h3>
                <p>{action.summary}</p>
                <small>Source dated {action.date}</small>
                <p><Link href={action.stateHref}>View the {action.state} solar resource page →</Link></p>
                <a href={action.source} target="_blank" rel="noreferrer">Open official source ↗</a>
              </article>
            ))}
          </div>
        </section>

        <section className="info-section">
          <h2>Featured research</h2>
          <h3><Link href={featuredResearchStory.href}>{featuredResearchStory.title}</Link></h3>
          <p>{featuredResearchStory.deck}</p>
          <p><Link href={featuredResearchStory.href}>Read the source-backed breakdown →</Link></p>
        </section>

        <section className="info-section">
          <h2>Detailed case page</h2>
          <p><Link href="/cases/connecticut-attorney-general-sunrun-lawsuit">Read the Connecticut Attorney General lawsuit summary and allegations →</Link></p>
        </section>

        <section className="info-section">
          <h2>Arizona settlement resources</h2>
          <p>
            <a href={arizonaSettlementPage} target="_blank" rel="noreferrer">Arizona Attorney General consumer settlement information ↗</a><br />
            <a href={arizonaAgreement.url} target="_blank" rel="noreferrer">Arizona stipulated consent agreement ↗</a>
          </p>
        </section>

        <section className="info-section">
          <h2>Research standards</h2>
          <p>
            This page is an index of documented public actions, not a claim score or legal assessment. Read the <Link href="/methodology">methodology</Link> and <Link href="/corrections">corrections policy</Link>.
          </p>
        </section>
      </InfoPage>
    </>
  );
}
