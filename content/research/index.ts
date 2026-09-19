import { article as massachusettsSolarCost } from "./massachusetts-solar-cost-2026";
import { article as solarSalesFinancing } from "./solar-sales-financing-after-complaint";
import { article as sunrunContracts } from "./sunrun-25-year-solar-contracts";
import { article as sunrunHomeDepot } from "./sunrun-home-depot-sales-home-visit";

const discoveredArticles = [
  massachusettsSolarCost,
  solarSalesFinancing,
  sunrunContracts,
  sunrunHomeDepot,
];

export const researchArticles = Object.fromEntries(
  discoveredArticles.map((article) => [article.story.slug, article]),
);

export const researchStories = discoveredArticles
  .map((article) => article.story)
  .sort((a, b) => Date.parse(b.datePublished) - Date.parse(a.datePublished));

export function getResearchArticle(slug: string) {
  return researchArticles[slug];
}

export function getResearchContent(slug: string) {
  const article = getResearchArticle(slug);
  return article ? { Body: article.Body, ...article.config } : undefined;
}
