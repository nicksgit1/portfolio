import type { Metadata } from "next";
import { ProjectFilter } from "@/components/ProjectFilter";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Case studies of selected projects.",
};

export default function ProjectsPage() {
  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Projects</h1>
      <p className="mt-4 max-w-prose text-muted">
        Each project is written up as a short case study: the problem, the
        approach, and what came of it.
      </p>
      {/* The filter bar + grid are interactive, so they live in a client
          component; this page stays a Server Component. */}
      <ProjectFilter projects={projects} />
    </div>
  );
}
