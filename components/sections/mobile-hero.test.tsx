import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { MobileHero } from "@/components/sections/mobile-hero";

describe("MobileHero", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("renders the #home hero with headline and body", () => {
    const { container } = render(<MobileHero />);
    expect(container.querySelector("section#home")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/who you are/i)).toBeInTheDocument();
  });

  it("uses a fluid aspect-ratio stage", () => {
    const { container } = render(<MobileHero />);
    const stage = container.querySelector("[data-hero-stage]") as HTMLElement;
    expect(stage.style.aspectRatio.replace(/\s/g, "")).toBe("393/852");
    expect(stage.style.containerType).toBe("inline-size");
  });

  it("cycles feature frames on the interval without crashing", () => {
    render(<MobileHero />);
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });
});
