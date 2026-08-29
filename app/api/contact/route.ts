import { NextRequest } from "next/server";
import { createSupabaseAdminClient } from "../../../lib/supabase/server";
import { verifyTurnstile } from "../../../lib/turnstile";

type ContactRequest = { email?: unknown; stateCode?: unknown; city?: unknown; question?: unknown; turnstileToken?: unknown; website?: unknown };

export async function POST(request: NextRequest) {
  const payload = (await request.json().catch(() => null)) as ContactRequest | null;
  const email = typeof payload?.email === "string" ? payload.email.trim().toLowerCase() : "";
  const stateCode = typeof payload?.stateCode === "string" ? payload.stateCode.toUpperCase() : "";
  const city = typeof payload?.city === "string" ? payload.city.trim() : "";
  const question = typeof payload?.question === "string" ? payload.question.trim() : "";
  const turnstileToken = typeof payload?.turnstileToken === "string" ? payload.turnstileToken : "";
  const website = typeof payload?.website === "string" ? payload.website.trim() : "";

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 320) return Response.json({ error: "Enter a valid email address." }, { status: 400 });
  if (!/^[A-Z]{2}$/.test(stateCode)) return Response.json({ error: "Choose a valid state." }, { status: 400 });
  if (city.length < 2 || city.length > 100) return Response.json({ error: "Enter a city or town." }, { status: 400 });
  if (question.length < 20 || question.length > 4000) return Response.json({ error: "Questions must be between 20 and 4,000 characters." }, { status: 400 });
  if (website) return Response.json({ received: true }, { status: 201 });

  const verification = await verifyTurnstile(turnstileToken, request.headers.get("CF-Connecting-IP"));
  if (verification.configurationError) return Response.json({ error: "This form is temporarily unavailable." }, { status: 503 });
  if (!verification.ok) return Response.json({ error: "Complete the verification check and try again." }, { status: 400 });

  const { error: databaseError } = await createSupabaseAdminClient()
    .from("contact_requests")
    .insert({ id: crypto.randomUUID(), email, state_code: stateCode, city, body: question });
  if (databaseError) return Response.json({ error: "Your question could not be recorded. Please try again." }, { status: 500 });

  try {
    const emailResponse = await fetch("https://formsubmit.co/ajax/contact@solarcomplaint.com", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        origin: "https://solarcomplaint.com",
        referer: "https://solarcomplaint.com/",
      },
      body: JSON.stringify({ email, state: stateCode, city, question, _subject: `[${stateCode}] ${city} — Solar Consumer Research request`, _replyto: email, _template: "table", _captcha: "false" }),
    });
    const emailResult = (await emailResponse.json().catch(() => null)) as { success?: boolean | string } | null;
    const notificationAccepted = emailResult?.success === true || emailResult?.success === "true";
    if (!emailResponse.ok || !notificationAccepted) throw new Error("Notification delivery failed");
  } catch {
    return Response.json({ received: true, notificationSent: false }, { status: 201 });
  }

  return Response.json({ received: true, notificationSent: true }, { status: 201 });
}
