"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { AccountPanel } from "./account-panel";
import { guides, resources, states, topics, updates } from "../lib/content";
import type { Guide, Resource, ResourceTopic, Update } from "../lib/types";

type TopicFilter = "all" | ResourceTopic;

type ApiResource = {
  id: string;
  state_code: string | null;
  title: string;
  summary: string;
  topic: ResourceTopic;
  url: string;
  last_verified_at: string;
  source_domains: { publisher_name: string; publisher_type: Resource["publisherType"] };
};

type ApiGuide = {
  id: string;
  state_code: string | null;
  title: string;
  summary: string;
  time_label: string;
  source_title: string;
  source_url: string;
  last_verified_at: string;
  guide_steps: Array<{ title: string; detail: string }>;
};

type ApiUpdate = {
  id: string;
  state_code: string | null;
  title: string;
  summary: string;
  url: string;
  source_published_at: string | null;
  last_verified_at: string;
  source_domains: { publisher_name: string };
};

type SearchResult = {
  id: string;
  type: "resource" | "guide" | "update";
  title: string;
  summary: string;
  publisher: string;
  url: string | null;
  meta: string;
};

function displayDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

function SourceType({ type }: { type: "government" | "regulator" | "private_nonprofit" }) {
  const labels = {
    government: "Government source",
    regulator: "Regulator",
    private_nonprofit: "Private nonprofit",
  };
  return <span className={`source-type source-type--${type}`}>{labels[type]}</span>;
}

