import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach } from "vitest";

afterEach(() => cleanup());

// Mock custom CSS units (e.g. cqw) that JSDOM's CSS parser doesn't recognize.
// We wrap the native CSSStyleDeclaration to accept and preserve these values.
beforeEach(() => {
  const styleStore = new WeakMap<CSSStyleDeclaration, Map<string, string>>();

  const CSSStyleDeclarationHandler: ProxyHandler<CSSStyleDeclaration> = {
    get(target: any, prop: string) {
      // For CSS properties that might hold custom units, check our store first
      if (
        typeof prop === "string" &&
        (prop === "width" || prop === "height")
      ) {
        if (!styleStore.has(target)) {
          styleStore.set(target, new Map());
        }
        const store = styleStore.get(target)!;
        if (store.has(prop)) {
          return store.get(prop);
        }
      }
      return (target as any)[prop];
    },
    set(target: any, prop: string, value: any) {
      if (
        typeof prop === "string" &&
        (prop === "width" || prop === "height")
      ) {
        if (!styleStore.has(target)) {
          styleStore.set(target, new Map());
        }
        const store = styleStore.get(target)!;
        store.set(prop, value);
        // Also set on the native target in case it's valid CSS
        try {
          (target as any)[prop] = value;
        } catch {
          // Silently ignore if JSDOM rejects it
        }
        return true;
      }
      (target as any)[prop] = value;
      return true;
    },
  };

  // Wrap all CSSStyleDeclaration instances in a proxy
  const originalGetElementStyle = Object.getOwnPropertyDescriptor(
    HTMLElement.prototype,
    "style"
  );
  if (originalGetElementStyle?.get) {
    const originalGetter = originalGetElementStyle.get;
    Object.defineProperty(HTMLElement.prototype, "style", {
      get() {
        const styleObj = originalGetter.call(this);
        return new Proxy(styleObj, CSSStyleDeclarationHandler);
      },
    });
  }
});
