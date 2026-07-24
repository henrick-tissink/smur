import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithIntl } from "@/lib/test-intl";
import { Hero } from "@/components/sections/hero";

describe("Hero (desktop)", () => {
  it("renders as the #home section with the hero ground", () => {
    const { container } = renderWithIntl(<Hero />);
    const section = container.querySelector("section#home") as HTMLElement;
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute("data-nav-scheme", "light");
  });

  it("renders the headline (accessible) and the body copy", () => {
    renderWithIntl(<Hero />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/Branding is not just aesthetics/i)).toBeInTheDocument();
    expect(screen.getByText(/who you are/i)).toBeInTheDocument();
  });

  it("uses a fluid aspect-ratio stage (no zoom)", () => {
    const { container } = renderWithIntl(<Hero />);
    const stage = container.querySelector("[data-hero-stage]") as HTMLElement;
    expect(stage.style.aspectRatio.replace(/\s/g, "")).toBe("1440/869");
    expect(stage.style.containerType).toBe("inline-size");
  });
});
