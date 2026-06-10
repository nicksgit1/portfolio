import Link from "next/link";
import type { Project } from "@/content/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="rounded-lg border border-border bg-surface p-6">
      <h3 className="text-lg font-semibold">
        <Link
          href={`/projects/${project.slug}`}
          className="hover:text-accent hover:underline"
        >
          {project.title}
        </Link>
      </h3>
      <p className="mt-2 text-muted">{project.summary}</p>
      <ul aria-label="Tech stack" className="mt-4 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <li
            key={tech}
            className="rounded-full border border-border px-3 py-0.5 text-xs text-muted"
          >
            {tech}
          </li>
        ))}
      </ul>
    </article>
  );
}
