"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Archivo, Poppins } from "next/font/google";

/**
 * ANZAR — "Cocktails & Shots" menu. Mirrors the Desserts page structure.
 * Four sections: Cocktails Classiques, Cocktails Signatures, Chich Cocktails, Shots.
 * Signature ingredient lines come from the carte.
 */

const mono = Archivo({ subsets: ["latin"], weight: ["300", "400", "500", "600"], variable: "--font-mono", display: "swap" });
const body = Poppins({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-body", display: "swap" });

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

interface MenuItem {
  name: string;
  price: number;
  price2?: number;
  description?: string;
  detailedDescription?: string;
}
interface MenuSection {
  title: string;
  items: MenuItem[];
}

const CarteMenuItem: React.FC<MenuItem & { onExpand: () => void; isExpanded: boolean }> = ({
  name,
  price,
  price2,
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
        {price2 !== undefined ? (
          <div className="flex shrink-0 items-baseline gap-4">
            <span className="flex flex-col items-center gap-0.5">
              <span className="font-[family-name:var(--font-mono)] text-[0.5rem] uppercase tracking-[0.2em] text-[#B87D29]/50">
                1 Shot
              </span>
              <span className="font-[family-name:var(--font-mono)] text-[0.95rem] font-light tracking-wide text-[#B87D29]">
                {price}
              </span>
            </span>
            <span className="flex flex-col items-center gap-0.5">
              <span className="font-[family-name:var(--font-mono)] text-[0.5rem] uppercase tracking-[0.2em] text-[#B87D29]/50">
                Meter
              </span>
              <span className="font-[family-name:var(--font-mono)] text-[0.95rem] font-light tracking-wide text-[#B87D29]">
                {price2}
              </span>
            </span>
          </div>
        ) : (
          <span className="shrink-0 font-[family-name:var(--font-mono)] text-[0.95rem] font-light tracking-wide text-[#B87D29]">
            {price}
          </span>
        )}
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

const CarteMenuSection: React.FC<MenuSection> = ({ title, items }) => {
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
          <CarteMenuItem
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

const CocktailsMenu: React.FC = () => {
  const menuSections: MenuSection[] = [
    {
      title: "Cocktails Classiques",
      items: [
        { name: "Mojito", price: 200 },
        { name: "Pina colada", price: 200 },
        { name: "Espresso martini", price: 200 },
        { name: "Negroni", price: 200 },
        { name: "Porn star martini", price: 200 },
        { name: "Margarita", price: 200 },
        { name: "Whiskey sour", price: 200 },
        { name: "Cosmopolitan", price: 200 },
        { name: "Aperol spritz", price: 200 },
        { name: "Sex on the beach", price: 200 },
        { name: "Moskow mule", price: 200 },
        { name: "St Germain Spritz", price: 200 },
      ],
    },
    {
      title: "Cocktails Signatures",
      items: [
        {
          name: "AFRI",
          price: 200,
          description: "Cognac Hennessy, Caramel au Beurre Salé, Amaretto Disaronno, Café",
          detailedDescription: "Le cognac Hennessy rencontre le caramel au beurre salé et l'amaretto Disaronno, relevés d'une note de café.",
        },
        {
          name: "ANZAR",
          price: 200,
          description: "Vodka Belvedere, Passion Fruit, Pistache, Vin Mousseux Rosé",
          detailedDescription: "Notre signature maison : vodka Belvedere et fruit de la passion, relevés de pistache et allongés d'un vin mousseux rosé.",
        },
        {
          name: "IDIR",
          price: 200,
          description: "Ananas, Malibu, Cacao Blanc, Jus de Citron, Bitter Chocolat",
          detailedDescription: "L'ananas et le Malibu s'associent au cacao blanc et au jus de citron, relevés d'un bitter chocolat.",
        },
        {
          name: "MOREYBA",
          price: 200,
          description: "Jack Daniels Whisky, Rass el Hanout, Jus Citron, Vin Rouge, Oeuf",
          detailedDescription: "Le whisky Jack Daniel's rencontre le ras el hanout, le jus de citron et le vin rouge, dans une texture travaillée à l'œuf.",
        },
        {
          name: "ILLU",
          price: 200,
          description: "Gin Hendricks, Licor Maraschino, Fruits Rouges, Bitter Orange",
          detailedDescription: "Le gin Hendrick's et la liqueur maraschino accompagnent les fruits rouges, relevés d'un bitter orange.",
        },
        {
          name: "GURZIL",
          price: 200,
          description: "Vodka Belvedere, Cacao Blanc, Ananas, Sirop de Fleur",
          detailedDescription: "La vodka Belvedere s'associe au cacao blanc et à l'ananas, adoucie d'un sirop de fleur.",
        },
        {
          name: "ATLAS",
          price: 200,
          description: "Tequila, Mango, Jus Citron, Jalapeno, Bière",
          detailedDescription: "La tequila et la mangue rencontrent le jus de citron et le jalapeño, allongés d'une touche de bière.",
        },
        {
          name: "YAKUSH",
          price: 200,
          description: "Bacardi Gold, Orange, Cannelle, Bitter Angostura, Oeuf",
          detailedDescription: "Le Bacardi Gold s'accorde à l'orange et à la cannelle, relevé d'un bitter Angostura et travaillé à l'œuf.",
        },
        {
          name: "Carafe de Sangria",
          price: 900,
          description: "Rouge, Blanche, Rosé, Cava Blanche, Cava Rosé",
          detailedDescription: "Notre sangria servie en carafe, à partager — au choix : rouge, blanche, rosé, cava blanche ou cava rosé.",
        },
      ],
    },
    {
      title: "Chich Cocktails",
      items: [
        { name: "Love Magic", price: 600 },
        { name: "Mint Magic", price: 600 },
        { name: "Apple Magic", price: 600 },
        { name: "Mi Amour Magic", price: 600 },
        { name: "Raisin Magic", price: 600 },
        { name: "Arabi Mint Magic", price: 600 },
        { name: "Tabo Mint Magic", price: 600 },
        { name: "0% Nico Magic", price: 600 },
      ],
    },
    {
      title: "Shots",
      items: [
        { name: "Tequila", price: 100, price2: 900 },
        { name: "Passion Vodka", price: 100, price2: 900 },
        { name: "Sambuca", price: 100, price2: 900 },
        { name: "Jagermeister", price: 100, price2: 900 },
        { name: "B52", price: 100, price2: 900 },
      ],
    },
  ];

  return (
    <div
      id="cocktails-menu-section"
      className={`${mono.variable} ${body.variable} relative min-h-screen w-full overflow-hidden bg-[#1E0709] px-6 py-24 text-[#F5EAD6] md:px-8`}
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay" style={{ backgroundImage: GRAIN, backgroundSize: "140px 140px" }} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_45%_at_50%_0%,rgba(122,47,56,0.32)_0%,transparent_60%)]" />

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
            Cocktails &amp; Shots
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-5 font-[family-name:var(--font-mono)] text-[0.6rem] uppercase tracking-[0.42em] text-[#B87D29]"
          >
            Classiques · Signatures · Shots
          </motion.p>
        </header>

        <div className="space-y-16">
          {menuSections.map((section, index) => (
            <CarteMenuSection key={index} title={section.title} items={section.items} />
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

export default CocktailsMenu;
