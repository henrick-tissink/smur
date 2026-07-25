import { describe, it, expect } from "vitest";
import sitemap from "./sitemap";
import robots from "./robots";
import { SITE_URL } from "@/lib/structured-data";

describe("sitemap", () => {
  const urls = sitemap().map((e) => e.url);

  it("lists the home, work, contact and all 10 case-study routes", () => {
    expect(urls).toContain(SITE_URL);
    expect(urls).toContain(`${SITE_URL}/work`);
    expect(urls).toContain(`${SITE_URL}/contact`);
    for (const slug of [
      "sws", "mnf", "taf", "lavabo", "crisp",
      "kabinett", "interstellar", "iwl", "kokop", "architrave",
    ]) {
      expect(urls).toContain(`${SITE_URL}/work/${slug}`);
    }
    expect(urls).toHaveLength(13);
  });

  it("never exposes the internal /specimen gallery", () => {
    expect(urls.some((u) => u.includes("/specimen"))).toBe(false);
  });

  it("uses absolute https URLs on the production domain", () => {
    expect(urls.every((u) => u.startsWith("https://smur-world.com"))).toBe(true);
  });
});

describe("robots", () => {
  it("blocks /specimen and /api and points at the sitemap", () => {
    const r = robots();
    const rule = Array.isArray(r.rules) ? r.rules[0] : r.rules;
    expect(rule?.disallow).toContain("/specimen");
    expect(rule?.disallow).toContain("/api/");
    expect(r.sitemap).toBe(`${SITE_URL}/sitemap.xml`);
  });
});
