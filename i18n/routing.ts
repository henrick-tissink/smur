import { defineRouting } from "next-intl/routing";

/*
  Locales: English is the default and lives at the root (no /en prefix);
  Romanian and German are prefixed (/ro, /de). `as-needed` gives us exactly
  the "English at root + /ro + /de" URL scheme decided for SMUR.
*/
export const routing = defineRouting({
  locales: ["en", "ro", "de"],
  defaultLocale: "en",
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
