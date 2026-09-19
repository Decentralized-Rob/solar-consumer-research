import type { ResearchArticleDefinition } from "../../lib/research-article";

type ResearchModule = { article?: ResearchArticleDefinition };

const articleContext = require.context("./", false, /^(?!\.\/index).*\.tsx$/);

const discoveredArticles = articleContext
  .keys()
  .map((key) => (articleContext(key) as ResearchModule).article)
  .filter((article): article is ResearchArticleDefinition => Boolean(article));

export const researchArticles = Object.fromEntries(
  discoveredArticles.map((article) => [article.story.slug, article]),
) as Record<string, ResearchArticleDefinition>;

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
