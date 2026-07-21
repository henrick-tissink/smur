"use client";

import { useId, useState } from "react";
import { Chevron } from "@/components/chevron";

/*
  Faithful-fluid MobileServiceAccordion — ported from
  components/mobile/dropdown.tsx (Component 4 268:34474): 307 × 79.

  Two rows (DETAILS, TIMELINE), each:
    - 25px DM Sans Italic uppercase, color #a98a8a
    - Right: chevron SVG (18 × 9)
    - Border-bottom: 2.113px solid #a98a8a

  Font sizes here are already small/fixed in the legacy (no stage-relative
  unit was used) — kept byte-identical, including the max-height expand
  animation and chevron rotation.
*/
export function MobileServiceAccordion({
  label,
  body,
}: {
  label: string;
  body?: string;
}) {
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
      {body && (() => {
        // Figma styling: intro paragraph DM Sans Regular, then italic list.
        const [intro, ...rest] = body.split("\n\n");
        const list = rest.join("\n\n");
        return (
          <div
            id={id}
            className={`overflow-hidden transition-[max-height,opacity] duration-500 ease-out ${
              open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="pb-[16px] text-[15px] leading-[1.33] text-accent">
              <p>{intro}</p>
              {list && (
                <p className="mt-[1em] whitespace-pre-line italic">{list}</p>
              )}
            </div>
          </div>
        );
      })()}
    </div>
  );
}
