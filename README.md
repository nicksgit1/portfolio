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
| `yarn build`        | Static export to `out/`      |
| `yarn lint`         | ESLint                       |
| `yarn test`         | Vitest (watch mode)          |
| `yarn test:run`     | Vitest (single pass, CI)     |
| `yarn format`       | Prettier write               |
| `yarn format:check` | Prettier check (CI)          |

## Project structure

```
src/
  app/        # Next.js App Router pages and layouts
```

## Deployment

Pushes to `main` deploy automatically to GitHub Pages via
`.github/workflows/deploy.yml`. The site is a full static export (`output:
"export"`), built with `NEXT_PUBLIC_BASE_PATH=/portfolio` to match the
project-site subpath. To preview the production build locally:

```bash
yarn build
npx serve out
```

## Conventions

- Commits follow [Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `docs:`, `chore:`, `test:`, `refactor:`).
- All UI must be keyboard-navigable and pass automated axe accessibility checks.
