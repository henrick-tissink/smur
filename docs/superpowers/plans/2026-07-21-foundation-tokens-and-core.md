# Foundation — Token System + Core Primitives + Fonts — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the tokenized design foundation (color / type / space / radii / motion) and the four core UI primitives (Eyebrow, Button, Icon, Wordmark) that every later phase composes, with a real test cycle and a visual specimen page.

**Architecture:** Values live once in a typed source-of-truth module (`lib/tokens.ts`), are mirrored into CSS custom-property layers under `app/styles/` (imported by `app/globals.css`), and are consumed by small presentational React components in `components/core/`. Type sizes are fluid via `clamp()`. No `zoom`, no absolute-pixel positioning — this phase produces reusable primitives, not full pages.

**Tech Stack:** Next.js 16.2.6, React 19, Tailwind CSS v4 (`@theme` / `@import`), `next/font/google`, Vitest + React Testing Library + jsdom.

**Phase context:** This is Plan 1 of the site re-architecture (spec: `docs/superpowers/specs/2026-07-20-faithful-fluid-rearchitecture-design.md`). Later plans (Navigation, Home, Work pages, Contact) reuse everything built here. Nothing in this phase touches the live pages, so it cannot visually regress production.

## Global Constraints

- **Runtime:** Node 22, pnpm 10.33.4. Install deps with `pnpm add -D <pkg>` (never npm/yarn).
- **Next.js is non-standard here** — per `AGENTS.md`, consult `node_modules/next/dist/docs/` before using any Next API you're unsure of.
- **Fonts:** exactly the four production fonts via `next/font/google` — DM Sans, DM Serif Display, Open Sans, Quicksand. No new fonts, no `next/font/local`, no Newsreader/Myanmar MN/Avenir/Cormorant.
- **Colors are verbatim** from the spec — never invent a hex. Editorial reds are out of scope for this phase (extracted during the Work phase).
- **Faithful + fluid:** no CSS `zoom`, no absolute-pixel section layout. Fluid `clamp()` for type/space.
- **Preserve existing motion:** the `motion` library and existing animation components stay; this phase only *tokenizes* motion values (easing/durations), it does not remove or rewrite animations.
- **Path alias:** `@/*` → repo root (e.g. `@/lib/tokens`, `@/components/core/button`).
- **TDD + frequent commits:** each task is red → green → commit.

---

### Task 1: Test harness (Vitest + RTL + jsdom)

**Files:**
- Create: `vitest.config.ts`
- Create: `vitest.setup.ts`
- Modify: `package.json` (add `test` script + devDeps)
- Create: `lib/smoke.test.ts` (temporary smoke test, deleted at end of task)

**Interfaces:**
- Consumes: nothing.
- Produces: a working `pnpm test` command; a jsdom + RTL environment later tasks rely on.

- [ ] **Step 1: Install dev dependencies**

Run:
```bash
pnpm add -D vitest@^3 @vitejs/plugin-react@^5 jsdom@^26 @testing-library/react@^16 @testing-library/jest-dom@^6 @testing-library/user-event@^14
```
Expected: installs cleanly, `package.json` gains the devDeps.

- [ ] **Step 2: Write `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": resolve(__dirname, ".") },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["**/*.test.{ts,tsx}"],
    exclude: ["node_modules", ".next"],
  },
});
```

- [ ] **Step 3: Write `vitest.setup.ts`**

```ts
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

afterEach(() => cleanup());
```

- [ ] **Step 4: Add the `test` script to `package.json`**

In the `"scripts"` block, add:
```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 5: Write a smoke test**

`lib/smoke.test.ts`:
```ts
import { describe, it, expect } from "vitest";

