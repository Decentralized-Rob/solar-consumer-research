"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { states } from "../lib/content";
import { getSupabaseBrowserClient } from "../lib/supabase/client";
import { hasSupabasePublicConfig } from "../lib/supabase/config";

type QuestionRecord = {
  id: string;
  state_code: string;
  city: string;
  body: string;
  status: string;
  created_at: string;
  question_responses: Array<{ id: string; body: string; created_at: string }>;
};

type PendingQuestion = {
  stateCode: string;
  city: string;
  question: string;
};

const PENDING_QUESTION_KEY = "solar-consumer-research:pending-question";

export function AccountPanel({ stateCode }: { stateCode: string }) {
  const authAvailable = hasSupabasePublicConfig();
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState("");
  const [selectedState, setSelectedState] = useState(stateCode);
  const [city, setCity] = useState("");
  const [question, setQuestion] = useState("");
  const [questions, setQuestions] = useState<QuestionRecord[]>([]);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const pendingProcessed = useRef(false);

  useEffect(() => {
    setSelectedState(stateCode);
  }, [stateCode]);

  async function loadQuestions(activeSession: Session) {
    const response = await fetch("/api/questions", {
      headers: { authorization: `Bearer ${activeSession.access_token}` },
    });
    if (!response.ok) return;
    const payload = (await response.json()) as { data?: QuestionRecord[] };
    setQuestions(payload.data ?? []);
  }

  async function submitQuestionPayload(activeSession: Session, payload: PendingQuestion) {
    const response = await fetch("/api/questions", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${activeSession.access_token}`,
      },
      body: JSON.stringify(payload),
    });
    const result = (await response.json()) as { error?: string };
    if (!response.ok) throw new Error(result.error ?? "The question could not be submitted.");
  }

  useEffect(() => {
    if (!authAvailable) return;
    const supabase = getSupabaseBrowserClient();
    void supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });
    return () => subscription.subscription.unsubscribe();
  }, [authAvailable]);

  useEffect(() => {
    if (!session) return;

    void (async () => {
      await loadQuestions(session);
      if (pendingProcessed.current) return;
      pendingProcessed.current = true;

      const raw = sessionStorage.getItem(PENDING_QUESTION_KEY);
      if (!raw) return;

      try {
        const pending = JSON.parse(raw) as PendingQuestion;
        await submitQuestionPayload(session, pending);
        sessionStorage.removeItem(PENDING_QUESTION_KEY);
        setCity("");
        setQuestion("");
        setMessage("Your question was submitted privately. We will use it to identify relevant public resources, agencies, records, and published procedures.");
        await loadQuestions(session);
      } catch (error) {
        setMessage(error instanceof Error ? error.message : "Your question could not be submitted.");
      }
    })();
  }, [session]);

  function currentPayload(): PendingQuestion | null {
    const cleanCity = city.trim();
    const cleanQuestion = question.trim();
    if (!/^[A-Z]{2}$/.test(selectedState)) {
      setMessage("Choose a state.");
      return null;
    }
    if (cleanCity.length < 2 || cleanCity.length > 100) {
      setMessage("Enter a city or town.");
      return null;
    }
    if (cleanQuestion.length < 20 || cleanQuestion.length > 4000) {
      setMessage("Questions must be between 20 and 4,000 characters.");
      return null;
    }
    return { stateCode: selectedState, city: cleanCity, question: cleanQuestion };
  }

  async function requestEmailVerification(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!authAvailable) return;

    const payload = currentPayload();
    if (!payload) return;

    setBusy(true);
    setMessage("");
    sessionStorage.setItem(PENDING_QUESTION_KEY, JSON.stringify(payload));

    const { error } = await getSupabaseBrowserClient().auth.signInWithOtp({
      email: email.trim(),
      options: {
        shouldCreateUser: true,
        emailRedirectTo: `${window.location.origin}/#questions`,
      },
    });

    setBusy(false);
    if (error) {
      sessionStorage.removeItem(PENDING_QUESTION_KEY);
      setMessage(error.message);
      return;
    }
    setMessage("Check your email and use the secure link to submit your question.");
  }

  async function submitQuestion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!session) return;
    const payload = currentPayload();
    if (!payload) return;

    setBusy(true);
    setMessage("");
    try {
      await submitQuestionPayload(session, payload);
      setCity("");
      setQuestion("");
      setMessage("Your question was submitted privately. We will use it to identify relevant public resources, agencies, records, and published procedures.");
      await loadQuestions(session);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "The question could not be submitted.");
    } finally {
      setBusy(false);
    }
  }

  async function signOut() {
    if (!authAvailable) return;
    setBusy(true);
    await getSupabaseBrowserClient().auth.signOut();
    setQuestions([]);
    setMessage("");
    setBusy(false);
  }

  const fields = (
    <>
      <label htmlFor="question-state">State</label>
      <select id="question-state" value={selectedState} onChange={(event) => setSelectedState(event.target.value)} required>
        {states.map((state) => <option key={state.code} value={state.code}>{state.name}</option>)}
      </select>
      <label htmlFor="question-city">City or town</label>
      <input id="question-city" type="text" value={city} onChange={(event) => setCity(event.target.value)} maxLength={100} autoComplete="address-level2" required />
      <label htmlFor="research-question">Briefly describe your situation or question</label>
      <textarea
        id="research-question"
        value={question}
        onChange={(event) => setQuestion(event.target.value)}
        minLength={20}
        maxLength={4000}
        placeholder={'Example: “My installer changed the system design after I signed. I’m trying to find the correct state agency and any public contractor records.”'}
        required
      />
    </>
  );

  if (!authAvailable) {
    return (
      <div className="account-unavailable" role="status">
        <strong>Email contact is being prepared.</strong>
        <p>Public resources and guides remain available without an account.</p>
      </div>
    );
  }

  if (!session) {
    return (
      <form className="question-form question-form--public" onSubmit={requestEmailVerification}>
        <label htmlFor="question-email">Email address</label>
        <input id="question-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" autoComplete="email" required />
        {fields}
        <p className="form-note">We verify your email before storing a question. Do not include account numbers, financial details, or confidential documents.</p>
        <button className="button button--sun" type="submit" disabled={busy}>{busy ? "Sending..." : "Verify email and submit"}</button>
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
        {fields}
        <p className="form-note">General information only. We do not provide legal advice, evaluate claims, or interpret private contracts.</p>
        <button className="button button--sun" type="submit" disabled={busy}>{busy ? "Submitting..." : "Submit privately"}</button>
        {message && <p className="form-message" role="status">{message}</p>}
      </form>
      {questions.length > 0 && (
        <div className="question-history">
          <strong>Your questions</strong>
          {questions.map((item) => (
            <article key={item.id}>
              <span>{item.status} · {item.city}, {item.state_code}</span>
              <p>{item.body}</p>
              {item.question_responses?.map((response) => <div className="research-response" key={response.id}><strong>Research response</strong><p>{response.body}</p></div>)}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
