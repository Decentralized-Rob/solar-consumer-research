import { NextRequest } from "next/server";
import { createSupabaseAdminClient } from "../../../lib/supabase/server";
import { verifyTurnstile } from "../../../lib/turnstile";

type SourceSubmission = { url?: unknown; title?: unknown; note?: unknown; email?: unknown; turnstileToken?: unknown; website?: unknown };

export async function POST(request: NextRequest) {
  const payload = (await request.json().catch(() => null)) as SourceSubmission | null;
  const url = typeof payload?.url === "string" ? payload.url.trim() : "";
  const title = typeof payload?.title === "string" ? payload.title.trim() : "";
  const note = typeof payload?.note === "string" ? payload.note.trim() : "";
  const email = typeof payload?.email === "string" ? payload.email.trim().toLowerCase() : "";
  const token = typeof payload?.turnstileToken === "string" ? payload.turnstileToken : "";
  const website = typeof payload?.website === "string" ? payload.website.trim() : "";

  let parsedUrl: URL;
  try { parsedUrl = new URL(url); } catch { return Response.json({ error: "Enter a complete https:// or http:// link." }, { status: 400 }); }
  if (!/^https?:$/.test(parsedUrl.protocol) || url.length > 2048) return Response.json({ error: "Enter a complete https:// or http:// link." }, { status: 400 });
  if (title.length > 200 || note.length < 20 || note.length > 2000) return Response.json({ error: "Explain the link in 20 to 2,000 characters." }, { status: 400 });
  if (email && (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 320)) return Response.json({ error: "Enter a valid email address or leave it blank." }, { status: 400 });
  if (website) return Response.json({ received: true }, { status: 201 });

  const verification = await verifyTurnstile(token, request.headers.get("CF-Connecting-IP"));
  if (verification.configurationError) return Response.json({ error: "This form is temporarily unavailable." }, { status: 503 });
  if (!verification.ok) return Response.json({ error: "Complete the verification check and try again." }, { status: 400 });

  const { error: databaseError } = await createSupabaseAdminClient().from("source_submissions").insert({
    id: crypto.randomUUID(), url, title: title || null, note, email: email || null,
  });
  if (databaseError) return Response.json({ error: "Your link could not be recorded. Please try again." }, { status: 500 });

  return Response.json({ received: true }, { status: 201 });
}
