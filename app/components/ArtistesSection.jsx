"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Archivo, Poppins } from "next/font/google";

/**
 * ANZAR — Section "Quand la nuit entre en scène" (artistes)
 * Interactive line-up showcase.
 *  - Desktop: editorial numbered list drives the feature image.
 *  - Mobile: compact thumbnail controls sit right under the image.
 * ---------------------------------------------------------------
 * Images:  /public/scene-1.jpg  /public/scene-2.jpg  /public/scene-3.jpg
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

const ACTS = [
  { src: "/scene-1.jpg", label: "Musiciens", sub: "Live band" },
  { src: "/scene-2.jpg", label: "Danseuses", sub: "Performance" },
  { src: "/scene-3.jpg", label: "Chanteurs", sub: "Voix live" },
];

export default function ArtistesSection() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const [active, setActive] = useState(0);

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

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % ACTS.length), 4500);
    return () => clearInterval(id);
  }, []);

  const reveal = (delay = 0) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(22px)",
    transition: `opacity 900ms ease ${delay}ms, transform 900ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  });

  const CTA = (
    <Link
      href="/artistes"
      className="group inline-flex items-center gap-3 border border-[#B08035]/50 px-8 py-4 font-[family-name:var(--font-mono)] text-[0.68rem] font-medium uppercase tracking-[0.3em] text-[#F5EAD6] transition-colors duration-300 hover:border-[#C99A45] hover:bg-[#B08035] hover:text-[#3A0F16]"
    >
      Toute la programmation
      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </Link>
  );

  return (
    <section
      ref={ref}
      className={`${mono.variable} ${body.variable} relative w-full overflow-hidden bg-[#3A0F16] px-6 py-16 text-[#F5EAD6] md:px-16 md:py-28`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_78%_45%,rgba(122,47,56,0.5)_0%,transparent_62%)]" />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-10 md:grid md:grid-cols-[1fr_1.05fr] md:items-center md:gap-20">
        {/* ── Text (+ desktop list) ───────────────────────── */}
        <div className="md:order-1">
          <p
            className="mb-6 flex items-center gap-4 font-[family-name:var(--font-mono)] text-[0.62rem] font-medium uppercase tracking-[0.4em] text-[#B08035]"
            style={reveal(80)}
          >
            <span className="h-px w-8 bg-[#B08035]/60" />
            La programmation
          </p>

          <h2
            className="font-[family-name:var(--font-display)] text-[clamp(2.2rem,4.4vw,3.6rem)] font-light leading-[1.04] tracking-[-0.02em]"
            style={reveal(160)}
          >
            Quand la nuit{" "}
            <span className="text-[#C99A45]">entre en scène.</span>
          </h2>

          <p
            className="mt-7 max-w-md font-[family-name:var(--font-body)] text-[1rem] font-light leading-[1.9] text-[#F5EAD6]/82"
            style={reveal(260)}
          >
            À mesure que la soirée se dévoile, les lumières changent, les premiers
            accords résonnent et la scène s&apos;anime. Chanteurs, musiciens et
            danseuses se succèdent — chaque apparition donne un nouveau souffle à
            la nuit.
          </p>

          {/* Desktop-only editorial list */}
          <ul className="mt-10 hidden md:block" style={reveal(340)}>
            {ACTS.map((a, i) => {
              const on = i === active;
              return (
                <li key={a.label}>
                  <button
                    onClick={() => setActive(i)}
                    className="group flex w-full items-center gap-5 border-t border-[#F5EAD6]/12 py-4 text-left last:border-b"
                  >
                    <span
                      className={`font-[family-name:var(--font-mono)] text-[0.7rem] tracking-widest transition-colors ${
                        on ? "text-[#C99A45]" : "text-[#F5EAD6]/40"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`flex-1 font-[family-name:var(--font-display)] text-[1.75rem] font-light tracking-tight transition-colors ${
                        on ? "text-[#F5EAD6]" : "text-[#F5EAD6]/45 group-hover:text-[#F5EAD6]/75"
                      }`}
                    >
                      {a.label}
                    </span>
                    <span
                      className={`font-[family-name:var(--font-mono)] text-[0.58rem] uppercase tracking-[0.28em] transition-colors ${
                        on ? "text-[#B08035]" : "text-[#F5EAD6]/25"
                      }`}
                    >
                      {a.sub}
                    </span>
                    <span
                      className={`h-px bg-[#C99A45] transition-all duration-500 ${on ? "w-8" : "w-0"}`}
                    />
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Desktop CTA */}
          <div className="mt-10 hidden md:block" style={reveal(440)}>
            {CTA}
          </div>
        </div>

        {/* ── Feature showcase + mobile controls ──────────── */}
        <div className="md:order-2" style={reveal(120)}>
          <div className="relative">
            {/* corner brackets */}
            <span className="pointer-events-none absolute -left-3 -top-3 z-20 hidden h-8 w-8 border-l border-t border-[#B08035]/60 md:block" />
            <span className="pointer-events-none absolute -bottom-3 -right-3 z-20 hidden h-8 w-8 border-b border-r border-[#B08035]/60 md:block" />

            <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#1A0708] md:aspect-[4/5]">
              {ACTS.map((a, i) => (
                <Image
                  key={a.src}
                  src={a.src}
                  alt={a.label}
                  fill
                  sizes="(max-width: 768px) 100vw, 48vw"
                  loading="eager"
                  className="object-cover object-center transition-all duration-[1400ms] ease-out"
                  style={{
                    opacity: i === active ? 1 : 0,
                    transform: i === active ? "scale(1)" : "scale(1.06)",
                  }}
                />
              ))}

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#160607] via-[#160607]/10 to-transparent" />

              <div className="absolute right-5 top-5 font-[family-name:var(--font-mono)] text-[0.7rem] tracking-[0.2em] text-[#F5EAD6]/80">
                {String(active + 1).padStart(2, "0")}
                <span className="text-[#F5EAD6]/40"> / {String(ACTS.length).padStart(2, "0")}</span>
              </div>

              <div className="absolute inset-x-5 bottom-5">
                <div className="mb-2 flex items-center gap-3">
                  <span className="h-px w-6 bg-[#C99A45]" />
                  <span className="font-[family-name:var(--font-mono)] text-[0.56rem] uppercase tracking-[0.32em] text-[#C99A45]">
                    Sur scène
                  </span>
                </div>
                <span
                  key={active}
                  className="anzar-label block font-[family-name:var(--font-display)] text-[2.4rem] font-light leading-none tracking-tight text-[#F5EAD6] md:text-[3rem]"
                >
                  {ACTS[active].label}
                </span>
              </div>
            </div>
          </div>

          {/* Mobile-only thumbnail controls (right under the image) */}
          <div className="mt-3 grid grid-cols-3 gap-2 md:hidden">
            {ACTS.map((a, i) => {
              const on = i === active;
              return (
                <button
                  key={a.label}
                  onClick={() => setActive(i)}
                  className={`relative aspect-[4/3] overflow-hidden border transition-all ${
                    on ? "border-[#C99A45]" : "border-transparent opacity-60"
                  }`}
                  aria-label={a.label}
                >
                  <Image src={a.src} alt={a.label} fill sizes="33vw" loading="eager" className="object-cover" />
                  <div className="absolute inset-0 bg-[#160607]/30" />
                  <span className="absolute bottom-1.5 left-1.5 font-[family-name:var(--font-mono)] text-[0.5rem] uppercase tracking-[0.15em] text-[#F5EAD6]">
                    {a.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Mobile CTA */}
          <div className="mt-8 md:hidden">{CTA}</div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes anzarLabel {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .anzar-label {
          animation: anzarLabel 700ms cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </section>
  );
}