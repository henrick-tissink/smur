# Phase 2 — Navigation — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the faithful-fluid navigation on the Phase-1 foundation — `Nav` (desktop), `MobileNav` (mobile bar), `MobileMenu` (fullscreen overlay) — as reusable components in `components/navigation/`, consuming the core primitives and tokens, without touching the existing live nav.

**Architecture:** Three components under `components/navigation/`. Desktop `Nav` is a static server component; `MobileNav` + `MobileMenu` are client components (menu open/close state). All reuse `Wordmark`/`Icon` from `components/core` and the token layers. Layout uses flex + token padding (no absolute-pixel positioning, no CSS `zoom`). The nav is **non-sticky** (scrolls away, overlaps only the first section) with a static `scheme` prop matching that section — this mirrors the real current build, not the spec's assumed adaptive hook (which does not exist in the codebase).

**Tech Stack:** Next.js 16.2.6, React 19, Tailwind v4, Vitest + RTL. Reuses Phase-1 `components/core` (Wordmark, Icon) and `app/styles/*` tokens.

**Phase context:** Plan 2 of the re-architecture (spec: `docs/superpowers/specs/2026-07-20-faithful-fluid-rearchitecture-design.md`). The existing `components/nav.tsx` and `components/mobile/nav.tsx` stay untouched — they still serve the live pages until the Home/Work phases swap them. New nav lives in `components/navigation/` and is proven via the `/specimen` page.

## Global Constraints

- **Runtime:** Node 22, pnpm 10.33.4. If `pnpm`/`node` aren't found in a shell, prepend PATH: `export PATH="$HOME/.nvm/versions/node/v22.23.1/bin:$PATH"`.
- **Reuse the foundation:** logos via the `Wordmark` primitive (CSS-mask tint → inherits `currentColor`); hamburger/close via the `Icon` primitive (`hamburger`/`close` glyphs). Colors/space via tokens (`--color-*`, `--nav-pad-x`, `--font-body`). No hardcoded hex where a token exists.
- **Faithful + fluid:** flex + token padding, fluid where it scales; **no CSS `zoom`, no absolute-pixel section layout, no JS viewport-height compensation** (the old MobileMenu height hack existed only to counter the zoom wrapper, which is gone).
- **Fonts:** nav text is **DM Sans** (`--font-body`), 17px, UPPERCASE (design system: "DM Sans for … uppercase nav").
- **Content is verbatim** from `content/home.ts` (`nav`) and `content/contact.ts` (`contactFAQ`). Do not invent labels or URLs. Links: `Services → /#brand-identity` (w84), `WORK → /work` (w55), `ABOUT → /#about` (w62), `LET's WORK TOGETHER → /contact` (w204); `linkGap` 61px.
- **Don't touch** `components/nav.tsx` or `components/mobile/nav.tsx` (live). Build new files under `components/navigation/`.
- **Path alias:** `@/*` → repo root.
- **TDD + frequent commits.**

## Verified design values (from the current Figma-accurate build)

- **Desktop Nav** (Figma 6:1282): non-sticky; outer horizontal padding 86px (→ `--nav-pad-x`, corrected below); row ~50px from top; logo 108×24; links DM Sans 17px uppercase, `gap 61px`; `scheme` light → cream text, dark → ink text; link hover dims (opacity ~0.7).
- **Mobile Nav** (Figma 268:31918): row horizontal padding ~26px, top ~32px; logo 85.5×19 (mobile asset); hamburger 29×19 (3 hairline lines); `scheme` dark `#35221A` / light `#FFF7F4`.
- **Mobile Menu** (Figma 282:40808): cream `#FFF7F4` bg, ink text; close top-right (~24×21); centered column (logo + 4 links, `gap 61`, uppercase 17px) offset from top; `INSTAGRAM / PINTEREST` italic ~15px near bottom (live links from `contactFAQ`). Full-viewport `fixed inset-0`.

---

### Task 1: Extend `Wordmark` with an optional `src` (enable the mobile logo)

**Files:**
- Modify: `components/core/wordmark.tsx`
- Test: `components/core/wordmark.test.tsx` (add cases)

**Interfaces:**
- Consumes: nothing new.
- Produces: `Wordmark` gains an optional `src?: string` prop (default `"/figma-assets/smur-logo.svg"`). All existing props/behavior unchanged. Because the mask tints via `currentColor`, the asset's own fill is irrelevant — the mobile logo (`/figma-assets/mobile/smur-logo.svg`) works identically.

- [ ] **Step 1: Add failing tests**

