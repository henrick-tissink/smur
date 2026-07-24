import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale, getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { DM_Sans, DM_Serif_Display, Open_Sans, Quicksand } from "next/font/google";
import { SITE_URL, organizationSchema } from "@/lib/structured-data";
import { Analytics } from "@/components/analytics";
import { ConsentBanner } from "@/components/consent-banner";
import { routing } from "@/i18n/routing";
import "../globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  // Load the true italic axis too — the CRISP intro eyebrow (Figma H3:
  // DM Sans Italic 20) needs real italics, not a faux-skewed upright.
  style: ["normal", "italic"],
  display: "swap",
});

/* Used by the CRISP hero curve text (Figma 71:4364 specifies Open Sans). */
const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  display: "swap",
});

/* Used by the kabinett bottom card address text (Figma 73:40155 specifies Quicksand). */
const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  display: "swap",
});

/*
  Figma "Subtitels" style uses Myanmar MN at 58px. Myanmar MN is an Apple
  system font and unavailable cross-platform. DM Serif Display is the closest
  free web font: chunky transitional serif with similar weight/character.
*/
const dmSerifDisplay = DM_Serif_Display({
  variable: "--font-dm-serif-display",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

// Global defaults for every locale + route; per-page localized title,
// description, canonical, hreflang, and OG come from buildPageMetadata.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "SMUR — Naming, Branding & Design", template: "%s" },
  keywords: [
    "brand identity",
    "branding studio",
    "brand designer",
    "naming",
    "logo design",
    "visual identity",
    "packaging design",
    "brand strategy",
  ],
  authors: [{ name: "Smaranda", url: SITE_URL }],
  creator: "SMUR",
  publisher: "SMUR",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  // Opt this locale's routes into static rendering.
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${dmSans.variable} ${dmSerifDisplay.variable} ${openSans.variable} ${quicksand.variable} antialiased`}
    >
      <body>
        {/* Sitewide Organization structured data (JSON-LD). */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Analytics />
        <ConsentBanner />
      </body>
    </html>
  );
}
