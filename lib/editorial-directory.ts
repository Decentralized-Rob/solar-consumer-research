import { researchStories } from "./research-stories";

export type EditorialStory = {
  id: string; href: string; title: string; summary: string;
  date: string; section: string; companies: string[]; stateCodes: string[];
  topics: string[]; dateLabel: "Published" | "Updated";
};

// Standalone case reports must be registered here; generated research articles
// come from the existing publishing pipeline.
const standalone: EditorialStory[] = [
  {
    id: "connecticut-ag-sunrun",
    href: "/cases/connecticut-attorney-general-sunrun-lawsuit",
    title: "Connecticut Sunrun Settlement: The Rejected Lease, the Verification Call and the Path to Consumer Relief",
    summary: "The Connecticut Attorney General's Sunrun settlement: disputed signatures, verification calls, court records and available homeowner relief.",
    date: "2026-10-31", dateLabel: "Published", section: "Lawsuits & settlements",
    companies: ["Sunrun"], stateCodes: ["CT"],
    topics: ["Connecticut", "Sunrun settlement", "attorney general", "fraud", "lawsuit", "consumer relief"],
  },
  {
    id: "sunrun-ethics",
    href: "/companies/sunrun/ethics-compliance",
    title: "Sunrun Ethics & Compliance: Reporting, Policies and Public Record",
    summary: "Sunrun ethics policies, internal compliance reporting routes and related public records.",
    date: "2026-09-28", dateLabel: "Updated", section: "Company research",
    companies: ["Sunrun"], stateCodes: [], topics: ["Sunrun", "ethics", "compliance"],
  },
];

export const editorialStories: EditorialStory[] = [
  ...researchStories.map((story) => ({
    id: story.id, href: story.href, title: story.title,
    summary: story.deck || story.summary, date: story.datePublished,
    dateLabel: "Published" as const, section: story.section || "Research",
    companies: story.companies, stateCodes: story.stateCodes, topics: story.topics,
  })),
  ...standalone,
].sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));

const stateNames: Record<string,string> = {
  CT:"Connecticut", MA:"Massachusetts", NJ:"New Jersey", AZ:"Arizona",
  TX:"Texas", FL:"Florida", IL:"Illinois", NY:"New York", MI:"Michigan",
};

export function getLatestEditorialStories(limit = 6) {
  return editorialStories.slice(0, limit);
}
export function searchEditorialStories(query: string) {
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (!terms.length) return editorialStories;
  return editorialStories.filter((story) => {
    const text = [story.title,story.summary,story.section,...story.companies,
      ...story.stateCodes,...story.stateCodes.map(code=>stateNames[code]||code),
      ...story.topics].join(" ").toLowerCase();
    return terms.every(term => text.includes(term));
  });
}
export function getLawsuitAndSettlementStories() {
  return editorialStories.filter(story => /settlement|lawsuit|litigation|court|arbitration|attorney general|fraud/i.test(
    [story.title, story.section, ...story.topics].join(" ")
  ));
}
export function getRelatedEditorialStories(href: string, limit = 3) {
  const current = editorialStories.find(story => story.href === href);
  if (!current) return [];
  return editorialStories.filter(story => story.href !== href)
    .map(story => ({
      story,
      score: story.companies.filter(company => current.companies.includes(company)).length * 3
        + story.stateCodes.filter(code => current.stateCodes.includes(code)).length * 2
        + story.topics.filter(topic => current.topics.includes(topic)).length,
    }))
    .filter(entry => entry.score > 0)
    .sort((a,b) => b.score-a.score || b.story.date.localeCompare(a.story.date))
    .slice(0,limit).map(entry => entry.story);
}
