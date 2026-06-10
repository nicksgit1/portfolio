import type { Metadata } from "next";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.name}, ${site.role.toLowerCase()}.`,
};

export default function AboutPage() {
  return (
    <article>
      <h1 className="text-3xl font-bold tracking-tight">About</h1>
      <div className="mt-6 max-w-prose space-y-4 leading-relaxed">
        <p>
          {/* PLACEHOLDER — replaced once Nick and Claude draft the real bio. */}
          I&apos;m {site.name}, a {site.role.toLowerCase()} who cares about the
          full journey of a product: the data model, the API, the interface,
          and the person on the other side of the screen.
        </p>
        <p>
          This paragraph will hold the story: what you&apos;ve built, what
          you&apos;re drawn to, and what you want to work on next.
        </p>
      </div>
      <h2 className="mt-10 text-xl font-semibold">Get in touch</h2>
      <p className="mt-3 max-w-prose">
        The fastest way to reach me is email:{" "}
        <a href={`mailto:${site.email}`} className="text-accent underline">
          {site.email}
        </a>
      </p>
    </article>
  );
}
