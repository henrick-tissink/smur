# Phase 6 — Case Studies (faithful-fluid) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert all 10 `/work/<slug>` case-study pages (desktop + mobile) off the legacy fixed-canvas + CSS `zoom` architecture onto the proven faithful-fluid aspect-ratio-stage pattern, on the new nav, render-both CSS-toggled — no zoom, animations preserved, baked vector/image art untouched.

**Architecture:** Each legacy case-study page is a fixed `W×H` canvas (`overflow-hidden`) with absolutely-positioned px children (SVG background vectors + rounded image fills), Reveal animations, and — for heavy pages — deferred "extras" sub-components that are large baked vector compositions. The transform is exactly the one Phase 4 (/work index, merged) applied: replace the fixed canvas with an aspect-ratio stage (`aspectRatio:"W/H"` + `container-type: inline-size`), express every px position as `%` of the frame and every text/icon size as `cqw`, keep all art/Reveal/`unoptimized` images byte-identical, swap the route to the new nav and render-both. Heavy "extras" compositions stay internally unchanged; only their positioning wrapper in the parent page is %-converted.

**Tech Stack:** Next.js 16.2.6, React 19, Tailwind v4, `motion/react` (via existing `Reveal`), Vitest + React Testing Library + jsdom.

## Global Constraints

- **NO `zoom`, NO `transform: scale`, NO fixed-canvas wrapper.** The route renders both trees CSS-toggled at `md` (`md:hidden` / `hidden md:block`), exactly like `app/work/page.tsx` (merged Phase 4) and `app/page.tsx`.
- **New nav only:** `import { Nav } from "@/components/navigation/nav"` and `import { MobileNav } from "@/components/navigation/mobile-nav"`. Both default `scheme="dark"` (cream bg, ink text) — keep the default unless the page's own `data-nav-scheme` is `"light"`, in which case pass `scheme="light"`.
- **Preserve every animation.** Reuse `@/components/reveal` (and any carousel/motion component the legacy page used) UNCHANGED — same wrapper nesting, same `delay=` values, same `eager` flags. Only layout units (px→%/cqw) change.
- **Content is verbatim & authoritative.** All copy, frame dimensions, colors, and per-element coordinates come from `content/<slug>.ts` and the existing legacy component. Never invent or "improve" copy, spacing, or color. Preserve typos.
- **Original assets only.** Every `<img>`/`next/image` keeps its exact `src`, `unoptimized`, `priority`, and alt text. Do not swap, re-crop, or re-optimize art. Baked SVG background vectors and heavy "extras" compositions are copied over unchanged internally.
- **Frame dims are the source of truth for the stage.** Read `<slug>Frame.desktop` / `<slug>Frame.mobile` (`{ width, height }`) from `content/<slug>.ts`. `STAGE_W`/`STAGE_H` per tree = those exact numbers. `max-w-[<width>px]` caps the stage so `cqw` never grows unbounded.
- **Containing-block gotcha (mandatory check).** A `%`-positioned element nested inside another absolutely-positioned, height-less box resolves its `%` against THAT box, not the stage. Any element that in the legacy code was a direct child of the fixed canvas MUST remain a direct child of the aspect-stage. If converting reveals a nested absolute group whose children use frame-absolute coords, hoist those children to direct stage children (a `position: static` `Reveal` wrapper does NOT create a containing block, so wrapping in `Reveal` is fine). Phase 4 shipped a bug here (the scroll arrow) — every task must actively verify it.
- **Delete the legacy components for a slug in the same task that converts it** (`components/work/<slug>-page.tsx` and `components/mobile/<slug>-page.tsx`), after grep-confirming the route is the only importer. KEEP all `content/<slug>.ts`, `*-extras/*`, `*-tile.tsx`, `tile-carousel.tsx`, and `@/components/reveal`.
- **Legacy nav (`components/nav.tsx`, `components/mobile/nav.tsx`) retires only in the final task**, once no route imports it.
- Run commands with `export PATH="$HOME/.nvm/versions/node/v22.23.1/bin:$PATH"` prefixed. Test: `pnpm test`. Build: `pnpm build`.

---

