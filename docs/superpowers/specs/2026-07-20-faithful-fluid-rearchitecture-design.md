# SMUR — Faithful-Fluid Re-architecture (Design Spec)

- **Date:** 2026-07-20
- **Status:** Approved design → pending implementation plan
- **Scope:** Entire site (Home, 10 work pages, Contact — desktop + mobile), one unified spec, phased implementation.
- **Reference spec:** The reconstructed *SMUR Design System* (Claude Design, from `SMUR WEB (Copy).fig`) — canonical palette, type, spacing, motion, and consolidated component set.

---

## 1. Problem

The current build is **high pixel-fidelity, low structural fidelity**. It looks ~correct at exactly 1440px and 393px, but is brittle:

- **Fixed-canvas + CSS `zoom`.** The whole site is two fixed-width canvases (1440 desktop / 393 mobile) scaled with CSS `zoom` (`app/page.tsx:32–52`). It only looks right at the two design widths; everything in between is a uniform zoom (body text shrinks/grows), there is no true responsive behaviour, and `zoom` is the least-standard scaling mechanism (Firefox ≥126, poor interaction with user text-scaling / a11y zoom).
- **Everything absolutely positioned at transcribed pixels.** ~782 hardcoded px positions/sizes across components. Content is frozen: a copy change, a new project, or a font swap requires re-measuring coordinates by hand. Nothing reflows.
- **No component reuse — the inverse of a design system.** Each work page is bespoke absolute coordinates: `components/work/architrave-extras/big-middle.tsx` is 2,077 lines; `components/work/kokop-extras/section8.tsx` is 944 lines of inlined SVG vectors. Machine transcriptions, effectively un-editable by hand.
- **Typography baked as SVG.** Headings render as SVG masks (`components/title-mask.tsx`) and some pages inline vector typography (kokop's 192-path `mix-blend-multiply` composition). Heavy, non-editable, weaker a11y/SEO. This existed because the licensed heading font was unavailable.
- **Tokens partial.** Colors are tokenized (`app/globals.css:13–21`, and they match the spec); spacing, radii, hairlines, and motion are not — they live as scattered magic numbers.
- **Font divergence.** Spec's display serif is Myanmar MN (currently substituted by DM Serif Display in `app/layout.tsx`). The licensed Myanmar MN / Avenir files are now available and will be self-hosted.

The paradox: the very thing that makes it look 100% at 1440 (pixel transcription + zoom) is exactly what makes it brittle.

## 2. Goals

- Retire the `zoom` hack and absolute-pixel positioning in favour of a real, reflowing, responsive layout.
- Match the Figma design at the design widths (1440 / 393) and degrade gracefully at every width in between — **faithful + fluid**.
- Replace scattered magic numbers with a tokenized foundation (color / type / space / radii / motion).
- Consolidate to a reusable component set mirroring the design-system spec.
- Use real text in the licensed fonts wherever it reproduces the design faithfully; preserve baked vector art only where real text would visibly deviate.
- Keep the site shippable throughout via a phased rollout.

## 3. Non-goals

- No net-new responsive layouts the Figma never specified (no invented intermediate-breakpoint designs). Faithful+fluid, not a redesign.
- No content/copy changes — copy still comes verbatim from the Figma/design system.
- No new routes or features beyond what exists.
- No byte-for-byte pixel-freeze guarantee (see §11 tradeoff). Individual screens can be special-cased on request.

## 4. Locked decisions

| # | Decision | Choice |
|---|----------|--------|
| Fidelity target | Behaviour at non-design widths | **Faithful + fluid** — matched at 1440/393, graceful reflow between |
| Scope | Spec granularity | **One unified spec**, implementation **phased** (foundation → Home → work → contact) |
| Heading font | Serif face | **Licensed Myanmar MN** (self-hosted); Avenir for wordmark/fine print. Newsreader / Nunito Sans as documented fallbacks |
| Layout engine | Responsive mechanism | **Fluid `clamp()` tokens + CSS grid/flex reflow**, centered max-width-1440 canvas |
| Vectors (D) | Baked SVG → real text | **Fidelity-first hybrid** — real text only where the licensed fonts reproduce the design 1:1; keep vector art where converting would deviate; retained SVGs carry alt + sr-only text |

## 5. Token foundation

Split `app/globals.css` into token layers (color / type / space / motion), exposed as CSS custom properties and consumed via Tailwind theme + utilities.

### Color
The design system's four families as semantic tokens (values already match the current build):
- **Warm Neutrals** — page surface `#FFF7F4` (reconcile: current `--color-page` is `#f5f1ec`; align to spec `#FFF7F4` and verify per section against Figma), ink `#35221A`, cream text `#FFF7F4`, line `#D9D2C8`.
- **Rose & Clay** — hero ground `#CBB3A6`, mauve accent `#A98A8A`, clay/About band `#906553`.
- **Sage & Stone** — testimonial `#BBC2B5`, soft greys.
- **Editorial Reds** — wine/oxblood/crimson/deep-red, scoped to project work.

Rule: one background per section; the page reads as calm colour blocks stacked vertically.

### Type
Role-based scale with fluid `clamp()` interpolation between mobile and desktop sizes:
- `--font-display` = Myanmar MN (headings, Title Case) — sizes 58–84px, line-height 0.97–1.21.
- `--font-body` = DM Sans (body 17px / 1.33; italic mauve eyebrow, lowercase).
- `--font-ui` = Open Sans (UPPERCASE nav/labels/buttons).
- `--font-wordmark` = Avenir (the "SMUR." mark, fine print).
- Minor roles: Cormorant, Quicksand as in source.

Each heading role emits a `clamp(min, fluid, max)` so type scales smoothly across the viewport instead of zooming.

### Space
Tokenize the real layout scale: `6·15·25·30·35·55·61`, section rhythm ~130px, nav outer padding 86px, ~218px content gutter, 430px content columns. Fluid (`clamp`) where a value must scale with viewport; fixed where it's a true constant. Eliminates the ~782 magic numbers.

### Radii / hairline / motion
- Radii: pill button 18px, mobile card 5px, media 0 (square).
- Hairlines: button border 1.44px; accordion label underline 2px mauve.
- Motion: easing `cubic-bezier(0.22, 0.61, 0.36, 1)`; work-card hover zoom `scale(1.035)` ~520ms; button hover → mauve fill + cream text, press `scale(0.985)`; link hover dim to opacity ~0.55; accordion via `grid-template-rows`; chevron rotation. No bounces. Tokenized as motion custom properties.

## 6. Component architecture

Mirror the design system's consolidated set (20 Figma families → ~12 components). Each is **one responsive component** (desktop + mobile via breakpoints), collapsing the current `X` / `MobileX` duplication — *except* where the mobile Figma structurally diverges, where a mobile variant is kept.

- `components/core/` — `Button` (pill CTA), `Eyebrow` (italic mauve label), `Icon` (hairline SVG glyph set inheriting `currentColor`), `Wordmark`.
- `components/navigation/` — `Nav`, `MobileNav`, `MobileMenu`. Keep the adaptive `data-nav-scheme` sampling hook (`components/use-nav-scheme.ts`) — it's sound.
- `components/sections/` — `Hero`, `ServiceSection`, `ServiceAccordion`, `Testimonial`, `PhotoStrip`, `About`, `Footer`.
- `components/work/` — one `WorkCard` + a data-driven `WorkPage` layout composition (project = data).

Each component: single clear purpose, well-defined props, understandable and testable in isolation. No 2,000-line files.

## 7. Page composition

Pages become declarative compositions of sections fed by existing content data (`content/*.ts`):

- **Home** = `Nav → Hero → ServiceSection×2 → ServicesList → Testimonial → PhotoStrip → About → Footer`.
- **Work pages** = a shared `WorkPage` layout + section/tile primitives, driven by per-project data — replacing the bespoke absolute-coordinate files.
- **Contact** = the existing contact composition, re-expressed on the token/component system.

## 8. Real-text vs vector policy (D — fidelity-first hybrid)

- **Convert to real text** (in licensed fonts) where it reproduces the design faithfully: standard headings, eyebrows, body copy. Retire `TitleMask` for these.
- **Keep the baked SVG/vector asset** wherever converting would visibly deviate from the design: complex typographic compositions (e.g. kokop's 192-vector `mix-blend-multiply` overlay), brand-book/signage typography that is physically part of a photograph, precise vector art.
- **Every retained SVG carries `alt` + visually-hidden text** so a11y/SEO do not regress (as `TitleMask` already does).
- Decision rule, per element: *real text only if it matches the design 1:1; otherwise keep the vector.*

## 9. Responsive strategy

- Centered **max-width 1440 canvas**; content in the design's column/gutter structure via CSS grid/flex.
- `clamp()` tokens scale type and spacing smoothly **768 → 1440**.
- Explicit **tablet breakpoint** where 2-column sections stack sensibly (following the design's own logic, not invented layouts).
- **≤767px** uses the mobile Figma layout.
- **Removed:** CSS `zoom`, absolute-pixel positioning, the dual fixed-canvas wrappers in `app/page.tsx`.

## 10. Fonts logistics

- Self-host **Myanmar MN** (display) and **Avenir** (wordmark/fine print) via `next/font/local`. **Dependency:** the licensed font files must be added to the repo (proposed `fonts/`), supplied by the user.
- Until supplied, wire **Newsreader** (display) and **Nunito Sans** (wordmark) as documented `next/font/google` fallbacks so implementation is unblocked; swap to local files when available.

## 11. Tradeoff (G)

Real reflowing text won't land on the exact pixel line a frozen SVG does at 1440 — a heading may wrap one word differently; a section may be a few px taller. The rebuild matches the **design**, not the old pixel-transcription byte-for-byte. Any screen that must stay literally pixel-frozen can be named and special-cased.

## 12. Migration, rollout & safety

- Work on a **feature branch**.
- **Phased implementation** inside this one spec:
  1. **Foundation** — token layers + `core/` primitives + fonts.
  2. **Home** — desktop + mobile on the new system (the hardest page; proves the pattern).
  3. **Work pages** — data-driven, reusing foundation, one project at a time.
  4. **Contact** — re-expressed on the system.
- Old components stay until each surface is swapped **and visually diffed against current at 1440/393**; then the old code is removed.
- Site stays shippable at every phase boundary.

## 13. CLAUDE.md changes (required)

The current project rules actively mandate the approach we're removing. As part of this work, revise:
- **Rule #7** ("Reproduce at the design's native width") — reframe to faithful-fluid: match at design widths, reflow between.
- **Rule #8** ("Use fixed-height containers with absolutely positioned children … not natural flow") — replace with the component + fluid-token approach.
- **Rule #17** (mobile/desktop separate components) — soften to "one responsive component unless the mobile Figma structurally diverges."
- Add: token foundation, real-text-vs-vector policy, no-`zoom` rule.

Keep intact: the asset-fidelity rules (#2–#6 — originals not screenshots, `unoptimized` on crops, inline colors, design-context for instances).

## 14. Verification

Design site → verification is primarily visual + a11y:
- **Visual regression** of each rebuilt surface against the current build at **1440 and 393** (the matched widths).
- **Intermediate-width sanity** at ~1024 and ~700 (no zoomed/overflowing text, sensible reflow).
- **A11y/SEO**: real `<h1>`/`<h2>` where converted; retained SVGs carry alt + sr-only text; color contrast on each section's text/ground.
- **Build** clean; no `zoom`/absolute-px regressions reintroduced.

## 15. Open dependencies

- **Licensed font files** (Myanmar MN, Avenir) from the user. Non-blocking (fallbacks wired) but required for full fidelity.

## 16. Phasing summary (for the implementation plan)

1. Token foundation + `core/` + font wiring.
2. Navigation components.
3. Home sections + Home page (desktop + mobile) + visual diff.
4. Work `WorkCard`/`WorkPage` primitives + per-project rebuild + visual diff.
5. Contact.
6. Remove dead code; update CLAUDE.md.
