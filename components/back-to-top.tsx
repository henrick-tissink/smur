"use client";

import { BouncingArrow } from "./bouncing-arrow";

/*
  Branded "back to top" footer shown at the end of every case-study page
  (June 2026 client request). Smooth-scrolls to the top of the document.
  Rendered by app/work/layout.tsx on /work/* project routes only (not the
  /work index). The cream band matches the case-study frame bg (#fff7f4) so
  it reads as the page's natural footer, and the up-arrow + italic label
  follow the same cue style as the "my work :)" / "thanks :)" marks.
*/
export function BackToTop() {
  return (
    <div
      data-nav-scheme="dark"
      style={{ backgroundColor: "#fff7f4" }}
    >
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="mx-auto flex w-full flex-col items-center gap-[10px] py-[60px] text-accent transition-opacity hover:opacity-70"
        aria-label="Back to top"
      >
        <BouncingArrow direction="up" size={40} />
        <span className="font-sans text-[20px] italic lowercase">
          back to top
        </span>
      </button>
    </div>
  );
}