describe("harness", () => {
  it("runs", () => {
    expect(1 + 1).toBe(2);
  });
});
```

- [ ] **Step 6: Run it — verify PASS**

Run: `pnpm test`
Expected: 1 passed. If jsdom/alias errors appear, fix config before proceeding.

- [ ] **Step 7: Delete the smoke test and commit**

```bash
rm lib/smoke.test.ts
git add package.json pnpm-lock.yaml vitest.config.ts vitest.setup.ts
git commit -m "test: add Vitest + React Testing Library harness"
```

---

### Task 2: Token source-of-truth module (`lib/tokens.ts`)

**Files:**
- Create: `lib/tokens.ts`
- Test: `lib/tokens.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces:
  - `export const colors: Record<string, string>` — semantic name → hex (uppercase).
  - `export const space: number[]` — the layout spacing scale in px.
  - `export const radii: { pill: number; card: number; media: number }`.
  - `export const hairline: { button: number; underline: number }`.
  - `export const motion: { ease: string; durationMs: { cardHover: number }; workCardScale: number; buttonPressScale: number; linkDimOpacity: number }`.

- [ ] **Step 1: Write the failing test**

`lib/tokens.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { colors, space, radii, hairline, motion } from "@/lib/tokens";

describe("design tokens", () => {
  it("carries the exact spec palette", () => {
    expect(colors.page).toBe("#FFF7F4");
    expect(colors.ink).toBe("#35221A");
    expect(colors.cream).toBe("#FFF7F4");
    expect(colors.hero).toBe("#CBB3A6");
    expect(colors.accent).toBe("#A98A8A");
    expect(colors.about).toBe("#906553");
    expect(colors.band).toBe("#BBC2B5");
    expect(colors.line).toBe("#D9D2C8");
  });

  it("carries the real layout spacing scale", () => {
    expect(space).toEqual([6, 15, 25, 30, 35, 55, 61]);
  });

  it("carries radii and hairlines from the spec", () => {
    expect(radii).toEqual({ pill: 18, card: 5, media: 0 });
    expect(hairline).toEqual({ button: 1.44, underline: 2 });
  });

  it("carries the motion system values", () => {
    expect(motion.ease).toBe("cubic-bezier(0.22, 0.61, 0.36, 1)");
    expect(motion.durationMs.cardHover).toBe(520);
    expect(motion.workCardScale).toBe(1.035);
    expect(motion.buttonPressScale).toBe(0.985);
    expect(motion.linkDimOpacity).toBe(0.55);
  });
});
```

- [ ] **Step 2: Run — verify FAIL**

Run: `pnpm test lib/tokens.test.ts`
Expected: FAIL — cannot resolve `@/lib/tokens`.

- [ ] **Step 3: Write `lib/tokens.ts`**

```ts
/**
 * Single source of truth for SMUR design tokens.
 * Values are verbatim from the spec
 * (docs/superpowers/specs/2026-07-20-faithful-fluid-rearchitecture-design.md).
 * The CSS layers in app/styles/*.css mirror these exact values.
 * Editorial reds are intentionally absent — extracted during the Work phase.
 */
export const colors = {
  page: "#FFF7F4", // Warm Neutrals — default page surface (spec §5)
  ink: "#35221A", // primary text — espresso
  inkMuted: "#6A6660",
  cream: "#FFF7F4", // text on dark grounds
  line: "#D9D2C8",
  hero: "#CBB3A6", // Rose & Clay — hero ground
  accent: "#A98A8A", // mauve — eyebrows, hairlines, hover
  about: "#906553", // clay — About band
  band: "#BBC2B5", // sage — testimonial band
} as const;

export const space = [6, 15, 25, 30, 35, 55, 61] as const;

export const radii = { pill: 18, card: 5, media: 0 } as const;

export const hairline = { button: 1.44, underline: 2 } as const;

export const motion = {
  ease: "cubic-bezier(0.22, 0.61, 0.36, 1)",
  durationMs: { cardHover: 520 },
  workCardScale: 1.035,
  buttonPressScale: 0.985,
  linkDimOpacity: 0.55,
} as const;
```

- [ ] **Step 4: Run — verify PASS**

Run: `pnpm test lib/tokens.test.ts`
Expected: 4 passed.

- [ ] **Step 5: Commit**

```bash
git add lib/tokens.ts lib/tokens.test.ts
git commit -m "feat(tokens): typed source-of-truth for colors/space/radii/motion"
```

