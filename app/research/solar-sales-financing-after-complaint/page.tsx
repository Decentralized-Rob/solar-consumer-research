import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "../../../components/info-page";
import { featuredStateSources } from "../../../lib/featured-state-sources";
import { featuredResearchStory } from "../../../lib/research-stories";

const michiganSource = featuredStateSources.MI[0];
const texasSource = featuredStateSources.TX[0];
const arizonaAgreement = featuredStateSources.AZ[0];
const arizonaSettlementPage = "https://www.azag.gov/consumer/sunrun";
const canonicalUrl = "https://solarcomplaint.com/research/solar-sales-financing-after-complaint";

export const metadata: Metadata = {
  title: "Solar Sales, Financing and What Happens After a Complaint",
  description:
    "Michigan's Climax Solar lawsuit, Texas's Sunrun investigation, and Arizona's Sunrun settlement show how states are examining solar sales, financing, service, and complaint handling.",
  keywords: [
    "solar financing complaints",
    "Sunrun investigation",
    "Michigan solar lawsuit",
    "Arizona Sunrun settlement",
    "residential solar complaints",
    "solar consumer protection",
  ],
  alternates: { canonical: "/research/solar-sales-financing-after-complaint" },
  openGraph: {
    title: featuredResearchStory.title,
    description: featuredResearchStory.deck,
    url: "/research/solar-sales-financing-after-complaint",
    type: "article",
    publishedTime: "2026-08-27",
    modifiedTime: "2026-08-27",
    authors: ["https://solarcomplaint.com/about"],
    section: "Featured Research",
    images: [
      {
        url: "https://solarcomplaint.com/og.png",
        width: 1200,
        height: 630,
        alt: "Solar Consumer Research",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: featuredResearchStory.title,
    description: featuredResearchStory.deck,
    images: ["https://solarcomplaint.com/og.png"],
  },
};

export default function SolarSalesFinancingResearchPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${canonicalUrl}#article`,
        headline: featuredResearchStory.title,
        description: featuredResearchStory.deck,
        image: ["https://solarcomplaint.com/og.png"],
        datePublished: featuredResearchStory.datePublished,
        dateModified: featuredResearchStory.dateModified,
        inLanguage: "en-US",
        articleSection: "Featured Research",
        mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
        isPartOf: { "@id": "https://solarcomplaint.com/#website" },
        author: {
          "@type": "Organization",
          name: "Solar Consumer Research",
          url: "https://solarcomplaint.com/about",
        },
        publisher: { "@id": "https://solarcomplaint.com/#publisher" },
        about: featuredResearchStory.topics.map((name) => ({ "@type": "Thing", name })),
        mentions: [
          { "@type": "Organization", name: "Climax Solar" },
          { "@type": "Organization", name: "Sunrun" },
          { "@type": "Organization", name: "Vivint Solar" },
          { "@type": "AdministrativeArea", name: "Michigan" },
          { "@type": "AdministrativeArea", name: "Texas" },
          { "@type": "AdministrativeArea", name: "Arizona" },
        ],
        citation: [
          {
            "@type": "CreativeWork",
            name: michiganSource.title,
            url: michiganSource.url,
            datePublished: michiganSource.datePublished,
            publisher: { "@type": "GovernmentOrganization", name: michiganSource.publisher },
          },
          {
            "@type": "CreativeWork",
            name: texasSource.title,
            url: texasSource.url,
            datePublished: texasSource.datePublished,
            publisher: { "@type": "GovernmentOrganization", name: texasSource.publisher },
          },
          {
            "@type": "CreativeWork",
            name: arizonaAgreement.title,
            url: arizonaAgreement.url,
            datePublished: arizonaAgreement.datePublished,
            publisher: { "@type": "GovernmentOrganization", name: arizonaAgreement.publisher },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://solarcomplaint.com/" },
          { "@type": "ListItem", position: 2, name: "Research", item: "https://solarcomplaint.com/research" },
          { "@type": "ListItem", position: 3, name: featuredResearchStory.title, item: canonicalUrl },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <InfoPage
        className="research-story-page"
        eyebrow={`Featured Research · ${featuredResearchStory.publishedAt}`}
        title={featuredResearchStory.title}
        lede={featuredResearchStory.deck}
      >
        <nav className="case-question-links" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <Link href="/research">Research</Link>
          <span aria-current="page">Current story</span>
        </nav>

        <nav className="case-question-links" aria-label="Article navigation">
          <a href="#michigan">Michigan lawsuit</a>
          <a href="#texas">Texas investigation</a>
          <a href="#arizona">Arizona settlement</a>
          <a href="#connection">What connects them</a>
          <a href="#sources">Primary sources</a>
        </nav>

        <section className="info-section case-notice" aria-label="Article status and sourcing">
          <strong>Source-backed research</strong>
          <p>
            Published August 27, 2026 by Solar Consumer Research. This story separates allegations,
            investigations, and settlements and links directly to the government records behind each section.
          </p>
        </section>

        <section className="info-section">
          <h2>Three state actions, three different legal postures</h2>
          <p>
            A new Michigan solar lawsuit is worth watching if you have been following the complaints and
            investigations around Sunrun. Sunrun is not a defendant in the Michigan case. The connection is
            narrower: Michigan is examining what can happen after a solar sale is financed and consumers later
            report problems, while Texas and Arizona have taken separate actions involving Sunrun.
          </p>
          <p>
            The cases should not be blended together. Michigan filed a lawsuit involving Climax Solar and finance
            companies. Texas is investigating Sunrun and other residential solar companies. Arizona reached a
            settlement with Sunrun and Vivint Solar. Each state record has its own facts, claims, and procedural status.
          </p>
        </section>

        <section id="michigan" className="info-section">
          <p className="eyebrow">Michigan · Lawsuit filed July 15, 2026</p>
          <h2>Michigan is looking beyond the initial solar sale</h2>
          <p>
            Michigan Attorney General Dana Nessel sued Climax Solar, its owner, and several companies involved in
            financing Climax solar projects. The state complaint describes the alleged business model as
            <strong> “Pitch, Sign, Fund, Fail, Collect.”</strong>
          </p>
          <p>
            Michigan alleges that Climax made representations about electric-bill savings, tax credits, and quick
            installation, then arranged financing while consumers signed documents during the sales process. The
            complaint says projects later stalled, failed, underperformed, lacked permission to operate, or were abandoned.
          </p>
          <p>
            The scale alleged in the complaint is substantial. Records produced to date identify 1,689 Climax-originated
            Michigan loans totaling approximately $81.26 million in financed purchase amounts. The complaint says those
            loans included approximately $22.14 million in finance charges that it characterizes as hidden dealer, platform,
            or similar fees embedded in the financed price. Those figures are allegations and calculations presented by
            Michigan in the complaint; they have not been adjudicated as findings by the court.
          </p>
          <p>
            The complaint goes further than the sales pitch. Michigan alleges that finance companies continued
            servicing, collecting, reporting, or enforcing some obligations after receiving notice of seller misconduct,
            nonperformance, disputed signatures, or cancellation problems. Those are allegations in a pending government
            complaint, not findings by this site.
          </p>
          <p>
            <Link href="/states/michigan">See the Michigan solar complaint and enforcement resources →</Link>
          </p>
          <p>
            <a href={michiganSource.url} target="_blank" rel="noreferrer">
              Read the Michigan Attorney General complaint ↗
            </a>
          </p>
        </section>

        <section className="info-section">
          <h2>Why the Michigan case matters</h2>
          <p>
            Michigan is examining conduct on both sides of the transaction: the alleged seller conduct and what happened
            after the resulting financial obligations were originated, funded, serviced, collected, reported, or enforced.
            That makes the case relevant to a broader residential-solar question: what responsibilities remain after a
            homeowner tells a company that the underlying sale or installation is disputed?
          </p>
          <p>
            That does not connect Sunrun to the conduct alleged in Michigan. The Michigan case does not provide a basis
            to make that claim.
          </p>
        </section>

        <section id="texas" className="info-section">
          <p className="eyebrow">Texas · Investigation announced April 3, 2026</p>
          <h2>Texas is investigating Sunrun and other residential solar companies</h2>
          <p>
            The Texas Attorney General announced a broader residential-solar enforcement initiative and said the office
            issued Civil Investigative Demands to several companies, including Sunrun.
          </p>
          <p>
            Texas says it is examining possible misrepresentations involving energy-bill savings, solar-system performance,
            equipment, and company terms and policies. The state also sought records concerning warranties, service plans,
            marketing materials, contracts, and how companies track changes in customers&apos; electricity bills.
          </p>
          <p>
            This is an investigation. It is not a finding that Sunrun violated the law.
          </p>
          <p>
            <Link href="/states/texas">See the Texas solar complaint and enforcement resources →</Link>
          </p>
          <p>
            <a href={texasSource.url} target="_blank" rel="noreferrer">
              Read the Texas Attorney General announcement ↗
            </a>
          </p>
        </section>

        <section id="arizona" className="info-section">
          <p className="eyebrow">Arizona · Consent agreement approved May 22, 2025</p>
          <h2>Arizona reached a $1.25 million settlement with Sunrun and Vivint Solar</h2>
          <p>
            The Arizona Attorney General reached a $1.25 million settlement with Sunrun and Vivint Solar over alleged
            deceptive solar sales practices. The court approved the stipulated consent agreement on May 22, 2025.
          </p>
          <p>
            The agreement allocates $600,000 to civil penalties, $50,000 to the State for attorney&apos;s fees and costs,
            and $600,000 to consumer restitution. It also establishes a process for eligible complaints and permits forms
            of consumer relief that can include payments, credits, rate reductions, contract changes, cancellations,
            repairs, or other remedies under the agreement.
          </p>
          <p>
            The agreement also addresses what happens after an Arizona consumer raises a problem. It requires a unique
            complaint number for tracking and requires commercially reasonable staffing efforts sufficient to provide a
            response within two business days. Read receipts and generic automated replies do not count as a response.
          </p>
          <p>
            Sunrun and Vivint Solar denied the allegations. The agreement states that it resolves disputed claims and is
            not an admission of wrongdoing.
          </p>
          <p>
            <Link href="/states/arizona">See the Arizona solar complaint and enforcement resources →</Link>
          </p>
          <p>
            <a href={arizonaSettlementPage} target="_blank" rel="noreferrer">Read Arizona&apos;s Sunrun settlement information ↗</a><br />
            <a href={arizonaAgreement.url} target="_blank" rel="noreferrer">Read the stipulated consent agreement ↗</a>
          </p>
        </section>

        <section id="connection" className="info-section case-notice">
          <strong>The connection is narrow</strong>
          <p>
            Michigan, Texas, and Arizona involve different companies, different allegations, and different stages of
            enforcement. They should not be treated as one case.
          </p>
          <p>
            Taken together, the government records show state attorneys general examining more than the initial solar
            sales pitch. The records address sales representations, contracts, financing, system performance, service,
            and, in some instances, what companies do after a consumer reports that something has gone wrong.
          </p>
        </section>

        <section className="info-section">
          <h2>What to watch next</h2>
          <p>
            The status of these matters can change. Michigan&apos;s lawsuit can produce court rulings, amended claims, or a
            settlement. Texas can close its investigation, take enforcement action, or announce no public action. Arizona&apos;s
            agreement can generate additional consumer-relief information or implementation updates. Solar Consumer Research
            will update this story when a primary source materially changes the record.
          </p>
        </section>

        <section id="sources" className="info-section">
          <h2>Primary sources and documents</h2>
          <p>
            <strong>Michigan Attorney General · July 15, 2026.</strong>{" "}
            <a href={michiganSource.url} target="_blank" rel="noreferrer">Complaint against Climax Solar and finance defendants ↗</a>
          </p>
          <p>
            <strong>Texas Attorney General · April 3, 2026.</strong>{" "}
            <a href={texasSource.url} target="_blank" rel="noreferrer">Residential solar investigation announcement involving Sunrun ↗</a>
          </p>
          <p>
            <strong>Arizona Attorney General · May 22, 2025.</strong>{" "}
            <a href={arizonaSettlementPage} target="_blank" rel="noreferrer">Consumer settlement information ↗</a>{" · "}
            <a href={arizonaAgreement.url} target="_blank" rel="noreferrer">Stipulated consent agreement ↗</a>
          </p>
        </section>

        <section className="info-section">
          <h2>Continue the research</h2>
          <p>
            <Link href="/companies/sunrun">Sunrun investigations, enforcement, and documented cases →</Link><br />
            <Link href="/states/michigan">Michigan solar consumer resources →</Link><br />
            <Link href="/states/texas">Texas solar consumer resources →</Link><br />
            <Link href="/states/arizona">Arizona solar consumer resources →</Link><br />
            <Link href="/research">Browse Solar Consumer Research stories and case trackers →</Link>
          </p>
          <p>
            Read <Link href="/methodology">how Solar Consumer Research selects, verifies, and labels sources</Link>.
          </p>
        </section>
      </InfoPage>
    </>
  );
}
