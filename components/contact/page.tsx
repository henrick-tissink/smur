"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useState } from "react";
import {
  contactFAQ,
  contactFAQItems,
  contactForm,
  contactHero,
} from "@/content/contact";
import { BouncingArrow } from "../bouncing-arrow";
import { Chevron } from "../chevron";
import { Reveal } from "../reveal";
import { TitleMask } from "../title-mask";

/*
  Desktop "Let's Work Together" page (Figma 193:1383).
  1440 × 3093. Three stacked sections — `position: relative` parents with
  absolutely positioned children (CLAUDE.md rule #8):
    Hero  (sage #bbc2b5, cream text)   y=0    h=812
    Form  (cream page #f5f1ec, pink)   y=812  h=1227
    Brown (warm brown #906553, cream)  y=2039 h=1054

  May 2026 client feedback applied:
    - section titles use exported SMUR-font SVGs (Tell Me About / Questions)
    - all hero/form/FAQ arrows use the exported SMUR arrow asset
    - form text color = dusty pink (--color-accent) across the whole form
    - FAQ question + form field labels bumped up to a more designed size
    - CTA button uses the new pill style with the SMUR arrow
*/
export function DesktopContactPage() {
  // Sections render full-viewport-width with their own bg, and each wraps its
  // absolute-positioned content in an inner mx-auto 1440 container — same
  // pattern as the home Hero. At viewports > 1440 the sage / cream / brown
  // bands extend edge-to-edge (no cream stripes outside the 1440 design),
  // matching Figma's intent.
  return (
    <>
      <ContactHero />
      <ContactForm />
      <ContactFAQ />
    </>
  );
}

function ContactHero() {
  return (
    // z-10 puts this section's stacking context above the form below — the
    // LAVABO carousel on the right is positioned at top:642 h:249 (bottom 891),
    // 79px past the 812 sage area, per Figma 218:12494. Without z-10 the form
    // section's cream bg paints over that overflow.
    <section
      data-nav-scheme="light"
      className="relative z-10 w-full"
      style={{ height: 812, backgroundColor: "#bbc2b5" }}
    >
      <div className="relative mx-auto" style={{ width: 1440, height: 812 }}>
      {/* Title centered at y=237, w=430 (Figma 207:1420) — rendered from
          the exported "Tell Me About" SVG so we keep the brand typeface. */}
      <div
        className="absolute flex justify-center text-cream"
        style={{ left: 505, top: 237, width: 430 }}
      >
        <Reveal>
          <TitleMask
            src="/figma-assets/titles/tell-me-about.svg"
            width={389.22}
            height={138.04}
            alt={contactHero.title}
            as={1}
          />
        </Reveal>
      </div>

      {/* Body at y=408, w=596 (Figma 207:1419) */}
      <div
        className="absolute text-center text-cream"
        style={{ left: 422, top: 408, width: 596 }}
      >
        <Reveal delay={0.08}>
          <p style={{ fontSize: 17, lineHeight: 1.33 }}>{contactHero.body}</p>
        </Reveal>
      </div>

      {/* LEFT — MANUFAKTURA editorial (Clip path group 218:17739): x=0 y=244
          w=258 h=356. Sourced from EXPORTS SMUR WEBSITE 2/Let_s work/
          _MNFArtboard 76@2x.png (1799×2480, same 0.726 portrait aspect as the
          tile, so object-cover shows the full artboard scaled). Optimized via
          next/image — not a percent-crop, so unoptimized isn't needed. */}
      <Reveal delay={0.12}>
        <div
          className="absolute"
          style={{ left: 0, top: 244, width: 258, height: 356 }}
        >
          <Image
            src="/figma-assets/contact/hero-left.png"
            alt="MANUFAKTURA Studio brand collateral"
            fill
            sizes="258px"
            quality={90}
            preload
            className="object-cover"
          />
        </div>
      </Reveal>

      {/* RIGHT — LAVABO editorial carousel (Component 6 218:12494): x=1066
          y=642 w=374 h=249. Frame bottom (891) is 79px past the sage area —
          straddles hero/form per Figma. Cycles through three lavabo artboards
          (sink editorial, logotype construction, stacked basins). */}
      <Reveal delay={0.16}>
        <div
          className="absolute overflow-hidden"
          style={{ left: 1066, top: 642, width: 374, height: 249 }}
        >
          <LavaboCarousel />
        </div>
      </Reveal>

      {/* Down arrow scroll cue at x=684 y=642 (72×94 in Figma). Bounces
          gently up and down to invite scrolling — reduced-motion users get
          the static arrow. */}
      <div
        className="absolute text-cream"
        style={{ left: 684, top: 642 }}
        aria-hidden
      >
        <BouncingArrow direction="down" size={72} />
      </div>
      </div>
    </section>
  );
}

