/*
 * Static image imports (e.g. src/assets/avatar2.jpg) rely on Next's
 * image module declarations. Those normally arrive via the generated
 * next-env.d.ts, but that file is gitignored — so a bare
 * `tsc --noEmit` on a fresh checkout (CI's typecheck job) has no
 * declaration for "*.jpg" and fails with TS2307. Referencing the
 * types here, in a committed file, makes typecheck independent of
 * whether `next dev`/`next build` has run first. Harmless duplicate
 * when next-env.d.ts is present.
 */
/// <reference types="next/image-types/global" />
