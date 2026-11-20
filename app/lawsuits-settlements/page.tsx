import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "../../components/info-page";
import { getLawsuitAndSettlementStories } from "../../lib/editorial-directory";

export const metadata: Metadata = {
  title: "Sunrun Lawsuits, Settlements and Solar Court Reporting",
  description: "The Connecticut Sunrun settlement, state enforcement, court decisions and SolarComplaint's original reporting.",
  alternates: { canonical: "/lawsuits-settlements" },
};
export default function LawsuitsAndSettlementsPage() {
  return (
    <InfoPage eyebrow="Court and enforcement records" title="Lawsuits & settlements" lede="Find solar lawsuits, state enforcement actions, settlements and the records behind our reporting.">
      <section className="editorial-pinned">
        <p className="editorial-meta">Connecticut · Sunrun settlement · October 31, 2026</p>
        <h2><Link href="/cases/connecticut-attorney-general-sunrun-lawsuit">Connecticut Sunrun Settlement: The Rejected Lease, the Verification Call and Consumer Relief</Link></h2>
        <p>Original reporting on the lawsuit, settlement terms and relief available to homeowners.</p>
      </section>
      <nav className="editorial-shortcuts" aria-label="More topics">
        <Link href="/companies/sunrun">Sunrun lawsuits and settlements</Link>
        <Link href="/stories">Latest stories</Link>
        <Link href="/search">Search reporting</Link>
      </nav>
      <h2>More court and settlement reporting</h2>
      <div className="editorial-story-list">
        {getLawsuitAndSettlementStories().filter(story => story.id !== "connecticut-ag-sunrun").map(story => (
          <article key={story.href}>
            <p className="editorial-meta">{story.section} · <time dateTime={story.date}>{story.date}</time></p>
            <h3><Link href={story.href}>{story.title}</Link></h3>
            <p>{story.summary}</p>
          </article>
        ))}
      </div>
    </InfoPage>
  );
}
