# Phase 3b — Home: Service sections + accordions (desktop + mobile) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Rebuild the three home service sections (2 image+text "service cards" with DETAILS/TIMELINE accordions, + the "Webdesign, Print & More" list-with-CTA section), desktop + mobile, as faithful-fluid `components/sections/` components, **preserving every animation** (accordion max-height expand, `Reveal` staggers, chevron rotation). Proven via `/specimen`. Live `app/page.tsx` NOT swapped (Phase 3c).

**Architecture:** Desktop service sections are a responsive two-column layout: `max-w-[1440px]` centered, fluid gutter (`--gutter`) + section rhythm (`--space-section`), a two-column flex row above a breakpoint that **stacks** below it (the spec-sanctioned tablet reflow, §9). Images render through a **fluid `FigmaImage`** (aspect-ratio frame capped at native px; the existing %-based crop is size-independent). The accordion (`ServiceAccordion`) and `Reveal` are ported with motion unchanged. Mobile service sections are separate components (structurally divergent per §17). The CTA is the Phase-1 foundation `Button` (mauve-fill — per the user's design-system choice; a **deliberate divergence** from the live site's ink-fill + arrow-slide).

**Tech Stack:** Next.js 16, React 19, Tailwind v4, `motion/react`, Vitest + RTL. Reuses `Reveal`, `TitleMask`, `FigmaImage`, `Chevron`, foundation `Button`, `content/home.ts`.

**Phase context:** Plan 3b (spec: `docs/superpowers/specs/2026-07-20-faithful-fluid-rearchitecture-design.md`). Legacy `components/service-card.tsx`, `components/services-list.tsx`, `components/dropdown.tsx`, and `components/mobile/{service-card,services-list,dropdown}.tsx` stay untouched (serve live pages until Phase 3c swaps them).

## Global Constraints

- **Runtime:** Node 22, pnpm 10.33.4. If `pnpm`/`node` missing: `export PATH="$HOME/.nvm/versions/node/v22.23.1/bin:$PATH"`.
- **PRESERVE ALL ANIMATIONS.** Accordion: `overflow-hidden transition-[max-height,opacity] duration-500 ease-out`, open `max-h-[600px] opacity-100` / closed `max-h-0 opacity-0`; `Chevron` rotate-180 (300ms). `Reveal` staggers per section (delays below). Port motion unchanged — only layout goes fluid.
- **Faithful + fluid, no `zoom`/`transform:scale`.** Desktop: responsive two-col that stacks at a breakpoint; fluid gutter/gap via `clamp`. Body 17px fixed; service titles stay the `TitleMask` SVG.
- **CTA = foundation `Button`** (`@/components/core`) with `trailingArrow`, mauve-fill hover (its default). No arrow-slide, no bespoke CtaButton. Deliberate divergence from live site — documented.
- **Content verbatim** from `content/home.ts` (`services`, `servicesList`, `ctaButton`). Do not edit copy. Service ids stay `#brand-identity` / `#naming-positioning` / `#webdesign-print` (shared ids — no `m-` prefix, per the Phase-2 decision, so mobile uses the same ids).
- **Reuse foundation:** `Reveal`, `TitleMask`, `Chevron`, `FigmaImage`, `Button`, tokens (`--gutter`, `--space-section`, `--color-ink`, `--color-accent`, `--font-body`).
- **Do NOT touch** the legacy `components/service-card.tsx`, `services-list.tsx`, `dropdown.tsx`, or `components/mobile/*`. Build new under `components/sections/`.
- **Path alias:** `@/*` → repo root. TDD + frequent commits.

## Source values (from the existing Figma-accurate components)

