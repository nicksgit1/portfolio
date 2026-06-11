/**
 * Base path for navigations, mirroring next.config.ts. Empty for the
 * root build; "/portfolio" when CI exercises the GitHub Pages subpath
 * build (see the e2e matrix in .github/workflows/ci.yml). URL
 * assertions in the specs are end-anchored, so they hold either way.
 */
export const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
