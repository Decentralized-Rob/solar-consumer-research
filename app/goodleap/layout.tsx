import type { Metadata } from "next";
import Link from "next/link";
import "./goodleap.css";

export const metadata: Metadata = {
  title: {
    default: "GoodLeap Consumer Resource Center",
    template: "%s | GoodLeap Consumer Resource Center",
  },
  description:
    "Independent, source-based research on GoodLeap solar financing, state litigation, arbitration, regulatory actions, installer failures, and consumer resources.",
  robots: {
    index: false,
    follow: false,
  },
};

const nav = [
  ["SolarComplaint.com", "/"],
  ["Start with your issue", "/goodleap/issues"],
  ["FLAG States", "/goodleap/states"],
  ["Research", "/goodleap/research"],
  ["Cases", "/goodleap/lawsuits"],
  ["Resources", "/goodleap/resources"],
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
        <p><Link href="/">SolarComplaint.com</Link> · Consumer allegations and lawsuit allegations are identified as such. General information only; not legal or financial advice.</p>
      </footer>
    </div>
  );
}
