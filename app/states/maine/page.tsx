import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "../../../components/info-page";

const sources = {
  agSolar: "https://www.maine.gov/ag/consumer-protection/consumer-help-topics/housing/solar-power-systems",
  agComplaint: "https://www.maine.gov/ag/online-services/complaint-form",
  agAds: "https://www.maine.gov/ag/consumer-protection/consumer-issues-scam/solar-advertisements-advisory-thu-01292026-0751",
  opaSolar: "https://www.maine.gov/meopa/solar",
  pucComplaint: "https://www.maine.gov/mpuc/consumer-assistance/file-complaint",
  pucReport: "https://www.maine.gov/mpuc/sites/maine.gov.mpuc/files/inline-files/2025%20Annual%20Report%20Final.pdf",
  solarDisclosure: "https://www.maine.gov/energy/initiatives/renewable-energy/solar",
  warrantyLaw: "https://legislature.maine.gov/statutes/10/title10sec1491.html",
  wgmeFreedom: "https://wgme.com/news/i-team/some-maine-solar-customers-left-in-limbo-after-freedom-forever-bankruptcy",
};

export const metadata: Metadata = {
  title: "Maine Solar Consumer Research & Complaint Routes",
  description: "Maine solar reporting, consumer guides, and official complaint and public-source links for homeowners dealing with solar problems.",
  keywords: ["Maine solar complaints", "Maine solar consumer resources", "Maine solar warranty", "Maine community solar", "Freedom Forever Maine"],
  alternates: { canonical: "/states/maine" },
  openGraph: {
    title: "Maine Solar Consumer Research & Complaint Routes",
    description: "Maine reporting, practical guides, and official consumer sources for solar customers.",
    url: "/states/maine",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Maine Solar Consumer Research & Complaint Routes",
    description: "Maine reporting, practical guides, and official consumer sources for solar customers.",
  },
};

