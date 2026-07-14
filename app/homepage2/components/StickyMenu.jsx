"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Archivo } from "next/font/google";

/**
 * ANZAR — Sticky Header + full-screen menu
 * ---------------------------------------------------------------
 * Logo:  /public/logo.png
 *
 * Render once in app/layout.jsx so it sits on every page:
 *   <Header />
 *   {children}
 * ---------------------------------------------------------------
 */


const mono = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const NAV = [
  { label: "L'univers Anzar", href: "/univers" },
  { label: "Nos Artistes", href: "/artistes" },
  { label: "La Cuisine", href: "/cuisine" },
  { label: "Notre carte", href: "/homepage2/carte" },
  { label: "Le Bar", href: "/bar" },
  { label: "Salons VIP", href: "/vip" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the overlay is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className={`${mono.variable}`}>
      {/* Kill any white flash on overscroll / return-to-top */}
      <style jsx global>{`
        html,
        body {
          background-color: #07171A;
        }
      `}</style>

      {/* ── Sticky bar ────────────────────────────────────── */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-[#07171A]/80 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div
          className={`flex items-center justify-between px-6 transition-all duration-500 md:px-12 ${
            scrolled ? "py-3.5" : "py-6"
          }`}
        >
          {/* Menu trigger */}
          <button
            onClick={() => setOpen(true)}
            className="group flex items-center gap-3 font-[family-name:var(--font-mono)] text-[0.64rem] font-medium uppercase tracking-[0.32em] text-[#EFE7D6]/80 transition-colors hover:text-[#B87D29]"
            aria-label="Ouvrir le menu"
          >
            <span className="flex flex-col gap-[5px]">
              <span className="h-px w-6 bg-current transition-all duration-300 group-hover:w-7" />
              <span className="h-px w-4 bg-current transition-all duration-300 group-hover:w-7" />
            </span>
            <span className="hidden sm:inline">Menu</span>
          </button>

          {/* Logo */}
          <Link href="/" aria-label="Anzar — accueil" className="relative block">
            <Image
              src="/logo.png"
              alt="Anzar"
              width={150}
              height={48}
              priority
              className={`w-auto object-contain transition-all duration-500 ${
                scrolled ? "h-8 md:h-9" : "h-11 md:h-14"
              }`}
            />
          </Link>

          {/* Reserve — sits on every page via this header */}
          <Link
            href="/reservation"
            className="group flex items-center gap-2 font-[family-name:var(--font-mono)] text-[0.64rem] font-medium uppercase tracking-[0.32em] text-[#EFE7D6]/80 transition-colors hover:text-[#B87D29]"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#B87D29]/70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#BC8B3A]" />
            </span>
            <span className="hidden sm:inline">Réserver</span>
          </Link>
        </div>
      </header>

      {/* ── Full-screen editorial overlay ─────────────────── */}
      <div
        className={`fixed inset-0 z-[60] transition-all duration-500 ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-[#051317]/97"
          onClick={() => setOpen(false)}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-overlay"
          style={{ backgroundImage: GRAIN, backgroundSize: "140px 140px" }}
        />

        {/* Top bar inside overlay */}
        <div className="relative flex items-center justify-between px-6 py-6 md:px-12">
          <span className="font-[family-name:var(--font-mono)] text-[0.62rem] uppercase tracking-[0.34em] text-[#BC8B3A]">
            Anzar — Tanger
          </span>
          <button
            onClick={() => setOpen(false)}
            className="group flex items-center gap-3 font-[family-name:var(--font-mono)] text-[0.64rem] uppercase tracking-[0.32em] text-[#EFE7D6]/80 transition-colors hover:text-[#B87D29]"
            aria-label="Fermer le menu"
          >
            Fermer
            <span className="relative block h-4 w-4">
              <span className="absolute left-1/2 top-1/2 h-px w-5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-current transition-transform group-hover:rotate-[135deg]" />
              <span className="absolute left-1/2 top-1/2 h-px w-5 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-current transition-transform group-hover:rotate-45" />
            </span>
          </button>
        </div>

        {/* Body: numbered nav (left) + metadata (right) */}
        <div className="relative grid h-[calc(100%-72px)] grid-cols-1 content-center gap-8 px-6 py-6 md:h-[calc(100%-160px)] md:grid-cols-[1.4fr_1fr] md:items-end md:gap-12 md:px-12 md:py-0">
          {/* Nav */}
          <nav className="flex flex-col">
            {NAV.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="group flex items-baseline gap-4 border-b border-[#EFE7D6]/8 py-3.5 transition-colors hover:border-[#BC8B3A]/40 md:gap-5 md:py-4"
                style={{
                  transitionDelay: open ? `${i * 55 + 120}ms` : "0ms",
                  transform: open ? "translateY(0)" : "translateY(20px)",
                  opacity: open ? 1 : 0,
                  transitionProperty: "opacity, transform, border-color",
                  transitionDuration: "700ms",
                }}
              >
                <span className="font-[family-name:var(--font-display)] text-[clamp(1.6rem,5vw,3.6rem)] font-light leading-none tracking-[-0.02em] text-[#EFE7D6] transition-colors group-hover:text-[#B87D29] group-hover:italic">
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>

          {/* Metadata column */}
          <div
            className="flex flex-col gap-8 pb-2"
            style={{
              transition: "opacity 800ms ease 400ms, transform 800ms ease 400ms",
              opacity: open ? 1 : 0,
              transform: open ? "translateY(0)" : "translateY(20px)",
            }}
          >
            {/* Adresse — hidden on mobile to keep the menu uncluttered */}
            <div className="hidden md:block">
              <p className="mb-2 font-[family-name:var(--font-mono)] text-[0.58rem] uppercase tracking-[0.34em] text-[#BC8B3A]">
                Adresse
              </p>
              <p className="font-[family-name:var(--font-display)] text-lg font-light leading-snug text-[#EFE7D6]/85">
                Marina Bay, Ave Mohammed VI
                <br />
                Tanger, Maroc
              </p>
            </div>

            <div>
              <p className="mb-2 font-[family-name:var(--font-mono)] text-[0.58rem] uppercase tracking-[0.34em] text-[#BC8B3A]">
                Ouverture
              </p>
              <p className="font-[family-name:var(--font-mono)] text-[0.72rem] uppercase leading-relaxed tracking-[0.2em] text-[#EFE7D6]/70">
                Mardi — Dimanche · 19:30 — 04:00
              </p>
            </div>

            <div>
              <p className="mb-2 font-[family-name:var(--font-mono)] text-[0.58rem] uppercase tracking-[0.34em] text-[#BC8B3A]">
                Réservations
              </p>
              <a
                href="tel:+212666172897"
                className="block font-[family-name:var(--font-display)] text-lg font-light text-[#EFE7D6]/85 transition-colors hover:text-[#B87D29]"
              >
                +212 6 66 17 28 97
              </a>
              <a
                href="tel:+212539336663"
                className="mt-1 block font-[family-name:var(--font-display)] text-lg font-light text-[#EFE7D6]/85 transition-colors hover:text-[#B87D29]"
              >
                +212 5 39 33 66 63
              </a>
            </div>

            <div className="hidden gap-6 pt-1 font-[family-name:var(--font-mono)] text-[0.6rem] uppercase tracking-[0.24em] text-[#EFE7D6]/55 md:flex">
              <a href="https://instagram.com" className="transition-colors hover:text-[#B87D29]">
                Instagram
              </a>
              <a href="mailto:reservations@anzar.com" className="transition-colors hover:text-[#B87D29]">
                Email
              </a>
            </div>

            <Link
              href="/reservation"
              onClick={() => setOpen(false)}
              className="group mt-2 inline-flex w-fit items-center gap-3 border border-[#BC8B3A]/45 px-7 py-3.5 font-[family-name:var(--font-mono)] text-[0.66rem] font-medium uppercase tracking-[0.3em] text-[#EFE7D6] transition-colors hover:border-[#B87D29] hover:bg-[#BC8B3A]/[0.06]"
            >
              Réserver une table
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}