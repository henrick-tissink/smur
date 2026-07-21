import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MobileMenu } from "@/components/navigation/mobile-menu";
import { nav } from "@/content/home";

describe("MobileMenu", () => {
  it("is a modal dialog", () => {
    render(<MobileMenu onClose={() => {}} />);
    expect(screen.getByRole("dialog")).toHaveAttribute("aria-modal", "true");
  });

  it("closes when the close button is clicked", async () => {
    const onClose = vi.fn();
    render(<MobileMenu onClose={onClose} />);
    await userEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("renders all nav links and calls onClose when one is followed", async () => {
    const onClose = vi.fn();
    render(<MobileMenu onClose={onClose} />);
    for (const link of nav.links) {
      expect(screen.getByRole("link", { name: link.label })).toBeInTheDocument();
    }
    await userEvent.click(screen.getByRole("link", { name: nav.links[1].label }));
    expect(onClose).toHaveBeenCalled();
  });

  it("rewrites same-page hash links to their mobile (m-) section ids", () => {
    render(<MobileMenu onClose={() => {}} />);
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
    render(<MobileMenu onClose={() => {}} />);
    expect(screen.getByRole("link", { name: "INSTAGRAM" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "PINTEREST" })).toBeInTheDocument();
  });

  it("calls onClose when Escape is pressed", async () => {
    const onClose = vi.fn();
    render(<MobileMenu onClose={onClose} />);
    await userEvent.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("locks body scroll while mounted and restores it on unmount", () => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "auto";

    const { unmount } = render(<MobileMenu onClose={() => {}} />);
    expect(document.body.style.overflow).toBe("hidden");

    unmount();
    expect(document.body.style.overflow).not.toBe("hidden");
    expect(document.body.style.overflow).toBe("auto");

    document.body.style.overflow = previousOverflow;
  });
});
