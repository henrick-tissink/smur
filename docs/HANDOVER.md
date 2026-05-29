# SMUR Site — Handover

## Status

Faithful reproduction of the SMUR designer-portfolio Figma file
(`UGvU1B8yP5Pa7vQmneV0Cz`) as a Next.js 16 site. Through 2026-05-29 — a
**mobile catch-up** pass on top of the fidelity-polish + /contact-refactor
work and the May 22 client-feedback rounds. Mobile is now at parity with
the desktop round-1/2/3 fidelity work: brand-font SVG titles, SMUR arrow
assets (no unicode glyphs), real testimonial carousel, bouncing scroll
cues. Home + /contact remain pixel-aligned to Figma across font sizes,
line/border weights, collapsible toggles (chevrons), dropdown content
panels, CTA pills, hero animation tempo, and section bg behavior.

## ★ Latest session — 2026-05-29 — mobile catch-up (arrows, carousel, titles)

Closed the long-standing "mobile lags desktop" gap from the round-1/2/3
feedback. Two commits on `main`:

1. **`dbc5c66` — testimonial carousel + SMUR arrows over unicode glyphs.**
   - `components/mobile/testimonial.tsx`: was a single static quote with
     unicode `←→`; now a real 3-quote carousel (mirrors desktop) using
     the horizontal SMUR `Arrow` (Figma `Isolation_Mode` 40.3×14.08 thin-
     line+chevron — same family the `Arrow` component rotates, so no new
     asset). Flow layout + `min-height:522` so the longer quotes push the
     attribution/arrows down instead of overlapping (same flow fix as the
     FAQ refactor).
   - `components/mobile/work-page.tsx`: 24px pink `↓` glyph → centered
     SMUR `Arrow size={72}` (Figma `Component 2`, 55×71.8), `text-ink`.
   - `components/mobile/contact-page.tsx`: hero `↓` glyph → bouncing SMUR
     `Arrow` at the Figma `y=660` position (was eyeballed at 590); the
     `my work :)` cta-union arrow wrapped in a bounce (`BouncingUnionArrow`)
     — resolves the handover's desktop/mobile bouncing-arrow asymmetry.
     Both honor `prefers-reduced-motion`. New local `BouncingArrow` +
     `BouncingUnionArrow` helpers mirror the desktop ones.

2. **`2b0f789` — section titles render brand-font SVGs (TitleMask).** All
   8 mobile headings rendered in `font-heading` (DM Serif Display, an
   *approximation*) instead of the exported brand-font SVGs the desktop
   switched to in round 1. Now all use `TitleMask`:
   hero (`header.svg`), about (`about.svg`), service `Brand identity` /
   `Naming & Positioning` (via `service.titleSvg`), `Webdesign, Print &
   More` (`webdesign-print.svg`), work `This is / My Work`
   (`this-is-my-work.svg`), contact `Tell Me About / Your Project`
   (`tell-me-about.svg`), FAQ `Questions` (`questions.svg`).

   **Key finding:** the desktop SVG exports' line-breaks were verified
   (rendered each on a dark bg, compared) to match the mobile design
   *exactly* — including the 4-line hero and 3-line about — so the same
   vector assets are reused, just scaled. Scale = `mobileFont/desktopFont`
   (48/75.4 for hero+about, 45/58 for the rest, derived from about.svg's
   220.43px ÷ 3 lines ≈ 0.974×fontSize). Hero is **box-anchored** to its
   351px title width (header.svg aspect) to fill without overflowing —
   font-ratio scaling alone overflows it. Per-service titles fall back to
   `font-heading` text when no `titleSvg` is defined.

   Note: the brand font's Figma text-box heights do **not** map linearly
   to the trimmed-SVG artwork (caps vs descenders vary per line), so size
   titles by the font-ratio + verify visually — don't trust the node
   height. All 8 were screenshot-verified at 393px width.

### Mobile gaps still open (lower priority)

- **Pink form parity** — verify the mobile /contact form fields match the
  desktop dusty-pink treatment (labels/inputs/borders). Not audited this
  session.
- **Dead code / titles** — `font-heading` remains only as the per-service
  title fallback (intentional) and on eyebrows/body (correct — those are
  DM Sans/Serif in Figma, not brand-font titles).

