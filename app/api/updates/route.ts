import { NextRequest } from "next/server";
import { createSupabaseServerClient } from "../../../lib/supabase/server";

export async function GET(request: NextRequest) {
  const state = (request.nextUrl.searchParams.get("state") ?? "MA").toUpperCase();
  if (!/^[A-Z]{2}$/.test(state)) {
    return Response.json({ error: "Invalid state code." }, { status: 400 });
  }

  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("updates")
    .select("id,slug,state_code,title,summary,url,source_published_at,last_verified_at,published_at,source_domains!inner(publisher_name)")
    .or(`state_code.is.null,state_code.eq.${state}`)
    .order("published_at", { ascending: false });

  if (error) return Response.json({ error: "Updates are temporarily unavailable." }, { status: 503 });
  return Response.json({ data });
}

