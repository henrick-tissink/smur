import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SITE_URL } from "@/lib/structured-data";
import { routing } from "@/i18n/routing";

/** Localized absolute URL — English at root (no prefix), RO/DE under /ro, /de. */
export function localizedUrl(locale: string, path: string) {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return `${SITE_URL}${prefix}${path}`;
}

/*
  Per-route localized <title>/<description> + canonical + hreflang alternates,
  pulled from the `Metadata.<key>` message namespace. openGraph/twitter titles
  inherit the localized <title> automatically (Next merges them), so we only set
  the OG/twitter description to keep it localized too.

  Usage in a route:
    export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
      const { locale } = await params;
      return buildPageMetadata(locale, "/work", "work");
    }
*/
export async function buildPageMetadata(
  locale: string,
  path: string,
  metadataKey: string,
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const title = t(`${metadataKey}.title`);
  const description = t(`${metadataKey}.description`);

  const languages: Record<string, string> = {};
  for (const l of routing.locales) languages[l] = localizedUrl(l, path);
  languages["x-default"] = localizedUrl(routing.defaultLocale, path);

  return {
    title,
    description,
    alternates: {
      canonical: localizedUrl(locale, path),
      languages,
    },
    openGraph: {
      type: "website",
      siteName: "SMUR",
      title,
      description,
      url: localizedUrl(locale, path),
      locale,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
