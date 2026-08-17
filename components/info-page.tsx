import type { ReactNode } from "react";
import Link from "next/link";

export function InfoPage({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  children: ReactNode;
}) {
  return (
    <div className="info-page">
      <header className="info-header">
        <Link className="wordmark" href="/" aria-label="Solar Consumer Research home">
          <span className="wordmark-mark" aria-hidden="true">S</span>
          <span>Solar Consumer Research</span>
        </Link>
        <Link className="info-back" href="/">Back to the library</Link>
      </header>
      <main className="info-main">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="info-lede">{lede}</p>
        {children}
      </main>
    </div>
  );
}
