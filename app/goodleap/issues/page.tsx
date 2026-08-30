import Link from "next/link";

const paths = [
  ["System or installer problem", "/goodleap/issues/system-installer"],
  ["Loan or payment problem", "/goodleap/issues/loan-payments"],
  ["Solar isn’t what I expected", "/goodleap/issues/expectations"],
  ["I’m not sure what to do next", "/goodleap/issues/next-steps"],
] as const;

export default function GoodLeapIssuesPage() {
  return (
    <main className="gl-main">
      <section className="gl-section-intro">
        <p className="gl-kicker">Customer pathways</p>
        <h1>Start with the issue, not a legal label.</h1>
        <p>These broad categories are navigation tools. Specific claims and dispute types will be added only when supported by reliable sources.</p>
      </section>
      <div className="gl-section-grid">
        {paths.map(([title, href], index) => (
          <Link className="gl-card" href={href} key={href}>
            <small>Path {index + 1}</small>
            <h2>{title}</h2>
            <p>Development route reserved for source-based GoodLeap consumer research.</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
