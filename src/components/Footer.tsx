import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="relative">
      {/* Decorative retrowave horizon behind the content — hidden from
          assistive tech. Its glowing top line is the footer's border. */}
      <div aria-hidden="true" className="synth-grid" />
      <div className="relative mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-4 px-4 pt-10 pb-28 text-sm text-muted">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <ul className="flex gap-6">
          <li>
            <a href={site.github} className="neon-link">
              GitHub
            </a>
          </li>
          <li>
            <a href={site.linkedin} className="neon-link">
              LinkedIn
            </a>
          </li>
          <li>
            <a href={`mailto:${site.email}`} className="neon-link">
              Email
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
