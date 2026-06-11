import type { Metadata } from "next";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.name}, engineering leader and full-stack developer.`,
};

export default function AboutPage() {
  return (
    <article>
      <h1 className="font-display text-3xl font-bold">About</h1>
      <div className="mt-6 max-w-prose space-y-4 leading-relaxed">
        <p>
          I&apos;m Nicholas Summers — an engineering leader and full-stack
          developer. I graduated from Michigan State University in 2017 with a
          dual major in Computer Science and Media &amp; Information, and since
          2022 I&apos;ve worked on the CMS MDCT suite at Coforma, where I grew
          from software engineer to senior engineer to Director of Engineering.
          Today I lead six engineers and help maintain three production
          applications that state agencies across the country rely on.
        </p>
        <p>
          I believe the best engineering leaders stay close to the work. I still
          review code across our suite, still get excited about the JavaScript
          ecosystem (TypeScript, React, Next.js, Vite), and still hold the same
          goal I wrote down years ago: clean, fast, human-benefiting code. Civic
          tech made that goal concrete — software that makes government work
          better is the most direct way I&apos;ve found to make the world a
          little better, one line at a time.
        </p>
        <p>
          I&apos;m looking for engineering management and director roles, and
          I&apos;m open to senior hands-on positions on teams doing work that
          matters. Also: I am powered almost entirely by burritos.
        </p>
      </div>
      <h2 className="mt-10 font-display text-xl font-semibold">Get in touch</h2>
      <p className="mt-3 max-w-prose">
        The fastest way to reach me is email:{" "}
        <a href={`mailto:${site.email}`} className="text-accent underline">
          {site.email}
        </a>
      </p>
    </article>
  );
}
