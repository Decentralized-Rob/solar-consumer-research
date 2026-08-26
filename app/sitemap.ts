import type { MetadataRoute } from "next";
import { stateSlug, states } from "../lib/content";

const baseUrl = "https://solarcomplaint.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const statePages = states.filter((state) => state.available).map((state) => ({
    url: `${baseUrl}/states/${stateSlug(state.name)}`,
    lastModified: new Date("2026-08-21"),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    { url: baseUrl, lastModified: new Date("2026-08-21"), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/resources`, lastModified: new Date("2026-08-21"), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/federal-resources`, lastModified: new Date("2026-08-21"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/guides`, lastModified: new Date("2026-08-16"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/updates`, lastModified: new Date("2026-08-16"), changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified: new Date("2026-08-21"), changeFrequency: "yearly", priority: 0.4 },
    { url: `${baseUrl}/methodology`, lastModified: new Date("2026-08-21"), changeFrequency: "yearly", priority: 0.5 },
    { url: `${baseUrl}/technology`, lastModified: new Date("2026-08-23"), changeFrequency: "monthly", priority: 0.4 },
    { url: `${baseUrl}/corrections`, lastModified: new Date("2026-08-16"), changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/privacy`, lastModified: new Date("2026-08-16"), changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/disclaimer`, lastModified: new Date("2026-08-16"), changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/cases/titan-solar-power`, lastModified: new Date("2026-08-26"), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/cases/connecticut-attorney-general-sunrun-lawsuit`, lastModified: new Date("2026-08-18"), changeFrequency: "monthly", priority: 0.8 },
    ...statePages,
  ];
}
