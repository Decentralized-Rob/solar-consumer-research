"use client";

import { useEffect, useRef, useState } from "react";

type TurnstileApi = {
  render: (container: HTMLElement, options: {
    sitekey: string;
    callback: (token: string) => void;
    "expired-callback": () => void;
    "error-callback": () => void;
    theme: "light" | "dark";
  }) => string;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

const SCRIPT_ID = "cloudflare-turnstile-script";

export function TurnstileWidget({
  siteKey,
  onToken,
  resetKey,
}: {
  siteKey: string;
  onToken: (token: string) => void;
  resetKey: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (shouldLoad || !containerRef.current) return;

    const container = containerRef.current;
    const form = container.closest("form");
    const activate = () => setShouldLoad(true);
    if (typeof IntersectionObserver === "undefined" || form?.contains(document.activeElement)) {
      activate();
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) activate();
    }, { rootMargin: "250px" });
    observer.observe(form ?? container);
    form?.addEventListener("focusin", activate);
    return () => {
      observer.disconnect();
      form?.removeEventListener("focusin", activate);
    };
  }, [shouldLoad]);

  useEffect(() => {
    if (!shouldLoad) return;

    let widgetId: string | null = null;
    let cancelled = false;

    const render = () => {
      if (cancelled || !containerRef.current || !window.turnstile) return;
      containerRef.current.replaceChildren();
      widgetId = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        callback: onToken,
        "expired-callback": () => onToken(""),
        "error-callback": () => onToken(""),
        theme: "light",
      });
    };

    let script = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (window.turnstile) {
      render();
    } else {
      if (!script) {
        script = document.createElement("script");
        script.id = SCRIPT_ID;
        script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
        script.async = true;
      }
      script.addEventListener("load", render, { once: true });
      if (!script.isConnected) document.head.appendChild(script);
    }

    return () => {
      cancelled = true;
      script?.removeEventListener("load", render);
      if (widgetId && window.turnstile) window.turnstile.remove(widgetId);
    };
  }, [onToken, resetKey, shouldLoad, siteKey]);

  return <div className="turnstile-widget" ref={containerRef} />;
}
