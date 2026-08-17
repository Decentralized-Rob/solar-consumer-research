import { NextRequest } from "next/server";
import { createSupabaseServerClient } from "../../../lib/supabase/server";

type SearchResult = {
  id: string;
  type: "resource" | "guide" | "update";
  title: string;
  summary: string;
  publisher: string;
  url: string | null;
  meta: string;
};

export async function GET(request: NextRequest) {
  const state = (request.nextUrl.searchParams.get("state") ?? "MA").toUpperCase();
  const query = (request.nextUrl.searchParams.get("q") ?? "").trim();

  if (!/^[A-Z]{2}$/.test(state)) {
    return Response.json({ error: "Invalid state code." }, { status: 400 });
  }
  if (query.length < 2 || query.length > 120) {
    return Response.json({ error: "Search terms must be between 2 and 120 characters." }, { status: 400 });
  }

  const supabase = createSupabaseServerClient();
  const stateFilter = `state_code.is.null,state_code.eq.${state}`;

  const [resourceResponse, guideResponse, updateResponse] = await Promise.all([
    supabase
      .from("resources")
      .select("id,title,summary,url,topic,last_verified_at,source_domains!inner(publisher_name)")
      .eq("status", "published")
      .or(stateFilter)
      .textSearch("search_vector", query, { type: "websearch", config: "english" })
      .limit(8),
    supabase
      .from("guides")
      .select("id,title,summary,time_label,source_title")
      .eq("status", "published")
      .or(stateFilter)
      .textSearch("search_vector", query, { type: "websearch", config: "english" })
      .limit(8),
    supabase
      .from("updates")
      .select("id,title,summary,url,last_verified_at,source_domains!inner(publisher_name)")
      .eq("status", "published")
      .or(stateFilter)
      .textSearch("search_vector", query, { type: "websearch", config: "english" })
      .limit(8),
  ]);

  if (resourceResponse.error || guideResponse.error || updateResponse.error) {
    return Response.json({ error: "Search is temporarily unavailable." }, { status: 503 });
  }

  const results: SearchResult[] = [
    ...(resourceResponse.data ?? []).map((item) => ({
      id: item.id,
      type: "resource" as const,
      title: item.title,
      summary: item.summary,
      publisher: item.source_domains.publisher_name,
      url: item.url,
      meta: item.topic,
    })),
    ...(guideResponse.data ?? []).map((item) => ({
      id: item.id,
      type: "guide" as const,
      title: item.title,
      summary: item.summary,
      publisher: item.source_title,
      url: null,
      meta: item.time_label,
    })),
    ...(updateResponse.data ?? []).map((item) => ({
      id: item.id,
      type: "update" as const,
      title: item.title,
      summary: item.summary,
      publisher: item.source_domains.publisher_name,
      url: item.url,
      meta: "Update",
    })),
  ];

  return Response.json({ data: results, total: results.length, query });
}
