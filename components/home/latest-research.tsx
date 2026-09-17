import { researchStories } from "../../lib/research-stories";

export function LatestResearchSection() {
  const stories = researchStories.slice(0, 3);

  return (
    <section className="home-wrap home-latest-research" aria-labelledby="latest-research-title">
      <div className="home-latest-research-heading">
        <span aria-hidden="true" />
        <h1 id="latest-research-title">Latest solar research</h1>
      </div>
      <div className="home-latest-research-list">
        {stories.map((story, index) => (
          <article className="home-latest-research-story" key={story.id}>
            <p className="home-card-label">{index === 0 ? "Short read" : "Research"}</p>
            <h2><a href={story.href}>{story.title}</a></h2>
            <p>{story.summary}</p>
            <a className="home-latest-research-link" href={story.href}>Read →</a>
          </article>
        ))}
      </div>
    </section>
  );
}
