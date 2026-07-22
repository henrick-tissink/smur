"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { contactFAQ, contactFAQItems } from "@/content/contact";
import { Chevron } from "@/components/chevron";
import { Reveal } from "@/components/reveal";
import { TitleMask } from "@/components/title-mask";

/*
  Faithful-fluid desktop ContactFAQ. Ported from the ContactFAQ() block (+
  inline FAQRow accordion + BouncingUnionArrow) in legacy
  components/contact/page.tsx (Figma 193:1383, brown FAQ section y=2039
  h=1054, bg #906553).

  Unlike ContactHero (an aspect-ratio "stage"), the legacy FAQ was ALREADY a
  flow section — the accordion grows the section's natural height when a row
  expands, so there is no Figma absolute-position math to convert. This is a
  straight flow-section port, following the ContactForm/ServicesListSection
  shell pattern:
    - section bg: `var(--color-about)` (warm brown) instead of the legacy
      literal `#906553`.
    - inner container: `mx-auto max-w-[1440px]` with `var(--gutter)`
      horizontal padding + `var(--space-section)` vertical padding, replacing
      the legacy fixed `width:1440` box with `pt-[158px] pb-[122px]`.

  The legacy composition used fixed left-margins inside the 1440 canvas
  (eyebrow+title centered at marginLeft:578 w:284; accordion centered at
  marginLeft:394 w:652; image strip offset at marginLeft:392 w:1046 with the
  "my work" link at left:186 relative to that same wrapper). Per the brief,
  those fixed margins are translated into a fluid, sensibly-aligned stack
  rather than reproduced pixel-for-pixel:
    - eyebrow/title: centered text column, max-w-[284px] mx-auto (unchanged
      from legacy's effective centering: 578 = (1440-284)/2).
    - accordion: centered, max-w-[652px] mx-auto (legacy's 394 also
      centers: 394 = (1440-652)/2).
    - collage row: "my work :)" link + the 4-image /work strip, side by side
      on md+ (stacked on narrow viewports), centered as a unit — same visual
      relationship (link to the left of the strip) without the fixed-px
      offsets.
    - socials: centered, max-w-[360px] mx-auto.

  Animations preserved EXACTLY:
    - FAQRow: useState(open) toggle, answer panel
      `overflow-hidden transition-[max-height,opacity] duration-500 ease-out`
      (max-h-[600px] opacity-100 open / max-h-0 opacity-0 closed),
      `whitespace-pre-line` answer text, `<Chevron open width={22}>`.
    - BouncingUnionArrow: motion.span x:[0,8,0] duration 1.0s repeat Infinity
      easeInOut (reduced-motion → x:0, duration 0), cta-union.svg CSS mask
      recolored via currentColor, 41.503×14.11.
    - Work collage: single `<Link href="/work">` wrapping the 4
      `contactFAQ.workThumbs`, `hover:scale-[1.01] transition-transform
      duration-500`.

  Reveal delays (UNCHANGED from legacy): eyebrow 0, title 0.06.
*/
export function ContactFAQ() {
  return (
    <section
      data-nav-scheme="light"
      className="relative w-full"
      style={{ backgroundColor: "var(--color-about)" }}
    >
      <div
        className="mx-auto max-w-[1440px]"
        style={{
          paddingLeft: "var(--gutter)",
          paddingRight: "var(--gutter)",
          paddingTop: "var(--space-section)",
          paddingBottom: "var(--space-section)",
        }}
      >
        {/* Eyebrow + "Questions" SVG title — centered column */}
        <div className="mx-auto flex max-w-[284px] flex-col items-center text-center text-cream">
          <Reveal>
            <p className="font-sans italic" style={{ fontSize: 20 }}>
              {contactFAQ.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="mt-[30px] text-cream">
              <TitleMask
                src="/figma-assets/titles/questions.svg"
                width={288.19}
                height={72.21}
                alt={contactFAQ.heading}
                as={2}
              />
            </div>
          </Reveal>
        </div>

        {/* FAQ accordion — centered, legacy width 652 */}
        <div className="mx-auto mt-[clamp(32px,4vw,60px)] w-full max-w-[652px]">
          {contactFAQItems.map((item) => (
            <FAQRow key={item.question} question={item.question} answer={item.answer} />
          ))}
        </div>

        {/* "my work :)" link + the 4-image /work strip — side by side, */}
        {/* centered as a unit (stacks on narrow viewports). */}
        <div className="mt-[clamp(56px,8vw,117px)] flex flex-col items-center gap-[32px] md:flex-row md:justify-center md:gap-[40px]">
          <Link
            href="/work"
            className="group flex flex-col items-center text-cream"
          >
            <BouncingUnionArrow />
            <span className="mt-[8px] text-[20px] italic">
              {contactFAQ.myWorkLink}
            </span>
          </Link>

          <Link
            href="/work"
            aria-label="See all my work"
            className="group flex w-full max-w-[1046px] overflow-hidden transition-transform duration-500 hover:scale-[1.01]"
            style={{ aspectRatio: "1046 / 252" }}
          >
            {contactFAQ.workThumbs.map((thumb) => (
              <div key={thumb.src} className="relative flex-1 overflow-hidden">
                <Image
                  src={thumb.src}
                  alt=""
                  fill
                  unoptimized
                  sizes="252px"
                  className="object-cover"
                />
              </div>
            ))}
          </Link>
        </div>

        {/* INSTAGRAM / PINTEREST — centered, legacy width 360 */}
        <p
          className="mx-auto mt-[53px] max-w-[360px] text-center italic text-cream"
          style={{ fontSize: 20 }}
        >
          <a
            href={contactFAQ.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-70"
          >
            INSTAGRAM
          </a>
          {"   /   "}
          <a
            href={contactFAQ.pinterestUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-70"
          >
            PINTEREST
          </a>
        </p>
      </div>
    </section>
  );
}

function FAQRow({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b-[2.113px] border-cream/40">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-[18px] text-left text-cream"
      >
        <span
          className="font-sans uppercase italic"
          style={{ fontSize: 28.454, lineHeight: 1.15 }}
        >
          {question}
        </span>
        <span aria-hidden className="text-cream shrink-0 pl-4">
          <Chevron open={open} width={22} />
        </span>
      </button>
      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-500 ease-out ${
          open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p
          className="whitespace-pre-line pb-[24px] pr-[40px] text-cream/90"
          style={{ fontSize: 15, lineHeight: 1.55 }}
        >
          {answer}
        </p>
      </div>
    </div>
  );
}

/*
  Bouncing right-pointing variant of the CTA Union arrow — used on the FAQ
  "my work :)" link so the arrow matches the CTA buttons (same long horizontal
  Union SVG, recolored via CSS mask to follow currentColor). Bounces rightward
  in a calm 1.0s cycle. Honors `prefers-reduced-motion`.
*/
function BouncingUnionArrow() {
  const reduced = useReducedMotion();
  return (
    <motion.span
      aria-hidden
      animate={reduced ? { x: 0 } : { x: [0, 8, 0] }}
      transition={
        reduced
          ? { duration: 0 }
          : { duration: 1.0, repeat: Infinity, ease: "easeInOut" }
      }
      className="block shrink-0"
      style={{
        width: "41.503px",
        height: "14.11px",
        WebkitMaskImage: "url(/figma-assets/arrows/cta-union.svg)",
        maskImage: "url(/figma-assets/arrows/cta-union.svg)",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskSize: "100% 100%",
        maskSize: "100% 100%",
        backgroundColor: "currentColor",
      }}
    />
  );
}
