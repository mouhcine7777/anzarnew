"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Archivo, Poppins } from "next/font/google";

/**
 * ANZAR — Section "La soirée commence par une signature" (cuisine)
 * Text block + full-width infinite auto-scrolling image strip.
 * ---------------------------------------------------------------
 * Images:  /public/cuisine-1.jpg … /public/cuisine-5.jpg
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

const SLIDES = [
  { src: "/cuisine-1.jpg", alt: "Création signature du Chef" },
  { src: "/cuisine-2.jpg", alt: "Assiette dressée" },
  { src: "/cuisine-3.jpg", alt: "Produits de saison" },
  { src: "/cuisine-4.jpg", alt: "Dressage minutieux" },
  { src: "/cuisine-5.jpg", alt: "Table dressée" },
  { src: "/cuisine-6.jpg", alt: "Création du Chef" },
  { src: "/cuisine-7.jpg", alt: "Assiette signature" },
];

function AmazighStrip({ className = "", id = "anzar-amazigh-c" }) {
  return (
    <svg className={className} width="100%" height="100%" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <pattern id={id} width="46" height="46" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="#B87D29" strokeWidth="1.1" opacity="0.5">
            <path d="M23 0 L31 11.5 L23 23 L31 34.5 L23 46" />
            <path d="M9 7 l4.5 5.5 -4.5 5.5 -4.5 -5.5 z" />
            <path d="M9 29 l4.5 5.5 -4.5 5.5 -4.5 -5.5 z" />
            <path d="M36 5 h7 M36 16.5 h7 M36 28 h7 M36 39.5 h7" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

export default function CuisineSection() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const reveal = (delay = 0) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(22px)",
    transition: `opacity 900ms ease ${delay}ms, transform 900ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  });

  // duplicated list for a seamless loop
  const loop = [...SLIDES, ...SLIDES];

  return (
    <section
      ref={ref}
      className={`${mono.variable} ${body.variable} relative w-full overflow-hidden bg-[#1A3F47] py-16 text-[#F5EAD6] md:py-20`}
    >
      {/* far-edge decorative Amazigh strips (left + right) */}
      <AmazighStrip id="amz-left" className="pointer-events-none absolute left-0 top-0 hidden h-full w-[38px] opacity-70 md:block" />
      <AmazighStrip id="amz-right" className="pointer-events-none absolute right-0 top-0 hidden h-full w-[38px] opacity-70 md:block" />

      {/* ── Text block ──────────────────────────────────── */}
      <div className="relative mx-auto max-w-3xl px-6 text-center md:px-16">
        <p
          className="mb-6 inline-flex items-center gap-4 font-[family-name:var(--font-mono)] text-[0.62rem] font-medium uppercase tracking-[0.4em] text-[#B87D29]"
          style={reveal(80)}
        >
          <span className="h-px w-8 bg-[#B87D29]/60" />
          L&apos;art du Chef
          <span className="h-px w-8 bg-[#B87D29]/60" />
        </p>

        <h2
          className="font-[family-name:var(--font-display)] text-[clamp(2.2rem,4.4vw,3.6rem)] font-light leading-[1.06] tracking-[-0.02em]"
          style={reveal(160)}
        >
          La soirée commence par une{" "}
          <span className="text-[#B87D29]">signature.</span>
        </h2>

        <p
          className="mx-auto mt-8 max-w-2xl font-[family-name:var(--font-body)] text-[1rem] font-light leading-[1.9] text-[#F5EAD6]/85"
          style={reveal(260)}
        >
          La cuisine d&apos;Anzar célèbre une vision où la tradition se réinvente
          avec retenue. Des produits soigneusement sélectionnés, une maîtrise des
          contrastes et une recherche constante de justesse donnent naissance à des
          créations qui accompagnent le rythme de la soirée, bien au-delà du simple
          dîner.
        </p>

        <div style={reveal(380)}>
          <Link
            href="/cuisine"
            className="group mt-11 inline-flex items-center gap-3 border border-[#B87D29]/50 px-8 py-4 font-[family-name:var(--font-mono)] text-[0.68rem] font-medium uppercase tracking-[0.3em] text-[#F5EAD6] transition-colors duration-300 hover:border-[#B87D29] hover:bg-[#B87D29] hover:text-[#1A3F47]"
          >
            L&apos;univers du Chef
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>

      {/* ── Infinite auto-scrolling image strip ─────────── */}
      <div
        className="group relative mt-16 w-full overflow-hidden md:mt-20"
        style={reveal(300)}
      >
        <div className="anzar-marquee flex w-max gap-5 group-hover:[animation-play-state:paused]">
          {loop.map((s, i) => (
            <div
              key={i}
              className="relative h-[300px] w-[225px] shrink-0 overflow-hidden md:h-[380px] md:w-[285px]"
            >
              <Image
                src={s.src}
                alt={s.alt}
                fill
                sizes="285px"
                loading="eager"
                className="object-cover object-center"
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,rgba(10,32,36,0.35)_0%,transparent_50%)]" />
            </div>
          ))}
        </div>

        {/* edge fades into the wine background */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#1A3F47] to-transparent md:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#1A3F47] to-transparent md:w-28" />
      </div>

      <style jsx global>{`
        @keyframes anzarMarquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .anzar-marquee {
          animation: anzarMarquee 45s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .anzar-marquee {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}