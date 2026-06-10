import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import Home from "./page";

describe("Home page", () => {
  it("has exactly one h1", () => {
    render(<Home />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("links to the full projects list", () => {
    render(<Home />);
    expect(
      screen.getByRole("link", { name: "All projects" }),
    ).toHaveAttribute("href", "/projects");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Home />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
