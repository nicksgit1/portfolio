# CLAUDE.md

Guidance for AI assistants (Claude Code, Cowork, etc.) working in this repository.

## What this is

Nick's personal portfolio site. It doubles as a code sample for full-stack
engineering roles, so **code quality, accessibility, and git hygiene matter as
much as the visible result.**

## Stack

- Next.js 15 (App Router) + React 19, TypeScript (strict)
- Tailwind CSS v4 (CSS-first config in `src/app/globals.css`, no tailwind.config)
- Vitest + React Testing Library + vitest-axe for tests
- ESLint (flat config) with `jsx-a11y`, Prettier

## Commands

This repo uses **Yarn Berry** (version pinned via `packageManager` in
package.json, `nodeLinker: node-modules`). Use `yarn`, never `npm`.

```bash
yarn dev      # dev server
yarn build    # production build — must pass before any merge
yarn lint     # ESLint
yarn test     # Vitest (watch)
yarn test:run # Vitest (single pass, used in CI)
yarn format   # Prettier write
```

## Hard rules

1. **Accessibility is non-negotiable.** Every page/component must meet WCAG 2.1 AA:
   semantic landmarks, one `h1` per page, logical heading order, visible focus
   states, 4.5:1 text contrast, keyboard operability. New components get a
   vitest-axe test.
2. **Conventional Commits.** `type: imperative summary` (≤70 chars). Add a body
   explaining *why* for non-obvious changes. One logical change per commit.
   Never commit failing tests or a broken build.
3. **Tests accompany features.** A new component or page ships with its test in
   the same commit (or same PR).
4. **No new dependencies without good reason.** Prefer platform features and
   what's already installed. Justify any addition in the commit body.
5. **Server Components by default.** Only add `"use client"` when the component
   actually needs interactivity or browser APIs.

## Conventions

- Components live in `src/components/`, one component per file, named exports.
- Tests are colocated: `Button.tsx` + `Button.test.tsx`.
- Site content (bio, project case studies) lives in `src/content/` as typed
  TypeScript data — keep copy out of components.
- Use the design tokens defined in `globals.css` (`@theme`) rather than
  hard-coded colors/sizes.
- Prose copy: sentence case headings, no exclamation marks, concrete over hype.

## Branch flow

Small atomic changes commit straight to `main`. Multi-commit work happens on
`feat/*` or `fix/*` branches, merged via PR.