---

## fidelity-polish + /contact refactor — 2026-05-27 → 29

### What landed (10 commits on `main`, `e05ad61` → `22758fd`)

1. **`e05ad61` — Hero carousel image optimization.** Dropped
   `unoptimized` on the hero-carousel `<Image>`s (rule applies to
   percent-crops, not object-cover boxes) and added Next 16 `formats:
   ['image/avif', 'image/webp']` + `qualities: [75, 90]` in
   `next.config.ts`. ~9 MB of raw PNGs become ~24–44 KB AVIF per slide.
   All five frames preload via `preload` / `loading="eager"` so the
   first crossfade no longer stutters.

2. **`2eae8bb` — Font-size audit.** Verified every CSS font size in
   the app against its Figma text node. ~21 mismatches corrected —
   services-list items 14→17 italic accent, dropdown labels 20→28.454,
   home CTA 15→20.22, contact form labels 14→17, helpers 14→16, FAQ
   questions 22→28.454, mobile contact (8 values), mobile work footer
   11→15, lavabo brand-book button 11→10.

3. **`3d7a28b` — Divider/underline weights.** Bumped from browser-
   default 1px → **2.113px** (Figma confirmed on the dropdown component
   `183:1390`; same on mobile via inset-math). Applied to home dropdown
   dividers (desktop + mobile), contact form field underlines, and
   contact FAQ row dividers.

4. **`eb3728a` — Control borders.** Box outlines bumped to **1.444px**
   (Figma BUTTON `208:12249` / `310:58071`). Applied to all four CTA
   pills + contact textarea + contact checkbox.

5. **`24d7358` — Chevrons on collapsibles.** All four collapsible
   toggles were rendering the wrong glyph — desktop used the full SMUR
   arrow, mobile used `+`. Replaced with a new
   `components/chevron.tsx` mask span (uses
   `mobile/dropdown-chevron.svg`), rotates 180° on `open`, recolors
   via `backgroundColor: currentColor`. Genuine arrows (scroll cue,
   CTAs) untouched.

6. **`a43ac81` — Asset drop sync.** `EXPORTS SMUR WEBSITE 2/HOME/
   pictures homepic{1-4}@2x.png` copied over `public/figma-assets/
   photo-{1-4}.png` (md5-verified). `.gitignore` glob `/EXPORTS SMUR
   WEBSITE*/` covers both drops. Old `EXPORTS SMUR WEBSITE/` removed
   from disk per user.

7. **`db26938` — Hero speed-up + dropdown content + Brand-identity
   spacing + CTA fidelity.** Big multi-part commit:
   - Hero carousel: interval `4000ms → 2000ms`, crossfade
     `600ms → 300ms`.
   - **Spacing recipe** for service sections: `mt-[12px]` eyebrow→
     title, `mt-[24px]` title→body, `mt-[32px]` body→dropdowns/list.
     Trims ~12 px from Figma's `gap-25` / `gap-35` to compensate for
     the SVG title's ascender/descender padding (TitleMask renders
     69.43 px tall vs Figma's 51 px text-box-trimmed height).
   - Webdesign list items get `[text-box-edge:cap_alphabetic]
     [text-box-trim:trim-both]` so `space-y-[15px]` matches Figma's
     trimmed-box gap (was visually ~22 px due to line-box overhang).
     Explicit `mt-[32px]` between list and CTA (was missing).
   - **Dropdown content panels**: `DropdownItem.body?` added.
     `Dropdown` / `MobileDropdown` render an animated content panel
     (max-h/opacity transition) when `body` is set. Body is split on
     the first blank line — intro paragraph is DM Sans Regular, the
     list/steps below are DM Sans Italic, both in accent `#a98a8a`.
     Matches Figma DROP DOWN BRANDING / NAMING expanded variants
     (`183:1391`, `183:1445`, `297:56985`, `297:56999`).
   - DETAILS + TIMELINE bodies for Brand identity + Naming populated
     verbatim from Figma. Wire-up is generic — any future service
     dropdown just needs a `body` string in `content/home.ts`.
   - `MobileFAQRow` on contact now renders the answer panel and maps
     over `contactFAQItems` (had been mapping over the questions-only
     `contactFAQ.items`).
   - LET'S WORK TOGETHER CTA: Figma BUTTON `208:12249` spec —
     `px-[24.548px] py-[5.776px] gap-[6.498px] rounded-[18.05px]`,
     `#a18080` label on `#a98a8a` border, and the long horizontal
     `Union` SVG arrow (saved to `public/figma-assets/arrows/
     cta-union.svg`, recolored via CSS mask to follow `currentColor`).

