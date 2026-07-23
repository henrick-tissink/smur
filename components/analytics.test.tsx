import { describe, it, expect, afterEach, vi } from "vitest";
import { render } from "@testing-library/react";
import { Analytics, resolveGaId, gaInitScript } from "./analytics";

describe("Analytics (GA4)", () => {
  afterEach(() => vi.unstubAllEnvs());

  it("renders nothing when no Measurement ID is configured (safe by default)", () => {
    const { container } = render(<Analytics />);
    expect(container.innerHTML).toBe("");
  });

  it("resolves the id from NEXT_PUBLIC_GA_ID when the constant is empty", () => {
    expect(resolveGaId()).toBe("");
    vi.stubEnv("NEXT_PUBLIC_GA_ID", "G-TEST12345");
    expect(resolveGaId()).toBe("G-TEST12345");
  });

  it("bootstraps consent as denied (cookieless) with anonymised IP", () => {
    const script = gaInitScript("G-TEST12345");
    expect(script).toContain("G-TEST12345");
    // Consent Mode v2 must default to denied → no cookies pre-consent.
    expect(script).toContain("analytics_storage:'denied'");
    expect(script).toContain("ad_storage:'denied'");
    expect(script).toContain("anonymize_ip:true");
  });
});
