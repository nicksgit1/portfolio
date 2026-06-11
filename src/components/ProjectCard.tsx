import Link from "next/link";
import { StackList } from "@/components/StackList";
import type { Project } from "@/content/projects";

type Props = {
  project: Project;
  /**
   * Heading depth of the surrounding page outline: h2 where cards sit
   * directly under the page h1 (the projects index), h3 where they sit
   * under an h2 section heading (the home page). Keeps the document
   * outline logical — a WCAG requirement, and axe's heading-order
   * check fails without it.
   */
  headingLevel?: "h2" | "h3";
};

export function ProjectCard({ project, headingLevel = "h3" }: Props) {
  const Heading = headingLevel;

  // Neon border + glow respond to both hover and keyboard focus on the
  // title link (via :has), so the "this is interactive" signal works for
  // pointer and keyboard users alike.
  return (
    <article className="relative rounded-lg border border-border bg-surface p-6 transition hover:border-accent hover:shadow-[0_0_28px_-8px_var(--glow-pink)] has-[a:focus-visible]:border-accent has-[a:focus-visible]:shadow-[0_0_28px_-8px_var(--glow-pink)]">
      <Heading className="font-display text-lg font-semibold">
        {/* after:inset-0 stretches the link over the whole card, so the
            full surface is clickable while the accessible name stays the
            project title. */}
        <Link
          href={`/projects/${project.slug}`}
          className="neon-link after:absolute after:inset-0"
        >
          {project.title}
        </Link>
      </Heading>
      <p className="mt-2 text-muted">{project.summary}</p>
      <StackList stack={project.stack} className="mt-4" />
    </article>
  );
}
