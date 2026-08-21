import Link from "next/link";
import { InfoPage } from "./info-page";
import { dsireStateUrl, resources, stateSlug } from "../lib/content";

export function StateResourcePage({ state }: { state: { code: string; name: string; available: boolean } }) {
  const stateResources = resources.filter(
    (item) => item.stateCode === state.code && item.id !== "ma-electric-company",
  );
  const dsireUrl = dsireStateUrl(state.code);
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${state.name} residential solar consumer resources`,
    description: `Verified solar policies, programs, and consumer resources for ${state.name}.`,
    url: `https://solarcomplaint.com/states/${stateSlug(state.name)}`,
    spatialCoverage: { "@type": "AdministrativeArea", name: state.name },
  };

  return (
    <InfoPage
      className="state-resource-page"
      eyebrow={`${state.name} solar resource guide`}
      title={`${state.name} residential solar resources.`}
      lede={state.available
        ? `Verified state sources for understanding, documenting, or addressing a residential solar problem in ${state.name}.`
        : `A verified solar-specific starting point for ${state.name}. Additional state consumer-protection and complaint sources are being reviewed.`}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />

      <nav className="state-question-nav" aria-label={`${state.name} solar resource questions`}>
        <a href="#solar-policies">What solar policies and programs are listed for {state.name}?</a>
        {stateResources.length > 0 && <a href="#state-sources">Which {state.name} agencies handle solar-related problems?</a>}
      </nav>

      <section id="solar-policies" className="state-source-lead" aria-labelledby="solar-policies-title">
        <div className="state-source-meta"><span>Research database</span><span>Verified Aug 18, 2026</span></div>
        <h2 id="solar-policies-title">What solar policies and programs are listed for {state.name}?</h2>
        <p>DSIRE collects state solar policies, programs, incentives, net-metering rules, and interconnection information. The database is operated by the N.C. Clean Energy Technology Center at N.C. State University.</p>
        <a href={dsireUrl} target="_blank" rel="noreferrer">Open the {state.name} solar page on DSIRE ↗</a>
      </section>

      {stateResources.length > 0 ? (
        <section id="state-sources" className="state-source-section" aria-labelledby="state-sources-title">
          <div className="state-source-section-heading">
            <span>{String(stateResources.length + 1).padStart(2, "0")} verified sources</span>
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
      ) : (
        <section className="state-research-status">
          <strong>Additional state research in progress</strong>
          <p>Solar-specific complaint routes, licensing records, court materials, enforcement actions, and state consumer guidance will be added after each source is reviewed.</p>
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