---

### Task 3: CSS token layers wired into globals

**Files:**
- Create: `app/styles/tokens.css` (colors, radii, hairlines)
- Create: `app/styles/typography.css` (font roles + fluid type scale)
- Create: `app/styles/spacing.css` (spacing scale + layout metrics)
- Create: `app/styles/motion.css` (easing + duration vars)
- Modify: `app/globals.css` (import the layers; keep existing `@theme` colors in sync)
- Test: `app/styles/tokens.css.test.ts` (file-content assertion — reliable without jsdom computed-style)

**Interfaces:**
- Consumes: `lib/tokens.ts` values (mirrored by hand; the test guards drift).
- Produces: CSS custom properties `--color-*`, `--font-serif|body|ui|accent`, `--space-*`, `--ease-brand`, `--dur-card-hover`, radii/hairline vars — consumed by components and later phases.

- [ ] **Step 1: Write the failing test**

`app/styles/tokens.css.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { colors, motion } from "@/lib/tokens";

const read = (p: string) => readFileSync(resolve(__dirname, p), "utf8");

describe("CSS token layers mirror lib/tokens.ts", () => {
  it("tokens.css declares every palette hex", () => {
    const css = read("./tokens.css");
    for (const hex of Object.values(colors)) {
      expect(css.toUpperCase()).toContain(hex.toUpperCase());
    }
  });

  it("motion.css declares the brand easing", () => {
    const css = read("./motion.css");
    expect(css).toContain(motion.ease);
  });

  it("typography.css defines the four semantic font roles", () => {
    const css = read("./typography.css");
    for (const role of ["--font-serif", "--font-body", "--font-ui", "--font-accent"]) {
      expect(css).toContain(role);
    }
  });

  it("spacing.css exposes the fluid section rhythm and column tokens", () => {
    const css = read("./spacing.css");
    expect(css).toContain("--space-section");
    expect(css).toContain("--col-content"); // 430px content column
  });
});
```

- [ ] **Step 2: Run — verify FAIL**

Run: `pnpm test app/styles/tokens.css.test.ts`
Expected: FAIL — files do not exist.

- [ ] **Step 3: Write `app/styles/tokens.css`**

```css
/* Color + shape tokens — mirror lib/tokens.ts (guarded by tokens.css.test.ts). */
:root {
  --color-page: #FFF7F4;
  --color-ink: #35221A;
  --color-ink-muted: #6A6660;
  --color-cream: #FFF7F4;
  --color-line: #D9D2C8;
  --color-hero: #CBB3A6;
  --color-accent: #A98A8A;
  --color-about: #906553;
  --color-band: #BBC2B5;

  --radius-pill: 18px;
  --radius-card: 5px;
  --radius-media: 0px;

  --hairline-button: 1.44px;
  --hairline-underline: 2px;
}
```

- [ ] **Step 4: Write `app/styles/typography.css`**

```css
/*
  Font roles map to the next/font CSS variables set in app/layout.tsx.
  Fluid heading scale: clamp(min @393, preferred, max @1440).
  Body 17/1.33; headings 58–84 with tight line-height (0.97–1.21).
*/
:root {
  --font-serif: var(--font-dm-serif-display), "Cormorant Garamond", serif;
  --font-body: var(--font-dm-sans), system-ui, sans-serif;
  --font-ui: var(--font-open-sans), system-ui, sans-serif;
  --font-accent: var(--font-quicksand), system-ui, sans-serif;

  /* Fluid type scale (viewport 393 → 1440). */
  --text-body: 17px;
  --leading-body: 1.33;
  --text-eyebrow: 20px;
  --text-h3: clamp(20px, 1.1rem + 0.6vw, 24px);
  --text-h2: clamp(34px, 1.6rem + 2.4vw, 58px);
  --text-display: clamp(48px, 2rem + 4vw, 84px);
  --leading-display: 1.05; /* within the 0.97–1.21 range */
}
```

- [ ] **Step 5: Write `app/styles/spacing.css`**

