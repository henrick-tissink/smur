import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Nav } from "@/components/navigation/nav";
import { nav } from "@/content/home";

describe("Nav (desktop)", () => {
  it("renders the home-linked wordmark", () => {
    render(<Nav />);
    const home = screen.getByRole("link", { name: /SMUR/i });
    expect(home).toHaveAttribute("href", "/#home");
    expect(screen.getByRole("img", { name: "SMUR" })).toBeInTheDocument();
  });

  it("renders every nav link with its verbatim label and href", () => {
    render(<Nav />);
    for (const link of nav.links) {
      const el = screen.getByRole("link", { name: link.label });
      expect(el).toHaveAttribute("href", link.href);
    }
  });

  it("uses cream text on the light scheme", () => {
    const { container } = render(<Nav scheme="light" />);
    expect(container.querySelector("[data-nav-text]")).toHaveStyle({
      color: "var(--color-cream)",
    });
  });

  it("uses ink text on the dark scheme (default)", () => {
    const { container } = render(<Nav />);
    expect(container.querySelector("[data-nav-text]")).toHaveStyle({
      color: "var(--color-ink)",
    });
  });
});
