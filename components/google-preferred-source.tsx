"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import styles from "./google-preferred-source.module.css";

const exactPaths = new Set([
  "/companies/sunrun",
  "/companies/sunrun/ethics-compliance",
  "/cases/titan-solar-power",
  "/updates",
]);

function shouldShowPreferredSource(pathname: string) {
  if (exactPaths.has(pathname)) return true;

  // The Freedom Forever hub already has its own embedded Google control.
  // Show the shared component on its published story pages instead.
  return pathname.startsWith("/cases/freedom-forever/");
}

export function GooglePreferredSource() {
  const pathname = usePathname();
  const shouldShow = shouldShowPreferredSource(pathname);

  const preferredSourceAttributes = {
    "google-add-preferred-source-btn": "",
    "data-theme": "light",
    "data-lang": "en",
  };

  return (
    <>
      <Script src="https://news.google.com/swg/js/v1/publisher.js" strategy="afterInteractive" />
      <aside className={styles.wrap} aria-label="Google Preferred Sources" hidden={!shouldShow}>
        <div className={styles.inner}>
          <div className={styles.copy}>
            <p className={styles.eyebrow}>Follow SolarComplaint.com in Google</p>
            <h2>Add SolarComplaint.com as a Preferred Source.</h2>
            <p>
              See more of our reporting in Google Top Stories and have it highlighted when relevant in AI Overviews and AI Mode.
            </p>
          </div>
          <div className={styles.action}>
            <div {...preferredSourceAttributes} />
            <small>Google&apos;s official Preferred Sources control</small>
          </div>
        </div>
      </aside>
    </>
  );
}
