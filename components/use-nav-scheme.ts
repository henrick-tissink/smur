"use client";

import { useLayoutEffect, useEffect, useState } from "react";

export type NavInfo = {
  /** "light" = nav uses cream content (over dark sections), "dark" = dark content (over light sections). */
  scheme: "light" | "dark";
  /** Solid background color matching the section behind the nav. */
  bg: string;
};

/*
  Detects which section is currently behind the nav and returns:
  - scheme: "light" or "dark" for the appropriate text/icon color
  - bg: the section's computed background color, so the nav can paint the
    same color and "merge" into the section while hiding any scroll-through
    text underneath it.

  Each section declares `data-nav-scheme="light|dark"`. Its background color
  is read directly from getComputedStyle. If a section has no explicit bg
  (e.g. service cards inherit the page color), we fall back to the page cream.

  We use `useLayoutEffect` so the initial detection runs BEFORE the browser
  paints — eliminates the cream→beige flash that the user could see as a
  "header movement" when starting to scroll right after page load.
*/
const PAGE_BG = "#f5f1ec";

// In SSR (no `window`), useLayoutEffect logs a warning. Fall back to useEffect
// for the server pass; the client always uses useLayoutEffect.
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function useNavInfo(): NavInfo {
  const [info, setInfo] = useState<NavInfo>({ scheme: "light", bg: PAGE_BG });

  useIsoLayoutEffect(() => {
    let raf = 0;
    const probeY = 30;

    const update = () => {
      const stack = document.elementsFromPoint(window.innerWidth / 2, probeY);
      for (const el of stack) {
        let cursor: Element | null = el;
        while (cursor) {
          const ds = cursor.getAttribute("data-nav-scheme");
          if (ds === "light" || ds === "dark") {
            const cs = window.getComputedStyle(cursor);
            const raw = cs.backgroundColor;
            const isTransparent =
              !raw || raw === "rgba(0, 0, 0, 0)" || raw === "transparent";
            const nextBg = isTransparent ? PAGE_BG : raw;
            setInfo((prev) =>
              prev.scheme === ds && prev.bg === nextBg
                ? prev
                : { scheme: ds, bg: nextBg },
            );
            return;
          }
          cursor = cursor.parentElement;
        }
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return info;
}