Append to `components/core/wordmark.test.tsx`:
```tsx
it("defaults to the desktop logo asset", () => {
  render(<Wordmark />);
  const el = screen.getByRole("img", { name: "SMUR" });
  expect((el as HTMLElement).style.maskImage).toContain("/figma-assets/smur-logo.svg");
});

it("accepts a custom src (e.g. the mobile logo)", () => {
  render(<Wordmark src="/figma-assets/mobile/smur-logo.svg" />);
  const el = screen.getByRole("img", { name: "SMUR" });
  expect((el as HTMLElement).style.maskImage).toContain("/figma-assets/mobile/smur-logo.svg");
});
```

- [ ] **Step 2: Run — verify FAIL**

Run: `pnpm test components/core/wordmark.test.tsx`
Expected: the custom-src test FAILS (still points at the default asset).

- [ ] **Step 3: Add the `src` prop**

In `components/core/wordmark.tsx`, replace the module-level `const SRC = "/figma-assets/smur-logo.svg";` usage: add `src` to the `Props` type and destructure with a default, then use it in both mask URLs.
```tsx
type Props = {
  className?: string;
  width?: number;
  height?: number;
  title?: string;
  src?: string;
};

export function Wordmark({
  className,
  width = 108,
  height = 24,
  title = "SMUR",
  src = "/figma-assets/smur-logo.svg",
}: Props) {
```
Then replace both `url(${SRC})` occurrences with `url(${src})` and delete the now-unused `SRC` constant.

- [ ] **Step 4: Run — verify PASS**

Run: `pnpm test components/core/wordmark.test.tsx`
Expected: all wordmark tests pass (original 3 + 2 new = 5).

- [ ] **Step 5: Commit**

```bash
git add components/core/wordmark.tsx components/core/wordmark.test.tsx
git commit -m "feat(core): Wordmark accepts optional src (enables mobile logo)"
```

---

### Task 2: `Nav` (desktop)

**Files:**
- Create: `components/navigation/nav.tsx`
- Test: `components/navigation/nav.test.tsx`

**Interfaces:**
- Consumes: `Wordmark` (`@/components/core`), `nav` (`@/content/home`), tokens `--nav-pad-x`, `--color-cream`, `--color-ink`, `--font-body`.
- Produces: `export function Nav(props: { scheme?: "light" | "dark" }): JSX.Element`. Non-sticky header; home-linked Wordmark on the left; the four `nav.links` on the right as uppercase DM Sans links with `gap 61px`; `scheme` sets text color (light → cream, dark → ink). Uses Next `<Link>` (prefetch + hash support).

- [ ] **Step 1: Correct the `--nav-pad-x` token so it lands on 86px at 1440**

In `app/styles/spacing.css`, change `--nav-pad-x: clamp(20px, 5vw, 86px);` to `--nav-pad-x: clamp(20px, 6vw, 86px);` (5vw = 72px at 1440, short of the Figma 86px; 6vw = 86.4px caps at 86px at exactly 1440). No token test asserts its value, so nothing breaks — confirm with `pnpm test app/styles/tokens.css.test.ts` after.

- [ ] **Step 2: Write the failing test**

`components/navigation/nav.test.tsx`:
```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Nav } from "@/components/navigation/nav";
import { nav } from "@/content/home";

describe("Nav (desktop)", () => {
  it("renders the home-linked wordmark", () => {
    render(<Nav />);
    const home = screen.getByRole("link", { name: /SMUR/i });
    expect(home).toHaveAttribute("href", "/#home");
    expect(screen.getByRole("img", { name: "SMUR" })).toBeInTheDocument();
  });

  it("renders every nav link with its verbatim label and href", () => {
    render(<Nav />);
    for (const link of nav.links) {
      const el = screen.getByRole("link", { name: link.label });
      expect(el).toHaveAttribute("href", link.href);
    }
  });

  it("uses cream text on the light scheme", () => {
    const { container } = render(<Nav scheme="light" />);
    expect(container.querySelector("[data-nav-text]")).toHaveStyle({
      color: "var(--color-cream)",
    });
  });

  it("uses ink text on the dark scheme (default)", () => {
    const { container } = render(<Nav />);
    expect(container.querySelector("[data-nav-text]")).toHaveStyle({
      color: "var(--color-ink)",
    });
  });
});
```

- [ ] **Step 3: Run — verify FAIL**

Run: `pnpm test components/navigation/nav.test.tsx`
Expected: FAIL — module missing.

- [ ] **Step 4: Write `components/navigation/nav.tsx`**

