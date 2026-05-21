# SMUR Site — Handover

## Status

Faithful reproduction of the SMUR designer-portfolio Figma file
(`UGvU1B8yP5Pa7vQmneV0Cz`) as a Next.js 16 site. Eight commits this session,
two new case studies, full audit of past screenshot violations, and rules
hardened against future violations.

## Routes shipped

| Route | Figma frame | Desktop | Mobile |
|---|---|---|---|
| `/` | HOME 1:2 | ✅ | ✅ (frame 268:3521) |
| `/work` | WORK 1:243 | ✅ | ✅ (frame 268:37131) |
| `/contact` | WORK WE ME 193:1383 | ✅ | ✅ (frame 282:39442) |
| `/work/lavabo` | LAVABO 70:6705 | ✅ | ✅ (frame 282:38869) |
| `/work/kokop` | KOKOP 136:234 | ✅ | scaled desktop (no mobile design) |
| `/work/crisp` | CRISP 71:3160 | ✅ | scaled desktop (no mobile design) |
| `/work/iwl` | IWL 71:4377 | ✅ | scaled desktop (no mobile design) |
| `/work/interstellar` | INTERSTELLAR 73:19115 | ✅ | scaled desktop (no mobile design) |
| `/work/taf` | TAF 73:29056 | ✅ | scaled desktop (no mobile design) |
| `/work/kabinett` | kabinett 73:36625 | ✅ | scaled desktop (no mobile design) |
| `/work/sws` | SWS 73:40179 | ✅ | scaled desktop (no mobile design) |
| `/work/mnf` | MNF 71:343 | ✅ | scaled desktop (no mobile design) |
| `/work/architrave` | ARCHITRAVE 71:982 | ✅ | scaled desktop (no mobile design) |

Mobile menu overlay (Figma 282:40808) wired to the hamburger button.

## Case studies left to build

**All 9 case studies are now shipped at the route level.** Multiple
sub-sections within them remain TODO (see "Known open TODOs in code"
below) — these are vector-dense compositions that exceed the MCP
consolidation threshold and need to be inlined manually or via a
batched download script in a follow-up session.

Wiring pattern: add the slug to `workCaseStudies` in `content/work.ts`;
the WORK tile auto-routes via `workTileHref()`.

## Build pattern for case studies (do not deviate)

1. **Metadata first.** `mcp__plugin_figma_figma__get_metadata` on the
   case-study frame. Note its width/height (set into `content/<slug>.ts`
   as `frame.desktop`).
2. **Per-section design context.** For each immediate child Group, call
   `get_design_context` to find image URLs, text, and the section's
   element bounds.
3. **Find consolidated Layer exports.** If a section has many vectors,
   call `get_design_context` on its `Layer_1` or `Layer_2` child — Figma
   often returns one consolidated SVG (e.g., KOKOP's 132 KB
   `hero-logos.svg` covers all four logo lockups). This is the right
   move — it avoids inlining 60+ per-element SVGs.
4. **Position by frame-absolute pixels.** For every `<img>` in the design
   context output, compute:
   ```
   left   = (leftPct   / 100) * frameWidth
   top    = (topPct    / 100) * frameHeight
   width  = frameWidth  - left - (rightPct  / 100) * frameWidth
   height = frameHeight - top  - (bottomPct / 100) * frameHeight
   ```
   For a consolidated Layer SVG, use the **layer's own** `x/y/width/height`
   from metadata: `left = parent.x + layer.x`, etc. **Do not stretch a
   layer SVG to fill its parent frame** — that was the KOKOP hero
   centering bug (commit `740883e`).
5. **Render flat.** Each element is its own `absolute`-positioned `<div>`
   in the case-study frame root. **Do not** wrap a section in a bounding
   `<div>` and stretch contents across it — that distorted layouts in the
   reverted KOKOP v1 (`c36858a`). See LAVABO and KOKOP pages for the
   correct pattern.
