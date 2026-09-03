import { ResearchHelpForm } from "../research-help-form";
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

export function QuestionsSection() {
  return (
    <section id="questions" className="home-question-section">
      <div className="home-wrap home-question-panel">
        <div>
          <p className="home-card-label home-card-label--light">Start with self-help</p>
          <h2>Use the free help already available.</h2>
          <p className="home-question-intro">
            Before paying for help, gather your records and use the public complaint, consumer, and regulatory
            channels that apply to your situation. They can create a clear paper trail and point you to the next step.
          </p>
          <div className="home-self-help-steps">
            <article>
              <span>01</span>
              <div>
                <h3>Save the details</h3>
                <p>Keep your agreement, messages, invoices, photos, and a dated record of what happened.</p>
              </div>
            </article>
            <article>
              <span>02</span>
              <div>
                <h3>Use every relevant free channel</h3>
                <p>Submit the complaint forms, requests, or reports that fit the issue, and save confirmation numbers.</p>
              </div>
            </article>
            <article>
              <span>03</span>
              <div>
                <h3>Keep the paper trail going</h3>
                <p>Record responses and deadlines so you can follow up with clear, complete information.</p>
              </div>
            </article>
          </div>
          <p className="home-question-boundary">
            This site provides research help, not legal advice. Use the form if you need help finding the public
            resources that may fit your situation.
          </p>
        </div>
        <div className="home-question-account">
          <ResearchHelpForm />
        </div>
      </div>
    </section>
  );
}
