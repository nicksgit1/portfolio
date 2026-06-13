import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { ProjectFilter } from "./ProjectFilter";
import type { Project } from "@/content/projects";

function project(slug: string, stack: string[]): Project {
  return {
    slug,
    title: `Project ${slug}`,
    summary: "Summary.",
    caseStudy: { problem: "p", approach: "a", result: "r" },
    stack,
    links: {},
    featured: false,
  };
}

const sample: Project[] = [
  project("alpha", ["React", "TypeScript", "Node.js"]),
  project("beta", ["React", "PHP"]),
  project("gamma", ["Swift", "Kotlin"]),
];

describe("ProjectFilter", () => {
  it("shows every project before any filter is applied", () => {
    render(<ProjectFilter projects={sample} />);
    expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(
      sample.length,
    );
  });

  it("derives one toggle per unique technology, most common first", () => {
    render(<ProjectFilter projects={sample} />);
    const group = screen.getByRole("list", {
      name: "Filter by technology",
    });
    const labels = within(group)
      .getAllByRole("button")
      .map((b) => b.textContent);
    // React appears twice, so it leads; the rest are single-use.
    expect(labels[0]).toBe("React");
    expect(new Set(labels)).toEqual(
      new Set(["React", "TypeScript", "Node.js", "PHP", "Swift", "Kotlin"]),
    );
  });

  it("filters to projects using the selected technology", async () => {
    const user = userEvent.setup();
    render(<ProjectFilter projects={sample} />);

    await user.click(screen.getByRole("button", { name: "React" }));

    expect(screen.getByText("Project alpha")).toBeInTheDocument();
    expect(screen.getByText("Project beta")).toBeInTheDocument();
    expect(screen.queryByText("Project gamma")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "React" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("combines multiple selections with AND", async () => {
    const user = userEvent.setup();
    render(<ProjectFilter projects={sample} />);

    await user.click(screen.getByRole("button", { name: "React" }));
    await user.click(screen.getByRole("button", { name: "TypeScript" }));

    // Only alpha has both React and TypeScript.
    expect(screen.getByText("Project alpha")).toBeInTheDocument();
    expect(screen.queryByText("Project beta")).not.toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent(
      "Showing 1 of 3 projects",
    );
  });

  it("shows an empty-state message when no project matches all filters", async () => {
    const user = userEvent.setup();
    render(<ProjectFilter projects={sample} />);

    await user.click(screen.getByRole("button", { name: "React" }));
    await user.click(screen.getByRole("button", { name: "Swift" }));

    expect(screen.getByText(/no projects use all of those/i)).toBeVisible();
  });

  it("clears all filters with the clear control", async () => {
    const user = userEvent.setup();
    render(<ProjectFilter projects={sample} />);

    await user.click(screen.getByRole("button", { name: "Swift" }));
    expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(1);

    await user.click(screen.getByRole("button", { name: "Clear filters" }));
    expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(
      sample.length,
    );
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<ProjectFilter projects={sample} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
