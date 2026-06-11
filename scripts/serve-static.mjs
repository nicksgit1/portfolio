/**
 * Minimal static file server that mimics GitHub Pages semantics for the
 * exported site in `out/`:
 *
 *   - `/route/` serves `out/route/index.html` (trailingSlash export)
 *   - unknown paths serve `out/404.html` with a 404 status
 *
 * Used by Playwright's webServer (see playwright.config.ts) so e2e tests
 * run against the same artifact that deploys — not the dev server.
 * Zero dependencies on purpose.
 */
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..", "out");
const PORT = Number(process.env.PORT ?? 4173);

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
  ".woff2": "font/woff2",
};

/** Map a URL pathname to a file inside `out/`, or null if it escapes ROOT. */
function resolvePath(pathname) {
  const decoded = decodeURIComponent(pathname);
  const withIndex = decoded.endsWith("/") ? `${decoded}index.html` : decoded;
  const resolved = path.resolve(ROOT, `.${path.posix.normalize(withIndex)}`);
  return resolved.startsWith(ROOT) ? resolved : null;
}

const server = createServer(async (req, res) => {
  const { pathname } = new URL(req.url ?? "/", `http://${req.headers.host}`);
  const filePath = resolvePath(pathname);

  const send = (status, body, ext) => {
    res.writeHead(status, {
      "content-type": MIME[ext] ?? "application/octet-stream",
    });
    res.end(body);
  };

  try {
    if (!filePath) throw new Error("forbidden");
    send(200, await readFile(filePath), path.extname(filePath));
  } catch {
    try {
      // GitHub Pages serves 404.html for any unknown path.
      send(404, await readFile(path.join(ROOT, "404.html")), ".html");
    } catch {
      send(404, "Not found — run `yarn build` first.", ".txt");
    }
  }
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`Serving ${ROOT} at http://127.0.0.1:${PORT}`);
});
