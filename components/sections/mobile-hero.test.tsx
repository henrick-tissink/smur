import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { MobileHero } from "@/components/sections/mobile-hero";

describe("MobileHero", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("renders the #m-home hero with headline and body", () => {
    const { container } = render(<MobileHero />);
    expect(container.querySelector("section#m-home")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/who you are/i)).toBeInTheDocument();
  });

  it("uses a fluid aspect-ratio stage", () => {
    const { container } = render(<MobileHero />);
    const stage = container.querySelector("[data-hero-stage]") as HTMLElement;
    expect(stage.style.aspectRatio.replace(/\s/g, "")).toBe("393/852");
    expect(stage.style.containerType).toBe("inline-size");
  });

  it("cycles feature frames on the interval, advancing the active tile", () => {
    // HERO_FRAMES is 6 long: [interstellar, empty, empty, kokop, crisp, taf].
    // The active tile is the <Link> with aria-hidden="false"; empty beats
    // (frames 1 & 2) render no active tile at all. Track the active tile's
    // aria-label across ticks to prove the interval is actually advancing
    // `index` (a smoke "didn't crash" assertion would pass even if the
    // interval were dead).
    const { container } = render(<MobileHero />);
    const getActiveLabel = () =>
      container.querySelector('a[aria-hidden="false"]')?.getAttribute("aria-label");

    // index 0: interstellar tile active.
    expect(getActiveLabel()).toBe("INTERSTELLAR feature");

    // index 1: first empty beat — no tile is active.
    act(() => { vi.advanceTimersByTime(1000); });
    expect(container.querySelector('a[aria-hidden="false"]')).toBeNull();

    // index 2: second empty beat — still no active tile.
    act(() => { vi.advanceTimersByTime(1000); });
    expect(container.querySelector('a[aria-hidden="false"]')).toBeNull();

    // index 3: kokop tile active — a different, real tile from the start.
    act(() => { vi.advanceTimersByTime(1000); });
    expect(getActiveLabel()).toBe("KOKOP feature");

    // index 4: crisp tile active — changed again.
    act(() => { vi.advanceTimersByTime(1000); });
    expect(getActiveLabel()).toBe("CRISP feature");

    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });
});
