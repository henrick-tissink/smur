import { describe, it, expect } from "vitest";
import { renderWithIntl } from "@/lib/test-intl";
import Home from "./page";

// Home is an async server component (awaits params, calls setRequestLocale);
// call it to get its JSX, then render that inside the intl provider.
const renderHome = async () =>
  renderWithIntl(await Home({ params: Promise.resolve({ locale: "en" }) }));

describe("Home page (faithful-fluid)", () => {
  it("renders both the desktop tree (#home, #about) and the mobile tree (#m-home, #m-about)", async () => {
    const { container } = await renderHome();
    expect(container.querySelector("#home")).toBeInTheDocument();
    expect(container.querySelector("#about")).toBeInTheDocument();
    expect(container.querySelector("#m-home")).toBeInTheDocument();
    expect(container.querySelector("#m-about")).toBeInTheDocument();
  });

  it("never duplicates a desktop id (mobile tree uses distinct m- ids)", async () => {
    const { container } = await renderHome();
    expect(container.querySelectorAll("#home").length).toBe(1);
    expect(container.querySelectorAll("#about").length).toBe(1);
  });

  it("does not use zoom or transform:scale canvas wrappers", async () => {
    const { container } = await renderHome();
    const all = container.querySelectorAll<HTMLElement>("*");
    for (const el of all) {
      expect(el.getAttribute("style") ?? "").not.toMatch(/zoom/);
      expect(el.style.transform).not.toMatch(/scale/);
    }
  });
});
