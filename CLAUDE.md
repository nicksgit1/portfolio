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
yarn dev       # dev server
yarn build     # static export to out/ — must pass before any merge
yarn lint      # ESLint
yarn typecheck # tsc --noEmit (covers test files, which next build skips)
yarn test      # Vitest (watch)
yarn test:run  # Vitest (single pass, used in CI)
yarn format    # Prettier write
```

Git hooks live in `.githooks/` (wired by `postinstall` via `core.hooksPath`):
pre-commit runs Prettier + ESLint on staged files, pre-push runs typecheck +
tests. CI runs the same checks and is the authority.

## Hard rules

1. **Accessibility is non-negotiable.** Every page/component must meet WCAG 2.1 AA:
   semantic landmarks, one `h1` per page, logical heading order, visible focus
   states, 4.5:1 text contrast, keyboard operability. New components get a
   vitest-axe test.
2. **Conventional Commits.** `type: imperative summary` (≤70 chars). Add a body
   explaining _why_ for non-obvious changes. One logical change per commit.
   Never commit failing tests or a broken build.
3. **Tests accompany features.** A new component or page ships with its test in
   the same commit (or same PR).
4. **No new dependencies without good reason.** Prefer platform features and
   what's already installed. Justify any addition in the commit body.
5. **Server Components by default.** Only add `"use client"` when the component
   actually needs interactivity or browser APIs.
6. **Every factual claim in site copy must be verifiable.** Case-study content
   is checked against the actual repos before it ships — a hiring manager will
   open the links. Never write a "what I'd do differently" claim without
   confirming the repo doesn't already do it.
7. **No escape-hatch documentation.** Don't mention bypass mechanisms
   (`--no-verify` and similar) in code comments, the README, or commit
   messages. This repo demonstrates standards; don't advertise ways around
   them.

## Conventions

- Components live in `src/components/`, one component per file, named exports.
- Tests are colocated: `Button.tsx` + `Button.test.tsx`.
- Site content (bio, project case studies) lives in `src/content/` as typed
  TypeScript data — keep copy out of components.
- Use the design tokens defined in `globals.css` (`@theme`) rather than
  hard-coded colors/sizes.
- Prose copy: sentence case headings, no exclamation marks, concrete over hype.

## Branch flow

`main` is protected — all changes land via PR from `feat/*`, `fix/*`, or
`chore/*` branches, one logical concern per branch. While a branch is
unpushed, prefer amending/rewriting its history over stacking fix-up
commits; once pushed, never rewrite.

Note: the README is tracked as `README.md` but exists on disk as `readme.md`;
on macOS's case-insensitive filesystem, branch switches can silently carry its
changes across branches. Check `git status` after every checkout.

## Working style

- Work through problems **one at a time** — propose, get a go-ahead, do the
  single task, report back. Don't batch multiple workstreams in one pass.
- Site copy makes claims about real experience and real projects. Verify
  against primary sources (the repos, the owner) rather than inferring;
  when in doubt, ask.
- Deploy target is GitHub Pages (static export, basePath `/portfolio` set by
  the deploy workflow). Pre-size images; `next/image` optimization is off.
