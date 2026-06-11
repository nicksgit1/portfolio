# Portfolio

Personal portfolio site for Nick — full-stack engineer.

Built with [Next.js](https://nextjs.org) (App Router), TypeScript, and Tailwind CSS. Designed to meet WCAG 2.1 AA accessibility standards.

## Getting started

```bash
corepack enable   # once per machine; provisions the pinned Yarn version
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command             | Description                  |
| ------------------- | ---------------------------- |
| `yarn dev`          | Start the development server |
| `yarn build`        | Production build             |
| `yarn start`        | Serve the production build   |
| `yarn lint`         | ESLint                       |
| `yarn typecheck`    | TypeScript, no emit          |
| `yarn test`         | Vitest (watch mode)          |
| `yarn test:run`     | Vitest (single pass, CI)     |
| `yarn format`       | Prettier write               |
| `yarn format:check` | Prettier check (CI)          |

## Project structure

```
src/
  app/        # Next.js App Router pages and layouts
```

## Git hooks

`yarn install` wires up the hooks in `.githooks/` (via `core.hooksPath`, no
dependencies). Pre-commit runs Prettier and ESLint on staged files; pre-push
runs the typecheck and test suite. CI runs the same checks and remains the
source of truth.

## Conventions

- Commits follow [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `docs:`, `chore:`, `test:`, `refactor:`).
- All UI must be keyboard-navigable and pass automated axe accessibility checks.
