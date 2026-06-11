import Link from "next/link";
import type { Project } from "@/content/projects";

export function ProjectCard({ project }: { project: Project }) {
  // Neon border + glow respond to both hover and keyboard focus on the
  // title link (via :has), so the "this is interactive" signal works for
  // pointer and keyboard users alike.
  return (
    <article className="relative rounded-lg border border-border bg-surface p-6 transition hover:border-accent hover:shadow-[0_0_28px_-8px_var(--glow-pink)] has-[a:focus-visible]:border-accent has-[a:focus-visible]:shadow-[0_0_28px_-8px_var(--glow-pink)]">
      <h3 className="font-display text-lg font-semibold">
        {/* after:inset-0 stretches the link over the whole card, so the
            full surface is clickable while the accessible name stays the
            project title. */}
        <Link
          href={`/projects/${project.slug}`}
          className="neon-link after:absolute after:inset-0"
        >
          {project.title}
        </Link>
      </h3>
      <p className="mt-2 text-muted">{project.summary}</p>
      <ul aria-label="Tech stack" className="mt-4 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <li
            key={tech}
            className="rounded-full border border-border bg-glow-violet/10 px-3 py-0.5 text-xs text-muted"
          >
            {tech}
          </li>
        ))}
      </ul>
    </article>
  );
}
