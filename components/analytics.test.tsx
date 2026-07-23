import { describe, it, expect } from "vitest";
import { resolveGaId, gaInitScript } from "./analytics";

describe("Analytics (GA4)", () => {
  it("is configured with the SMUR Measurement ID", () => {
    expect(resolveGaId()).toBe("G-K92NEEB7EY");
  });

  it("bootstraps consent as denied (cookieless) with anonymised IP", () => {
    const script = gaInitScript(resolveGaId());
    expect(script).toContain("G-K92NEEB7EY");
    // Consent Mode v2 must default to denied → no cookies before consent.
    expect(script).toContain("analytics_storage:'denied'");
    expect(script).toContain("ad_storage:'denied'");
    expect(script).toContain("anonymize_ip:true");
  });
});
