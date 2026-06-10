import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import { ProjectCard } from "./ProjectCard";
import type { Project } from "@/content/projects";

const project: Project = {
  slug: "test-project",
  title: "Test Project",
  summary: "A project used in tests.",
  caseStudy: { problem: "p", approach: "a", result: "r" },
  stack: ["TypeScript", "PostgreSQL"],
  links: {},
  featured: true,
};

describe("ProjectCard", () => {
  it("links to the project case study", () => {
    render(<ProjectCard project={project} />);
    expect(screen.getByRole("link", { name: "Test Project" })).toHaveAttribute(
      "href",
      "/projects/test-project",
    );
  });

  it("lists the tech stack accessibly", () => {
    render(<ProjectCard project={project} />);
    const stack = screen.getByRole("list", { name: "Tech stack" });
    expect(stack).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<ProjectCard project={project} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
