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

  it("titles the card at h3 by default", () => {
    render(<ProjectCard project={project} />);
    expect(
      screen.getByRole("heading", { level: 3, name: "Test Project" }),
    ).toBeInTheDocument();
  });

  it("titles the card at the requested heading level", () => {
    render(<ProjectCard project={project} headingLevel="h2" />);
    expect(
      screen.getByRole("heading", { level: 2, name: "Test Project" }),
    ).toBeInTheDocument();
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
