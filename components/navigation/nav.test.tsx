import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithIntl } from "@/lib/test-intl";
import { Nav } from "@/components/navigation/nav";
import { nav } from "@/content/home";

describe("Nav (desktop)", () => {
  it("renders the home-linked wordmark", () => {
    renderWithIntl(<Nav />);
    const home = screen.getByRole("link", { name: /SMUR/i });
    expect(home).toHaveAttribute("href", "/#home");
    expect(screen.getByRole("img", { name: "SMUR" })).toBeInTheDocument();
  });

  it("renders every nav link with its verbatim label and href", () => {
    renderWithIntl(<Nav />);
    for (const link of nav.links) {
      const el = screen.getByRole("link", { name: link.label });
      expect(el).toHaveAttribute("href", link.href);
    }
  });

  it("uses cream text on the light scheme", () => {
    const { container } = renderWithIntl(<Nav scheme="light" />);
    expect(container.querySelector("[data-nav-text]")).toHaveStyle({
      color: "var(--color-cream)",
    });
  });

  it("uses ink text on the dark scheme (default)", () => {
    const { container } = renderWithIntl(<Nav />);
    expect(container.querySelector("[data-nav-text]")).toHaveStyle({
      color: "var(--color-ink)",
    });
  });
});
