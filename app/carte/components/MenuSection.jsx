"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Archivo, Poppins } from "next/font/google";

/**
 * ANZAR — "La Carte" categories grid (elegant reveal-on-hover cards).
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

const CATEGORIES = [
  { title: "Boissons & Softs", image: "/cocktails.jpg", description: "Une sélection de boissons sans alcool, fraîches et raffinées, pour éveiller le palais.", href: "/carte/menu/boissons" },
  { title: "Cocktails", image: "/bar.jpg", description: "Des signatures imaginées comme des compositions, entre spiritueux d'exception et ingrédients choisis.", href: "/carte/menu/cocktails" },
  { title: "Champagnes & Vins", image: "/champagne-wines.jpg", description: "Champagnes d'exception et grands crus, sélectionnés parmi les plus belles maisons.", href: "/carte/menu/champagnes-vins" },
  { title: "Bières & Alcools", image: "/beers-drinks.jpg", description: "Bières et spiritueux d'exception, une collection pour chaque instant de la soirée.", href: "/carte/menu/bieres-alcools" },
  { title: "À partager", image: "/cuisine-1.jpg", description: "Des créations conviviales à partager, pensées pour ouvrir la soirée en douceur.", href: "/carte/menu/a-partager" },
  { title: "Les Entrées Froides", image: "/cuisine-6.jpg", description: "Des entrées délicates et fraîches, prélude raffiné à l'expérience.", href: "/carte/menu/entrees-froides" },
  { title: "Les Plats", image: "/cuisine-3.jpg", description: "Poissons, viandes et créations orientales, sourcés avec la plus grande exigence.", href: "/carte/menu/plats" },
  { title: "Les Desserts", image: "/cuisine-7.jpg", description: "Des douceurs élégantes, pour une conclusion tout en finesse.", href: "/carte/menu/desserts" },
];

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export default function CarteMenu() {
  return (
    <section
      id="carte"
      className={`${mono.variable} ${body.variable} relative w-full overflow-hidden bg-[#1E0709] px-6 py-24 text-[#F5EAD6] md:px-16 md:py-28`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{ backgroundImage: GRAIN, backgroundSize: "140px 140px" }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_50%_at_50%_0%,rgba(122,47,56,0.35)_0%,transparent_60%)]" />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-16 text-center md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-6 inline-flex items-center gap-4 font-[family-name:var(--font-mono)] text-[0.62rem] font-medium uppercase tracking-[0.4em] text-[#B87D29]"
          >
            <span className="h-px w-8 bg-[#B87D29]/60" />
            La Carte
            <span className="h-px w-8 bg-[#B87D29]/60" />
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            viewport={{ once: true }}
            className="font-[family-name:var(--font-display)] text-[clamp(2.2rem,4.4vw,3.6rem)] font-light leading-[1.04] tracking-[-0.02em]"
          >
            Le paysage culinaire.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12 }}
            viewport={{ once: true }}
            className="mx-auto mt-6 max-w-xl font-[family-name:var(--font-body)] text-[0.98rem] font-light leading-[1.8] text-[#F5EAD6]/75"
          >
            Un voyage où chaque création raconte une histoire et chaque bouchée
            révèle l&apos;art de notre cuisine.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-7">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.08 }}
              viewport={{ once: true, margin: "-60px" }}
            >
              <Link
                href={cat.href}
                className="group relative block aspect-[4/5] overflow-hidden bg-[#12060A]"
              >
                {/* image */}
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={i < 3}
                  className="object-cover object-center brightness-[0.6] transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                />

                {/* wine gradient — always keeps text crisp */}
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,rgba(18,6,10,0.94)_0%,rgba(18,6,10,0.45)_48%,rgba(18,6,10,0.15)_100%)]" />

                {/* inset gold frame draws in on hover */}
                <span className="pointer-events-none absolute inset-3 border border-[#B87D29]/15 transition-all duration-500 ease-out group-hover:inset-4 group-hover:border-[#B87D29]/45" />

                {/* content — always visible */}
                <div className="absolute inset-0 z-10 flex flex-col justify-end p-7">
                  {/* growing gold line */}
                  <span className="mb-4 block h-px w-10 bg-[#B87D29] transition-all duration-500 ease-out group-hover:w-16" />

                  <h3 className="font-[family-name:var(--font-display)] text-[1.7rem] font-light leading-tight tracking-tight text-[#F5EAD6]">
                    {cat.title}
                  </h3>

                  <p className="mt-3 max-w-[95%] font-[family-name:var(--font-body)] text-[0.86rem] font-light leading-relaxed text-[#F5EAD6]/80">
                    {cat.description}
                  </p>

                  <span className="mt-5 inline-flex items-center gap-2 font-[family-name:var(--font-mono)] text-[0.62rem] font-medium uppercase tracking-[0.28em] text-[#B87D29]">
                    Découvrir
                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}