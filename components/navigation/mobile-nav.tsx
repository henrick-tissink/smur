"use client";

import Link from "next/link";
import { useState } from "react";
import { Wordmark, Icon } from "@/components/core";
import { MobileMenu } from "./mobile-menu";

/*
  Mobile nav bar (Figma 268:31918) — non-sticky. Wordmark + hamburger; both
  inherit the bar's `scheme` color (mask tint + Icon currentColor), so no
  per-asset filter is needed. Tapping the hamburger opens MobileMenu.
*/
export function MobileNav({ scheme = "dark" }: { scheme?: "light" | "dark" }) {
  const [open, setOpen] = useState(false);
  const color = scheme === "light" ? "var(--color-cream)" : "var(--color-ink)";
  return (
    <>
      <header
        aria-label="Primary"
        className="absolute inset-x-0 top-0 z-50 flex items-center justify-between px-[26px] pt-[32px]"
        style={{ color }}
      >
        <Link href="/#home" aria-label="SMUR — home" className="block">
          <Wordmark src="/figma-assets/mobile/smur-logo.svg" width={85.5} height={19} />
        </Link>
        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          <Icon name="hamburger" size={28} title="menu" />
        </button>
      </header>
      {open && <MobileMenu onClose={() => setOpen(false)} />}
    </>
  );
}
