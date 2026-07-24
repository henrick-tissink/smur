import { describe, it, expect } from "vitest";
import { renderWithIntl } from "@/lib/test-intl";
import WorkRoute from "./page";

describe("Work page (faithful-fluid)", () => {
  it("renders both the desktop stage (1440/5187) and the mobile stage (393/2309)", async () => {
    const { container } = renderWithIntl(
      await WorkRoute({ params: Promise.resolve({ locale: "en" }) }),
    );
    const stages = container.querySelectorAll<HTMLElement>("[data-work-stage]");
    expect(stages.length).toBe(2);

    const ratios = Array.from(stages).map((el) => el.style.aspectRatio);
    expect(ratios).toContain("1440 / 5187");
    expect(ratios).toContain("393 / 2309");
  });

  it("renders a level-1 heading", async () => {
    const { container } = renderWithIntl(
      await WorkRoute({ params: Promise.resolve({ locale: "en" }) }),
    );
    expect(container.querySelectorAll("h1").length).toBeGreaterThan(0);
  });

  it("does not use zoom or transform:scale canvas wrappers", async () => {
    const { container } = renderWithIntl(
      await WorkRoute({ params: Promise.resolve({ locale: "en" }) }),
    );
    const all = container.querySelectorAll<HTMLElement>("*");
    for (const el of all) {
      expect(el.getAttribute("style") ?? "").not.toMatch(/zoom/);
      expect(el.style.transform).not.toMatch(/scale/);
    }
  });
});
