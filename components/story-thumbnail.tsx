import Image from "next/image";
import type { EditorialStory } from "../lib/editorial-directory";

type StoryExcerpt = Pick<EditorialStory, "title" | "topics" | "section">;

export function storyImageFor(story: StoryExcerpt) {
  const text = [story.title, story.section, ...story.topics].join(" ").toLowerCase();
  if (/investor|earnings|wall street|sec filing|cash outlook|future revenue|financial reporting|financing value/.test(text)) {
    return "/editorial/financial-records.svg";
  }
  if (/roof|roofing|panel placement|design change|change order|construction|installation/.test(text)) {
    return "/editorial/solar-roof.svg";
  }
  if (/25.year|lease|power purchase|\bppa\b|solar contract|contract term|guarantee/.test(text)) {
    return "/sunrun/sunrun-25-year-contracts-hero-1.webp";
  }
  if (/settlement|attorney general|judge|court|arbitration|lawsuit|signature|verification|litigation/.test(text)) {
    return "/editorial/court-records.svg";
  }
  if (/complaint|sales|solicitation|ethics|consumer protection/.test(text)) {
    return "/editorial/consumer-records.svg";
  }
  return "/editorial/solar-research.svg";
}

export function StoryThumbnail({
  story, priority = false,
}: { story: StoryExcerpt; priority?: boolean }) {
  return (
    <span className="editorial-thumbnail">
      <Image src={storyImageFor(story)} alt="" width={800} height={450}
        priority={priority} unoptimized />
    </span>
  );
}
