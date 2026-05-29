"use client";

import { useState } from "react";
import { testimonials } from "@/content/home";
import { Arrow } from "../arrow";
import { Reveal } from "../reveal";

/*
  Mobile testimonial (Frame 90 268:34805): bg #bbc2b5 (sage), 393 × 522.
  Content (Group 79) at left=42 top=90, 308 wide:
    - Quote: 15px DM Sans Regular, leading 1.33, text-[#35221a] center
    - Attribution: 20px DM Sans Italic, text-[#35221a] center, ~top 312
    - Nav arrows (Isolation_Mode, 40.296 × 14.082) at top 417.92:
        prev at left≈154.3 (rotate-180 of the asset → points left),
        next at left≈236.97 (native → points right).
      Same horizontal thin-line+chevron family as the SMUR Arrow, so we
      reuse <Arrow direction> (matches desktop testimonial too).

  Now a real carousel — prev/next cycle the testimonials pulled from
  "Written content.pdf" (May 2026), mirroring the desktop component.
  Laid out in flow (not fixed `top`s) with a `min-height` so the longer
  quotes push the attribution + arrows down instead of overlapping them
  (same flow-layout fix used on the contact FAQ).
*/
export function MobileTestimonial() {
  const [index, setIndex] = useState(0);
  const t = testimonials[index];
  const go = (delta: number) =>
    setIndex((i) => (i + delta + testimonials.length) % testimonials.length);

  return (
    <section
      aria-label="Testimonial"
      data-nav-scheme="dark"
      className="bg-band text-ink"
      style={{ minHeight: "522px" }}
    >
      <div className="mx-auto flex w-full max-w-[393px] flex-col items-center px-[42px] pt-[90px] pb-[80px] text-center">
        <Reveal key={`q-${index}`}>
          <p
            className="whitespace-pre-line text-ink"
            style={{ fontSize: "15px", lineHeight: 1.33 }}
          >
            {t.quote}
          </p>
        </Reveal>
        <Reveal key={`a-${index}`} delay={0.06}>
          <p
            className="mt-[30px] font-sans italic text-ink"
            style={{ fontSize: "20px", lineHeight: "normal" }}
          >
            {t.attribution}
          </p>
        </Reveal>

        <div className="mt-[48px] flex items-center justify-center gap-[42px]">
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={() => go(-1)}
            className="flex items-center justify-center text-ink/70 transition-colors hover:text-ink"
            style={{ width: "40.296px", height: "14.082px" }}
          >
            <Arrow direction="left" size={40} />
          </button>
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={() => go(1)}
            className="flex items-center justify-center text-ink/70 transition-colors hover:text-ink"
            style={{ width: "40.296px", height: "14.082px" }}
          >
            <Arrow direction="right" size={40} />
          </button>
        </div>
      </div>
    </section>
  );
}
