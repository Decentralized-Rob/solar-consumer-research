import type { Metadata } from "next";
import Link from "next/link";
import { StoryThumbnail } from "../../components/story-thumbnail";
import { TrackedLink, TrackedImpression } from "../../components/tracked-link";
import { InfoPage } from "../../components/info-page";
import { editorialStories } from "../../lib/editorial-directory";

export const metadata: Metadata = {
  title: "Latest SolarComplaint Stories and Investigations",
  description: "SolarComplaint reporting, Sunrun investigations, lawsuits, settlements and consumer research, newest first.",
  alternates: { canonical: "/stories" },
};
export default function StoriesPage() {
  return (
    <InfoPage eyebrow="Original reporting" title="Latest stories" lede="Our investigations and research, newest first. Find settlements, lawsuits and consumer reporting without navigating the filing system.">
      <nav className="editorial-shortcuts" aria-label="Browse topics">
        <Link href="/companies/sunrun">Sunrun</Link>
        <Link href="/lawsuits-settlements">Lawsuits & settlements</Link>
        <Link href="/search">Search reporting</Link>
      </nav>
      <div className="editorial-story-list">
        <TrackedImpression placement="story_archive" />
        {editorialStories.map(story => (
          <article key={story.href} className="editorial-archive-card">
            <TrackedLink placement="story_archive" href={story.href} ariaLabel={`Read: ${story.title}`}><StoryThumbnail story={story} /></TrackedLink>
            <div>
              <p className="editorial-meta">{story.section} · {story.dateLabel} <time dateTime={story.date}>{story.date}</time></p>
              <h2><TrackedLink placement="story_archive" href={story.href}>{story.title}</TrackedLink></h2>
              <p>{story.summary}</p>
            </div>
          </article>
        ))}
      </div>
    </InfoPage>
  );
}
