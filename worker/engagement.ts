/** First-party, anonymous navigation events for Cloudflare Analytics Engine. */
export type ClickEventKind = "click" | "impression";
export type ClickPlacement = "homepage_story" | "read_next" | "search_result" | "story_archive";
export type NavigationEvent = {
  kind: ClickEventKind;
  placement: ClickPlacement;
  source: string;
  target: string;
};

const placements = new Set<ClickPlacement>([
  "homepage_story", "read_next", "search_result", "story_archive",
]);

function isPath(value: unknown): value is string {
  return typeof value === "string" && value.length <= 220
    && /^\/[a-zA-Z0-9/_-]*$/.test(value) && !value.includes("//");
}

export function parseNavigationEvent(input: unknown): NavigationEvent | null {
  if (!input || typeof input !== "object") return null;
  const value = input as Record<string, unknown>;
  if (value.kind !== "click" && value.kind !== "impression") return null;
  if (!placements.has(value.placement as ClickPlacement)) return null;
  if (!isPath(value.source) || !isPath(value.target)) return null;
  if (value.kind === "click" && value.target === "") return null;
  if (value.kind === "impression" && value.target !== "") return null;
  return value as NavigationEvent;
}