- **Desktop service shell** (`components/service-card.tsx`): `max-w-[1440px] px-[220px] py-[130px]`; inner `flex items-start justify-between gap-[120px]`; text col `w-[430px]`; image frame `service.frameWidth × frameHeight`; `reversed` swaps order; Reveal delays eyebrow 0, title 0.05, body 0.1, dropdowns 0.15, image 0.1.
- **Desktop list section** (`components/services-list.tsx`): same shell, id `webdesign-print`; text col: eyebrow → title(+12) → body(+24, max-w 425) → `ul space-y-[15px]` italic accent → CTA(+32); image 428×593 plain `object-cover`; Reveal delays eyebrow 0, title 0.05, body 0.1, list 0.15, CTA 0.2, image 0.1.
- **Accordion** (`components/dropdown.tsx`): border-b `2.113px` accent; button `py-4` label `28.454px` italic uppercase accent + `Chevron`; body split on `\n\n` → intro `<p>` + italic list; content max-height transition.
- **Mobile** (`components/mobile/service-card.tsx`, `services-list.tsx`, `dropdown.tsx`): single column, per-service absolute Y-coords for text, image/dropdowns in flow; title SVGs ×(45/58); eyebrow/body 15px; accordion label 25px `py-3` body 15px; mobile list CTA is a plain `<a>` with `/figma-assets/mobile/button-arrow.svg`.

---

### Task 1: Fluid `FigmaImage`

**Files:** Modify `components/figma-image.tsx`; Test `components/figma-image.test.tsx` (create).

