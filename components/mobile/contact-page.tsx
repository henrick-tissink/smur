"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useId, useState } from "react";
import {
  contactFAQ,
  contactFAQItems,
  contactForm,
  contactFrame,
  contactHero,
} from "@/content/contact";
import { BouncingArrow } from "../bouncing-arrow";
import { useContactSubmit } from "../contact/use-contact-submit";
import { Chevron } from "../chevron";
import { Reveal } from "../reveal";
import { TitleMask } from "../title-mask";

/*
  Mobile "Work With Me" page (Figma 282:39442). 393 × 2683.
  Same three-section structure as desktop, restacked for narrow screen.
*/
export function MobileContactPage() {
  const { width } = contactFrame.mobile;
  // Sections are normal flow — natural height. (A fixed Figma-frame height
  // left the FAQ overflowing past the page bottom once the accordion
  // content outgrew it.)
  return (
    <div
      className="relative mx-auto"
      style={{ width, backgroundColor: "#f5f1ec" }}
    >
      <Hero />
      <Form />
      <FAQ />
    </div>
  );
}

function Hero() {
  return (
    <section
      data-nav-scheme="light"
      className="relative w-full"
      style={{ height: 866, backgroundColor: "#bbc2b5" }}
    >
      {/* Title (282:55197) at y=100, w=310 — brand-font SVG (tell-me-about),
          2-line break matches the mobile design, scaled 45/58. */}
      <div
        className="absolute flex justify-center text-cream"
        style={{ left: 42, top: 100, width: 310 }}
      >
        <Reveal>
          <TitleMask
            src="/figma-assets/titles/tell-me-about.svg"
            width={302}
            height={107.1}
            alt={contactHero.title}
            as={1}
          />
        </Reveal>
      </div>

      {/* Body at y=290 */}
      <div
        className="absolute text-center text-cream"
        style={{ left: 42, top: 290, width: 310 }}
      >
        <Reveal delay={0.08}>
          <p style={{ fontSize: 15, lineHeight: 1.33 }}>{contactHero.body}</p>
        </Reveal>
      </div>

      {/* Scroll-down arrow (Figma "Component 2" at x=171 y=660 — 55×71.8,
          frame-centered). Bounces like the desktop contact hero cue. */}
      <div
        className="absolute flex justify-center text-cream"
        style={{ left: 0, right: 0, top: 545 }}
        aria-hidden
      >
        <BouncingArrow direction="down" size={72} />
      </div>

      {/* MANUFAKTURA editorial decorative thumbnail bottom-left */}
      <Reveal delay={0.12}>
        <div
          className="absolute"
          style={{ left: 0, top: 645, width: 154, height: 221 }}
        >
          <Image
            src="/figma-assets/contact/hero-left.png"
            alt=""
            width={154}
            height={221}
            unoptimized
            className="block h-full w-full object-cover"
          />
        </div>
      </Reveal>
    </section>
  );
}

