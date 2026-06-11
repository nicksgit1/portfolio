import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Static export — the site deploys to GitHub Pages, which serves files,
  // not a Node server. `yarn build` writes the site to `out/`.
  output: "export",

  // GitHub Pages serves project sites from a subpath
  // (nicksgit1.github.io/portfolio). The deploy workflow sets
  // NEXT_PUBLIC_BASE_PATH=/portfolio; local dev serves from `/`.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",

  // Emit each route as route/index.html instead of route.html so that
  // trailing-slash URLs (e.g. /projects/) resolve on GitHub Pages, which
  // serves static files with no rewrite rules.
  trailingSlash: true,

  // next/image optimization needs a server; not used yet, but this keeps
  // a future <Image> from silently breaking the static export.
  images: { unoptimized: true },
};

export default nextConfig;
