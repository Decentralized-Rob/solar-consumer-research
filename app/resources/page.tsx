import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "../../components/info-page";
import { stateSlug, states } from "../../lib/content";
import styles from "./resources.module.css";

const canonicalUrl = "https://solarcomplaint.com/resources";

const startPaths = [
  {
    href: "#company-case-resources",
    number: "01",
    title: "Company or installer issue",
    description: "Start with an existing company or closure tracker when the company itself is central to the situation.",
  },
  {
    href: "#state-directory",
    number: "02",
    title: "State complaint route",
    description: "Find the Attorney General, regulator, licensing route, or other state starting point for your location.",
  },
  {
    href: "#financing-resources",
    number: "03",
    title: "Loan or financing issue",
    description: "Use research and complaint resources focused on solar financing, servicing, cancellation, and disputed sales.",
  },
  {
    href: "#federal-resources",
    number: "04",
    title: "Federal complaint route",
    description: "Find federal consumer-protection resources for financing, deceptive practices, credit, and related issues.",
  },
  {
    href: "#consumer-guides",
    number: "05",
    title: "Need to prepare a complaint",
    description: "Use practical guides for records, complaint filing, and Massachusetts-specific consumer steps.",
  },
  {
    href: "#documented-cases",
    number: "06",
    title: "Research a lawsuit or case",
    description: "Read source-backed summaries of documented lawsuits, bankruptcy records, settlements, and investigations.",
  },
];

export const metadata: Metadata = {
  title: "Solar Complaint Resources: State, Company & Federal Help",
  description:
    "Find the right starting point for a solar complaint: state complaint routes, company and case trackers, financing research, federal resources, consumer guides, and documented cases.",
  alternates: { canonical: "/resources" },
  openGraph: {
    title: "Solar Complaint Resources: State, Company & Federal Help",
    description:
      "Choose a solar consumer resource by situation, including state complaint routes, company trackers, financing research, federal resources, guides, and documented cases.",
    url: "/resources",
    type: "website",
  },
};

