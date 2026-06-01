import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display, Open_Sans, Quicksand } from "next/font/google";
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
  title: "SMUR — Naming, Branding & Design",
  description:
    "Branding is not just aesthetics, it's a reflection of who you are, what you value, and how you want to be experienced.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${dmSerifDisplay.variable} ${openSans.variable} ${quicksand.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
