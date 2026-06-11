import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import AboutPage from "./page";
import { site } from "@/content/site";

describe("About page", () => {
  it("has exactly one h1", () => {
    render(<AboutPage />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("links the contact email as mailto", () => {
    render(<AboutPage />);
    expect(screen.getByRole("link", { name: site.email })).toHaveAttribute(
      "href",
      `mailto:${site.email}`,
    );
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<AboutPage />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
