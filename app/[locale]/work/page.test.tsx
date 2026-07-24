import { describe, it, expect } from "vitest";
import { renderWithIntl } from "@/lib/test-intl";
import WorkRoute from "./page";

describe("Work page (faithful-fluid)", () => {
  it("renders both the desktop stage (1440/5187) and the mobile stage (393/2309)", () => {
    const { container } = renderWithIntl(<WorkRoute />);
    const stages = container.querySelectorAll<HTMLElement>("[data-work-stage]");
    expect(stages.length).toBe(2);

    const ratios = Array.from(stages).map((el) => el.style.aspectRatio);
    expect(ratios).toContain("1440 / 5187");
    expect(ratios).toContain("393 / 2309");
  });

  it("renders a level-1 heading", () => {
    const { container } = renderWithIntl(<WorkRoute />);
    expect(container.querySelectorAll("h1").length).toBeGreaterThan(0);
  });

  it("does not use zoom or transform:scale canvas wrappers", () => {
    const { container } = renderWithIntl(<WorkRoute />);
    const all = container.querySelectorAll<HTMLElement>("*");
    for (const el of all) {
      expect(el.getAttribute("style") ?? "").not.toMatch(/zoom/);
      expect(el.style.transform).not.toMatch(/scale/);
    }
  });
});
