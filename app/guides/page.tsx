import { InfoPage } from "../../components/info-page";
import { guides as fallbackGuides } from "../../lib/content";
import { createSupabaseServerClient } from "../../lib/supabase/server";
import type { Guide } from "../../lib/types";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Guides | Solar Consumer Research",
  description: "Source-based guides for organizing solar records and using published consumer complaint procedures.",
  alternates: { canonical: "/guides" },
  openGraph: { url: "/guides" },
};

async function loadGuides(): Promise<Guide[]> {
  try {
    const { data, error } = await createSupabaseServerClient()
      .from("guides")
      .select("id,state_code,title,summary,time_label,source_title,source_url,last_verified_at,sort_order,guide_steps(id,step_order,title,detail)")
      .eq("status", "published")
      .or("state_code.is.null,state_code.eq.MA")
      .order("sort_order", { ascending: true })
      .order("step_order", { referencedTable: "guide_steps", ascending: true });
    if (error || !data) return fallbackGuides;
    return data.map((item) => ({
      id: item.id,
      stateCode: item.state_code,
      title: item.title,
      summary: item.summary,
      timeLabel: item.time_label,
      steps: item.guide_steps.map((step) => ({ title: step.title, detail: step.detail })),
      sourceTitle: item.source_title,
      sourceUrl: item.source_url,
      lastVerified: new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${item.last_verified_at}T00:00:00Z`)),
    }));
  } catch {
    return fallbackGuides;
  }
}

export default async function GuidesPage() {
  const items = await loadGuides();
  return (
    <InfoPage
      eyebrow="Step-by-step guides"
      title="Plain instructions, tied to sources."
      lede="These guides summarize published procedures. They do not assess individual situations, recommend claims, or predict outcomes."
    >
      <div className="guide-page-list">
        {items.map((guide, index) => (
          <section className="guide-page-item" id={`guide-${guide.id}`} key={guide.id}>
            <div className="library-meta"><span>{String(index + 1).padStart(2, "0")}</span><span>{guide.timeLabel}</span></div>
            <h2>{guide.title}</h2>
            <p>{guide.summary}</p>
            <ol>
              {guide.steps.map((step) => <li key={step.title}><strong>{step.title}</strong><span>{step.detail}</span></li>)}
            </ol>
            <div className="guide-page-source"><span>Verified {guide.lastVerified}</span><a href={guide.sourceUrl} target="_blank" rel="noreferrer">{guide.sourceTitle} ↗</a></div>
          </section>
        ))}
      </div>
    </InfoPage>
  );
}
