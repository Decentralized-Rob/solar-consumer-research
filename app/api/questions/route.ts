import { NextRequest } from "next/server";
import { authenticateRequest } from "../../../lib/api/auth";

export async function GET(request: NextRequest) {
  const auth = await authenticateRequest(request);
  if (!auth) return Response.json({ error: "Authentication required." }, { status: 401 });

  const { data, error } = await auth.supabase
    .from("questions")
    .select("id,state_code,city,body,status,created_at,updated_at,question_responses(id,body,sources,created_at)")
    .eq("user_id", auth.user.id)
    .order("created_at", { ascending: false });

  if (error) return Response.json({ error: "Questions could not be loaded." }, { status: 500 });
  return Response.json({ data });
}

export async function POST(request: NextRequest) {
  const auth = await authenticateRequest(request);
  if (!auth) return Response.json({ error: "Authentication required." }, { status: 401 });

  const payload = (await request.json().catch(() => null)) as {
    claimPending?: unknown;
    stateCode?: unknown;
    city?: unknown;
    question?: unknown;
  } | null;
  if (payload?.claimPending === true) {
    const { data: pending, error: pendingError } = await auth.supabase
      .from("pending_questions")
      .select("id,state_code,city,body,updates_opt_in")
      .gt("expires_at", new Date().toISOString())
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (pendingError) return Response.json({ error: "The pending question could not be checked." }, { status: 500 });
    if (!pending) return Response.json({ data: null, claimed: false }, { status: 200 });

    const { data: existing } = await auth.supabase
      .from("questions")
      .select("id,state_code,city,body,status,created_at")
      .eq("pending_question_id", pending.id)
      .maybeSingle();

    if (existing) {
      await auth.supabase.from("pending_questions").delete().eq("id", pending.id);
      return Response.json({ data: existing, claimed: true, updatesOptIn: pending.updates_opt_in }, { status: 200 });
    }

    const { data, error } = await auth.supabase
      .from("questions")
      .insert({
        user_id: auth.user.id,
        state_code: pending.state_code,
        city: pending.city,
        body: pending.body,
        pending_question_id: pending.id,
      })
      .select("id,state_code,city,body,status,created_at")
      .single();

    if (error) {
      if (error.code === "23505") {
        const { data: duplicate } = await auth.supabase
          .from("questions")
          .select("id,state_code,city,body,status,created_at")
          .eq("pending_question_id", pending.id)
          .maybeSingle();
        if (duplicate) return Response.json({ data: duplicate, claimed: true, updatesOptIn: pending.updates_opt_in }, { status: 200 });
      }
      return Response.json({ error: "Question could not be submitted." }, { status: 500 });
    }

    await auth.supabase.from("pending_questions").delete().eq("id", pending.id);
    return Response.json({ data, claimed: true, updatesOptIn: pending.updates_opt_in }, { status: 201 });
  }

  const stateCode = typeof payload?.stateCode === "string" ? payload.stateCode.toUpperCase() : "";
  const city = typeof payload?.city === "string" ? payload.city.trim() : "";
  const question = typeof payload?.question === "string" ? payload.question.trim() : "";

  if (!/^[A-Z]{2}$/.test(stateCode)) {
    return Response.json({ error: "Choose a valid state." }, { status: 400 });
  }
  if (city.length < 2 || city.length > 100) {
    return Response.json({ error: "Enter a city or town." }, { status: 400 });
  }
  if (question.length < 20 || question.length > 4000) {
    return Response.json({ error: "Questions must be between 20 and 4,000 characters." }, { status: 400 });
  }

  const { data, error } = await auth.supabase
    .from("questions")
    .insert({ user_id: auth.user.id, state_code: stateCode, city, body: question })
    .select("id,state_code,city,body,status,created_at")
    .single();

  if (error) return Response.json({ error: "Question could not be submitted." }, { status: 500 });
  return Response.json({
    data,
    workflow: {
      status: "submitted",
      automatedAnalysis: false,
      nextStep: "Human review for relevant public sources and official channels.",
    },
  }, { status: 201 });
}
