import type { IconType } from "react-icons";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa6";
import { FooterScene } from "@/components/FooterScene";
import { site } from "@/content/site";

const contactLinks: ReadonlyArray<{
  href: string;
  label: string;
  Icon: IconType;
}> = [
  { href: site.github, label: "GitHub", Icon: FaGithub },
  { href: site.linkedin, label: "LinkedIn", Icon: FaLinkedin },
  { href: `mailto:${site.email}`, label: "Email", Icon: FaEnvelope },
];

export function Footer() {
  return (
    <footer className="relative">
      <FooterScene />
      <div className="relative mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-4 px-4 pt-10 pb-28 text-sm text-muted">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <ul className="flex gap-6">
          {contactLinks.map(({ href, label, Icon }) => (
            <li key={label}>
              {/* Neon icon + label: icons are decorative (aria-hidden,
                  the label carries the accessible name) and glow pink
                  at rest, cyan on hover/focus — the underline lives on
                  the label span so the icon isn't underlined, keeping
                  the pink + underline at-rest link grammar. Vertical
                  padding keeps hit targets comfortable. */}
              <a
                href={href}
                className="group inline-flex items-center gap-2 py-2 text-accent transition hover:text-accent-2 focus-visible:text-accent-2"
              >
                <Icon
                  aria-hidden="true"
                  className="h-7 w-7 drop-shadow-[0_0_6px_var(--glow-pink)] transition group-hover:drop-shadow-[0_0_8px_var(--glow-cyan)] group-focus-visible:drop-shadow-[0_0_8px_var(--glow-cyan)]"
                />
                <span className="underline underline-offset-4 group-hover:no-underline group-focus-visible:no-underline">
                  {label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
