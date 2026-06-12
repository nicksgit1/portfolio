"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
] as const;

export function Header() {
  const pathname = usePathname();

  return (
    <header>
      <div className="mx-auto flex max-w-3xl items-center justify-center px-4 py-3">
        <nav aria-label="Main">
          <ul className="flex gap-10">
            {navItems.map(({ href, label }) => {
              const isCurrent =
                href === "/" ? pathname === "/" : pathname.startsWith(href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={isCurrent ? "page" : undefined}
                    className={
                      // Current page: glowing cyan underline. Cyan is the
                      // site-wide "hot" color (hover/focus/current); pink
                      // marks at-rest links in content.
                      isCurrent
                        ? "relative font-display text-sm font-bold tracking-widest uppercase text-foreground after:absolute after:inset-x-0 after:-bottom-1.5 after:h-0.5 after:rounded-full after:bg-accent-2 after:shadow-[0_0_8px_var(--glow-cyan)]"
                        : "font-display text-sm font-bold tracking-widest uppercase text-muted transition-colors hover:text-accent-2"
                    }
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
