import { NextRequest } from "next/server";
import { createSupabaseServerClient } from "../../../lib/supabase/server";

export async function GET(request: NextRequest) {
  const state = (request.nextUrl.searchParams.get("state") ?? "MA").toUpperCase();
  if (!/^[A-Z]{2}$/.test(state)) {
    return Response.json({ error: "Invalid state code." }, { status: 400 });
  }

  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("guides")
    .select("id,slug,state_code,title,summary,time_label,source_title,source_url,last_verified_at,sort_order,guide_steps(id,step_order,title,detail)")
    .or(`state_code.is.null,state_code.eq.${state}`)
    .order("sort_order", { ascending: true })
    .order("step_order", { referencedTable: "guide_steps", ascending: true });

  if (error) return Response.json({ error: "Guides are temporarily unavailable." }, { status: 503 });
  return Response.json({ data });
}

