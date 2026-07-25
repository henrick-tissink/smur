"use client";

import { useState } from "react";
import { testimonials } from "@/content/home";
import { Arrow } from "@/components/arrow";
import { Reveal } from "@/components/reveal";

/*
  Faithful-fluid Testimonial. Ported from legacy components/testimonial.tsx —
  carousel logic (index/go/modulo-wrap), the keyed Reveal re-reveals, and the
  Arrow prev/next buttons are UNCHANGED. Only the layout math is fluid:

  - Section height was a fixed 426px; now `min-h-[clamp(360px,30vw,426px)]`
    with the row flex-centered, so it never gets shorter than the design at
    narrow widths but doesn't zoom past the Figma height either.
  - Arrows were pinned at a fixed 218px from each edge; now they sit at
    `var(--gutter)` (the shared fluid gutter token, clamps 24px–218px) so
    they track the same margin as the rest of the fluid layout.
  - The quote column was a fixed 702px; now `max-w-[702px] w-full` inside a
    wrapper padded by `var(--gutter)` on both sides, so it can never grow
    wide enough to touch the arrows as the viewport narrows.
*/
export function Testimonial() {
  const [index, setIndex] = useState(0);
  const t = testimonials[index];
  const go = (delta: number) =>
    setIndex((i) => (i + delta + testimonials.length) % testimonials.length);

  return (
    <section
      aria-label="Testimonial"
      data-nav-scheme="dark"
      className="bg-band text-ink flex min-h-[clamp(360px,30vw,426px)] w-full items-center"
    >
      <div className="relative mx-auto flex w-full max-w-[1440px] items-center justify-center">
        <button
          type="button"
          aria-label="Previous testimonial"
          onClick={() => go(-1)}
          className="absolute -translate-y-1/2 text-ink/70 transition-colors hover:text-ink"
          style={{ left: "var(--gutter)", top: "50%" }}
        >
          <Arrow direction="left" size={42} />
        </button>
        <button
          type="button"
          aria-label="Next testimonial"
          onClick={() => go(1)}
          className="absolute -translate-y-1/2 text-ink/70 transition-colors hover:text-ink"
          style={{ right: "var(--gutter)", top: "50%" }}
        >
          <Arrow direction="right" size={42} />
        </button>

        <div
          className="flex w-full justify-center"
          style={{ paddingInline: "var(--gutter)" }}
        >
          <div className="flex w-full max-w-[702px] flex-col items-center gap-[30px] text-center">
            <Reveal key={`q-${index}`}>
              <p className="text-[17px] leading-[1.45] text-ink whitespace-pre-line">
                {t.quote}
              </p>
            </Reveal>
            <Reveal key={`a-${index}`} delay={0.06}>
              <p className="font-sans text-[20px] italic leading-normal text-ink">
                {t.attribution}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
