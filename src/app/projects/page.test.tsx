import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import ProjectsPage from "./page";
import { projects } from "@/content/projects";

describe("Projects page", () => {
  it("has exactly one h1", () => {
    render(<ProjectsPage />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("renders every project as an h2 card directly under the h1", () => {
    render(<ProjectsPage />);
    // h2 (not h3): cards sit directly under the page h1, and a skipped
    // heading level fails axe's heading-order check below.
    const cards = screen.getAllByRole("heading", { level: 2 });
    expect(cards).toHaveLength(projects.length);
  });

  it("has no accessibility violations (including heading order)", async () => {
    const { container } = render(<ProjectsPage />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
