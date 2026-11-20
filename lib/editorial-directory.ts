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
type StoryForMatching = Pick<EditorialStory, "title" | "topics" | "section">;
const subjectGroups = [
  { key: "signature", pattern: /signature|forged|e-sign|docusign|verification call|unauthori[sz]ed|assent|consent/i, weight: 14 },
  { key: "roof", pattern: /roof|roofing|installation|contractor|subcontractor|design change|change order|permitting|panels never/i, weight: 12 },
  { key: "finance", pattern: /wall street|earnings|investor|sec filing|securit|cash outlook|future revenue|financing value|financial report/i, weight: 12 },
  { key: "bankruptcy", pattern: /bankrupt|chapter 7|chapter 11|liquidation|freedom forever|titan solar/i, weight: 11 },
  { key: "contracts", pattern: /25.year|lease|\bppa\b|solar contract|contract terms|guarantee|buyout/i, weight: 10 },
  { key: "sales", pattern: /sales|selling|salesperson|home depot|solicitation|pitch|oversight/i, weight: 9 },
  { key: "enforcement", pattern: /settlement|attorney general|consumer protection|enforcement|regulator/i, weight: 8 },
  { key: "litigation", pattern: /lawsuit|court|judge|arbitration|litigation|legal filing/i, weight: 7 },
] as const;

export function getEditorialSubjects(story: StoryForMatching): string[] {
  const text = [story.title, ...story.topics, story.section].join(" ");
  return subjectGroups.filter(group => group.pattern.test(text)).map(group => group.key);
}

// Recommendations require a shared subject. Mentioning the same company alone
// no longer makes an unrelated finance story appear next to a signature case.
export function getRelatedEditorialStories(href: string, limit = 3) {
  const current = editorialStories.find(story => story.href === href);
  if (!current) return [];
  const currentSubjects = getEditorialSubjects(current);
  return editorialStories.filter(story => story.href !== href)
    .map(story => {
      const relatedSubjects = getEditorialSubjects(story);
      const sharedSubjects = subjectGroups.filter(group =>
        currentSubjects.includes(group.key) && relatedSubjects.includes(group.key));
      const sharedStates = story.stateCodes.filter(state => current.stateCodes.includes(state)).length;
      const sharedCompanies = story.companies.filter(name => current.companies.includes(name)).length;
      return {
        story,
        score: sharedSubjects.reduce((score, group) => score + group.weight, 0)
          + sharedStates * 3 + sharedCompanies,
        sharedSubjects: sharedSubjects.length,
      };
    })
    .filter(item => item.sharedSubjects > 0)
    .sort((a, b) => b.score - a.score || b.story.date.localeCompare(a.story.date))
    .slice(0, limit).map(item => item.story);
}
