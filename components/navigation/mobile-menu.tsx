"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Wordmark, Icon } from "@/components/core";
import { nav } from "@/content/home";
import { contactFAQ } from "@/content/contact";

/*
  Fullscreen menu overlay (Figma 282:40808). Faithful-fluid: plain
  `fixed inset-0` over the real viewport — no zoom wrapper, so none of the old
  innerHeight×393/innerWidth compensation is needed.

  Accessible modal: role=dialog + aria-modal, Escape to close, body-scroll
  lock, and a full focus trap — focus moves into the dialog on open, Tab
  cycles within it, and focus returns to the triggering element on close.
*/
export function MobileMenu({ onClose }: { onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    // Remember what had focus (the hamburger trigger) so we can restore it.
    const previouslyFocused = document.activeElement as HTMLElement | null;

    const focusable = () =>
      dialog
        ? [
            ...dialog.querySelectorAll<HTMLElement>(
              'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
            ),
          ]
        : [];

    // Move focus into the dialog on open.
    (focusable()[0] ?? dialog)?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const items = focusable();
      if (items.length === 0) {
        // Nothing focusable but the dialog — keep focus on it.
        event.preventDefault();
        dialog?.focus();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;
      const inside = !!dialog && dialog.contains(active);

      if (event.shiftKey) {
        if (!inside || active === first) {
          event.preventDefault();
          last.focus();
        }
      } else if (!inside || active === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      // Restore focus to the trigger on close.
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      tabIndex={-1}
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
        <Link href="/#m-home" aria-label="SMUR — home" onClick={onClose}>
          <Wordmark width={86} height={19} />
        </Link>
        {nav.links.map((link) => {
          // Shared nav.links target the desktop section ids (#brand-identity,
          // #about), which are display:none on mobile. Point same-page hash
          // links at the mobile (m-) sections so they scroll to the right
          // place — mirrors legacy components/mobile/nav.tsx MobileMenu.
          const href = link.href.startsWith("/#")
            ? `/#m-${link.href.slice(2)}`
            : link.href;
          return (
            <Link
              key={link.href}
              href={href}
              onClick={onClose}
              className="block text-center uppercase transition-opacity hover:opacity-70"
              style={{ fontFamily: "var(--font-body)", fontSize: `${nav.fontSize}px` }}
            >
              {link.label}
            </Link>
          );
        })}
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