**Interfaces:** Add an optional `fluid?: boolean` prop. When `fluid`, the outer frame renders `width: 100%`, `max-width: ${width}px`, `aspect-ratio: ${width} / ${height}` (instead of fixed px width/height); the inner `<Image>` + %-crop are unchanged (crop is frame-relative %, so it's size-independent). Default (no `fluid`) keeps the exact current fixed-px behavior. Rotated branch unchanged.

- [ ] **Step 1: Failing test** — `components/figma-image.test.tsx`:
```tsx
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { FigmaImage } from "@/components/figma-image";

const base = { src: "/x.png", alt: "x", intrinsicWidth: 100, intrinsicHeight: 100, crop: { w: 200, h: 100, left: -50, top: 0 } };

describe("FigmaImage", () => {
  it("fixed mode uses px width/height", () => {
    const { container } = render(<FigmaImage {...base} width={429} height={561} />);
    const frame = container.firstChild as HTMLElement;
    expect(frame.style.width).toBe("429px");
    expect(frame.style.height).toBe("561px");
  });
  it("fluid mode uses aspect-ratio + capped fluid width", () => {
    const { container } = render(<FigmaImage {...base} width={429} height={561} fluid />);
    const frame = container.firstChild as HTMLElement;
    expect(frame.style.width).toBe("100%");
    expect(frame.style.maxWidth).toBe("429px");
    expect(frame.style.aspectRatio.replace(/\s/g, "")).toBe("429/561");
  });
});
```
- [ ] **Step 2: Run FAIL** — `pnpm test components/figma-image.test.tsx`.
- [ ] **Step 3: Implement** — add `fluid?: boolean` to the props type. In the non-rotated return, when `fluid` set the outer `div` style to `{ width: "100%", maxWidth: width, aspectRatio: `${width} / ${height}` }` else keep `{ width, height }`. Leave the inner `<Image>` and `imgStyle` untouched. (Rotated branch: leave as-is — the photo strip that uses it is Phase 3c and stays fixed there.)
- [ ] **Step 4: Run PASS** — 2 passed; then full `pnpm test`.
- [ ] **Step 5: Commit** — `git add components/figma-image.tsx components/figma-image.test.tsx && git commit -m "feat(figma-image): optional fluid frame (aspect-ratio, capped width)"`

---

### Task 2: `ServiceAccordion` (port the accordion)

**Files:** Create `components/sections/service-accordion.tsx`; Test `components/sections/service-accordion.test.tsx`.

**Interfaces:** `export function ServiceAccordion({ label, body }: { label: string; body?: string }): JSX.Element` — a client component; PORT `components/dropdown.tsx` verbatim, changing only: import `Chevron` from `@/components/chevron`; keep classes as-is (they already resolve to the accent/ink tokens). The max-height expand animation, `aria-expanded`/`aria-controls`, the `\n\n` intro/list split, and the chevron rotation MUST stay identical.

- [ ] **Step 1:** Read `components/dropdown.tsx`. Write `service-accordion.test.tsx`:
```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ServiceAccordion } from "@/components/sections/service-accordion";

describe("ServiceAccordion", () => {
  it("is collapsed by default (aria-expanded false)", () => {
    render(<ServiceAccordion label="Details" body={"intro\n\nlist"} />);
    expect(screen.getByRole("button", { name: /details/i })).toHaveAttribute("aria-expanded", "false");
  });
  it("expands on click", async () => {
    render(<ServiceAccordion label="Details" body={"intro\n\nlist"} />);
    await userEvent.click(screen.getByRole("button", { name: /details/i }));
    expect(screen.getByRole("button", { name: /details/i })).toHaveAttribute("aria-expanded", "true");
  });
  it("renders the intro and italic list from the body split on blank line", () => {
    render(<ServiceAccordion label="Details" body={"intro para\n\nline a\nline b"} />);
    expect(screen.getByText("intro para")).toBeInTheDocument();
    expect(screen.getByText(/line a/)).toBeInTheDocument();
  });
});
```
- [ ] **Step 2: Run FAIL.**
- [ ] **Step 3: Implement** — port `dropdown.tsx` into `service-accordion.tsx` as `ServiceAccordion` (rename the export/function only), `Chevron` import from `@/components/chevron`. Keep the max-height transition + all classes/aria identical.
- [ ] **Step 4: Run PASS (3/3); full `pnpm test`.**
- [ ] **Step 5: Commit** — `feat(sections): ServiceAccordion (accordion ported, max-height animation preserved)`

---

### Task 3: `ServiceSection` (desktop, responsive two-column)

**Files:** Create `components/sections/service-section.tsx`; Test `components/sections/service-section.test.tsx`.

**Interfaces:** `export function ServiceSection({ service }: { service: Service }): JSX.Element` — renders one service (services[0] or [1]) as a responsive section: `<section id={service.id}>` `data-nav-scheme="dark"`, centered `max-w-[1440px]`, fluid `--gutter` padding-x + `--space-section` padding-y; inner is `flex flex-col` (stacked, text then image) that becomes `md:flex-row md:items-start md:justify-between` with fluid gap at ≥ the breakpoint, with `service.reversed` controlling row order (image/text) at ≥breakpoint only. Text col `w-full md:w-[430px] md:shrink-0`. Image uses **fluid `FigmaImage`** + the `service.overlay` (if present) positioned by % of the frame. All `Reveal` wrappers + delays exactly as the legacy `ServiceCard`. Titles via `TitleMask` (`as={2}`).

- [ ] **Step 1:** Read `components/service-card.tsx`. Write `service-section.test.tsx`:
```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ServiceSection } from "@/components/sections/service-section";
import { services } from "@/content/home";

describe("ServiceSection", () => {
  it("renders the service section with its id and heading + body", () => {
    const { container } = render(<ServiceSection service={services[0]} />);
    expect(container.querySelector(`section#${services[0].id}`)).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
    expect(screen.getByText(/uncover the heart of your brand/i)).toBeInTheDocument();
  });
  it("renders the DETAILS + TIMELINE accordions", () => {
    render(<ServiceSection service={services[0]} />);
    expect(screen.getByRole("button", { name: /details/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /timeline/i })).toBeInTheDocument();
  });
  it("data-nav-scheme is dark", () => {
    const { container } = render(<ServiceSection service={services[1]} />);
    expect(container.querySelector("section")).toHaveAttribute("data-nav-scheme", "dark");
  });
});
```
- [ ] **Step 2: Run FAIL.**
- [ ] **Step 3: Implement `components/sections/service-section.tsx`.** Base it on the legacy `ServiceCard` (same `text`/`image` blocks, same Reveal delays, same TitleMask/overlay usage), with these fluid changes: section padding `paddingLeft/Right: var(--gutter)`, `paddingTop/Bottom: var(--space-section)`; inner row `className="flex flex-col gap-[clamp(40px,6vw,120px)] md:flex-row md:items-start md:justify-between"`; text column `className="w-full md:w-[430px] md:shrink-0"`; image via `<FigmaImage ... fluid />` inside a `md:shrink-0` wrapper `style={{ width: "100%", maxWidth: service.frameWidth }}`; the overlay (`service.overlay`) positioned by % of the frame (`left: overlay.left/frameWidth*100 + "%"`, etc.), so it scales with the fluid image. Use `@/components/...` imports (Reveal, TitleMask, FigmaImage, ServiceAccordion from `./service-accordion`). At the stacked breakpoint, DOM order is text-then-image; `reversed` only flips order at `md:` (e.g. `md:flex-row-reverse` when reversed, keeping text-first in DOM). Keep `id`/`aria-labelledby`/`data-nav-scheme`.
- [ ] **Step 4: Run PASS (3/3); full `pnpm test`; `pnpm build`.**
- [ ] **Step 5: Commit** — `feat(sections): responsive desktop ServiceSection (fluid 2-col, accordions + Reveal preserved)`

---

### Task 4: `ServicesListSection` (desktop, list + CTA)

**Files:** Create `components/sections/services-list-section.tsx`; Test `components/sections/services-list-section.test.tsx`.

**Interfaces:** `export function ServicesListSection(): JSX.Element` — renders `services[2]` (id `webdesign-print`) in the same responsive shell as ServiceSection: eyebrow → `TitleMask` title → body (max 425) → the `servicesList` items as an italic accent `<ul space-y-[15px]>` → the CTA as `<Button href="/contact" trailingArrow>{ctaButton}</Button>` (foundation Button, mauve-fill). Image (`services[2].image`) via plain `next/image` `object-cover` in a fluid aspect-ratio frame (428×593). Reveal delays: eyebrow 0, title 0.05, body 0.1, list 0.15, CTA 0.2, image 0.1.

- [ ] **Step 1:** Read `components/services-list.tsx`. Write `services-list-section.test.tsx`:
```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ServicesListSection } from "@/components/sections/services-list-section";
import { servicesList, ctaButton } from "@/content/home";

