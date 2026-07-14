"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Archivo, Poppins } from "next/font/google";

/**
 * ANZAR — Hero for the "La Carte" page.
 * ---------------------------------------------------------------
 * Images:  /public/carte.jpg   (full-bleed background)
 *          /public/logo.png
 * The CTA smooth-scrolls to <section id="carte"> further down the page.
 * ---------------------------------------------------------------
 */

const mono = Archivo({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});
const body = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
  display: "swap",
});

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const ease = [0.16, 1, 0.3, 1];

export default function CarteHero() {
  const scrollToMenu = () => {
    document.getElementById("carte")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      className={`${mono.variable} ${body.variable} relative flex h-[100svh] min-h-[640px] w-full items-center justify-center overflow-hidden bg-[#1E0709] text-[#F5EAD6]`}
    >
      {/* Background */}
      <motion.div
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease }}
        className="absolute inset-0"
      >
        <Image src="/carte.jpg" alt="La carte d'Anzar" fill priority sizes="100vw" className="object-cover object-center" />
      </motion.div>

      {/* Wine grade */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(30,7,9,0.7)_0%,rgba(30,7,9,0.4)_40%,rgba(30,7,9,0.85)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_38%,rgba(18,5,6,0.8)_100%)]" />
      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.09] mix-blend-overlay"
        style={{ backgroundImage: GRAIN, backgroundSize: "140px 140px" }}
      />

      {/* Hairline frame */}
      <div className="pointer-events-none absolute inset-4 z-[2] border border-[#B87D29]/20 md:inset-6" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease }}
        >
          <Image src="/logo.png" alt="Anzar" width={190} height={60} priority className="h-14 w-auto object-contain md:h-16" />
        </motion.div>

        {/* Divider */}
        <motion.span
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 72, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6, ease }}
          className="my-9 block h-px bg-[#B87D29]/80"
        />

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.75, ease }}
          className="font-[family-name:var(--font-display)] text-[clamp(2.8rem,7vw,5.5rem)] font-light leading-[1] tracking-[-0.01em]"
        >
          La Carte
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.95, ease }}
          className="mt-6 max-w-xl font-[family-name:var(--font-body)] text-[0.98rem] font-light leading-relaxed text-[#F5EAD6]/80 md:text-lg"
        >
          Cuisine orientale — saveurs authentiques, produits de saison et
          créations pensées pour accompagner le rythme de la soirée.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.15, ease }}
        >
          <button
            onClick={scrollToMenu}
            className="group mt-11 inline-flex items-center gap-3 border border-[#B87D29]/60 px-9 py-4 font-[family-name:var(--font-mono)] text-[0.68rem] font-medium uppercase tracking-[0.3em] text-[#F5EAD6] transition-colors duration-300 hover:border-[#B87D29] hover:bg-[#B87D29] hover:text-[#1E0709]"
          >
            Découvrir la carte
            <span className="transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
          </button>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="font-[family-name:var(--font-mono)] text-[0.55rem] uppercase tracking-[0.32em] text-[#F5EAD6]/40">
          Défiler
        </span>
        <span className="h-9 w-px overflow-hidden bg-[#F5EAD6]/12">
          <span className="anzar-scroll block h-3 w-px bg-[#B87D29]" />
        </span>
      </motion.div>

      <style jsx global>{`
        @keyframes anzarScroll {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(300%); }
        }
        .anzar-scroll { animation: anzarScroll 2s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .anzar-scroll { animation: none; } }
      `}</style>
    </section>
  );
}