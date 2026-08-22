import { NextRequest } from "next/server";
import { createSupabaseServerClient } from "../../../../lib/supabase/server";

type PendingQuestionRequest = {
  email?: unknown;
  stateCode?: unknown;
  city?: unknown;
  question?: unknown;
  updatesOptIn?: unknown;
};

async function sha256(value: string) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function POST(request: NextRequest) {
  const payload = (await request.json().catch(() => null)) as PendingQuestionRequest | null;
  const email = typeof payload?.email === "string" ? payload.email.trim().toLowerCase() : "";
  const stateCode = typeof payload?.stateCode === "string" ? payload.stateCode.toUpperCase() : "";
  const city = typeof payload?.city === "string" ? payload.city.trim() : "";
  const question = typeof payload?.question === "string" ? payload.question.trim() : "";
  const updatesOptIn = payload?.updatesOptIn === true;

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 320) {
    return Response.json({ error: "Enter a valid email address." }, { status: 400 });
  }
  if (!/^[A-Z]{2}$/.test(stateCode)) return Response.json({ error: "Choose a valid state." }, { status: 400 });
  if (city.length < 2 || city.length > 100) return Response.json({ error: "Enter a city or town." }, { status: 400 });
  if (question.length < 20 || question.length > 4000) {
    return Response.json({ error: "Questions must be between 20 and 4,000 characters." }, { status: 400 });
  }

  const { error } = await createSupabaseServerClient()
    .from("pending_questions")
    .insert({
      id: crypto.randomUUID(),
      email_hash: await sha256(email),
      state_code: stateCode,
      city,
      body: question,
      updates_opt_in: updatesOptIn,
    });

  if (error) return Response.json({ error: "The question could not be prepared for verification." }, { status: 500 });
  return Response.json({ prepared: true }, { status: 201 });
}
