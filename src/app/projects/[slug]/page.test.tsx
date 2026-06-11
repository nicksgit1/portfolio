import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";
import { describe, expect, it } from "vitest";
import ProjectPage, { generateMetadata, generateStaticParams } from "./page";
import { projects } from "@/content/projects";

// The page is an async Server Component: call it with params (a Promise,
// per Next 15) and render the JSX it resolves to.
const props = (slug: string) => ({ params: Promise.resolve({ slug }) });

/** Maps Project.links keys to the labels the page renders. */
const LINK_LABELS = {
  live: "Live site",
  repo: "Source code",
  api: "API source",
  ios: "App Store",
  android: "Google Play",
} as const;

describe("Project case-study page", () => {
  it("renders one h1 and the three case-study sections", async () => {
    const project = projects[0];
    render(await ProjectPage(props(project.slug)));
    const h1s = screen.getAllByRole("heading", { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent(project.title);
    for (const name of ["Problem", "Approach", "Result"]) {
      expect(
        screen.getByRole("heading", { level: 2, name }),
      ).toBeInTheDocument();
    }
  });

  it("renders exactly the links each project defines", async () => {
    // Data-driven against the real content, so adding or removing a
    // project link never requires touching this test.
    const project = projects[0];
    render(await ProjectPage(props(project.slug)));
    for (const [key, label] of Object.entries(LINK_LABELS)) {
      const href = project.links[key as keyof typeof LINK_LABELS];
      if (href) {
        expect(screen.getByRole("link", { name: label })).toHaveAttribute(
          "href",
          href,
        );
      } else {
        expect(
          screen.queryByRole("link", { name: label }),
        ).not.toBeInTheDocument();
      }
    }
  });

  it("404s for an unknown slug", async () => {
    // notFound() throws; the framework turns it into the 404 page.
    await expect(ProjectPage(props("no-such-project"))).rejects.toThrow();
  });

  it("exports a static param for every project", () => {
    expect(generateStaticParams()).toEqual(
      projects.map(({ slug }) => ({ slug })),
    );
  });

  it("derives metadata from the project, empty for unknown slugs", async () => {
    const project = projects[0];
    await expect(generateMetadata(props(project.slug))).resolves.toEqual({
      title: project.title,
      description: project.summary,
    });
    await expect(generateMetadata(props("no-such-project"))).resolves.toEqual(
      {},
    );
  });

  it("has no accessibility violations", async () => {
    const { container } = render(await ProjectPage(props(projects[0].slug)));
    expect(await axe(container)).toHaveNoViolations();
  });
});