## Conversion Recipe (apply verbatim per page — this is the shared pattern)

**New component location:** `components/sections/<slug>-page.tsx` (desktop) and `components/sections/mobile-<slug>-page.tsx` (mobile). Export names stay identical to legacy (e.g. `SwsCaseStudy`, `MobileSwsCaseStudy`) so only the route's import path changes.

**Stage skeleton** (replace the legacy fixed-canvas root `<div style={{ width, height, ... }}>`):

```tsx
const STAGE_W = <frame.width>;
const STAGE_H = <frame.height>;
const pctX = (px: number) => `${(px / STAGE_W) * 100}%`;
const pctY = (px: number) => `${(px / STAGE_H) * 100}%`;
const cqw = (px: number) => `${(px / STAGE_W) * 100}cqw`;

export function SwsCaseStudy() {
  return (
    <section
      data-nav-scheme="dark"            /* keep the legacy value verbatim */
      className="w-full"
      style={{ backgroundColor: "#fff7f4" /* keep the legacy bg verbatim */ }}
    >
      <div
        className="relative mx-auto w-full overflow-hidden max-w-[<STAGE_W>px]"
        style={{ aspectRatio: "<STAGE_W> / <STAGE_H>", containerType: "inline-size" }}
      >
        {/* ...converted children... */}
      </div>
    </section>
  );
}
```

**Per-child conversion rules:**
- `left: N`  → `left: pctX(N)`
- `top: N`   → `top: pctY(N)`
- `width: N` (a horizontal extent) → `width: pctX(N)`
- `height: N` (a vertical extent) → `height: pctY(N)`
- `fontSize: N` (and icon/arrow box sizes, `TitleMask` width/height, `gap`/`letterSpacing` where they must scale) → `cqw(N)`
- Keep `position: absolute`, `overflow-hidden`, every `Reveal`/`delay`/`eager`, every image `src`/`unoptimized`/`priority`/`alt`, and every baked-SVG `<img>` unchanged.
- Element that was a direct child of the canvas → direct child of the stage `<div>` (see containing-block gotcha).

**Mobile** is the same recipe with `STAGE_W/STAGE_H = <slug>Frame.mobile` and `max-w-[<mobile width>px]`.

**Standard test** — create `components/sections/<slug>-page.test.tsx`:

```tsx
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { SwsCaseStudy } from "./sws-page";
import { MobileSwsCaseStudy } from "./mobile-sws-page";

describe("SwsCaseStudy (faithful-fluid)", () => {
  it("renders an aspect-ratio stage, not a zoom/fixed canvas", () => {
    const { container } = render(<SwsCaseStudy />);
    const stage = container.querySelector<HTMLElement>("[style*='aspect-ratio']");
    expect(stage).not.toBeNull();
    expect(stage!.style.containerType).toBe("inline-size");
    // no zoom anywhere in the tree
    expect(container.innerHTML).not.toContain("zoom");
  });

  it("keeps the hero art (original asset, not a screenshot)", () => {
    const { container } = render(<SwsCaseStudy />);
    // assert one known image src from content/<slug>.ts is present
    expect(container.querySelector("[src*='/figma-assets/work/sws/']")).not.toBeNull();
  });

  it("mobile tree also renders as an aspect-ratio stage", () => {
    const { container } = render(<MobileSwsCaseStudy />);
    const stage = container.querySelector<HTMLElement>("[style*='aspect-ratio']");
    expect(stage).not.toBeNull();
    expect(container.innerHTML).not.toContain("zoom");
  });
});
```

Adapt the export names and the asset-src assertion per slug. Where a page has a distinctive absolutely-positioned element that is prone to the containing-block trap (a scroll cue, an overlaid caption, a nested group), ADD a fourth assertion that reads that element's inline `left`/`top` and asserts the frame-relative `%` string — this is the Phase-4-arrow guard.

**Route file** (`app/work/<slug>/page.tsx`) — replace the two `zoom:` wrappers with:

