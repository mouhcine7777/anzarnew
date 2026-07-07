"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Archivo, Poppins } from "next/font/google";

/**
 * ANZAR — Section "L'instant où la soirée prend une nouvelle dimension" (bar)
 * Circular disc motif (charte badge/coaster) with rotating Amazigh rings.
 * ---------------------------------------------------------------
 * Image:  /public/bar.jpg   (a moody signature cocktail — square/centered crop)
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

export default function BarSection() {
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
    transition: `opacity 950ms ease ${delay}ms, transform 950ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  });

  return (
    <section
      ref={ref}
      className={`${mono.variable} ${body.variable} relative w-full overflow-hidden bg-[#0E2E35] px-6 py-20 text-[#F5EAD6] md:px-16 md:py-28`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_78%_45%,rgba(34,84,92,0.5)_0%,transparent_62%)]" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-16 md:grid-cols-[1fr_1.15fr] md:gap-20">
        {/* ── Text ────────────────────────────────────────── */}
        <div className="order-2 md:order-1">
          <p
            className="mb-6 flex items-center gap-4 font-[family-name:var(--font-mono)] text-[0.62rem] font-medium uppercase tracking-[0.4em] text-[#B87D29]"
            style={reveal(80)}
          >
            <span className="h-px w-8 bg-[#B87D29]/70" />
            Les signatures du Bar
          </p>

          <h2
            className="font-[family-name:var(--font-display)] text-[clamp(2.2rem,4.6vw,3.7rem)] font-light leading-[1.05] tracking-[-0.02em]"
            style={reveal(180)}
          >
            L&apos;instant où la soirée prend une{" "}
            <span className="text-[#B87D29]">nouvelle dimension.</span>
          </h2>

          <p
            className="mt-8 max-w-lg font-[family-name:var(--font-body)] text-[1rem] font-light leading-[1.9] text-[#F5EAD6]/85"
            style={reveal(300)}
          >
            À la tombée de la nuit, le bar devient un véritable théâtre de
            créations. Les gestes se font précis, les verres s&apos;animent et les
            signatures prennent vie au rythme de la soirée. Chaque cocktail est
            imaginé comme une composition, où les plus beaux spiritueux rencontrent
            des ingrédients soigneusement sélectionnés.
          </p>

          <div style={reveal(430)}>
            <Link
              href="/bar"
              className="group mt-11 inline-flex items-center gap-3 border border-[#B87D29]/50 px-8 py-4 font-[family-name:var(--font-mono)] text-[0.68rem] font-medium uppercase tracking-[0.3em] text-[#F5EAD6] transition-colors duration-300 hover:border-[#B87D29] hover:bg-[#B87D29] hover:text-[#0E2E35]"
            >
              Découvrir les signatures du bar
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>

        {/* ── Circular disc + rotating rings ──────────────── */}
        <div className="relative order-1 mx-auto w-full max-w-[560px] md:order-2" style={reveal(140)}>
          <div className="relative aspect-square w-full">
            {/* soft glow */}
            <div className="absolute inset-4 rounded-full bg-[#B87D29]/10 blur-2xl" />

            {/* outer rotating ring */}
            <svg className="anzar-spin-slow absolute inset-0 h-full w-full" viewBox="0 0 200 200" fill="none" aria-hidden="true">
              <circle cx="100" cy="100" r="98" stroke="#BC8B3A" strokeWidth="0.5" strokeDasharray="1.5 7" opacity="0.7" />
              {Array.from({ length: 24 }).map((_, i) => {
                const a = (i / 24) * Math.PI * 2;
                // Round to a fixed precision so the server- and client-rendered
                // strings match exactly (avoids a hydration mismatch from
                // last-digit float differences in Math.cos/Math.sin).
                const x1 = (100 + Math.cos(a) * 92).toFixed(3);
                const y1 = (100 + Math.sin(a) * 92).toFixed(3);
                const x2 = (100 + Math.cos(a) * 96).toFixed(3);
                const y2 = (100 + Math.sin(a) * 96).toFixed(3);
                return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#BC8B3A" strokeWidth="0.6" opacity="0.6" />;
              })}
            </svg>

            {/* inner counter-rotating dotted ring */}
            <svg className="anzar-spin-rev absolute inset-[4%] h-[92%] w-[92%]" viewBox="0 0 200 200" fill="none" aria-hidden="true">
              <circle cx="100" cy="100" r="97" stroke="#B87D29" strokeWidth="0.7" strokeDasharray="0.5 9" opacity="0.65" />
            </svg>

            {/* image disc — enlarged */}
            <div className="absolute inset-[7%] overflow-hidden rounded-full ring-1 ring-[#B87D29]/40">
              <Image
                src="/bar.jpg"
                alt="Cocktail signature d'Anzar"
                fill
                sizes="(max-width: 768px) 86vw, 48vw"
                className="anzar-disc-zoom object-cover object-center"
              />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(8,26,30,0.5)_0%,transparent_55%)]" />
            </div>

            {/* top marker dot */}
            <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[#B87D29]" />
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes anzarSpin { to { transform: rotate(360deg); } }
        @keyframes anzarSpinRev { to { transform: rotate(-360deg); } }
        .anzar-spin-slow { animation: anzarSpin 60s linear infinite; transform-origin: center; }
        .anzar-spin-rev { animation: anzarSpinRev 45s linear infinite; transform-origin: center; }
        @keyframes anzarDiscZoom { from { transform: scale(1); } to { transform: scale(1.08); } }
        .anzar-disc-zoom { animation: anzarDiscZoom 20s ease-out forwards; }
        @media (prefers-reduced-motion: reduce) {
          .anzar-spin-slow, .anzar-spin-rev, .anzar-disc-zoom { animation: none; }
        }
      `}</style>
    </section>
  );
}