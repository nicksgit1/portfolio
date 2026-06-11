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

  const linkEntries: [label: string, href: string | undefined][] = [
    ["Live site", project.links.live],
    ["Source code", project.links.repo],
    ["API source", project.links.api],
    ["App Store", project.links.ios],
    ["Google Play", project.links.android],
  ];
  const visibleLinks = linkEntries.filter((entry): entry is [string, string] =>
    Boolean(entry[1]),
  );

  const sections = [
    { heading: "Problem", body: project.caseStudy.problem },
    { heading: "Approach", body: project.caseStudy.approach },
    { heading: "Result", body: project.caseStudy.result },
  ];

  return (
    <article>
      <h1 className="font-display text-3xl font-bold">{project.title}</h1>
      <p className="mt-4 max-w-prose text-lg text-muted">{project.summary}</p>

      <ul aria-label="Tech stack" className="mt-6 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <li
            key={tech}
            className="rounded-full border border-border bg-glow-violet/10 px-3 py-0.5 text-xs text-muted"
          >
            {tech}
          </li>
        ))}
      </ul>

      {visibleLinks.length > 0 && (
        <p className="mt-4 flex flex-wrap gap-6">
          {visibleLinks.map(([label, href]) => (
            <a key={label} href={href} className="text-accent hover:underline">
              {label}
            </a>
          ))}
        </p>
      )}

      <div className="mt-10 space-y-8">
        {sections.map(({ heading, body }) => (
          <section key={heading} aria-labelledby={`${heading.toLowerCase()}-h`}>
            <h2
              id={`${heading.toLowerCase()}-h`}
              className="font-display text-xl font-semibold"
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
