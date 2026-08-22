import { NextRequest } from "next/server";
import { authenticateRequest } from "../../../lib/api/auth";

export async function GET(request: NextRequest) {
  const auth = await authenticateRequest(request);
  if (!auth) return Response.json({ error: "Authentication required." }, { status: 401 });

  const { data, error } = await auth.supabase
    .from("profiles")
    .select("email,state_code,research_updates_opt_in")
    .eq("user_id", auth.user.id)
    .maybeSingle();

  if (error) return Response.json({ error: "Profile could not be loaded." }, { status: 500 });
  return Response.json({ data });
}

export async function PUT(request: NextRequest) {
  const auth = await authenticateRequest(request);
  if (!auth) return Response.json({ error: "Authentication required." }, { status: 401 });

  const body = (await request.json().catch(() => null)) as {
    stateCode?: unknown;
    updatesOptIn?: unknown;
  } | null;
  const stateCode = typeof body?.stateCode === "string" ? body.stateCode.toUpperCase() : "";
  if (!/^[A-Z]{2}$/.test(stateCode)) {
    return Response.json({ error: "Choose a valid state." }, { status: 400 });
  }

  const { data: state } = await auth.supabase.from("states").select("code").eq("code", stateCode).eq("is_active", true).maybeSingle();
  if (!state) return Response.json({ error: "That state is not available yet." }, { status: 400 });

  const updatesOptIn = typeof body?.updatesOptIn === "boolean" ? body.updatesOptIn : undefined;
  const profile = {
    user_id: auth.user.id,
    email: auth.user.email ?? "",
    state_code: stateCode,
    updated_at: new Date().toISOString(),
    ...(updatesOptIn === undefined ? {} : {
      research_updates_opt_in: updatesOptIn,
      research_updates_opted_in_at: updatesOptIn ? new Date().toISOString() : null,
    }),
  };

  const { data, error } = await auth.supabase
    .from("profiles")
    .upsert(profile, { onConflict: "user_id" })
    .select("research_updates_opt_in")
    .single();

  if (error) return Response.json({ error: "Profile could not be saved." }, { status: 500 });
  return Response.json({ data: {
    email: auth.user.email,
    stateCode,
    updatesOptIn: data.research_updates_opt_in,
  } });
}
