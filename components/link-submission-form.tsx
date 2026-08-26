"use client";

import { FormEvent, useCallback, useState } from "react";
import { getPublicFeatureConfig } from "../lib/supabase/config";
import { TurnstileWidget } from "./turnstile-widget";

export function LinkSubmissionForm() {
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [resetKey, setResetKey] = useState(0);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [busy, setBusy] = useState(false);
  const siteKey = getPublicFeatureConfig().turnstileSiteKey;
  const onToken = useCallback((value: string) => setToken(value), []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    if (!token) {
      setMessage("Complete the verification check before submitting a link.");
      return;
    }
    setBusy(true);
    let attemptedSubmission = false;
    try {
      attemptedSubmission = true;
      const response = await fetch("/api/source-submissions", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ url: url.trim(), title: title.trim(), note: note.trim(), email: email.trim(), turnstileToken: token, website: "" }),
      });
      const result = (await response.json()) as { error?: string; received?: boolean };
      if (!response.ok || !result.received) throw new Error(result.error ?? "Your link could not be submitted. Please try again.");
      setSubmitted(true);
      setUrl(""); setTitle(""); setNote(""); setEmail("");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Your link could not be submitted. Please try again.");
    } finally {
      if (attemptedSubmission) {
        setToken("");
        setResetKey((value) => value + 1);
      }
      setBusy(false);
    }
  }

  if (submitted) return <div className="link-submission-confirmation" role="status"><strong>Link received.</strong><p>It will be reviewed against the site’s source standards before any listing is added.</p><button type="button" onClick={() => setSubmitted(false)}>Submit another link</button></div>;

  return <form className="link-submission-form" onSubmit={submit}>
    <label htmlFor="suggested-link">Source link</label>
    <input id="suggested-link" type="url" value={url} onChange={(event) => setUrl(event.target.value)} placeholder="https://" maxLength={2048} required />
    <label htmlFor="suggested-title">Source title <span>(optional)</span></label>
    <input id="suggested-title" type="text" value={title} onChange={(event) => setTitle(event.target.value)} maxLength={200} />
    <label htmlFor="suggested-note">Why should it be added?</label>
    <textarea id="suggested-note" value={note} onChange={(event) => setNote(event.target.value)} minLength={20} maxLength={2000} required />
    <label htmlFor="suggested-email">Your email <span>(optional, for follow-up)</span></label>
    <input id="suggested-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} maxLength={320} autoComplete="email" />
    {siteKey ? <TurnstileWidget siteKey={siteKey} onToken={onToken} resetKey={resetKey} /> : <p className="form-message" role="alert">This form is temporarily unavailable.</p>}
    <button className="button button--sun" type="submit" disabled={busy || !siteKey}>{busy ? "Submitting..." : "Submit link for review"}</button>
    {message && <p className="form-message" role="alert">{message}</p>}
  </form>;
}
