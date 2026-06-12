import Image from "next/image";
import { site } from "@/content/site";
import avatar from "@/assets/avatar2.jpg";

/**
 * Home-page hero: an open centered layout (see hero.css) — the
 * portrait blended into the night sky, the name as a neon-script h1,
 * and the tagline running the content width.
 */
export function Hero() {
  return (
    <section aria-labelledby="intro-heading">
      <div className="hero-card">
        <div className="hero-avatar">
          <Image
            src={avatar}
            alt={`Cartoon portrait of ${site.name}`}
            width={400}
            height={400}
            priority
          />
        </div>
        <h1
          id="intro-heading"
          className="neon-script text-5xl leading-tight sm:text-6xl"
        >
          {site.name}
        </h1>
        <p className="text-base text-muted">{site.tagline}</p>
      </div>
    </section>
  );
}
