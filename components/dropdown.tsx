"use client";

import { useId, useState } from "react";
import { Arrow } from "./arrow";

/*
  DROP DOWN component (Figma 426/431 wide).
  Label: DM Sans Italic 28.454px uppercase #a98a8a (Figma DROP DOWN instance
  183:1367 — the placed instance is scaled up from the 20px H3 base).
  Arrow: exported SMUR arrow asset, points down when collapsed, rotates to
  up on expand.
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
        <Arrow direction={open ? "up" : "down"} size={22} />
      </button>
    </div>
  );
}
