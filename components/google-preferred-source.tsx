"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { getSharedPreferredSourcePaths } from "../lib/published-destinations";
import styles from "./google-preferred-source.module.css";

const exactPaths = new Set(["/", "/research", "/updates"]);
const publishedPreferredSourcePaths = new Set(getSharedPreferredSourcePaths());

type PreferredSourceClient = { init: () => void };

declare global {
  interface Window {
    PREFERRED_SOURCE?: { push: (callback: (client: PreferredSourceClient) => void) => void };
  }
}

function shouldShowPreferredSource(pathname: string) {
  if (exactPaths.has(pathname)) return true;

  if (publishedPreferredSourcePaths.has(pathname)) return true;

  if (pathname.startsWith("/research/")) return true;

  // The Freedom Forever hub already has its own embedded Google control.
  if (pathname === "/cases/freedom-forever") return false;

  return pathname.startsWith("/cases/");
}

export function GooglePreferredSourceControl() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    if (typeof IntersectionObserver === "undefined") {
      const frame = requestAnimationFrame(() => setShouldLoad(true));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      setShouldLoad(true);
    }, { rootMargin: "250px" });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const preferredSourceAttributes = {
    "google-add-preferred-source-btn": "",
    "data-theme": "light",
  };

  return (
    <div className={styles.control} ref={containerRef} {...(shouldLoad ? preferredSourceAttributes : {})}>
      {shouldLoad && (
        <Script
          src="https://news.google.com/swg/js/v1/publisher.js"
          strategy="afterInteractive"
          preferred-sources-control="manual"
          onReady={() => window.PREFERRED_SOURCE?.push((client) => client.init())}
        />
      )}
    </div>
  );
}

export function GooglePreferredSource() {
  const pathname = usePathname();
  if (!shouldShowPreferredSource(pathname)) return null;

  return (
    <aside className={styles.wrap} aria-label="Google Preferred Sources">
      <div className={styles.inner}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>Follow SolarComplaint.com in Google</p>
          <h2>Choose SolarComplaint.com as a Preferred Source.</h2>
          <p>
            Choosing SolarComplaint.com tells Google you want to see more of our reporting. Google can show it more prominently to you in Top Stories and mark it as preferred when relevant in AI Overviews and AI Mode.
          </p>
        </div>
        <div className={styles.action}>
          <GooglePreferredSourceControl />
          <small>Google&apos;s official Preferred Sources control</small>
        </div>
      </div>
    </aside>
  );
}
