# Phase 3c — Home: Testimonial + PhotoStrip + About + live page assembly & swap — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Build the last three home sections (Testimonial carousel, Photo strip, About) faithful-fluid, then **assemble the new home page and swap the live `app/page.tsx`** off the old fixed-canvas+zoom build, retire the legacy components, and revise the now-outdated CLAUDE.md rules. Preserve every animation.

**Architecture:** Sections join `components/sections/`. The Testimonial carousel + `Reveal` keyed re-reveals and the About `Reveal` staggers are ported unchanged. About uses the **aspect-ratio stage + cqw** pattern (like the hero). The new `app/page.tsx` renders **both** the desktop and mobile trees, **CSS-toggled** (`hidden md:block` / `md:hidden`) with **NO `zoom` wrappers**. Because a render-both page can't share ids, the **mobile tree uses `m-` prefixed ids** and the `MobileMenu` rewrites `/#x → /#m-x` (the proven legacy pattern; this reverses the earlier "shared ids" decision, which only held for a render-one page).

**Tech Stack:** Next.js 16, React 19, Tailwind v4, `motion/react`, Vitest + RTL. Reuses `Reveal`, `Arrow`, `FigmaImage` (incl. its rotated branch for the photo strip if needed — but the strip uses plain object-cover), `TitleMask`, `content/home.ts`, and the Phase 1–3b components.

**Phase context:** Plan 3c, final phase of Home (spec: `docs/superpowers/specs/2026-07-20-faithful-fluid-rearchitecture-design.md`). After this, the legacy `components/{hero,service-card,services-list,dropdown,testimonial,photo-strip,about,nav,figma-image usage},components/mobile/*,components/hero-extras/*` that are no longer imported get deleted.

## Global Constraints

- **Runtime:** Node 22, pnpm 10.33.4. If missing: `export PATH="$HOME/.nvm/versions/node/v22.23.1/bin:$PATH"`.
- **PRESERVE ALL ANIMATIONS:** Testimonial carousel (manual prev/next, `go(delta)` wrap, `Reveal key={q-/a-index}` re-reveal on change, attribution `delay 0.06`, `Arrow` hover); About `Reveal` staggers (title 0, body 0.08, portrait 0.15, socials 0.2). PhotoStrip has NO animation (keep it static). Port motion unchanged.
- **Faithful + fluid, no `zoom`/`transform:scale`.** Testimonial: centered flex, arrows at fluid `--gutter`, quote block fluid max-width. PhotoStrip: full-bleed responsive row (desktop) / 2×2 grid (mobile). About: aspect-ratio stage + `%`/`cqw`.
- **id strategy (page assembly):** desktop sections keep canonical ids (`#home`, `#brand-identity`, `#naming-positioning`, `#webdesign-print`, `#about`); **mobile sections use `m-`-prefixed ids** (`#m-home`, `#m-brand-identity`, …, `#m-about`) AND `m-`-prefixed `aria-labelledby`/title ids; `MobileNav` logo → `/#m-home`; `MobileMenu` rewrites every `/#x` hash link → `/#m-x`. No duplicate ids in the DOM.
- **Content verbatim** from `content/home.ts` (`testimonials`, `photos`, `about`) — About body copy is hardcoded in the legacy component; copy it verbatim.
- **Do NOT touch** legacy files until the cleanup task; build new under `components/sections/`.
- **Path alias:** `@/*` → repo root. TDD + frequent commits.

## Source values (from the Figma-accurate legacy components)

- **Testimonial** (`components/testimonial.tsx`): sage `--color-band` bg, `data-nav-scheme="dark"`, height 426; centered flex; prev/next `Arrow size={42}` at `left/right 218px, top 50% -translate-y-1/2`, `text-ink/70 hover:text-ink`; quote block `w-[702px] gap-[30px] text-center`, quote `17px/1.45 whitespace-pre-line`, attribution `20px italic`; `Reveal key={q-/a-${index}}` (attr delay 0.06). 4 `testimonials`.
- **MobileTestimonial** (`components/mobile/testimonial.tsx`): flex-column `min-height 522`, arrows pinned bottom corners, `Arrow size={40}`, quote 15px.
- **PhotoStrip** (`components/photo-strip.tsx`): `bg-page`, `data-nav-scheme="dark"`, `<ul flex h-[357px] w-full>` of 4 `<li flex-1 overflow-hidden>`, `next/image fill unoptimized sizes="25vw" object-cover`; NO animation. `MobilePhotoStrip`: 393×392 2×2 grid, reordered (3/4 top, 1/2 bottom), rows overlap 1px.
- **About** (`components/about.tsx`): `#906553`/`--color-about` bg, `data-nav-scheme="light"`, height 971; positioning frame `left 218 top 133 w 981 h 728`; title `TitleMask about.svg 273.84×220.43 leftBearing 6` at 0,0 cream `as={2}` id `about-title`; body 3 paras `left 557 top 0 w 424` 17px cream (verbatim); portrait `FigmaImage` `left 557 top 359` frame 294×294; socials `left 557 top 714 w 361` 20px italic white (Instagram `smurstudio`, Pinterest `ro.pinterest smurstudio/_saved`). Reveal delays 0/.08/.15/.2. `MobileAbout` (`components/mobile/about.tsx`): 393×1081, centered column, `about-centered.svg` title, portrait bottom-anchored (`right 75 bottom 182`, 243×243) with wrapper OUTSIDE the Reveal, socials bottom, URLs from `contactFAQ`.

