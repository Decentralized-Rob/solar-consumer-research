"use client";

import { FormEvent, useState } from "react";

export default function SubscribeForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="tt-success" role="status">
        <b>✓</b>
        <div>
          <strong>Signup flow confirmed</strong>
          <p>This review implementation does not store email addresses. The production connection will use topic-specific, double opt-in alerts.</p>
        </div>
      </div>
    );
  }

  return (
    <form className="tt-form" onSubmit={handleSubmit}>
      <label htmlFor="titan-email">Email address</label>
      <div>
        <input id="titan-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
        <button type="submit">Notify me →</button>
      </div>
      <p>Preview behavior only — no email is sent or stored.</p>
    </form>
  );
}
