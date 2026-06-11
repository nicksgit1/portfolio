import Link from "next/link";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

export default function Home() {
  const featured = projects.filter((p) => p.featured);

  return (
    <div className="space-y-16">
      <section aria-labelledby="intro-heading" className="relative">
        {/* Decorative glow behind the hero — purely visual, hidden from AT. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-28 left-1/2 -z-10 h-72 w-xl max-w-full -translate-x-1/2 rounded-full bg-glow-violet/30 blur-3xl"
        />
        <p className="font-display text-sm tracking-[0.35em] text-accent-2 uppercase">
          {site.role}
        </p>
        <h1
          id="intro-heading"
          className="mt-3 font-display text-4xl font-bold tracking-wide uppercase sm:text-5xl"
        >
          {site.name}
        </h1>
        <p className="mt-5 max-w-prose text-lg text-muted">{site.tagline}</p>
      </section>

      <section aria-labelledby="featured-heading">
        <div className="flex items-baseline justify-between">
          <h2
            id="featured-heading"
            className="font-display text-2xl font-semibold"
          >
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
