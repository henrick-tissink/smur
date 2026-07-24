import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

afterEach(() => cleanup());

/*
  next-intl's locale-aware navigation (createNavigation) imports next/navigation,
  which needs Next's router context and doesn't resolve cleanly under vitest/pnpm.
  Mock our wrapper so components using the localized <Link> / router hooks render
  in jsdom: <Link> becomes a plain <a href> (href assertions still work) and the
  router/pathname hooks are inert stubs.
*/
// setRequestLocale opts pages into static rendering by writing to next-intl's
// request store, which doesn't exist under vitest. Stub it to a no-op so async
// page components (which call it) can be awaited + rendered in tests. The rest
// of next-intl/server (getTranslations/getLocale) is preserved.
vi.mock("next-intl/server", async (importOriginal) => {
  const actual = await importOriginal<typeof import("next-intl/server")>();
  return { ...actual, setRequestLocale: () => {} };
});

vi.mock("@/i18n/navigation", async () => {
  const React = await import("react");
  return {
    Link: ({ href, children, ...rest }: { href: string; children?: unknown }) =>
      React.createElement("a", { href, ...rest }, children as React.ReactNode),
    usePathname: () => "/",
    useRouter: () => ({
      replace: () => {},
      push: () => {},
      back: () => {},
      forward: () => {},
      prefetch: () => {},
      refresh: () => {},
    }),
    redirect: () => {},
    getPathname: () => "/",
  };
});

// jsdom has no IntersectionObserver; framer-motion's `whileInView` (used by
// components/reveal.tsx) needs one to mount without throwing. A minimal stub
// is enough for tests — we don't assert on real intersection behavior here.
class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin: string = "";
  readonly thresholds: ReadonlyArray<number> = [];
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

if (typeof globalThis.IntersectionObserver === "undefined") {
  globalThis.IntersectionObserver =
    MockIntersectionObserver as unknown as typeof IntersectionObserver;
}