export function ResearchApp() {
  const [stateCode, setStateCode] = useState("MA");
  const [topic, setTopic] = useState<TopicFilter>("all");
  const [openGuide, setOpenGuide] = useState<string | null>(guides[0]?.id ?? null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchBusy, setSearchBusy] = useState(false);
  const [searchMessage, setSearchMessage] = useState("");
  const [resourceItems, setResourceItems] = useState<Resource[]>(resources);
  const [guideItems, setGuideItems] = useState<Guide[]>(guides);
  const [updateItems, setUpdateItems] = useState<Update[]>(updates);

  useEffect(() => {
    let active = true;

    async function loadContent() {
      try {
        const [resourceResponse, guideResponse, updateResponse] = await Promise.all([
          fetch(`/api/resources?state=${stateCode}`),
          fetch(`/api/guides?state=${stateCode}`),
          fetch(`/api/updates?state=${stateCode}`),
        ]);
        if (!resourceResponse.ok || !guideResponse.ok || !updateResponse.ok) return;

        const resourcePayload = (await resourceResponse.json()) as { data: ApiResource[] };
        const guidePayload = (await guideResponse.json()) as { data: ApiGuide[] };
        const updatePayload = (await updateResponse.json()) as { data: ApiUpdate[] };
        if (!active) return;

        setResourceItems(resourcePayload.data.map((item) => ({
          id: item.id,
          stateCode: item.state_code,
          title: item.title,
          summary: item.summary,
          publisher: item.source_domains.publisher_name,
          publisherType: item.source_domains.publisher_type,
          topic: item.topic,
          url: item.url,
          lastVerified: displayDate(item.last_verified_at),
        })));
        setGuideItems(guidePayload.data.map((item) => ({
          id: item.id,
          stateCode: item.state_code,
          title: item.title,
          summary: item.summary,
          timeLabel: item.time_label,
          steps: item.guide_steps.map((step) => ({ title: step.title, detail: step.detail })),
          sourceTitle: item.source_title,
          sourceUrl: item.source_url,
          lastVerified: displayDate(item.last_verified_at),
        })));
        setUpdateItems(updatePayload.data.map((item) => ({
          id: item.id,
          stateCode: item.state_code,
          title: item.title,
          summary: item.summary,
          publisher: item.source_domains.publisher_name,
          publishedAt: item.source_published_at
            ? `Published ${displayDate(item.source_published_at)}`
            : `Verified ${displayDate(item.last_verified_at)}`,
          url: item.url,
        })));
      } catch {
        // The verified local snapshot stays visible if the API is unavailable.
      }
    }

    void loadContent();
    return () => { active = false; };
  }, [stateCode]);

  const selectedState = states.find((state) => state.code === stateCode) ?? states[0];
  const availableResources = useMemo(
    () => resourceItems.filter((resource) => resource.stateCode === null || resource.stateCode === stateCode),
    [resourceItems, stateCode],
  );
  const filteredResources = useMemo(
    () => availableResources.filter((resource) => topic === "all" || resource.topic === topic),
    [availableResources, topic],
  );
  const filteredGuides = guideItems.filter(
    (guide) => guide.stateCode === null || guide.stateCode === stateCode,
  );
  const filteredUpdates = updateItems.filter(
    (update) => update.stateCode === null || update.stateCode === stateCode,
  );

  function localSearch(query: string): SearchResult[] {
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    const matches = (...values: string[]) => {
      const haystack = values.join(" ").toLowerCase();
      return terms.every((term) => haystack.includes(term));
    };

    return [
      ...availableResources
        .filter((item) => matches(item.title, item.summary, item.publisher, item.topic))
        .map((item) => ({ id: item.id, type: "resource" as const, title: item.title, summary: item.summary, publisher: item.publisher, url: item.url, meta: item.topic })),
      ...filteredGuides
        .filter((item) => matches(item.title, item.summary, item.sourceTitle, ...item.steps.flatMap((step) => [step.title, step.detail])))
        .map((item) => ({ id: item.id, type: "guide" as const, title: item.title, summary: item.summary, publisher: item.sourceTitle, url: null, meta: item.timeLabel })),
      ...filteredUpdates
        .filter((item) => matches(item.title, item.summary, item.publisher))
        .map((item) => ({ id: item.id, type: "update" as const, title: item.title, summary: item.summary, publisher: item.publisher, url: item.url, meta: "Update" })),
    ];
  }

  async function runSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = searchQuery.trim();
    if (query.length < 2) {
      setSearchMessage("Enter at least two characters.");
      return;
    }

    setSearchBusy(true);
    setSearchMessage("");
    setSubmittedQuery(query);
    const snapshotResults = localSearch(query);
    setSearchResults(snapshotResults);
    window.setTimeout(() => document.getElementById("search-results")?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 3500);
    try {
      const response = await fetch(`/api/search?state=${stateCode}&q=${encodeURIComponent(query)}`, { signal: controller.signal });
      if (!response.ok) throw new Error("Search unavailable");
      const payload = (await response.json()) as { data: SearchResult[] };
      setSearchResults(payload.data);
    } catch {
      setSearchMessage("Showing results from the latest verified site snapshot.");
    } finally {
      window.clearTimeout(timeout);
      setSearchBusy(false);
    }
  }

  function openGuideFromSearch(id: string) {
    setOpenGuide(id);
    window.setTimeout(() => document.getElementById(`guide-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
  }

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="wordmark" href="#top" aria-label="Solar Consumer Research home">
          <span className="wordmark-mark" aria-hidden="true">S</span>
          <span>Solar Consumer Research</span>
        </a>
        <button
          className="mobile-menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span className="sr-only">{menuOpen ? "Close navigation" : "Open navigation"}</span>
          <span aria-hidden="true">{menuOpen ? "Close" : "Menu"}</span>
        </button>
        <nav id="primary-navigation" className={`desktop-nav ${menuOpen ? "is-open" : ""}`} aria-label="Primary navigation">
          <a href="/resources" onClick={() => setMenuOpen(false)}>Resources</a>
          <a href="/guides" onClick={() => setMenuOpen(false)}>Guides</a>
          <a href="/updates" onClick={() => setMenuOpen(false)}>Updates</a>
          <a href="/methodology" onClick={() => setMenuOpen(false)}>How we verify</a>
        </nav>
        <a className="account-button" href="#questions">Ask a question</a>
      </header>

      <main id="top">
        <section className="hero section-wrap">
          <div className="hero-copy">
            <p className="eyebrow"><span className="status-dot" /> Massachusetts is live</p>
            <h1>Problems with your solar company? Start here.</h1>
            <p className="hero-lede">
              Search verified public resources, understand the available complaint channels, and organize what happened.
            </p>
            <form className="hero-search" role="search" onSubmit={runSearch}>
              <label htmlFor="site-search">Search resources, guides, and updates</label>
              <div className="search-control">
                <input
                  id="site-search"
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Try: financing complaint, permits, utility"
                  maxLength={120}
                />
                <button type="submit" disabled={searchBusy}>{searchBusy ? "Searching..." : "Search"}</button>
              </div>
              {searchMessage && <p className="search-note" role="status">{searchMessage}</p>}
            </form>
            <div className="hero-actions">
              <a className="button button--primary" href="/resources">Browse resources</a>
              <a className="button button--secondary" href="/guides">View guides</a>
            </div>
            <p className="scope-note">
              Research information only. No referrals, contract interpretation, or individualized legal guidance.
            </p>
          </div>

          <aside className="state-panel" aria-labelledby="state-panel-title">
            <div className="panel-kicker">Browse by location</div>
            <h2 id="state-panel-title">Choose your state</h2>
            <label className="select-label" htmlFor="state-select">State</label>
            <select
              id="state-select"
              value={stateCode}
              onChange={(event) => {
                const nextState = states.find((state) => state.code === event.target.value);
                if (nextState?.available) {
                  setStateCode(nextState.code);
                  setTopic("all");
                }
              }}
            >
              {states.map((state) => (
                <option key={state.code} value={state.code} disabled={!state.available}>
                  {state.name}{state.available ? "" : " - coming soon"}
                </option>
              ))}
            </select>
            <div className="state-result">
              <span className="state-code">{selectedState.code}</span>
              <div>
                <strong>{selectedState.name}</strong>
                <span>{availableResources.length} verified resources available</span>
              </div>
            </div>
            <p className="state-footnote">Federal resources are included with every state.</p>
          </aside>
        </section>

        {submittedQuery && (
          <section id="search-results" className="search-results section-wrap" aria-live="polite">
            <div className="search-results-heading">
              <div>
                <p className="eyebrow">Search results</p>
                <h2>{searchResults.length === 0 ? "No matches found" : `${searchResults.length} result${searchResults.length === 1 ? "" : "s"}`}</h2>
              </div>
              <p>For “{submittedQuery}” in Massachusetts and federal sources.</p>
            </div>
            {searchResults.length > 0 ? (
              <div className="search-result-list">
                {searchResults.map((result) => {
                  const isGuide = result.type === "guide";
                  return (
                    <a
                      className="search-result-row"
                      href={isGuide ? `#guide-${result.id}` : result.url ?? "#"}
                      target={isGuide ? undefined : "_blank"}
                      rel={isGuide ? undefined : "noreferrer"}
                      key={`${result.type}-${result.id}`}
                      onClick={isGuide ? (event) => { event.preventDefault(); openGuideFromSearch(result.id); } : undefined}
                    >
                      <span className="search-result-type">{result.type}</span>
                      <span className="search-result-copy">
                        <strong>{result.title}</strong>
                        <span>{result.summary}</span>
                      </span>
                      <span className="search-result-source">{result.publisher}</span>
                      <ArrowIcon />
                    </a>
                  );
                })}
              </div>
            ) : (
              <div className="empty-search">
                <p>Try a broader term such as “complaint,” “financing,” “records,” or “utility.”</p>
                <a href="#resources">Browse all verified resources</a>
              </div>
            )}
          </section>
        )}

        <section className="quick-paths section-wrap" aria-labelledby="quick-paths-title">
          <div className="section-heading compact-heading">
            <p className="eyebrow">A practical starting point</p>
            <h2 id="quick-paths-title">What do you need to do?</h2>
          </div>
          <div className="path-grid">
            <a className="path-card" href="/guides">
              <span className="path-number">01</span>
              <h3>Organize your records</h3>
              <p>Turn contracts, messages, plans, bills, and dates into a usable project file.</p>
              <span className="text-link">Open the guide <ArrowIcon /></span>
            </a>
            <a className="path-card" href="/resources">
              <span className="path-number">02</span>
              <h3>Identify the right channel</h3>
              <p>Compare verified state and federal resources by topic and agency role.</p>
              <span className="text-link">Browse the library <ArrowIcon /></span>
            </a>
            <a className="path-card path-card--dark" href="#questions">
              <span className="path-number">03</span>
              <h3>Ask a research question</h3>
              <p>Submit a private question when you need help locating public information.</p>
              <span className="text-link">See how it works <ArrowIcon /></span>
            </a>
          </div>
        </section>

        <section id="resources" className="resource-section">
          <div className="section-wrap">
            <div className="section-heading split-heading">
              <div>
                <p className="eyebrow">Official resource library</p>
                <h2>{selectedState.name}</h2>
              </div>
              <p>Each listing includes its publisher, source type, and last verification date.</p>
            </div>
            <div className="topic-tabs" role="group" aria-label="Filter resources by topic">
              {topics.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  className={topic === item.value ? "active" : ""}
                  onClick={() => setTopic(item.value)}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <p className="resource-count">
              Showing {filteredResources.length} of {availableResources.length} verified resources
            </p>
            <div className="resource-grid" aria-live="polite">
              {filteredResources.map((resource) => (
                <article className="resource-card" key={resource.id}>
                  <div className="resource-card-top">
                    <SourceType type={resource.publisherType} />
                    <span className="verified-date">Verified {resource.lastVerified}</span>
                  </div>
                  <h3>{resource.title}</h3>
                  <p>{resource.summary}</p>
                  <div className="resource-card-bottom">
                    <span>{resource.publisher}</span>
                    <a href={resource.url} target="_blank" rel="noreferrer" aria-label={`Open ${resource.title}`}>
                      Open source <ArrowIcon />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="guides" className="guides-section section-wrap">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">Step-by-step guides</p>
              <h2>Plain instructions, tied to sources.</h2>
            </div>
            <p>These guides organize published information. They do not assess individual situations.</p>
          </div>
          <div className="guide-list">
            {filteredGuides.map((guide, index) => {
              const isOpen = openGuide === guide.id;
              return (
                <article id={`guide-${guide.id}`} className={`guide-item ${isOpen ? "is-open" : ""}`} key={guide.id}>
                  <button
                    type="button"
                    className="guide-trigger"
                    aria-expanded={isOpen}
                    aria-controls={`guide-${guide.id}`}
                    onClick={() => setOpenGuide(isOpen ? null : guide.id)}
                  >
                    <span className="guide-index">{String(index + 1).padStart(2, "0")}</span>
                    <span className="guide-title-block">
                      <strong>{guide.title}</strong>
                      <span>{guide.summary}</span>
                    </span>
                    <span className="guide-time">{guide.timeLabel}</span>
                    <span className="guide-toggle" aria-hidden="true">{isOpen ? "-" : "+"}</span>
                  </button>
                  {isOpen && (
                    <div className="guide-content" id={`guide-${guide.id}`}>
                      <ol>
                        {guide.steps.map((step) => (
                          <li key={step.title}>
                            <strong>{step.title}</strong>
                            <p>{step.detail}</p>
                          </li>
                        ))}
                      </ol>
                      <div className="guide-source">
                        <span>Source verified {guide.lastVerified}</span>
                        <a href={guide.sourceUrl} target="_blank" rel="noreferrer">
                          {guide.sourceTitle} <ArrowIcon />
                        </a>
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        <section id="updates" className="updates-section">
          <div className="section-wrap">
            <div className="section-heading split-heading">
              <div>
                <p className="eyebrow">News and updates</p>
                <h2>What changed in the public record.</h2>
              </div>
              <p>Short summaries link directly to the publishing agency or source organization.</p>
            </div>
            <div className="update-list">
              {filteredUpdates.map((update) => (
                <a className="update-row" href={update.url} target="_blank" rel="noreferrer" key={update.id}>
                  <span className="update-date">{update.publishedAt}</span>
                  <span className="update-copy">
                    <strong>{update.title}</strong>
                    <span>{update.summary}</span>
                  </span>
                  <span className="update-publisher">{update.publisher}</span>
                  <ArrowIcon />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="questions" className="question-section section-wrap">
          <div className="question-panel">
            <div>
              <p className="eyebrow eyebrow--light">Private research questions</p>
              <h2>Can&apos;t locate the right public information?</h2>
              <p>
                Signed-in users can submit a question about where to look or which official resource covers a topic. Questions and responses remain private.
              </p>
            </div>
            <div className="question-rules">
              <span>What this can cover</span>
              <ul>
                <li>Locating agencies, forms, records, and published rules</li>
                <li>Finding the source behind a public claim</li>
                <li>Organizing a research trail</li>
              </ul>
              <span>What it will not cover</span>
              <ul>
                <li>Contract interpretation or case evaluation</li>
                <li>Drafting demands or personalized legal conclusions</li>
                <li>Referrals to contractors or paid providers</li>
              </ul>
              <AccountPanel stateCode={stateCode} />
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="section-wrap footer-inner">
          <div>
            <strong>Solar Consumer Research</strong>
            <p>Independent research infrastructure for residential solar consumers.</p>
          </div>
          <div className="footer-links">
            <a href="/resources">Resources</a>
            <a href="/guides">Guides</a>
            <a href="/updates">Updates</a>
            <a href="/about">About</a>
            <a href="/methodology">Methodology</a>
            <a href="/corrections">Corrections</a>
            <a href="/privacy">Privacy</a>
          </div>
          <p className="footer-disclaimer">
            Educational information only. This site does not provide legal advice or professional referrals.
          </p>
        </div>
      </footer>
    </div>
  );
}