---

### Task 1: `Testimonial` (desktop carousel)
**Files:** Create `components/sections/testimonial.tsx` + test.
**Port** `components/testimonial.tsx` → `Testimonial()`. Keep the carousel logic (`useState index`, `go(delta)` wrap), the `Reveal key={q-/a-${index}}` re-reveal (attr delay 0.06), and `Arrow` usage UNCHANGED. Fluid changes: arrows at `left/right: var(--gutter)` (not 218px); quote block `w-[min(702px,100%)]` (or `max-w-[702px] w-full px-[var(--gutter)]`); section height `min-h-[clamp(360px,30vw,426px)]` (fluid) with content centered. `data-nav-scheme="dark"`, `--color-band` bg.
- [ ] Test: renders the region + first quote + attribution; clicking "Next testimonial" shows a different quote (assert quote text changes). Red→green. Full `pnpm test`. Commit `feat(sections): Testimonial carousel (keyed re-reveals preserved, fluid)`.

### Task 2: `MobileTestimonial`
**Files:** Create `components/sections/mobile-testimonial.tsx` + test.
**Port** `components/mobile/testimonial.tsx` → `MobileTestimonial()`. Same carousel + keyed reveals; fluid-stage (393-base) via `%`/`cqw`; arrows pinned bottom corners; quote 15px→cqw. Preserve animation.
- [ ] Test: renders + prev/next cycles the quote. Commit `feat(sections): MobileTestimonial (carousel preserved, fluid)`.

### Task 3: `PhotoStrip` + `MobilePhotoStrip`
**Files:** Create `components/sections/photo-strip.tsx` + `components/sections/mobile-photo-strip.tsx` + tests.
**Port** both. Desktop: full-bleed `<ul flex w-full>` of 4 `<li flex-1 overflow-hidden>`, height fluid `clamp(240px,25vw,357px)`, `next/image fill object-cover unoptimized sizes="25vw"`. Mobile: 2×2 grid (reordered 3/4 top, 1/2 bottom), rows overlap 1px, `object-cover`. NO animation (static — do not add Reveal). `data-nav-scheme="dark"`, `bg-page`.
- [ ] Test each: renders 4 photo images with the correct `alt`s. Commit `feat(sections): PhotoStrip + MobilePhotoStrip (static, fluid)`.

### Task 4: `About` (desktop)
**Files:** Create `components/sections/about.tsx` + test.
**Port** `components/about.tsx` → `About()` using the **aspect-ratio stage** pattern: `<section id="about" data-nav-scheme="light">` bg `--color-about`; stage `mx-auto w-full max-w-[1440px]` `aspect-ratio: 1440/971` `container-type: inline-size`; the positioning frame + its absolute children converted to `%` (positions) / `cqw` (type + TitleMask size); `Reveal` delays (title 0, body 0.08, portrait 0.15, socials 0.2) UNCHANGED; body copy verbatim; portrait via `FigmaImage` (its frame is inside the stage — position by %); socials links as-is. `id="about"`, `aria-labelledby="about-title"`.
- [ ] Test: renders `section#about` (nav-scheme light) + level-2 heading + body text ("grown beyond branding") + INSTAGRAM/PINTEREST links; stage has aspect-ratio 1440/971 + container-type inline-size. Commit `feat(sections): fluid About (aspect stage, Reveal staggers preserved)`.

### Task 5: `MobileAbout`
**Files:** Create `components/sections/mobile-about.tsx` + test.
**Port** `components/mobile/about.tsx` → `MobileAbout()`: aspect-ratio `393/1081` stage, `container-type: inline-size`, `%`/`cqw`; `about-centered.svg` title; portrait bottom-anchored with its wrapper OUTSIDE the `Reveal` (preserve that structure — it avoids the transform-containing-block bug); socials from `contactFAQ`. Reveal delays preserved. **Use `m-`-prefixed id (`m-about`)** here (mobile tree).
- [ ] Test: renders `section#m-about` + heading + body + socials; aspect-ratio 393/1081 + container-type inline-size. Commit `feat(sections): fluid MobileAbout (aspect stage, m- id)`.

