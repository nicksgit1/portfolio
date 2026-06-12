import type { Metadata } from "next";
import { Mr_Dafoe, Orbitron } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { site } from "@/content/site";
import "./globals.css";

/* Display font for headings only; body text stays on the system stack
   for readability. Self-hosted by next/font at build time — no runtime
   request to Google. Exposed as a CSS variable consumed in globals.css. */
const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

/* Script font for the hero wordmark only (see .neon-script in
   globals.css) — a hand-lettered neon-sign accent in the retrowave
   tradition. Single style, so the weight is fixed. */
const mrDafoe = Mr_Dafoe({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-mr-dafoe",
  display: "swap",
});

export const metadata: Metadata = {
  // Absolute-URL base for social-preview tags; per-page paths resolve
  // against it. The basePath is part of the canonical URL on Pages.
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.tagline,
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description: site.tagline,
    url: "./",
    siteName: site.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: `${site.name} — ${site.role}`,
    description: site.tagline,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${orbitron.variable} ${mrDafoe.variable}`}>
      <body className="flex min-h-dvh flex-col antialiased">
        {/* Site-wide decorative background: mystic-blur color blooms,
            star field, and scanlines. Fixed behind all content, hidden
            from assistive tech. (The city skyline lives in the Footer,
            seated on its horizon line.) */}
        <div aria-hidden="true" className="mystic-bg" />
        {/* Skip link: first focusable element on the page, lets keyboard
            users bypass the nav (WCAG 2.4.1). Visually hidden until focused. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:text-background"
        >
          Skip to main content
        </a>
        <Header />
        {/* Generous bottom padding keeps the last content clear of the
            footer scene — the setting sun and skyline rising above the
            horizon, whose height is set by .city-scape in globals.css. */}
        <main
          id="main"
          className="mx-auto w-full max-w-3xl flex-1 px-4 pt-12 pb-44 sm:pb-96"
        >
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
