import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Brand title font. Path is relative to THIS file.
//  - app/layout.tsx        -> "../public/fonts/tamil.ttf"
//  - src/app/layout.tsx    -> "../../public/fonts/tamil.ttf"
const tamil = localFont({
  src: "../public/fonts/tamil.ttf",
  variable: "--font-display",
  display: "swap",
  fallback: ["Times New Roman", "serif"],
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
      className={`${geistSans.variable} ${geistMono.variable} ${tamil.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}