6. **Pass `unoptimized` to every `next/image`.** Required for retina
   sharpness on Figma percent crops; see CLAUDE.md rule #3.
7. **Verify in browser.** Use Playwright. For full-page screenshots,
   first force-eager-load images and scroll to bottom — lazy images
   render blank otherwise.

## Hard rules (CLAUDE.md — never violate)

1. **No `get_screenshot` for any asset, ever.** Including vector-composed
   groups. Inline the vectors or do a structural HTML/CSS rebuild
   (see LAVABO brand book, commit `4eae517`). User caught a violation
   2026-05-21 and made the rule absolute.
2. **Insets are frame-relative**, not parent-relative.
3. **Consolidated Layer SVGs have their own bounds** — don't stretch them
   to fill parent frame.

Each rule has a dedicated memory file under
`/Users/henricktissink/.claude/projects/-Users-henricktissink-Sauce-smur/memory/`.

## Known open TODOs in code

The big-void deferrals were largely closed in a follow-up pass — every
case study now has photo content rendered in previously-empty sections.
Remaining TODOs are typography/vector overlays that ride on top of the
already-rendered photos.

- `components/hero.tsx` — Home hero's full "Status" real-estate website
  mockup (nav, property cards, vector type) is a vector composition still
  pending structural rebuild per CLAUDE.md option (c). Only the building
  photo + SMUR text overlay render now. Bg color is correct. Significant
  standalone design task — defer to a focused session.
- `components/work/kokop-page.tsx` — Sections 6 (Group 122 brand book) and
  8 (Group 120 final showcase) have small text-label vector overlays
  (~19 and ~60+) not yet inlined. Base photos render. Both flagged
  inline with `TODO`.
- `components/work/architrave-page.tsx` — Photos render in all 4
  previously-deferred sections (Group 80, Row 2 LEFT, Row 2 RIGHT, Big
  middle). Typography/wordmark vectors (40-70 per section) are still
  TODO; sections look photo-only without their typography overlays.
- `components/work/mnf-page.tsx` — Big middle 4 of 5 photo cards render
  (1 left-bleeding card skipped). Cards land at their Figma positions
  with cream gaps between (matches design intent).
- `components/work/kabinett-page.tsx` — Row 2 bg photo + inner masked
  photo render; 70+ typography vectors and the -rotate-90 + mix-blend
  treatments still TODO. Row 3 RIGHT and bottom wordmark letter rows
  also TODO.
- `components/work/taf-page.tsx` — Middle section's 2 photo clip paths
  render (top wide cleaning photo + bottom product photo). Brand-book
  typography vectors in between still TODO — substantial tan space
  remains.
- `components/work/interstellar-page.tsx` — Row 4 inlined as 2x3
  property photo grid + top hero photo + narrow band. Tiny 10-14px
  filler clip paths and Row 5 inner masked composition still TODO.
- `components/work/iwl-page.tsx` — Row 2 Layer_2 (114 vectors) fully
  inlined. Bottom section's 4 photo cards render. Row 4 LEFT (Group 91)
  still deferred — no consolidated SVG, requires per-clip-path drilling.
- `scripts/inline-section.sh` — bash helper used during the inline pass:
  reads a saved `get_design_context` tool-result file, downloads every
  asset URL in parallel, detects file types, rewrites the JSX with
  local paths. Useful for future inline work.
- `components/work/crisp-page.tsx` — three vector-dense sub-sections
  deferred per CLAUDE.md rule #2 (same precedent as KOKOP):
    - Section 5: big "CRISP" typography clip-path (`71:3418`) — **384
      vectors**, giant botanical-fill letterforms in the middle of the
      page. Renders as a 615px empty gap currently.
    - Section 6: Row 2 left brand-label mockup (`297:57115`) — ~42 vectors
      + 3 photos forming a vertical label/tag composition. Renders as a
      439×529 empty gap.
    - Section 11 inner stamp: ~45 masked decorative vectors inside Group
      62 forming a brand seal. Bottom photo + main "CRISP" wordmark +
      brand mark + contact text render; only the seal is missing.
