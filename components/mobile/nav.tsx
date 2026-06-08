"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useState } from "react";
import { nav } from "@/content/home";
import { contactFAQ } from "@/content/contact";

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
                className="block h-auto w-full transition-[filter] duration-200"
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
  - Column of SMUR logo + 4 links, gap=61. Figma puts it at top=243, but on
    real phones the browser chrome eats viewport height and the column sat
    visibly low (and jumped when the chrome collapsed) — client asked to
    "move everything higher up", so it now starts at top=140.
  - INSTAGRAM / PINTEREST near bottom — live links to the studio profiles.
  - The SMUR logo navigates home (client request).

  HEIGHT: the overlay lives inside the route's `zoom: 100vw/393` wrapper.
  CSS viewport units (100dvh) resolve against the real viewport and are
  then scaled by the zoom — on a 430pt iPhone the overlay rendered ~9%
  taller than the screen and the socials were cut off at the bottom
  (June 2026 client bug report). The fix computes the design-space height
  in JS — innerHeight ÷ zoom = innerHeight × 393 / innerWidth — and keeps
  it in sync as the browser chrome collapses/expands.
*/
function MobileMenu({ onClose }: { onClose: () => void }) {
  const [overlayH, setOverlayH] = useState<number | null>(null);
  useLayoutEffect(() => {
    const update = () =>
      setOverlayH((window.innerHeight * 393) / window.innerWidth);
    update();
    window.addEventListener("resize", update);
    window.visualViewport?.addEventListener("resize", update);
    return () => {
      window.removeEventListener("resize", update);
      window.visualViewport?.removeEventListener("resize", update);
    };
  }, []);
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      className="fixed inset-x-0 top-0 z-[60]"
      style={{
        backgroundColor: "#fff7f4",
        height: overlayH !== null ? `${overlayH}px` : "100dvh",
      }}
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
        style={{ top: 140, gap: 61, transform: "translateX(-50%)" }}
      >
        <Link href="/" aria-label="SMUR — home" onClick={onClose}>
          <Image
            src="/figma-assets/mobile/smur-logo.svg"
            alt="SMUR."
            width={86}
            height={19}
            unoptimized
            className="block"
            style={{ width: 85.5, height: "auto" }}
          />
        </Link>
        {nav.links.map((l) => {
          // Shared nav.links target the desktop section ids (#brand-identity,
          // #about), which are display:none on mobile. Point same-page hash
          // links at the mobile (m-) sections so they scroll to the right place.
          const href = l.href.startsWith("/#")
            ? `/#m-${l.href.slice(2)}`
            : l.href;
          return (
            <Link
              key={l.href}
              href={href}
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
          );
        })}
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
        <a
          href={contactFAQ.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-opacity hover:opacity-70"
        >
          INSTAGRAM
        </a>
        &nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;
        <a
          href={contactFAQ.pinterestUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-opacity hover:opacity-70"
        >
          PINTEREST
        </a>
      </p>
    </div>
  );
}
