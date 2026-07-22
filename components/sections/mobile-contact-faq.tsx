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
  Faithful-fluid mobile ContactFAQ. Ported from the FAQ() block (+ inline
  MobileFAQRow accordion + BouncingUnionArrow) in legacy
  components/mobile/contact-page.tsx (Figma mobile 282:39442, brown FAQ
  section, bg #906553).

  Like the desktop ContactFAQ, the legacy mobile FAQ was ALREADY a flow
  section (fixed margins, not absolute tops) — the accordion grows the
  section's natural height when a row expands, so there is no Figma
  absolute-position math to convert. This is a straight flow-section port,
  following the MobileContactForm shell pattern:
    - section bg: `var(--color-about)` (warm brown) instead of the legacy
      literal `#906553`.
    - inner container: `mx-auto max-w-[393px]` with `var(--gutter)`
      horizontal padding + `var(--space-section)` vertical padding, replacing
      the legacy fixed `pt-[72px] pb-[43px]` + `minHeight: 871`.

  The legacy composition used fixed left-margins/widths inside the 393
  canvas (accordion at marginLeft:44 width:307; collage row at
  paddingLeft:43). Per the brief, those fixed offsets are translated into a
  fluid, sensibly-aligned stack:
    - eyebrow/title: centered text column (unchanged from legacy's
      centering).
    - accordion: centered, max-w-[307px] mx-auto (legacy's 44+307+42=393,
      i.e. already roughly centered).
    - collage row: "my work :)" arrow+label on the LEFT + the 2×2 pinwheel
      grid on the right, same visual relationship as legacy, using percent-
      based flex instead of fixed px so it holds up at any mobile width.
    - socials: centered.

  Animations preserved EXACTLY:
    - MobileFAQRow: useState(open) toggle, answer panel
      `overflow-hidden transition-[max-height,opacity] duration-500 ease-out`
      (max-h-[600px] opacity-100 open / max-h-0 opacity-0 closed),
      `whitespace-pre-line` answer text, `<Chevron open width={16}>`, 15px
      question / 14px answer text (legacy mobile sizes, kept fixed-px per
      the form-text rule — NOT cqw).
    - BouncingUnionArrow: motion.span x:[0,8,0] duration **1.4s** repeat
      Infinity easeInOut (reduced-motion → x:0, duration 0) — mobile's
      timing differs from desktop's 1.0s, preserved verbatim. cta-union.svg
      CSS mask recolored via currentColor, mobile size 32×10.88.
    - Work collage: single `<Link href="/work">` wrapping the 2×2 pinwheel
      (crisp square | interstellar wide / kokop wide | taf square), matching
      the legacy exactly — the mobile collage is ONE link to /work, not
      per-thumb case-study links (unlike `contactFAQ.workThumbs[i].href`,
      which is unused here, same as legacy). `hover:scale-[1.01]
      transition-transform duration-500`.

  Reveal delays (UNCHANGED from legacy): eyebrow 0, title 0.06.
*/
export function MobileContactFAQ() {
  return (
    <section
      data-nav-scheme="light"
      className="relative w-full"
      style={{ backgroundColor: "var(--color-about)" }}
    >
      <div
        className="mx-auto flex w-full max-w-[393px] flex-col items-center"
        style={{
          paddingLeft: "var(--gutter)",
          paddingRight: "var(--gutter)",
          paddingTop: "var(--space-section)",
          paddingBottom: "var(--space-section)",
        }}
      >
        {/* Eyebrow + "Questions" SVG title — centered column */}
        <div className="flex w-full flex-col items-center text-center text-cream">
          <Reveal>
            <p className="font-sans italic" style={{ fontSize: 15 }}>
              {contactFAQ.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="mt-[16px] text-cream">
              <TitleMask
                src="/figma-assets/titles/questions.svg"
                width={223.6}
                height={56}
                alt={contactFAQ.heading}
                as={2}
              />
            </div>
          </Reveal>
        </div>

        {/* FAQ accordion — centered, legacy width 307 */}
        <div className="mt-[17px] w-full max-w-[307px]">
          {contactFAQItems.map((item) => (
            <MobileFAQRow
              key={item.question}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>

        {/* "my work :)" arrow+label on the left + the 2×2 pinwheel collage on
            the right — same relationship as legacy, fluid width. */}
        <div className="mt-[72px] flex w-full items-center">
          <Link
            href="/work"
            className="flex shrink-0 flex-col text-cream"
            style={{ width: 108 }}
          >
            <BouncingUnionArrow />
            <span className="mt-[10px] italic" style={{ fontSize: 15.105 }}>
              {contactFAQ.myWorkLink}
            </span>
          </Link>

          {/* Pinwheel collage: top-left + bottom-right squares, top-right +
              bottom-left wide tiles, offset row dividers. No gaps. */}
          <Link
            href="/work"
            aria-label="See all my work"
            className="flex flex-1 flex-col transition-transform duration-500 hover:scale-[1.01]"
          >
            {/* Row 1 — CRISP (square) | INTERSTELLAR (wide) */}
            <div className="flex" style={{ height: 120 }}>
              <span
                className="relative block overflow-hidden"
                style={{ flex: "0 0 108px" }}
              >
                <Image
                  src={contactFAQ.workThumbs[0].src}
                  alt=""
                  fill
                  unoptimized
                  sizes="105px"
                  className="object-cover"
                />
              </span>
              <span className="relative block flex-1 overflow-hidden">
                <Image
                  src={contactFAQ.workThumbs[1].src}
                  alt=""
                  fill
                  unoptimized
                  sizes="137px"
                  className="object-cover"
                />
              </span>
            </div>
            {/* Row 2 — KOKO.P (wide) | TAF (square) */}
            <div className="flex" style={{ height: 120 }}>
              <span className="relative block flex-1 overflow-hidden">
                <Image
                  src={contactFAQ.workThumbs[2].src}
                  alt=""
                  fill
                  unoptimized
                  sizes="137px"
                  className="object-cover"
                />
              </span>
              <span
                className="relative block overflow-hidden"
                style={{ flex: "0 0 108px" }}
              >
                <Image
                  src={contactFAQ.workThumbs[3].src}
                  alt=""
                  fill
                  unoptimized
                  sizes="105px"
                  className="object-cover"
                />
              </span>
            </div>
          </Link>
        </div>

        {/* INSTAGRAM / PINTEREST — centered */}
        <p
          className="mt-[115px] w-full text-center italic text-cream"
          style={{ fontSize: 15 }}
        >
          <a
            href={contactFAQ.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-70"
          >
            INSTAGRAM
          </a>
          {"   /   "}
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

function MobileFAQRow({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b-[2.113px] border-cream/40">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-[14px] text-left text-cream"
      >
        <span
          className="font-sans uppercase italic"
          style={{ fontSize: 25, lineHeight: 1.21 }}
        >
          {question}
        </span>
        <Chevron open={open} width={16} className="text-cream" />
      </button>
      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-500 ease-out ${
          open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p
          className="whitespace-pre-line pb-[16px] pr-[20px] text-cream/90"
          style={{ fontSize: 14, lineHeight: 1.55 }}
        >
          {answer}
        </p>
      </div>
    </div>
  );
}

/*
  Bouncing right-pointing variant of the CTA Union arrow — used on the FAQ
  "my work :)" link so it mirrors the desktop bouncing arrow. Mobile size is
  32 × 10.88 (Figma). Mobile's bounce cycle is 1.4s — SLOWER than desktop's
  1.0s, preserved verbatim from legacy. Honors `prefers-reduced-motion`.
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
          : { duration: 1.4, repeat: Infinity, ease: "easeInOut" }
      }
      className="block shrink-0"
      style={{
        width: "32px",
        height: "10.88px",
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
