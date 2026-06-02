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
export function Dropdown({
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
        className="flex w-full items-center justify-between py-4 text-left text-ink"
      >
        <span className="font-sans text-[28.454px] italic uppercase leading-none text-accent">
          {label}
        </span>
        <Chevron open={open} color="var(--color-accent)" />
      </button>
      {body && (() => {
        // Figma splits the body into a Regular intro paragraph + an Italic list
        // (Brand identity 183:1391 / Variant3 + Naming 297:56985 / Variant3).
        // We store the body as one string with `\n\n` between intro and list.
        const [intro, ...rest] = body.split("\n\n");
        const list = rest.join("\n\n");
        return (
          <div
            id={id}
            className={`overflow-hidden transition-[max-height,opacity] duration-500 ease-out ${
              open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="pb-[20px] text-[17px] leading-[1.33] text-accent">
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
