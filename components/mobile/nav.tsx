"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { nav } from "@/content/home";

/*
  Mobile nav (Figma 268:31918 "navi mobile") at x=26 y=47 within 393-wide hero.
  Inner row: flex items-end justify-between, 340 × 19.
    - SMUR logo SVG (85.5 × 19) on the left  (dark by default per Figma)
    - Hamburger: 3 stacked horizontal lines, 29 × 19 (also dark)

  The nav sits at the top of the page (not sticky) and scrolls away,
  overlapping only the first section. Color is fixed per page via `scheme`:
  - "dark" (default, over hero/services/sage): dark brown #35221a
  - "light" (over a warm-brown / cream-text section): cream #fff7f4

  Tapping the hamburger opens the full-screen menu overlay (Figma 282:40808).
*/
export function MobileNav({ scheme = "dark" }: { scheme?: "light" | "dark" }) {
  const [open, setOpen] = useState(false);
  // Mobile SVG is natively #35221a dark brown. On light scheme we invert to
  // white via brightness(0) invert(1).
  const iconColor = scheme === "light" ? "#fff7f4" : "#35221a";
  const logoFilter =
    scheme === "light" ? "brightness(0) invert(1)" : "none";

  /*
    Header is 80px tall. Content row is positioned at top=32 (matches Figma
    Component 1's nav position within the hero) and is 19px tall, leaving
    ~29px of breathing room below the logo + hamburger. Earlier the header
    was 66px with content at top=47 — that left 0px below, jamming the
    logo/menu against the bottom edge of the colored bar.
  */
  return (
    <>
      <header className="absolute inset-x-0 top-0 z-50 h-[80px]">
        <div
          className="relative mx-auto h-full"
          style={{ maxWidth: "393px" }}
        >
          <div
            className="absolute flex items-end justify-between"
            style={{ left: "26px", right: "27px", top: "32px", height: "19px" }}
          >
            <Link
              href="/#home"
              aria-label="SMUR — home"
              className="block h-[19px] w-[85.5px]"
            >
              <Image
                src="/figma-assets/mobile/smur-logo.svg"
                alt="SMUR."
                width={86}
                height={19}
                priority
                unoptimized
                className="block h-full w-full transition-[filter] duration-200"
                style={{ filter: logoFilter }}
              />
            </Link>
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen(true)}
              className="relative h-[19px] w-[29px]"
            >
              <span
                aria-hidden
                className="absolute left-0 right-0 top-0 h-[2px] transition-colors duration-200"
                style={{ backgroundColor: iconColor }}
              />
              <span
                aria-hidden
                className="absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2 transition-colors duration-200"
                style={{ backgroundColor: iconColor }}
              />
              <span
                aria-hidden
                className="absolute left-0 right-0 bottom-0 h-[2px] transition-colors duration-200"
                style={{ backgroundColor: iconColor }}
              />
            </button>
          </div>
        </div>
      </header>
      {open && <MobileMenu onClose={() => setOpen(false)} />}
    </>
  );
}

/*
  Full-screen menu overlay — Figma 282:40808 (393 × 852).
  - Cream #fff7f4 background, dark #35221a text/icons
  - Close X at right=30, top=47 (24 × 21)
  - Centered column at top=243: SMUR logo, 4 links, gap=61
  - INSTAGRAM / PINTEREST near bottom, italic 15px
*/
function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      className="fixed inset-0 z-[60]"
      style={{ backgroundColor: "#fff7f4" }}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close menu"
        className="absolute"
        style={{ right: 30, top: 47, width: 24, height: 21 }}
      >
        <Image
          src="/figma-assets/mobile/close-x.svg"
          alt=""
          width={24}
          height={21}
          unoptimized
          className="block h-full w-full"
        />
      </button>

      <div
        className="absolute left-1/2 flex flex-col items-center"
        style={{ top: 243, gap: 61, transform: "translateX(-50%)" }}
      >
        <Image
          src="/figma-assets/mobile/smur-logo.svg"
          alt="SMUR."
          width={86}
          height={19}
          unoptimized
          className="block"
          style={{ width: 85.5, height: 19 }}
        />
        {nav.links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            onClick={onClose}
            className="block text-center uppercase"
            style={{
              color: "#35221a",
              fontSize: 17,
              width: l.width,
            }}
          >
            {l.label}
          </Link>
        ))}
      </div>

      <p
        className="absolute left-1/2 italic text-center"
        style={{
          bottom: 67,
          width: 361,
          transform: "translateX(-50%)",
          color: "#35221a",
          fontSize: 15,
        }}
      >
        INSTAGRAM&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;PINTEREST
      </p>
    </div>
  );
}