### Task 6: mobile ids → `m-` prefix + MobileMenu rewrite + specimen
**Files:** Modify `components/sections/mobile-hero.tsx`, `mobile-service-section.tsx`, `mobile-services-list-section.tsx` (prefix their section + title ids with `m-`); modify `components/navigation/mobile-nav.tsx` (logo `/#home` → `/#m-home`) and `components/navigation/mobile-menu.tsx` (rewrite each `/#x` link → `/#m-x`). Modify `app/specimen/page.tsx` to add Testimonial/PhotoStrip/About (desktop + mobile).
Update the affected tests (mobile sections now assert `m-` ids; MobileMenu test asserts a rewritten link e.g. `/#m-about`).
- [ ] TDD the id/rewrite changes; full `pnpm test`; `pnpm build`. Commit `feat(sections): mobile m- id prefix + MobileMenu link rewrite; specimen + remaining sections`.
- [ ] **(controller visual check)** the remaining sections in `/specimen` (testimonial cycles; photo strip; about) — pending browser availability.

### Task 7: Assemble the new home page + swap `app/page.tsx` (⚠️ live change)
**Files:** Rewrite `app/page.tsx`.
Replace the zoom-wrapped dual layout with a render-both, CSS-toggled, **no-zoom** page:
```
<>
  {/* mobile */}
  <div className="md:hidden">
    <MobileNav />
    <main>
      <MobileHero />
      <MobileServiceSection service={services[0]} />
      <MobileServiceSection service={services[1]} />
      <MobileServicesListSection />
      <MobileTestimonial />
      <MobilePhotoStrip />
      <MobileAbout />
    </main>
  </div>
  {/* desktop */}
  <div className="hidden md:block">
    <Nav scheme="light" />
    <main>
      <Hero />
      <ServiceSection service={services[0]} />
      <ServiceSection service={services[1]} />
      <ServicesListSection />
      <Testimonial />
      <PhotoStrip />
      <About />
    </main>
  </div>
</>
```
All from `@/components/sections` + `@/components/navigation`. NO `zoom` style, no `1440px`/`393px` fixed wrappers. The desktop tree carries canonical ids; the mobile tree carries `m-` ids (from Task 6). Nav is `position:absolute top-0` — the first section (Hero) must sit under it (it already reserves space via the hero stage; verify the nav overlaps the hero, not pushes it).
- [ ] Test: `app/page.tsx` renders (RTL smoke: both a desktop and a mobile hero heading exist; no duplicate `#home`/`#about` — desktop `#home`/`#about`, mobile `#m-home`/`#m-about`). `pnpm test`; `pnpm build`. Commit `feat(home): swap live home page to faithful-fluid (no zoom)`.
- [ ] **(controller visual check — REQUIRED before merge)** `pnpm dev` → `http://localhost:3000/` (the REAL home). Verify desktop at 1440 + intermediate widths (800–1300) + mobile ≤767: all sections render, animations run (hero crossfade, accordion, testimonial cycle, Reveals), no overflow, nav overlaps hero correctly, no duplicate-id anchor breakage.

### Task 8: Cleanup + CLAUDE.md revision
**Files:** Delete legacy components no longer imported (verify with `grep` that nothing references them): `components/hero.tsx`, `components/hero-extras/*`, `components/service-card.tsx`, `components/services-list.tsx`, `components/dropdown.tsx`, `components/testimonial.tsx`, `components/photo-strip.tsx`, `components/about.tsx`, `components/nav.tsx`, `components/mobile/*` (the home ones), and any now-orphaned helpers. Keep anything still used by `/work` or `/contact` routes (those aren't rebuilt — check imports first). Revise `CLAUDE.md` rules **#7** (native-width → faithful-fluid), **#8** (absolute-positioning mandate → tokenized responsive components + aspect-stage/`cqw` pattern), **#17** (separate mobile/desktop → one responsive component unless the mobile Figma structurally diverges), and add the token-foundation + no-`zoom` + shared-`components/sections` guidance.
- [ ] `grep -r` each candidate before deleting to confirm zero remaining imports (do NOT delete anything still used by `/work`/`/contact`). `pnpm test` + `pnpm build` green after deletion. Commit `chore(home): retire legacy home components; revise CLAUDE.md for faithful-fluid`.

---

## Self-Review (completed by plan author)
- **Spec coverage:** Testimonial/PhotoStrip/About (§6) desktop+mobile → Tasks 1–5; page assembly + live swap → Task 7; legacy retirement + CLAUDE.md #7/#8/#17 → Task 8. Animation preservation → carousel/Reveal ported unchanged; PhotoStrip stays static. Faithful-fluid no-zoom → aspect stage / fluid flex; the swap removes the zoom wrappers.
- **id strategy:** the render-both page forces distinct ids → mobile `m-` prefix + MobileMenu rewrite (Task 6), resolving the whole-branch-review collision risk. Documented as a reversal of the earlier shared-id decision.
- **Risk:** Task 7 is a live production change; its visual check is REQUIRED before any merge and is called out. Browser may be unavailable — if so, the swap stays on the branch and the user verifies before merge.
- **Placeholder scan:** section tasks use port-from-legacy instructions (consistent with 3a/3b) with explicit fluid rules + tests; assembly task has concrete JSX. No vague placeholders.
- **Scope:** legacy untouched until Task 8; Task 8 gated on grep-verified zero-imports and green build.
