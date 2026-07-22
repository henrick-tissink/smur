# Phase 4 — `/work` index page (faithful-fluid) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Rebuild the `/work` index (the project-tile collage) faithful-fluid and swap the live `app/work/page.tsx` off the zoom/fixed-canvas build, preserving every animation (the `TileCarousel` auto-crossfades on the Architrave/Lavabo/MNF tiles, `Reveal` reveals, the bouncing scroll arrow), and moving `/work` to the NEW navigation.

**Architecture:** The `/work` index is a pixel-composed collage (1440×5187 desktop / 393×2309 mobile) of absolutely-positioned tiles + hero + footer — a textbook **aspect-ratio stage** case. Each page becomes one stage (`aspect-ratio` = frame W:H, `container-type: inline-size`, capped at `max-w`), with tiles positioned/sized by `%` and text/arrow in `cqw`. The existing tile renderers (`ArchitraveTile`/`LavaboTile`/`NnfTile` → `TileCarousel`) and `Reveal` are REUSED unchanged (they fill their container + animate). No `zoom`, no `transform:scale`.

**Tech Stack:** Next.js 16, React 19, Tailwind v4, `motion/react`, Vitest + RTL. Reuses `Reveal`, `TitleMask`, `BouncingArrow`/`Arrow`, `TileCarousel` + the work tiles, `content/work.ts`, and the new `components/navigation/*`.

**Phase context:** Plan 4 (spec: `docs/superpowers/specs/2026-07-20-faithful-fluid-rearchitecture-design.md`). Follows the completed home re-architecture (Phases 1–3). Legacy `components/work/page.tsx` + `components/mobile/work-page.tsx` stay until the swap task deletes them. `/work/<slug>` case-study routes are LATER phases and are untouched here.

## Global Constraints

- **Runtime:** Node 22, pnpm 10.33.4. If missing: `export PATH="$HOME/.nvm/versions/node/v22.23.1/bin:$PATH"`.
- **PRESERVE ALL ANIMATIONS:** `TileCarousel` (1400ms auto-advance, 220ms crossfade, pause-on-hover) on Architrave/Lavabo/MNF tiles; `Reveal` (with `eager` on the tiles + footer — REQUIRED, see below); `BouncingArrow` down cue. Reuse these components unchanged.
- **`eager` Reveal is required** on the tiles + footer (they wrap absolutely-positioned/zero-height or bottom-pinned content, so scroll `whileInView` never fires). Keep `eager` exactly as the legacy did.
- **Faithful + fluid:** aspect-ratio stage + `%`/`cqw`, capped at `max-w`. No `zoom`/`transform:scale`/fixed-canvas.
- **New navigation:** the swapped route uses `Nav` / `MobileNav` from `@/components/navigation` (NOT the legacy `components/nav.tsx`). MobileMenu already rewrites `/#x → /#m-x` (cross-page to home sections — correct).
- **Content verbatim** from `content/work.ts` (`workProjects`, `workHero`, `workFooter`, `workFrame`, `workTileHref`). Tiles link via `workTileHref(slug)`.
- **Do NOT touch** the case-study routes/components or legacy nav (used by `/work/*` + `/contact`).
- **Path alias:** `@/*` → repo root. TDD + frequent commits.

## Source values (from the Figma-accurate legacy)

- **Desktop** (`components/work/page.tsx`, `content/work.ts`): stage 1440×5187, bg `#fff7f4`; hero intro box `left 435 top 141 w 569`, eyebrow 20px italic accent, `TitleMask this-is-my-work.svg` 254.66×145.21 centered (`as={1}`), `BouncingArrow direction="down" size={72}` at abs `left 684 top 345` (72×94 box); 10 tiles at `p.desktop.{x,y,w,h}` each a `Link href={workTileHref(slug)}` (Architrave/Lavabo/MNF → their `*Tile`, else `<Image object-cover>`), `Reveal eager delay={0.05+(i%4)*0.04}`; footer "Thanks :)" 27px italic accent at `left 476 top 5056 w 488`.
- **Mobile** (`components/mobile/work-page.tsx`): stage 393×2309; hero box `left 79 top 101 w 239`, eyebrow 15px, `TitleMask` 197.6×112.7, arrow at `left 169 top 245` (55×71.8 box); tiles at `p.mobile.{...}`, `Reveal eager`; footer 15px at `left 94 top 2263 w 205`, `Reveal eager`.

---

### Task 1: `Arrow` + `BouncingArrow` accept `size: number | string`

**Files:** Modify `components/arrow.tsx`, `components/bouncing-arrow.tsx`; Test `components/bouncing-arrow.test.tsx` (create).

**Interfaces:** Both `size` props widen to `number | string`; a number renders as `${n}px` (unchanged — every existing caller keeps working), a string is used verbatim as the CSS length (enables `cqw`). `BouncingArrow`'s `distance` (bounce px) stays a number. All other behavior (rotation per direction, reduced-motion, mask) unchanged.

