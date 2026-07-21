"use client";

import { useState } from "react";
import { testimonials } from "@/content/home";
import { Arrow } from "@/components/arrow";
import { Reveal } from "@/components/reveal";

/*
  Faithful-fluid MobileTestimonial. Ported from legacy
  components/mobile/testimonial.tsx — carousel logic (index/go/modulo-wrap),
  the keyed Reveal re-reveals (quote/attribution keyed by index, same
  delays), and the Arrow prev/next buttons are UNCHANGED. Only the layout
  math is fluid:

  - Stage = `mx-auto w-full max-w-[393px]` container-query box (like
    MobileHero/MobileServiceSection), `containerType: inline-size`. No fixed
    aspect-ratio (nothing here needs to grow like the service accordion), so
    minHeight itself converts to `cqw` too — this keeps the carousel's
    proportions matched to the Figma 393×522 composition at any viewport
    width instead of only scaling its internal spacing.
  - The legacy's fixed 522px minHeight, 42px inline padding, 40/20/90px
    paddings, and 30px quote→attribution gap all convert to `cqw` (percent
    of the 393 stage width) via the shared `cqw()` helper (same convention
    as MobileServiceSection / MobileServicesListSection).
  - Quote (15px) and attribution (20px) font sizes convert to `cqw` too.
  - The flex/flow structure itself is unchanged: outer flex-col stage,
    flex-1 centered quote block, `justify-between` arrow row pinned at the
    bottom via padding — exactly as legacy, just fluid units.
  - Arrow icon size stays a literal `size={40}` (matching the desktop
    Testimonial precedent in components/sections/testimonial.tsx, which
    also keeps the Arrow's rendered px size fixed and only fluid-positions
    the surrounding layout) — only the button hit-area box converts to cqw.
*/

/** Native mobile testimonial stage the px values below were measured against. */
const STAGE_W = 393;

/** Converts a px length on the STAGE_W stage to a `cqw` (percent-of-
 *  container-inline-size) length string. */
function cqw(px: number) {
  return `${(px / STAGE_W) * 100}cqw`;
}

export function MobileTestimonial() {
  const [index, setIndex] = useState(0);
  const t = testimonials[index];
  const go = (delta: number) =>
    setIndex((i) => (i + delta + testimonials.length) % testimonials.length);

  return (
    <section
      aria-label="Testimonial"
      data-nav-scheme="dark"
      className="w-full bg-band text-ink"
    >
      <div
        data-testimonial-stage
        className="relative mx-auto flex w-full max-w-[393px] flex-col"
        style={{ containerType: "inline-size", minHeight: cqw(522) }}
      >
        {/* Quote + attribution center in the flexible space above the arrows */}
        <div
          className="flex flex-1 flex-col items-center justify-center text-center"
          style={{
            paddingInline: cqw(42),
            paddingTop: cqw(40),
            paddingBottom: cqw(20),
          }}
        >
          <Reveal key={`q-${index}`}>
            <p
              className="whitespace-pre-line text-ink"
              style={{ fontSize: cqw(15), lineHeight: 1.33 }}
            >
              {t.quote}
            </p>
          </Reveal>
          <Reveal key={`a-${index}`} delay={0.06}>
            <p
              className="font-sans italic text-ink"
              style={{ marginTop: cqw(30), fontSize: cqw(20), lineHeight: "normal" }}
            >
              {t.attribution}
            </p>
          </Reveal>
        </div>

        {/* Arrows pinned at the bottom corners */}
        <div
          className="flex items-center justify-between"
          style={{ paddingInline: cqw(42), paddingBottom: cqw(90) }}
        >
          <button
            type="button"
            aria-label="Previous testimonial"
            onClick={() => go(-1)}
            className="flex items-center justify-center text-ink/70 transition-colors hover:text-ink"
            style={{ width: cqw(40.296), height: cqw(14.082) }}
          >
            <Arrow direction="left" size={40} />
          </button>
          <button
            type="button"
            aria-label="Next testimonial"
            onClick={() => go(1)}
            className="flex items-center justify-center text-ink/70 transition-colors hover:text-ink"
            style={{ width: cqw(40.296), height: cqw(14.082) }}
          >
            <Arrow direction="right" size={40} />
          </button>
        </div>
      </div>
    </section>
  );
}
