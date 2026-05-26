"use client";

import { useState } from "react";
import { testimonials } from "@/content/home";
import { Arrow } from "./arrow";
import { Reveal } from "./reveal";

/*
  Frame 31 (1:838): bg-[#bbc2b5] (sage), 1440 × 426
  Frame 45 (18:72) wrapper: x=361.27 width=702 top=103
  Quote (18:68): 17px DM Sans Regular, text-[#35221a]
  Attribution (18:69): 20px DM Sans Italic, text-[#35221a]

  Now a real carousel — prev/next arrows cycle through the testimonials
  pulled from "Written content.pdf" (May 2026). The third testimonial
  (David Damrosch, Harvard IWL) is pending and will land later.
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
      className="bg-band text-ink"
      style={{ height: "426px" }}
    >
      <div className="relative mx-auto flex h-full max-w-[1440px] items-center justify-center">
        <button
          type="button"
          aria-label="Previous testimonial"
          onClick={() => go(-1)}
          className="absolute -translate-y-1/2 text-ink/70 transition-colors hover:text-ink"
          style={{ left: "218px", top: "50%" }}
        >
          <Arrow direction="left" size={42} />
        </button>
        <button
          type="button"
          aria-label="Next testimonial"
          onClick={() => go(1)}
          className="absolute -translate-y-1/2 text-ink/70 transition-colors hover:text-ink"
          style={{ right: "218px", top: "50%" }}
        >
          <Arrow direction="right" size={42} />
        </button>

        <div
          className="flex w-[702px] flex-col items-center gap-[30px] text-center"
        >
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
    </section>
  );
}
