import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nick — Full-Stack Engineer",
  description: "Portfolio of Nick, a full-stack engineer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
