"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const LABELS: Record<string, string> = { en: "EN", ro: "RO", de: "DE" };

/*
  Language switcher. Uses next-intl's locale-aware navigation so it stays on the
  current page and swaps only the locale (English drops the prefix, RO/DE add
  /ro, /de). Inherits text color from its container (currentColor); the active
  locale is full-opacity, the others dimmed.
*/
export function LanguageSwitcher({ className }: { className?: string }) {
  const active = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      className={className}
      role="group"
      aria-label="Language"
      style={{ display: "inline-flex", alignItems: "center", gap: "0.4em" }}
    >
      {routing.locales.map((loc, i) => (
        <span key={loc} style={{ display: "inline-flex", alignItems: "center", gap: "0.4em" }}>
          {i > 0 && <span aria-hidden style={{ opacity: 0.4 }}>/</span>}
          <button
            type="button"
            onClick={() => router.replace(pathname, { locale: loc })}
            aria-current={loc === active ? "true" : undefined}
            className="uppercase transition-opacity hover:opacity-100"
            style={{ opacity: loc === active ? 1 : 0.5, cursor: "pointer" }}
          >
            {LABELS[loc]}
          </button>
        </span>
      ))}
    </div>
  );
}
