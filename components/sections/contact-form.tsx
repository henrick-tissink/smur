"use client";

import { useTranslations } from "next-intl";
import { useId, useState } from "react";
import { contactForm } from "@/content/contact";
import { Reveal } from "@/components/reveal";
import { useContactSubmit } from "@/components/contact/use-contact-submit";

/*
  Faithful-fluid desktop ContactForm. Ported from the ContactForm() block in
  legacy components/contact/page.tsx (Figma 193:1383, cream form section
  y=812 h=1227). Legacy file + the shared `useContactSubmit` hook are
  UNCHANGED — this is the highest-risk port because /api/contact reads the
  field `name`/`id`s verbatim.

  Unlike ContactHero (an aspect-ratio "stage" section), this is a FLOW
  section: the form's own internal layout is already a flex column with
  fixed gaps (`gap-[44px]` etc., matching the legacy pixel spec), so there's
  no Figma absolute-position math to convert. Only the section shell changes
  from legacy's fixed 1440×1227 stage to a fluid centered container:
    - section bg: `var(--color-page)` (cream) instead of legacy's literal
      `#f5f1ec` — matches the new architecture's page bg token.
    - container: `mx-auto max-w-[596px] w-full` (596 = legacy form width)
      with `var(--gutter)` horizontal padding + `var(--space-section)`
      vertical padding, replacing the legacy absolute
      `left:420 top:140 width:596` box.

  Form internals (fields, sub-components, submit button, error message) are
  a verbatim port — text intentionally stays at fixed px sizes (17px etc.),
  NOT cqw, per the brief: form text must stay legible/zoom-independent.
*/
export function ContactForm() {
  const t = useTranslations("Contact");
  // Submission posts to /api/contact; the button only flips to SENT when the
  // message is actually delivered (June 2026 client request).
  const { state, submit } = useContactSubmit();
  const sent = state === "sent";
  return (
    <section
      data-nav-scheme="dark"
      className="relative w-full text-accent"
      style={{ backgroundColor: "var(--color-page)" }}
    >
      <div
        className="w-full"
        style={{
          paddingLeft: "var(--gutter)",
          paddingRight: "var(--gutter)",
          paddingTop: "var(--space-section)",
          paddingBottom: "var(--space-section)",
        }}
      >
        {/* Inner box caps at the legacy 596px form width and stays centered;
            the gutter lives on the full-width wrapper above so the form never
            collapses (border-box would otherwise subtract 2×gutter from 596). */}
        <div className="mx-auto w-full max-w-[596px]">
        <Reveal>
          <form
            className="flex flex-col gap-[44px]"
            onSubmit={(e) => {
              e.preventDefault();
              void submit(e.currentTarget);
            }}
          >
            {/* Row 1: First + Last name side by side */}
            <div className="flex gap-[10px]">
              <FieldText
                id={contactForm.fields[0].id}
                label={t(`form.${contactForm.fields[0].id}.label`)}
              />
              <FieldText
                id={contactForm.fields[1].id}
                label={t(`form.${contactForm.fields[1].id}.label`)}
              />
            </div>
            {/* Subsequent fields */}
            {contactForm.fields.slice(2).map((f) =>
              f.kind === "text" ? (
                <FieldText
                  key={f.id}
                  id={f.id}
                  label={t(`form.${f.id}.label`)}
                  helper={f.helper ? t(`form.${f.id}.helper`) : undefined}
                />
              ) : f.kind === "checkboxGroup" ? (
                <CheckboxGroup
                  key={f.id}
                  id={f.id}
                  label={t(`form.${f.id}.label`)}
                  options={t.raw(`form.${f.id}.options`) as string[]}
                />
              ) : (
                <FieldTextarea
                  key={f.id}
                  id={f.id}
                  placeholder={t(`form.${f.id}.placeholder`)}
                />
              ),
            )}
            <div className="mt-[20px] flex flex-col items-center gap-[12px]">
              {/* SAVE & SEND — Figma BUTTON 310:58094, same spec as the home
                  CtaButton (geometry, color, Union arrow). */}
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
                  {sent
                    ? "SENT"
                    : state === "sending"
                      ? "SENDING…"
                      : t("buttonLabel")}
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
                <p
                  role="alert"
                  className="text-center text-[15px] italic text-accent"
                >
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
        type={id === "email" ? "email" : "text"}
        required={id === "email"}
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
        className="block h-[135px] w-full resize-none rounded-[4px] border-[1.444px] border-accent/30 bg-transparent p-[18px] text-[17px] text-accent caret-accent outline-none transition-colors focus:border-accent"
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