```tsx
import Link from "next/link";
import { Wordmark } from "@/components/core";
import { nav } from "@/content/home";

/*
  Desktop nav (Figma 6:1282) — non-sticky; scrolls away, overlapping only the
  first section, so color is fixed per page via `scheme` to match it.
  Faithful-fluid: flex row with token horizontal padding (--nav-pad-x), no
  absolute-pixel positioning, no zoom.
*/
export function Nav({ scheme = "dark" }: { scheme?: "light" | "dark" }) {
  const color = scheme === "light" ? "var(--color-cream)" : "var(--color-ink)";
  return (
    <header
      aria-label="Primary"
      className="absolute inset-x-0 top-0 z-50"
      style={{ paddingTop: "clamp(28px, 3.5vw, 50px)" }}
    >
      <div
        data-nav-text
        className="mx-auto flex max-w-[1440px] items-center justify-between"
        style={{
          color,
          paddingLeft: "var(--nav-pad-x)",
          paddingRight: "var(--nav-pad-x)",
        }}
      >
        <Link href="/#home" aria-label="SMUR — home" className="block">
          <Wordmark width={108} height={24} />
        </Link>
        <nav aria-label="Sections">
          <ul
            className="flex items-center uppercase"
            style={{ gap: `${nav.linkGap}px`, fontFamily: "var(--font-body)", fontSize: "17px" }}
          >
            {nav.links.map((link) => (
              <li key={link.label} className="shrink-0">
                <Link
                  href={link.href}
                  className="block transition-opacity hover:opacity-70"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
```

- [ ] **Step 5: Run — verify PASS**

Run: `pnpm test components/navigation/nav.test.tsx`
Expected: 4 passed.

- [ ] **Step 6: Commit**

```bash
git add app/styles/spacing.css components/navigation/nav.tsx components/navigation/nav.test.tsx
git commit -m "feat(nav): desktop Nav on tokens + Wordmark; --nav-pad-x hits 86px at 1440"
```

---

### Task 3: `MobileMenu` (fullscreen overlay)

**Files:**
- Create: `components/navigation/mobile-menu.tsx`
- Test: `components/navigation/mobile-menu.test.tsx`

**Interfaces:**
- Consumes: `Wordmark`, `Icon` (`@/components/core`), `nav` (`@/content/home`), `contactFAQ` (`@/content/contact`).
- Produces: `export function MobileMenu(props: { onClose: () => void }): JSX.Element` — a client `role="dialog" aria-modal` overlay, `fixed inset-0`, cream bg, ink text; close button (Icon `close`) top-right; centered column of home-linked Wordmark + the four links (uppercase 17px) + `INSTAGRAM / PINTEREST` socials. **No** viewport-height JS (no zoom wrapper anymore) — plain `inset-0` / `h-full`. Clicking any link or the close button calls `onClose`.

- [ ] **Step 1: Write the failing test**

`components/navigation/mobile-menu.test.tsx`:
```tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MobileMenu } from "@/components/navigation/mobile-menu";
import { nav } from "@/content/home";

describe("MobileMenu", () => {
  it("is a modal dialog", () => {
    render(<MobileMenu onClose={() => {}} />);
    expect(screen.getByRole("dialog")).toHaveAttribute("aria-modal", "true");
  });

  it("closes when the close button is clicked", async () => {
    const onClose = vi.fn();
    render(<MobileMenu onClose={onClose} />);
    await userEvent.click(screen.getByRole("button", { name: /close/i }));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("renders all nav links and calls onClose when one is followed", async () => {
    const onClose = vi.fn();
    render(<MobileMenu onClose={onClose} />);
    for (const link of nav.links) {
      expect(screen.getByRole("link", { name: link.label })).toBeInTheDocument();
    }
    await userEvent.click(screen.getByRole("link", { name: nav.links[1].label }));
    expect(onClose).toHaveBeenCalled();
  });

  it("renders the social links", () => {
    render(<MobileMenu onClose={() => {}} />);
    expect(screen.getByRole("link", { name: "INSTAGRAM" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "PINTEREST" })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run — verify FAIL**

Run: `pnpm test components/navigation/mobile-menu.test.tsx`
Expected: FAIL — module missing.

- [ ] **Step 3: Write `components/navigation/mobile-menu.tsx`**

```tsx
"use client";

import Link from "next/link";
import { Wordmark, Icon } from "@/components/core";
import { nav } from "@/content/home";
import { contactFAQ } from "@/content/contact";

