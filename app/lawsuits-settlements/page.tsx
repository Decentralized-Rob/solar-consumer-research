import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "../../components/info-page";
import { getLawsuitAndSettlementStories } from "../../lib/editorial-directory";

const title = "Solar Lawsuits, Settlements and State Enforcement";
const description = "Find residential solar lawsuits, court decisions, state enforcement actions and settlements across companies, with links to public records.";
const path = "/lawsuits-settlements";
export const metadata: Metadata = {
  title, description, alternates: { canonical: path },
  openGraph: { title, description, url: path, type: "website", images: [{ url: "/og.png", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
};
export default function LawsuitsAndSettlementsPage() {
  return (
    <InfoPage eyebrow="Court and enforcement records" title={title} lede="Find solar lawsuits, state enforcement actions, settlements and the records behind our reporting.">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://solarcomplaint.com/" }, { "@type": "ListItem", position: 2, name: title, item: `https://solarcomplaint.com${path}` }] }) }} />
      <nav className="case-question-links" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-current="page">{title}</span></nav>
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