8. **`77e78d9` — /contact full refactor.**
   - **Sections are now full-viewport-width with their own bg**
     (matches the home Hero pattern). Previously the whole page was
     wrapped in a fixed 1440 `mx-auto` so wider viewports got cream
     stripes flanking the sage hero / brown FAQ.
   - **Hero editorial tiles**: LEFT swapped to the MNF artboard
     (1799×2480, same 0.726 portrait aspect as the 258×356 tile);
     RIGHT replaced with a 3-frame LAVABO crossfade carousel using
     `lavabo {1,2,3}@2x.png` from EXPORTS. The hero section gets
     `z-10` so the right tile (positioned per Figma `218:12494` at
     `top:642 h:249`, bottom 891 — 79 px past the 812 sage area)
     paints above the cream form instead of being clipped.
   - Images now optimized via `next/image` (object-cover in fixed
     box = no percent-crop, so the `unoptimized` rule doesn't apply).
     Replaces 9.9 MB single PNG with ~3×400 KB AVIF.
   - Hero scroll-cue arrow + my-work arrow now **bounce** via a
     motion-based `BouncingArrow` helper. Honors
     `prefers-reduced-motion` via `useReducedMotion()`.
   - **FieldText / MobileText**: field names sit inside the inputs
     as `placeholder`s (no labels above the line). `sr-only` labels
     kept for screen readers.
   - **FieldTextarea / MobileTextarea**: centered placeholder via an
     absolutely-positioned overlay (`flex items-center
     justify-center`) that hides on first keystroke. Native
     `<textarea>` placeholders can't be vertically centered reliably
     cross-browser.
   - SAVE & SEND CTA (desktop + mobile): same Figma BUTTON spec as
     home CTA (`310:58094` / `310:58071`).

9. **`22758fd` — FAQ flow refactor + edge-to-edge image strip +
   my-work Union arrow.**
   - `ContactFAQ` + mobile FAQ refactored from absolute-positioned
     children to **flow layout** (margin-top instead of fixed `top`).
     When an FAQ row expands, the image strip, my-work link, and
     socials slide down with the answer instead of being bled under;
     section bg grows naturally. Figma x-coords preserved via
     `marginLeft` on each block (image strip at 392, socials at 842).
   - Image strip thumbnails sit edge-to-edge — `gap-[10px]` removed.
   - "my work :)" arrow now uses the **same `cta-union.svg`** as
     the CTA buttons (long horizontal right-pointing, recolored to
     cream via CSS mask). Desktop bounces rightward (new
     `BouncingUnionArrow` helper, 1.4 s ease-in-out, 8 px travel);
     mobile is static. Replaces the prior tall SMUR arrow / unicode
     `→` glyph.

### New components / patterns introduced

- **`components/chevron.tsx`** — recolorable chevron mask span,
  rotates 180° on `open`. Used by all four collapsible toggles
  (home dropdowns + contact FAQ desktop/mobile). Width-driven sizing
  with auto-derived height from the 9.117/18.135 Figma aspect.
- **`BouncingArrow` + `BouncingUnionArrow`** (in
  `components/contact/page.tsx`) — motion-based scroll cue
  affordances. `BouncingArrow` is generic (takes `direction` +
  `size` + `distance`) and used for the hero scroll cue.
  `BouncingUnionArrow` pairs the `cta-union.svg` mask with a
  rightward bounce for the my-work link. Both respect
  `prefers-reduced-motion` via `useReducedMotion()`. **Pattern is
  reusable** — copy either into another component if more
  bouncing-cue arrows are needed; they're not yet shared because the
  call sites are file-local.
- **`text-box-trim` arbitrary** — Tailwind v4 supports
  `[text-box-edge:cap_alphabetic] [text-box-trim:trim-both]` for
  matching Figma's trimmed text boxes. Used on the Webdesign list
  items so the `gap-[15px]` matches Figma's trimmed visual instead
  of the line-box-padded ~22 px. Browser support is good (Chrome 133+,
  Safari 18.4+); Firefox stable gets the un-trimmed fallback (line-
  box padding, harmless).
- **CTA pill spec** — `px-[24.548px] py-[5.776px] gap-[6.498px]
  rounded-[18.05px] border-[1.444px] border-[#a98a8a] text-[20.22px]
  uppercase leading-[1.21] text-[#a18080]` + `cta-union.svg` mask
  arrow at `width: 41.503 height: 14.11`. Currently duplicated in
  three places (home CtaButton, contact desktop SAVE & SEND, contact
  mobile SAVE & SEND). Could be extracted to a shared
  `<CtaPill as="a"|"button">` component in a future refactor pass.
- **Full-bleed sections + inner 1440 container** — Each section is
  `w-full` with its own bg color; absolute-positioned content is
  wrapped in `<div className="relative mx-auto" style={{ width: 1440
  }}>` so it stays centered while the bg extends to the viewport
  edges. Pattern matches the home Hero and is now used across all
  /contact sections.
- **`z-10` for overflowing tiles** — When an absolutely-positioned
  child intentionally straddles two stacked sections (like the
  LAVABO right tile straddling the contact hero/form boundary), give
  the upper section `z-10` so its overflowing child paints above the
  next section's bg instead of being clipped by it.

### Known issues / TODOs

- **Mobile bouncing arrow asymmetry** — Desktop my-work arrow bounces;
  mobile is static. If you want symmetry, add `motion` + `useReducedMotion`
  imports to `components/mobile/contact-page.tsx` and wrap the mobile
  Union span in a `motion.span` like the desktop one.
- **CTA pill duplication** — Three near-identical pill implementations
  (home, contact desktop, contact mobile). Extract to
  `components/cta-pill.tsx` (`as="a"|"button"`, `variant="ink"|"cream"`)
  when next touching CTAs.
- **Hero animation tempo** — Currently 2000 ms / 300 ms. User
  approved as "a bit faster" than the previous 2500 / 400. If it
  ever reads twitchy, dial back to 2500 / 400.
- **Spacing recipe** — `mt-[12 / 24 / 32]` series is the Figma-match
  pattern for service sections (eyebrow → title / title → body / body
  → list-or-dropdowns). Reuse if any new service section is added.
- **Other arrows still tall-SMUR** — The contact-page changes only
  swapped my-work to the Union arrow. The hero scroll cue and the
  CTA buttons all use their own correct arrows. If any *other* link
  ever needs a horizontal CTA-style arrow, use `cta-union.svg` via
  CSS mask (see `BouncingUnionArrow` for the recipe).
- **Mobile contact form** — Has its own variant of every form field;
  mobile FieldTextarea uses the same overlay-centered placeholder
  pattern as desktop. If form fields change, update both files.

### Files to know for next session

- `components/contact/page.tsx` — full-bleed sections with inner
  `mx-auto w-[1440px]` containers, flow-layout FAQ, `BouncingArrow`
  + `BouncingUnionArrow` helpers, LAVABO carousel, placeholder
  fields, Figma-matched SAVE & SEND CTA.
- `components/mobile/contact-page.tsx` — mirrors the desktop changes
  (placeholders + centered textarea + flow-layout FAQ + Union arrow
  on my-work, static).
- `components/chevron.tsx` — recolorable collapsible-toggle chevron.
- `public/figma-assets/arrows/cta-union.svg` — the project's
  standard right-pointing arrow (filled chevron tip on a horizontal
  shaft, 41.503 × 14.11). Use it via CSS mask + `backgroundColor:
  currentColor` for any horizontal CTA arrow.
- `next.config.ts` — has `formats: ['image/avif', 'image/webp']` +
  `qualities: [75, 90]`. Next 16 requires every `quality` value
  used on `<Image>` to be allow-listed in `qualities` (default is
  `[75]`, silently snaps to nearest otherwise).
- `content/home.ts` — `DropdownItem.body?: string` is the schema for
  expandable dropdowns; intro paragraph + `\n\n` + italic list/steps
  is the convention (matches the Figma split).

---

## Previous session — 2026-05-22 client feedback (rounds 1 + 2)

### What landed (3 commits on `main`)

1. **`019cae4` — Round 1 (cosmetic):**
   - All section titles now render from exported brand-font SVGs via
     `components/title-mask.tsx` (CSS `mask-image` + currentColor →
     one cream-fill asset works on light AND dark sections).
   - Unicode arrows replaced site-wide with the SMUR down-arrow asset,
     rotated for direction via `components/arrow.tsx` (dropdowns,
     testimonial nav, work/contact scroll cues, FAQ accordion, CTAs).
   - Contact form now dusty-pink across labels/inputs/borders/checkboxes.
   - New CTA pill style with SMUR arrow.
   - MNF + Architrave tiles swapped to aspect-matching photos.

2. **`beb4097` — Round 2 (content):**
   - Testimonial section: non-functional prev/next → real carousel.
     Three quotes from `EXPORTS/Written content.pdf` (Gradient Zero,
     Manufaktura, Iulia Branca). David Damrosch (Harvard IWL) noted as
     pending in the PDF — to be added when it arrives.
   - FAQ: placeholder questions → verbatim PDF Q&A. Accordion now
     expands to show the answer (slide-down with opacity+max-height).
   - **HomeHeroStatus replaced with `HeroCarousel`** — auto-cycles the
     5 `animation header/` artboards (CRISP / INTERSTELLAR / KOKOP /
     TAF / interst). 4s interval, 600ms crossfade, pauses on hover,
     dot indicators. The 745-vector Status mockup file is still on
     disk but unused.
   - FAQ thumbnail strip uses dedicated `EXPORTS/Let_s work/` photos.
   - All 91 `EXPORTS/PROJECTS/` artboards archived under
     `public/figma-assets/projects-archive/<project>/` with sanitised
     names (lowercased, no `@2x`, no spaces) for later case-study
     mapping.

3. **`1e24a46` — Case-study photo swaps (visually inferred):**
   - Read-inspected each existing slot photo against candidate new
     artboards. Two projects had clean 1:1 matches:
     - **KOKOP**: `sec1-photo.jpg` ← Artboard 152 (barista),
       `cafe-mockup.jpg` ← 158 (storefront sign),
       `sec3-photo.jpg` ← 157 (latte pour with KOKO.P logotype overlay).
     - **LAVABO**: `sink-hero.png` + `brand-book/sinks-hero.png` ← 61
       (colored sinks + LAV/ABO letterforms), `sink-photo.png` ← 64
       (brand-book mockup with pink concrete sink).
   - CRISP / Interstellar / IWL / Kabinett / MNF / TAF / Architrave
     artboards depict different deliverable types (website mockups,
     posters, single panels of multi-panel collages) than what the
     existing photo slots expect — would need layout changes, not
     file swaps. **Smaranda has the WhatsApp draft asking for the
     per-slot mapping** (see "Open with Smaranda" below).

### New components / patterns introduced

- `components/title-mask.tsx` — wraps an exported SVG as a CSS
  mask-image with `background-color: currentColor`. Includes
  visually-hidden alt text so `<h1>`/`<h2>` semantics + SEO survive.
  Pattern: `<TitleMask src="/figma-assets/titles/x.svg" width={X}
  height={Y} alt="..." as={2} />` — width/height come from the SVG's
  native viewBox (lift with `grep viewBox file.svg`).
- `components/arrow.tsx` — single arrow asset with `direction=up|down|left|right`
  prop (rotates the container) and `color` (defaults to currentColor).
  Uses arrow-white.svg as the mask source; arrow-brown.svg is unused
  but kept on disk.
- `components/hero-extras/hero-carousel.tsx` — generic 5-slide cycler
  using `useEffect` + `setInterval`, `useState` for paused state.
  Reusable pattern for any "cycling photo panel".

### Open with Smaranda (blocking next steps)

Two WhatsApp drafts are in `docs/` (gitignored, won't ship):

1. **`docs/whatsapp-to-smaranda.md`** — Round 1 follow-ups: Architrave/
   MNF tile orientation choice, scope of SVG-title use, font sizes,
   down-arrow visual width. (Sent — awaiting reply.)
2. **`docs/whatsapp-to-smaranda-2.md`** — Case-study photo mapping:
   for each of CRISP, Interstellar, IWL, Kabinett, MNF, TAF, Architrave,
   list of existing photo slots + available artboard numbers, fill-in-
   the-blank format. (Drafted, ready to send.)

When her answers come back, apply the swaps by:
```
cp public/figma-assets/projects-archive/<project>/<ArtboardN>.png \
   public/figma-assets/work/<project>/<existing-slot>.<ext>
```
The case-study pages reference the existing paths; the file extension
in the path doesn't have to match the new file's real format (.png
served at .jpg URL works fine; next/image is `unoptimized`).

For any artboard she wants featured as a *website mockup* (e.g.
Architrave 87, Interstellar 122 are full website designs), she'll
need to ask for a section rebuild — not a swap.

### Known issues / TODOs from this round

- **Mobile is now inconsistent with desktop.** Smaranda's feedback
  was desktop-scoped; mobile still has unicode arrows, smaller
  dropdown font, no SVG titles, no pink form. When she sends mobile
  feedback, all the round 1/2 work needs to be repeated for mobile
  components (`components/mobile/*`).
- **Pink form text contrast.** `#a98a8a` on `#f5f1ec` ≈ 2.3:1, below
  WCAG AA's 4.5:1. Her design choice; flagged in WhatsApp draft 1.
- **Dead code:** `components/hero-extras/status-mockup.tsx`
  (HomeHeroStatus, 745-vector composition — no longer imported);
  `components/work/lavabo-brand-book.tsx` (replaced by photo on home);
  `public/figma-assets/work/*.jpg` (legacy WORK tiles before .png
  rename); `public/figma-assets/arrows/arrow-brown.svg` (never used,
  Arrow component uses arrow-white.svg + tint).
- **Header.svg overflows hero text frame by 4px** (586.82 in 583px
  container). No visible clip, but if `overflow-hidden` is ever added
  to that wrapper it'll bite.
- **Down-arrow visual width** is ~25px in slots that used to reserve
  72px (work/contact scroll cues). Reads correctly as an arrow but
  feels narrow.
- **Testimonial body** scrolls past the section's 426px height when
  the longer quotes are active — quote text is 8-10 lines for Jona
  + Iulia testimonials. Section height may need to grow to ~520 or
  the type to shrink.

### Files to know for next session

- `EXPORTS SMUR WEBSITE 2/` — Smaranda's raw asset drop (current). Gitignored.
  91 project artboards, 5 hero-carousel artboards, 8 SVG titles, 2
  arrows, 4 photo-strip pics, 1 LAVABO web/print photo, the
  Written content.pdf (read once already — content is in
  `content/home.ts` testimonials and `content/contact.ts` FAQ).
- `public/figma-assets/projects-archive/` — all 91 project artboards,
  cleanly named, ready to drop into case-study slots when mapping
  is confirmed.

---

## Status (legacy — earlier handover)

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

Five inline passes have closed nearly all the deferred work. All
ARCHITRAVE sections, kabinett Row 2, CRISP Group 62, KOKOP sections
6 & 8, home hero Status mockup, and INTERSTELLAR Row 5 full
composition are now inlined. Only 2 items remain — both blocked on
MCP returning metadata-only responses (compositions too dense for
JSX generation):

- `components/work/taf-page.tsx` — Middle section's 2 photos render.
  Layer_2 typography vectors (1000+ loose primitives) cannot be
  inlined via MCP (metadata-only response). Would require per-vector
  drilling.
- `components/work/iwl-page.tsx` — Row 4 LEFT (Group 91) is 10+
  levels of nested clip path groups; MCP returns metadata-only at
  every parent. Single clip paths can be rendered but stitching them
  into the full panel requires solving 10-level offset chains by hand.
- `components/work/interstellar-page.tsx` — Row 4 has 3 narrow filler
  clips (10-14px wide vertical strips). Extremely low visual impact.

- `scripts/inline-section.sh` — bash helper used heavily during the
  inline passes. Reusable for further inline work.
- `components/work/crisp-page.tsx` — legacy notes (most resolved):
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
