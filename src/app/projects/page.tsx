import type { Metadata } from "next";
import { ProjectCard } from "@/components/ProjectCard";
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
      <div className="mt-8 grid gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