```tsx
import type { Metadata } from "next";
import { Nav } from "@/components/navigation/nav";
import { MobileNav } from "@/components/navigation/mobile-nav";
import { SwsCaseStudy } from "@/components/sections/sws-page";
import { MobileSwsCaseStudy } from "@/components/sections/mobile-sws-page";

export const metadata: Metadata = { /* keep verbatim */ };

export default function SwsRoute() {
  return (
    <>
      <div className="md:hidden">
        <MobileNav />
        <main><MobileSwsCaseStudy /></main>
      </div>
      <div className="hidden md:block">
        <Nav />
        <main><SwsCaseStudy /></main>
      </div>
    </>
  );
}
```
(Pass `scheme="light"` to both navs iff the page's `data-nav-scheme` is `"light"`.)

---

### Task 1: sws (Sassy Woman Society) — establishes the recipe

**Files:**
- Create: `components/sections/sws-page.tsx`, `components/sections/mobile-sws-page.tsx`, `components/sections/sws-page.test.tsx`
- Modify: `app/work/sws/page.tsx`
- Delete: `components/work/sws-page.tsx`, `components/mobile/sws-page.tsx`

**Frame:** `swsFrame.desktop = { width: 1440, height: 4053 }`; read `swsFrame.mobile` from `content/sws.ts` for the mobile stage. bg `#fff7f4`, `data-nav-scheme="dark"`, title ink `#35221a`. Simplest page (3 sections, no `-extras`).

- [ ] **Step 1: Write the failing test** — `components/sections/sws-page.test.tsx` per the Conversion Recipe template (export names `SwsCaseStudy`/`MobileSwsCaseStudy`; asset assertion `src*='/figma-assets/work/sws/'`). It imports files that don't exist yet.
- [ ] **Step 2: Run it, verify it fails** — `pnpm test sws-page` → FAIL (cannot resolve `./sws-page`).
- [ ] **Step 3: Convert desktop** — copy `components/work/sws-page.tsx` → `components/sections/sws-page.tsx`, apply the stage skeleton + per-child px→%/cqw rules. Read every coordinate from the legacy file; do NOT round or re-derive. Verify the containing-block rule on each absolutely-positioned child.
- [ ] **Step 4: Convert mobile** — same for `components/mobile/sws-page.tsx` → `components/sections/mobile-sws-page.tsx` using `swsFrame.mobile`.
- [ ] **Step 5: Swap the route** — rewrite `app/work/sws/page.tsx` per the route template (new nav, render-both, no zoom; keep `metadata` verbatim).
- [ ] **Step 6: Run the test** — `pnpm test sws-page` → PASS.
- [ ] **Step 7: Delete legacy** — `rg "work/sws-page|mobile/sws-page" -g '*.ts*'` → only the (now-updated) route should have referenced them; remove `components/work/sws-page.tsx` + `components/mobile/sws-page.tsx`. Re-run `pnpm test` (full) → all green.
- [ ] **Step 8: Build + commit** — `pnpm build` (all routes compile) → `git add -A && git commit -m "feat(work): sws case study faithful-fluid (aspect-stage, new nav, no zoom)"`.

---

### Task 2: mnf (Manufaktura Studio)

**Files:** Create `components/sections/mnf-page.tsx`, `mobile-mnf-page.tsx`, `mnf-page.test.tsx`; Modify `app/work/mnf/page.tsx`; Delete `components/work/mnf-page.tsx`, `components/mobile/mnf-page.tsx`.
**Frame:** read `mnfFrame.desktop`/`.mobile` from `content/mnf.ts`. Uses `nnf-tile.tsx` and inline SVG letterform arrays (`v0.svg…`) positioned by px — convert their `left/top/width/height` to %/pctY like any other child; KEEP `nnf-tile.tsx` and the SVG assets. Exports `MnfCaseStudy`/`MobileMnfCaseStudy`.

- [ ] **Step 1–8:** Follow the Conversion Recipe exactly (test first → convert desktop → convert mobile → swap route → test → delete legacy → build → commit). Asset assertion: `src*='/figma-assets/work/mnf/'`. Commit: `feat(work): mnf case study faithful-fluid`.

---

### Task 3: taf

**Files:** Create `components/sections/taf-page.tsx`, `mobile-taf-page.tsx`, `taf-page.test.tsx`; Modify `app/work/taf/page.tsx`; Delete `components/work/taf-page.tsx`, `components/mobile/taf-page.tsx`.
**Frame:** `tafFrame.desktop = { width: 1440, height: 4942 }`; read `.mobile`. Exports `TafCaseStudy`/`MobileTafCaseStudy`. Asset assertion: `src*='/figma-assets/work/taf/'`.

- [ ] **Step 1–8:** Conversion Recipe verbatim. Commit: `feat(work): taf case study faithful-fluid`.

---

### Task 4: lavabo

**Files:** Create `components/sections/lavabo-page.tsx`, `mobile-lavabo-page.tsx`, `lavabo-page.test.tsx`; Modify `app/work/lavabo/page.tsx`; Delete `components/work/lavabo-page.tsx`, `components/mobile/lavabo-page.tsx`.
**Frame:** `lavaboFrame.desktop = { width: 1440, height: 5336 }`, `.mobile = { width: 393, height: 2499 }`. Uses `lavabo-tile.tsx` (KEEP). Lavabo is a vector-composed brand-book section — its baked SVG composition stays internally unchanged; only positioning wrappers convert. Exports `LavaboCaseStudy`/`MobileLavaboCaseStudy`. Asset assertion: `src*='/figma-assets/work/lavabo/'`.

- [ ] **Step 1–8:** Conversion Recipe verbatim. Commit: `feat(work): lavabo case study faithful-fluid`.

---

### Task 5: crisp

**Files:** Create `components/sections/crisp-page.tsx`, `mobile-crisp-page.tsx`, `crisp-page.test.tsx`; Modify `app/work/crisp/page.tsx`; Delete `components/work/crisp-page.tsx`, `components/mobile/crisp-page.tsx`.
**Frame:** `crispFrame.desktop = { width: 1440, height: 5340 }`; read `.mobile`. Largest single-file page (397 lines) — many sections; work through them top-to-bottom, converting each child. Exports `CrispCaseStudy`/`MobileCrispCaseStudy`. Asset assertion: `src*='/figma-assets/work/crisp/'`.

- [ ] **Step 1–8:** Conversion Recipe verbatim. Commit: `feat(work): crisp case study faithful-fluid`.

---

### Task 6: kabinett

**Files:** Create `components/sections/kabinett-page.tsx`, `mobile-kabinett-page.tsx`, `kabinett-page.test.tsx`; Modify `app/work/kabinett/page.tsx`; Delete `components/work/kabinett-page.tsx`, `components/mobile/kabinett-page.tsx`.
**Frame:** `kabinettFrame.desktop = { width: 1440, height: 4985 }`; read `.mobile`. Has `kabinett-extras/` (bottom.tsx, row3-right.tsx) — these stay internally unchanged; convert only their positioning wrapper in the page. Note `content/kabinett.ts` has real-text overlays (Quicksand 11.76px `#5d5d5d`) — size those with `cqw`. Exports `KabinettCaseStudy`/`MobileKabinettCaseStudy`. Asset assertion: `src*='/figma-assets/work/kabinett/'`.

- [ ] **Step 1–8:** Conversion Recipe verbatim. Watch the containing-block rule where `kabinett-extras` wrappers nest. Commit: `feat(work): kabinett case study faithful-fluid`.

---

### Task 7: interstellar

**Files:** Create `components/sections/interstellar-page.tsx`, `mobile-interstellar-page.tsx`, `interstellar-page.test.tsx`; Modify `app/work/interstellar/page.tsx`; Delete `components/work/interstellar-page.tsx`, `components/mobile/interstellar-page.tsx`.
**Frame:** `interstellarFrame.desktop = { width: 1440, height: 5075 }`; read `.mobile`. Has `interstellar-extras/` (row5-full.tsx) — stays internal. Exports `InterstellarCaseStudy`/`MobileInterstellarCaseStudy`. Asset assertion: `src*='/figma-assets/work/interstellar/'`.

- [ ] **Step 1–8:** Conversion Recipe verbatim. Commit: `feat(work): interstellar case study faithful-fluid`.

---

### Task 8: iwl

**Files:** Create `components/sections/iwl-page.tsx`, `mobile-iwl-page.tsx`, `iwl-page.test.tsx`; Modify `app/work/iwl/page.tsx`; Delete `components/work/iwl-page.tsx`, `components/mobile/iwl-page.tsx`.
**Frame:** `iwlFrame.desktop = { width: 1440, height: 5081 }`; read `.mobile`. Heavy: `iwl-extras/row2-content.tsx` (714 lines, baked vector composition) — stays internally unchanged; convert only its positioning wrapper. Exports `IwlCaseStudy`/`MobileIwlCaseStudy`. Asset assertion: `src*='/figma-assets/work/iwl/'`.

- [ ] **Step 1–8:** Conversion Recipe verbatim. Commit: `feat(work): iwl case study faithful-fluid`.

---

### Task 9: kokop

**Files:** Create `components/sections/kokop-page.tsx`, `mobile-kokop-page.tsx`, `kokop-page.test.tsx`; Modify `app/work/kokop/page.tsx`; Delete `components/work/kokop-page.tsx`, `components/mobile/kokop-page.tsx`.
**Frame:** `kokopFrame.desktop = { width: 1440, height: 4891 }`; read `.mobile`. Heavy: `kokop-extras/section8.tsx` (944 lines) + `section6.tsx` — stay internal. Exports `KokopCaseStudy`/`MobileKokopCaseStudy`. Asset assertion: `src*='/figma-assets/work/kokop/'`.

- [ ] **Step 1–8:** Conversion Recipe verbatim. Commit: `feat(work): kokop case study faithful-fluid`.

---

### Task 10: architrave

**Files:** Create `components/sections/architrave-page.tsx`, `mobile-architrave-page.tsx`, `architrave-page.test.tsx`; Modify `app/work/architrave/page.tsx`; Delete `components/work/architrave-page.tsx`, `components/mobile/architrave-page.tsx`.
**Frame:** `architraveFrame.desktop = { width: 1440, height: 4593 }`; read `.mobile`. Heaviest: `architrave-extras/big-middle.tsx` (2077 lines) + `group80.tsx` — stay internally unchanged; convert only positioning wrappers. Uses `architrave-tile.tsx` (KEEP). Exports `ArchitraveCaseStudy`/`MobileArchitraveCaseStudy`. Asset assertion: `src*='/figma-assets/work/architrave/'`.

- [ ] **Step 1–8:** Conversion Recipe verbatim. Commit: `feat(work): architrave case study faithful-fluid`.

---

### Task 11: retire legacy nav + final verification

**Files:** Delete `components/nav.tsx`, `components/mobile/nav.tsx` (only if no importers remain).

- [ ] **Step 1: Confirm no importers** — `rg "components/nav\"|components/nav'|mobile/nav" -g '*.ts*' app components`. Expected: zero results outside the files themselves (all home/work/contact routes are on `@/components/navigation/*`). If any route still imports the legacy nav, STOP — that route wasn't converted; escalate.
- [ ] **Step 2: Delete** the two legacy nav files.
- [ ] **Step 3: Full test** — `pnpm test` → all green.
- [ ] **Step 4: Build** — `pnpm build` → all 10 `/work/<slug>` routes + `/`, `/work`, `/contact` compile.
- [ ] **Step 5: Commit** — `git add -A && git commit -m "chore(nav): retire legacy fixed-canvas nav (all routes on new nav)"`.

---

## Notes for the executor

- **Order is simplest→heaviest** (sws → mnf → taf → lavabo → crisp → kabinett → interstellar → iwl → kokop → architrave) so the recipe is proven on light pages before the 700–2000-line vector monsters. Task 1 is the pattern-setter — review it hardest.
- Each task is independently deployable (one route swapped, its legacy components deleted). The branch is merged/deployed as a whole at the end (or in tier batches if the user prefers).
- Heavy `-extras/*` files are NOT rewritten — they are baked art. Converting them internally is out of scope and risky; only their parent-page positioning wrapper changes.
- If a page's coordinates or structure don't match the recipe (e.g. an unexpected nested transform, a `zoom` inside a child, a percentage already in use), flag it (DONE_WITH_CONCERNS) rather than guessing.
