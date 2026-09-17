"use client";

import { useMemo, useState } from "react";
import { stateSlug, states } from "../lib/content";
import { featuredStateSources } from "../lib/featured-state-sources";
import { consumerProtectionByState, getStateSolarCase } from "../lib/state-research";
import type { Resource } from "../lib/types";
import { FeaturedSection, PathSection } from "./home/discovery-sections";
import { LatestResearchSection } from "./home/latest-research";
import styles from "./home/latest-research.module.css";
import { HomeFooter, HomeHeader } from "./home/navigation";
import {
  QuestionsSection,
  ResourceDirectory,
  SearchPlaceholder,
  UpdatesSection,
} from "./home/resource-sections";
import type { TopicFilter } from "./home/shared";
import { useResearchContent } from "./home/use-research-content";

export function ResearchApp() {
  const [stateCode, setStateCode] = useState("");
  const [topic, setTopic] = useState<TopicFilter>("all");
  const [menuOpen, setMenuOpen] = useState(false);
  const { resourceItems, guideItems, updateItems } = useResearchContent(stateCode);

  const selectedState = states.find((state) => state.code === stateCode);
  const availableResources = useMemo(() => {
    const consumerProtection = consumerProtectionByState[stateCode];
    const solarCase = getStateSolarCase(stateCode);
    const currentEnforcementSources = featuredStateSources[stateCode] ?? [];
    const primaryResources: Resource[] = [];

    if (consumerProtection) {
      primaryResources.push({
        id: `${stateCode.toLowerCase()}-consumer-protection`, stateCode, title: consumerProtection.title,
        summary: consumerProtection.summary, publisher: consumerProtection.publisher,
        publisherType: "government", topic: "complaints", url: consumerProtection.url,
      });
    }

    currentEnforcementSources.forEach((source) => {
      if (source.url === solarCase?.url) return;
      primaryResources.push({
        id: source.id, stateCode, title: source.title, summary: source.summary,
        publisher: source.publisher, publisherType: "government", topic: "complaints",
        url: source.url, sourceDate: source.publishedAt,
      });
    });

    if (solarCase) {
      primaryResources.push({
        id: `${stateCode.toLowerCase()}-${solarCase.id}`, stateCode, title: solarCase.title,
        summary: solarCase.summary, publisher: solarCase.publisher,
        publisherType: solarCase.publisher === "GBH News" ? "private_nonprofit" : "government",
        topic: "complaints", url: solarCase.url, sourceDate: solarCase.publishedAt,
      });
    }

    const additionalResources = resourceItems.filter(
      (resource) => resource.stateCode === stateCode
        && resource.id !== "ma-electric-company"
        && !primaryResources.some((primary) => primary.url === resource.url),
    );
    return [...primaryResources, ...additionalResources];
  }, [resourceItems, stateCode]);

  const filteredResources = useMemo(
    () => availableResources.filter((resource) => topic === "all" || resource.topic === topic),
    [availableResources, topic],
  );
  const featuredGuides = ["ma-ago-complaint-guide", "organize-record"]
    .map((id) => guideItems.find((guide) => guide.id === id))
    .filter((guide): guide is NonNullable<typeof guide> => Boolean(guide))
    .filter((guide) => guide.stateCode === null || guide.stateCode === stateCode);
  const filteredUpdates = updateItems.filter((update) => update.stateCode === null || update.stateCode === stateCode);

  function changeState(nextStateCode: string) {
    if (!states.some((state) => state.code === nextStateCode)) return;
    setStateCode(nextStateCode);
    setTopic("all");
  }

  function choosePath(nextTopic: Exclude<TopicFilter, "all">) {
    setTopic(nextTopic);
    document.getElementById(selectedState ? "resource-directory" : "start")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="home-shell">
      <HomeHeader menuOpen={menuOpen} onMenuToggle={() => setMenuOpen((current) => !current)} onMenuClose={() => setMenuOpen(false)} />
      <main id="top">
        <LatestResearchSection />

        <section id="start" className={`home-wrap ${styles.stateFinder}`} aria-labelledby="home-state-finder-title">
          <div className={styles.stateCopy}>
            <p className="home-card-label">Who are you researching?</p>
            <h2 id="home-state-finder-title">Find your state.</h2>
            <p>Go directly to complaint channels, consumer agencies, public records, and state-specific solar research.</p>
          </div>
          <div className={styles.stateControl}>
            <label htmlFor="home-state-select">State</label>
            <select id="home-state-select" value={stateCode} onChange={(event) => changeState(event.target.value)}>
              <option value="" disabled>Choose a state</option>
              {states.map((state) => <option key={state.code} value={state.code}>{state.name}</option>)}
            </select>
            {selectedState ? (
              <a className="home-state-page-link" href={`/states/${stateSlug(selectedState.name)}`}>
                Open the {selectedState.name} page →
              </a>
            ) : null}
          </div>
        </section>

        <FeaturedSection guides={featuredGuides} resources={availableResources.slice(0, 4)} />
        <PathSection onChoosePath={choosePath} />
        {selectedState ? (
          <ResourceDirectory selectedState={selectedState} topic={topic} resources={filteredResources} onTopicChange={setTopic} />
        ) : null}
        <UpdatesSection updates={filteredUpdates} />
        <SearchPlaceholder />
        <QuestionsSection />
      </main>
      <HomeFooter />
    </div>
  );
}
