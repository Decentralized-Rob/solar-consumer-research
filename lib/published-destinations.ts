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

const solarSalesFinancingStory = researchStories.find(
  (story) => story.id === "solar-sales-financing-after-complaint",
);

if (!solarSalesFinancingStory) {
  throw new Error("Missing solar-sales-financing-after-complaint research story");
}

export const publishedDestinations: PublishedDestination[] = [
  {
    id: solarSalesFinancingStory.id,
    href: solarSalesFinancingStory.href,
    title: solarSalesFinancingStory.title,
    kind: "research",
    published: true,
    menuLabel: "Solar Sales & Financing",
    researchMenuOrder: 10,
  },
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
