import Link from "next/link";
import { InfoPage } from "./info-page";
import { resources, stateSlug } from "../lib/content";
import { consumerProtectionByState, getStateSolarCase } from "../lib/state-research";

export function StateResourcePage({ state }: { state: { code: string; name: string; available: boolean } }) {
  const consumerProtection = consumerProtectionByState[state.code];
  const solarCase = getStateSolarCase(state.code);
  const stateResources = resources.filter(
    (item) => item.stateCode === state.code
      && item.id !== "ma-electric-company"
      && item.url !== consumerProtection?.url,
  );
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${state.name} residential solar consumer resources`,
    description: `Official consumer complaint resources and verified residential solar litigation relevant to ${state.name}.`,
    url: `https://solarcomplaint.com/states/${stateSlug(state.name)}`,
    dateModified: "2026-08-21",
    spatialCoverage: { "@type": "AdministrativeArea", name: state.name },
    about: [
      { "@type": "Thing", name: "Residential solar consumer protection" },
      { "@type": "Thing", name: "Solar company complaints" },
      { "@type": "Thing", name: "Residential solar litigation" },
    ],
    mainEntity: {
      "@type": "ItemList",
      itemListElement: [
        consumerProtection && {
          "@type": "ListItem",
          position: 1,
          item: {
            "@type": "GovernmentService",
            name: consumerProtection.title,
            description: consumerProtection.summary,
            provider: { "@type": "GovernmentOrganization", name: consumerProtection.publisher },
            url: consumerProtection.url,
          },
        },
        solarCase && {
          "@type": "ListItem",
          position: 2,
          item: {
            "@type": "NewsArticle",
            headline: solarCase.title,
            description: solarCase.summary,
            datePublished: solarCase.datePublished,
            publisher: { "@type": "Organization", name: solarCase.publisher },
            url: solarCase.url,
          },
        },
      ].filter(Boolean),
    },
  };

  return (
    <InfoPage
      className="state-resource-page"
      eyebrow={`${state.name} solar complaints and consumer protection`}
      title={`${state.name} solar complaint resources.`}
      lede={`Start with ${state.name}'s official consumer-protection complaint route, then review a documented residential-solar case or enforcement action relevant to homeowners in the state.`}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />

      <nav className="state-question-nav" aria-label={`${state.name} solar resource questions`}>
        <a href="#consumer-protection">Where can I file a solar company complaint in {state.name}?</a>
        <a href="#solar-case">What residential solar lawsuit or enforcement action is relevant?</a>
      </nav>

      <section id="consumer-protection" className="state-source-lead" aria-labelledby="consumer-protection-title">
        <div className="state-source-meta"><span>Official complaint route</span><span>Verified {consumerProtection.lastVerified}</span></div>
        <h2 id="consumer-protection-title">{consumerProtection.title}</h2>
        <p>{consumerProtection.summary}</p>
        <p className="state-source-note">For a residential-solar complaint, keep the sales proposal, signed or electronic contract, financing or lease documents, utility bills, production records, permits, inspection records, cancellation attempts, and company correspondence.</p>
        <a href={consumerProtection.url} target="_blank" rel="noreferrer">Open the official {state.name} complaint page ↗</a>
      </section>

      {solarCase && (
        <section id="solar-case" className="state-case-feature" aria-labelledby="solar-case-title">
          <div className="state-source-meta"><span>{solarCase.relevance}</span><span>{solarCase.caseType} · {solarCase.publishedAt}</span></div>
          <h2 id="solar-case-title">{solarCase.title}</h2>
          <p>{solarCase.summary}</p>
          <small>{solarCase.publisher} · Verified Aug 21, 2026</small>
          <a href={solarCase.url} target="_blank" rel="noreferrer">Read the source and case details ↗</a>
        </section>
      )}

      {stateResources.length > 0 ? (
        <section id="state-sources" className="state-source-section" aria-labelledby="state-sources-title">
          <div className="state-source-section-heading">
            <span>{String(stateResources.length).padStart(2, "0")} additional sources</span>
            <h2 id="state-sources-title">Additional {state.name} sources</h2>
          </div>
          <div className="state-source-grid">
            {stateResources.map((item) => (
              <article key={item.id}>
                <span>{item.publisherType === "regulator" ? "State regulator" : "State government"}</span>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                <small>{item.publisher} · Verified {item.lastVerified}</small>
                <a href={item.url} target="_blank" rel="noreferrer">Open official source ↗</a>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <div className="state-page-links">
        <Link href="/resources">Choose another state →</Link>
        <Link href="/federal-resources">Browse federal resources →</Link>
        <Link href="/guides">Browse consumer guides →</Link>
      </div>
    </InfoPage>
  );
}
