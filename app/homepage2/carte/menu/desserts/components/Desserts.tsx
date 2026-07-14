"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Archivo, Poppins } from "next/font/google";

/**
 * ANZAR — Desserts menu. Structure mirrors the reference; styling is Anzar.
 * Titles use the global brand font (--font-display).
 * The `detailedDescription` lines are suggestions — edit to taste.
 */

const mono = Archivo({ subsets: ["latin"], weight: ["300", "400", "500", "600"], variable: "--font-mono", display: "swap" });
const body = Poppins({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-body", display: "swap" });

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

interface MenuItem {
  name: string;
  price: number;
  description?: string;
  detailedDescription?: string;
}
interface MenuSection {
  title: string;
  items: MenuItem[];
}

const DessertMenuItem: React.FC<MenuItem & { onExpand: () => void; isExpanded: boolean }> = ({
  name,
  price,
  description,
  detailedDescription,
  onExpand,
  isExpanded,
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isExpanded && itemRef.current) {
      itemRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [isExpanded]);

  return (
    <motion.div
      ref={itemRef}
      className="group cursor-pointer border-b border-[#B87D29]/15 pb-6 pt-1"
      whileHover={{ x: 4 }}
      onClick={onExpand}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-baseline justify-between gap-6">
        <h3 className="font-[family-name:var(--font-display)] text-[1.35rem] font-light leading-snug tracking-tight text-[#F5EAD6] transition-colors duration-300 group-hover:text-[#B87D29]">
          {name}
        </h3>
        <span className="shrink-0 font-[family-name:var(--font-mono)] text-[0.95rem] font-light tracking-wide text-[#B87D29]">
          {price}
        </span>
      </div>

      {description && (
        <p className="mt-2 max-w-xl font-[family-name:var(--font-body)] text-[0.85rem] font-light leading-relaxed text-[#F5EAD6]/60">
          {description}
        </p>
      )}

      <AnimatePresence>
        {isExpanded && detailedDescription && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 14 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="border-l border-[#B87D29]/50 pl-4 font-[family-name:var(--font-body)] text-[0.85rem] font-light leading-relaxed text-[#F5EAD6]/70">
              {detailedDescription}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {detailedDescription && (
        <div className="mt-3 flex items-center gap-1.5 font-[family-name:var(--font-mono)] text-[0.56rem] uppercase tracking-[0.28em] text-[#B87D29]/70">
          <span>{isExpanded ? "Moins" : "Détails"}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s ease" }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      )}
    </motion.div>
  );
};

const DessertMenuSection: React.FC<MenuSection> = ({ title, items }) => {
  const [expanded, setExpanded] = useState<number | null>(null);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="relative mb-10 pb-3 font-[family-name:var(--font-mono)] text-[0.68rem] font-medium uppercase tracking-[0.4em] text-[#B87D29]">
        <span className="relative z-10">{title}</span>
        <span className="absolute bottom-0 left-0 h-px w-full bg-[#B87D29]/15" />
        <motion.span
          className="absolute bottom-0 left-0 h-px bg-[#B87D29]"
          initial={{ width: 0 }}
          whileInView={{ width: "22%" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
      </h2>
      <div className="space-y-6">
        {items.map((item, index) => (
          <DessertMenuItem
            key={index}
            {...item}
            onExpand={() => setExpanded(expanded === index ? null : index)}
            isExpanded={expanded === index}
          />
        ))}
      </div>
    </motion.div>
  );
};

const DessertsMenu: React.FC = () => {
  const menuSections: MenuSection[] = [
    {
      title: "Les Desserts",
      items: [
        { name: "Fondant au Chocolat et à l'Orange", price: 120, description: "Accompagné d'une glace à la vanille", detailedDescription: "Un cœur de chocolat noir fondant relevé d'une note d'orange, adouci par une glace vanille." },
        { name: "Tarte au Citron Meringuée Revisitée", price: 120, detailedDescription: "Le classique réinventé : crème de citron vive sous une meringue délicatement dorée." },
        { name: "Sablé Chocolat & Framboise", price: 120, description: "Accompagné d'une glace à la vanille", detailedDescription: "Un sablé croquant, chocolat et framboise, servi avec une glace vanille artisanale." },
        { name: "Pavlova aux Fruits Rouges et à l'Eau de Rose", price: 120, detailedDescription: "Meringue craquante, fruits rouges de saison et une touche d'eau de rose." },
        { name: "Tiramisu aux Dattes", price: 110, detailedDescription: "Notre tiramisu revisité — mascarpone et dattes, entre douceur et caractère." },
        { name: "Jawhara à la Fleur d'Oranger", price: 90, detailedDescription: "Une douceur orientale délicatement parfumée à la fleur d'oranger." },
        { name: "Gâteau Anzar au Safran", price: 100, detailedDescription: "Notre signature : un gâteau tout en finesse, parfumé au safran." },
        { name: "Sélection de Fruits de Saison", price: 120, detailedDescription: "Une cueillette des meilleurs fruits du marché, dans leur fraîcheur naturelle." },
        { name: "Assortiment de Deux Boules de Glace", price: 120, description: "Au choix : Vanille, Framboise ou Citron", detailedDescription: "Deux boules glacées, élaborées maison, aux saveurs pures et intenses." },
      ],
    },
  ];

  return (
    <div
      id="desserts-menu-section"
      className={`${mono.variable} ${body.variable} relative min-h-screen w-full overflow-hidden bg-[#0D262B] px-6 py-24 text-[#F5EAD6] md:px-8`}
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay" style={{ backgroundImage: GRAIN, backgroundSize: "140px 140px" }} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_45%_at_50%_0%,rgba(34,84,92,0.32)_0%,transparent_60%)]" />

      <div className="relative mx-auto max-w-3xl">
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
            Desserts
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-5 font-[family-name:var(--font-mono)] text-[0.6rem] uppercase tracking-[0.42em] text-[#B87D29]"
          >
            Douceurs & plaisirs sucrés
          </motion.p>
        </header>

        <div className="space-y-4">
          {menuSections.map((section, index) => (
            <DessertMenuSection key={index} title={section.title} items={section.items} />
          ))}
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

export default DessertsMenu;