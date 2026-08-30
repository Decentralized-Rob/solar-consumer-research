import type { Metadata } from "next";
import Link from "next/link";
import "./goodleap.css";

export const metadata: Metadata = {
  title: {
    default: "GoodLeap Consumer Resource Center",
    template: "%s | GoodLeap Consumer Resource Center",
  },
  description:
    "A developing Solar Consumer Research hub for GoodLeap solar financing, consumer issues, state resources, lawsuits, and source documents.",
  robots: {
    index: false,
    follow: false,
  },
};

const nav = [
  ["Issues", "/goodleap/issues"],
  ["States", "/goodleap/states"],
  ["Research", "/goodleap/research"],
  ["Lawsuits", "/goodleap/lawsuits"],
  ["Resources", "/goodleap/resources"],
] as const;

export default function GoodLeapLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="gl-shell">
      <header className="gl-header">
        <div className="gl-header-inner">
          <Link className="gl-brand" href="/goodleap">
            <span>Solar Consumer Research</span>
            <strong>GoodLeap Resource Center</strong>
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
        <p>General information only. Not legal or financial advice.</p>
      </footer>
    </div>
  );
}
