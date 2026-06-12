import Link from "next/link";
import { Hero } from "@/components/Hero";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/content/projects";

export default function Home() {
  const featured = projects.filter((p) => p.featured);

  return (
    <div className="space-y-16">
      <Hero />

      <section aria-labelledby="featured-heading">
        <div className="flex items-baseline justify-between">
          <h2
            id="featured-heading"
            className="font-display text-2xl font-semibold"
          >
            Selected work
          </h2>
          <Link href="/projects" className="neon-link text-sm">
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
