import type { ComponentType } from "react";
import type { ResearchSource } from "../../lib/research-article";
import { articleConfig as massachusettsConfig, MassachusettsSolarCostBody } from "./massachusetts-solar-cost-2026";
import { articleConfig as homeDepotConfig, SunrunHomeDepotBody } from "./sunrun-home-depot-sales-home-visit";
import { articleConfig as contractsConfig, SunrunContractsBody } from "./sunrun-25-year-solar-contracts";
import { articleConfig as financingConfig, SolarSalesFinancingBody } from "./solar-sales-financing-after-complaint";

export type ResearchContent = {
  Body: ComponentType;
  schemaDescription?: string;
  breadcrumbLabel?: string;
  imageAlt?: string;
  sources?: ResearchSource[];
};

export const researchContent: Record<string, ResearchContent> = {
  "sunrun-home-depot-sales-home-visit": { Body: SunrunHomeDepotBody, ...homeDepotConfig },
  "sunrun-25-year-solar-contracts": { Body: SunrunContractsBody, ...contractsConfig },
  "solar-sales-financing-after-complaint": { Body: SolarSalesFinancingBody, ...financingConfig },
  "massachusetts-solar-cost-2026": {
    Body: MassachusettsSolarCostBody,
    ...massachusettsConfig,
  },
};

export function getResearchContent(slug: string) {
  return researchContent[slug];
}