export default function ResourcesPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${canonicalUrl}#page`,
        url: canonicalUrl,
        name: "Solar Complaint Resources: State, Company & Federal Help",
        description:
          "A starting point for state complaint routes, company and case trackers, financing research, federal resources, consumer guides, and documented residential-solar cases.",
        isPartOf: { "@id": "https://solarcomplaint.com/#website" },
        hasPart: [
          { "@type": "WebPage", url: "https://solarcomplaint.com/companies/sunrun", name: "Sunrun research hub" },
          { "@type": "WebPage", url: "https://solarcomplaint.com/cases/titan-solar-power", name: "Titan Solar Power tracker" },
          { "@type": "WebPage", url: "https://solarcomplaint.com/federal-resources", name: "Federal solar consumer resources" },
          { "@type": "WebPage", url: "https://solarcomplaint.com/guides", name: "Solar consumer guides" },
          { "@type": "WebPage", url: "https://solarcomplaint.com/research", name: "Solar consumer research" },
        ],
      },
      {
        "@type": "ItemList",
        "@id": `${canonicalUrl}#state-directory`,
        name: "Official solar complaint starting points by state",
        numberOfItems: states.length,
        itemListElement: states.map((state, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: `${state.name} official solar complaint route`,
          url: `https://solarcomplaint.com/states/${stateSlug(state.name)}`,
        })),
      },
    ],
  };

  return (
    <InfoPage
      className="state-index-page"
      eyebrow="Solar consumer resource hub"
      title="Solar complaint resources: where to start"
      lede="Choose the path that matches your situation. Start with your state, a company or case tracker, financing research, federal resources, or a practical guide. The full 50-state directory remains below."
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <section className={styles.startSection} aria-labelledby="choose-resource-path">
        <div className={styles.sectionHeading}>
          <span>Start here</span>
          <h2 id="choose-resource-path">What are you trying to resolve?</h2>
        </div>
        <div className={styles.pathGrid}>
          {startPaths.map((path) => (
            <a href={path.href} key={path.href}>
              <span>{path.number}</span>
              <strong>{path.title}</strong>
              <p>{path.description}</p>
              <b aria-hidden="true">↓</b>
            </a>
          ))}
        </div>
      </section>

      <section id="company-case-resources" className={`info-section ${styles.routeSection}`} aria-labelledby="company-case-title">
        <div className={styles.routeLabel}>Company research</div>
        <h2 id="company-case-title">Start with the company when the dispute follows the company</h2>
        <p>
          Current company and closure trackers organize public records, cases, consumer resources, and related state material around a specific company.
        </p>
        <div className={styles.linkList}>
          <Link href="/companies/sunrun">Sunrun lawsuits, investigations, settlements and consumer resources →</Link>
          <Link href="/cases/titan-solar-power">Titan Solar Power bankruptcy, closure and customer-help tracker →</Link>
          <Link href="/updates">Solar consumer protection, lawsuit and enforcement updates →</Link>
        </div>
      </section>

      <section id="financing-resources" className={`info-section ${styles.routeSection}`} aria-labelledby="financing-title">
        <div className={styles.routeLabel}>Financing</div>
        <h2 id="financing-title">If the issue involves the loan, financing, cancellation, or collection</h2>
        <p>
          Start with the financing research page, then use the federal resource page or complaint-record guide if you need a filing route or need to organize documents first.
        </p>
        <div className={styles.linkList}>
          <Link href="/research/solar-sales-financing-after-complaint">Solar sales, financing and what happens after a complaint →</Link>
          <Link href="/federal-resources">Federal solar financing and consumer-protection resources →</Link>
          <Link href="/guides/solar-complaint-record-checklist">Solar complaint record checklist →</Link>
        </div>
      </section>

      <section id="federal-resources" className={`info-section ${styles.routeSection}`} aria-labelledby="federal-title">
        <div className={styles.routeLabel}>Federal resources</div>
        <h2 id="federal-title">Use federal routes when the issue crosses state complaint systems</h2>
        <p>
          Federal resources can be relevant to financing, credit, deceptive practices, telemarketing, and other consumer-protection issues. The federal page separates agencies and explains what each route covers.
        </p>
        <div className={styles.linkList}>
          <Link href="/federal-resources">Browse federal solar complaint and consumer resources →</Link>
        </div>
      </section>

      <section id="consumer-guides" className={`info-section ${styles.routeSection}`} aria-labelledby="guides-title">
        <div className={styles.routeLabel}>Practical guides</div>
        <h2 id="guides-title">Prepare the record before you file</h2>
        <p>
          The guides focus on practical complaint preparation and documented consumer processes rather than personalized legal advice.
        </p>
        <div className={styles.linkList}>
          <Link href="/guides">Browse all consumer guides →</Link>
          <Link href="/guides/solar-complaint-record-checklist">Solar complaint record checklist →</Link>
          <Link href="/guides/massachusetts-solar-complaint">How to file a Massachusetts solar consumer complaint →</Link>
          <Link href="/guides/massachusetts-30-day-demand-letter">Massachusetts 30-day demand letter guide →</Link>
        </div>
      </section>

      <section id="documented-cases" className={`info-section ${styles.routeSection}`} aria-labelledby="cases-title">
        <div className={styles.routeLabel}>Documented cases</div>
        <h2 id="cases-title">Read the public record behind current solar disputes</h2>
        <p>
          Case pages distinguish allegations, investigations, settlements, bankruptcy records, and other procedural statuses instead of treating them as the same thing.
        </p>
        <div className={styles.linkList}>
          <Link href="/cases/connecticut-attorney-general-sunrun-lawsuit">Connecticut Attorney General lawsuit involving Sunrun →</Link>
          <Link href="/cases/titan-solar-power">Titan Solar Power bankruptcy and closure tracker →</Link>
          <Link href="/research">Browse all source-backed solar consumer research →</Link>
        </div>
      </section>

      <section id="state-directory" className={styles.stateSection} aria-labelledby="state-directory-title">
        <div className={styles.sectionHeading}>
          <span>All 50 states</span>
          <h2 id="state-directory-title">Find your state complaint starting point</h2>
        </div>
        <p className={styles.stateIntro}>
          Each state page begins with an official consumer-protection route and a documented solar reference. Coverage depth varies as additional state sources are reviewed.
        </p>
        <div className="state-index-grid">
          {states.map((state) => (
            <Link href={`/states/${stateSlug(state.name)}`} key={state.code}>
              <span>{state.code}</span>
              <strong>{state.name}</strong>
              <small>Official route + documented reference</small>
              <b aria-hidden="true">→</b>
            </Link>
          ))}
        </div>
      </section>
    </InfoPage>
  );
}
