import Link from "next/link";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

export default function Home() {
  const featured = projects.filter((p) => p.featured);

  return (
    <div className="space-y-16">
      <section aria-labelledby="intro-heading">
        <h1 id="intro-heading" className="text-4xl font-bold tracking-tight">
          {site.name}, {site.role.toLowerCase()}.
        </h1>
        <p className="mt-4 max-w-prose text-lg text-muted">{site.tagline}</p>
      </section>

      <section aria-labelledby="featured-heading">
        <div className="flex items-baseline justify-between">
          <h2 id="featured-heading" className="text-2xl font-semibold">
            Selected work
          </h2>
          <Link
            href="/projects"
            className="text-sm text-accent hover:underline"
          >
            All projects
          </Link>
        </div>
        <div className="mt-6 grid gap-6">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}