```css
/*
  Spacing scale from the real layout: 6·15·25·30·35·55·61.
  Layout metrics: 86px nav padding, ~218px gutter, 430px content column,
  ~130px section rhythm (fluid so it relaxes on smaller viewports).
*/
:root {
  --space-1: 6px;
  --space-2: 15px;
  --space-3: 25px;
  --space-4: 30px;
  --space-5: 35px;
  --space-6: 55px;
  --space-7: 61px;

  --nav-pad-x: clamp(20px, 5vw, 86px);
  --gutter: clamp(24px, 15vw, 218px);
  --col-content: 430px;
  --space-section: clamp(72px, 9vw, 130px);
}
```

- [ ] **Step 6: Write `app/styles/motion.css`**

```css
/* Motion tokens — restrained, no bounces (spec §5). */
:root {
  --ease-brand: cubic-bezier(0.22, 0.61, 0.36, 1);
  --dur-card-hover: 520ms;
  --scale-card-hover: 1.035;
  --scale-press: 0.985;
  --opacity-link-dim: 0.55;
}
```

- [ ] **Step 7: Import the layers in `app/globals.css`**

At the top of `app/globals.css`, directly after `@import "tailwindcss";`, add:
```css
@import "./styles/tokens.css";
@import "./styles/typography.css";
@import "./styles/spacing.css";
@import "./styles/motion.css";
```
Keep the existing `@theme` block (Tailwind reads it for utility generation), but update its color values to match `tokens.css` where they differ — set `--color-page: #f5f1ec;` → leave as-is is WRONG; change it to reference the new surface only in the Home phase. For THIS phase, set the `@theme` `--color-page` to `var(--color-page)` is invalid inside `@theme`; instead duplicate the literal `#FFF7F4`. Update the `@theme` block's `--color-page` line to `#FFF7F4` and confirm the other `--color-*` literals already match `tokens.css`.

- [ ] **Step 8: Run the token test — verify PASS**

Run: `pnpm test app/styles/tokens.css.test.ts`
Expected: 4 passed.

- [ ] **Step 9: Verify the app still builds**

Run: `pnpm build`
Expected: build succeeds with no CSS/import errors. (If Turbopack caches stale, `rm -rf .next` and retry.)

- [ ] **Step 10: Commit**

```bash
git add app/styles app/globals.css
git commit -m "feat(tokens): CSS token layers (color/type/space/motion) wired into globals"
```

---

### Task 4: `Eyebrow` primitive

**Files:**
- Create: `components/core/eyebrow.tsx`
- Test: `components/core/eyebrow.test.tsx`

**Interfaces:**
- Consumes: `--font-body`, `--color-accent`, `--text-eyebrow` (CSS vars from Task 3).
- Produces: `export function Eyebrow(props: { children: React.ReactNode; className?: string; as?: "p" | "span" }): JSX.Element` — italic mauve label, size 20, line-height 1. Does NOT force text-transform (casing is content-driven).

- [ ] **Step 1: Write the failing test**

`components/core/eyebrow.test.tsx`:
```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Eyebrow } from "@/components/core/eyebrow";

describe("Eyebrow", () => {
  it("renders its text", () => {
    render(<Eyebrow>full service</Eyebrow>);
    expect(screen.getByText("full service")).toBeInTheDocument();
  });

  it("is italic and mauve", () => {
    render(<Eyebrow>strategy focused</Eyebrow>);
    const el = screen.getByText("strategy focused");
    expect(el).toHaveStyle({ fontStyle: "italic" });
    expect(el).toHaveStyle({ color: "var(--color-accent)" });
  });

  it("renders as a <span> when as='span'", () => {
    render(<Eyebrow as="span">more.more.more.</Eyebrow>);
    expect(screen.getByText("more.more.more.").tagName).toBe("SPAN");
  });

  it("merges a custom className", () => {
    render(<Eyebrow className="mb-4">x</Eyebrow>);
    expect(screen.getByText("x")).toHaveClass("mb-4");
  });
});
```

- [ ] **Step 2: Run — verify FAIL**

