import Link from "next/link";
import { InfoPage } from "./info-page";
import { resources, stateSlug } from "../lib/content";
import { featuredStateSources } from "../lib/featured-state-sources";
import { consumerProtectionByState, getStateSolarCase } from "../lib/state-research";

export function StateResourcePage({ state }: { state: { code: string; name: string; available: boolean } }) {
  const consumerProtection = consumerProtectionByState[state.code];
  const solarCase = getStateSolarCase(state.code);
  const stateResources = resources.filter(
    (item) => item.stateCode === state.code
      && item.id !== "ma-electric-company"
      && item.url !== consumerProtection?.url,
  );
  const currentEnforcementSources = (featuredStateSources[state.code] ?? []).filter(
    (item) => item.url !== solarCase?.url && !stateResources.some((resource) => resource.url === item.url),
  );
  const hasExpandedSources = stateResources.length > 0 || currentEnforcementSources.length > 0;
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: consumerProtection.title,
    description: `${consumerProtection.summary} ${hasExpandedSources ? "Additional source-reviewed state resources are included." : "This page is a starting directory with one documented solar reference, not a complete state research file."}`,
    url: `https://solarcomplaint.com/states/${stateSlug(state.name)}`,
    dateModified: "2026-08-27",
    spatialCoverage: { "@type": "AdministrativeArea", name: state.name },
    about: [
      { "@type": "Thing", name: `${state.name} consumer complaint route` },
      { "@type": "Thing", name: "Residential solar consumer protection" },
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
            "@type": "WebPage",
            name: solarCase.title,
            description: solarCase.summary,
            datePublished: solarCase.datePublished,
            url: solarCase.url,
          },
        },
        ...currentEnforcementSources.map((source, index) => ({
          "@type": "ListItem",
          position: index + (solarCase ? 3 : 2),
          item: {
            "@type": "WebPage",
            name: source.title,
            description: source.summary,
            datePublished: source.datePublished,
            url: source.url,
          },
        })),
      ].filter(Boolean),
    },
  };

  return (
    <InfoPage
      className="state-resource-page"
      eyebrow={`${state.name} official complaint route`}
      title={consumerProtection.title}
      lede={consumerProtection.summary}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />

      <nav className="state-question-nav" aria-label={`${state.name} solar resource questions`}>
        <a href="#consumer-protection">Official {state.name} complaint route</a>
        {solarCase && <a href="#solar-case">Documented {solarCase.caseType} reference</a>}
        {currentEnforcementSources.length > 0 && <a href="#current-enforcement-sources">Current enforcement sources</a>}
      </nav>

      <section id="consumer-protection" className="state-source-lead" aria-labelledby="consumer-protection-title">
        <div className="state-source-meta"><span>Official complaint route</span><span>State government source</span></div>
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
          <small>{solarCase.publisher} · Source dated {solarCase.publishedAt}</small>
          <a href={solarCase.url} target="_blank" rel="noreferrer">Read the source and case details ↗</a>
        </section>
      )}

      {currentEnforcementSources.length > 0 && (
        <section id="current-enforcement-sources" className="state-source-section" aria-labelledby="current-enforcement-sources-title">
          <div className="state-source-section-heading">
            <span>{String(currentEnforcementSources.length).padStart(2, "0")} current source{currentEnforcementSources.length === 1 ? "" : "s"}</span>
            <h2 id="current-enforcement-sources-title">Current enforcement sources</h2>
          </div>
          <div className="state-source-grid">
            {currentEnforcementSources.map((item) => (
              <article key={item.id}>
                <span>Official {item.sourceType}</span>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                <small>{item.publisher} · Source dated {item.publishedAt}</small>
                <a href={item.url} target="_blank" rel="noreferrer">Open official source ↗</a>
              </article>
            ))}
          </div>
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

      {!hasExpandedSources && (
        <section className="info-section">
          <h2>Current state-page coverage</h2>
          <p>This page is a starting directory: one official complaint route and one documented solar reference. Additional state-specific sources are added only after individual review.</p>
        </section>
      )}

      <div className="state-page-links">
        <Link href="/resources">Choose another state →</Link>
        <Link href="/federal-resources">Browse federal resources →</Link>
        <Link href="/guides">Browse consumer guides →</Link>
      </div>
    </InfoPage>
  );
}
