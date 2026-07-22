import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactHero } from "@/components/sections/contact-hero";

const STAGE_W = 1440;
const STAGE_H = 812;
const pctX = (px: number) => `${(px / STAGE_W) * 100}%`;
const pctY = (px: number) => `${(px / STAGE_H) * 100}%`;

describe("ContactHero (desktop)", () => {
  it("renders the section with the light nav scheme", () => {
    const { container } = render(<ContactHero />);
    const section = container.querySelector("section") as HTMLElement;
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute("data-nav-scheme", "light");
  });

  it("renders the heading and the body copy", () => {
    render(<ContactHero />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/thoughtful investment/i)).toBeInTheDocument();
  });

  it("uses a fluid aspect-ratio stage (no zoom) with visible overflow for the carousel overlap", () => {
    const { container } = render(<ContactHero />);
    const stage = container.querySelector(
      "[data-contact-hero-stage]",
    ) as HTMLElement;
    expect(stage).toBeInTheDocument();
    expect(stage.style.aspectRatio.replace(/\s/g, "")).toBe("1440/812");
    expect(stage.style.containerType).toBe("inline-size");
    expect(stage.style.overflow).toBe("visible");
  });

  it("positions the LAVABO carousel and scroll arrow against the stage (direct children, containing-block rule)", () => {
    const { container } = render(<ContactHero />);
    const carousel = container.querySelector(
      "[data-lavabo-carousel]",
    ) as HTMLElement;
    const arrow = container.querySelector("[data-scroll-cue]") as HTMLElement;
    expect(carousel).toBeInTheDocument();
    expect(arrow).toBeInTheDocument();
    // Figma-absolute coords (1066/642 carousel, 684/642 arrow) of the
    // 1440×812 stage — correct only if these are positioned against the
    // stage itself, not nested inside another absolutely-positioned box.
    expect(carousel.style.left).toBe(pctX(1066));
    expect(carousel.style.top).toBe(pctY(642));
    expect(arrow.style.left).toBe(pctX(684));
    expect(arrow.style.top).toBe(pctY(642));
    // 3 lavabo frames present, crossfading
    expect(container.querySelectorAll("[data-lavabo-frame]").length).toBe(3);
  });
});
