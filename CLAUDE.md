@AGENTS.md

# SMUR — Project Rules

## Fidelity Goal: Exact Figma Reproduction

We are reproducing the SMUR Figma design as faithfully as possible — pixel-accurate where feasible, "as close as we can get" where source assets or fonts aren't available. This is NOT an "inspired by" build.

**Source of truth:** Figma file `UGvU1B8yP5Pa7vQmneV0Cz` (SMUR WEB Copy), page `all pages desktop`, frame `HOME` (`1:2`).

### What this means in practice

1. **Never invent content.** Headlines, body copy, button labels, names, taglines, testimonial text, image labels — all of it comes verbatim from the Figma metadata. If a string isn't in the Figma, do not write one. Pull text via `get_metadata` and copy it literally.

2. **Use ORIGINAL image assets, never screenshots.** The case study images (KOKOP, CRISP, LAVABO, hero portrait, photo strip, about portrait) are full-resolution photographs uploaded to Figma. Two tools look similar but produce completely different results:

   - ❌ **`mcp__plugin_figma_figma__get_screenshot`** — renders a bitmap of the design, capped at ~1024px on the longest edge. This is a *render*, downsampled and blurry. Past mistake: I used this for everything, shipped 429×561 KOKOP, 432×560 CRISP, 360×357 photos. Looked low-res on retina.
   - ✅ **`mcp__plugin_figma_figma__get_design_context`** — returns React code containing `const imgFoo = "https://www.figma.com/api/mcp/asset/<uuid>"` constants. **These URLs point to the original uploaded image files.** KOKOP at this URL is 4096×2733 (~10× the screenshot). Always use these.

   Workflow: call `get_design_context` on the node containing the image fill → extract the asset URL → `curl -o public/figma-assets/<name>.png <url>` → reference in `next/image`. The image is typically much larger than the rendered frame; apply the percent-based positioning from the generated code (e.g. `w-[207.98%] left-[-75.11%]`) to crop it correctly.

   Screenshots are still fine for: visual debugging, side-by-side comparison against the live build, or as a Read input. Never as production assets.

   **Vector-composed groups (LAVABO, HERO) — STILL never `get_screenshot`.** Some "image" areas in Figma aren't single image fills — they're compositions of 60-200 vector paths. `get_design_context` on these returns a giant JSX tree with dozens of `imgVector*` SVG URLs. Download every one of those vector SVGs and compose them in React using the inset percentages from the generated code. It's heavy (lots of files, lots of positioning) but it's the *only* acceptable path — there is no "fallback" to screenshotting a composed group. Past mistake (2026-05-21, LAVABO brand book): I rationalized using `get_screenshot` on Frame 54 as a "documented fallback" and shipped a blurry 393×545 PNG on mobile. User flagged it: there is no fallback. Inline the vectors. If a section is too large to inline in one pass, defer it with a TODO and ask the user — never substitute a screenshot.

3. **CRITICAL: pass `unoptimized` to `next/image` when applying Figma percent crops.** Past mistake (2026-05-20): we used `<Image width={intrinsicWidth} height={intrinsicHeight} sizes="429px" />` for a 4096×2733 KOKOP that was rendered at 892×595 via CSS `w-[207.98%]`. Next.js's optimizer read `sizes="429px"` and generated a 170×222 variant — then the browser upscaled that tiny variant by 5× to fit the actual rendered width. Result: visibly blurry on a high-res source.

   Why this happens: Figma percent crops make the image's true rendered size *bigger* than the frame it sits in. `next/image`'s `sizes` prop describes the rendered width to the optimizer, but for Figma-style crops the rendered width is `frameWidth * crop.w / 100` — not `frameWidth`. The two values disagree, optimizer picks the smaller one, image is downsampled.

   The fix: always pass `unoptimized` on `<Image>` inside the `FigmaImage` helper (or any image that uses a percent crop). This bypasses variant generation and serves the original PNG directly. Trade-off is slightly larger network transfer, but the originals are already reasonably sized and the visual quality gain is huge.

4. **Pull real design tokens.** Before guessing at colors, type, or spacing, call `mcp__plugin_figma_figma__get_variable_defs` for the file and lift exact values. The Figma text styles (`Subtitels · 58/121`, `body · 17/133`, `H3 · 20/Auto`) define font sizes and line heights — use them literally.

