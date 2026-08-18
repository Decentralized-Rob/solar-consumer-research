import type { MetadataRoute } from "next";
import { stateSlug, states } from "../lib/content";

const baseUrl = "https://solarcomplaint.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const statePages = states.map((state) => ({
    url: `${baseUrl}/states/${stateSlug(state.name)}`,
    lastModified: new Date("2026-08-18"),
    changeFrequency: "monthly" as const,
    priority: state.available ? 0.8 : 0.6,
  }));

  return [
    { url: baseUrl, lastModified: new Date("2026-08-18"), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/resources`, lastModified: new Date("2026-08-18"), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/guides`, lastModified: new Date("2026-08-18"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/cases/connecticut-attorney-general-sunrun-lawsuit`, lastModified: new Date("2026-08-18"), changeFrequency: "monthly", priority: 0.8 },
    ...statePages,
  ];
}
