import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "../../../components/info-page";
import { SunrunEthicsSpotlight } from "../../../components/sunrun-ethics-spotlight";
import { featuredStateSources } from "../../../lib/featured-state-sources";
import { sunrunHub } from "../../../lib/published-destinations";
import { getResearchStoriesForCompany } from "../../../lib/research-stories";

const texasSource = featuredStateSources.TX[0];
const arizonaAgreement = featuredStateSources.AZ[0];
const connecticutSource = "https://portal.ct.gov/ag/press-releases/2026-press-releases/attorney-general-tong-announces-settlements-with-sunrun-solar-and-others-to-require-consumer-relief";
const arizonaSettlementPage = "https://www.azag.gov/consumer/sunrun";
const floridaRoofOrder = "https://ecf.flmd.uscourts.gov/cgi-bin/show_public_doc?2025-02459-10-8-cv=";
const diazOpinion = "https://www.govinfo.gov/app/details/USCOURTS-njd-1_24-cv-11462";
const slovinDocket = "https://dockets.justia.com/docket/california/candce/3:2015cv05340/293131";
const stricklandOpinion = "https://www.govinfo.gov/app/details/USCOURTS-cand-4_23-cv-05034";
const canonicalUrl = `https://solarcomplaint.com${sunrunHub.href}`;
const description = "Track Sunrun lawsuits, proposed class actions, and state settlements. Find court records and consumer relief instructions for Connecticut and Arizona.";

export const metadata: Metadata = {
  title: sunrunHub.title,
  description,
  alternates: { canonical: sunrunHub.href },
  openGraph: {
    title: sunrunHub.title,
    description,
    url: sunrunHub.href,
    type: "website",
    images: [{ url: "https://solarcomplaint.com/og.png", width: 1200, height: 630, alt: "Solar Consumer Research" }],
  },
  twitter: {
    card: "summary_large_image",
    title: sunrunHub.title,
    description,
    images: ["https://solarcomplaint.com/og.png"],
  },
};