Run: `pnpm test components/core/eyebrow.test.tsx`
Expected: FAIL — cannot resolve module.

- [ ] **Step 3: Write `components/core/eyebrow.tsx`**

```tsx
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  as?: "p" | "span";
};

export function Eyebrow({ children, className = "", as = "p" }: Props) {
  const Tag = as;
  return (
    <Tag
      className={className}
      style={{
        fontFamily: "var(--font-body)",
        fontStyle: "italic",
        fontWeight: 400,
        fontSize: "var(--text-eyebrow)",
        lineHeight: 1,
        color: "var(--color-accent)",
      }}
    >
      {children}
    </Tag>
  );
}
```

- [ ] **Step 4: Run — verify PASS**

Run: `pnpm test components/core/eyebrow.test.tsx`
Expected: 4 passed.

- [ ] **Step 5: Commit**

```bash
git add components/core/eyebrow.tsx components/core/eyebrow.test.tsx
git commit -m "feat(core): Eyebrow primitive"
```

---

### Task 5: `Icon` primitive (hairline SVG set)

**Files:**
- Create: `components/core/icon.tsx`
- Test: `components/core/icon.test.tsx`

**Interfaces:**
- Consumes: nothing (self-contained SVG).
- Produces: `export function Icon(props: { name: IconName; size?: number; title?: string; className?: string }): JSX.Element` where `export type IconName = "arrow-right" | "arrow-left" | "chevron-down" | "hamburger" | "close"`. Renders inline `<svg>` with `stroke="currentColor"`, hairline weight, no fill. `title` sets an accessible name; without it the svg is `aria-hidden`.

- [ ] **Step 1: Write the failing test**

`components/core/icon.test.tsx`:
```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Icon } from "@/components/core/icon";

describe("Icon", () => {
  it("renders an inline svg that inherits currentColor", () => {
    const { container } = render(<Icon name="arrow-right" title="next" />);
    const svg = container.querySelector("svg")!;
    expect(svg).toBeInTheDocument();
    expect(svg.getAttribute("stroke")).toBe("currentColor");
    expect(svg.getAttribute("fill")).toBe("none");
  });

  it("exposes an accessible name when title is given", () => {
    render(<Icon name="arrow-left" title="previous" />);
    expect(screen.getByRole("img", { name: "previous" })).toBeInTheDocument();
  });

  it("is aria-hidden when no title is given", () => {
    const { container } = render(<Icon name="chevron-down" />);
    expect(container.querySelector("svg")!.getAttribute("aria-hidden")).toBe("true");
  });

  it("applies the size to width and height", () => {
    const { container } = render(<Icon name="hamburger" size={28} />);
    const svg = container.querySelector("svg")!;
    expect(svg.getAttribute("width")).toBe("28");
    expect(svg.getAttribute("height")).toBe("28");
  });
});
```

- [ ] **Step 2: Run — verify FAIL**

Run: `pnpm test components/core/icon.test.tsx`
Expected: FAIL — cannot resolve module.

- [ ] **Step 3: Write `components/core/icon.tsx`**

```tsx
export type IconName =
  | "arrow-right"
  | "arrow-left"
  | "chevron-down"
  | "hamburger"
  | "close";

/* Minimal hairline line-glyphs on a 24×24 grid (spec: ~1px, no fill). */
const PATHS: Record<IconName, React.ReactNode> = {
  "arrow-right": (
    <>
      <line x1="3" y1="12" x2="21" y2="12" />
      <polyline points="14 5 21 12 14 19" />
    </>
  ),
  "arrow-left": (
    <>
      <line x1="21" y1="12" x2="3" y2="12" />
      <polyline points="10 5 3 12 10 19" />
    </>
  ),
  "chevron-down": <polyline points="5 9 12 16 19 9" />,
  hamburger: (
    <>
      <line x1="3" y1="7" x2="21" y2="7" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="17" x2="21" y2="17" />
    </>
  ),
  close: (
    <>
      <line x1="5" y1="5" x2="19" y2="19" />
      <line x1="19" y1="5" x2="5" y2="19" />
    </>
  ),
};

type Props = {
  name: IconName;
  size?: number;
  title?: string;
  className?: string;
};

export function Icon({ name, size = 24, title, className }: Props) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {title ? <title>{title}</title> : null}
      {PATHS[name]}
    </svg>
  );
}
```

