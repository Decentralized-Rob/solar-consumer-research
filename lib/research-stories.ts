import { researchStories } from "../content/research";
import type { ResearchStory } from "./research-article";

export type { ResearchStory };
export { researchStories };

export const featuredResearchStory =
  researchStories.find((story) => story.featured) ?? researchStories[0];

export function getResearchStory(slug: string) {
  return researchStories.find((story) => story.slug === slug);
}

export function getResearchStoriesForState(stateCode: string) {
  return researchStories.filter((story) => story.stateCodes.includes(stateCode));
}

export function getResearchStoriesForCompany(company: string) {
  const normalized = company.trim().toLowerCase();
  return researchStories.filter((story) =>
    story.companies.some((item) => item.toLowerCase() === normalized),
  );
}

export function getResearchStoriesForAuthor(authorSlug: string) {
  return researchStories.filter((story) => story.authorSlug === authorSlug);
}

export function getLatestResearchStories(limit = 3) {
  return researchStories.slice(0, limit);
}

export function getLatestResearchModifiedDate() {
  return researchStories.reduce(
    (latest, story) => story.dateModified > latest ? story.dateModified : latest,
    "1970-01-01",
  );
}
