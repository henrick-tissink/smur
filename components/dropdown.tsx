"use client";

import { useId, useState } from "react";
import { Chevron } from "./chevron";

/*
  DROP DOWN component (Figma 426/431 wide).
  Label: DM Sans Italic 28.454px uppercase #a98a8a (Figma DROP DOWN instance
  183:1367 — the placed instance is scaled up from the 20px H3 base).
  Toggle: chevron (⌄, dropdown-chevron.svg) in accent #a98a8a, points down when
  collapsed and rotates 180° up on expand. Figma uses a chevron here (Vector
  183:1371, 18×9), NOT the full SMUR arrow.
*/
export function Dropdown({ label }: { label: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <div className="border-b-[2.113px] border-ink/30">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-4 text-left text-ink"
      >
        <span className="font-sans text-[28.454px] italic uppercase leading-none text-accent">
          {label}
        </span>
        <Chevron open={open} color="var(--color-accent)" />
      </button>
    </div>
  );
}