5. **Colors are NOT in `get_variable_defs` — they're inline on each node.** Past mistake (2026-05-20): assumed `get_variable_defs` would surface color tokens because it returned fonts. It doesn't — it only returns Figma *variables*, which this file doesn't use for color. The actual colors are baked into each node's fill. To get them:

   - **Text color** → call `get_design_context` on the text node (or its parent text-wrapper frame). The generated JSX shows `text-[#xxxxxx]` per element. *Always* check the parent wrapper — color often cascades from there (e.g., the hero text wrapper sets `text-[#fff7f4]` and individual `<p>` elements inherit).
   - **Section background color** → call `get_design_context` on the section's *containing frame* (not the text wrapper). The root `<div>` shows `bg-[#xxxxxx]`. We missed `#906553` on the about section because we only inspected child text frames.
   - **Never read colors from a screenshot.** Past mistake: I eyeballed the about background as cream from the low-res reference screenshot when it was actually `#906553` warm brown — completely changes the palette and the readable text color. The screenshot is a visual reference; the design context is the spec.

   Workflow when porting a section: call `get_design_context` on (a) the section's containing frame for the bg + parent text color, and (b) one or two child text wrappers for per-element overrides. Cache the colors in `globals.css` as semantic CSS variables (`--color-cream`, `--color-about`, etc.).

   Also: text styles like `Subtitels` say `size: 58` in the variable defs, but individual headlines often override to other sizes (the home hero/about use 75.407px). Check the actual node's `text-[XXpx]` value — don't assume the type style is applied verbatim.

6. **Component instances are opaque to `get_metadata` — `get_design_context` reveals them.** Past mistake (2026-05-20, nav rebuild): I called `get_metadata` on the Nav Component instance (`6:1282`) and got back a one-line `<instance ... />` with no children. Treated it like a black box, then *invented* the nav structure: I guessed "Home / Work / About / Info" links, used a text "SMUR." for the logo, and used arbitrary spacing. Every choice was wrong.

   Calling `get_design_context` on the same instance revealed: SVG logo (108×24), four links labeled "Services / WORK / ABOUT / LET'S WORK TOGETHER" (note the CTA at the end, not "Info"), 17px DM Sans uppercase, cream `#fff7f4`, 61px gap, and inner-row positioned at `left=86 right=85 top=20`.

   Rule: **for every component instance you intend to render, call `get_design_context` on it**, not just `get_metadata`. Logos are usually SVG assets — not text approximations. The link set is whatever the designer wrote, not what a "normal nav" would have. Spacing and inner positioning are part of the design, not negotiable.

7. **Reproduce at the design's native width — but build faithful-FLUID, not a fixed canvas.** The Figma is a 1440px desktop / 393px mobile composition with specific pixel positions for every element; those are the target values to match at that design width. But the home page (as of the faithful-fluid rearchitecture) is NOT rendered as a static 1440/393 canvas — it's a responsive build where every section reflows across viewport widths, using tokens/`clamp()`/container queries (see rule 8) to hold the Figma proportions at the design width and scale sanely outside it. Match the pixel positions AT 1440/393 first, then verify the fluid behavior in between and beyond those widths. `/work` and `/contact` still use the older fixed-canvas approach (not yet rebuilt — see rule 8 note).

