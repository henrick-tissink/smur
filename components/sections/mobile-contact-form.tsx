"use client";

import { useTranslations } from "next-intl";
import { useId, useState } from "react";
import { contactForm } from "@/content/contact";
import { Reveal } from "@/components/reveal";
import { useContactSubmit } from "@/components/contact/use-contact-submit";

/*
  Faithful mobile ContactForm. Ported from the Form() block in legacy
  components/mobile/contact-page.tsx (Figma 282:39442, cream form section).
  The shared `useContactSubmit` hook is UNCHANGED — this is the highest-risk
  port because /api/contact reads the field `name`/`id`s verbatim.

  Flow section (no Figma absolute-position math): centered container,
  `mx-auto max-w-[393px] w-full`, with `var(--gutter)` horizontal padding +
  `var(--space-section)` vertical padding, matching the shell pattern used by
  the desktop ContactForm.

  Form internals (fields, sub-components, submit button, error message) are
  a verbatim port of the legacy MOBILE sizes — text stays at fixed px sizes
  (15px etc.), NOT cqw, per the brief: form text must stay legible/zoom-
  independent. Row 1 hardcodes firstName/lastName (per legacy).
*/
export function MobileContactForm() {
  const t = useTranslations("Contact");
  // Posts to /api/contact; the button only flips to SENT on real delivery
  // (June 2026 client request).
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
        {/* Inner box caps at the mobile 393px form width, centered; gutter is
            on the full-width wrapper so the form never inverts as width grows. */}
        <div className="mx-auto w-full max-w-[393px]">
        <Reveal>
          <form
            className="flex flex-col gap-[40px] text-[14px] text-accent"
            onSubmit={(e) => {
              e.preventDefault();
              void submit(e.currentTarget);
            }}
          >
            {/* Row 1: First + Last name side by side */}
            <div className="flex gap-[10px]">
              <MobileText id="firstName" label={t("form.firstName.label")} />
              <MobileText id="lastName" label={t("form.lastName.label")} />
            </div>
            {/* Subsequent fields */}
            {contactForm.fields.slice(2).map((f) =>
              f.kind === "text" ? (
                <MobileText
                  key={f.id}
                  id={f.id}
                  label={t(`form.${f.id}.label`)}
                  helper={f.helper ? t(`form.${f.id}.helper`) : undefined}
                />
              ) : f.kind === "checkboxGroup" ? (
                <MobileCheckboxGroup
                  key={f.id}
                  id={f.id}
                  label={t(`form.${f.id}.label`)}
                  options={t.raw(`form.${f.id}.options`) as string[]}
                />
              ) : (
                <MobileTextarea
                  key={f.id}
                  id={f.id}
                  placeholder={t(`form.${f.id}.placeholder`)}
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
                  className="text-center text-[14px] italic text-accent"
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
      <legend className="mb-[14px] text-[15px] italic text-accent">
        {label}
      </legend>
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
