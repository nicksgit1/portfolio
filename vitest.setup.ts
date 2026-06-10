import "@testing-library/jest-dom/vitest";
import * as axeMatchers from "vitest-axe/matchers";
import { expect } from "vitest";

// Adds expect(...).toHaveNoViolations() for automated WCAG checks.
expect.extend(axeMatchers);
