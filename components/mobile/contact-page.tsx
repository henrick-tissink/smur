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
import { Chevron } from "../chevron";
import { Reveal } from "../reveal";

/*
  Mobile "Work With Me" page (Figma 282:39442). 393 × 2683.
  Same three-section structure as desktop, restacked for narrow screen.
*/
export function MobileContactPage() {
  const { width, height } = contactFrame.mobile;
  return (
    <div
      className="relative mx-auto"
      style={{ width, height, backgroundColor: "#f5f1ec" }}
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
      {/* Title at y=100, w=310, center */}
      <div
        className="absolute text-center text-cream"
        style={{ left: 42, top: 100, width: 310 }}
      >
        <Reveal>
          <h1
            className="font-heading"
            style={{ fontSize: 45, lineHeight: 1.21 }}
          >
            {contactHero.title}
          </h1>
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

      {/* Down arrow */}
      <div
        className="absolute text-center text-cream"
        style={{ left: 0, right: 0, top: 590 }}
        aria-hidden
      >
        <span style={{ fontSize: 20 }}>↓</span>
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
  return (
    <section
      data-nav-scheme="dark"
      className="relative w-full"
      style={{ height: 946 }}
    >
      <div
        className="absolute"
        style={{ left: 43, top: 75, width: 310 }}
      >
        <Reveal>
          <form className="flex flex-col gap-[40px] text-[14px] text-ink">
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
            <div className="mt-[10px] flex justify-center">
              {/* SAVE & SEND — Figma BUTTON 310:58071, same spec as home CTA. */}
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
        type="text"
        placeholder={placeholder}
        className="border-b-[2.113px] border-ink/40 bg-transparent py-[5px] text-[15px] text-ink placeholder:text-ink/80 outline-none focus:border-ink"
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
        className="block h-[110px] w-full resize-none rounded-[4px] border-[1.444px] border-ink/15 bg-white/40 p-[14px] text-[15px] text-ink outline-none focus:border-ink/40"
      />
      {!value && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center p-[14px] text-center italic text-[15px] text-ink/60"
        >
          {placeholder}
        </div>
      )}
    </div>
  );
}

function MobileCheckboxGroup({
  label,
  options,
}: {
  label: string;
  options: readonly string[];
}) {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  return (
    <fieldset>
      <legend className="mb-[14px] text-[15px] text-ink">{label}</legend>
      <ul className="flex flex-col gap-[6px]">
        {options.map((opt) => {
          const isOn = checked.has(opt);
          return (
            <li key={opt}>
              <label className="flex cursor-pointer items-center gap-[12px] text-[16px] italic text-accent">
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
  return (
    <section
      data-nav-scheme="light"
      className="relative w-full"
      style={{ height: 871, backgroundColor: "#906553" }}
    >
      {/* "I answered" / "Questions" centered at relative y=72 (abs y=1884) */}
      <div
        className="absolute w-full text-center text-cream"
        style={{ top: 72 }}
      >
        <Reveal>
          <p className="font-sans italic" style={{ fontSize: 15 }}>
            {contactFAQ.eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <p
            className="mt-[16px] font-heading"
            style={{ fontSize: 45, lineHeight: 1.21 }}
          >
            {contactFAQ.heading}
          </p>
        </Reveal>
      </div>

      {/* FAQ accordion at y=174 (abs y=1986), w=307 */}
      <div
        className="absolute"
        style={{ left: 44, top: 174, width: 307 }}
      >
        {contactFAQItems.map((item) => (
          <MobileFAQRow key={item.question} question={item.question} answer={item.answer} />
        ))}
      </div>

      {/* my work :) link */}
      <Link
        href="/work"
        className="absolute flex items-center gap-[8px] text-cream"
        style={{ left: 43, top: 660 }}
      >
        <span aria-hidden style={{ fontSize: 20 }}>←</span>
        <span className="italic" style={{ fontSize: 15.105 }}>
          {contactFAQ.myWorkLink}
        </span>
      </Link>

      {/* INSTAGRAM / PINTEREST */}
      <p
        className="absolute w-full text-center italic text-cream"
        style={{ top: 810, fontSize: 15 }}
      >
        {contactFAQ.socials}
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
