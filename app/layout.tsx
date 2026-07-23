import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display, Open_Sans, Quicksand } from "next/font/google";
import { SITE_URL, organizationSchema } from "@/lib/structured-data";
import "./globals.css";

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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "SMUR — Naming, Branding & Design",
  description:
    "SMUR is an independent studio for naming, brand identity and design — creating honest, grounded identities for the people behind the business.",
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
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "SMUR",
    url: SITE_URL,
    title: "SMUR — Naming, Branding & Design",
    description:
      "An independent studio for naming, brand identity and design — honest, grounded identities for the people behind the business.",
    locale: "en",
  },
  twitter: {
    card: "summary_large_image",
    title: "SMUR — Naming, Branding & Design",
    description:
      "An independent studio for naming, brand identity and design.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
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
        {children}
      </body>
    </html>
  );
}
