import { NextRequest } from "next/server";
import { createSupabaseServerClient } from "../../../lib/supabase/server";

const topics = new Set(["complaints", "utility", "financing", "records", "programs"]);

export async function GET(request: NextRequest) {
  const state = (request.nextUrl.searchParams.get("state") ?? "MA").toUpperCase();
  const topic = request.nextUrl.searchParams.get("topic");
  if (!/^[A-Z]{2}$/.test(state)) {
    return Response.json({ error: "Invalid state code." }, { status: 400 });
  }
  if (topic && !topics.has(topic)) {
    return Response.json({ error: "Invalid resource topic." }, { status: 400 });
  }

  const supabase = createSupabaseServerClient();
  let query = supabase
    .from("resources")
    .select("id,slug,state_code,title,summary,topic,url,last_verified_at,sort_order,source_domains!inner(publisher_name,publisher_type)")
    .eq("state_code", state)
    .eq("status", "published")
    .order("sort_order", { ascending: true });

  if (topic) query = query.eq("topic", topic as "complaints" | "utility" | "financing" | "records" | "programs");
  const { data, error } = await query;

  if (error) return Response.json({ error: "Resources are temporarily unavailable." }, { status: 503 });
  return Response.json({ data });
}
