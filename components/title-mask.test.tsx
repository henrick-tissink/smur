import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { render, screen } from "@testing-library/react";
import { TitleMask } from "@/components/title-mask";

// jsdom's underlying cssstyle package doesn't recognize container-query units
// (e.g. `cqw`), so `element.style.width = "40.75cqw"` silently no-ops there —
// the value never round-trips through the native CSSStyleDeclaration. This
// shim wraps `HTMLElement.prototype.style` so it does, but ONLY for this file:
// installed once in `beforeAll` and fully restored in `afterAll`. It must not
// leak into other test files (see vitest.setup.ts, which stays minimal).
let originalStyleDescriptor: PropertyDescriptor;

beforeAll(() => {
  originalStyleDescriptor = Object.getOwnPropertyDescriptor(
    HTMLElement.prototype,
    "style"
  )!;
  const originalGetter = originalStyleDescriptor.get!;
  const overrides = new WeakMap<HTMLElement, Map<string, string>>();

  Object.defineProperty(HTMLElement.prototype, "style", {
    configurable: true,
    get(this: HTMLElement) {
      const nativeStyle = originalGetter.call(this) as CSSStyleDeclaration;
      if (!overrides.has(this)) overrides.set(this, new Map());
      const store = overrides.get(this)!;

      return new Proxy(nativeStyle, {
        get(target, prop, receiver) {
          if (
            (prop === "width" || prop === "height") &&
            store.has(prop as string)
          ) {
            return store.get(prop as string);
          }
          return Reflect.get(target, prop, receiver);
        },
        set(target, prop, value, receiver) {
          if (prop === "width" || prop === "height") {
            store.set(prop as string, String(value));
            try {
              Reflect.set(target, prop, value, receiver);
            } catch {
              // jsdom rejects unrecognized units (e.g. cqw) — the override
              // store above is what we actually assert against.
            }
            return true;
          }
          return Reflect.set(target, prop, value, receiver);
        },
      });
    },
  });
});

afterAll(() => {
  Object.defineProperty(
    HTMLElement.prototype,
    "style",
    originalStyleDescriptor
  );
});

describe("TitleMask", () => {
  it("renders the accessible alt text", () => {
    render(<TitleMask src="/x.svg" width={100} height={40} alt="Hello world" />);
    expect(screen.getByText("Hello world")).toBeInTheDocument();
  });

  it("sizes numeric width/height in px", () => {
    const { container } = render(<TitleMask src="/x.svg" width={100} height={40} alt="a" as={null} />);
    const box = container.querySelector("[data-title-mask]") as HTMLElement;
    expect(box.style.width).toBe("100px");
    expect(box.style.height).toBe("40px");
  });

  it("passes string width/height through verbatim (e.g. cqw)", () => {
    const { container } = render(<TitleMask src="/x.svg" width="40.75cqw" height="20.1cqw" alt="a" as={null} />);
    const box = container.querySelector("[data-title-mask]") as HTMLElement;
    expect(box.style.width).toBe("40.75cqw");
    expect(box.style.height).toBe("20.1cqw");
  });
});
