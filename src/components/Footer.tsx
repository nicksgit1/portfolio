import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-4 px-4 py-8 text-sm text-muted">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <ul className="flex gap-6">
          <li>
            <a href={site.github} className="hover:text-foreground">
              GitHub
            </a>
          </li>
          <li>
            <a href={site.linkedin} className="hover:text-foreground">
              LinkedIn
            </a>
          </li>
          <li>
            <a href={`mailto:${site.email}`} className="hover:text-foreground">
              Email
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
