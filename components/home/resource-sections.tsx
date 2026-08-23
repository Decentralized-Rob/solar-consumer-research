import { AccountPanel } from "../account-panel";
import { stateSlug, topics } from "../../lib/content";
import type { Resource, Update } from "../../lib/types";
import { ArrowIcon, SourceType, type State, type TopicFilter } from "./shared";

export function ResourceDirectory({
  selectedState,
  topic,
  resources,
  onTopicChange,
}: {
  selectedState: State;
  topic: TopicFilter;
  resources: Resource[];
  onTopicChange: (topic: TopicFilter) => void;
}) {
  return (
    <section
      id="resource-directory"
      className="home-directory home-wrap"
      aria-labelledby="directory-title"
    >
      <div className="home-directory-heading">
        <div>
          <p className="home-card-label">Verified directory</p>
          <h2 id="directory-title">
            {selectedState.available
              ? `Specific resources for ${selectedState.name}`
              : `${selectedState.name} resources are being prepared`}
          </h2>
        </div>
        <p>
          This list contains state-specific sources only. Federal resources will have their own separate page.
        </p>
      </div>
      <div className="home-topic-tabs" aria-label="Filter resources by topic">
        {topics.map((item) => (
          <button
            className={topic === item.value ? "active" : ""}
            type="button"
            onClick={() => onTopicChange(item.value)}
            key={item.value}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="home-resource-list" aria-live="polite">
        {resources.length > 0 ? resources.map((resource) => (
          <article key={resource.id}>
            <div className="home-resource-meta">
              <SourceType type={resource.publisherType} />
              <span>{resource.lastVerified ? `Verified ${resource.lastVerified}` : resource.sourceDate ? `Source dated ${resource.sourceDate}` : "Official source"}</span>
            </div>
            <div className="home-resource-copy">
              <h3>{resource.title}</h3>
              <p>{resource.summary}</p>
              <small>{resource.publisher}</small>
            </div>
            <a
              href={resource.url}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${resource.title}`}
            >
              Open source <ArrowIcon />
            </a>
          </article>
        )) : (
          <div className="home-resource-empty">No resources are currently listed under this filter.</div>
        )}
      </div>
      <div className="home-directory-footer">
        <span>{resources.length} resources shown</span>
        <a
          className="home-button home-button--dark"
          href={`/states/${stateSlug(selectedState.name)}`}
        >
          Open the {selectedState.name} page
        </a>
      </div>
    </section>
  );
}

export function UpdatesSection({ updates }: { updates: Update[] }) {
  if (updates.length === 0) return null;

  return (
    <section className="home-notebook" aria-labelledby="notebook-title">
      <div className="home-wrap home-notebook-grid">
        <div>
          <p className="home-card-label">Research notebook</p>
          <h2 id="notebook-title">Recent public-source updates</h2>
          <a href="/updates">View all updates →</a>
        </div>
        <div className="home-update-list">
          {updates.slice(0, 2).map((update) => (
            <a href={update.url} target="_blank" rel="noreferrer" key={update.id}>
              <span>{update.publishedAt}</span>
              <strong>{update.title}</strong>
              <p>{update.summary}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SearchPlaceholder() {
  return (
    <section className="home-search-later home-wrap" aria-labelledby="search-later-title">
      <div>
        <p className="home-card-label">Site search</p>
        <h2 id="search-later-title">Search is coming soon.</h2>
        <p>For now, use the topic filters above or browse the full resource and guide pages.</p>
      </div>
      <div className="home-search-disabled" aria-label="Search coming soon">
        <input type="search" placeholder="Search resources and guides" disabled />
        <button type="button" disabled>Coming soon</button>
      </div>
    </section>
  );
}

export function QuestionsSection({ stateCode }: { stateCode: string }) {
  return (
    <section id="questions" className="home-question-section">
      <div className="home-wrap home-question-panel">
        <div>
          <p className="home-card-label home-card-label--light">Questions and research requests</p>
          <h2>Need help finding an official solar resource?</h2>
          <p>
            Tell us what happened and what you are trying to find out. We&apos;ll use the details you provide to
            identify relevant official resources, public records, agencies, and procedures in your area.
          </p>
          <ul>
            <li>Locate agencies, forms, records, and published rules</li>
            <li>Find the public source behind a claim</li>
            <li>Organize a factual research trail</li>
          </ul>
        </div>
        <div className="home-question-account">
          <AccountPanel stateCode={stateCode} />
        </div>
      </div>
    </section>
  );
}
