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
    // The active slide is the one whose <Image> has a non-empty `alt`
    // (the component sets alt={active ? s.alt : ""} on every other slide).
    // Asserting the active alt actually changes proves the interval is
    // driving `setIndex` — asserting "exactly one .opacity-100" would pass
    // even with a dead interval, since exactly one slide is always active.
    const { container } = render(<HeroCarousel />);
    const getActiveAlt = () =>
      container.querySelector("img[alt]:not([alt=''])")?.getAttribute("alt");

    const firstAlt = getActiveAlt();
    expect(firstAlt).toBeTruthy();

    act(() => { vi.advanceTimersByTime(1000); });
    const secondAlt = getActiveAlt();
    expect(secondAlt).toBeTruthy();
    expect(secondAlt).not.toBe(firstAlt); // advanced to a different slide

    // Advancing through the remaining slides should wrap back to the first.
    const SLIDE_COUNT = 5;
    act(() => { vi.advanceTimersByTime(1000 * (SLIDE_COUNT - 1)); });
    expect(getActiveAlt()).toBe(firstAlt);
  });
});
