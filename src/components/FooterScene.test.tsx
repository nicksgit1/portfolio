import { render } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { FooterScene } from "./FooterScene";

describe("FooterScene", () => {
  // The scene is pure decoration; the contract that matters is that
  // every top-level element stays hidden from assistive tech.
  it("hides all scene elements from assistive tech", () => {
    const { container } = render(<FooterScene />);
    const roots = container.querySelectorAll(".city-scape, .synth-grid");
    expect(roots.length).toBeGreaterThan(0);
    for (const el of roots) {
      expect(el).toHaveAttribute("aria-hidden", "true");
    }
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<FooterScene />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
