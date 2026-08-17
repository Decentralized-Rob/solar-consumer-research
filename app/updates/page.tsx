import { InfoPage } from "../../components/info-page";
import { updates as fallbackUpdates } from "../../lib/content";
import { createSupabaseServerClient } from "../../lib/supabase/server";
import type { Update } from "../../lib/types";

export const dynamic = "force-dynamic";
export const metadata = { title: "Updates | Solar Consumer Research" };

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
      title="Changes in the public record."
      lede="Short summaries of program notices, consumer alerts, enforcement actions, and procedural changes."
    >
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
    </InfoPage>
  );
}
