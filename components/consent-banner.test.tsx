import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ConsentBanner } from "./consent-banner";

function consentUpdates() {
  const dl = (window as unknown as { dataLayer: IArguments[] }).dataLayer || [];
  return dl.filter((e) => e[0] === "consent" && e[1] === "update");
}

describe("ConsentBanner", () => {
  beforeEach(() => {
    localStorage.clear();
    (window as unknown as { dataLayer: unknown[] }).dataLayer = [];
  });

  it("shows Accept + Decline when there is no prior choice", () => {
    render(<ConsentBanner />);
    expect(screen.getByRole("region", { name: /cookie consent/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /accept/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /decline/i })).toBeInTheDocument();
  });

  it("Accept stores granted, updates consent to granted, and hides", async () => {
    render(<ConsentBanner />);
    await userEvent.click(screen.getByRole("button", { name: /accept/i }));
    expect(localStorage.getItem("smur-consent")).toBe("granted");
    expect(
      consentUpdates().some((e) => e[2]?.analytics_storage === "granted"),
    ).toBe(true);
    expect(screen.queryByRole("region", { name: /cookie consent/i })).toBeNull();
  });

  it("Decline stores denied and hides (no grant)", async () => {
    render(<ConsentBanner />);
    await userEvent.click(screen.getByRole("button", { name: /decline/i }));
    expect(localStorage.getItem("smur-consent")).toBe("denied");
    expect(
      consentUpdates().some((e) => e[2]?.analytics_storage === "granted"),
    ).toBe(false);
    expect(screen.queryByRole("region", { name: /cookie consent/i })).toBeNull();
  });

  it("stays hidden and does not re-grant when a prior 'denied' exists", () => {
    localStorage.setItem("smur-consent", "denied");
    render(<ConsentBanner />);
    expect(screen.queryByRole("region", { name: /cookie consent/i })).toBeNull();
    expect(consentUpdates()).toHaveLength(0);
  });

  it("re-grants without a banner for a returning visitor who accepted", () => {
    localStorage.setItem("smur-consent", "granted");
    render(<ConsentBanner />);
    expect(screen.queryByRole("region", { name: /cookie consent/i })).toBeNull();
    expect(
      consentUpdates().some((e) => e[2]?.analytics_storage === "granted"),
    ).toBe(true);
  });
});
