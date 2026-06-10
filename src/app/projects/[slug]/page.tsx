import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/content/projects";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return { title: project.title, description: project.summary };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const sections = [
    { heading: "Problem", body: project.caseStudy.problem },
    { heading: "Approach", body: project.caseStudy.approach },
    { heading: "Result", body: project.caseStudy.result },
  ];

  return (
    <article>
      <h1 className="text-3xl font-bold tracking-tight">{project.title}</h1>
      <p className="mt-4 max-w-prose text-lg text-muted">{project.summary}</p>

      <ul aria-label="Tech stack" className="mt-6 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <li
            key={tech}
            className="rounded-full border border-border px-3 py-0.5 text-xs text-muted"
          >
            {tech}
          </li>
        ))}
      </ul>

      {(project.links.live || project.links.repo) && (
        <p className="mt-4 flex gap-6">
          {project.links.live && (
            <a href={project.links.live} className="text-accent hover:underline">
              Live site
            </a>
          )}
          {project.links.repo && (
            <a href={project.links.repo} className="text-accent hover:underline">
              Source code
            </a>
          )}
        </p>
      )}

      <div className="mt-10 space-y-8">
        {sections.map(({ heading, body }) => (
          <section key={heading} aria-labelledby={`${heading.toLowerCase()}-h`}>
            <h2
              id={`${heading.toLowerCase()}-h`}
              className="text-xl font-semibold"
            >
              {heading}
            </h2>
            <p className="mt-3 max-w-prose leading-relaxed">{body}</p>
          </section>
        ))}
      </div>
    </article>
  );
}