- `content/work.ts` — slugs `mnf` and `architrave` appear swapped vs.
  their Figma layer names (the tile labeled "ARCHITRAVE WORK" in Figma
  lives at our `mnf`-slug position; "NnfWork" at our `architrave`).
  Preserved as-is to avoid breaking `/work/lavabo`-style routes.

## Project layout

```
app/
  page.tsx                 # / — home
  work/
    page.tsx               # /work — landing
    lavabo/page.tsx        # /work/lavabo
    kokop/page.tsx         # /work/kokop
  contact/page.tsx         # /contact

components/
  hero.tsx, services-list.tsx, about.tsx, ...
  nav.tsx, use-nav-scheme.ts
  figma-image.tsx          # next/image wrapper with crop support
  reveal.tsx               # motion-based scroll reveal
  work/
    page.tsx               # WORK landing
    lavabo-page.tsx, kokop-page.tsx
    lavabo-brand-book.tsx  # structural rebuild used in 3 places
  contact/page.tsx
  mobile/                  # ALL desktop components have mobile twins
    hero.tsx, nav.tsx, services-list.tsx, ...
    lavabo-page.tsx, work-page.tsx, contact-page.tsx

content/
  home.ts, work.ts, contact.ts, lavabo.ts, kokop.ts

public/figma-assets/
  hero-building.jpg
  smur-logo.svg
  about-portrait.png
  photo-1.png … photo-4.png            # home photo strip
  crisp.png, crisp-logo.svg
  mobile/{nav,menu,hero}-* SVGs and PNGs
  contact/{hero-left,hero-right}.png
  work/                                 # /work landing tile images (full-res)
    crisp.jpg, kokop.jpg, lavabo.png, taf.jpg, ...
  work/lavabo/                          # LAVABO case study
    sink-photo.png, sink-hero.png, mobile/...
    brand-book/                         # photos used by <LavaboBrandBook>
  work/kokop/                           # KOKOP case study assets
```

## Key tooling notes

- **Dev server.** `pnpm dev` (Next.js with Turbopack). If hydration errors
  appear after rapid edits to client components, `rm -rf .next && pnpm dev`.
- **Playwright verification.** Use `mcp__plugin_playwright_playwright__*`
  to navigate / screenshot / inspect. Force-eager-load images before
  `fullPage` screenshots or below-the-fold imagery renders blank.
- **Figma MCP.** Both `get_design_context` and the larger frame metadata
  often exceed token limits; results are auto-saved to
  `~/.claude/projects/-Users-henricktissink-Sauce-smur/.../tool-results/`
  for follow-up with `jq -r '.[0].text' file | grep ...`.

## Memory files worth reading first

Under `~/.claude/projects/-Users-henricktissink-Sauce-smur/memory/`:

- `feedback_figma_assets_vs_screenshots.md` — the absolute rule + when to
  use structural rebuild vs. inline vectors.
- `feedback_figma_inset_positions.md` — frame-relative insets, per-element
  positioning.
- `feedback_figma_consolidated_layer_bounds.md` — layer SVG bounds gotcha.
- `feedback_figma_svg_as_png.md` — `.png`-named URLs may serve SVG.
- `feedback_adaptive_sticky_nav.md` — how the data-nav-scheme system works.

## Most useful commits to study

- `4eae517` — Structural rebuild of LAVABO brand book (pattern for
  recreating "fake website" mockups as real HTML).
- `a9a7f16` + `740883e` — KOKOP case study with per-element positioning,
  including the consolidated-layer-bounds fix.
- `c6a061a` — Bulk replacement of 10 work tile screenshots with full-res
  Figma assets (audit + replace methodology).
- `1e38e20` — Rule clarification removing the screenshot fallback.