8. **Home sections are tokenized and responsive — pixel-composed sections use the aspect-ratio-stage + container-query pattern; NO `zoom`, NO `transform: scale`.** This supersedes the earlier "fixed-height absolute-positioned, treat as a static canvas" approach. Two patterns now cover `components/sections/*`:

   - **Pixel-composed sections (hero, about — where exact Figma pixel positions matter most)**: an outer stage sized with `aspect-ratio` (matching the Figma frame's own W:H ratio) and `container-type: inline-size`, with children positioned using `cqw` (container-query width) units instead of raw px. This scales every child in lockstep with the stage's actual rendered width, so Figma's pixel grid reproduces proportionally at any viewport size — no JS resize listeners, no discrete breakpoint jumps.
   - **Everything else (service cards, testimonial, photo strip, nav, etc.)**: ordinary flex/grid layout, spaced and sized with `clamp()`-based design tokens (see `lib/tokens.ts` / `app/styles/*`) that hold the Figma value at the design width and ease down/up outside it.
   - **Forbidden:** CSS `zoom`, `transform: scale(...)` on whole sections, and fixed-height containers with absolutely-positioned pixel children as a substitute for responsiveness — all of these either break at non-design viewport widths or fake fluidity without actually reflowing content.

   Note: `/work` and `/contact` (and their supporting `components/work/`, `components/contact/`, `components/mobile/*-page.tsx` files) still use the legacy fixed-height/absolute-position approach described in earlier revisions of this rule. They have not been rebuilt faithful-fluid yet — don't "fix" them opportunistically as part of unrelated home-page work; that's a separate, explicit task.

9. **Match the frame's total height.** The HOME frame is 5187px tall (desktop) / 5281px tall (mobile). If our build renders significantly taller or shorter, our section spacing is wrong — revisit per-section heights, not section margins.

10. **No invented sections.** If a section isn't in the Figma, it doesn't ship. If a section IS in the Figma but seems redundant, it still ships.

11. **When in doubt, re-read the Figma.** Don't fall back on web design instincts ("this would look nicer if…"). The Figma is the spec.

12. **Atomic SVGs compose into bigger graphics via multiple positioned instances.** Past mistake (2026-05-20, mobile hamburger): downloaded `hamburger.svg` which was a single `viewBox="0 0 29 2"` horizontal line. I rendered it with `fill` over a 29×19 button — the single line stretched vertically into a solid black rectangle.

    Figma's actual design context for the hamburger uses **three positioned instances** of that one line at `top-0`, `top-1/2`, and `top-full` to form the 3-line icon. When you see an SVG with a tiny viewBox (single primitive) and the design context shows multiple `<div>` wrappers all referencing the same `imgVectorX` URL, you need to reproduce that multi-instance composition in code — not let one SVG fill the container.

    Detection: open the downloaded SVG with `head` or `Read`. If it's `<svg viewBox="0 0 N M">...one <path>...</svg>` with small dimensions, it's an atomic primitive, not a complete icon.

13. **Figma SVG fill colors are baked in, and often differ between mobile and desktop assets.** Past mistake (2026-05-20, adaptive nav): used `brightness(0)` to recolor the mobile SMUR logo, assuming it was natively light like the desktop logo. It wasn't — `grep fill` revealed:
    - Mobile logo: `fill="var(--fill-0, #35221A)"` (dark brown)
    - Desktop logo: `fill="var(--fill-0, #FFF7F4)"` (cream)

    Opposite native colors. The filter that converts cream→black for desktop (`brightness(0)`) is a no-op on already-dark mobile. To flip dark→white you need `brightness(0) invert(1)`.

    Workflow: before applying any CSS filter to an SVG asset, `grep -oE 'fill="[^"]+"' file.svg | sort -u` to find the native fill, then choose the filter accordingly.

14. **Fixed/sticky navs need an opaque background that adapts to the section behind them.** Past mistake (2026-05-20): tried three wrong patterns in sequence — (a) hardcoded `bg-hero/85` on scroll: cream/sage/brown sections got a clashing beige strip; (b) fully transparent nav: content scrolled visibly through, text-on-text mess; (c) static nav background: clashed on opposite-tone sections.

    Working pattern (see `components/use-nav-scheme.ts`):
    - Each section declares `data-nav-scheme="light|dark"` (controls text/icon color)
    - `useNavInfo` hook uses `document.elementsFromPoint(width/2, 30)` to find the section currently behind the nav
    - Reads `getComputedStyle(section).backgroundColor` and applies it as the nav's bg
    - Solid bg hides content scrolling beneath; same color as section means it looks like the section extends up

    Caveats: walk up ancestors from the elementsFromPoint candidates (the nav itself sits on top in z-order); fall back to page bg for sections without an explicit background.

15. **Use `useLayoutEffect` (not `useEffect`) for hydration-aware DOM detection.** When a hook needs to read DOM state on mount and apply it to component output (like "what section is the nav over → what background color to use"), `useEffect` runs *after* the browser first paints — so the user sees a flash of the initial-state value before the effect updates it. `useLayoutEffect` runs synchronously after DOM mutation, before paint.

    Past mistake (2026-05-20): the user reported "the header moves a tiny bit when I first start scrolling." Position was actually stable — they were seeing a 200ms cream-to-beige color transition firing right after hydration. Switching `useEffect` to `useLayoutEffect` eliminated the flash.

    SSR pattern: `const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;` (avoid the "useLayoutEffect does nothing on server" warning).

16. **Scope CSS transitions narrowly: prefer `transition-[property]` over `transition-colors`.** Tailwind's `transition-colors` animates color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, AND gradient stops simultaneously. If only one property is changing, `transition-[background-color]` (or whichever) prevents incidental animations on unrelated state changes.

17. **Mobile and desktop in Figma are SEPARATE designs — kept as separate components, but no longer separate pages/trees.** Different assets, different native fill colors, different layouts, still hold: pull each from its dedicated Figma page and build/maintain independent components — `MobileHero` and `Hero`, `MobileAbout` and `About`, etc. — never a "responsive squeeze" of the desktop markup.

    What changed in the faithful-fluid rearchitecture: `app/page.tsx` now renders BOTH the mobile and desktop component trees in the same server-rendered HTML and toggles visibility with CSS (`md:hidden` / `hidden md:block`) rather than picking one tree with JS at a breakpoint. Because both trees are in the DOM together, mobile components use `m-`-prefixed ids (and `MobileMenu` rewrites internal links accordingly) to avoid duplicate-id collisions with their desktop counterparts (e.g. two `#services` anchors on one page would be invalid). Foundation tokens (`lib/tokens.ts`, `app/styles/*`) and shared primitives (`components/core/*`) are shared between both trees — only the Figma-driven layout/positioning differs.

### Dev-server quirks

- **Turbopack stale-module hydration mismatch.** On rapid edits to client components, the server cache occasionally lags the freshly hot-reloaded client cache. Symptoms: React hydration error showing class/style diffs between server HTML and client render (different `h-[XX]`, different `top: XX`, different `transition-*`). Fix: `rm -rf .next && pnpm dev`. Don't bother trying to "force HMR" — clear + restart is reliable.

### Workflow before writing any UI code

1. `get_metadata` on the target frame to confirm structure and text positions
2. `get_design_context` on the section's containing frame → background color, cascaded text color, asset URLs
3. `get_design_context` on each component instance you'll render (nav, dropdowns, buttons) — instances are opaque to `get_metadata`
4. `get_design_context` on key text wrappers → per-element fonts/colors/sizes (often override the named style)
5. `curl` each asset URL into `public/figma-assets/` at full resolution
6. `get_variable_defs` for the file → fonts (and any defined color/spacing variables)
7. THEN write the component using `<FigmaImage unoptimized>` for cropped images and exact text/positions/colors from the Figma

### Mobile

The Figma has a **dedicated mobile design**, not a responsive squeeze of the 1440 desktop. Mobile design is on page `all pages mobile` (`268:2187`); the home frame is `home` (`268:3521`) at **393 × 5281**. Components live on `components mobile` (`268:4639`).

Mobile is in scope. Same fidelity rules apply (rules 1–6 above). Build mobile views as separate components and switch layouts at a Tailwind breakpoint — *don't* try to make desktop components reflow responsively, because the mobile Figma has different proportions, component sizes, and even different sub-layouts (e.g., mobile dropdowns are styled differently from desktop).

### Foundation reference

The home page is built on a shared token/component foundation, not one-off per-section styling:

- `lib/tokens.ts` + `app/styles/*` (`tokens.css`, `typography.css`, `spacing.css`, `motion.css`) — the `clamp()`-based design tokens referenced throughout this doc.
- `components/core/*` — shared primitives (button, eyebrow, wordmark, icon).
- `components/navigation/*` — current `Nav`/`MobileNav`/`MobileMenu` (the home page's nav; `components/nav.tsx` and `components/mobile/nav.tsx` are the older versions still used by `/work` and `/contact`).
- `components/sections/*` — current home sections (hero, about, service/services-list, testimonial, photo-strip, and their `Mobile*` counterparts), superseding the old top-level `components/hero.tsx`, `components/about.tsx`, `components/service-card.tsx`, etc. and the old `components/mobile/*` section files (all retired — see git history for the removal commit).
- `docs/superpowers/specs/2026-07-20-faithful-fluid-rearchitecture-design.md` and `docs/superpowers/plans/2026-07-21-*.md` — the design spec and implementation plans behind this architecture, useful background before touching `components/sections/*` or the token foundation.

### Out of scope (do not work on without explicit ask)

- Routes other than `/` (no `/work`, `/about` pages yet — links are anchors)
- CMS, forms, or any interactive behavior beyond what's in the Figma prototype
