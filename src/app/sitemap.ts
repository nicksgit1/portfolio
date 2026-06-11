import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

// With output: "export", metadata files compile to route handlers,
// which must opt into static generation explicitly or `next build`
// fails collecting /sitemap.xml.
export const dynamic = "force-static";

/**
 * Built statically into out/sitemap.xml. Routes are enumerated from the
 * same sources the pages render from, so a new project case study lands
 * in the sitemap with no extra step.
 *
 * Deliberately no robots.ts: robots.txt is only honored at the domain
 * root, and a GitHub Pages *project* site can't serve that path —
 * submit this sitemap via Search Console instead.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/projects",
    "/about",
    ...projects.map((p) => `/projects/${p.slug}`),
  ];
  // Trailing slashes match the exported URLs (trailingSlash in next.config).
  return routes.map((route) => ({ url: `${site.url}${route}/` }));
}
