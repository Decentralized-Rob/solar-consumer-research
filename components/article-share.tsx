"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { FacebookIcon, FacebookShareButton, XIcon, XShareButton } from "react-share";

const SITE_ORIGIN = "https://solarcomplaint.com";
const nonShareRoutes = new Set([
  "/", "/about", "/privacy", "/disclaimer", "/corrections", "/search",
  "/authors/jules-young",
]);

function isShareablePath(path: string) {
  const normalized = path.replace(/\/$/, "") || "/";
  return !nonShareRoutes.has(normalized)
    && !normalized.startsWith("/api/")
    && !normalized.includes("/preview-");
}

type ShareProps = {
  href?: string;
  title?: string;
  variant?: "inline" | "footer";
};

export function ArticleShareButtons({ href, title, variant = "inline" }: ShareProps) {
  const currentPath = usePathname() ?? "/";
  const [copied, setCopied] = useState(false);
  if (!href && !isShareablePath(currentPath)) return null;

  const target = href ?? currentPath;
  const shareUrl = target.startsWith("http")
    ? target
    : `${SITE_ORIGIN}${target.startsWith("/") ? target : `/${target}`}`;

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className={`sc-share sc-share--${variant}`} aria-label="Share this page">
      <span className="sc-share__label">Share</span>
      <FacebookShareButton url={shareUrl} aria-label="Share on Facebook" title={title}>
        <FacebookIcon size={36} round />
      </FacebookShareButton>
      <XShareButton url={shareUrl} title={title} aria-label="Share on X">
        <XIcon size={36} round />
      </XShareButton>
      <button className="sc-share__copy" onClick={copyLink} type="button" aria-label="Copy page link" title="Copy link">
        <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="8" y="8" width="13" height="13" rx="2" />
          <path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" />
        </svg>
      </button>
      <span role="status" aria-live="polite" className={`sc-share__feedback${copied ? " sc-share__feedback--shown" : ""}`}>
        {copied ? "Copied" : ""}
      </span>
    </div>
  );
}

/** Catches older page layouts and new posts without a template change. */
export function SitewideShareFooter() {
  const path = usePathname() ?? "/";
  if (!isShareablePath(path)) return null;
  return (
    <aside className="sc-share-footer" aria-label="Share this page">
      <ArticleShareButtons href={path} variant="footer" />
    </aside>
  );
}