- [ ] **Step 1:** Read `components/arrow.tsx` + `components/bouncing-arrow.tsx`. Write `components/bouncing-arrow.test.tsx`:
```tsx
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { BouncingArrow } from "@/components/bouncing-arrow";

describe("BouncingArrow", () => {
  it("renders a numeric size as px", () => {
    const { container } = render(<BouncingArrow direction="down" size={72} />);
    const svg = container.querySelector("svg")!;
    // Arrow's own box is size * 0.347 wide; assert the rendered svg width ends in px
    expect(svg.getAttribute("width") || (svg as SVGElement).style.width).toMatch(/px$|^\d/);
  });
  it("accepts a string (cqw) size", () => {
    const { container } = render(<BouncingArrow direction="down" size="5cqw" />);
    const svg = container.querySelector("svg")!;
    const w = svg.getAttribute("width") || (svg as SVGElement).style.width || "";
    expect(w).toContain("cqw");
  });
});
```
(Read `arrow.tsx` first to see exactly how `size` maps to the svg/box dimensions, and adjust the assertion to match the real DOM — the point is: numeric→px, string→verbatim.)
- [ ] **Step 2:** Run — verify FAIL (string case).
- [ ] **Step 3:** In `arrow.tsx`, widen `size` to `number | string`; add a `len()` helper (`typeof v === "number" ? \`${v}px\` : v`) and apply it wherever the arrow sets width/height from `size`. In `bouncing-arrow.tsx`, widen `size` to `number | string` and pass it through to `Arrow` (the `distance`/bounce math stays numeric). Keep every other line identical.
- [ ] **Step 4:** Run — verify PASS; full `pnpm test` (all existing callers still green).
- [ ] **Step 5:** Commit — `feat(arrow): Arrow/BouncingArrow accept CSS-length size (cqw)`.

---

### Task 2: Fluid `WorkPage` (desktop)

**Files:** Create `components/sections/work-page.tsx`; Test `components/sections/work-page.test.tsx`.

**Interfaces:** `export function WorkPage(): JSX.Element` — the desktop `/work` collage as an aspect-ratio stage: `<section data-nav-scheme="dark">` bg `var(--color-page)`; stage `mx-auto w-full max-w-[1440px]`, `aspectRatio:"1440 / 5187"`, `containerType:"inline-size"`, `data-work-stage`. Hero (eyebrow cqw / `TitleMask` cqw / `BouncingArrow size="<cqw>"`), the 10 tiles, and the footer positioned by `%` of 1440/5187, reusing the existing `ArchitraveTile`/`LavaboTile`/`NnfTile` (from `@/components/work/*`) and `Reveal eager` exactly.

