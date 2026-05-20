# SMUR — Home Page Design Spec

**Source:** Figma file `UGvU1B8yP5Pa7vQmneV0Cz` (SMUR WEB Copy), page `all pages desktop`, frame `HOME` (`1:2`), 1440×5187.

## Goal

Implement the SMUR Home page (a branding/design studio portfolio) as a production-grade Next.js application that mirrors the Figma design.

## Stack

- **Next.js 15** (App Router) + **TypeScript** — file-based routing, server-first by default, image optimization built in
- **Tailwind CSS v4** — utility-first styling, native CSS-vars based theming, design tokens lifted from Figma
- **Framer Motion** — subtle scroll-in animations (fade/slide on section entry; respects `prefers-reduced-motion`)
- **next/font** — load a serif display face (Fraunces) + a clean sans (Inter) without FOUT
- **next/image** — optimized, responsive imagery for photo strip and service cards

Rejected alternatives:
- *Astro*: leaner for pure static, but we want first-class React for interactive dropdowns and animations
- *Remix/Vite SPA*: no SSG/streaming wins for a portfolio of this shape

## Design Tokens

Pulled from Figma text styles + visual inspection:

```
--bg-page:    #F5F5F5  /* off-white sections */
--bg-hero:    #C9A88C  /* warm beige */
--bg-band:    #3D4A3D  /* dark forest band (testimonial) */
--ink:        #111111
--ink-muted:  #5B5B5B
--accent:     #6B5BE6  /* tag-pill purple seen on labels */

font-serif:   "Fraunces", serif         /* display + section heads */
font-sans:    "Inter", system-ui, sans  /* body + UI */

H1 display:   ~clamp(48px, 7vw, 96px)  serif
H2 section:   ~clamp(40px, 5vw, 72px)  serif
H3 (Figma):   20px/auto
Body:         17px/1.55
Subtitels:    58/121 (large numeric/quote)
Eyebrow:      12px uppercase, letter-spaced
```

## Sections (top → bottom)

| # | Section | Figma node | Notes |
|---|---|---|---|
| 1 | Nav | `Nav Component` (instance) | Fixed top, light on beige. Logo "SMUR." left, links right (HOME / WORK / ABOUT / INFO). |
| 2 | Hero | `HERO` (instance) | Beige bg. Big serif headline "NAMING, BRANDING & DESIGN BUILD GOOD STORIES" left; portrait + thumbnail strip right. |
| 3 | Service: Brand identity | `SERVICES > Frame 26` + `DROP DOWN BRANDING` | Two-column: copy left, image right. Eyebrow "full service", H2 "Brand identity", body, accordion-style DETAILS + TIMELINE dropdowns. |
| 4 | Service: Naming & Positioning | `SERVICES > Frame 22` + `DROP DOWN NAMING` | Two-column reversed: image left ("CRISP"), copy right ("strategy focused" eyebrow, "Naming & Positioning"). |
| 5 | Service: Webdesign, Print & More | `SERVICES > Frame 79` + button | Two-column: copy left with bulleted service list ("Web design", "Digital design deliverables", "Print design deliverables", "Social media visuals", "etc."), CTA button "LET'S WORK TOGETHER →"; image right. |
| 6 | Testimonial | `Frame 31` | Dark forest band. Italic centered quote + attribution line. Decorative chevron carousel arrows (static for v1). |
| 7 | Photo strip | `photos smur` | Four horizontal images, full-bleed row. |
| 8 | About | `about smuriiii` | Massive serif "ABOUT SMA & SMUR." left, bio copy + portrait right, "INSTAGRAM / PINTEREST" link at bottom. |
| 9 | Footer | (not in Figma — minimal) | Thin footer: © year SMUR, contact email link. |

## Components

```
app/
├─ layout.tsx              # font setup, html lang, global metadata
├─ page.tsx                # composes all sections
├─ globals.css             # Tailwind v4 directives + tokens
components/
├─ nav.tsx                 # sticky top bar
├─ hero.tsx                # hero section
├─ intro-headline.tsx      # large headline block
├─ service-card.tsx        # reusable: eyebrow, heading, body, dropdowns, image-side
├─ dropdown.tsx            # accordion DETAILS/TIMELINE
├─ testimonial.tsx
├─ photo-strip.tsx
├─ about.tsx
├─ footer.tsx
├─ reveal.tsx              # framer-motion scroll-reveal wrapper
content/
└─ home.ts                 # all copy + image refs as typed data (single source of truth)
```

Each component is presentational and consumes typed props. Copy lives in `content/home.ts` so swapping it doesn't touch markup.

## Imagery

The Figma frame references real photos (interiors, products, portraits) we don't have file access to. For v1:
- Use **placeholder remote images** from `images.unsplash.com` (allowlisted in `next.config.ts`) chosen to match the design's warm/neutral palette
- Each is replaceable in `content/home.ts` once final assets land

## Animations

- Each section enters with a 24px upward translate + opacity 0→1, 600ms ease-out, triggered when 20% in view
- Respect `prefers-reduced-motion: reduce` (Framer Motion's `MotionConfig reducedMotion="user"`)
- No parallax / no scroll-jacking — feels slow and intentional, not flashy

## Accessibility

- Landmark elements (`<nav>`, `<main>`, `<section>` with `aria-labelledby`)
- Heading hierarchy: single `<h1>` in Hero, `<h2>` per section, `<h3>` for service titles
- Accordion uses `<button aria-expanded>` + `aria-controls` linked region
- Color contrast: ink on cream ≥ 7:1; band-section copy on dark olive ≥ 4.5:1
- Focus-visible rings throughout

## Out of scope (v1)

- Routing to Work / About / Contact pages (Nav links scroll to in-page anchors only)
- Real form behavior on CTA buttons
- Mobile components page from Figma (would be a separate v2 pass — desktop frame proportions don't translate 1:1)
- CMS — content is co-located in `content/home.ts`

## Verification

- `pnpm dev`, open `http://localhost:3000`, take Playwright screenshot at 1440×5187 viewport
- Side-by-side against `.figma-ref/home-full.png`
- Lighthouse: target ≥95 on Performance, Accessibility, Best Practices
