"use client";

import { useId, useState } from "react";
import { Chevron } from "../chevron";

/*
  Mobile dropdown (Component 4 268:34474): 307 × 79.
  Two rows (DETAILS, TIMELINE), each:
    - 25px DM Sans Italic uppercase, color #a98a8a
    - Right: chevron SVG (18 × 9)
    - Border-bottom: 2.113px solid #a98a8a
*/
export function MobileDropdown({ label }: { label: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className="border-b-[2.113px] border-accent">
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
        <Chevron open={open} color="var(--color-accent)" />
      </button>
    </div>
  );
}
