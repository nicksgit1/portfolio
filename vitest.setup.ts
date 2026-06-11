import "@testing-library/jest-dom/vitest";
import * as axeMatchers from "vitest-axe/matchers";
import { afterEach, expect, vi } from "vitest";
import { cleanup } from "@testing-library/react";

// Adds expect(...).toHaveNoViolations() for automated WCAG checks.
// The runtime extension below registers the matcher; the module
// augmentation teaches TypeScript about it (tsc --noEmit fails otherwise).
expect.extend(axeMatchers);

declare module "vitest" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type -- interface merging is the documented way to register matcher types
  interface Assertion extends axeMatchers.AxeMatchers {}
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type -- same as above
  interface AsymmetricMatchersContaining extends axeMatchers.AxeMatchers {}
}

// Testing Library's automatic cleanup needs a global afterEach, which
// Vitest only provides with globals: true. Register it explicitly so
// components unmount between tests instead of stacking up in the DOM.
afterEach(() => {
  cleanup();
});

// axe-core probes canvas for its icon-ligature check; jsdom doesn't
// implement canvas. Stub it to keep test output clean.
HTMLCanvasElement.prototype.getContext = vi.fn();
