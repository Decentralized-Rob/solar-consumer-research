import { stateSlug, states } from "../../lib/content";
import { featuredResearchStory } from "../../lib/research-stories";
import type { Guide, Resource } from "../../lib/types";
import { ArrowIcon, type State, type TopicFilter } from "./shared";

const pathOptions: Array<{
  topic: Exclude<TopicFilter, "all">;
  label: string;
  detail: string;
}> = [
  {
    topic: "complaints",
    label: "Where can I file a solar complaint?",
    detail: "Official state complaint channels and what they handle",
  },
  {
    topic: "utility",
    label: "Who handles a solar utility problem?",
    detail: "Billing, service, meters, and interconnection",
  },
  {
    topic: "financing",
    label: "Where can I report a solar loan or payment problem?",
    detail: "Consumer agencies that handle financial complaints",
  },
  {
    topic: "records",
    label: "How do I find permits, filings, and public records?",
    detail: "Official records and document request pages",
  },
];

export function HeroSection({
  stateCode,
  selectedState,
  resourceCount,
  onStateChange,
}: {
  stateCode: string;
  selectedState: State | undefined;
  resourceCount: number;
  onStateChange: (stateCode: string) => void;
}) {
  return (
    <section className="home-hero home-wrap">
      <div className="home-hero-copy">
        <p className="home-kicker"><span /> Independent public-source research</p>
        <h1>Solar problems are complicated. Finding where to start shouldn&apos;t be.</h1>
        <p className="home-hero-lede">
          Clear paths to official complaint channels, consumer agencies, public records,
          and source-based guides.
        </p>
        <div className="home-hero-actions">
          <a className="home-button home-button--dark" href="#start">Choose your state</a>
          <a className="home-button home-button--outline" href="/resources">Browse states</a>
        </div>
        <p className="home-scope-note">
          General public information only. No legal advice, claim evaluation, or findings of wrongdoing.
        </p>
      </div>

      <aside id="start" className="home-state-card" aria-labelledby="home-state-title">
        <p className="home-card-label">Start here</p>
        <h2 id="home-state-title">Select your state.</h2>
        <label htmlFor="home-state-select">State</label>
        <select
          id="home-state-select"
          value={stateCode}
          onChange={(event) => onStateChange(event.target.value)}
        >
          <option value="" disabled>Choose a state</option>
          {states.map((state) => (
            <option key={state.code} value={state.code}>{state.name}</option>
          ))}
        </select>
        {selectedState ? (
          <>
            <div className={`home-state-status ${selectedState.available ? "" : "is-coming-soon"}`}>
              <span>{selectedState.code}</span>
              <div>
                <strong>{selectedState.name}</strong>
                <small>
                  {selectedState.available
                    ? `${resourceCount} verified state resources`
                    : "Verified statewide solar starting point"}
                </small>
              </div>
            </div>
            <p>
              {selectedState.available
                ? "State-specific resources are available below."
                : "A solar-specific state source is available now. Additional consumer-protection research is in progress."}
            </p>
            <a className="home-state-page-link" href={`/states/${stateSlug(selectedState.name)}`}>
              Open the {selectedState.name} page →
            </a>
          </>
        ) : (
          <p>Choose a state to see complaint channels, consumer agencies, public records, and state-specific resources.</p>
        )}
      </aside>
    </section>
  );
}

export function FeaturedSection({ guides, resources }: { guides: Guide[]; resources: Resource[] }) {
  return (
    <section className="home-featured home-wrap" aria-labelledby="featured-title">
      <div className="home-section-rule">
        <p className="home-card-label">Guides &amp; sources</p>
        <h2 id="featured-title">A few useful places to begin.</h2>
        <a href="/guides">All guides →</a>
      </div>
      <div className="home-editorial-grid">
        <div className="home-feature-stories">
          {guides.map((guide, index) => (
            <a
              className={`home-story-card ${index === 0 ? "home-story-card--lead" : ""}`}
              href={`/guides#guide-${guide.id}`}
              key={guide.id}
            >
              <span className="home-story-meta">Guide · {guide.timeLabel}</span>
              <h3>{guide.title}</h3>
              <p>{guide.summary}</p>
              <span className="home-story-link">Read the guide <ArrowIcon /></span>
            </a>
          ))}
        </div>
        <aside className="home-quick-links" aria-labelledby="quick-links-title">
          <div className="home-quick-links-heading">
            <span>Quick links</span>
            <strong id="quick-links-title">Go directly to the source</strong>
          </div>
          {resources.map((resource) => (
            <a href={resource.url} target="_blank" rel="noreferrer" key={resource.id}>
              <span><small>{resource.publisher}</small><strong>{resource.title}</strong></span>
              <ArrowIcon />
            </a>
          ))}
        </aside>
      </div>
    </section>
  );
}

export function CaseFeature() {
  return (
    <section className="home-case-feature" aria-labelledby="case-feature-title">
      <div className="home-wrap home-case-feature-grid">
        <div className="home-case-label">
          <p className="home-card-label">Featured Research</p>
          <span>Michigan · Texas · Arizona · {featuredResearchStory.publishedAt}</span>
        </div>
        <div className="home-case-copy">
          <h2 id="case-feature-title">
            <a href={featuredResearchStory.href}>{featuredResearchStory.title}</a>
          </h2>
          <p>{featuredResearchStory.deck}</p>
          <p className="home-case-caution">
            Three separate state actions with different facts and procedural status, connected only where the primary records support the comparison.
          </p>
          <div className="home-case-actions">
            <a href={featuredResearchStory.href}>Read the source-backed breakdown →</a>
            <a href="/research">Browse research <ArrowIcon /></a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function PathSection({
  onChoosePath,
}: {
  onChoosePath: (topic: Exclude<TopicFilter, "all">) => void;
}) {
  return (
    <section className="home-paths" aria-labelledby="paths-title">
      <div className="home-wrap home-paths-inner">
        <div>
          <p className="home-card-label">Find the right path</p>
          <h2 id="paths-title">What are you trying to do?</h2>
        </div>
        <div className="home-path-list">
          {pathOptions.map((path, index) => (
            <a href="#resource-directory" onClick={() => onChoosePath(path.topic)} key={path.topic}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <span><strong>{path.label}</strong><small>{path.detail}</small></span>
              <span aria-hidden="true">→</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