- [ ] **Step 1:** Base on legacy `components/work/page.tsx`. Convert: section→aspect-stage; `container.{x,y,w}`→`%`; eyebrow `fontSize` `${eyebrowSize/1440*100}cqw`, footer likewise; `TitleMask` width/height in cqw (254.66/1440, 145.21/1440); arrow box position `%`, `BouncingArrow size` in cqw (72/1440≈5cqw); each tile `Link` `left/top/width/height` as `%` of the 1440/5187 stage (`p.desktop.x/1440*100 + "%"`, `p.desktop.y/5187*100 + "%"`, `w/1440`, `h/5187`). Keep `Reveal eager delay={0.05+(i%4)*0.04}`, `workTileHref`, the Architrave/Lavabo/MNF `*Tile` branch (pass `width={p.desktop.w}` still — it's only a `sizes` hint), else `<Image ... object-cover>`. Write `work-page.test.tsx`:
```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { WorkPage } from "@/components/sections/work-page";
import { workProjects } from "@/content/work";

describe("WorkPage (desktop)", () => {
  it("renders the fluid stage", () => {
    const { container } = render(<WorkPage />);
    const stage = container.querySelector("[data-work-stage]") as HTMLElement;
    expect(stage.style.aspectRatio.replace(/\s/g, "")).toBe("1440/5187");
    expect(stage.style.containerType).toBe("inline-size");
  });
  it("renders the heading and every project tile as a link", () => {
    render(<WorkPage />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    for (const p of workProjects) {
      expect(screen.getByRole("link", { name: p.name })).toBeInTheDocument();
    }
  });
});
```
- [ ] **Step 2:** Run FAIL → implement → PASS. Full `pnpm test`, `pnpm build`.
- [ ] **Step 3:** Commit — `feat(sections): fluid desktop WorkPage (aspect stage, TileCarousel + Reveals preserved)`.

---

### Task 3: Fluid `MobileWorkPage`

**Files:** Create `components/sections/mobile-work-page.tsx`; Test `components/sections/mobile-work-page.test.tsx`.

**Interfaces:** `export function MobileWorkPage(): JSX.Element` — the mobile collage as an aspect-ratio stage `max-w-[393px]`, `aspectRatio:"393 / 2309"`, `container-type:inline-size`, `data-work-stage`. Same structure, using `p.mobile.{...}` positions as `%` of 393/2309, mobile hero sizes (eyebrow 15px, TitleMask 197.6×112.7, arrow box 55×71.8), footer 15px, all `%`/`cqw`; `Reveal eager` throughout (incl. footer). Reuse the same tiles.

- [ ] **Step 1:** Base on legacy `components/mobile/work-page.tsx`; same conversion vs the 393/2309 base. Test mirrors Task 2 (stage aspect 393/2309; heading + all tile links present).
- [ ] **Step 2:** FAIL → implement → PASS. Full `pnpm test`, `pnpm build`.
- [ ] **Step 3:** Commit — `feat(sections): fluid MobileWorkPage (aspect stage, animations preserved)`.

---

### Task 4: Swap `app/work/page.tsx` (live) + verify

**Files:** Rewrite `app/work/page.tsx`.

Replace the zoom dual-layout with render-both, CSS-toggled, no-zoom, NEW nav:
```tsx
import type { Metadata } from "next";
import { Nav } from "@/components/navigation/nav";
import { MobileNav } from "@/components/navigation/mobile-nav";
import { WorkPage } from "@/components/sections/work-page";
import { MobileWorkPage } from "@/components/sections/mobile-work-page";

export const metadata: Metadata = { /* keep the existing title/description */ };

export default function WorkRoute() {
  return (
    <>
      <div className="md:hidden">
        <MobileNav />
        <main><MobileWorkPage /></main>
      </div>
      <div className="hidden md:block">
        <Nav />
        <main><WorkPage /></main>
      </div>
    </>
  );
}
```
Notes: keep the existing `metadata`. NO `zoom`/scale/fixed-canvas. `Nav` defaults to `scheme="dark"` (the work page is `data-nav-scheme="dark"` — cream bg, ink text) — pass no scheme or `scheme="dark"` (verify the work bg wants ink nav). `app/work/layout.tsx` (BackToTop wrapper) is unaffected — leave it.

- [ ] **Step 1:** Rewrite `app/work/page.tsx`. Write/adjust `app/work/page.test.tsx`: renders; the heading exists; there is exactly one desktop stage + one mobile stage (or assert both `WorkPage` and `MobileWorkPage` present). (Both trees render the same tile ids/hrefs — the tiles use `href`, not `id`, so no duplicate-id concern here.)
- [ ] **Step 2:** `pnpm test` (all green), `pnpm build` (all routes incl `/work` + `/work/*` + `/contact` still compile).
- [ ] **Step 3:** Commit — `feat(work): swap live /work index to faithful-fluid (no zoom, new nav)`.
- [ ] **Step 4: (controller visual check — REQUIRED before merge)** `pnpm dev` → `/work`: desktop 1440 + ~800–1300 + mobile ≤767 — the tile collage scales proportionally, the Architrave/Lavabo/MNF tiles auto-crossfade + pause on hover, tiles link to `/work/<slug>`, the down arrow bounces, hero + "Thanks :)" reveal, nav overlays correctly, no overflow.

### Task 5: Retire legacy work-index components
- [ ] After Task 4, `grep` that `components/work/page.tsx` and `components/mobile/work-page.tsx` have zero importers (the route now uses `components/sections/*`), then delete them. DO NOT delete the tile components (`architrave-tile`/`lavabo-tile`/`nnf-tile`/`tile-carousel`) — the new WorkPage reuses them. `pnpm test` + `pnpm build` green. Commit — `chore(work): retire legacy work-index components`.

---

## Self-Review (completed by plan author)
- **Spec coverage:** `/work` index desktop+mobile → Tasks 2–3; live swap → Task 4; retire legacy → Task 5; the arrow-size enabler → Task 1. Animation preservation → TileCarousel/Reveal/BouncingArrow reused unchanged. Faithful-fluid no-zoom → aspect-stage +%/cqw. New nav on the route. Content verbatim from `content/work.ts`.
- **Placeholder scan:** Tasks 2–3 are port-from-legacy with explicit aspect-stage/%/cqw rules + tests (consistent with the home ports); new/enabler code (Task 1, route) is concrete. No vague placeholders.
- **Type consistency:** `Arrow`/`BouncingArrow` `size: number|string` (Task 1) consumed by WorkPage/MobileWorkPage (Tasks 2–3, cqw). Tiles reused with their existing `width:number` prop. New nav imports resolve to `@/components/navigation/*`.
- **Scope:** case-study routes + legacy nav untouched; only `/work` swapped; tiles kept.
- **Risk:** Task 4 is a live route swap (isolated to `/work`, not home); visual check required before merge (browser may be down → verify locally).
