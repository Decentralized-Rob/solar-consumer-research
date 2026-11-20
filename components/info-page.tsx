import type { ReactNode } from "react";
import Link from "next/link";
import { SiteHeader } from "./site-header";
import { RelatedStories } from "./related-stories";

export function InfoPage({
  eyebrow,
  title,
  lede,
  children,
  showLegalNotice = true,
  currentStoryHref,
  className = "",
}: {
  eyebrow: string;
  title: string;
  lede: string;
  children: ReactNode;
  showLegalNotice?: boolean;
  currentStoryHref?: string;
  className?: string;
}) {
  return (
    <div className={`info-page ${className}`.trim()}>
      <SiteHeader />
      <main className="info-main">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="info-lede">{lede}</p>
        {children}
        {currentStoryHref ? <RelatedStories currentHref={currentStoryHref} /> : null}
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
