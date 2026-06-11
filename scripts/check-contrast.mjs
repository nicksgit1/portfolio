/**
 * WCAG contrast verification for the design tokens and the decorative
 * background scene. Backs the "verified programmatically" claims in
 * src/app/globals.css — runs in CI (`yarn check:contrast`).
 *
 * Everything is parsed from globals.css itself (token hexes, bloom
 * peak percentages, the near-skyline mix), so the checks cannot drift
 * from the stylesheet they verify.
 *
 * Checks (all against WCAG 2.1 AA, 4.5:1 for normal text):
 *   1. Every text token (foreground, muted, accent, accent-2) against
 *      both background and surface.
 *   2. foreground and muted over each bloom's peak — the worst case a
 *      reader can hit, since blooms sit behind body text.
 *   3. muted over the near-skyline silhouette — footer text overlaps
 *      it on narrow screens.
 */
import { readFileSync } from "node:fs";

const css = readFileSync(
  new URL("../src/app/globals.css", import.meta.url),
  "utf8",
);

// --- parse tokens ---------------------------------------------------

const rootBlock = css.match(/:root\s*\{([\s\S]*?)\n\}/)?.[1];
if (!rootBlock) fail("could not find :root block in globals.css");

function token(name) {
  const m = rootBlock.match(new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{6})\\b`));
  if (!m) fail(`could not parse --${name} from :root`);
  return m[1];
}

const bg = token("background");
const surface = token("surface");
const text = {
  foreground: token("foreground"),
  muted: token("muted"),
  accent: token("accent"),
  "accent-2": token("accent-2"),
};

// --- parse scene mixes ----------------------------------------------

/** color-mix(in srgb, var(--X) N%, …) entries across every rule block
    matching the (global) selector regex. The same selector list can
    open several blocks (positioning vs. paint), so all are scanned. */
function mixesIn(selectorRe) {
  const blocks = [...css.matchAll(selectorRe)];
  if (blocks.length === 0) fail(`could not find rule matching ${selectorRe}`);
  const mixes = blocks.flatMap(([, block]) =>
    [
      ...block.matchAll(
        /color-mix\(\s*in srgb,\s*var\(--([\w-]+)\)\s*([\d.]+)%/g,
      ),
    ].map(([, name, pct]) => ({ name, fraction: Number(pct) / 100 })),
  );
  // An empty result means the CSS was reformatted out from under the
  // parser — fail loudly rather than passing vacuously.
  if (mixes.length === 0) fail(`no color-mix() found for ${selectorRe}`);
  return mixes;
}

const bloomPeaks = mixesIn(/\.mystic-bg\s*\{([\s\S]*?)\n\}/g);
const nearSkyline = mixesIn(
  /\.city-near::before,\s*\.city-near::after\s*\{([\s\S]*?)\n\}/g,
);

// --- color math (WCAG 2.1 definitions) -------------------------------

const channel = (hex, i) => parseInt(hex.slice(1 + 2 * i, 3 + 2 * i), 16);
const rgb = (hex) => [0, 1, 2].map((i) => channel(hex, i));

function luminance([r, g, b]) {
  const f = (c) => {
    const s = c / 255;
    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

function contrast(hexA, compositeB) {
  const [l1, l2] = [luminance(rgb(hexA)), luminance(compositeB)].sort(
    (a, b) => b - a,
  );
  return (l1 + 0.05) / (l2 + 0.05);
}

/** Composite `fraction` of token color over the background. */
function composite(name, fraction) {
  const top = rgb(token(name));
  const base = rgb(bg);
  return top.map((c, i) => fraction * c + (1 - fraction) * base[i]);
}

// --- checks -----------------------------------------------------------

const MIN = 4.5;
let failures = 0;

function check(label, ratio) {
  const ok = ratio >= MIN;
  if (!ok) failures += 1;
  console.log(
    `${ok ? "PASS" : "FAIL"}  ${label.padEnd(46)} ${ratio.toFixed(2)}:1`,
  );
}

for (const [name, hex] of Object.entries(text)) {
  check(`${name} on background`, contrast(hex, rgb(bg)));
  check(`${name} on surface`, contrast(hex, rgb(surface)));
}

for (const { name, fraction } of bloomPeaks) {
  const peak = composite(name, fraction);
  check(
    `foreground over bloom peak (${name})`,
    contrast(text.foreground, peak),
  );
  check(`muted over bloom peak (${name})`, contrast(text.muted, peak));
}

for (const { name, fraction } of nearSkyline) {
  check(
    `muted over near skyline (${name})`,
    contrast(text.muted, composite(name, fraction)),
  );
}

if (failures > 0) fail(`${failures} contrast check(s) below ${MIN}:1`);
console.log("\nAll contrast checks pass (WCAG 2.1 AA, 4.5:1).");

function fail(message) {
  console.error(`\ncheck-contrast: ${message}`);
  process.exit(1);
}
