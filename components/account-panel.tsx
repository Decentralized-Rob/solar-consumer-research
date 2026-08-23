"use client";

import { FormEvent, useState } from "react";
import { states } from "../lib/content";

export function AccountPanel() {
  const [email, setEmail] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [city, setCity] = useState("");
  const [question, setQuestion] = useState("");
  const [message, setMessage] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [busy, setBusy] = useState(false);

  async function submitQuestion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setSubmittedEmail("");
    setBusy(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: email.trim(), stateCode: selectedState, city: city.trim(), question: question.trim() }),
      });
      const result = (await response.json()) as { error?: string; received?: boolean };
      if (!response.ok || !result.received) throw new Error(result.error ?? "Your question could not be sent. Please try again.");

      setSubmittedEmail(email.trim());
      setSelectedState("");
      setCity("");
      setQuestion("");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Your question could not be sent. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  if (submittedEmail) {
    return (
      <div className="contact-confirmation" role="status">
        <p>Question received</p>
        <h3>Thank you.</h3>
        <span>Your request has been recorded and sent to the research team.</span>
        <small>We’ll reply to {submittedEmail} from <strong>contact@solarcomplaint.com</strong>. Check your spam or junk folder if you do not see a reply.</small>
        <button type="button" onClick={() => setSubmittedEmail("")}>Send another question</button>
      </div>
    );
  }

  return (
    <form className="question-form question-form--public" onSubmit={submitQuestion}>
      <label htmlFor="question-email">Your email</label>
      <input id="question-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" autoComplete="email" required />
      <label htmlFor="question-state">State</label>
      <select id="question-state" value={selectedState} onChange={(event) => setSelectedState(event.target.value)} required>
        <option value="" disabled>Select your state</option>
        {states.map((state) => <option key={state.code} value={state.code}>{state.name}</option>)}
      </select>
      <label htmlFor="question-city">City or town</label>
      <input id="question-city" type="text" value={city} onChange={(event) => setCity(event.target.value)} maxLength={100} autoComplete="address-level2" required />
      <label htmlFor="research-question">Briefly describe your situation or question</label>
      <textarea id="research-question" value={question} onChange={(event) => setQuestion(event.target.value)} minLength={20} maxLength={4000} placeholder="Example: “My installer changed the system design after I signed. I’m trying to find the correct public resources for my situation.”" required />
      <p className="form-note">Do not include account numbers, financial details, Social Security numbers, or confidential documents.</p>
      <button className="button button--sun" type="submit" disabled={busy}>{busy ? "Sending..." : "Send question"}</button>
      <p className="form-note">We’ll reply from <strong>contact@solarcomplaint.com</strong>. Check your spam or junk folder if you do not see a reply.</p>
      {message && <p className="form-message" role="alert">{message}</p>}
    </form>
  );
}
