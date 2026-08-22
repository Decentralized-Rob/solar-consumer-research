import { states } from "../../lib/content";
import type { Resource, ResourceTopic } from "../../lib/types";

export type TopicFilter = "all" | ResourceTopic;
export type State = (typeof states)[number];

export function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

export function SourceType({ type }: { type: Resource["publisherType"] }) {
  const labels: Record<Resource["publisherType"], string> = {
    government: "Government",
    regulator: "Regulator",
    private_nonprofit: "Private nonprofit",
    research: "Research database",
  };

  return (
    <span className={`home-source-type home-source-type--${type}`}>
      {labels[type]}
    </span>
  );
}
