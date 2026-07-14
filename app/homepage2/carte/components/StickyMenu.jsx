"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Archivo, Poppins } from "next/font/google";

/**
 * ANZAR — Sticky navigation for "La Carte" pages.
 * Same categories/links as CarteMenu.
 * Usage:  <CarteNav selectedCategory="Cocktails" />
 */

const mono = Archivo({ subsets: ["latin"], weight: ["300", "400", "500", "600"], variable: "--font-mono", display: "swap" });
const body = Poppins({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-body", display: "swap" });

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const CATEGORIES = [
  { category: "Boissons & Softs", link: "/homepage2/carte/menu/boissons" },
  { category: "Cocktails", link: "/homepage2/carte/menu/cocktails" },
  { category: "Champagnes & Vins", link: "/homepage2/carte/menu/champagnes-vins" },
  { category: "Bières & Alcools", link: "/homepage2/carte/menu/bieres-alcools" },
  { category: "À partager", link: "/homepage2/carte/menu/a-partager" },
  { category: "Les Entrées Froides", link: "/homepage2/carte/menu/entrees-froides" },
  { category: "Les Plats", link: "/homepage2/carte/menu/plats" },
  { category: "Les Desserts", link: "/homepage2/carte/menu/desserts" },
];

export default function CarteNav({ selectedCategory = null }) {
  const [open, setOpen] = useState(false);
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const onScroll = () => setSticky(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className={`${mono.variable} ${body.variable}`}>
      {/* Keep the page background dark to avoid any white flash */}
      <style jsx global>{`
        html, body { background-color: #0D262B; }
      `}</style>

      {/* ── Sticky bar ────────────────────────────────────── */}
      <motion.nav
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          sticky ? "bg-[#0D262B]/85 backdrop-blur-md" : "bg-transparent"
        }`}
        animate={{ height: sticky ? 64 : 82 }}
      >
        <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-6 md:px-8">
          {/* Logo */}
          <Link href="/homepage2" aria-label="Anzar — accueil">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Image
                src="/logo.png"
                alt="Anzar"
                width={140}
                height={44}
                className={`w-auto object-contain transition-all duration-300 ${sticky ? "h-7" : "h-9 md:h-10"}`}
                priority
              />
            </motion.div>
          </Link>

          {/* Burger */}
          <motion.button
            onClick={() => setOpen((v) => !v)}
            className="relative flex h-8 w-8 items-center justify-center"
            whileTap={{ scale: 0.95 }}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
          >
            <motion.span
              className={`absolute block h-px w-6 ${open ? "bg-[#F5EAD6]" : "bg-[#B87D29]"}`}
              animate={{ rotate: open ? 45 : 0, y: open ? 0 : -4 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="absolute block h-px w-6 bg-[#B87D29]"
              animate={{ opacity: open ? 0 : 1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className={`absolute block h-px w-6 ${open ? "bg-[#F5EAD6]" : "bg-[#B87D29]"}`}
              animate={{ rotate: open ? -45 : 0, y: open ? 0 : 4 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </div>
      </motion.nav>

      {/* ── Overlay ───────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            className="fixed inset-0 z-40 bg-[#081A1E]"
          >
            {/* texture + decorative corners */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay" style={{ backgroundImage: GRAIN, backgroundSize: "140px 140px" }} />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_50%_at_50%_15%,rgba(34,84,92,0.35)_0%,transparent_60%)]" />
            <div className="pointer-events-none absolute left-6 top-6 h-20 w-20 border-l border-t border-[#B87D29]/25" />
            <div className="pointer-events-none absolute bottom-6 right-6 h-20 w-20 border-b border-r border-[#B87D29]/25" />

            <div className="relative z-10 flex h-full flex-col items-center justify-center px-6">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mb-10 font-[family-name:var(--font-mono)] text-[0.6rem] uppercase tracking-[0.42em] text-[#B87D29]"
              >
                Anzar — La Carte
              </motion.p>

              <nav className="flex w-full max-w-md flex-col items-center gap-1">
                {CATEGORIES.map((item, i) => {
                  const active = selectedCategory === item.category;
                  return (
                    <Link
                      key={item.category}
                      href={item.link}
                      onClick={() => setOpen(false)}
                      className="group w-full text-center"
                    >
                      <motion.div
                        initial={{ y: 26, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.15 + i * 0.05 }}
                        className="relative inline-block"
                      >
                        <motion.span
                          whileHover={{ x: 6 }}
                          className={`block py-2 font-[family-name:var(--font-display)] text-[1.7rem] font-light leading-tight tracking-tight transition-colors duration-300 md:text-[2rem] ${
                            active ? "text-[#B87D29]" : "text-[#F5EAD6]/85 group-hover:text-[#B87D29]"
                          }`}
                        >
                          {item.category}
                        </motion.span>
                        <span
                          className={`absolute bottom-0 left-1/2 h-px -translate-x-1/2 bg-[#B87D29] transition-all duration-300 ${
                            active ? "w-12" : "w-0 group-hover:w-12"
                          }`}
                        />
                      </motion.div>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}