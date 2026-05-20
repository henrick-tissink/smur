"use client";

import { useId, useState } from "react";

/*
  Figma DROP DOWN component: 426/431 wide × ~98 tall.
  Renders as a row with label on the left and chevron on the right,
  border-bottom underline; expands on click.
*/
export function Dropdown({ label }: { label: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <div className="border-b border-ink/30">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-4 text-left"
      >
        <span className="font-sans text-[15px] uppercase tracking-[0.08em] text-ink">
          {label}
        </span>
        <span
          aria-hidden
          className={`text-base transition-transform duration-300 ${
            open ? "rotate-45" : "rotate-0"
          }`}
        >
          +
        </span>
      </button>
    </div>
  );
}
