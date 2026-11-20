"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

export type EngagementPlacement = "homepage_story" | "read_next" | "search_result" | "story_archive";

function track(kind: "click" | "impression", placement: EngagementPlacement, destination = "") {
  if (typeof window === "undefined") return;
  const source = window.location.pathname;
  let target = "";
  if (destination) {
    const url = new URL(destination, window.location.href);
    if (url.origin !== window.location.origin) return;
    target = url.pathname;
  }
  // No search terms, cookies, IP address, user identifiers, or referrer are sent.
  const data = new Blob([JSON.stringify({ kind, placement, source, target })], {
    type: "application/json",
  });
  try {
    if (navigator.sendBeacon?.("/api/engagement", data)) return;
  } catch {
    // Fetch below is the keepalive fallback.
  }
  void fetch("/api/engagement", {
    method: "POST",
    body: data,
    keepalive: true,
    credentials: "same-origin",
  }).catch(() => undefined);
}

export function TrackedLink({
  href, placement, children, className, ariaLabel,
}: {
  href: string;
  placement: EngagementPlacement;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}) {
  return (
    <Link href={href} className={className} aria-label={ariaLabel}
      data-engagement-placement={placement}
      onClick={() => track("click", placement, href)}>
      {children}
    </Link>
  );
}

export function TrackedImpression({ placement }: { placement: EngagementPlacement }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!("IntersectionObserver" in window)) {
      track("impression", placement);
      return;
    }
    let recorded = false;
    const observer = new IntersectionObserver(entries => {
      if (recorded || !entries.some(entry => entry.isIntersecting)) return;
      recorded = true;
      track("impression", placement);
      observer.disconnect();
    }, { threshold: 0.01 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [placement]);
  return <span ref={ref} className="engagement-impression-marker"
    data-engagement-impression={placement} aria-hidden="true" />;
}
