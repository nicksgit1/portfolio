import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { site } from "@/content/site";
import "./globals.css";

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
    <html lang="en">
      <body className="flex min-h-dvh flex-col antialiased">
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