- [ ] **Step 4: Run — verify PASS**

Run: `pnpm test components/core/icon.test.tsx`
Expected: 4 passed.

- [ ] **Step 5: Commit**

```bash
git add components/core/icon.tsx components/core/icon.test.tsx
git commit -m "feat(core): Icon hairline glyph set (currentColor, a11y title)"
```

---

### Task 6: `Button` primitive (pill CTA)

**Files:**
- Create: `components/core/button.tsx`
- Test: `components/core/button.test.tsx`

**Interfaces:**
- Consumes: `Icon` (Task 5); `--radius-pill`, `--hairline-button`, `--color-*`, `--ease-brand`, `--scale-press` (Tasks 3).
- Produces: `export function Button(props: { children: React.ReactNode; href?: string; onClick?: () => void; variant?: "outline" | "solid"; trailingArrow?: boolean; className?: string }): JSX.Element`. Renders an `<a>` when `href` is set, otherwise a `<button type="button">`. Pill shape, hairline border on `outline`, mauve fill on `solid`. Includes a trailing `arrow-right` Icon when `trailingArrow`.

- [ ] **Step 1: Write the failing test**

`components/core/button.test.tsx`:
```tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "@/components/core/button";

describe("Button", () => {
  it("renders a link when href is provided", () => {
    render(<Button href="/contact">LET&apos;S WORK TOGETHER</Button>);
    const link = screen.getByRole("link", { name: /LET'S WORK TOGETHER/i });
    expect(link).toHaveAttribute("href", "/contact");
  });

  it("renders a button and fires onClick when no href", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>SEND</Button>);
    await userEvent.click(screen.getByRole("button", { name: "SEND" }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("has a pill radius", () => {
    render(<Button>X</Button>);
    expect(screen.getByRole("button")).toHaveStyle({
      borderRadius: "var(--radius-pill)",
    });
  });

  it("renders a trailing arrow icon when requested", () => {
    const { container } = render(<Button trailingArrow>NEXT</Button>);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run — verify FAIL**

Run: `pnpm test components/core/button.test.tsx`
Expected: FAIL — cannot resolve module.

- [ ] **Step 3: Write `components/core/button.tsx`**

```tsx
import type { ReactNode } from "react";
import { Icon } from "./icon";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "outline" | "solid";
  trailingArrow?: boolean;
  className?: string;
};

const base =
  "group inline-flex items-center gap-[10px] px-[26px] py-[13px] " +
  "font-[family-name:var(--font-ui)] text-[14px] uppercase tracking-[0.06em] " +
  "transition-[background-color,color,transform] duration-200 " +
  "ease-[var(--ease-brand)] active:scale-[var(--scale-press)] " +
  "hover:bg-[var(--color-accent)] hover:text-[var(--color-cream)]";

