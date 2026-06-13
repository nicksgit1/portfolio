"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/ProjectCard";
import type { Project } from "@/content/projects";

type Props = {
  projects: Project[];
};

/**
 * The projects index, with a technology filter bar above the grid.
 *
 * Interactive, so it's a client component — the rest of the page stays
 * server-rendered. The stack chips on the cards (StackList) stay plain
 * text; filtering lives here in a dedicated control so the same chips
 * can render non-interactively on the case-study pages.
 *
 * Multiple tags combine with AND (a project must use every selected
 * technology), and selection is in-memory only — no URL state.
 */
export function ProjectFilter({ projects }: Props) {
  const [selected, setSelected] = useState<string[]>([]);

  // Every technology that appears across the projects, most common
  // first so the broad tags (React, TypeScript) lead and rarer ones
  // trail; alphabetical within a tie keeps the order stable.
  const tags = useMemo(() => {
    const counts = new Map<string, number>();
    for (const project of projects) {
      for (const tech of project.stack) {
        counts.set(tech, (counts.get(tech) ?? 0) + 1);
      }
    }
    return [...counts.keys()].sort((a, b) => {
      const byCount = (counts.get(b) ?? 0) - (counts.get(a) ?? 0);
      return byCount !== 0 ? byCount : a.localeCompare(b);
    });
  }, [projects]);

  const visible = useMemo(
    () =>
      selected.length === 0
        ? projects
        : projects.filter((project) =>
            selected.every((tech) => project.stack.includes(tech)),
          ),
    [projects, selected],
  );

  function toggle(tech: string) {
    setSelected((current) =>
      current.includes(tech)
        ? current.filter((t) => t !== tech)
        : [...current, tech],
    );
  }

  const filtering = selected.length > 0;

  return (
    <div>
      <div className="mt-8">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
          {/* Not a heading: keeps the page outline h1 → project h2s.
              Labels the button group via aria-labelledby instead. */}
          <p
            id="filter-label"
            className="font-display text-sm font-semibold uppercase tracking-wide text-muted"
          >
            Filter by technology
          </p>
          {filtering && (
            <button
              type="button"
              onClick={() => setSelected([])}
              className="text-xs text-accent-2 underline-offset-4 transition hover:underline"
            >
              {/* Cyan at rest with an aria-hidden × for the dismiss
                  affordance; the underline only appears on hover — the
                  inverse of a link (underlined at rest), so it reads as
                  an action, not navigation. */}
              <span aria-hidden="true">×</span> Clear filters
            </button>
          )}
        </div>
        <ul
          aria-labelledby="filter-label"
          className="mt-3 flex flex-wrap gap-2"
        >
          {tags.map((tech) => {
            const active = selected.includes(tech);
            return (
              <li key={tech}>
                <button
                  type="button"
                  aria-pressed={active}
                  onClick={() => toggle(tech)}
                  className={[
                    "rounded-full border px-3 py-1 text-xs transition",
                    active
                      ? "border-accent-2 bg-accent-2/10 text-accent-2 shadow-[0_0_18px_-6px_var(--glow-cyan)]"
                      : "border-border text-muted hover:border-accent-2 hover:text-accent-2",
                  ].join(" ")}
                >
                  {/* Non-color cue for selection: the checkmark backs up
                      the fill + aria-pressed so state survives a color
                      deficiency. Only present when active — the chip
                      grows on toggle rather than reserving the space. */}
                  {active && (
                    <span aria-hidden="true" className="mr-1">
                      ✓
                    </span>
                  )}
                  {tech}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Announce the result count to screen readers as filters change;
          the visible count below carries the same information sighted. */}
      <p role="status" className="mt-6 text-sm text-muted">
        {filtering
          ? `Showing ${visible.length} of ${projects.length} projects`
          : `${projects.length} projects`}
      </p>

      {visible.length > 0 ? (
        <div className="mt-4 grid gap-6">
          {visible.map((project) => (
            // h2: the cards sit directly under the page h1 here, unlike
            // the home page where they fall under a section h2.
            <ProjectCard
              key={project.slug}
              project={project}
              headingLevel="h2"
            />
          ))}
        </div>
      ) : (
        <p className="mt-4 max-w-prose text-muted">
          No projects use all of those together. Try removing a filter.
        </p>
      )}
    </div>
  );
}
