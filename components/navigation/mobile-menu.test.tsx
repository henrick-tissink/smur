import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithIntl } from "@/lib/test-intl";
import userEvent from "@testing-library/user-event";
import { MobileMenu } from "@/components/navigation/mobile-menu";
import { nav } from "@/content/home";

describe("MobileMenu", () => {
  it("is a modal dialog", () => {
    renderWithIntl(<MobileMenu onClose={() => {}} />);
    expect(screen.getByRole("dialog")).toHaveAttribute("aria-modal", "true");
  });

  it("closes when the close button is clicked", async () => {
    const onClose = vi.fn();
    renderWithIntl(<MobileMenu onClose={onClose} />);
    await userEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("renders all nav links and calls onClose when one is followed", async () => {
    const onClose = vi.fn();
    renderWithIntl(<MobileMenu onClose={onClose} />);
    for (const link of nav.links) {
      expect(screen.getByRole("link", { name: link.label })).toBeInTheDocument();
    }
    await userEvent.click(screen.getByRole("link", { name: nav.links[1].label }));
    expect(onClose).toHaveBeenCalled();
  });

  it("rewrites same-page hash links to their mobile (m-) section ids", () => {
    renderWithIntl(<MobileMenu onClose={() => {}} />);
    // ABOUT (/#about in shared nav content) must target the mobile section.
    const about = nav.links.find((l) => l.href.startsWith("/#") && l.href.includes("about"));
    expect(about).toBeDefined();
    expect(screen.getByRole("link", { name: about!.label })).toHaveAttribute(
      "href",
      `/#m-${about!.href.slice(2)}`,
    );
    // Non-hash links (e.g. /work, /contact) stay unchanged.
    const nonHash = nav.links.find((l) => !l.href.startsWith("/#"));
    if (nonHash) {
      expect(screen.getByRole("link", { name: nonHash.label })).toHaveAttribute("href", nonHash.href);
    }
  });

  it("renders the social links", () => {
    renderWithIntl(<MobileMenu onClose={() => {}} />);
    expect(screen.getByRole("link", { name: "INSTAGRAM" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "PINTEREST" })).toBeInTheDocument();
  });

  it("calls onClose when Escape is pressed", async () => {
    const onClose = vi.fn();
    renderWithIntl(<MobileMenu onClose={onClose} />);
    await userEvent.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("moves focus into the dialog when opened", () => {
    renderWithIntl(<MobileMenu onClose={() => {}} />);
    const dialog = screen.getByRole("dialog");
    expect(dialog.contains(document.activeElement)).toBe(true);
  });

  it("returns focus to the previously focused trigger on unmount", () => {
    const trigger = document.createElement("button");
    document.body.appendChild(trigger);
    trigger.focus();
    expect(document.activeElement).toBe(trigger);

    const { unmount } = renderWithIntl(<MobileMenu onClose={() => {}} />);
    // focus moved into the dialog
    expect(document.activeElement).not.toBe(trigger);

    unmount();
    // focus returned to the trigger
    expect(document.activeElement).toBe(trigger);
    trigger.remove();
  });

  it("traps Tab focus within the dialog (wraps last → first)", async () => {
    renderWithIntl(<MobileMenu onClose={() => {}} />);
    const dialog = screen.getByRole("dialog");
    const focusables = [
      ...dialog.querySelectorAll<HTMLElement>("a[href], button"),
    ];
    const last = focusables[focusables.length - 1];
    last.focus();
    expect(document.activeElement).toBe(last);

    await userEvent.tab();
    // stays inside the dialog, wrapped to the first focusable
    expect(dialog.contains(document.activeElement)).toBe(true);
    expect(document.activeElement).toBe(focusables[0]);
  });

  it("traps Shift+Tab focus within the dialog (wraps first → last)", async () => {
    renderWithIntl(<MobileMenu onClose={() => {}} />);
    const dialog = screen.getByRole("dialog");
    const focusables = [
      ...dialog.querySelectorAll<HTMLElement>("a[href], button"),
    ];
    const first = focusables[0];
    first.focus();
    expect(document.activeElement).toBe(first);

    await userEvent.tab({ shift: true });
    expect(dialog.contains(document.activeElement)).toBe(true);
    expect(document.activeElement).toBe(focusables[focusables.length - 1]);
  });

  it("locks body scroll while mounted and restores it on unmount", () => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "auto";

    const { unmount } = renderWithIntl(<MobileMenu onClose={() => {}} />);
    expect(document.body.style.overflow).toBe("hidden");

    unmount();
    expect(document.body.style.overflow).not.toBe("hidden");
    expect(document.body.style.overflow).toBe("auto");

    document.body.style.overflow = previousOverflow;
  });
});
