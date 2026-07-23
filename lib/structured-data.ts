/*
  Sitewide JSON-LD structured data. Rendered once in the root layout so search
  engines get an explicit, machine-readable description of the studio (name,
  logo, socials, founder, languages). Per-project CreativeWork schema can be
  added on individual /work/<slug> pages later.

  NOTE for future edits: a few fields are best confirmed with Smaranda —
  `alternateName`, `founder.name` (full name), and whether to add an
  `address`/`areaServed` for local signals. Left conservative for now.
*/

export const SITE_URL = "https://smur-world.com";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "ProfessionalService"],
  "@id": `${SITE_URL}/#organization`,
  name: "SMUR",
  alternateName: "SMUR Studio",
  url: SITE_URL,
  logo: `${SITE_URL}/figma-assets/smur-logo.svg`,
  image: `${SITE_URL}/figma-assets/smur-logo.svg`,
  email: "hello@smur-world.com",
  description:
    "SMUR is an independent studio for naming, brand identity and design — creating honest, grounded identities for the people behind the business.",
  slogan: "Naming, branding & design that builds good stories.",
  founder: { "@type": "Person", name: "Smaranda" },
  knowsLanguage: ["en", "ro", "de"],
  areaServed: "Worldwide",
  sameAs: [
    "https://www.instagram.com/smurstudio/",
    "https://ro.pinterest.com/smurstudio/",
  ],
} as const;
