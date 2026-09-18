import type { ComponentType } from "react";
import type { ResearchSource } from "../../lib/research-article";
import { articleConfig as massachusettsConfig, MassachusettsSolarCostBody } from "./massachusetts-solar-cost-2026";

export type ResearchContent = {
  Body: ComponentType;
  schemaDescription?: string;
  breadcrumbLabel?: string;
  imageAlt?: string;
  sources?: ResearchSource[];
};

export const researchContent: Record<string, ResearchContent> = {
  "massachusetts-solar-cost-2026": {
    Body: MassachusettsSolarCostBody,
    ...massachusettsConfig,
  },
};

export function getResearchContent(slug: string) {
  return researchContent[slug];
}
