/**
 * Site-wide content. Keeping copy here (not in components) means
 * editing words never risks breaking markup.
 */
export const site = {
  name: "Nicholas Summers",
  role: "Engineering Leader",
  tagline:
    "Director of Engineering and full-stack developer. I lead teams building civic tech used by every US state — and I still love shipping code end to end.",
  email: "ntsummers1@proton.me",
  github: "https://github.com/ntsummers1",
  linkedin: "https://www.linkedin.com/in/nicholas-summers-130aa2411",
  /** Canonical production URL (GitHub Pages project site) — no trailing slash. */
  url: "https://nicksgit1.github.io/portfolio",
} as const;
