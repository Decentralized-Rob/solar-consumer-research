import Link from "next/link";
import { InfoPage } from "../../components/info-page";
import { updates as fallbackUpdates } from "../../lib/content";
import { featuredResearchStory } from "../../lib/research-stories";
import { createSupabaseServerClient } from "../../lib/supabase/server";
import type { Update } from "../../lib/types";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Solar Consumer Protection, Lawsuit & Enforcement Updates",
  description: "Verified solar consumer protection updates, lawsuits, enforcement actions, company trackers, state resources, and source-backed research.",
  alternates: { canonical: "/updates" },
  openGraph: {
    title: "Solar Consumer Protection, Lawsuit & Enforcement Updates",
    description: "Verified public-record updates with links to company trackers, case summaries, state resources, and source-backed research.",
    url: "/updates",
    type: "website",
  },
};

async function loadUpdates(): Promise<Update[]> {
  try {
    const { data, error } = await createSupabaseServerClient()
      .from("updates")
      .select("id,state_code,title,summary,url,source_published_at,last_verified_at,published_at,source_domains!inner(publisher_name)")
      .eq("status", "published")
      .or("state_code.is.null,state_code.eq.MA")
      .order("published_at", { ascending: false });
    if (error || !data) return fallbackUpdates;
    return data.map((item) => ({
      id: item.id,
      stateCode: item.state_code,
      title: item.title,
      summary: item.summary,
      publisher: item.source_domains.publisher_name,
      publishedAt: item.source_published_at
        ? `Published ${new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${item.source_published_at}T00:00:00Z`))}`
        : `Verified ${new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${item.last_verified_at}T00:00:00Z`))}`,
      url: item.url,
    }));
  } catch {
    return fallbackUpdates;
  }
}

export default async function UpdatesPage() {
  const items = await loadUpdates();
  return (
    <InfoPage
      eyebrow="News and updates"
      title="Solar Consumer Protection, Lawsuit & Enforcement Updates"
      lede="Verified public-record updates with direct paths into company trackers, case summaries, state resources, and source-backed research."
    >
      <section className="info-section" aria-labelledby="company-case-trackers-title">
        <h2 id="company-case-trackers-title">Company and case trackers</h2>
        <p><Link href="/companies/sunrun">Sunrun lawsuits, investigations, settlements and consumer resources →</Link></p>
        <p><Link href="/cases/connecticut-attorney-general-sunrun-lawsuit">Connecticut Attorney General lawsuit involving Sunrun →</Link></p>
        <p><Link href="/cases/titan-solar-power">Titan Solar Power bankruptcy, closure and customer-help tracker →</Link></p>
      </section>

      <section className="info-section" aria-labelledby="state-research-hubs-title">
        <h2 id="state-research-hubs-title">State research hubs</h2>
        <p><Link href="/states/connecticut">Connecticut solar complaint and consumer resources →</Link></p>
        <p><Link href="/states/massachusetts">Massachusetts solar complaint, litigation and consumer resources →</Link></p>
        <p><Link href="/states/florida">Florida Sunrun roof dispute and consumer resources →</Link></p>
        <p><Link href="/states/texas">Texas residential-solar investigation and consumer resources →</Link></p>
        <p><Link href="/states/arizona">Arizona Sunrun settlement and consumer resources →</Link></p>
      </section>

      <section className="info-section" aria-labelledby="featured-research-title">
        <h2 id="featured-research-title">Featured research</h2>
        <p><Link href={featuredResearchStory.href}>{featuredResearchStory.title} →</Link></p>
        <p>{featuredResearchStory.deck}</p>
        <p><Link href="/research">Browse all source-backed solar consumer research →</Link></p>
      </section>

      <section className="info-section" aria-labelledby="latest-updates-title">
        <h2 id="latest-updates-title">Latest verified public-record updates</h2>
        <div className="updates-page-list">
          {items.map((item) => (
            <a className="updates-page-row" href={item.url} target="_blank" rel="noreferrer" key={item.id}>
              <span>{item.publishedAt}</span>
              <strong>{item.title}</strong>
              <p>{item.summary}</p>
              <small>{item.publisher} ↗</small>
            </a>
          ))}
        </div>
      </section>
    </InfoPage>
  );
}
