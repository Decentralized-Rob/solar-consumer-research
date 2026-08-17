import { InfoPage } from "../../components/info-page";
import { resources as fallbackResources } from "../../lib/content";
import { createSupabaseServerClient } from "../../lib/supabase/server";
import type { Resource } from "../../lib/types";

export const dynamic = "force-dynamic";
export const metadata = { title: "Resources | Solar Consumer Research" };

async function loadResources(): Promise<Resource[]> {
  try {
    const { data, error } = await createSupabaseServerClient()
      .from("resources")
      .select("id,state_code,title,summary,topic,url,last_verified_at,sort_order,source_domains!inner(publisher_name,publisher_type)")
      .eq("status", "published")
      .or("state_code.is.null,state_code.eq.MA")
      .order("sort_order", { ascending: true });
    if (error || !data) return fallbackResources;
    return data.map((item) => ({
      id: item.id,
      stateCode: item.state_code,
      title: item.title,
      summary: item.summary,
      publisher: item.source_domains.publisher_name,
      publisherType: item.source_domains.publisher_type,
      topic: item.topic,
      url: item.url,
      lastVerified: new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${item.last_verified_at}T00:00:00Z`)),
    }));
  } catch {
    return fallbackResources;
  }
}

export default async function ResourcesPage() {
  const items = await loadResources();
  return (
    <InfoPage
      eyebrow="Official resource library"
      title="Massachusetts resources."
      lede="Government agencies, regulators, complaint channels, public records, and clearly identified institutional sources."
    >
      <section className="info-section">
        <p>{items.length} verified Massachusetts and federal resources. Search the complete library from the homepage.</p>
      </section>
      <div className="library-grid">
        {items.map((item) => (
          <article className="library-card" key={item.id}>
            <div className="library-meta"><span>{item.publisherType.replace("_", " ")}</span><span>Verified {item.lastVerified}</span></div>
            <h2>{item.title}</h2>
            <p>{item.summary}</p>
            <div className="library-card-bottom"><span>{item.publisher}</span><a href={item.url} target="_blank" rel="noreferrer">Open source ↗</a></div>
          </article>
        ))}
      </div>
    </InfoPage>
  );
}
