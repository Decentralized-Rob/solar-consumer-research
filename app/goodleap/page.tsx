import Link from "next/link";

const tracks = [
  {
    title: "System or installer problem",
    copy: "Installation, service, warranty, system performance, or an installer that closed or stopped responding.",
    href: "/goodleap/issues/system-installer",
  },
  {
    title: "Loan or payment problem",
    copy: "Payments, billing, payoff, servicing, refinancing, selling a home, or understanding the financing obligation.",
    href: "/goodleap/issues/loan-payments",
  },
  {
    title: "Solar isn’t what I expected",
    copy: "Savings, production, sales expectations, contract terms, or questions about what was represented before signing.",
    href: "/goodleap/issues/expectations",
  },
  {
    title: "I’m not sure what to do next",
    copy: "Start here if you need help identifying the right records, regulator, complaint path, or research source.",
    href: "/goodleap/issues/next-steps",
  },
];

const flagStates = [
  { abbr: "MN", state: "Minnesota", tag: "Attorney General action", detail: "Solar financing and dealer-fee allegations." },
  { abbr: "VA", state: "Virginia", tag: "Attorney General litigation", detail: "Power Home / Pink Energy financing litigation." },
  { abbr: "TX", state: "Texas", tag: "Litigation + arbitration", detail: "Multiple solar-financing disputes and appellate decisions." },
  { abbr: "FL", state: "Florida", tag: "Litigation", detail: "Consumer cases and cancellation-company litigation." },
  { abbr: "NJ", state: "New Jersey", tag: "Installer + financing", detail: "Cases involving major solar installers and GoodLeap financing." },
  { abbr: "MO", state: "Missouri", tag: "Bankruptcy overlap", detail: "GoodLeap financing disputes connected to Titan Solar Power." },
  { abbr: "OH", state: "Ohio", tag: "Installer litigation", detail: "Pink Energy / Power Home financing litigation." },
  { abbr: "MI", state: "Michigan", tag: "Installer litigation", detail: "Companion Pink Energy financing disputes." },
  { abbr: "MD", state: "Maryland", tag: "Arbitration ruling", detail: "Recent federal ruling involving a GoodLeap solar dispute." },
];

const watchStates = ["North Carolina", "Louisiana", "Oregon", "Nevada", "Pennsylvania", "Colorado"];

const researchAreas = [
  ["Court filings & cases", "Federal and state litigation, arbitration rulings, pleadings, and opinions.", "/goodleap/lawsuits"],
  ["Regulatory & AG actions", "Attorney general matters, financial regulators, CFPB material, and other government records.", "/goodleap/research"],
  ["Installer failures", "Research on what happens when the solar installer closes, enters bankruptcy, or stops servicing the project.", "/goodleap/issues/system-installer"],
  ["Licensing & market footprint", "GoodLeap licensing records, current solar-product availability, and state-by-state research status.", "/goodleap/states"],
] as const;

export default function GoodLeapHubPage() {
  return (
    <main className="gl-main">
      <section className="gl-hero gl-hero-grid">
        <div>
          <p className="gl-kicker">Independent consumer research</p>
          <h1>GoodLeap Solar Financing Research</h1>
          <p>
            Track lawsuits, arbitration, installer failures, state actions, and consumer resources.
          </p>
          <div className="gl-actions">
            <Link className="gl-button gl-button-primary" href="/goodleap/issues">Start with your problem</Link>
            <Link className="gl-button" href="/goodleap/states">Open the FLAG State Tracker</Link>
          </div>
        </div>
        <aside className="gl-hero-panel">
          <p className="gl-kicker">Current research footprint</p>
          <dl>
            <div><dt>46 + D.C.</dt><dd>states / district where GoodLeap currently lists licenses or registrations</dd></div>
            <div><dt>9</dt><dd>states currently strong enough for FLAG-level research</dd></div>
            <div><dt>6</dt><dd>additional states in the next research tier</dd></div>
          </dl>
          <p className="gl-fineprint">Licensing does not mean every state has the same GoodLeap solar activity or consumer issues.</p>
        </aside>
      </section>

      <section aria-labelledby="gl-start-heading">
        <div className="gl-heading-row">
          <div>
            <p className="gl-kicker">Start with the problem</p>
            <h2 id="gl-start-heading">What are you dealing with?</h2>
          </div>
          <Link href="/goodleap/issues">View all issue paths →</Link>
        </div>
        <div className="gl-track-grid">
          {tracks.map((track, index) => (
            <Link className="gl-card" href={track.href} key={track.href}>
              <small>Path {index + 1}</small>
              <h3>{track.title}</h3>
              <p>{track.copy}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="gl-flag-section" aria-labelledby="gl-flag-heading">
        <div className="gl-flag-intro">
          <p className="gl-kicker">FLAG State Tracker</p>
          <h2 id="gl-flag-heading">Financing Litigation & Arbitration involving GoodLeap</h2>
          <p>
            FLAG identifies states where GoodLeap-specific litigation, arbitration, attorney general action,
            or closely related financing disputes are substantial enough to justify deeper state research.
          </p>
          <p className="gl-fineprint">A FLAG designation is a research category, not a finding of wrongdoing.</p>
        </div>

        <div className="gl-state-grid">
          {flagStates.map((item) => (
            <article className="gl-state-card" key={item.abbr}>
              <span>{item.abbr}</span>
              <div>
                <small>{item.tag}</small>
                <h3>{item.state}</h3>
                <p>{item.detail}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="gl-actions">
          <Link className="gl-button gl-button-primary" href="/goodleap/states">View the FLAG State Tracker</Link>
          <Link className="gl-button" href="/goodleap/research">See the underlying research</Link>
        </div>
      </section>

      <section className="gl-watch-section">
        <div>
          <p className="gl-kicker">Research next</p>
          <h2>Other states with meaningful GoodLeap activity</h2>
          <p>These states have current or recent GoodLeap-specific material but need more depth before we build full state pages.</p>
        </div>
        <div className="gl-chip-list">
          {watchStates.map((state) => <span key={state}>{state}</span>)}
        </div>
      </section>

      <section aria-labelledby="gl-research-heading">
        <div className="gl-heading-row">
          <div>
            <p className="gl-kicker">National research</p>
            <h2 id="gl-research-heading">Follow the issue across states</h2>
          </div>
          <Link href="/goodleap/research">Open research library →</Link>
        </div>
        <div className="gl-section-grid">
          {researchAreas.map(([title, copy, href]) => (
            <Link className="gl-card gl-card-compact" href={href} key={title}>
              <h3>{title}</h3>
              <p>{copy}</p>
            </Link>
          ))}
        </div>
      </section>

      <aside className="gl-note">
        Free research assistance will reuse SolarComplaint.com’s existing form architecture. The GoodLeap version will collect state, installer if known, broad issue category, a short description, and email when that workflow is ready.
      </aside>
    </main>
  );
}
