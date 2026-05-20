"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useState } from "react";
import {
  contactFAQ,
  contactForm,
  contactFrame,
  contactHero,
} from "@/content/contact";
import { Reveal } from "../reveal";

/*
  Desktop "Work With Me" page (Figma 1:243's sibling, frame 193:1383).
  1440 × 3093. Three stacked sections (each `position: relative` with
  absolutely positioned children per Figma coords):
    Hero  (sage #bbc2b5, cream text)  y=0    h=812
    Form  (cream page #f5f1ec)         y=812  h=1227
    Brown (warm brown #906553)         y=2039 h=1054
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
      {/* Title centered at y=237, w=430 (Figma 207:1420) */}
      <div
        className="absolute text-center text-cream"
        style={{ left: 505, top: 237, width: 430 }}
      >
        <Reveal>
          <h1
            className="font-heading"
            style={{ fontSize: 58, lineHeight: 1.21 }}
          >
            {contactHero.title}
          </h1>
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

      {/* Down arrow (Component 2 / 208:12084) at x=684 y=642 w=72 h=94 */}
      <div
        className="absolute text-cream"
        style={{ left: 684, top: 642, width: 72, height: 94 }}
        aria-hidden
      >
        <span style={{ fontSize: 24 }}>↓</span>
      </div>
    </section>
  );
}

function ContactForm() {
  return (
    <section
      data-nav-scheme="dark"
      className="relative w-full"
      style={{ height: 1227 }}
    >
      <div
        className="absolute"
        style={{ left: 420, top: 161, width: 596 }}
      >
        <Reveal>
          <form className="flex flex-col gap-[60px] text-[15px] text-ink">
            {/* Row 1: First + Last name side by side */}
            <div className="flex gap-[10px]">
              <FieldText id={contactForm.fields[0].id} label={contactForm.fields[0].kind === "text" ? contactForm.fields[0].label : ""} />
              <FieldText id={contactForm.fields[1].id} label={contactForm.fields[1].kind === "text" ? contactForm.fields[1].label : ""} />
            </div>
            {/* Subsequent fields */}
            {contactForm.fields.slice(2).map((f) =>
              f.kind === "text" ? (
                <FieldText key={f.id} id={f.id} label={f.label} helper={f.helper} />
              ) : f.kind === "checkboxGroup" ? (
                <CheckboxGroup
                  key={f.id}
                  label={f.label}
                  options={f.options}
                />
              ) : (
                <FieldTextarea key={f.id} id={f.id} placeholder={f.placeholder} />
              ),
            )}
            <div className="mt-[20px] flex justify-center">
              <button
                type="submit"
                className="group inline-flex items-center gap-[10px] rounded-full border border-accent px-[28px] py-[8px] text-[13px] uppercase tracking-[0.15em] text-accent transition-colors hover:bg-accent hover:text-cream"
              >
                {contactForm.buttonLabel}
                <span
                  aria-hidden
                  className="transition-transform group-hover:translate-x-1"
                >
                  →
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
      <label htmlFor={inputId} className="text-[14px] text-ink/80">
        {label}{" "}
        {helper && <span className="italic text-accent">{helper}</span>}
      </label>
      <input
        id={inputId}
        name={id}
        type="text"
        className="border-b border-ink/40 bg-transparent py-[6px] text-[17px] text-ink outline-none transition-colors focus:border-ink"
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
        className="block h-[135px] w-full resize-none rounded-[4px] border border-ink/15 bg-white/40 p-[18px] text-[15px] text-ink placeholder:text-center placeholder:italic placeholder:text-ink/60 outline-none transition-colors focus:border-ink/40"
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
      <legend className="mb-[16px] text-[17px] text-ink">{label}</legend>
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
                  className="h-[15px] w-[15px] cursor-pointer appearance-none border border-accent transition-colors checked:bg-accent"
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
      {/* I answered your / Questions */}
      <div
        className="absolute text-center text-cream"
        style={{ left: 578, top: 158, width: 284 }}
      >
        <Reveal>
          <p className="font-sans italic" style={{ fontSize: 20 }}>
            {contactFAQ.eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <p
            className="mt-[30px] font-heading"
            style={{ fontSize: 58, lineHeight: 1.21 }}
          >
            {contactFAQ.heading}
          </p>
        </Reveal>
      </div>

      {/* FAQ items at y=2349-2533 (relative y=310-494) */}
      <div
        className="absolute"
        style={{ left: 394, top: 310, width: 652 }}
      >
        {contactFAQ.items.map((q, i) => (
          <FAQRow key={q} question={q} index={i} />
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

      {/* "my work :)" link + arrow at relative y=773 (abs y=2812) */}
      <Link
        href="/work"
        className="group absolute flex flex-col items-center text-cream"
        style={{ left: 186, top: 740, width: 141 }}
      >
        <span
          aria-hidden
          className="text-[28px] transition-transform group-hover:-translate-x-1"
        >
          ←
        </span>
        <span className="mt-[8px] text-[14px] italic">
          {contactFAQ.myWorkLink}
        </span>
      </Link>

      {/* INSTAGRAM / PINTEREST at relative y=932 */}
      <p
        className="absolute text-center text-cream"
        style={{ left: 842, top: 932, width: 360, fontSize: 14 }}
      >
        {contactFAQ.socials}
      </p>
    </section>
  );
}

function FAQRow({ question, index }: { question: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-cream/40">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-[18px] text-left text-cream"
      >
        <span
          className="font-sans italic uppercase"
          style={{ fontSize: 20 }}
        >
          {question}
        </span>
        <span
          aria-hidden
          className={`text-cream transition-transform duration-300 ${
            open ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>
    </div>
  );
}
