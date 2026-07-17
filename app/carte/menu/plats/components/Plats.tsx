"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Archivo, Poppins } from "next/font/google";

/**
 * ANZAR — "Les Plats" menu. Mirrors the Desserts page structure.
 * Four sections: Tajines, Pastas & Risottos, Au Josper, Accompagnements.
 * Items, prices and accompaniment lines come from the carte PDF.
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

const CarteMenuItem: React.FC<MenuItem & { onExpand: () => void; isExpanded: boolean }> = ({
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

const PlatsMenu: React.FC = () => {
  const menuSections: MenuSection[] = [
    {
      title: "Tajines",
      items: [
        { name: "Suprême de Poulet, Deghmira aux Citrons Confits", price: 240, detailedDescription: "Un suprême de poulet mijoté en tajine, accompagné d'une deghmira aux citrons confits." },
        { name: "Kefta avec Matisha Anzar", price: 200, detailedDescription: "Notre kefta en tajine, servie avec la matisha Anzar, notre signature de la maison." },
        { name: "Mrouzia d'Agneau aux Raisins Secs", price: 320, detailedDescription: "Une mrouzia d'agneau mijotée lentement, relevée par la douceur des raisins secs." },
        { name: "Gambas Tangéroises à la Chermoula", price: 290, detailedDescription: "Des gambas préparées à la tangéroise et relevées à la chermoula." },
        { name: "Souris d'Agneau aux Pruneaux et Amandes", price: 360, detailedDescription: "Une souris d'agneau fondante, servie avec des pruneaux et des amandes." },
      ],
    },
    {
      title: "Pastas & Risottos",
      items: [
        { name: "Linguine aux Fruits de Mer", price: 340, detailedDescription: "Des linguine généreusement garnies de fruits de mer." },
        { name: "Linguine au Poulet et aux Champignons", price: 320, detailedDescription: "Des linguine au poulet et aux champignons, un classique tout en équilibre." },
        { name: "Linguine Scampi", price: 330, detailedDescription: "Des linguine aux scampi, simples et savoureuses." },
        { name: "Risotto Safrané aux Fruits de Mer", price: 350, detailedDescription: "Un risotto safrané, garni de fruits de mer." },
        { name: "Risotto au Poulet et aux Champignons", price: 330, detailedDescription: "Un risotto crémeux au poulet et aux champignons." },
        { name: "Risotto aux Gambas", price: 340, detailedDescription: "Un risotto crémeux mettant les gambas à l'honneur." },
      ],
    },
    {
      title: "Au Josper",
      items: [
        { name: "Côtelettes d'Agneau à la Provençale", price: 340, description: "Accompagnées d'un croustillant de pommes de terre", detailedDescription: "Des côtelettes d'agneau à la provençale, saisies au Josper et servies avec un croustillant de pommes de terre." },
        { name: "Mini Mix Grill", price: 290, description: "Accompagné d'une galette de pommes de terre", detailedDescription: "Un assortiment de grillades passé au Josper, servi avec une galette de pommes de terre." },
        { name: "Kefta Grillée à la Marocaine", price: 260, detailedDescription: "Notre kefta grillée au Josper, préparée à la marocaine." },
        { name: "Pavé de Saumon Croustillant", price: 360, description: "Sur un lit d'épinards et de tomates cerises", detailedDescription: "Un pavé de saumon à la peau croustillante, dressé sur un lit d'épinards et de tomates cerises." },
        { name: "Suprême de Poulet Farci", price: 290, description: "Farci aux épinards, feta et marinade au lait de coco", detailedDescription: "Un suprême de poulet farci aux épinards et à la feta, relevé d'une marinade au lait de coco." },
        { name: "Tournedos de Bœuf", price: 360, description: "Purée de carottes et gingembre & champignons au vinaigre balsamique", detailedDescription: "Un tournedos de bœuf saisi au Josper, accompagné d'une purée de carottes au gingembre et de champignons au vinaigre balsamique." },
        { name: "Espadon Grillé", price: 290, description: "Accompagné de condiments exotiques", detailedDescription: "De l'espadon grillé au Josper, relevé de condiments exotiques." },
        { name: "Chich Taouk Oriental", price: 240, description: "Accompagné de cromesquis maison", detailedDescription: "Notre chich taouk oriental, grillé au Josper et servi avec des cromesquis maison." },
        { name: "Entrecôte de Bœuf", price: 360, description: "Accompagnée d'un Millefeuille de pommes de terre truffé", detailedDescription: "Une entrecôte de bœuf saisie au Josper, accompagnée d'un millefeuille de pommes de terre truffé." },
        { name: "Filet de Loup", price: 340, description: "Accompagné d'une purée de pommes de terre au basilic & safran de Taliouine", detailedDescription: "Un filet de loup grillé au Josper, servi avec une purée de pommes de terre au basilic et au safran de Taliouine." },
        { name: "T-Bone Steak au Chimichurri", price: 390, description: "Accompagné d'une mousseline de pommes de terre", detailedDescription: "Un T-Bone saisi au Josper et relevé au chimichurri, servi avec une mousseline de pommes de terre." },
        { name: "Côte de Bœuf au Chimichurri", price: 395, description: "Accompagnée d'un duo de mousselines de pommes de terre et carottes", detailedDescription: "Une côte de bœuf grillée au Josper et relevée au chimichurri, accompagnée d'un duo de mousselines de pommes de terre et de carottes." },
      ],
    },
    {
      title: "Accompagnements",
      items: [
        { name: "Légumes du Jour Sautés", price: 70, detailedDescription: "Les légumes du jour, simplement sautés." },
        { name: "Frites Maison", price: 70, detailedDescription: "Nos frites, préparées maison." },
        { name: "Purée de Pommes de Terre Maison", price: 70, detailedDescription: "Notre purée de pommes de terre, préparée maison." },
      ],
    },
  ];

  return (
    <div
      id="plats-menu-section"
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
            Les Plats
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-5 font-[family-name:var(--font-mono)] text-[0.6rem] uppercase tracking-[0.42em] text-[#B87D29]"
          >
            Tajines · Pastas · Josper
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

export default PlatsMenu;
