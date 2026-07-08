import type { Metadata } from "next";
import { Geist, Geist_Mono, Marcellus } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * Brand title font.
 * "latin-ext" is the subset that carries é è ê à â î ô ù ç — without it,
 * French accents fall back to another font and look wrong mid-word.
 * Marcellus ships a single weight (400).
 */
const marcellus = Marcellus({
  weight: "400",
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Anzar — Oriental Fine Dining & Atmosphere",
  description: "Anzar · Marina Bay, Tanger. Dîner, musique et scène.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} ${marcellus.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}