import type { MetadataRoute } from "next";
import { stateSlug, states } from "../lib/content";
import { researchStories } from "../lib/research-stories";
import { titanStateBankruptcyByCode } from "../lib/titan-state-research";

const baseUrl = "https://solarcomplaint.com";
const stateLastModifiedByCode: Record<string, string> = {
  MI: "2026-08-27",
  ME: "2026-08-29",
  ...Object.fromEntries(Object.keys(titanStateBankruptcyByCode).map((code) => [code, "2026-08-28"])),
  AZ: "2026-08-29",
};

export default function sitemap(): MetadataRoute.Sitemap {
  const statePages = states.filter((state) => state.available).map((state) => ({
    url: `${baseUrl}/states/${stateSlug(state.name)}`,
    lastModified: new Date(stateLastModifiedByCode[state.code] ?? "2026-08-21"),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const researchPages = researchStories.map((story) => ({
    url: `${baseUrl}${story.href}`,
    lastModified: new Date(story.dateModified),
    changeFrequency: "weekly" as const,
    priority: 0.95,
  }));

  return [
    { url: baseUrl, lastModified: new Date("2026-08-27"), changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/research`, lastModified: new Date("2026-08-27"), changeFrequency: "weekly", priority: 0.95 },
    ...researchPages,
    { url: `${baseUrl}/companies/sunrun`, lastModified: new Date("2026-08-27"), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/resources`, lastModified: new Date("2026-08-21"), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/federal-resources`, lastModified: new Date("2026-08-21"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/guides`, lastModified: new Date("2026-09-04"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/guides/massachusetts-solar-complaint`, lastModified: new Date("2026-09-04"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/guides/massachusetts-30-day-demand-letter`, lastModified: new Date("2026-09-04"), changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/guides/solar-complaint-record-checklist`, lastModified: new Date("2026-09-04"), changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/updates`, lastModified: new Date("2026-08-16"), changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified: new Date("2026-08-21"), changeFrequency: "yearly", priority: 0.4 },
    { url: `${baseUrl}/methodology`, lastModified: new Date("2026-08-21"), changeFrequency: "yearly", priority: 0.5 },
    { url: `${baseUrl}/technology`, lastModified: new Date("2026-08-23"), changeFrequency: "monthly", priority: 0.4 },
    { url: `${baseUrl}/corrections`, lastModified: new Date("2026-08-16"), changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/privacy`, lastModified: new Date("2026-08-16"), changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/disclaimer`, lastModified: new Date("2026-08-16"), changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/cases/titan-solar-power`, lastModified: new Date("2026-08-28"), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/cases/titan-solar-power/customer-help`, lastModified: new Date("2026-08-28"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/cases/titan-solar-power/warranty-after-bankruptcy`, lastModified: new Date("2026-08-28"), changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/cases/connecticut-attorney-general-sunrun-lawsuit`, lastModified: new Date("2026-08-18"), changeFrequency: "monthly", priority: 0.8 },
    ...statePages,
  ];
}
