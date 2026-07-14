"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Archivo, Poppins } from "next/font/google";

/**
 * ANZAR — Desserts hero. Scrolls to <div id="desserts-menu-section">.
 * Image: /public/desserts.jpg
 */

const mono = Archivo({ subsets: ["latin"], weight: ["300", "400", "500", "600"], variable: "--font-mono", display: "swap" });
const body = Poppins({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-body", display: "swap" });

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const DessertsHero = () => {
  const scrollToMenu = () => {
    document.getElementById("desserts-menu-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      className={`${mono.variable} ${body.variable} relative h-[100svh] min-h-[620px] w-full overflow-hidden bg-[#0D262B] text-[#F5EAD6]`}
    >
      {/* Background */}
      <motion.div
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease }}
        className="absolute inset-0"
      >
        <Image src="/cuisine-7.jpg" alt="Desserts d'Anzar" fill priority sizes="100vw" className="object-cover object-center" />
      </motion.div>

      {/* Wine grade — bottom, not side */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,#0D262B_0%,rgba(11,34,38,0.72)_32%,rgba(11,34,38,0.15)_62%,transparent_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(7,23,26,0.5)_0%,transparent_22%)]" />
      <div className="pointer-events-none absolute inset-0 z-[1] opacity-[0.09] mix-blend-overlay" style={{ backgroundImage: GRAIN, backgroundSize: "140px 140px" }} />

      {/* Hairline frame */}
      <div className="pointer-events-none absolute inset-4 z-[2] border border-[#B87D29]/20 md:inset-6" />

      {/* Content — anchored to the bottom */}
      <div className="relative z-10 mx-auto flex h-full max-w-6xl items-end px-8 pb-20 md:px-16 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease }}
          className="max-w-lg"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease }}
            className="font-[family-name:var(--font-display)] text-[clamp(2.8rem,6vw,4.6rem)] font-light leading-[1.02] tracking-[-0.01em]"
          >
            Douceurs
            <br />
            <span className="text-[#B87D29]">&amp; desserts</span>
          </motion.h1>

          {/* line under "desserts" */}
          <motion.span
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 110, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.55, ease }}
            className="mt-8 block h-px bg-[#B87D29]/80"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.7, ease }}
            className="mt-7 max-w-md font-[family-name:var(--font-body)] text-[1rem] font-light leading-relaxed text-[#F5EAD6]/80"
          >
            Terminez la soirée en beauté avec nos desserts, préparés maison entre
            tradition orientale et créations signature.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9, ease }}
          >
            <button
              onClick={scrollToMenu}
              className="group mt-10 inline-flex items-center gap-3 border border-[#B87D29]/60 px-9 py-4 font-[family-name:var(--font-mono)] text-[0.68rem] font-medium uppercase tracking-[0.3em] text-[#F5EAD6] transition-colors duration-300 hover:border-[#B87D29] hover:bg-[#B87D29] hover:text-[#0D262B]"
            >
              Voir les desserts
              <span className="transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-7 right-8 z-10 hidden flex-col items-center gap-2 md:flex md:right-16"
      >
        <span className="font-[family-name:var(--font-mono)] text-[0.55rem] uppercase tracking-[0.32em] text-[#F5EAD6]/40">Défiler</span>
        <span className="h-9 w-px overflow-hidden bg-[#F5EAD6]/12">
          <span className="anzar-scroll block h-3 w-px bg-[#B87D29]" />
        </span>
      </motion.div>

      <style jsx global>{`
        @keyframes anzarScroll { 0% { transform: translateY(-100%); } 100% { transform: translateY(300%); } }
        .anzar-scroll { animation: anzarScroll 2s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .anzar-scroll { animation: none; } }
      `}</style>
    </section>
  );
};

export default DessertsHero;