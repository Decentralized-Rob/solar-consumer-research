import Link from "next/link";
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
      <div className="related-stories-list">
        {stories.map(story => (
          <article key={story.href}>
            <p>{story.section} · <time dateTime={story.date}>{story.date}</time></p>
            <h3><Link href={story.href}>{story.title}</Link></h3>
          </article>
        ))}
      </div>
    </aside>
  );
}
