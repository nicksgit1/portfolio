import "@testing-library/jest-dom/vitest";
import * as axeMatchers from "vitest-axe/matchers";
import { afterEach, expect, vi } from "vitest";
import { cleanup } from "@testing-library/react";

// Adds expect(...).toHaveNoViolations() for automated WCAG checks.
expect.extend(axeMatchers);

// Testing Library's automatic cleanup needs a global afterEach, which
// Vitest only provides with globals: true. Register it explicitly so
// components unmount between tests instead of stacking up in the DOM.
afterEach(() => {
  cleanup();
});

// axe-core probes canvas for its icon-ligature check; jsdom doesn't
// implement canvas. Stub it to keep test output clean.
HTMLCanvasElement.prototype.getContext = vi.fn();
