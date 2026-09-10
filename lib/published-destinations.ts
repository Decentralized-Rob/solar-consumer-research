import { researchStories } from "./research-stories";

export type PublicationKind = "research" | "company" | "bankruptcy" | "case";
export type SitemapChangeFrequency = "daily" | "weekly" | "monthly" | "yearly";

export type PublishedDestination = {
  id: string;
  href: string;
  title: string;
  kind: PublicationKind;
  published: boolean;
  menuLabel?: string;
  researchMenuOrder?: number;
  trackerLabel?: string;
  showInTrackerDiscovery?: boolean;
  sitemap?: {
    lastModified: string;
    changeFrequency: SitemapChangeFrequency;
    priority: number;
  };
};

const researchStoryMenuDestinations: PublishedDestination[] = researchStories
  .filter((story) => story.showInResearchMenu || story.researchMenuOrder !== undefined)
  .map((story) => ({
    id: story.id,
    href: story.href,
    title: story.title,
    kind: "research" as const,
    published: true,
    menuLabel: story.title,
    researchMenuOrder: story.researchMenuOrder,
  }));

export const publishedDestinations: PublishedDestination[] = [
  ...researchStoryMenuDestinations,
  {
    id: "sunrun",
    href: "/companies/sunrun",
    title: "Sunrun lawsuits, investigations and consumer resources",
    kind: "company",
    published: true,
    menuLabel: "Sunrun Research",
    researchMenuOrder: 20,
    trackerLabel: "Sunrun lawsuits, investigations, settlements and consumer resources",
    showInTrackerDiscovery: true,
    sitemap: {
      lastModified: "2026-09-06",
      changeFrequency: "weekly",
      priority: 0.9,
    },
  },
  {
    id: "sunrun-ethics-compliance",
    href: "/companies/sunrun/ethics-compliance",
    title: "Sunrun ethics and compliance research",
    kind: "research",
    published: true,
    trackerLabel: "Sunrun ethics & compliance: AllVoices, policies, leadership and reporting guide",
    showInTrackerDiscovery: true,
    sitemap: {
      lastModified: "2026-09-07",
      changeFrequency: "weekly",
      priority: 0.95,
    },
  },
  {
    id: "freedom-forever",
    href: "/cases/freedom-forever",
    title: "Freedom Forever bankruptcy and customer help",
    kind: "bankruptcy",
    published: true,
    menuLabel: "Freedom Forever Bankruptcy",
    researchMenuOrder: 30,
    trackerLabel: "Freedom Forever bankruptcy, Chapter 7 and customer-help tracker",
    showInTrackerDiscovery: true,
    sitemap: {
      lastModified: "2026-09-09",
      changeFrequency: "daily",
      priority: 0.95,
    },
  },
  {
    id: "titan-solar-power",
    href: "/cases/titan-solar-power",
    title: "Titan Solar Power bankruptcy, closure and customer help",
    kind: "bankruptcy",
    published: true,
    menuLabel: "Titan Solar Power Bankruptcy",
    researchMenuOrder: 40,
    trackerLabel: "Titan Solar Power bankruptcy, closure and customer-help tracker",
    showInTrackerDiscovery: true,
    sitemap: {
      lastModified: "2026-09-07",
      changeFrequency: "weekly",
      priority: 0.9,
    },
  },
  {
    id: "connecticut-ag-sunrun",
    href: "/cases/connecticut-attorney-general-sunrun-lawsuit",
    title: "Connecticut Attorney General lawsuit involving Sunrun",
    kind: "case",
    published: true,
    trackerLabel: "Connecticut Attorney General lawsuit involving Sunrun",
    showInTrackerDiscovery: true,
    sitemap: {
      lastModified: "2026-09-07",
      changeFrequency: "monthly",
      priority: 0.8,
    },
  },
];

function validatePublishedDestinations() {
  const ids = new Set<string>();
  const hrefs = new Set<string>();
  const menuOrders = new Set<number>();

  for (const story of researchStories) {
    const hasMenuFlag = Boolean(story.showInResearchMenu);
    const hasMenuOrder = story.researchMenuOrder !== undefined;
    if (hasMenuFlag !== hasMenuOrder) {
      throw new Error(`Research story menu metadata needs both opt-in and order: ${story.id}`);
    }
  }

  for (const item of publishedDestinations) {
    if (ids.has(item.id)) throw new Error(`Duplicate published destination id: ${item.id}`);
    if (hrefs.has(item.href)) throw new Error(`Duplicate published destination href: ${item.href}`);
    if (!item.href.startsWith("/")) throw new Error(`Published destination must use an internal path: ${item.href}`);

    ids.add(item.id);
    hrefs.add(item.href);

    const hasMenuLabel = Boolean(item.menuLabel);
    const hasMenuOrder = item.researchMenuOrder !== undefined;
    if (hasMenuLabel !== hasMenuOrder) {
      throw new Error(`Research menu destination needs both label and order: ${item.id}`);
    }
    if (item.researchMenuOrder !== undefined) {
      if (menuOrders.has(item.researchMenuOrder)) {
        throw new Error(`Duplicate Research menu order: ${item.researchMenuOrder}`);
      }
      menuOrders.add(item.researchMenuOrder);
    }

    if (item.showInTrackerDiscovery && !item.trackerLabel) {
      throw new Error(`Tracker discovery destination needs a label: ${item.id}`);
    }
    if (item.sitemap && (item.sitemap.priority < 0 || item.sitemap.priority > 1)) {
      throw new Error(`Invalid sitemap priority for ${item.id}`);
    }
  }
}

validatePublishedDestinations();

export function getResearchMenuItems() {
  return publishedDestinations
    .filter(
      (item) =>
        item.published && item.menuLabel && item.researchMenuOrder !== undefined,
    )
    .sort((a, b) => a.researchMenuOrder! - b.researchMenuOrder!)
    .map((item) => ({ href: item.href, label: item.menuLabel! }));
}

export function getTrackerDiscoveryItems() {
  return publishedDestinations
    .filter(
      (item) =>
        item.published && item.showInTrackerDiscovery && item.trackerLabel,
    )
    .map((item) => ({ href: item.href, label: item.trackerLabel! }));
}

export function getPublicationSitemapEntries() {
  return publishedDestinations
    .filter((item) => item.published && item.sitemap)
    .map((item) => ({ href: item.href, ...item.sitemap! }));
}
