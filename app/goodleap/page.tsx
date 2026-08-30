import Link from "next/link";

const tracks = [
  {
    title: "System or installer problem",
    copy: "For installation, service, warranty, system-performance, or installer-closure questions tied to a GoodLeap-financed project.",
    href: "/goodleap/issues/system-installer",
  },
  {
    title: "Loan or payment problem",
    copy: "For payment, financing, payoff, billing, refinancing, home-sale, or loan-servicing questions.",
    href: "/goodleap/issues/loan-payments",
  },
  {
    title: "Solar isn’t what I expected",
    copy: "For concerns about savings, sales expectations, production, contract terms, or what was represented before signing.",
    href: "/goodleap/issues/expectations",
  },
  {
    title: "I’m not sure what to do next",
    copy: "A general research path for consumers who need help identifying the right records, agency, state resource, or source material.",
    href: "/goodleap/issues/next-steps",
  },
];

const sections = [
  ["State resources", "GoodLeap-specific state research will be added only where enough material exists to support a useful page.", "/goodleap/states"],
  ["Research library", "Court filings, regulatory actions, company documents, consumer complaint sources, and other primary records.", "/goodleap/research"],
  ["Lawsuits", "A structured home for sourced litigation tracking without turning litigation into the entire hub.", "/goodleap/lawsuits"],
  ["Consumer resources", "Federal, state, and practical source material relevant to residential solar financing and disputes.", "/goodleap/resources"],
] as const;

export default function GoodLeapHubPage() {
  return (
    <main className="gl-main">
      <section className="gl-hero">
        <p className="gl-kicker">Development scaffold · not yet published</p>
        <h1>GoodLeap Consumer Resource Center</h1>
        <p>
          A source-based consumer research hub for GoodLeap solar financing, installer problems,
          state-specific resources, lawsuits, regulatory records, and practical research paths.
        </p>
      </section>

      <section aria-labelledby="gl-start-heading">
        <p className="gl-kicker">Start with the problem</p>
        <div className="gl-track-grid" id="gl-start-heading">
          {tracks.map((track, index) => (
            <Link className="gl-card" href={track.href} key={track.href}>
              <small>Path {index + 1}</small>
              <h2>{track.title}</h2>
              <p>{track.copy}</p>
            </Link>
          ))}
        </div>
      </section>

      <hr className="gl-divider" />

      <section aria-label="GoodLeap research sections">
        <p className="gl-kicker">Browse the hub</p>
        <div className="gl-section-grid">
          {sections.map(([title, copy, href]) => (
            <Link className="gl-card" href={href} key={href}>
              <h3>{title}</h3>
              <p>{copy}</p>
            </Link>
          ))}
        </div>
      </section>

      <aside className="gl-note">
        Research assistance will reuse the existing SolarComplaint.com form architecture where practical.
        The final form is intentionally not implemented in this scaffold.
      </aside>
    </main>
  );
}