export default function MaineHubPage() {
  const canonicalUrl = "https://solarcomplaint.com/states/maine";
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": canonicalUrl,
        name: "Maine Solar Consumer Research & Complaint Routes",
        description: "Maine reporting, consumer guides, and official complaint and public-source links for solar customers.",
        dateModified: "2026-08-29",
        inLanguage: "en-US",
        spatialCoverage: { "@type": "AdministrativeArea", name: "Maine" },
        isPartOf: { "@id": "https://solarcomplaint.com/#website" },
        publisher: { "@id": "https://solarcomplaint.com/#publisher" },
        citation: [
          { "@type": "CreativeWork", name: "Maine PUC 2025 Annual Report", url: sources.pucReport },
          { "@type": "WebPage", name: "Maine Attorney General: Solar Power Systems", url: sources.agSolar },
          { "@type": "WebPage", name: "Maine Office of Public Advocate: Community Solar", url: sources.opaSolar },
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://solarcomplaint.com/" },
          { "@type": "ListItem", position: 2, name: "States", item: "https://solarcomplaint.com/resources" },
          { "@type": "ListItem", position: 3, name: "Maine", item: canonicalUrl },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <InfoPage
        className="maine-hub-page"
        eyebrow="Maine consumer research"
        title="Maine solar: records, guides, and official sources."
        lede="A Maine-focused front door to documented reporting, practical consumer information, and the agencies that handle different parts of a solar problem. This is public-source research, not legal advice."
      >
        <nav className="case-question-links" aria-label="Maine hub navigation">
          <a href="#maine-record">Maine record</a>
          <a href="#guides">Consumer guides</a>
          <a href="#sources">Official sources</a>
          <a href="#research">Research help</a>
        </nav>

        <section id="maine-record" className="maine-story-section" aria-labelledby="maine-story-title">
          <div>
            <p className="eyebrow">Reporting and documented Maine record</p>
            <h2 id="maine-story-title">Freedom Forever&apos;s liquidation has made service and warranty questions immediate for some Maine homeowners.</h2>
          </div>
          <div>
            <p>WGME reported in August 2026 that customers were trying to determine what service and warranty coverage remained after the installer entered liquidation. The story reports that the Maine Attorney General had received 72 Freedom Forever complaints since 2023.</p>
            <a href={sources.wgmeFreedom} target="_blank" rel="noreferrer">Read the reporting ↗</a>
          </div>
        </section>

        <section className="maine-record-section" aria-labelledby="maine-record-title">
          <div className="maine-section-heading">
            <span>Public record</span>
            <h2 id="maine-record-title">Maine&apos;s complaint data points to more than one kind of solar concern.</h2>
          </div>
          <div className="maine-stat-grid">
            <article>
              <strong>97</strong>
              <p>complaints against solar providers received by the Maine PUC&apos;s Consumer Assistance and Safety Division in 2025.</p>
              <a href={sources.pucReport} target="_blank" rel="noreferrer">Read the 2025 PUC annual report ↗</a>
            </article>
            <article>
              <strong>1,732</strong>
              <p>consumer complaints received by that division in 2025, across the issues it handles.</p>
              <a href={sources.pucReport} target="_blank" rel="noreferrer">See the PUC complaint data ↗</a>
            </article>
            <article>
              <strong>10/16/24</strong>
              <p>Maine&apos;s Attorney General published a consumer advisory about misleading solar advertisements and financing claims.</p>
              <a href={sources.agAds} target="_blank" rel="noreferrer">Read the AG advisory ↗</a>
            </article>
          </div>
          <p className="maine-source-note">Complaint counts describe reports received. They are not findings about every complaint, company, or transaction.</p>
        </section>

        <section id="guides" className="maine-guide-section" aria-labelledby="guides-title">
          <p className="maine-guide-kicker">Maine consumer guides</p>
          <h2 id="guides-title">Two practical places to start.</h2>
          <p>These are broad entry points, not a diagnosis tool. They help identify the records to gather and the official Maine source most likely to be useful.</p>
          <div className="maine-guide-columns">
            <div>
              <h3>Company or system problems</h3>
              <p>For an installer closure, missing service, equipment issue, warranty question, or roof work. Start by separating the installer&apos;s promise from any manufacturer warranty, monitoring account, financing agreement, permit, and utility records.</p>
              <p>The Maine Attorney General&apos;s solar guidance specifically flags maintenance responsibilities, warranties, monitoring, roof repair or replacement, and removal costs as terms worth reviewing.</p>
              <a href={sources.agSolar} target="_blank" rel="noreferrer">Read Maine AG solar guidance ↗</a>
            </div>
            <div>
              <h3>Bills, contracts, and solar sales</h3>
              <p>For savings claims, a proposal that does not match the bills, financing, a community-solar subscription, cancellation, or a sales representation. Keep the proposal, signed contract, utility bills, solar-company bills, production information, and sales messages together.</p>
              <p>Community solar can involve utility credits and a separate provider bill. Maine&apos;s Office of the Public Advocate explains the billing, credit, and cancellation framework.</p>
              <div className="maine-source-links">
                <a href={sources.opaSolar} target="_blank" rel="noreferrer">Community solar guide ↗</a>
                <a href={sources.agAds} target="_blank" rel="noreferrer">AG advertising advisory ↗</a>
              </div>
            </div>
          </div>
        </section>

        <section id="sources" className="maine-sources-section" aria-labelledby="sources-title">
          <div className="maine-section-heading">
            <span>Official Maine sources</span>
            <h2 id="sources-title">Go directly to the source that fits the issue.</h2>
          </div>
          <div className="maine-source-grid">
            <a href={sources.agComplaint} target="_blank" rel="noreferrer">
              <span>Maine Attorney General</span>
              <strong>Business or consumer complaint</strong>
              <p>For a complaint about a solar business, contractor, sales practice, or consumer transaction.</p>
              <b>Open complaint route ↗</b>
            </a>
            <a href={sources.pucComplaint} target="_blank" rel="noreferrer">
              <span>Maine Public Utilities Commission</span>
              <strong>Utility billing, service, or regulated issue</strong>
              <p>Consumer Assistance explains the PUC complaint process and its scope.</p>
              <b>Open PUC complaint route ↗</b>
            </a>
            <a href={sources.opaSolar} target="_blank" rel="noreferrer">
              <span>Office of the Public Advocate</span>
              <strong>Community solar billing and cancellation</strong>
              <p>State guidance on subscriptions, utility credits, separate bills, and cancellation timing.</p>
              <b>Open community solar guide ↗</b>
            </a>
            <a href={sources.solarDisclosure} target="_blank" rel="noreferrer">
              <span>Department of Energy Resources</span>
              <strong>Solar disclosure forms</strong>
              <p>Standard ownership and leasing forms for customer-sited solar equipment.</p>
              <b>Open disclosure forms ↗</b>
            </a>
            <a href={sources.agSolar} target="_blank" rel="noreferrer">
              <span>Maine Attorney General</span>
              <strong>Solar contracts, warranties, and questions to ask</strong>
              <p>Official consumer guidance on terms, promises, and responsibilities that may appear in a solar agreement.</p>
              <b>Open solar guidance ↗</b>
            </a>
            <a href={sources.warrantyLaw} target="_blank" rel="noreferrer">
              <span>Maine Legislature</span>
              <strong>Solar warranty statute</strong>
              <p>Read the state&apos;s statutory provisions concerning warranties for solar energy equipment.</p>
              <b>Read the statute ↗</b>
            </a>
          </div>
        </section>

        <section className="maine-faq-section" aria-labelledby="method-title">
          <div className="maine-section-heading">
            <span>Sources and methodology</span>
            <h2 id="method-title">How this page handles Maine information.</h2>
          </div>
          <div className="maine-faq-list">
            <details>
              <summary>What is included here?</summary>
              <p>Government sources come first. Current local reporting is identified as reporting and linked directly. The page does not treat a complaint count as proof of a violation or outcome.</p>
            </details>
            <details>
              <summary>Does this page determine who is right?</summary>
              <p>No. It is a public-source research page. It does not interpret a contract, evaluate a claim, or decide whether any person or company violated the law.</p>
            </details>
          </div>
        </section>

        <section id="research" className="maine-final-cta" aria-labelledby="research-title">
          <p className="eyebrow">Public-source research help</p>
          <h2 id="research-title">Still need help locating the record?</h2>
          <p>Use the question form with your Maine town, the company involved, and a brief description. We can help identify relevant public records and official sources. Do not send account numbers, passwords, government ID, or unredacted contracts.</p>
          <Link href="/#questions">Ask for research help →</Link>
        </section>
      </InfoPage>
    </>
  );
}
