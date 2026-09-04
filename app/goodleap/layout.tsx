import type { Metadata } from "next";
import Link from "next/link";
import "./goodleap.css";

export const metadata: Metadata = {
  title: {
    default: "GoodLeap Solar Financing Research",
    template: "%s | Solar Consumer Research",
  },
  description:
    "Independent, source-based research on GoodLeap solar financing, state litigation, arbitration, regulatory actions, and consumer resources.",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  },
};

const nav = [
  ["State research", "/goodleap/states"],
  ["Resources", "/goodleap/resources"],
  ["Methodology", "/methodology"],
  ["Research help", "/#questions"],
] as const;

export default function GoodLeapLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="gl-shell">
      <header className="gl-header">
        <div className="gl-header-inner">
          <Link className="gl-brand" href="/goodleap">
            <span>Solar Consumer Research</span>
            <strong>GoodLeap research</strong>
          </Link>
          <nav aria-label="GoodLeap research navigation">
            {nav.map(([label, href]) => (
              <Link href={href} key={href}>{label}</Link>
            ))}
          </nav>
        </div>
      </header>
      {children}
      <footer className="gl-footer">
        <p><strong>Solar Consumer Research</strong> is an independently operated public-records research project.</p>
        <p>
          <Link href="/">SolarComplaint.com</Link> · <Link href="/methodology">Methodology</Link> · <Link href="/corrections">Corrections</Link> · General information only; not legal or financial advice.
        </p>
      </footer>
    </div>
  );
}
