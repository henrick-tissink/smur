import { describe, it, expect } from "vitest";
import { renderWithIntl } from "@/lib/test-intl";
import ContactRoute from "./page";

describe("Contact page (faithful-fluid)", () => {
  it("renders both a desktop hero heading and a mobile hero heading", async () => {
    const { container } = renderWithIntl(
      await ContactRoute({ params: Promise.resolve({ locale: "en" }) }),
    );
    // ContactHero and MobileContactHero both render their title via
    // TitleMask as={1} -> <h1>. One per tree.
    expect(container.querySelectorAll("h1").length).toBe(2);
  });

  it("wires the form into the assembled page (email input + SAVE & SEND button, both trees)", async () => {
    const { container } = renderWithIntl(
      await ContactRoute({ params: Promise.resolve({ locale: "en" }) }),
    );
    const emailInputs = container.querySelectorAll('input[name="email"]');
    expect(emailInputs.length).toBe(2); // desktop + mobile

    const buttons = Array.from(container.querySelectorAll("button")).filter(
      (b) => b.textContent?.includes("SAVE & SEND"),
    );
    expect(buttons.length).toBe(2); // desktop + mobile
  });

  it("does not use zoom or transform:scale canvas wrappers", async () => {
    const { container } = renderWithIntl(
      await ContactRoute({ params: Promise.resolve({ locale: "en" }) }),
    );
    const all = container.querySelectorAll<HTMLElement>("*");
    for (const el of all) {
      expect(el.getAttribute("style") ?? "").not.toMatch(/zoom/);
      expect(el.style.transform).not.toMatch(/scale/);
    }
  });
});
