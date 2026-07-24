import { describe, it, expect } from "vitest";
import { renderWithIntl } from "@/lib/test-intl";
import Home from "./page";

describe("Home page (faithful-fluid)", () => {
  it("renders both the desktop tree (#home, #about) and the mobile tree (#m-home, #m-about)", () => {
    const { container } = renderWithIntl(<Home />);
    expect(container.querySelector("#home")).toBeInTheDocument();
    expect(container.querySelector("#about")).toBeInTheDocument();
    expect(container.querySelector("#m-home")).toBeInTheDocument();
    expect(container.querySelector("#m-about")).toBeInTheDocument();
  });

  it("never duplicates a desktop id (mobile tree uses distinct m- ids)", () => {
    const { container } = renderWithIntl(<Home />);
    expect(container.querySelectorAll("#home").length).toBe(1);
    expect(container.querySelectorAll("#about").length).toBe(1);
  });

  it("does not use zoom or transform:scale canvas wrappers", () => {
    const { container } = renderWithIntl(<Home />);
    const all = container.querySelectorAll<HTMLElement>("*");
    for (const el of all) {
      expect(el.getAttribute("style") ?? "").not.toMatch(/zoom/);
      expect(el.style.transform).not.toMatch(/scale/);
    }
  });
});
