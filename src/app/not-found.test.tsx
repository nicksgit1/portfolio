import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import NotFound from "./not-found";

describe("Not-found page", () => {
  it("has exactly one h1", () => {
    render(<NotFound />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Page not found" }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("links back to home", () => {
    render(<NotFound />);
    expect(screen.getByRole("link", { name: "Back to home" })).toHaveAttribute(
      "href",
      "/",
    );
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<NotFound />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