export function Button({
  children,
  href,
  onClick,
  variant = "outline",
  trailingArrow = false,
  className = "",
}: Props) {
  const style = {
    borderRadius: "var(--radius-pill)",
    border:
      variant === "outline"
        ? "var(--hairline-button) solid var(--color-ink)"
        : "var(--hairline-button) solid transparent",
    backgroundColor: variant === "solid" ? "var(--color-accent)" : "transparent",
    color: variant === "solid" ? "var(--color-cream)" : "var(--color-ink)",
  } as const;

  const content = (
    <>
      {children}
      {trailingArrow ? <Icon name="arrow-right" size={16} /> : null}
    </>
  );

  if (href) {
    return (
      <a href={href} className={`${base} ${className}`} style={style}>
        {content}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={`${base} ${className}`} style={style}>
      {content}
    </button>
  );
}
```

- [ ] **Step 4: Run — verify PASS**

Run: `pnpm test components/core/button.test.tsx`
Expected: 4 passed.

- [ ] **Step 5: Commit**

```bash
git add components/core/button.tsx components/core/button.test.tsx
git commit -m "feat(core): Button pill CTA (outline/solid, hover fill, trailing arrow)"
```

---

### Task 7: `Wordmark` primitive

**Files:**
- Create: `components/core/wordmark.tsx`
- Test: `components/core/wordmark.test.tsx`

**Interfaces:**
- Consumes: existing asset `public/figma-assets/smur-logo.svg` (desktop, 108×24) and `public/figma-assets/mobile/smur-logo.svg` (mobile). Tinted via CSS mask so it follows `currentColor` — matching the existing Nav technique (`components/nav.tsx:44-45`).
- Produces: `export function Wordmark(props: { className?: string; width?: number; height?: number; title?: string }): JSX.Element` — the "SMUR." mark as a mask-tinted box; accessible label via `role="img"` + `aria-label` (default "SMUR").

- [ ] **Step 1: Write the failing test**

`components/core/wordmark.test.tsx`:
```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Wordmark } from "@/components/core/wordmark";

describe("Wordmark", () => {
  it("has an accessible name", () => {
    render(<Wordmark />);
    expect(screen.getByRole("img", { name: "SMUR" })).toBeInTheDocument();
  });

  it("tints via CSS mask of the logo asset and inherits currentColor", () => {
    render(<Wordmark />);
    const el = screen.getByRole("img", { name: "SMUR" });
    expect(el).toHaveStyle({ backgroundColor: "currentColor" });
    expect((el as HTMLElement).style.maskImage).toContain("smur-logo.svg");
  });

  it("applies width and height", () => {
    render(<Wordmark width={108} height={24} />);
    const el = screen.getByRole("img", { name: "SMUR" });
    expect(el).toHaveStyle({ width: "108px", height: "24px" });
  });
});
```

- [ ] **Step 2: Run — verify FAIL**

Run: `pnpm test components/core/wordmark.test.tsx`
Expected: FAIL — cannot resolve module.

- [ ] **Step 3: Write `components/core/wordmark.tsx`**

```tsx
const SRC = "/figma-assets/smur-logo.svg";

type Props = {
  className?: string;
  width?: number;
  height?: number;
  title?: string;
};