function ContactForm() {
  return (
    <section
      data-nav-scheme="dark"
      className="relative w-full text-accent"
      style={{ height: 1227, backgroundColor: "#f5f1ec" }}
    >
      <div className="relative mx-auto" style={{ width: 1440, height: 1227 }}>
      <div className="absolute" style={{ left: 420, top: 140, width: 596 }}>
        <Reveal>
          <form className="flex flex-col gap-[44px]">
            {/* Row 1: First + Last name side by side */}
            <div className="flex gap-[10px]">
              <FieldText
                id={contactForm.fields[0].id}
                label={
                  contactForm.fields[0].kind === "text"
                    ? contactForm.fields[0].label
                    : ""
                }
              />
              <FieldText
                id={contactForm.fields[1].id}
                label={
                  contactForm.fields[1].kind === "text"
                    ? contactForm.fields[1].label
                    : ""
                }
              />
            </div>
            {/* Subsequent fields */}
            {contactForm.fields.slice(2).map((f) =>
              f.kind === "text" ? (
                <FieldText
                  key={f.id}
                  id={f.id}
                  label={f.label}
                  helper={f.helper}
                />
              ) : f.kind === "checkboxGroup" ? (
                <CheckboxGroup
                  key={f.id}
                  label={f.label}
                  options={f.options}
                />
              ) : (
                <FieldTextarea
                  key={f.id}
                  id={f.id}
                  placeholder={f.placeholder}
                />
              ),
            )}
            <div className="mt-[20px] flex justify-center">
              {/* SAVE & SEND — Figma BUTTON 310:58094, same spec as the home
                  CtaButton (geometry, color, Union arrow). */}
              <button
                type="submit"
                className="group inline-flex items-center gap-[6.498px] rounded-[18.05px] border-[1.444px] border-[#a98a8a] px-[24.548px] py-[5.776px] text-[20.22px] uppercase leading-[1.21] text-[#a18080] transition-colors hover:bg-ink hover:text-cream"
              >
                <span>{contactForm.buttonLabel}</span>
                <span
                  aria-hidden
                  className="block shrink-0 transition-transform duration-300 group-hover:translate-x-1"
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
              </button>
            </div>
          </form>
        </Reveal>
      </div>
      </div>
    </section>
  );
}

function FieldText({
  id,
  label,
  helper,
}: {
  id: string;
  label: string;
  helper?: string;
}) {
  const inputId = useId();
  // Figma uses the field name as a placeholder inside the input (no label
  // line above) — helper merges into the same placeholder string. Visually
  // hidden label kept for screen readers.
  const placeholder = helper ? `${label} ${helper}` : label;
  return (
    <div className="flex flex-1 flex-col">
      <label htmlFor={inputId} className="sr-only">
        {placeholder}
      </label>
      <input
        id={inputId}
        name={id}
        type="text"
        placeholder={placeholder}
        className="border-b-[2.113px] border-accent/50 bg-transparent py-[6px] text-[17px] text-accent caret-accent placeholder:text-accent outline-none transition-colors focus:border-accent"
      />
    </div>
  );
}

function FieldTextarea({
  id,
  placeholder,
}: {
  id: string;
  placeholder: string;
}) {
  const inputId = useId();
  // Centered placeholder via an absolutely-positioned overlay that hides as
  // soon as the user types. Cleaner than fighting browser-native placeholder
  // alignment (which is locked to top-left in <textarea>).
  const [value, setValue] = useState("");
  return (
    <div className="relative">
      <label htmlFor={inputId} className="sr-only">
        {placeholder}
      </label>
      <textarea
        id={inputId}
        name={id}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="block h-[135px] w-full resize-none rounded-[4px] border-[1.444px] border-accent/30 bg-white/40 p-[18px] text-[17px] text-accent caret-accent outline-none transition-colors focus:border-accent"
      />
      {!value && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center p-[18px] text-center italic text-[17px] text-accent/70"
        >
          {placeholder}
        </div>
      )}
    </div>
  );
}

function CheckboxGroup({
  label,
  options,
}: {
  label: string;
  options: readonly string[];
}) {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  return (
    <fieldset>
      <legend className="mb-[16px] text-[17px] italic text-accent">
        {label}
      </legend>
      <ul className="flex flex-col gap-[6px]">
        {options.map((opt) => {
          const isOn = checked.has(opt);
          return (
            <li key={opt}>
              <label className="flex cursor-pointer items-center gap-[14px] text-[16px] italic text-accent">
                <input
                  type="checkbox"
                  checked={isOn}
                  onChange={() =>
                    setChecked((prev) => {
                      const next = new Set(prev);
                      if (isOn) next.delete(opt);
                      else next.add(opt);
                      return next;
                    })
                  }
                  className="h-[15px] w-[15px] cursor-pointer appearance-none border-[1.444px] border-accent transition-colors checked:bg-accent"
                />
                {opt}
              </label>
            </li>
          );
        })}
      </ul>
    </fieldset>
  );
}

