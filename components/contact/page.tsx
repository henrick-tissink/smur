"use client";

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
import { Arrow } from "../arrow";
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
  const { width, height } = contactFrame.desktop;
  return (
    <div
      className="relative mx-auto"
      style={{ width, height, backgroundColor: "#f5f1ec" }}
    >
      <ContactHero />
      <ContactForm />
      <ContactFAQ />
    </div>
  );
}

function ContactHero() {
  return (
    <section
      data-nav-scheme="light"
      className="relative w-full"
      style={{ height: 812, backgroundColor: "#bbc2b5" }}
    >
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

      {/* LEFT — MANUFAKTURA editorial (Clip path group 218:17739): x=0 y=244 w=258 h=356 */}
      <Reveal delay={0.12}>
        <div
          className="absolute"
          style={{ left: 0, top: 244, width: 258, height: 356 }}
        >
          <Image
            src="/figma-assets/contact/hero-left.png"
            alt=""
            width={258}
            height={356}
            unoptimized
            className="block h-full w-full object-cover"
          />
        </div>
      </Reveal>

      {/* RIGHT — LAVABO editorial (Component 6 218:12494): x=1066 y=642 w=374 h=249 */}
      <Reveal delay={0.16}>
        <div
          className="absolute"
          style={{ left: 1066, top: 642, width: 374, height: 249 }}
        >
          <Image
            src="/figma-assets/contact/hero-right.png"
            alt=""
            width={374}
            height={249}
            unoptimized
            className="block h-full w-full object-cover"
          />
        </div>
      </Reveal>

      {/* Down arrow scroll cue at x=684 y=642 (72×94 in Figma) */}
      <div
        className="absolute text-cream"
        style={{ left: 684, top: 642 }}
        aria-hidden
      >
        <Arrow direction="down" size={72} />
      </div>
    </section>
  );
}

function ContactForm() {
  return (
    <section
      data-nav-scheme="dark"
      className="relative w-full text-accent"
      style={{ height: 1227 }}
    >
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
              <button
                type="submit"
                className="group inline-flex items-center gap-[14px] rounded-full border-[1.444px] border-accent/70 px-[30px] py-[9px] text-[20.22px] uppercase leading-[1.21] text-accent transition-colors hover:bg-accent hover:text-cream"
              >
                <span>{contactForm.buttonLabel}</span>
                <span
                  aria-hidden
                  className="transition-transform group-hover:translate-x-1"
                >
                  <Arrow direction="right" size={20} />
                </span>
              </button>
            </div>
          </form>
        </Reveal>
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
  return (
    <div className="flex flex-1 flex-col">
      <label htmlFor={inputId} className="text-[17px] text-accent">
        {label}{" "}
        {helper && <span className="text-[16px] text-accent/80">{helper}</span>}
      </label>
      <input
        id={inputId}
        name={id}
        type="text"
        className="border-b-[2.113px] border-accent/50 bg-transparent py-[6px] text-[17px] text-accent caret-accent outline-none transition-colors focus:border-accent"
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
  return (
    <div>
      <textarea
        id={inputId}
        name={id}
        placeholder={placeholder}
        className="block h-[135px] w-full resize-none rounded-[4px] border-[1.444px] border-accent/30 bg-white/40 p-[18px] text-[17px] text-accent caret-accent placeholder:text-center placeholder:italic placeholder:text-accent/70 outline-none transition-colors focus:border-accent"
      />
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
  return (
    <section
      data-nav-scheme="light"
      className="relative w-full"
      style={{ height: 1054, backgroundColor: "#906553" }}
    >
      {/* Eyebrow + "Questions" SVG title */}
      <div
        className="absolute flex flex-col items-center text-center text-cream"
        style={{ left: 578, top: 158, width: 284 }}
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

      {/* FAQ accordion at y=2349-2533 (relative y=310-494) */}
      <div
        className="absolute"
        style={{ left: 394, top: 310, width: 652 }}
      >
        {contactFAQItems.map((item) => (
          <FAQRow key={item.question} question={item.question} answer={item.answer} />
        ))}
      </div>

      {/* Group 78 image strip at relative y=627 (abs y=2666), w=1046 */}
      <div
        className="absolute flex gap-[10px]"
        style={{ left: 392, top: 627, width: 1046, height: 252 }}
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

      {/* "my work :)" link + arrow at relative y=740, w=141 */}
      <Link
        href="/work"
        className="group absolute flex flex-col items-center text-cream"
        style={{ left: 186, top: 740, width: 141 }}
      >
        <span aria-hidden className="transition-transform group-hover:-translate-x-1">
          <Arrow direction="left" size={32} />
        </span>
        <span className="mt-[8px] text-[20px] italic">
          {contactFAQ.myWorkLink}
        </span>
      </Link>

      {/* INSTAGRAM / PINTEREST at relative y=932 */}
      <p
        className="absolute text-center text-cream"
        style={{ left: 842, top: 932, width: 360, fontSize: 20 }}
      >
        {contactFAQ.socials}
      </p>
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
