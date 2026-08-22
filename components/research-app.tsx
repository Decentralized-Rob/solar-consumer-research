"use client";

import { useMemo, useState } from "react";
import { states } from "../lib/content";
import { consumerProtectionByState, getStateSolarCase } from "../lib/state-research";
import type { Resource } from "../lib/types";
import {
  CaseFeature,
  FeaturedSection,
  HeroSection,
  PathSection,
} from "./home/discovery-sections";
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
  const [stateCode, setStateCode] = useState("MA");
  const [topic, setTopic] = useState<TopicFilter>("all");
  const [menuOpen, setMenuOpen] = useState(false);
  const { resourceItems, guideItems, updateItems } = useResearchContent(stateCode);

  const selectedState = states.find((state) => state.code === stateCode) ?? states[0];
  const availableResources = useMemo(() => {
    const consumerProtection = consumerProtectionByState[stateCode];
    const solarCase = getStateSolarCase(stateCode);
    const primaryResources: Resource[] = [];

    if (consumerProtection) {
      primaryResources.push({
        id: `${stateCode.toLowerCase()}-consumer-protection`,
        stateCode,
        title: consumerProtection.title,
        summary: consumerProtection.summary,
        publisher: consumerProtection.publisher,
        publisherType: "government",
        topic: "complaints",
        url: consumerProtection.url,
        lastVerified: consumerProtection.lastVerified,
      });
    }

    if (solarCase) {
      primaryResources.push({
        id: `${stateCode.toLowerCase()}-${solarCase.id}`,
        stateCode,
        title: solarCase.title,
        summary: solarCase.summary,
        publisher: solarCase.publisher,
        publisherType: solarCase.publisher === "GBH News" ? "private_nonprofit" : "government",
        topic: "complaints",
        url: solarCase.url,
        lastVerified: "Aug 21, 2026",
      });
    }

    const additionalResources = resourceItems.filter(
      (resource) => resource.stateCode === stateCode
        && resource.id !== "ma-electric-company"
        && resource.url !== consumerProtection?.url,
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
    document.getElementById("resource-directory")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="home-shell">
      <HomeHeader menuOpen={menuOpen} onMenuToggle={() => setMenuOpen((current) => !current)} onMenuClose={() => setMenuOpen(false)} />
      <main id="top">
        <HeroSection stateCode={stateCode} selectedState={selectedState} resourceCount={availableResources.length} onStateChange={changeState} />
        <FeaturedSection guides={featuredGuides} resources={availableResources.slice(0, 4)} />
        <CaseFeature />
        <PathSection onChoosePath={choosePath} />
        <ResourceDirectory selectedState={selectedState} topic={topic} resources={filteredResources} onTopicChange={setTopic} />
        <UpdatesSection updates={filteredUpdates} />
        <SearchPlaceholder />
        <QuestionsSection stateCode={stateCode} />
      </main>
      <HomeFooter />
    </div>
  );
}
