"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Archivo, Poppins } from "next/font/google";

/**
 * ANZAR — Section "L'univers"
 * Rich wine/burgundy intro block + Amazigh decorative edge strips.
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

/* Amazigh motif — decorative edge strip (charte "univers graphique") */
function AmazighStrip({ className = "", id = "anzar-amazigh-u" }) {
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

export default function UniversSection() {
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
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const reveal = (delay = 0) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(22px)",
    transition: `opacity 900ms ease ${delay}ms, transform 900ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  });

  return (
    <section
      ref={ref}
      className={`${mono.variable} ${body.variable} relative w-full overflow-hidden bg-[#1A3F47] px-6 py-24 text-[#F5EAD6] md:px-16 md:py-24`}
    >
      {/* Subtle warmth + vignette so the burgundy has depth, staying close to the maquette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(85%_65%_at_50%_18%,rgba(20,58,64,0.5)_0%,transparent_65%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_120%,rgba(10,32,36,0.55)_0%,transparent_60%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{ backgroundImage: GRAIN, backgroundSize: "140px 140px" }}
      />

      {/* Decorative Amazigh edge strips (left + right) */}
      <AmazighStrip id="amz-u-left" className="pointer-events-none absolute left-0 top-0 hidden h-full w-[38px] opacity-70 md:block" />
      <AmazighStrip id="amz-u-right" className="pointer-events-none absolute right-0 top-0 hidden h-full w-[38px] opacity-70 md:block" />

      <div className="relative mx-auto max-w-4xl text-center">
        {/* Eyebrow */}
        <p
          className="mb-8 font-[family-name:var(--font-mono)] text-[0.62rem] font-medium uppercase tracking-[0.4em] text-[#BC8B3A]"
          style={reveal(0)}
        >
          L&apos;univers d&apos;Anzar
        </p>

        {/* Heading */}
        <h2
          className="font-[family-name:var(--font-display)] text-[clamp(2.2rem,4.4vw,3.6rem)] font-light leading-[1.04] tracking-[-0.02em]"
          style={reveal(100)}
        >
          Il y a des nuits que l&apos;on prévoit.{" "}
          <span className="text-[#B87D29]">Et d&apos;autres qui s&apos;imposent.</span>
        </h2>

        {/* Divider */}
        <div
          className="mx-auto my-12 flex items-center justify-center gap-3"
          style={reveal(180)}
        >
          <span className="h-px w-12 bg-[#BC8B3A]/45" />
          <span className="h-1 w-1 rotate-45 bg-[#BC8B3A]" />
          <span className="h-px w-12 bg-[#BC8B3A]/45" />
        </div>

        {/* Body — single paragraph */}
        <p
          className="mx-auto max-w-2xl font-[family-name:var(--font-body)] text-[1rem] font-light leading-[1.9] text-[#F5EAD6]/82"
          style={reveal(260)}
        >
          À Anzar, la soirée se révèle par étapes. Elle s&apos;ouvre autour
          d&apos;une table où la cuisine donne le ton, puis laisse place à une
          atmosphère qui gagne en intensité — les lumières se tamisent, les
          premières notes s&apos;élèvent, les artistes entrent en scène. Pensée
          comme une véritable mise en scène, la Maison réunit l&apos;art de la
          table, la musique et les performances dans un même mouvement, et vous
          porte jusqu&apos;aux premières heures du matin.
        </p>

        {/* CTA */}
        <div style={reveal(440)}>
          <Link
            href="/univers"
            className="group mt-14 inline-flex items-center gap-3 border border-[#BC8B3A]/50 px-8 py-4 font-[family-name:var(--font-mono)] text-[0.68rem] font-medium uppercase tracking-[0.3em] text-[#F5EAD6] transition-colors duration-300 hover:border-[#B87D29] hover:bg-[#BC8B3A] hover:text-[#1A3F47]"
          >
            Découvrir l&apos;univers
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}