describe("ServicesListSection", () => {
  it("renders the webdesign-print section, heading, and all list items", () => {
    const { container } = render(<ServicesListSection />);
    expect(container.querySelector("section#webdesign-print")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
    for (const item of servicesList) expect(screen.getByText(item)).toBeInTheDocument();
  });
  it("renders the CTA as a link to /contact (foundation Button)", () => {
    render(<ServicesListSection />);
    const cta = screen.getByRole("link", { name: new RegExp(ctaButton, "i") });
    expect(cta).toHaveAttribute("href", "/contact");
  });
});
```
- [ ] **Step 2: Run FAIL.**
- [ ] **Step 3: Implement** — mirror ServiceSection's shell; the CTA uses `Button` from `@/components/core`. Fluid image frame (aspect-ratio 428/593, capped). Reveal delays as listed. `data-nav-scheme="dark"`.
- [ ] **Step 4: Run PASS; full `pnpm test`; `pnpm build`.**
- [ ] **Step 5: Commit** — `feat(sections): desktop ServicesListSection (list + foundation Button CTA)`

---

### Task 5: Mobile service sections + accordion

**Files:** Create `components/sections/mobile-service-section.tsx`, `components/sections/mobile-services-list-section.tsx`, `components/sections/mobile-service-accordion.tsx`; Tests for each.

**Interfaces:**
- `MobileServiceAccordion({ label, body })` — port `components/mobile/dropdown.tsx` (25px label, `py-3`, 15px body; same max-height animation + chevron).
- `MobileServiceSection({ service })` — port `components/mobile/service-card.tsx`, converting its fixed `393`-wide absolute layout to a fluid single column: stage `mx-auto w-full max-w-[393px]` with `container-type: inline-size`; absolute text-block Y-coords → `%`/`cqw`, image + accordions in flow below (as legacy). Title SVG scaled via cqw. Reveal delays preserved (0, .05, .1, .15, .2). Uses `MobileServiceAccordion`.
- `MobileServicesListSection()` — port `components/mobile/services-list.tsx` similarly (fluid stage, cqw); CTA stays the legacy mobile inline `<a>` + `/figma-assets/mobile/button-arrow.svg`, `hover:opacity-80` (NOT the foundation Button — mobile CTA is a distinct treatment in the Figma).

- [ ] **Step 1:** Read the three legacy mobile files. Write a test per component asserting: the section renders with its id + heading/eyebrow/body text; the accordion expands on click; the list section renders all `servicesList` items + a CTA link to `/contact`. (Use the same patterns as Tasks 2–4 tests.)
- [ ] **Step 2: Run FAIL (modules missing).**
- [ ] **Step 3: Implement the three ports** — apply the fluid-stage conversion (absolute px → `%`/`cqw` of the `393`-base stage; flow elements stay in flow), preserving the accordion max-height animation, chevron rotation, and all `Reveal` wrappers/delays exactly. Shared ids (`#brand-identity` etc.), `data-nav-scheme="dark"`.
- [ ] **Step 4: Run PASS; full `pnpm test`; `pnpm build`.**
- [ ] **Step 5: Commit** — `feat(sections): mobile service sections + accordion (fluid, animations preserved)`

---

### Task 6: Specimen + full verification

**Files:** Modify `app/specimen/page.tsx`.

- [ ] **Step 1:** Import the new desktop + mobile section components. Add a "service sections" block to `<main>` rendering: `ServiceSection service={services[0]}`, `ServiceSection service={services[1]}`, `ServicesListSection`, then the mobile trio in a 393-wide frame. (Follow the existing specimen section pattern; `services` from `@/content/home`.)
- [ ] **Step 2:** `pnpm test` — all pass.
- [ ] **Step 3:** `pnpm build` — succeeds; `/specimen` compiles.
- [ ] **Step 4 (controller/human visual + animation check):** `pnpm dev` → `/specimen`. Confirm: the two service cards (image+text, one reversed) with eyebrow/title/body; clicking DETAILS/TIMELINE **expands the accordion smoothly** (max-height, chevron rotates); the list section shows the 5 italic items + the **mauve-filling** CTA pill (arrow, mauve on hover); resizing reflows two-column → stacked with no zoom; mobile trio renders single-column with working accordions. Reveal fade-ups on scroll.
- [ ] **Step 5: Commit** — `feat(specimen): add service sections (desktop + mobile) to gallery`

---

## Self-Review (completed by plan author)

- **Spec coverage:** ServiceSection + ServiceAccordion + ServicesListSection (§6 sections/) desktop → Tasks 2–4; mobile → Task 5. Animation preservation → accordion/Chevron/Reveal ported unchanged (Tasks 2,3,5). Faithful-fluid no-zoom (§9) → responsive 2-col that stacks + fluid FigmaImage (Task 1) + clamp gutters. CTA = foundation Button mauve-fill per the user's decision (documented divergence). Content verbatim (`services`, `servicesList`, `ctaButton`). Shared ids (no `m-`).
- **Placeholder scan:** Tasks 3/5 reference the legacy components as the value source (intricate crop/position/copy already Figma-accurate) with explicit fluid-transformation rules + tests — consistent with the 3a port approach; not vague placeholders. New components (FigmaImage fluid, accordion, list section) have complete code/tests.
- **Type consistency:** `FigmaImage` gains `fluid?: boolean` (Task 1) consumed by Tasks 3–4. `ServiceAccordion`/`MobileServiceAccordion` `{label, body}` match `content/home.ts` `DropdownItem`. `Button` from `@/components/core` (trailingArrow, href). `Service` type from content used by ServiceSection/mobile.
- **Scope:** legacy service/list/dropdown + mobile files untouched; proven via `/specimen`; page swap deferred to 3c.
- **Carried constraint:** shared ids; 3c must conditionally render desktop vs mobile per breakpoint (from 3a review).
