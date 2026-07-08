"use client";

import Link from "next/link";
import { Archivo } from "next/font/google";

/**
 * ANZAR — Hero Section (editorial, pro)
 * ---------------------------------------------------------------
 * Background:  /public/bg.jpg
 * Sits under the fixed <Header /> — no top offset needed.
 * ---------------------------------------------------------------
 */


const mono = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/* ── Inline icons ─────────────────────────────────────────── */
const Ig = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.3" cy="6.7" r="0.7" fill="currentColor" stroke="none" />
  </svg>
);
const Phone = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" {...p}>
    <path d="M6.5 3.5 9 4l1 3.5-1.6 1.4a12 12 0 0 0 5.7 5.7L15.5 16l3.5 1 .5 2.5a1.5 1.5 0 0 1-1.6 1.5A16 16 0 0 1 3 6.1 1.5 1.5 0 0 1 4.5 4.5Z" />
  </svg>
);
const Whatsapp = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" {...p}>
    <path d="M20 12a8 8 0 0 1-11.8 7L4 20l1.1-4A8 8 0 1 1 20 12Z" />
    <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5.6 0 1-.6 1-1.2 0-.3-1.6-1-1.9-.8-.5.4-.8.7-1.4.2s-1.4-1.6-1.5-2c-.1-.5.5-.7.7-1.1.2-.4-.6-2-.9-2-.6 0-1.5.4-1.5 1.4Z" />
  </svg>
);
const Pin = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" {...p}>
    <path d="M12 21s6.5-5.6 6.5-10.2A6.5 6.5 0 0 0 5.5 10.8C5.5 15.4 12 21 12 21Z" />
    <circle cx="12" cy="10.5" r="2.3" />
  </svg>
);

const SOCIAL = [
  { Icon: Ig, href: "https://instagram.com", label: "Instagram" },
  { Icon: Phone, href: "tel:+212666172897", label: "Téléphone" },
  { Icon: Whatsapp, href: "https://wa.me/212666172897", label: "WhatsApp" },
  { Icon: Pin, href: "#adresse", label: "Adresse" },
];

/* Corner registration mark */
const Corner = ({ className }) => (
  <span className={`pointer-events-none absolute z-20 h-4 w-4 border-[#BC8B3A]/40 ${className}`} />
);

