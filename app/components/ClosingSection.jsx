"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Archivo, Poppins } from "next/font/google";

/**
 * ANZAR — Closing block: VIP salon + Dress code + Le Cercle Anzar + Footer
 * ---------------------------------------------------------------
 * Images:  /public/vip.jpg      (private salon — full-bleed)
 *          /public/logo.png     (footer logo)
 *
 * Newsletter: the modal POSTs { email, phone } to /api/cercle.
 * Create that route to store subscribers in your database, e.g.:
 *   // app/api/cercle/route.js
 *   export async function POST(req) {
 *     const { email, phone } = await req.json();
 *     // ...insert into DB...
 *     return Response.json({ ok: true });
 *   }
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

/* ── icons ─────────────────────────────────────────────────── */
const Ig = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.3" cy="6.7" r="0.7" fill="currentColor" stroke="none" />
  </svg>
);
const Wa = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" {...p}>
    <path d="M20 12a8 8 0 0 1-11.8 7L4 20l1.1-4A8 8 0 1 1 20 12Z" />
  </svg>
);
const Mail = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m4 7 8 6 8-6" />
  </svg>
);

export default function ClosingSection() {
  const vipRef = useRef(null);
  const [vipIn, setVipIn] = useState(false);

  const dressRef = useRef(null);
  const [dressOpen, setDressOpen] = useState(false);

  const [cercleOpen, setCercleOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  /* VIP reveal */
  useEffect(() => {
    const el = vipRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setVipIn(true), io.disconnect()),
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* Dress code: close on outside click */
  useEffect(() => {
    if (!dressOpen) return;
    const onDown = (e) => {
      if (dressRef.current && !dressRef.current.contains(e.target)) setDressOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [dressOpen]);

  /* Modal: lock scroll + escape */
  useEffect(() => {
    document.body.style.overflow = cercleOpen ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && setCercleOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [cercleOpen]);

  const submit = async (e) => {
    e.preventDefault();
    if (!/.+@.+\..+/.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      const r = await fetch("/api/cercle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, phone }),
      });
      if (!r.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const vipReveal = (d = 0) => ({
    opacity: vipIn ? 1 : 0,
    transform: vipIn ? "translateY(0)" : "translateY(22px)",
    transition: `opacity 950ms ease ${d}ms, transform 950ms cubic-bezier(0.16,1,0.3,1) ${d}ms`,
  });

  return (
    <div className={`${mono.variable} ${body.variable} text-[#F5EAD6]`}>
      {/* ══ VIP — cinematic full-bleed ═══════════════════════ */}
      <section
        ref={vipRef}
        className="relative flex min-h-[78vh] w-full items-center justify-center overflow-hidden bg-[#1E0709] py-24 text-center md:min-h-[86vh]"
      >
        <div className="absolute inset-0 anzar-vip-zoom">
          <Image src="/vip.jpg" alt="Salon privé d'Anzar" fill sizes="100vw" className="object-cover object-center" />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_50%,rgba(30,7,9,0.55)_0%,rgba(30,7,9,0.9)_100%)]" />

        <div className="relative mx-auto max-w-2xl px-6">
          <p
            className="mb-6 font-[family-name:var(--font-mono)] text-[0.62rem] font-medium uppercase tracking-[0.42em] text-[#B87D29]"
            style={vipReveal(80)}
          >
            Salons privés
          </p>
          <h2
            className="font-[family-name:var(--font-display)] text-[clamp(2.3rem,5vw,4rem)] font-light leading-[1.04] tracking-[-0.02em]"
            style={vipReveal(180)}
          >
            L&apos;art de recevoir,{" "}
            <span className="text-[#B87D29]">en toute intimité.</span>
          </h2>
          <p
            className="mx-auto mt-7 max-w-xl font-[family-name:var(--font-body)] text-[1rem] font-light leading-[1.9] text-[#F5EAD6]/85"
            style={vipReveal(300)}
          >
            À l&apos;écart de l&apos;effervescence, nos salons privés offrent un
            écrin confidentiel où recevoir prend une tout autre dimension. Un
            espace imaginé pour célébrer, partager et créer des instants
            d&apos;exception, dans la plus grande discrétion.
          </p>
          <div style={vipReveal(430)}>
            <Link
              href="/vip"
              className="group mt-11 inline-flex items-center gap-3 border border-[#B87D29]/60 bg-[#1E0709]/30 px-9 py-4 font-[family-name:var(--font-mono)] text-[0.68rem] font-medium uppercase tracking-[0.3em] text-[#F5EAD6] backdrop-blur-sm transition-colors duration-300 hover:border-[#B87D29] hover:bg-[#B87D29] hover:text-[#1E0709]"
            >
              Réserver votre salon VIP
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ══ Dress code + Le Cercle Anzar ═════════════════════ */}
      <section className="border-t border-[#B87D29]/12 bg-[#1A0709] px-6 py-20 md:px-16">
        <div className="mx-auto grid max-w-5xl gap-14 md:grid-cols-2 md:gap-24">
          {/* Dress code */}
          <div ref={dressRef}>
            <p className="mb-5 font-[family-name:var(--font-mono)] text-[0.6rem] uppercase tracking-[0.4em] text-[#B87D29]">
              Avant de venir
            </p>
            <button
              onClick={() => setDressOpen((v) => !v)}
              className="group flex items-center gap-3 font-[family-name:var(--font-display)] text-[1.9rem] font-light tracking-tight text-[#F5EAD6] transition-colors hover:text-[#B87D29]"
              aria-expanded={dressOpen}
            >
              Dress code
              <span
                className={`text-[#B87D29] transition-transform duration-300 ${dressOpen ? "rotate-45" : ""}`}
              >
                +
              </span>
            </button>
            <div
              className="grid transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                gridTemplateRows: dressOpen ? "1fr" : "0fr",
                opacity: dressOpen ? 1 : 0,
              }}
            >
              <div className="overflow-hidden">
                <p className="mt-5 max-w-md font-[family-name:var(--font-body)] text-[0.92rem] font-light leading-[1.85] text-[#F5EAD6]/75">
                  Afin de préserver l&apos;élégance et l&apos;atmosphère de la
                  Maison, une tenue chic et élégante est exigée. Les tenues de
                  sport, de plage, les shorts ainsi que les casquettes ne sont pas
                  autorisés. La Direction se réserve le droit de refuser
                  l&apos;accès à toute personne ne respectant pas ce dress code.
                </p>
              </div>
            </div>
          </div>

          {/* Le Cercle Anzar */}
          <div>
            <p className="mb-5 font-[family-name:var(--font-mono)] text-[0.6rem] uppercase tracking-[0.4em] text-[#B87D29]">
              Rejoindre
            </p>
            <h3 className="font-[family-name:var(--font-display)] text-[1.9rem] font-light tracking-tight text-[#F5EAD6]">
              Le Cercle Anzar
            </h3>
            <p className="mt-5 max-w-md font-[family-name:var(--font-body)] text-[0.92rem] font-light leading-[1.85] text-[#F5EAD6]/75">
              Recevez en avant-première nos soirées, nos artistes invités, nos
              nouvelles créations et nos invitations exclusives.
            </p>
            <button
              onClick={() => {
                setStatus("idle");
                setCercleOpen(true);
              }}
              className="group mt-7 inline-flex items-center gap-3 border border-[#B87D29]/50 px-8 py-3.5 font-[family-name:var(--font-mono)] text-[0.66rem] font-medium uppercase tracking-[0.3em] text-[#F5EAD6] transition-colors duration-300 hover:border-[#B87D29] hover:bg-[#B87D29] hover:text-[#1A0709]"
            >
              Rejoindre le Cercle
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* ══ Footer ═══════════════════════════════════════════ */}
      <footer className="border-t border-[#B87D29]/12 bg-[#150607] px-6 py-16 md:px-16">
        <div className="mx-auto max-w-6xl">
          {/* Anzar */}
          <div className="flex justify-center">
            <Image src="/logo.png" alt="Anzar" width={170} height={54} className="h-14 w-auto object-contain" />
          </div>

          <div className="mt-14 grid gap-10 text-center sm:grid-cols-3 sm:text-left">
            <div>
              <p className="mb-3 font-[family-name:var(--font-mono)] text-[0.56rem] uppercase tracking-[0.34em] text-[#B87D29]">
                Adresse
              </p>
              <p className="font-[family-name:var(--font-body)] text-sm font-light leading-relaxed text-[#F5EAD6]/80">
                Marina Bay, Ave Mohammed VI
                <br />
                Tanger, Maroc
              </p>
            </div>
            <div>
              <p className="mb-3 font-[family-name:var(--font-mono)] text-[0.56rem] uppercase tracking-[0.34em] text-[#B87D29]">
                Ouverture
              </p>
              <p className="font-[family-name:var(--font-body)] text-sm font-light leading-relaxed text-[#F5EAD6]/80">
                Mardi — Dimanche · 19h30 – 04h00
                <br />
                Live band &amp; shows
                <br />
                Cuisine orientale raffinée
              </p>
            </div>
            <div>
              <p className="mb-3 font-[family-name:var(--font-mono)] text-[0.56rem] uppercase tracking-[0.34em] text-[#B87D29]">
                Réservations &amp; événements
              </p>
              <p className="font-[family-name:var(--font-body)] text-sm font-light leading-relaxed text-[#F5EAD6]/80">
                <a href="tel:+212666172897" className="hover:text-[#B87D29]">+212 6 66 17 28 97</a>
                <br />
                <a href="tel:+212539336663" className="hover:text-[#B87D29]">+212 5 39 33 66 63</a>
                <br />
                <a href="mailto:reservations@anzar.com" className="hover:text-[#B87D29]">reservations@anzar.com</a>
              </p>
            </div>
          </div>

          {/* Autres adresses */}
          <div className="mt-16 border-t border-[#F5EAD6]/10 pt-12 text-center">
            <p className="font-[family-name:var(--font-mono)] text-[0.6rem] uppercase tracking-[0.4em] text-[#B87D29]">
              Découvrez nos autres adresses
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-x-14 gap-y-8">
              {[
                { src: "/guepard.png", alt: "Guépard", cls: "h-7 md:h-7" },
                { src: "/tangerino.png", alt: "Tangerino", cls: "h-7 md:h-7" },
                { src: "/chiringuito.png", alt: "Chiringuito", cls: "h-10 md:h-12" },
              ].map((l) => (
                <div key={l.src} className="opacity-80">
                  <Image
                    src={l.src}
                    alt={l.alt}
                    width={160}
                    height={52}
                    className={`${l.cls} w-auto object-contain`}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-14 flex flex-col items-center justify-between gap-6 border-t border-[#F5EAD6]/10 pt-8 sm:flex-row">
            <div className="flex items-center gap-6 text-[#F5EAD6]/55">
              <a href="https://instagram.com" aria-label="Instagram" className="hover:text-[#B87D29]"><Ig className="h-[18px] w-[18px]" /></a>
              <a href="https://wa.me/212666172897" aria-label="WhatsApp" className="hover:text-[#B87D29]"><Wa className="h-[18px] w-[18px]" /></a>
              <a href="mailto:reservations@anzar.com" aria-label="Email" className="hover:text-[#B87D29]"><Mail className="h-[18px] w-[18px]" /></a>
            </div>
            <p className="font-[family-name:var(--font-mono)] text-[0.56rem] uppercase tracking-[0.28em] text-[#F5EAD6]/45">
              © {new Date().getFullYear()} Anzar — Oriental Fine Dining &amp; Atmosphere
            </p>
          </div>
        </div>
      </footer>

      {/* ══ Le Cercle Anzar — modal ══════════════════════════ */}
      <div
        className={`fixed inset-0 z-[70] flex items-center justify-center px-6 transition-opacity duration-300 ${
          cercleOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!cercleOpen}
      >
        <div className="absolute inset-0 bg-[#120506]/85 backdrop-blur-sm" onClick={() => setCercleOpen(false)} />

        <div
          className={`relative w-full max-w-md border border-[#B87D29]/25 bg-[#1E0709] p-8 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)] transition-all duration-300 md:p-10 ${
            cercleOpen ? "translate-y-0 scale-100" : "translate-y-4 scale-95"
          }`}
        >
          <button
            onClick={() => setCercleOpen(false)}
            aria-label="Fermer"
            className="absolute right-5 top-5 text-[#F5EAD6]/60 transition-colors hover:text-[#B87D29]"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>

          <p className="mb-3 font-[family-name:var(--font-mono)] text-[0.58rem] uppercase tracking-[0.4em] text-[#B87D29]">
            Le Cercle Anzar
          </p>

          {status === "success" ? (
            <div className="py-6 text-center">
              <h3 className="font-[family-name:var(--font-display)] text-2xl font-light text-[#F5EAD6]">
                Bienvenue dans le Cercle.
              </h3>
              <p className="mt-3 font-[family-name:var(--font-body)] text-sm font-light text-[#F5EAD6]/70">
                Vous recevrez nos invitations et actualités en avant-première.
              </p>
              <button
                onClick={() => setCercleOpen(false)}
                className="mt-7 border border-[#B87D29]/50 px-7 py-3 font-[family-name:var(--font-mono)] text-[0.64rem] uppercase tracking-[0.3em] text-[#F5EAD6] transition-colors hover:bg-[#B87D29] hover:text-[#1E0709]"
              >
                Fermer
              </button>
            </div>
          ) : (
            <>
              <h3 className="font-[family-name:var(--font-display)] text-2xl font-light leading-tight text-[#F5EAD6]">
                Nos invitations exclusives.
              </h3>
              <p className="mt-3 font-[family-name:var(--font-body)] text-sm font-light leading-relaxed text-[#F5EAD6]/70">
                Soirées, artistes invités et nouvelles créations, en avant-première.
              </p>

              <form onSubmit={submit} className="mt-7 space-y-4">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Adresse e-mail"
                  className="w-full border border-[#F5EAD6]/20 bg-transparent px-4 py-3 font-[family-name:var(--font-body)] text-sm text-[#F5EAD6] placeholder:text-[#F5EAD6]/40 outline-none transition-colors focus:border-[#B87D29]"
                />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Téléphone (optionnel)"
                  className="w-full border border-[#F5EAD6]/20 bg-transparent px-4 py-3 font-[family-name:var(--font-body)] text-sm text-[#F5EAD6] placeholder:text-[#F5EAD6]/40 outline-none transition-colors focus:border-[#B87D29]"
                />

                {status === "error" && (
                  <p className="font-[family-name:var(--font-mono)] text-[0.62rem] uppercase tracking-[0.2em] text-[#E08a7a]">
                    Une erreur est survenue. Vérifiez votre e-mail et réessayez.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-[#B87D29] px-8 py-3.5 font-[family-name:var(--font-mono)] text-[0.66rem] font-medium uppercase tracking-[0.3em] text-[#1E0709] transition-opacity hover:opacity-90 disabled:opacity-60"
                >
                  {status === "loading" ? "Envoi…" : "Rejoindre le Cercle"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>

      <style jsx global>{`
        @keyframes anzarVipZoom { from { transform: scale(1); } to { transform: scale(1.1); } }
        .anzar-vip-zoom { animation: anzarVipZoom 20s ease-out forwards; }
        @media (prefers-reduced-motion: reduce) { .anzar-vip-zoom { animation: none; } }
      `}</style>
    </div>
  );
}