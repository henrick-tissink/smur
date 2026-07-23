"use client";

import { useEffect, useState } from "react";

/*
  Cookie-consent banner, paired with the Consent Mode v2 setup in
  components/analytics.tsx (which defaults analytics_storage to "denied").

  - No prior choice  → show the banner; GA stays cookieless until a choice.
  - Accept           → gtag consent update → analytics_storage "granted"
                       (GA starts using cookies / full-fidelity data).
  - Decline          → stays "denied" (cookieless); choice remembered.
  - Returning visitor who accepted → re-grant on load, no banner shown.

  The site runs no ads/remarketing, so only analytics_storage is toggled.
  Choice persists in localStorage, so the bar never nags on repeat visits.
*/

const STORAGE_KEY = "smur-consent";
type Consent = "granted" | "denied";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Push a Consent Mode update. Prefers the gtag() GA defines; falls back to a
 *  direct dataLayer push if the banner acts before the GA script has run. */
function applyConsent(value: Consent) {
  if (typeof window === "undefined") return;
  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", { analytics_storage: value });
    return;
  }
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(["consent", "update", { analytics_storage: value }]);
}

function readChoice(): Consent | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const prior = readChoice();
    if (prior === "granted") {
      applyConsent("granted"); // returning accepter — re-grant, no banner
    } else if (prior === null) {
      setVisible(true); // undecided — ask (default stays denied)
    }
    // prior === "denied": leave denied, no banner.
  }, []);

  if (!visible) return null;

  function choose(value: Consent) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* private mode / storage blocked — still apply for this session */
    }
    applyConsent(value);
    setVisible(false);
  }

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-[70] px-4 pb-4"
    >
      <div
        className="mx-auto flex max-w-[1000px] flex-col gap-3 rounded-[14px] border px-5 py-4 shadow-lg sm:flex-row sm:items-center sm:justify-between"
        style={{
          backgroundColor: "var(--color-page, #fff7f4)",
          color: "var(--color-ink, #35221a)",
          borderColor: "rgba(53,34,26,0.12)",
          fontFamily: "var(--font-dm-sans), sans-serif",
        }}
      >
        <p className="text-[13.5px] leading-[1.5]">
          SMUR uses analytics cookies to understand how the site is used and make
          it better. Accept, or decline — either way the site works the same.
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => choose("denied")}
            className="rounded-full px-4 py-2 text-[13px] transition-colors hover:bg-black/5"
            style={{
              border: "1px solid rgba(53,34,26,0.25)",
              color: "var(--color-ink, #35221a)",
            }}
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => choose("granted")}
            className="rounded-full px-4 py-2 text-[13px] transition-opacity hover:opacity-90"
            style={{ backgroundColor: "var(--color-accent, #a98a8a)", color: "#fff" }}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
