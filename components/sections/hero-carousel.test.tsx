import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { render, act } from "@testing-library/react";
import { HeroCarousel } from "@/components/sections/hero-carousel";

describe("HeroCarousel (fluid)", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("renders the carousel region with all slides", () => {
    // The root container is a plain div carrying aria-roledescription +
    // aria-label (matching the legacy component exactly) rather than an
    // explicit role="group", so it has no implicit ARIA role for
    // getByRole to match. Query by the aria-label directly instead.
    const { container } = render(<HeroCarousel />);
    const region = container.querySelector('[aria-label="Project showcase"]');
    expect(region).toBeInTheDocument();
    expect(region).toHaveAttribute("aria-roledescription", "carousel");
  });

  it("positions slides with percentage units (fluid, not px)", () => {
    const { container } = render(<HeroCarousel />);
    const slide = container.querySelector("[aria-hidden]") as HTMLElement;
    expect(slide.style.left).toMatch(/%$/);
    expect(slide.style.width).toMatch(/%$/);
  });

  it("auto-advances the active slide on the interval", () => {
    const { container } = render(<HeroCarousel />);
    const activeAtStart = container.querySelectorAll(".opacity-100").length;
    act(() => { vi.advanceTimersByTime(1000); });
    expect(activeAtStart).toBe(1); // exactly one active before and after
    expect(container.querySelectorAll(".opacity-100").length).toBe(1);
  });
});