export function Wordmark({ className, width = 108, height = 24, title = "SMUR" }: Props) {
  return (
    <span
      role="img"
      aria-label={title}
      className={className}
      style={{
        display: "inline-block",
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: "currentColor",
        WebkitMaskImage: `url(${SRC})`,
        maskImage: `url(${SRC})`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}
```

- [ ] **Step 4: Run — verify PASS**

Run: `pnpm test components/core/wordmark.test.tsx`
Expected: 3 passed.

- [ ] **Step 5: Add a barrel export and commit**

Create `components/core/index.ts`:
```ts
export { Eyebrow } from "./eyebrow";
export { Icon, type IconName } from "./icon";
export { Button } from "./button";
export { Wordmark } from "./wordmark";
```
Then:
```bash
git add components/core/wordmark.tsx components/core/wordmark.test.tsx components/core/index.ts
git commit -m "feat(core): Wordmark mask-tinted SMUR mark + core barrel export"
```

---

### Task 8: Specimen page + full-suite + build verification

**Files:**
- Create: `app/specimen/page.tsx` (a visual gallery of tokens + core primitives, for eyeballing the foundation; branch-only, removed before the Home phase merges to production nav)
- Test: (none new) — this task is the integration gate.

**Interfaces:**
- Consumes: everything from Tasks 3–7.
- Produces: a route `/specimen` rendering color swatches, the type scale, and every core component in both variants — the artifact the reviewer visually checks at 1440 and 393.

- [ ] **Step 1: Write `app/specimen/page.tsx`**

```tsx
import { Eyebrow, Button, Icon, Wordmark } from "@/components/core";
import { colors } from "@/lib/tokens";

export default function SpecimenPage() {
  return (
    <main style={{ padding: "48px", background: "var(--color-page)", color: "var(--color-ink)" }}>
      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "var(--text-display)", lineHeight: "var(--leading-display)" }}>
        Foundation specimen
      </h1>

      <section style={{ marginTop: 40 }}>
        <Eyebrow>colour tokens</Eyebrow>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 12 }}>
          {Object.entries(colors).map(([name, hex]) => (
            <div key={name} style={{ width: 120 }}>
              <div style={{ height: 64, background: hex, border: "1px solid var(--color-line)" }} />
              <div style={{ fontSize: 12, marginTop: 4 }}>{name}<br />{hex}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 40 }}>
        <Eyebrow>type scale</Eyebrow>
        <p style={{ fontFamily: "var(--font-serif)", fontSize: "var(--text-h2)" }}>H2 — Naming &amp; Positioning</p>
        <p style={{ fontFamily: "var(--font-serif)", fontSize: "var(--text-h3)" }}>H3 — Print &amp; More</p>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-body)", lineHeight: "var(--leading-body)", maxWidth: 430 }}>
          Body 17/1.33 — Branding is not just aesthetics, it&rsquo;s a reflection of who you are.
        </p>
      </section>

      <section style={{ marginTop: 40, display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
        <Eyebrow>components</Eyebrow>
        <Wordmark />
        <Button href="#" trailingArrow>LET&apos;S WORK TOGETHER</Button>
        <Button variant="solid">SEND</Button>
        <span style={{ display: "inline-flex", gap: 12 }}>
          <Icon name="arrow-left" title="prev" />
          <Icon name="arrow-right" title="next" />
          <Icon name="chevron-down" />
          <Icon name="hamburger" />
          <Icon name="close" />
        </span>
      </section>
    </main>
  );
}
```

- [ ] **Step 2: Run the full test suite — verify all green**

Run: `pnpm test`
Expected: all suites pass (tokens, css layers, eyebrow, icon, button, wordmark).

- [ ] **Step 3: Build**

Run: `pnpm build`
Expected: build succeeds; `/specimen` compiles.

- [ ] **Step 4: Visual check**

Run: `pnpm dev`, open `http://localhost:3000/specimen`. Confirm at browser widths **1440** and **393**:
- swatches show the warm palette (cream page, espresso ink, dusty rose, mauve, clay, sage);
- the display heading scales smoothly between the two widths (no zoom, no overflow);
- Eyebrow is italic mauve; Button is a hairline pill that fills mauve on hover; Wordmark reads "SMUR." in ink; all five icons are thin line-glyphs.

- [ ] **Step 5: Commit**

```bash
git add app/specimen/page.tsx
git commit -m "feat(specimen): foundation gallery for visual verification of tokens + core"
```

---

## Self-Review (completed by plan author)

- **Spec coverage:** Token foundation §5 → Tasks 2–3 (color/type/space/radii/motion). Core components §6 `core/` (Button, Eyebrow, Icon, Wordmark) → Tasks 4–7. Fonts §10 (existing four Google fonts, no new) → reused as-is via `--font-*` roles in Task 3; layout.tsx already loads them (no change needed this phase). No-`zoom`/fluid §9 → clamp tokens in Task 3. Preserve motion → tokenized in Task 3, animations untouched. Navigation/sections/work/pages are **out of scope for this plan** (later phases) — intentional per the phased decomposition.
- **Placeholder scan:** none — every step carries real code/commands. Task 3 Step 7 spells out the exact `@theme` `--color-page` edit rather than deferring.
- **Type consistency:** `IconName` defined in Task 5 and reused by `Button` (Task 6) and the barrel (Task 7). `colors`/`space`/`radii`/`hairline`/`motion` signatures from Task 2 are consumed unchanged in Task 3's test and Task 8's specimen. Component prop names are stable across tests and implementations.
- **Deferred to later plans:** the `@theme` `--color-page` reconciliation to `#FFF7F4` is applied here but its effect on the live Home background is only realized (and visually diffed) in the Home phase; `/specimen` is a branch-only route removed before/at the Home merge.
