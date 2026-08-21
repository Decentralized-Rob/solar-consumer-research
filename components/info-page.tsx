import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";

export function InfoPage({
  eyebrow,
  title,
  lede,
  children,
  showLegalNotice = true,
  className = "",
}: {
  eyebrow: string;
  title: string;
  lede: string;
  children: ReactNode;
  showLegalNotice?: boolean;
  className?: string;
}) {
  return (
    <div className={`info-page ${className}`.trim()}>
      <header className="info-header">
        <Link className="wordmark" href="/" aria-label="Solar Consumer Research home">
          <Image className="brand-logo" src="/brand/solar-consumer-research.svg" alt="" width={690} height={104} unoptimized />
        </Link>
        <Link className="info-back" href="/">Back to the library</Link>
      </header>
      <main className="info-main">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="info-lede">{lede}</p>
        {children}
        {showLegalNotice && (
          <aside className="legal-notice" aria-label="Legal information disclaimer">
            <strong>General information only</strong>
            <p>
              This site does not provide legal advice, evaluate claims, or determine whether any person or company violated the law. <Link href="/disclaimer">Read the full disclaimer.</Link>
            </p>
          </aside>
        )}
      </main>
    </div>
  );
}
