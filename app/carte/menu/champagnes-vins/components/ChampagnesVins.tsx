"use client";

import React from "react";
import { motion } from "framer-motion";
import { Archivo, Poppins } from "next/font/google";

/**
 * ANZAR — "Champagnes & Vins" menu, laid out as price tables.
 * Each section declares its own price columns (75cl, 150cl, …).
 * Data from the Anzar drinks carte.
 */

const mono = Archivo({ subsets: ["latin"], weight: ["300", "400", "500", "600"], variable: "--font-mono", display: "swap" });
const body = Poppins({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-body", display: "swap" });

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/* ── types ─────────────────────────────────────────────────── */
type Price = number | string;

interface DrinkItem {
  name: string;
  /** One entry per column declared on the section. Use "–" when not offered. */
  prices: Price[];
}
interface PriceTableProps {
  title: string;
  columns: string[];
  items: DrinkItem[];
  className?: string;
}

/* ── animation ─────────────────────────────────────────────── */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.02 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.15 } },
};
const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" as const } },
};

/* ── price table ───────────────────────────────────────────── */
const PriceTable = ({ title, columns, items, className = "" }: PriceTableProps) => {
  const grid = { gridTemplateColumns: `2fr repeat(${columns.length}, minmax(3.2rem, 0.55fr))` };

  return (
    <motion.div
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className={`rounded-lg border border-[#B87D29]/15 bg-[#B87D29]/[0.05] p-5 backdrop-blur-sm ${className}`}
    >
      <h3 className="mb-5 text-center font-[family-name:var(--font-display)] text-[1.6rem] font-light tracking-wide text-[#F5EAD6]">
        {title}
      </h3>

      <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        {/* column labels */}
        <div
          className="grid border-b border-[#B87D29]/20 pb-2 font-[family-name:var(--font-mono)] text-[0.58rem] uppercase tracking-[0.2em] text-[#F5EAD6]/50"
          style={grid}
        >
          <div />
          {columns.map((c) => (
            <div key={c} className="text-center">
              {c}
            </div>
          ))}
        </div>

        {items.map((item, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            className="group grid border-b border-[#B87D29]/10 py-2.5 transition-colors hover:bg-[#B87D29]/[0.06]"
            style={grid}
          >
            <span className="pr-3 font-[family-name:var(--font-body)] text-[0.9rem] font-light tracking-wide text-[#F5EAD6] transition-colors duration-300 group-hover:text-[#B87D29]">
              {item.name}
            </span>
            {item.prices.map((p, pi) => (
              <span
                key={pi}
                className="text-center font-[family-name:var(--font-mono)] text-[0.82rem] font-light text-[#B87D29]/90"
              >
                {p}
              </span>
            ))}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

/* ── divider ───────────────────────────────────────────────── */
const SmallDivider = () => (
  <div className="my-12 flex items-center justify-center">
    <div className="h-px w-10 bg-[#B87D29]/30" />
    <div className="mx-2 text-xs text-[#B87D29]/60">✦</div>
    <div className="h-px w-10 bg-[#B87D29]/30" />
  </div>
);

/* ── data ──────────────────────────────────────────────────── */
const champagnes: DrinkItem[] = [
  { name: "Moet & Chandon Brut", prices: [2000, 3900] },
  { name: "Moet & Chandon Rosé", prices: [2900, 4900] },
  { name: "Ruinart Blanc de Blanc", prices: [3900, "–"] },
  { name: "Krug", prices: [9600, "–"] },
  { name: "Dom Perignon Brut", prices: [12000, "–"] },
  { name: "Dom Perignon Rosé", prices: [19500, "–"] },
];

const vinsBlancs: DrinkItem[] = [
  { name: "Eclipse", prices: [480] },
  { name: "Viña Esmeralda", prices: [580] },
  { name: "Château Roslane AOC", prices: [650] },
  { name: "Chablis Gérard Tremblay", prices: [690] },
  { name: "Sancerre J de Villebois", prices: [740] },
];

const vinsRouges: DrinkItem[] = [
  { name: "Eclipse", prices: [480] },
  { name: "Raynal (Syrah)", prices: [590] },
  { name: "Azayi (100% Carignan)", prices: [650] },
  { name: "Château Roslane AOC", prices: [650] },
  { name: "Tandem (Syrah)", prices: [700] },
  { name: "M de Magnol (haut-médoc)", prices: [780] },
  { name: "Château Chamirey Mercury (Pinot noir)", prices: [900] },
  { name: "Chateauneuf du Pape", prices: [1300] },
];

const vinsRoses: DrinkItem[] = [
  { name: "Eclipse", prices: [480] },
  { name: "Tandem", prices: [650] },
  { name: "Minuty Prestige", prices: [690] },
  { name: "Whispering Angel", prices: [740] },
  { name: "Miraval", prices: [800] },
];

/* ── page section ──────────────────────────────────────────── */
const ChampagnesVinsMenu: React.FC = () => {
  return (
    <div
      id="champagnes-vins-menu-section"
      className={`${mono.variable} ${body.variable} relative min-h-screen w-full overflow-hidden bg-[#1E0709] px-6 py-24 text-[#F5EAD6] md:px-8`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{ backgroundImage: GRAIN, backgroundSize: "140px 140px" }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_45%_at_50%_0%,rgba(122,47,56,0.32)_0%,transparent_60%)]" />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <header className="mb-16 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="mb-7 inline-block">
            <div className="mx-auto mb-1 h-px w-16 bg-[#B87D29]/70" />
            <div className="mx-auto h-px w-10 bg-[#B87D29]/40" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-[family-name:var(--font-display)] text-[clamp(2.6rem,6vw,4.2rem)] font-light leading-none tracking-[-0.01em]"
          >
            Champagnes &amp; Vins
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-5 font-[family-name:var(--font-mono)] text-[0.6rem] uppercase tracking-[0.42em] text-[#B87D29]"
          >
            Maisons d&apos;exception & grands crus
          </motion.p>
        </header>

        {/* CHAMPAGNES */}
        <PriceTable title="Champagnes" columns={["75cl", "150cl"]} items={champagnes} className="mx-auto max-w-2xl" />

        <SmallDivider />

        {/* VINS */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center font-[family-name:var(--font-display)] text-[2rem] font-light tracking-wide text-[#F5EAD6]"
        >
          Les Vins
        </motion.h3>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <PriceTable title="Blancs" columns={["75cl"]} items={vinsBlancs} />
          <PriceTable title="Rouges" columns={["75cl"]} items={vinsRouges} />
          <PriceTable title="Rosés" columns={["75cl"]} items={vinsRoses} />
        </div>

        {/* Footer */}
        <footer className="mt-20 text-center">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div className="mx-auto mb-1 h-px w-10 bg-[#B87D29]/40" />
            <div className="mx-auto mb-6 h-px w-16 bg-[#B87D29]/70" />
            <p className="font-[family-name:var(--font-mono)] text-[0.58rem] uppercase tracking-[0.4em] text-[#B87D29]/70">
              Bonne dégustation
            </p>
          </motion.div>
        </footer>
      </div>
    </div>
  );
};

export default ChampagnesVinsMenu;
