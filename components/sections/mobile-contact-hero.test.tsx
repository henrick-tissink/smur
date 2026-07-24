import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithIntl } from "@/lib/test-intl";
import { MobileContactHero } from "@/components/sections/mobile-contact-hero";

describe("MobileContactHero", () => {
  it("renders the section with the light nav scheme", () => {
    const { container } = renderWithIntl(<MobileContactHero />);
    const section = container.querySelector("section") as HTMLElement;
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute("data-nav-scheme", "light");
  });

  it("uses a fluid 393/866 aspect-ratio stage (no zoom), overflow visible", () => {
    const { container } = renderWithIntl(<MobileContactHero />);
    const stage = container.querySelector(
      "[data-mobile-contact-hero-stage]",
    ) as HTMLElement;
    expect(stage).toBeInTheDocument();
    expect(stage.style.aspectRatio.replace(/\s/g, "")).toBe("393/866");
    expect(stage.style.containerType).toBe("inline-size");
    expect(stage.style.overflow).toBe("visible");
  });

  it("renders the heading and the body copy", () => {
    renderWithIntl(<MobileContactHero />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/thoughtful investment/i)).toBeInTheDocument();
  });

  it("renders the bouncing down arrow as a direct child of the stage", () => {
    const { container } = renderWithIntl(<MobileContactHero />);
    const stage = container.querySelector(
      "[data-mobile-contact-hero-stage]",
    ) as HTMLElement;
    const arrow = stage.querySelector(
      "[data-scroll-cue]",
    ) as HTMLElement;
    expect(arrow).toBeInTheDocument();
    expect(arrow.parentElement).toBe(stage);
  });

  it("does NOT render a LAVABO carousel on mobile (only the left thumb)", () => {
    const { container } = renderWithIntl(<MobileContactHero />);
    expect(container.querySelector("[data-lavabo-carousel]")).toBeNull();
  });
});
