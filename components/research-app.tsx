"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AccountPanel } from "./account-panel";
import { dsireStateUrl, guides, resources, stateSlug, states, topics, updates } from "../lib/content";
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
  slug: string;
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

const pathOptions: Array<{
  topic: Exclude<TopicFilter, "all">;
  label: string;
  detail: string;
}> = [
  { topic: "complaints", label: "Where can I file a solar complaint?", detail: "Official state complaint channels and what they handle" },
  { topic: "utility", label: "Who handles a solar utility problem?", detail: "Billing, service, meters, and interconnection" },
  { topic: "financing", label: "Where can I report a solar loan or payment problem?", detail: "Consumer agencies that handle financial complaints" },
  { topic: "records", label: "How do I find permits, filings, and public records?", detail: "Official records and document request pages" },
];

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

function SourceType({ type }: { type: Resource["publisherType"] }) {
  const labels = {
    government: "Government",
    regulator: "Regulator",
    private_nonprofit: "Private nonprofit",
    research: "Research database",
  };
  return <span className={`home-source-type home-source-type--${type}`}>{labels[type]}</span>;
}

export function ResearchApp() {
  const [stateCode, setStateCode] = useState("MA");
  const [topic, setTopic] = useState<TopicFilter>("all");
  const [menuOpen, setMenuOpen] = useState(false);
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
          // The database ID is a UUID; homepage guide selection uses stable slugs.
          id: item.slug,
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
        // Keep the verified local snapshot visible if the API is unavailable.
      }
    }

    void loadContent();
    return () => { active = false; };
  }, [stateCode]);

  const selectedState = states.find((state) => state.code === stateCode) ?? states[0];
  const availableResources = useMemo(
    () => [
      ...resourceItems.filter(
        (resource) => resource.stateCode === stateCode && resource.id !== "ma-electric-company",
      ),
      {
        id: `dsire-${stateCode.toLowerCase()}-solar`,
        stateCode,
        title: `What solar policies and programs are listed for ${selectedState.name}?`,
        summary: `The DSIRE state page collects solar policies, programs, incentives, net-metering rules, and interconnection information available for ${selectedState.name}.`,
        publisher: "DSIRE — N.C. Clean Energy Technology Center",
        publisherType: "research" as const,
        topic: "programs" as const,
        url: dsireStateUrl(stateCode),
        lastVerified: "Aug 18, 2026",
      },
    ],
    [resourceItems, selectedState.name, stateCode],
  );
  const filteredResources = useMemo(
    () => availableResources.filter((resource) => topic === "all" || resource.topic === topic),
    [availableResources, topic],
  );
  const quickLinks = availableResources.slice(0, 4);
  const featuredGuides = ["ma-ago-complaint-guide", "organize-record"]
    .map((id) => guideItems.find((guide) => guide.id === id))
    .filter((guide): guide is Guide => Boolean(guide))
    .filter((guide) => guide.stateCode === null || guide.stateCode === stateCode);
  const filteredUpdates = updateItems.filter(
    (update) => update.stateCode === null || update.stateCode === stateCode,
  );

  function choosePath(nextTopic: Exclude<TopicFilter, "all">) {
    setTopic(nextTopic);
    document.getElementById("resource-directory")?.scrollIntoView({ behavior: "smooth" });
  }

  function openQuestionForm() {
    document.getElementById("questions")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="home-shell">
      <header className="home-header">
        <a className="home-wordmark" href="#top" aria-label="Solar Consumer Research home">
          <Image className="brand-logo" src="/brand/solar-consumer-research.svg" alt="" width={690} height={104} priority unoptimized />
        </a>
        <button className="home-menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="home-navigation" onClick={() => setMenuOpen((current) => !current)}>
          {menuOpen ? "Close" : "Menu"}
        </button>
        <nav id="home-navigation" className={`home-nav ${menuOpen ? "is-open" : ""}`} aria-label="Primary navigation">
          <a href="#start" onClick={() => setMenuOpen(false)}>Start here</a>
          <a href="/resources" onClick={() => setMenuOpen(false)}>States</a>
          <a href="/federal-resources" onClick={() => setMenuOpen(false)}>Federal</a>
          <a href="/guides" onClick={() => setMenuOpen(false)}>Guides</a>
          <a href="/cases/connecticut-attorney-general-sunrun-lawsuit" onClick={() => setMenuOpen(false)}>Cases</a>
          <a href="/about" onClick={() => setMenuOpen(false)}>About</a>
        </nav>
        <button className="home-header-action" type="button" onClick={openQuestionForm}>Ask a question</button>
      </header>

      <main id="top">
        <section className="home-hero home-wrap">
          <div className="home-hero-copy">
            <p className="home-kicker"><span /> Independent public-source research</p>
            <h1>Solar problems are complicated. Finding where to start shouldn&apos;t be.</h1>
            <p className="home-hero-lede">Clear paths to official complaint channels, consumer agencies, public records, and source-based guides.</p>
            <div className="home-hero-actions">
              <a className="home-button home-button--dark" href="#start">Choose your state</a>
              <a className="home-button home-button--outline" href="/resources">Browse states</a>
            </div>
            <p className="home-scope-note">General public information only. No legal advice, claim evaluation, or findings of wrongdoing.</p>
          </div>

          <aside id="start" className="home-state-card" aria-labelledby="home-state-title">
            <p className="home-card-label">Start here</p>
            <h2 id="home-state-title">Select your state.</h2>
            <label htmlFor="home-state-select">State</label>
            <select
              id="home-state-select"
              value={stateCode}
              onChange={(event) => {
                const nextState = states.find((state) => state.code === event.target.value);
                if (nextState) {
                  setStateCode(nextState.code);
                  setTopic("all");
                }
              }}
            >
              {states.map((state) => (
                <option key={state.code} value={state.code}>
                  {state.name}
                </option>
              ))}
            </select>
            <div className={`home-state-status ${selectedState.available ? "" : "is-coming-soon"}`}>
              <span>{selectedState.code}</span>
              <div>
                <strong>{selectedState.name}</strong>
                <small>
                  {selectedState.available
                    ? `${availableResources.length} verified state resources`
                    : "Verified statewide solar starting point"}
                </small>
              </div>
            </div>
            <p>
              {selectedState.available
                ? "State-specific resources are available below."
                : "A solar-specific state source is available now. Additional consumer-protection research is in progress."}
            </p>
            <a className="home-state-page-link" href={`/states/${stateSlug(selectedState.name)}`}>Open the {selectedState.name} page →</a>
          </aside>
        </section>

        <section className="home-featured home-wrap" aria-labelledby="featured-title">
          <div className="home-section-rule">
            <p className="home-card-label">Featured</p>
            <h2 id="featured-title">A few useful places to begin.</h2>
            <a href="/guides">All guides →</a>
          </div>
          <div className="home-editorial-grid">
            <div className="home-feature-stories">
              {featuredGuides.map((guide, index) => (
                <a className={`home-story-card ${index === 0 ? "home-story-card--lead" : ""}`} href={`/guides#guide-${guide.id}`} key={guide.id}>
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
              {quickLinks.map((resource) => (
                <a href={resource.url} target="_blank" rel="noreferrer" key={resource.id}>
                  <span><small>{resource.publisher}</small><strong>{resource.title}</strong></span>
                  <ArrowIcon />
                </a>
              ))}
            </aside>
          </div>
        </section>

        <section className="home-case-feature" aria-labelledby="case-feature-title">
          <div className="home-wrap home-case-feature-grid">
            <div className="home-case-label">
              <p className="home-card-label">Case to follow</p>
              <span>Connecticut · Filed July 19, 2024</span>
            </div>
            <div className="home-case-copy">
              <h2 id="case-feature-title">
                <a href="/cases/connecticut-attorney-general-sunrun-lawsuit">
                  What does Connecticut&apos;s lawsuit against Sunrun allege?
                </a>
              </h2>
              <p>The Connecticut Attorney General sued Sunrun, two solar companies, and two salespeople. The complaint alleges contracts without informed consent, forged signatures, consumer impersonation, unpermitted work, and systems that did not function.</p>
              <p className="home-case-caution">These are allegations in a government complaint, not findings by this site or a final court decision.</p>
              <div className="home-case-actions">
                <a href="/cases/connecticut-attorney-general-sunrun-lawsuit">Read the case summary →</a>
                <a href="https://portal.ct.gov/ag/press-releases/2024-press-releases/attorney-general-tong-sues-sunrun" target="_blank" rel="noreferrer">Read the official announcement <ArrowIcon /></a>
              </div>
            </div>
          </div>
        </section>

        <section className="home-paths" aria-labelledby="paths-title">
          <div className="home-wrap home-paths-inner">
            <div><p className="home-card-label">Find the right path</p><h2 id="paths-title">What are you trying to do?</h2></div>
            <div className="home-path-list">
              {pathOptions.map((path, index) => (
                <a href="#resource-directory" onClick={() => choosePath(path.topic)} key={path.topic}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span><strong>{path.label}</strong><small>{path.detail}</small></span>
                  <span aria-hidden="true">→</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="resource-directory" className="home-directory home-wrap" aria-labelledby="directory-title">
          <div className="home-directory-heading">
            <div>
              <p className="home-card-label">Verified directory</p>
              <h2 id="directory-title">
                {selectedState.available
                  ? `Specific resources for ${selectedState.name}`
                  : `${selectedState.name} resources are being prepared`}
              </h2>
            </div>
            <p>This list contains state-specific sources only. Federal resources will have their own separate page.</p>
          </div>
          <div className="home-topic-tabs" aria-label="Filter resources by topic">
            {topics.map((item) => (
              <button className={topic === item.value ? "active" : ""} type="button" onClick={() => setTopic(item.value)} key={item.value}>{item.label}</button>
            ))}
          </div>
          <div className="home-resource-list" aria-live="polite">
            {filteredResources.length > 0 ? filteredResources.map((resource) => (
              <article key={resource.id}>
                <div className="home-resource-meta"><SourceType type={resource.publisherType} /><span>Verified {resource.lastVerified}</span></div>
                <div className="home-resource-copy"><h3>{resource.title}</h3><p>{resource.summary}</p><small>{resource.publisher}</small></div>
                <a href={resource.url} target="_blank" rel="noreferrer" aria-label={`Open ${resource.title}`}>Open source <ArrowIcon /></a>
              </article>
            )) : <div className="home-resource-empty">No resources are currently listed under this filter.</div>}
          </div>
          <div className="home-directory-footer"><span>{filteredResources.length} resources shown</span><a className="home-button home-button--dark" href={`/states/${stateSlug(selectedState.name)}`}>Open the {selectedState.name} page</a></div>
        </section>

        {filteredUpdates.length > 0 && (
          <section className="home-notebook" aria-labelledby="notebook-title">
            <div className="home-wrap home-notebook-grid">
              <div><p className="home-card-label">Research notebook</p><h2 id="notebook-title">Recent public-source updates</h2><a href="/updates">View all updates →</a></div>
              <div className="home-update-list">
                {filteredUpdates.slice(0, 2).map((update) => (
                  <a href={update.url} target="_blank" rel="noreferrer" key={update.id}>
                    <span>{update.publishedAt}</span><strong>{update.title}</strong><p>{update.summary}</p>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="home-search-later home-wrap" aria-labelledby="search-later-title">
          <div><p className="home-card-label">Site search</p><h2 id="search-later-title">Search is coming soon.</h2><p>For now, use the topic filters above or browse the full resource and guide pages.</p></div>
          <div className="home-search-disabled" aria-label="Search coming soon"><input type="search" placeholder="Search resources and guides" disabled /><button type="button" disabled>Coming soon</button></div>
        </section>

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
                <li>State and local complaint or licensing information</li>
                <li>Public records, permit, and utility resources</li>
                <li>The official source behind a claim or process</li>
              </ul>
            </div>
            <div className="home-question-account">
              <AccountPanel stateCode={stateCode} />
            </div>
          </div>
        </section>
      </main>

      <footer className="home-footer">
        <div className="home-wrap home-footer-inner">
          <div><strong>Solar Consumer Research</strong><p>Independent public-source research for residential solar consumers.</p></div>
          <nav aria-label="Footer navigation"><a href="/resources">Resources</a><a href="/federal-resources">Federal</a><a href="/guides">Guides</a><a href="/updates">Updates</a><a href="/methodology">Methodology</a><a href="/corrections">Corrections</a><a href="/privacy">Privacy</a><a href="/disclaimer">Disclaimer</a></nav>
          <p>General information only. No legal advice or attorney-client relationship.</p>
        </div>
      </footer>
    </div>
  );
}