/*
  Fullscreen menu overlay (Figma 282:40808). Faithful-fluid: plain
  `fixed inset-0` over the real viewport — no zoom wrapper, so none of the old
  innerHeight×393/innerWidth compensation is needed.
*/
export function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      className="fixed inset-0 z-[60] flex flex-col items-center"
      style={{ backgroundColor: "var(--color-page)", color: "var(--color-ink)" }}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close menu"
        className="absolute right-[30px] top-[40px]"
      >
        <Icon name="close" size={22} title="close" />
      </button>

      <div
        className="flex flex-col items-center"
        style={{ marginTop: "clamp(96px, 20vh, 160px)", gap: "61px" }}
      >
        <Link href="/#home" aria-label="SMUR — home" onClick={onClose}>
          <Wordmark width={86} height={19} />
        </Link>
        {nav.links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="block text-center uppercase transition-opacity hover:opacity-70"
            style={{ fontFamily: "var(--font-body)", fontSize: "17px" }}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <p
        className="absolute bottom-[67px] text-center italic"
        style={{ fontFamily: "var(--font-body)", fontSize: "15px" }}
      >
        <a
          href={contactFAQ.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-opacity hover:opacity-70"
        >
          INSTAGRAM
        </a>
        &nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;
        <a
          href={contactFAQ.pinterestUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-opacity hover:opacity-70"
        >
          PINTEREST
        </a>
      </p>
    </div>
  );
}
```

- [ ] **Step 4: Run — verify PASS**

Run: `pnpm test components/navigation/mobile-menu.test.tsx`
Expected: 4 passed.

- [ ] **Step 5: Commit**

```bash
git add components/navigation/mobile-menu.tsx components/navigation/mobile-menu.test.tsx
git commit -m "feat(nav): MobileMenu fullscreen overlay (no zoom-comp JS)"
```

---

### Task 4: `MobileNav` (mobile bar)

**Files:**
- Create: `components/navigation/mobile-nav.tsx`
- Test: `components/navigation/mobile-nav.test.tsx`

**Interfaces:**
- Consumes: `Wordmark`, `Icon` (`@/components/core`), `MobileMenu` (Task 3).
- Produces: `export function MobileNav(props: { scheme?: "light" | "dark" }): JSX.Element` — a client component: a bar with the home-linked Wordmark (mobile asset) on the left and a hamburger `Icon` button on the right; tapping the hamburger opens `MobileMenu`. `scheme` sets the bar's text color (dark `--color-ink` / light `--color-cream`), which both the masked Wordmark and the `currentColor` Icon inherit.

- [ ] **Step 1: Write the failing test**

`components/navigation/mobile-nav.test.tsx`:
```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MobileNav } from "@/components/navigation/mobile-nav";