export default function HeroSection() {
  return (
    <section
      className={`${mono.variable} relative flex h-[100svh] min-h-[680px] w-full flex-col overflow-hidden bg-[#07171A] text-[#EFE7D6]`}
    >
      {/* Background — looping video, settles from a slight scale on load.
          Poster (/bg.jpg) shows instantly while the 1.2 MB clip loads. */}
      <div className="absolute inset-0 anzar-settle">
        <video
          className="h-full w-full object-cover object-center"
          src="/vidbg.mp4"
          poster="/bg.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />
      </div>

      {/* Grade */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(7,23,26,0.68)_0%,rgba(7,23,26,0.22)_36%,rgba(7,23,26,0.88)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_72%_18%,transparent_28%,rgba(4,15,18,0.82)_100%)]" />

      {/* Grain */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.10] mix-blend-overlay"
        style={{ backgroundImage: GRAIN, backgroundSize: "140px 140px" }}
      />

      {/* Corner registration marks */}
      <Corner className="left-5 top-24 border-l border-t md:left-8 md:top-28" />
      <Corner className="right-5 top-24 border-r border-t md:right-8 md:top-28" />
      <Corner className="bottom-6 left-5 border-b border-l md:bottom-8 md:left-8" />
      <Corner className="bottom-6 right-5 border-b border-r md:bottom-8 md:right-8" />

      {/* ── Left social rail (maquette) ─────────────────────── */}
      <aside className="absolute left-8 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-center gap-6 md:flex">
        <span className="mb-1 h-14 w-px bg-gradient-to-b from-transparent to-[#BC8B3A]/40" />
        {SOCIAL.map(({ Icon, href, label }) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            className="text-[#EFE7D6]/50 transition-all duration-300 hover:-translate-y-0.5 hover:text-[#B87D29]"
          >
            <Icon className="h-[18px] w-[18px]" />
          </a>
        ))}
        <span className="mt-1 h-14 w-px bg-gradient-to-t from-transparent to-[#BC8B3A]/40" />
      </aside>

      {/* ── Right-edge coordinates + label ──────────────────── */}
      <div className="anzar-fade absolute right-7 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-8 md:flex">
        <span className="rotate-90 whitespace-nowrap font-[family-name:var(--font-mono)] text-[0.58rem] uppercase tracking-[0.55em] text-[#EFE7D6]/40">
          Tanger — Maroc
        </span>
      </div>

      {/* ── Headline block, flush-left lower third ──────────── */}
      <div className="relative z-20 mt-auto max-w-5xl px-6 pb-16 md:px-16 md:pb-20">
        <p className="anzar-fade anzar-d0 mb-6 flex items-center gap-4 font-[family-name:var(--font-mono)] text-[0.62rem] uppercase tracking-[0.4em] text-[#BC8B3A]">
          <span className="h-px w-8 bg-[#BC8B3A]/60" />
          Dîner · Musique · Scène
        </p>

        <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.4rem,5.2vw,4.4rem)] font-light leading-[0.96] tracking-[-0.025em]">
          <span className="anzar-line block overflow-hidden">
            <span className="anzar-line-inner anzar-l1 block">Il y a des nuits</span>
          </span>
          <span className="anzar-line block overflow-hidden">
            <span className="anzar-line-inner anzar-l2 block">que l&apos;on prévoit.</span>
          </span>
          <span className="anzar-line mt-1 block overflow-hidden md:mt-2">
            <span className="anzar-line-inner anzar-l3 block text-[#B87D29]">
              Et d&apos;autres qui s&apos;imposent.
            </span>
          </span>
        </h1>

        <div className="anzar-fade anzar-lfoot mt-10 flex flex-col gap-7 sm:flex-row sm:items-center sm:gap-10">
          <Link
            href="/reservation"
            className="group inline-flex w-fit items-center gap-3 border border-[#BC8B3A]/45 px-8 py-4 font-[family-name:var(--font-mono)] text-[0.68rem] font-medium uppercase tracking-[0.3em] text-[#EFE7D6] transition-colors duration-300 hover:border-[#B87D29] hover:bg-[#BC8B3A]/[0.06]"
          >
            Réserver une table
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>

          <p className="font-[family-name:var(--font-mono)] text-[0.66rem] uppercase leading-relaxed tracking-[0.22em] text-[#EFE7D6]/55">
            Mardi — Dimanche
            <span className="mx-2 text-[#BC8B3A]/50">/</span>
            19:30 — 04:00
          </p>
        </div>

        {/* Mobile social row */}
        <div className="mt-9 flex items-center gap-7 md:hidden">
          {SOCIAL.map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="text-[#EFE7D6]/55 transition-colors hover:text-[#B87D29]"
            >
              <Icon className="h-[19px] w-[19px]" />
            </a>
          ))}
        </div>
      </div>

      {/* ── Scroll cue ──────────────────────────────────────── */}
      <div className="absolute bottom-7 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
        <span className="font-[family-name:var(--font-mono)] text-[0.55rem] uppercase tracking-[0.32em] text-[#EFE7D6]/40">
          Défiler
        </span>
        <span className="h-9 w-px overflow-hidden bg-[#EFE7D6]/12">
          <span className="anzar-scroll block h-3 w-px bg-[#BC8B3A]" />
        </span>
      </div>

      {/* ── Animations ──────────────────────────────────────── */}
      <style jsx global>{`
        @keyframes anzarSettle {
          from { transform: scale(1.12); }
          to { transform: scale(1); }
        }
        .anzar-settle {
          animation: anzarSettle 6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes anzarLine {
          from { transform: translateY(112%); }
          to { transform: translateY(0); }
        }
        .anzar-line-inner {
          transform: translateY(112%);
          animation: anzarLine 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .anzar-l1 { animation-delay: 0.15s; }
        .anzar-l2 { animation-delay: 0.28s; }
        .anzar-l3 { animation-delay: 0.44s; }
        @keyframes anzarFadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .anzar-fade {
          opacity: 0;
          animation: anzarFadeUp 1.1s ease-out 0.5s forwards;
        }
        .anzar-d0 { animation-delay: 0.1s; }
        .anzar-lfoot { animation-delay: 0.9s; }
        @keyframes anzarScroll {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(300%); }
        }
        .anzar-scroll {
          animation: anzarScroll 2s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .anzar-settle, .anzar-line-inner, .anzar-fade, .anzar-scroll {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}