function Form() {
  // Posts to /api/contact; the button only flips to SENT on real delivery
  // (June 2026 client request).
  const { state, submit } = useContactSubmit();
  const sent = state === "sent";
  return (
    <section
      data-nav-scheme="dark"
      className="relative w-full"
      style={{ height: 946 }}
    >
      <div
        className="absolute"
        style={{ left: 42, top: 75, width: 310 }}
      >
        <Reveal>
          <form
            className="flex flex-col gap-[40px] text-[14px] text-accent"
            onSubmit={(e) => {
              e.preventDefault();
              void submit(e.currentTarget);
            }}
          >
            <div className="flex gap-[10px]">
              <MobileText id="firstName" label="First name" />
              <MobileText id="lastName" label="Last name" />
            </div>
            {contactForm.fields.slice(2).map((f) =>
              f.kind === "text" ? (
                <MobileText
                  key={f.id}
                  id={f.id}
                  label={f.label}
                  helper={f.helper}
                />
              ) : f.kind === "checkboxGroup" ? (
                <MobileCheckboxGroup
                  key={f.id}
                  id={f.id}
                  label={f.label}
                  options={f.options}
                />
              ) : (
                <MobileTextarea
                  key={f.id}
                  id={f.id}
                  placeholder={f.placeholder}
                />
              ),
            )}
            <div className="mt-[10px] flex flex-col items-center gap-[12px]">
              {/* SAVE & SEND — Figma BUTTON 310:58071, same spec as home CTA. */}
              <button
                type="submit"
                disabled={sent || state === "sending"}
                className={`group inline-flex items-center gap-[6.498px] rounded-[18.05px] border-[1.444px] border-[#a98a8a] px-[24.548px] py-[5.776px] text-[20.22px] uppercase leading-[1.21] transition-colors ${
                  sent
                    ? "cursor-default bg-ink text-cream"
                    : state === "sending"
                      ? "cursor-wait text-[#a18080]"
                      : "text-[#a18080] hover:bg-ink hover:text-cream"
                }`}
              >
                <span>
                  {sent ? "SENT" : state === "sending" ? "SENDING…" : contactForm.buttonLabel}
                </span>
                {!sent && state !== "sending" && (
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
                )}
              </button>
              {state === "error" && (
                <p role="alert" className="text-center text-[14px] italic text-accent">
                  Something went wrong — please try again or email{" "}
                  <a href="mailto:hello@smur-world.com" className="underline">
                    hello@smur-world.com
                  </a>
                </p>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function MobileText({
  id,
  label,
  helper,
}: {
  id: string;
  label: string;
  helper?: string;
}) {
  const inputId = useId();
  // Field name as a native placeholder inside the input — no label line above.
  const placeholder = helper ? `${label} ${helper}` : label;
  return (
    <div className="flex flex-1 flex-col">
      <label htmlFor={inputId} className="sr-only">
        {placeholder}
      </label>
      <input
        id={inputId}
        name={id}
        type={id === "email" ? "email" : "text"}
        required={id === "email"}
        placeholder={placeholder}
        className="border-b-[2.113px] border-accent/50 bg-transparent py-[5px] text-[15px] text-accent caret-accent placeholder:text-accent outline-none transition-colors focus:border-accent"
      />
    </div>
  );
}

function MobileTextarea({
  id,
  placeholder,
}: {
  id: string;
  placeholder: string;
}) {
  const inputId = useId();
  // Overlay-based centered placeholder — vertically + horizontally centered,
  // hides as soon as the user types (native <textarea> placeholders sit
  // top-left and can't be vertically centered reliably).
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
        className="block h-[110px] w-full resize-none rounded-[4px] border-[1.444px] border-accent/30 bg-transparent p-[14px] text-[15px] text-accent caret-accent outline-none transition-colors focus:border-accent"
      />
      {!value && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center p-[14px] text-center italic text-[15px] text-accent/70"
        >
          {placeholder}
        </div>
      )}
    </div>
  );
}

function MobileCheckboxGroup({
  id,
  label,
  options,
}: {
  id: string;
  label: string;
  options: readonly string[];
}) {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  return (
    <fieldset>
      <legend className="mb-[14px] text-[15px] italic text-accent">{label}</legend>
      <ul className="flex flex-col gap-[6px]">
        {options.map((opt) => {
          const isOn = checked.has(opt);
          return (
            <li key={opt}>
              <label className="flex cursor-pointer items-center gap-[12px] text-[16px] italic text-accent">
                <input
                  type="checkbox"
                  name={id}
                  value={opt}
                  checked={isOn}
                  onChange={() =>
                    setChecked((prev) => {
                      const next = new Set(prev);
                      if (isOn) next.delete(opt);
                      else next.add(opt);
                      return next;
                    })
                  }
                  className="h-[14px] w-[14px] cursor-pointer appearance-none border-[1.444px] border-accent transition-colors checked:bg-accent"
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

function FAQ() {
  // Flow layout (margins, not absolute tops) so my work + socials shift down
  // when an FAQ row expands — same fix as desktop. Margins derived from Figma
  // y-coords with collapsed FAQ.
  return (
    <section
      data-nav-scheme="light"
      className="relative w-full pt-[72px] pb-[43px]"
      style={{ minHeight: 871, backgroundColor: "#906553" }}
    >
      {/* "I answered" / "Questions" centered */}
      <div className="w-full text-center text-cream">
        <Reveal>
          <p className="font-sans italic" style={{ fontSize: 15 }}>
            {contactFAQ.eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          {/* "Questions" (293:55322) — brand-font SVG (questions.svg),
              single line, scaled 45/58. */}
          <div className="mt-[16px] flex justify-center">
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

      {/* FAQ accordion at Figma left:44 width:307 */}
      <div className="mt-[17px]" style={{ marginLeft: 44, width: 307 }}>
        {contactFAQItems.map((item) => (
          <MobileFAQRow key={item.question} question={item.question} answer={item.answer} />
        ))}
      </div>

      {/* Work showcase — a 2×2 grid of case-study thumbs with the "my work :)"
          arrow to its LEFT pointing into the grid. Mirrors the desktop
          arrow→strip relationship, reflowed for the narrow column so the arrow
          actually points at the work (June 2026 feedback: on mobile the arrow
          previously sat below a full-width strip, pointing at nothing). */}
      <div
        className="mt-[72px] flex items-center"
        style={{ paddingLeft: 43, paddingRight: 0 }}
      >
        {/* arrow + label, vertically centered against the grid */}
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

        {/* Pinwheel collage (matches the design): top-left + bottom-right are
            squares, top-right + bottom-left are wider landscape tiles, so the
            row dividers are offset. No gaps; bleeds flush to the right edge.
            One flex column of two flex rows; the wide tile in each row is
            `flex-1` so it absorbs any rounding (no subpixel seams). */}
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
          {/* Row 2 — KOKO.P (wide) | LAVABO (square) */}
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

      {/* INSTAGRAM / PINTEREST — live links (June 2026 feedback) */}
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
        &nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;
        <a
          href={contactFAQ.pinterestUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-opacity hover:opacity-70"
        >
          PINTEREST
        </a>
      </p>
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
          className="font-sans italic uppercase"
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
  32 × 10.88 (Figma). Honors `prefers-reduced-motion`.
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
