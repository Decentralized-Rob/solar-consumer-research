import Link from "next/link";
import { StoryThumbnail } from "./story-thumbnail";
import { TrackedLink, TrackedImpression } from "./tracked-link";
import { getRelatedEditorialStories } from "../lib/editorial-directory";

export function RelatedStories({ currentHref }: { currentHref: string }) {
  const stories = getRelatedEditorialStories(currentHref, 3);
  if (!stories.length) return null;
  return (
    <aside className="related-stories" aria-labelledby="read-next-title">
      <div className="editorial-section-heading">
        <h2 id="read-next-title">Read next</h2>
        <Link href="/stories">All stories</Link>
      </div>
      <TrackedImpression placement="read_next" />
      <div className="related-stories-list">
        {stories.map(story => (
          <article key={story.href}>
            <p>{story.section} · <time dateTime={story.date}>{story.date}</time></p>
            <TrackedLink href={story.href} placement="read_next" ariaLabel={`Read: ${story.title}`}><StoryThumbnail story={story} /></TrackedLink>
            <h3><TrackedLink href={story.href} placement="read_next">{story.title}</TrackedLink></h3>
          </article>
        ))}
      </div>
    </aside>
  );
}
