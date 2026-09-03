import type { Metadata } from "next";
import Link from "next/link";
import "./goodleap.css";

export const metadata: Metadata = {
  title: {
    default: "GoodLeap Consumer Resource Center",
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
  ["SolarComplaint.com", "/"],
  ["FLAG States", "/goodleap/states"],
  ["Resources", "/goodleap/resources"],
  ["Free research assistance", "/#questions"],
] as const;

export default function GoodLeapLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="gl-shell">
      <header className="gl-header">
        <div className="gl-header-inner">
          <Link className="gl-brand" href="/goodleap">
            <span>Solar Consumer Research</span>
            <strong>GoodLeap Consumer Resource Center</strong>
          </Link>
          <nav aria-label="GoodLeap hub navigation">
            {nav.map(([label, href]) => (
              <Link href={href} key={href}>{label}</Link>
            ))}
          </nav>
        </div>
      </header>
      {children}
      <footer className="gl-footer">
        <p><strong>Solar Consumer Research</strong> · Independent consumer research and source-based information.</p>
        <p><Link href="/">SolarComplaint.com</Link> · Consumer and lawsuit allegations are identified as such. General information only; not legal or financial advice.</p>
      </footer>
    </div>
  );
}
