import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "../../components/info-page";
import { searchSiteContent } from "../../lib/site-search";
import { TrackedLink, TrackedImpression } from "../../components/tracked-link";

export const metadata: Metadata = {
  title: "Search SolarComplaint Reporting",
  description: "Find SolarComplaint investigations, Sunrun lawsuits, Connecticut settlement coverage and research articles.",
  alternates: { canonical: "/search" },
};
export default async function SearchPage({
  searchParams,
}: { searchParams: Promise<{ q?: string | string[] }> }) {
  const { q } = await searchParams;
  const query = (typeof q === "string" ? q : "").trim().slice(0,120);
  const stories = searchSiteContent(query);
  return (
    <InfoPage eyebrow="Find a story" title="Search reporting" lede="Search reporting, company trackers, consumer guides and state resources by company, state or topic.">
      <form className="editorial-search-form" action="/search" method="get" role="search">
        <label htmlFor="story-query">Search stories</label>
        <div>
          <input id="story-query" type="search" name="q" defaultValue={query} placeholder="Connecticut Sunrun settlement" minLength={2} maxLength={120} required />
          <button type="submit">Search</button>
        </div>
      </form>
      {query ? (
        <section aria-live="polite">
          <h2>{stories.length} {stories.length === 1 ? "result" : "results"} for “{query}”</h2>
          {stories.length ? <div className="editorial-story-list">
            <TrackedImpression placement="search_result" />
            {stories.map(story => <article key={story.href}>
              <p className="editorial-meta">{story.section}{story.date ? <> · <time dateTime={story.date}>{story.date}</time></> : null}</p>
              <h3><TrackedLink placement="search_result" href={story.href}>{story.title}</TrackedLink></h3>
              <p>{story.summary}</p>
            </article>)}
          </div> : <p>No matching reporting. Try a shorter phrase or <Link href="/stories">browse all stories</Link>.</p>}
        </section>
      ) : <p><Link href="/cases/connecticut-attorney-general-sunrun-lawsuit">Looking for the Connecticut Sunrun settlement?</Link></p>}
      <p className="editorial-search-note">Search covers published SolarComplaint reporting, trackers and help pages. For official complaint channels, <Link href="/resources">browse state resources</Link>.</p>
    </InfoPage>
  );
}
