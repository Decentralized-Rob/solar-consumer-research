"use client";

import { useEffect, useState } from "react";
import { guides, resources, updates } from "../../lib/content";
import type { Guide, Resource, ResourceTopic, Update } from "../../lib/types";

type ApiResource = {
  id: string;
  state_code: string | null;
  title: string;
  summary: string;
  topic: ResourceTopic;
  url: string;
  last_verified_at: string;
  source_domains: {
    publisher_name: string;
    publisher_type: Resource["publisherType"];
  };
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

function displayDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

function mapResource(item: ApiResource): Resource {
  return {
    id: item.id,
    stateCode: item.state_code,
    title: item.title,
    summary: item.summary,
    publisher: item.source_domains.publisher_name,
    publisherType: item.source_domains.publisher_type,
    topic: item.topic,
    url: item.url,
    lastVerified: displayDate(item.last_verified_at),
  };
}

function mapGuide(item: ApiGuide): Guide {
  return {
    id: item.slug,
    stateCode: item.state_code,
    title: item.title,
    summary: item.summary,
    timeLabel: item.time_label,
    steps: item.guide_steps.map(({ title, detail }) => ({ title, detail })),
    sourceTitle: item.source_title,
    sourceUrl: item.source_url,
    lastVerified: displayDate(item.last_verified_at),
  };
}

function mapUpdate(item: ApiUpdate): Update {
  return {
    id: item.id,
    stateCode: item.state_code,
    title: item.title,
    summary: item.summary,
    publisher: item.source_domains.publisher_name,
    publishedAt: item.source_published_at
      ? `Published ${displayDate(item.source_published_at)}`
      : `Verified ${displayDate(item.last_verified_at)}`,
    url: item.url,
  };
}

export function useResearchContent(stateCode: string) {
  const [loadedContent, setLoadedContent] = useState<{
    stateCode: string;
    resourceItems: Resource[];
    guideItems: Guide[];
    updateItems: Update[];
  } | null>(null);

  useEffect(() => {
    if (!stateCode) return;

    const controller = new AbortController();
    const { signal } = controller;

    async function loadContent() {
      try {
        const [resourceResponse, guideResponse, updateResponse] = await Promise.all([
          fetch(`/api/resources?state=${stateCode}`, { signal }),
          fetch(`/api/guides?state=${stateCode}`, { signal }),
          fetch(`/api/updates?state=${stateCode}`, { signal }),
        ]);

        if (!resourceResponse.ok || !guideResponse.ok || !updateResponse.ok) return;

        const resourcePayload = (await resourceResponse.json()) as { data: ApiResource[] };
        const guidePayload = (await guideResponse.json()) as { data: ApiGuide[] };
        const updatePayload = (await updateResponse.json()) as { data: ApiUpdate[] };
        if (signal.aborted) return;

        setLoadedContent({
          stateCode,
          resourceItems: resourcePayload.data.map(mapResource),
          guideItems: guidePayload.data.map(mapGuide),
          updateItems: updatePayload.data.map(mapUpdate),
        });
      } catch {
        // Keep the reviewed local snapshot visible if the API is unavailable.
      }
    }

    void loadContent();
    return () => controller.abort();
  }, [stateCode]);

  return loadedContent?.stateCode === stateCode
    ? loadedContent
    : { resourceItems: resources, guideItems: guides, updateItems: updates };
}
