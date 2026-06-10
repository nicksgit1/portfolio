export type Project = {
  slug: string;
  title: string;
  summary: string;
  /** Problem → approach → result. The case-study body, in order. */
  caseStudy: {
    problem: string;
    approach: string;
    result: string;
  };
  stack: string[];
  links: {
    repo?: string;
    live?: string;
  };
  featured: boolean;
};

/**
 * PLACEHOLDER projects — replaced once Nick and Claude draft real
 * case studies. Shape is final; content is not.
 */
export const projects: Project[] = [
  {
    slug: "project-one",
    title: "Project One",
    summary:
      "A placeholder project demonstrating the case-study format: one sentence on what it is and who it serves.",
    caseStudy: {
      problem:
        "Describe the real-world problem: who had it, why existing solutions fell short, and what was at stake.",
      approach:
        "Describe the key technical decisions and trade-offs: architecture, stack choices, what you deliberately did not build.",
      result:
        "Describe the measurable outcome: performance numbers, users, lessons learned, what you would do differently.",
    },
    stack: ["Next.js", "TypeScript", "PostgreSQL"],
    links: {},
    featured: true,
  },
];