describe("MobileNav", () => {
  it("renders the home-linked wordmark and a menu button", () => {
    render(<MobileNav />);
    expect(screen.getByRole("link", { name: /SMUR/i })).toHaveAttribute("href", "/#home");
    expect(screen.getByRole("button", { name: /open menu/i })).toBeInTheDocument();
  });

  it("menu is closed initially", () => {
    render(<MobileNav />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /open menu/i })).toHaveAttribute("aria-expanded", "false");
  });

  it("opens the menu when the hamburger is tapped", async () => {
    render(<MobileNav />);
    await userEvent.click(screen.getByRole("button", { name: /open menu/i }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run — verify FAIL**

Run: `pnpm test components/navigation/mobile-nav.test.tsx`
Expected: FAIL — module missing.

- [ ] **Step 3: Write `components/navigation/mobile-nav.tsx`**

```tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { Wordmark, Icon } from "@/components/core";
import { MobileMenu } from "./mobile-menu";

/*
  Mobile nav bar (Figma 268:31918) — non-sticky. Wordmark + hamburger; both
  inherit the bar's `scheme` color (mask tint + Icon currentColor), so no
  per-asset filter is needed. Tapping the hamburger opens MobileMenu.
*/
export function MobileNav({ scheme = "dark" }: { scheme?: "light" | "dark" }) {
  const [open, setOpen] = useState(false);
  const color = scheme === "light" ? "var(--color-cream)" : "var(--color-ink)";
  return (
    <>
      <header
        aria-label="Primary"
        className="absolute inset-x-0 top-0 z-50 flex items-center justify-between px-[26px] pt-[32px]"
        style={{ color }}
      >
        <Link href="/#home" aria-label="SMUR — home" className="block">
          <Wordmark src="/figma-assets/mobile/smur-logo.svg" width={85.5} height={19} />
        </Link>
        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          <Icon name="hamburger" size={28} title="menu" />
        </button>
      </header>
      {open && <MobileMenu onClose={() => setOpen(false)} />}
    </>
  );
}
```

- [ ] **Step 4: Run — verify PASS**

Run: `pnpm test components/navigation/mobile-nav.test.tsx`
Expected: 3 passed.

- [ ] **Step 5: Add a barrel and commit**

Create `components/navigation/index.ts`:
```ts
export { Nav } from "./nav";
export { MobileNav } from "./mobile-nav";
export { MobileMenu } from "./mobile-menu";
```
Then:
```bash
git add components/navigation/mobile-nav.tsx components/navigation/mobile-nav.test.tsx components/navigation/index.ts
git commit -m "feat(nav): MobileNav bar + navigation barrel export"
```

---

### Task 5: Add navigation to the specimen + full verification

**Files:**
- Modify: `app/specimen/page.tsx`
- Test: (none new) — integration gate.

**Interfaces:**
- Consumes: `Nav`, `MobileNav` (`@/components/navigation`).
- Produces: the `/specimen` page shows the desktop `Nav` in both schemes over color bands and the `MobileNav` (with working menu toggle) — the artifact the reviewer visually checks.

- [ ] **Step 1: Add a navigation section to `app/specimen/page.tsx`**

Add this import at the top:
```tsx
import { Nav, MobileNav } from "@/components/navigation";
```
Then add, as the last section inside the page's `<main>` (before its closing tag):
```tsx
<section style={{ marginTop: 40 }}>
  <Eyebrow>navigation</Eyebrow>
  {/* Nav is position:absolute; give each demo a tall relative band so it sits over a colored ground */}
  <div style={{ position: "relative", height: 120, marginTop: 12, background: "var(--color-hero)" }}>
    <Nav scheme="light" />
  </div>
  <div style={{ position: "relative", height: 120, marginTop: 12, background: "var(--color-page)", border: "1px solid var(--color-line)" }}>
    <Nav scheme="dark" />
  </div>
  <div style={{ position: "relative", height: 160, marginTop: 12, background: "var(--color-hero)", maxWidth: 393 }}>
    <MobileNav scheme="dark" />
  </div>
</section>
```

- [ ] **Step 2: Run the full suite — verify all green**

Run: `pnpm test`
Expected: all suites pass (Phase-1 suites + wordmark additions + nav, mobile-nav, mobile-menu).

- [ ] **Step 3: Build**

Run: `pnpm build`
Expected: succeeds; `/specimen` compiles. (If Turbopack cache is stale, `rm -rf .next` and retry.)

- [ ] **Step 4: Visual check (controller/human step — not the implementer)**

`pnpm dev` → `http://localhost:3000/specimen`. Confirm: desktop `Nav` shows the "SMUR." wordmark + four uppercase links (`Services / WORK / ABOUT / LET'S WORK TOGETHER`) right-aligned with generous gap, cream on the rose band and ink on the cream band; the mobile bar shows the wordmark + a hairline hamburger; clicking the hamburger opens a cream fullscreen overlay with the close X, centered links, and INSTAGRAM / PINTEREST.

- [ ] **Step 5: Commit**

```bash
git add app/specimen/page.tsx
git commit -m "feat(specimen): add navigation (Nav both schemes + MobileNav) to gallery"
```

---

## Self-Review (completed by plan author)

- **Spec coverage:** §6 `navigation/` Nav + MobileNav + MobileMenu → Tasks 2–4. Reuse of core primitives (Wordmark/Icon) → Tasks 1–4. No `zoom` / faithful-fluid → token padding + `fixed inset-0` overlay (Task 3 drops the old JS height hack). Fonts = DM Sans uppercase → Nav/Menu use `--font-body`. **Deviation from spec, noted:** the spec's "keep the adaptive `data-nav-scheme` hook" does not apply — that hook is absent from the codebase and the real nav is non-sticky with a static `scheme` prop; this plan preserves the actual design. Flag to the human at pre-flight.
- **Placeholder scan:** none — every step has real code/commands.
- **Type consistency:** `Wordmark`'s new `src?: string` (Task 1) is consumed by `MobileNav` (Task 4) and `MobileMenu` uses the default. `Nav`/`MobileNav` `scheme?: "light" | "dark"` is consistent across tasks and matches the existing prop shape. `Icon` names `hamburger`/`close` exist from Phase-1 Task 5. The barrel (`components/navigation/index.ts`) exports exactly the three components the specimen imports.
- **Scope:** existing live nav files untouched; new nav is proven via `/specimen` only — consumed by real pages in the Home/Work phases.
- **Known nit carried forward:** Nav renders links with Next `<Link>` (gains prefetch, addresses the Phase-1 recommendation); the old `link.width` fixed pixel widths are intentionally dropped in favor of natural flow + `gap` (fluid), which is the faithful-fluid intent.
