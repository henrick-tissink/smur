import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithIntl } from "@/lib/test-intl";
import userEvent from "@testing-library/user-event";
import { MobileNav } from "@/components/navigation/mobile-nav";

describe("MobileNav", () => {
  it("renders the home-linked wordmark and a menu button", () => {
    renderWithIntl(<MobileNav />);
    expect(screen.getByRole("link", { name: /SMUR/i })).toHaveAttribute("href", "/#m-home");
    expect(screen.getByRole("button", { name: /open menu/i })).toBeInTheDocument();
  });

  it("menu is closed initially", () => {
    renderWithIntl(<MobileNav />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /open menu/i })).toHaveAttribute("aria-expanded", "false");
  });

  it("opens the menu when the hamburger is tapped", async () => {
    renderWithIntl(<MobileNav />);
    await userEvent.click(screen.getByRole("button", { name: /open menu/i }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});
