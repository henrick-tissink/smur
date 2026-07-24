import { describe, it, expect } from "vitest";
import sitemap from "./sitemap";
import robots from "./robots";
import { SITE_URL } from "@/lib/structured-data";

describe("sitemap (localized)", () => {
  const entries = sitemap();
  const urls = entries.map((e) => e.url);

  it("has one entry per path × locale (13 paths × 3 locales)", () => {
    expect(entries).toHaveLength(39);
  });

  it("serves English at the root and RO/DE under /ro, /de", () => {
    // Home
    expect(urls).toContain(SITE_URL);
    expect(urls).toContain(`${SITE_URL}/ro`);
    expect(urls).toContain(`${SITE_URL}/de`);
    // A case study across locales
    expect(urls).toContain(`${SITE_URL}/work/sws`);
    expect(urls).toContain(`${SITE_URL}/ro/work/sws`);
    expect(urls).toContain(`${SITE_URL}/de/work/sws`);
  });

  it("carries hreflang alternates (en/ro/de + x-default) on every entry", () => {
    for (const e of entries) {
      const langs = e.alternates?.languages ?? {};
      expect(Object.keys(langs).sort()).toEqual(["de", "en", "ro", "x-default"]);
    }
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