export default function SunrunCompanyPage() {
  const sunrunResearch = getResearchStoriesForCompany("Sunrun");
  const settlements = [
    {
      state: "Connecticut",
      type: "Attorney general settlement",
      date: "October 23, 2026 announcement",
      title: "Connecticut Sunrun settlement: contract-fraud claims and consumer relief",
      summary: "The attorney general says Sunrun must respond to fraud complaints covered by the agreement within 60 days. If Sunrun substantiates the complaint, it must offer relief that may include a payment, account credit, cancellation, or removal.",
      source: connecticutSource,
      stateHref: "/states/connecticut",
      helpHref: "/cases/connecticut-attorney-general-sunrun-lawsuit",
      helpLabel: "Connecticut settlement terms and claim instructions",
    },
    {
      state: "Arizona",
      type: "Attorney general settlement",
      date: "May 22, 2025 court approval",
      title: "Arizona settlement with Sunrun and Vivint Solar",
      summary: "The Arizona attorney general directs eligible customers to file a complaint with Sunrun using the instructions on its settlement page. Depending on the claim, the agreement provides for restitution, repairs, or a change to the service agreement.",
      source: arizonaAgreement.url,
      stateHref: "/states/arizona",
      helpHref: arizonaSettlementPage,
      helpLabel: "Arizona attorney general’s filing instructions",
    },
  ];
  const otherActions = [
    {
      state: "New Jersey",
      type: "Individual lawsuit",
      date: "July 18, 2025 opinion",
      title: "Diaz v. Sunrun",
      summary: "Magda Diaz disputed the electronic signature on a power purchase agreement. The judge denied Sunrun’s first arbitration motion without prejudice and ordered limited discovery on whether the case should go to arbitration.",
      source: diazOpinion,
      stateHref: "/states/new-jersey",
    },
    {
      state: "Florida",
      type: "Individual lawsuit",
      date: "October 30, 2025 order",
      title: "Florida Sunrun roof-removal and contract-buyout dispute",
      summary: "A homeowner alleged that Sunrun demanded more than $8,000 to remove panels for a roof replacement and later quoted roughly $35,000 to buy out her agreement. The federal judge sent the case back to Florida state court.",
      source: floridaRoofOrder,
      stateHref: "/states/florida",
    },
    {
      state: "Texas",
      type: "Attorney general investigation",
      date: "April 3, 2026 announcement",
      title: "Texas residential solar investigation involving Sunrun",
      summary: "The Texas attorney general announced that it had issued civil investigative demands to Sunrun and other companies while examining sales claims about bills, system performance, warranties, and contract terms.",
      source: texasSource.url,
      stateHref: "/states/texas",
    },
  ];
  const actions = [...settlements, ...otherActions];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${canonicalUrl}#page`,
        name: sunrunHub.title,
        description,
        url: canonicalUrl,
        dateModified: sunrunHub.dateModified,
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
        title={sunrunHub.title}
        lede="Connecticut and Arizona have separate Sunrun settlements with different rules for consumer relief. Find the filing instructions, then see what courts have ruled in other Sunrun disputes."
        showLegalNotice={false}
      >
        <nav className="case-question-links" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <Link href="/research">Research</Link>
          <span aria-current="page">Sunrun</span>
        </nav>

        <p><small>Updated <time dateTime={sunrunHub.dateModified}>November 14, 2026</time></small></p>

        <section className="state-source-section" aria-labelledby="sunrun-settlements-title">
          <div className="state-source-section-heading">
            <h2 id="sunrun-settlements-title">Sunrun settlements and consumer relief</h2>
          </div>
          <div className="state-source-grid">
            {settlements.map((settlement) => (
              <article key={settlement.state}>
                <span>{settlement.state} · {settlement.type}</span>
                <h3>{settlement.title}</h3>
                <p>{settlement.summary}</p>
                <small>{settlement.date}</small>
                <p><Link href={settlement.helpHref}>{settlement.helpLabel}</Link></p>
                <p><Link href={settlement.stateHref}>{settlement.state} solar resources</Link></p>
                <a href={settlement.source}>Read the {settlement.state} settlement record</a>
              </article>
            ))}
          </div>
        </section>

        <section className="info-section" aria-labelledby="sunrun-class-actions">
          <h2 id="sunrun-class-actions">Is there a Sunrun class action I can join?</h2>
          <p>
            A federal judge entered a final settlement judgment in the earlier Sunrun telemarketing case, <em>Slovin v. Sunrun</em>, in July 2019. In California, <em>Strickland v. Sunrun</em> was filed as a proposed class action over telemarketing calls. We could verify the court’s October 2025 opinions, but could not verify a later class certification order or an open claim process for this case.
          </p>
          <p><a href={slovinDocket}>Slovin docket and final judgment entry</a> · <a href={stricklandOpinion}>Published Strickland court opinions</a></p>
        </section>

        <section className="state-source-section" aria-labelledby="sunrun-actions-title">
          <div className="state-source-section-heading">
            <h2 id="sunrun-actions-title">Other lawsuits and investigations</h2>
          </div>
          <div className="state-source-grid">
            {otherActions.map((action) => (
              <article key={action.state}>
                <span>{action.state} · {action.type}</span>
                <h3>{action.title}</h3>
                <p>{action.summary}</p>
                <small>{action.date}</small>
                <p><Link href={action.stateHref}>{action.state} solar resources</Link></p>
                <a href={action.source}>Read the {action.state} record</a>
              </article>
            ))}
          </div>
        </section>

        <section className="info-section" aria-labelledby="sunrun-contract">
          <h2 id="sunrun-contract">Sunrun leases and power purchase agreements</h2>
          <p><Link href="/research/sunrun-25-year-solar-contracts">Read what Sunrun’s long-term agreements say about payments, transfers, and buyouts</Link>.</p>
        </section>

        <section className="info-section" aria-labelledby="sunrun-complaint-help">
          <h2 id="sunrun-complaint-help">Where to file a Sunrun complaint</h2>
          <p>Start with <a href="https://www.sunrun.com/contact-us">Sunrun customer support</a> and keep the case number and any written response. If the issue remains open, find the consumer protection office for your state.</p>
          <p><Link href="/resources">Find your state’s complaint routes</Link> · <Link href="/guides/massachusetts-solar-complaint">Massachusetts complaint guide</Link></p>
        </section>

        <SunrunEthicsSpotlight context="Sunrun research" />

        <section className="state-source-section sunrun-research-section" aria-labelledby="sunrun-research-title">
          <div className="state-source-section-heading">
            <h2 id="sunrun-research-title">Sunrun research</h2>
          </div>
          <div className="state-source-grid">
            {sunrunResearch.map((story) => (
              <article key={story.id}>
                <h3><Link href={story.href}>{story.title}</Link></h3>
                <p>{story.deck}</p>
                <small>Published {story.publishedAt}</small>
              </article>
            ))}
          </div>
        </section>

        <p><Link href="/methodology">Research methodology</Link> · <Link href="/corrections">Corrections</Link></p>
      </InfoPage>
    </>
  );
}