function ContactFAQ() {
  // Flow layout (margins, not absolute tops) so the image strip, "my work"
  // link, and socials slide down when an FAQ row expands instead of staying
  // glued under the answer. Figma x-coords are preserved via marginLeft on
  // each block. Gaps derived from Figma y-coords with the collapsed FAQ:
  //   pt=158 (eyebrow), mt-30 (title), mt-30 (FAQ), mt-117 (image strip),
  //   mt-53 (socials), pb-122 (sums to 1054 collapsed).
  return (
    <section
      data-nav-scheme="light"
      className="relative w-full"
      style={{ minHeight: 1054, backgroundColor: "#906553" }}
    >
      <div className="relative mx-auto pt-[158px] pb-[122px]" style={{ width: 1440 }}>
        {/* Eyebrow + "Questions" SVG title — centered at left:578 width:284 */}
        <div
          className="flex flex-col items-center text-center text-cream"
          style={{ marginLeft: 578, width: 284 }}
        >
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

        {/* FAQ accordion — Figma left:394 width:652 */}
        <div className="mt-[30px]" style={{ marginLeft: 394, width: 652 }}>
          {contactFAQItems.map((item) => (
            <FAQRow key={item.question} question={item.question} answer={item.answer} />
          ))}
        </div>

        {/* Image strip + "my work" link share a relative wrapper so that the
            link stays positioned at the strip's left, regardless of how tall
            the FAQ block has grown above. */}
        <div className="relative mt-[117px]">
          <div
            className="flex"
            style={{ marginLeft: 392, width: 1046, height: 252 }}
          >
            {contactFAQ.workThumbs.map((src) => (
              <Link
                key={src}
                href="/work"
                className="relative flex-1 overflow-hidden transition-transform duration-500 hover:scale-[1.02]"
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  unoptimized
                  sizes="252px"
                  className="object-cover"
                />
              </Link>
            ))}
          </div>

          {/* "my work :)" link to the LEFT of the image strip. Figma y=740 in
              the original section ≡ top:113 inside this strip wrapper (which
              starts at the strip's y=627). */}
          <Link
            href="/work"
            className="group absolute flex flex-col items-center text-cream"
            style={{ left: 186, top: 113, width: 141 }}
          >
            <BouncingUnionArrow />
            <span className="mt-[8px] text-[20px] italic">
              {contactFAQ.myWorkLink}
            </span>
          </Link>
        </div>

        {/* INSTAGRAM / PINTEREST — Figma left:842 width:360 */}
        <p
          className="mt-[53px] text-center italic text-cream"
          style={{ marginLeft: 842, width: 360, fontSize: 20 }}
        >
          {contactFAQ.socials}
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
          className="font-sans italic"
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
  in a calm 1.4s cycle. Honors `prefers-reduced-motion`.
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

/*
  Crossfading 3-frame carousel for the LAVABO editorial tile in the hero.
  All three source artboards are 1527×1018 (aspect 1.5), matching the
  374×249 container, so object-cover renders without cropping. Sourced from
  EXPORTS SMUR WEBSITE 2/Let_s work/lavabo {1,2,3}@2x.png. Cadence and
  rendering pattern mirror the home hero carousel.
*/
const LAVABO_SLIDES = [
  { src: "/figma-assets/contact/hero-right-1.png", alt: "LAVABO concrete basin editorial" },
  { src: "/figma-assets/contact/hero-right-2.png", alt: "LAVABO logotype construction" },
  { src: "/figma-assets/contact/hero-right-3.png", alt: "LAVABO stacked colored basins" },
];
const LAVABO_INTERVAL_MS = 2000;

function LavaboCarousel() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % LAVABO_SLIDES.length),
      LAVABO_INTERVAL_MS,
    );
    return () => window.clearInterval(id);
  }, []);
  return (
    <>
      {LAVABO_SLIDES.map((s, i) => (
        <Image
          key={s.src}
          src={s.src}
          alt={i === index ? s.alt : ""}
          fill
          sizes="374px"
          quality={90}
          preload={i === 0}
          loading={i === 0 ? undefined : "eager"}
          className={`absolute inset-0 object-cover transition-opacity duration-[300ms] ease-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={i !== index}
        />
      ))}
    </>
  );
}
