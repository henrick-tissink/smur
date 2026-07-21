"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Wordmark, Icon } from "@/components/core";
import { nav } from "@/content/home";
import { contactFAQ } from "@/content/contact";

/*
  Fullscreen menu overlay (Figma 282:40808). Faithful-fluid: plain
  `fixed inset-0` over the real viewport — no zoom wrapper, so none of the old
  innerHeight×393/innerWidth compensation is needed.
*/
export function MobileMenu({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    // TODO: full focus-trap (move focus into dialog on open, return to trigger on close)
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      className="fixed inset-0 z-[60] flex flex-col items-center"
      style={{ backgroundColor: "var(--color-cream)", color: "var(--color-ink)" }}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close menu"
        className="absolute right-[30px] top-[40px]"
      >
        <Icon name="close" size={22} title="close" />
      </button>

      <div
        className="flex flex-col items-center"
        style={{ marginTop: "clamp(96px, 20vh, 160px)", gap: "61px" }}
      >
        <Link href="/#home" aria-label="SMUR — home" onClick={onClose}>
          <Wordmark width={86} height={19} />
        </Link>
        {nav.links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="block text-center uppercase transition-opacity hover:opacity-70"
            style={{ fontFamily: "var(--font-body)", fontSize: `${nav.fontSize}px` }}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <p
        className="absolute bottom-[67px] text-center italic"
        style={{ fontFamily: "var(--font-body)", fontSize: "15px" }}
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
