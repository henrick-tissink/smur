"use client";

import { useId, useState } from "react";

/*
  Mobile dropdown (Component 4 268:34474): 307 × 79.
  Two rows (DETAILS, TIMELINE), each:
    - 25px DM Sans Italic uppercase, color #a98a8a
    - Right: chevron SVG (18 × 9)
    - Border-bottom: 1px solid #a98a8a
*/
export function MobileDropdown({ label }: { label: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className="border-b border-accent">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-3 text-left"
      >
        <span className="font-sans text-[25px] italic uppercase text-accent">
          {label}
        </span>
        <span
          aria-hidden
          className={`text-base text-accent transition-transform duration-300 ${
            open ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>
    </div>
  );
}
