"use client";

import { FormEvent, useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { getSupabaseBrowserClient } from "../lib/supabase/client";
import { hasSupabasePublicConfig } from "../lib/supabase/config";

type QuestionRecord = {
  id: string;
  body: string;
  status: string;
  created_at: string;
  question_responses: Array<{ id: string; body: string; created_at: string }>;
};

export function AccountPanel({ stateCode }: { stateCode: string }) {
  const authAvailable = hasSupabasePublicConfig();
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  const [questions, setQuestions] = useState<QuestionRecord[]>([]);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!authAvailable) return;
    const supabase = getSupabaseBrowserClient();
    void supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, nextSession) => setSession(nextSession));
    return () => subscription.subscription.unsubscribe();
  }, [authAvailable]);

  useEffect(() => {
    if (!session) return;
    void saveProfile(session, stateCode);
    void loadQuestions(session);
  }, [session, stateCode]);

  async function saveProfile(activeSession: Session, activeState: string) {
    await fetch("/api/profile", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${activeSession.access_token}`,
      },
      body: JSON.stringify({ stateCode: activeState }),
    });
  }

  async function loadQuestions(activeSession: Session) {
    const response = await fetch("/api/questions", {
      headers: { authorization: `Bearer ${activeSession.access_token}` },
    });
    if (!response.ok) return;
    const payload = (await response.json()) as { data?: QuestionRecord[] };
    setQuestions(payload.data ?? []);
  }

  async function requestSignIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!authAvailable) return;
    setBusy(true);
    setMessage("");
    const { error } = await getSupabaseBrowserClient().auth.signInWithOtp({
      email: email.trim(),
      options: {
        shouldCreateUser: true,
        emailRedirectTo: `${window.location.origin}/#questions`,
      },
    });
    setBusy(false);
    setMessage(error ? error.message : "Check your email for a secure sign-in link.");
  }

  async function submitQuestion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!session) return;
    setBusy(true);
    setMessage("");
    const response = await fetch("/api/questions", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({ stateCode, question }),
    });
    const payload = (await response.json()) as {
      error?: string;
      workflow?: { status: string; automatedAnalysis: boolean; nextStep: string };
    };
    setBusy(false);
    if (!response.ok) {
      setMessage(payload.error ?? "The question could not be submitted.");
      return;
    }
    setQuestion("");
    setMessage(
      payload.workflow?.automatedAnalysis === false
        ? "Saved privately as Submitted. No automated legal analysis was performed. A human-reviewed, source-based response will appear here when complete."
        : "Your question was submitted privately.",
    );
    await loadQuestions(session);
  }

  async function signOut() {
    if (!authAvailable) return;
    setBusy(true);
    await getSupabaseBrowserClient().auth.signOut();
    setQuestions([]);
    setMessage("");
    setBusy(false);
  }

  if (!authAvailable) {
    return (
      <div className="account-unavailable" role="status">
        <strong>Private questions are temporarily unavailable.</strong>
        <p>Public resources and guides remain available while this feature is being prepared.</p>
      </div>
    );
  }

  if (!session) {
    return (
      <form className="account-form" onSubmit={requestSignIn}>
        <label htmlFor="account-email">Email address</label>
        <input
          id="account-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
          required
        />
        <p className="form-note">State: Massachusetts. A secure sign-in link will be emailed to you.</p>
        <button className="button button--sun" type="submit" disabled={busy}>
          {busy ? "Sending..." : "Join or sign in"}
        </button>
        {message && <p className="form-message" role="status">{message}</p>}
      </form>
    );
  }

  return (
    <div className="signed-in-panel">
      <div className="account-line">
        <span>Signed in as {session.user.email}</span>
        <button type="button" onClick={signOut} disabled={busy}>Sign out</button>
      </div>
      <form className="question-form" onSubmit={submitQuestion}>
        <label htmlFor="research-question">Your research question</label>
        <textarea
          id="research-question"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          minLength={20}
          maxLength={4000}
          placeholder="What public record, agency, form, or published rule are you trying to locate?"
          required
        />
        <p className="form-note">Your wording is stored as your description of the issue, not as a verified finding. Do not include account numbers, financial details, or other sensitive personal information.</p>
        <button className="button button--sun" type="submit" disabled={busy}>
          {busy ? "Submitting..." : "Submit privately"}
        </button>
        {message && <p className="form-message" role="status">{message}</p>}
      </form>
      {questions.length > 0 && (
        <div className="question-history">
          <strong>Your questions</strong>
          {questions.map((item) => (
            <article key={item.id}>
              <span>{item.status}</span>
              <p>{item.body}</p>
              {item.question_responses?.map((response) => (
                <div className="research-response" key={response.id}>
                  <strong>Research response</strong>
                  <p>{response.body}</p>
                </div>
              ))}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
