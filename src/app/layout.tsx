import type { Metadata } from "next";
import { Orbitron } from "next/font/google";
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

export const metadata: Metadata = {
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.tagline,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={orbitron.variable}>
      <body className="flex min-h-dvh flex-col antialiased">
        {/* Site-wide decorative background: mystic-blur color blooms and
            a two-layer city skyline. Fixed behind all content, hidden
            from assistive tech. */}
        <div aria-hidden="true" className="mystic-bg" />
        <div aria-hidden="true" className="city-scape">
          <div className="city-far" />
          <div className="city-near" />
        </div>
        {/* Skip link: first focusable element on the page, lets keyboard
            users bypass the nav (WCAG 2.4.1). Visually hidden until focused. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:text-background"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main" className="mx-auto w-full max-w-3xl flex-1 px-4 py-12">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
