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
