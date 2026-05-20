"use client";

"use client";

import Image from "next/image";
import { nav } from "@/content/home";
import { useNavInfo } from "./use-nav-scheme";

/*
  Nav Component (Figma 6:1282) — 1440 × 64, positioned at y=30 in HOME.
  Inner row: absolute left=86 right=85 top=20 height=24,
    flex items-center justify-between
    - Logo (Layer_1): SVG 108×24
    - Links group: flex gap=61px, DM Sans 17px uppercase, color #fff7f4

  Text color adapts to the section behind the nav (see use-nav-scheme): cream
  over hero beige and about warm-brown, dark brown over the cream/sage
  sections. Earlier we used a scroll-triggered beige strip; that clashed with
  every non-hero section. Adaptive color matches Figma's per-section palette
  without painting a strip.
*/
export function Nav() {
  const { scheme, bg } = useNavInfo();
  const textClass = scheme === "light" ? "text-cream" : "text-ink";
  const logoInvert =
    scheme === "dark"
      ? "brightness-0" // SVG is light by default; make it dark on light sections
      : "";

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 h-[94px] transition-[background-color] duration-200"
      style={{ backgroundColor: bg }}
      aria-label="Primary"
    >
      <div className="relative mx-auto h-full max-w-[1440px]">
        <div
          className="absolute flex h-[24px] items-center justify-between"
          style={{ left: "86px", right: "85px", top: "50px" }}
        >
          <a
            href="#home"
            aria-label="SMUR — home"
            className="block h-[24px] w-[108px]"
          >
            <Image
              src={nav.logo.src}
              alt={nav.logo.alt}
              width={nav.logo.width}
              height={nav.logo.height}
              priority
              unoptimized
              className={`block h-full w-full transition-[filter] duration-200 ${logoInvert}`}
            />
          </a>
          <nav aria-label="Sections">
            <ul
              className={`flex items-center text-[17px] uppercase transition-colors duration-200 ${textClass}`}
              style={{ gap: `${nav.linkGap}px` }}
            >
              {nav.links.map((link) => (
                <li
                  key={link.label}
                  style={{ width: `${link.width}px` }}
                  className="shrink-0"
                >
                  <a
                    href={link.href}
                    className="block transition-opacity hover:opacity-70"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
