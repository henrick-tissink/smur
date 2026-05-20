"use client";

import Image from "next/image";
import { useState } from "react";
import { useNavInfo } from "../use-nav-scheme";

/*
  Mobile nav (Figma 268:31918 "navi mobile") at x=26 y=47 within 393-wide hero.
  Inner row: flex items-end justify-between, 340 × 19.
    - SMUR logo SVG (85.5 × 19) on the left  (dark by default per Figma)
    - Hamburger: 3 stacked horizontal lines, 29 × 19 (also dark)

  Color adapts to the section behind the nav via useNavScheme:
  - "dark" (default, over hero/services/sage): dark brown #35221a
  - "light" (over the warm-brown about section): cream #fff7f4
*/
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const { scheme, bg } = useNavInfo();
  // Mobile SVG is natively #35221a dark brown. On light scheme (over the
  // warm-brown about section) we invert to white via brightness(0) invert(1).
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
    <header
      className="fixed inset-x-0 top-0 z-50 h-[80px] transition-[background-color] duration-200"
      style={{ backgroundColor: bg }}
    >
      <div
        className="relative mx-auto h-full"
        style={{ maxWidth: "393px" }}
      >
        <div
          className="absolute flex items-end justify-between"
          style={{ left: "26px", right: "27px", top: "32px", height: "19px" }}
        >
          <a
            href="#home"
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
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
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
  );
}
