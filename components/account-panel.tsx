"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { states } from "../lib/content";
import { getSupabaseBrowserClient } from "../lib/supabase/client";
import { getPublicFeatureConfig, hasSupabasePublicConfig } from "../lib/supabase/config";
import { TurnstileWidget } from "./turnstile-widget";

type QuestionRecord = {
  id: string;
  state_code: string;
  city: string | null;
  body: string;
  status: string;
  created_at: string;
  question_responses: Array<{ id: string; body: string; created_at: string }>;
};

type QuestionPayload = {
  stateCode: string;
  city: string;
  question: string;
};

type PendingUpdateAction = {
  stateCode: string;
  updatesOptIn: true;
};

const PENDING_UPDATE_KEY = "solar-consumer-research:pending-update";

export function AccountPanel({ stateCode }: { stateCode: string }) {
  const authAvailable = hasSupabasePublicConfig();
  const { emailAuthEnabled, googleAuthEnabled, turnstileSiteKey } = getPublicFeatureConfig();
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState("");
  const [selectedState, setSelectedState] = useState(stateCode);
  const [city, setCity] = useState("");
  const [question, setQuestion] = useState("");
  const [questions, setQuestions] = useState<QuestionRecord[]>([]);
  const [updatesOptIn, setUpdatesOptIn] = useState(false);
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaResetKey, setCaptchaResetKey] = useState(0);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const processingPending = useRef(false);

  const loadQuestions = useCallback(async (activeSession: Session) => {
    const response = await fetch("/api/questions", {
      headers: { authorization: `Bearer ${activeSession.access_token}` },
    });
    if (!response.ok) return;
    const payload = (await response.json()) as { data?: QuestionRecord[] };
    setQuestions(payload.data ?? []);
  }, []);

  const saveProfile = useCallback(async (
    activeSession: Session,
    activeState: string,
    nextUpdatesOptIn?: boolean,
  ) => {
    const response = await fetch("/api/profile", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${activeSession.access_token}`,
      },
      body: JSON.stringify({ stateCode: activeState, updatesOptIn: nextUpdatesOptIn }),
    });
    if (!response.ok) return false;
    const payload = (await response.json()) as { data?: { updatesOptIn?: boolean } };
    if (typeof payload.data?.updatesOptIn === "boolean") {
      setUpdatesOptIn(payload.data.updatesOptIn);
    }
    return true;
  }, []);

  const submitQuestionPayload = useCallback(async (
    activeSession: Session,
    payload: QuestionPayload | { claimPending: true },
  ) => {
    const response = await fetch("/api/questions", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${activeSession.access_token}`,
      },
      body: JSON.stringify(payload),
    });
    const result = (await response.json()) as {
      data?: { state_code?: string } | null;
      error?: string;
      claimed?: boolean;
      updatesOptIn?: boolean;
    };
    if (!response.ok) throw new Error(result.error ?? "The question could not be submitted.");
    return result;
  }, []);

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
    if (!session) {
      processingPending.current = false;
      return;
    }
    if (processingPending.current) return;
    processingPending.current = true;

    void (async () => {
      try {
        const rawPendingUpdate = sessionStorage.getItem(PENDING_UPDATE_KEY);
        const pendingUpdate = rawPendingUpdate ? JSON.parse(rawPendingUpdate) as PendingUpdateAction : null;
        await saveProfile(session, pendingUpdate?.stateCode ?? stateCode, pendingUpdate?.updatesOptIn);

        if (pendingUpdate) {
          sessionStorage.removeItem(PENDING_UPDATE_KEY);
          setMessage("Your email is verified. You will only receive occasional research and site updates.");
        }

        const result = await submitQuestionPayload(session, { claimPending: true });
        if (result.claimed) {
          if (result.updatesOptIn) await saveProfile(session, result.data?.state_code ?? stateCode, true);
          setCity("");
          setQuestion("");
          setMessage("Your question was submitted privately. You can return here to view its status and any source-based response.");
        }
        await loadQuestions(session);
      } catch (error) {
        setMessage(error instanceof Error ? error.message : "Your request could not be completed.");
      } finally {
        processingPending.current = false;
      }
    })();
  }, [loadQuestions, saveProfile, session, stateCode, submitQuestionPayload]);

  function resetCaptcha() {
    setCaptchaToken("");
    setCaptchaResetKey((value) => value + 1);
  }

  function currentQuestionPayload(): QuestionPayload | null {
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

  async function requestUpdates(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!authAvailable || !emailAuthEnabled) return;
    if (turnstileSiteKey && !captchaToken) {
      setMessage("Complete the bot check first.");
      return;
    }

    setBusy(true);
    setMessage("");
    sessionStorage.setItem(PENDING_UPDATE_KEY, JSON.stringify({ stateCode, updatesOptIn: true } satisfies PendingUpdateAction));
    const { error } = await getSupabaseBrowserClient().auth.signInWithOtp({
      email: email.trim(),
      options: {
        shouldCreateUser: true,
        emailRedirectTo: `${window.location.origin}/#questions`,
        ...(captchaToken ? { captchaToken } : {}),
      },
    });
    setBusy(false);
    resetCaptcha();

    if (error) {
      sessionStorage.removeItem(PENDING_UPDATE_KEY);
      setMessage(error.message);
      return;
    }
    setMessage("Check your email and use the secure link to finish.");
  }

  async function requestQuestion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!authAvailable || !emailAuthEnabled) return;
    if (turnstileSiteKey && !captchaToken) {
      setMessage("Complete the bot check first.");
      return;
    }
    const payload = currentQuestionPayload();
    if (!payload) return;

    setBusy(true);
    setMessage("");
    const pendingResponse = await fetch("/api/questions/pending", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: email.trim(), ...payload, updatesOptIn }),
    });
    const pendingResult = (await pendingResponse.json()) as { prepared?: boolean; error?: string };
    if (!pendingResponse.ok || !pendingResult.prepared) {
      setBusy(false);
      resetCaptcha();
      setMessage(pendingResult.error ?? "The question could not be prepared for verification.");
      return;
    }

    const { error } = await getSupabaseBrowserClient().auth.signInWithOtp({
      email: email.trim(),
      options: {
        shouldCreateUser: true,
        emailRedirectTo: `${window.location.origin}/#questions`,
        ...(captchaToken ? { captchaToken } : {}),
      },
    });
    setBusy(false);
    resetCaptcha();

    if (error) {
      setMessage(error.message);
      return;
    }
    setMessage("Check your email and use the secure link to submit your question.");
  }

  async function signInWithGoogle() {
    if (!authAvailable || !googleAuthEnabled) return;
    setBusy(true);
    setMessage("");
    const { error } = await getSupabaseBrowserClient().auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/#questions` },
    });
    if (error) {
      setBusy(false);
      setMessage(error.message);
    }
  }

  async function submitQuestion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!session) return;
    const payload = currentQuestionPayload();
    if (!payload) return;
    setBusy(true);
    setMessage("");
    try {
      await submitQuestionPayload(session, payload);
      setCity("");
      setQuestion("");
      setMessage("Your question was submitted privately.");
      await loadQuestions(session);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "The question could not be submitted.");
    } finally {
      setBusy(false);
    }
  }

  async function changeUpdatesPreference(nextValue: boolean) {
    if (!session) return;
    setBusy(true);
    const saved = await saveProfile(session, selectedState, nextValue);
    setMessage(saved
      ? nextValue
        ? "Research and site updates are on."
        : "Research and site updates are off."
      : "Your email preference could not be changed.");
    setBusy(false);
  }

  async function signOut() {
    if (!authAvailable) return;
    setBusy(true);
    await getSupabaseBrowserClient().auth.signOut();
    setQuestions([]);
    setMessage("");
    setBusy(false);
  }

  const questionFields = (
    <>
      <label htmlFor="question-state">State</label>
      <select id="question-state" value={selectedState} onChange={(event) => setSelectedState(event.target.value)} required>
        {states.map((state) => <option key={state.code} value={state.code}>{state.name}</option>)}
      </select>
      <label htmlFor="question-city">City or town</label>
      <input
        id="question-city"
        type="text"
        value={city}
        onChange={(event) => setCity(event.target.value)}
        maxLength={100}
        autoComplete="address-level2"
        required
      />
      <label htmlFor="research-question">Briefly describe your situation or question</label>
      <textarea
        id="research-question"
        value={question}
        onChange={(event) => setQuestion(event.target.value)}
        minLength={20}
        maxLength={4000}
        placeholder="Example: “My installer changed the system design after I signed. I’m trying to find the correct state agency and any public contractor records.”"
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
      <div className="contact-options">
        {emailAuthEnabled ? (
          <>
            <form className="account-form account-form--first" onSubmit={requestUpdates}>
              <div className="form-heading">
                <strong>Get important updates</strong>
                <span>Only occasional alerts about meaningful research or site changes.</span>
              </div>
              <label htmlFor="updates-email">Email address</label>
              <input
                id="updates-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
              <button className="button button--sun" type="submit" disabled={busy}>
                {busy ? "Sending..." : "Verify my email"}
              </button>
            </form>

            <div className="form-divider"><span>or ask a question</span></div>

            <form className="question-form question-form--public" onSubmit={requestQuestion}>
              <label htmlFor="question-email">Your email</label>
              <input
                id="question-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
              {questionFields}
              <label className="form-checkbox">
                <input
                  type="checkbox"
                  checked={updatesOptIn}
                  onChange={(event) => setUpdatesOptIn(event.target.checked)}
                />
                <span>Also send me occasional research and site updates.</span>
              </label>
              <p className="form-note">We hold your question for up to one hour and submit it only after you verify your email. Do not include account numbers, financial details, or confidential documents.</p>
              <button className="button button--sun" type="submit" disabled={busy}>
                {busy ? "Sending..." : "Verify email and submit"}
              </button>
            </form>
          </>
        ) : (
          <div className="account-unavailable" role="status">
            <strong>Email contact is almost ready.</strong>
            <p>The private delivery and bot-protection settings still need to be connected.</p>
          </div>
        )}

        {googleAuthEnabled && (
          <button className="google-auth-button" type="button" onClick={signInWithGoogle} disabled={busy}>
            <span aria-hidden="true">G</span> Continue with Google
          </button>
        )}
        {emailAuthEnabled && turnstileSiteKey && (
          <TurnstileWidget
            siteKey={turnstileSiteKey}
            onToken={setCaptchaToken}
            resetKey={captchaResetKey}
          />
        )}
        {message && <p className="form-message" role="status">{message}</p>}
      </div>
    );
  }

  return (
    <div className="signed-in-panel">
      <div className="account-line">
        <span>Signed in as {session.user.email}</span>
        <button type="button" onClick={signOut} disabled={busy}>Sign out</button>
      </div>
      <div className="updates-preference">
        <span>Occasional research and site updates: <strong>{updatesOptIn ? "On" : "Off"}</strong></span>
        <button type="button" onClick={() => changeUpdatesPreference(!updatesOptIn)} disabled={busy}>
          Turn {updatesOptIn ? "off" : "on"}
        </button>
      </div>
      <form className="question-form" onSubmit={submitQuestion}>
        {questionFields}
        <p className="form-note">Do not include account numbers, Social Security numbers, financial details, or confidential documents.</p>
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
              <span>{item.status} · {item.city ? `${item.city}, ` : ""}{item.state_code}</span>
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
