import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Check, Globe, ShoppingCart, Shield, ArrowRight, Zap, Star, TrendingUp, Clock } from "lucide-react";
import { BorderBeam } from "@/components/ui/border-beam";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Meteors } from "@/components/ui/meteors";
import { MovingBorderButton } from "@/components/ui/moving-border";

// ── CountUp ──────────────────────────────────────────────
function CountUp({ to, suffix = "" }: { to: number | string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  const isNum = typeof to === "number";
  useEffect(() => {
    if (!inView || !isNum) return;
    let n = 0; const steps = 40;
    const id = setInterval(() => {
      n += (to as number) / steps;
      if (n >= (to as number)) { setVal(to as number); clearInterval(id); return; }
      setVal(Math.round(n));
    }, 600 / steps);
    return () => clearInterval(id);
  }, [inView, isNum, to]);
  return <span ref={ref}>{isNum ? val : to}{suffix}</span>;
}

// ── HERO ─────────────────────────────────────────────────
const WORDS = ["artisans", "commerçants", "restaurants", "PME locales", "indépendants"];

function HeroSection() {
  const [idx, setIdx] = useState(0);
  const nav = useNavigate();
  useEffect(() => {
    const id = setInterval(() => setIdx(p => (p + 1) % WORDS.length), 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden"
      style={{ padding: "clamp(110px,13vh,150px) 24px 80px" }}>

      {/* === BACKGROUND VIOLET avec Meteors === */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Radial violet principal */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 85% 60% at 50% -5%, rgba(123,47,255,0.45) 0%, transparent 70%)" }}/>
        {/* Radial cyan secondaire */}
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 45% 40% at 85% 20%, rgba(0,194,255,0.15) 0%, transparent 60%)" }}/>
        {/* Grille */}
        <div className="absolute inset-0" style={{
          backgroundImage: "linear-gradient(rgba(123,47,255,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(123,47,255,0.06) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
        }}/>
        {/* Meteors VIOLETS dans le hero */}
        <div className="absolute inset-0 overflow-hidden">
          <Meteors number={18} className="bg-violet-400 before:from-violet-400"/>
        </div>
        {/* Fondu bas */}
        <div className="absolute bottom-0 left-0 right-0 h-52" style={{ background: "linear-gradient(to bottom, transparent, #03030A)" }}/>
      </div>

      <div className="relative z-10 max-w-4xl w-full">
        {/* Badge */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-9 border"
          style={{ background: "rgba(123,47,255,0.12)", borderColor: "rgba(123,47,255,0.38)" }}>
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#7B2FFF", boxShadow: "0 0 10px #7B2FFF" }}/>
          <span style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 600, fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "#B090FF" }}>
            Agence Web Premium
          </span>
        </motion.div>

        {/* Titre H1 — overflow visible pour ne PAS couper les lettres */}
        <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22, ease: [0.22,1,0.36,1] }}
          className="text-white font-extrabold leading-tight overflow-visible mb-1"
          style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(34px,5.2vw,62px)", lineHeight: 1.1 }}>
          Votre présence en ligne,
        </motion.h1>

        {/* Mot rotatif — overflow visible, paddingBottom pour descentes (g, j, p, y) */}
        <div className="overflow-visible flex items-center justify-center mb-8"
          style={{ height: "clamp(50px,7.5vw,82px)" }}>
          <AnimatePresence mode="wait">
            <motion.span key={idx}
              initial={{ y: 64, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -64, opacity: 0 }}
              transition={{ duration: 0.44, ease: [0.22,1,0.36,1] }}
              className="block font-extrabold overflow-visible"
              style={{
                fontFamily: "Syne, sans-serif", fontSize: "clamp(34px,5.2vw,62px)", lineHeight: 1.1,
                paddingBottom: "6px", /* ← évite la coupure des g, j, p, y */
                background: "linear-gradient(135deg,#7B2FFF,#00C2FF)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>
              {WORDS[idx]}.
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Sous-titre blanc lisible */}
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.52 }}
          className="mx-auto mb-11" style={{ fontFamily: "DM Sans, sans-serif", fontSize: "clamp(15px,1.8vw,18px)", color: "rgba(255,255,255,0.80)", lineHeight: 1.75, maxWidth: "520px" }}>
          Sites web performants pour artisans, commerces et PME.<br/>Design sur-mesure, livraison en 14 jours.
        </motion.p>

        {/* CTAs */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.66 }}
          className="flex gap-4 justify-center flex-wrap">
          <button onClick={() => nav("/contact")}
            className="relative overflow-hidden px-10 py-4 rounded-xl font-semibold text-[15px] text-white border-none cursor-pointer transition-all duration-250"
            style={{ background: "linear-gradient(135deg,#7B2FFF,#00C2FF)", boxShadow: "0 8px 30px rgba(123,47,255,0.5)", fontFamily: "DM Sans, sans-serif" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 16px 42px rgba(123,47,255,0.7)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(123,47,255,0.5)"; }}>
            Démarrer mon projet →
          </button>
          <button onClick={() => nav("/services")}
            className="px-10 py-4 rounded-xl font-semibold text-[15px] text-white cursor-pointer border transition-all duration-250"
            style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.18)", fontFamily: "DM Sans, sans-serif" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(123,47,255,0.55)"; e.currentTarget.style.background = "rgba(123,47,255,0.1)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}>
            Découvrir nos services
          </button>
        </motion.div>
      </div>
    </section>
  );
}

// ── STATS avec GlowingEffect ──────────────────────────────
function StatsSection() {
  const stats = [
    { to: 14, suffix: "j", label: "Livraison moyenne", icon: Clock },
    { to: "4.9", suffix: "/5", label: "Satisfaction client", icon: Star },
    { to: 24, suffix: "h", label: "Réponse devis", icon: Zap },
    { to: "+180", suffix: "%", label: "Leads générés", icon: TrendingUp },
  ];
  return (
    <section className="relative z-10 max-w-6xl mx-auto px-6 pb-20">
      {/* Fond Meteors JAUNES/BLANCS dès cette section — transition depuis violet */}
      <div className="absolute -inset-x-40 -top-20 -bottom-20 overflow-hidden pointer-events-none opacity-40">
        <Meteors number={8} className="bg-yellow-200 before:from-yellow-200"/>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div key={s.label} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.09 }}>
              <div className="relative rounded-[20px] border p-[2px]" style={{ borderColor: "rgba(123,47,255,0.2)" }}>
                <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2}/>
                <div className="relative rounded-[18px] p-6 text-center" style={{ background: "linear-gradient(145deg,rgba(123,47,255,0.08),rgba(0,194,255,0.03))" }}>
                  <Icon size={18} className="mx-auto mb-2 opacity-50" style={{ color: "#7B2FFF" }}/>
                  <div className="font-extrabold mb-1" style={{ fontFamily: "Syne, sans-serif", fontSize: "clamp(28px,3.2vw,44px)", background: "linear-gradient(135deg,#7B2FFF,#00C2FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    <CountUp to={typeof s.to === "number" ? s.to : s.to} suffix={s.suffix}/>
                  </div>
                  <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.55)", margin: 0 }}>{s.label}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

// ── SERVICES avec GlowingEffect + BorderBeam ─────────────
const SERVICES = [
  { icon: Globe, color: "#00C2FF", price: "497€", id: "vitrine", title: "Site Vitrine Premium", desc: "Un site professionnel qui travaille pour vous 24h/24. Design moderne, SEO local, formulaire optimisé.", features: ["Design 100% sur-mesure", "1 à 5 pages stratégiques", "SEO local Google Maps", "Formulaire + notifications", "Hébergement 1 an offert", "Livraison 7–14 jours"] },
  { icon: ShoppingCart, color: "#7B2FFF", price: "747€", id: "ecommerce", title: "E-commerce Performance", desc: "Boutique complète avec tunnel d'achat optimisé, paiements sécurisés et dashboard intuitif.", features: ["Produits illimités", "Paiement Stripe & PayPal", "Gestion stocks & commandes", "Dashboard admin", "SEO e-commerce avancé", "Formation 2h incluse"], featured: true },
  { icon: Shield, color: "#10B981", price: "dès 39€/mois", id: "maintenance", title: "Maintenance & Croissance", desc: "Sécurité, vitesse et SEO en continu. Zéro effort de votre côté.", features: ["Sécurité & pare-feu actif", "Sauvegardes hebdomadaires", "Monitoring 24/7", "SEO continu", "Modifications incluses", "Rapport mensuel"] },
];

function ServicesSection() {
  const nav = useNavigate();
  return (
    <section className="relative z-10 max-w-6xl mx-auto px-6 py-20">
      <div className="text-center mb-14">
        <span style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 600, fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "#7B2FFF", display: "block", marginBottom: "14px" }}>• NOS SERVICES •</span>
        <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(28px,4vw,44px)", color: "white", margin: 0 }}>
          Services <span style={{ background: "linear-gradient(135deg,#7B2FFF,#00C2FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>premium</span>
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SERVICES.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div key={s.id} initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12, ease: [0.22,1,0.36,1] }} whileHover={{ y: -10, transition: { duration: 0.2 } }}>
              <div className="relative rounded-[22px] p-[2px] h-full" style={{ background: s.featured ? "linear-gradient(135deg,#7B2FFF,#00C2FF)" : "rgba(123,47,255,0.2)", boxShadow: s.featured ? "0 0 60px rgba(123,47,255,0.3)" : "none" }}>
                <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3}/>
                {s.featured && <BorderBeam size={200} duration={10} colorFrom="#7B2FFF" colorTo="#00C2FF" borderWidth={2}/>}
                <div className="relative rounded-[20px] p-7 h-full flex flex-col" style={{ background: "linear-gradient(145deg,#0D0D22,#0A0A1C)" }}>
                  {s.featured && <div className="absolute top-4 right-4 text-[11px] font-bold tracking-widest px-3 py-1 rounded-full text-white" style={{ background: "linear-gradient(135deg,#7B2FFF,#00C2FF)" }}>BEST SELLER</div>}
                  <div className="w-12 h-12 rounded-[12px] mb-5 flex items-center justify-center" style={{ background: `${s.color}18`, border: `1px solid ${s.color}44` }}>
                    <Icon size={22} style={{ color: s.color }}/>
                  </div>
                  <h3 className="font-bold text-white text-lg mb-2" style={{ fontFamily: "Syne, sans-serif" }}>{s.title}</h3>
                  <div className="font-extrabold text-2xl mb-3" style={{ fontFamily: "Syne, sans-serif", background: `linear-gradient(135deg,${s.color},#7B2FFF)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{s.price}</div>
                  <p className="text-sm mb-5 leading-relaxed flex-1" style={{ color: "rgba(255,255,255,0.72)", fontFamily: "DM Sans, sans-serif" }}>{s.desc}</p>
                  <ul className="space-y-2 mb-6">
                    {s.features.map(f => (
                      <li key={f} className="flex items-center gap-2">
                        <Check size={13} style={{ color: "#10B981", flexShrink: 0 }} strokeWidth={2.5}/>
                        <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.68)" }}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => nav(`/contact?type=${s.id}`)} className="flex items-center gap-2 font-semibold text-sm cursor-pointer p-0 bg-transparent border-none transition-all" style={{ color: s.color, fontFamily: "DM Sans, sans-serif" }}
                    onMouseEnter={e => (e.currentTarget.style.gap = "10px")} onMouseLeave={e => (e.currentTarget.style.gap = "8px")}>
                    Voir l'offre <ArrowRight size={14}/>
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

// ── PROCESSUS avec BorderBeam ─────────────────────────────
const STEPS = [
  { n: "01", emoji: "💬", title: "Découverte", desc: "Consultation 30min offerte. On analyse votre activité, objectifs et marché.", badge: "Jour 1" },
  { n: "02", emoji: "🎨", title: "Design", desc: "Maquettes sur-mesure aux couleurs de votre marque. Vous validez avant le code.", badge: "J.2–5" },
  { n: "03", emoji: "⚡", title: "Développement", desc: "Code propre, rapide, SEO-optimisé. 100% mobile-first.", badge: "J.5–12" },
  { n: "04", emoji: "🚀", title: "Livraison", desc: "Tests complets, mise en ligne et formation. Totalement autonome.", badge: "J.12–14" },
];

function ProcessSection() {
  return (
    <section className="relative z-10 max-w-6xl mx-auto px-6 py-20">
      <div className="text-center mb-14">
        <span style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 600, fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "#7B2FFF", display: "block", marginBottom: "14px" }}>• NOTRE MÉTHODE •</span>
        <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(28px,4vw,44px)", color: "white", margin: 0 }}>
          Votre projet en <span style={{ background: "linear-gradient(135deg,#7B2FFF,#00C2FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>4 étapes</span>
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {STEPS.map((s, i) => (
          <motion.div key={s.n} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
            <div className="relative rounded-[20px] border p-[2px] h-full" style={{ borderColor: "rgba(123,47,255,0.2)" }}>
              <BorderBeam size={120} duration={12} delay={i * 2.5} colorFrom="#7B2FFF" colorTo="#00C2FF" borderWidth={1}/>
              <div className="relative rounded-[18px] p-6 h-full" style={{ background: "linear-gradient(145deg,rgba(123,47,255,0.07),rgba(0,194,255,0.03))" }}>
                <div className="flex items-center justify-between mb-5">
                  <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "32px", lineHeight: 1, background: "linear-gradient(135deg,#7B2FFF,#00C2FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", opacity: 0.38 }}>{s.n}</span>
                  <span className="text-2xl">{s.emoji}</span>
                  <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: "11px", fontWeight: 600, background: "rgba(0,194,255,0.1)", border: "1px solid rgba(0,194,255,0.22)", color: "#00C2FF", borderRadius: "999px", padding: "3px 10px" }}>{s.badge}</span>
                </div>
                <h3 className="font-bold text-white text-base mb-2" style={{ fontFamily: "Syne, sans-serif" }}>{s.title}</h3>
                <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.60)", lineHeight: 1.65, margin: 0 }}>{s.desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ── TARIFS avec GlowingEffect ─────────────────────────────
function PriceCount({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let n = 0; const steps = 28;
    const id = setInterval(() => {
      n += target / steps; if (n >= target) { setVal(target); clearInterval(id); return; } setVal(Math.round(n));
    }, 380 / steps);
    return () => clearInterval(id);
  }, [inView, target]);
  return <span ref={ref}>{val}</span>;
}

const PLANS = [
  { name: "SITE VITRINE", price: 497, period: "paiement unique", desc: "Présence professionnelle et génération de leads.", features: ["Design sur-mesure", "1 à 5 pages", "SEO local", "Formulaire contact", "Hébergement 1 an"], href: "/contact?type=vitrine" },
  { name: "E-COMMERCE", price: 747, period: "paiement unique", desc: "Boutique complète pour vendre 24h/24.", features: ["Produits illimités", "Paiement Stripe & PayPal", "Gestion stocks", "Dashboard admin", "Formation 2h"], href: "/contact?type=ecommerce", popular: true },
  { name: "MAINTENANCE", price: 39, period: "/mois dès", desc: "Sécurité, SEO et performances en continu.", features: ["Sécurité & pare-feu", "Sauvegardes hebdo", "Monitoring 24/7", "SEO continu", "Rapport mensuel"], href: "/contact?type=maintenance" },
];

function PricingSection() {
  const nav = useNavigate();
  return (
    <section className="relative z-10 max-w-6xl mx-auto px-6 py-20">
      <div className="text-center mb-14">
        <span style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 600, fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "#7B2FFF", display: "block", marginBottom: "14px" }}>• TARIFS •</span>
        <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(28px,4vw,44px)", color: "white", margin: 0 }}>
          Des prix clairs. <span style={{ background: "linear-gradient(135deg,#7B2FFF,#00C2FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Zéro surprise.</span>
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {PLANS.map((p, i) => (
          <motion.div key={p.name} initial={{ opacity: 0, y: 44 }} whileInView={{ opacity: 1, y: p.popular ? -14 : 0, scale: p.popular ? 1.04 : 1 }} viewport={{ once: true }} transition={{ delay: i * 0.12, type: "spring", stiffness: 90 }} style={{ zIndex: p.popular ? 2 : 1 }}>
            <div className="relative rounded-[22px] p-[2px]" style={{ background: p.popular ? "linear-gradient(135deg,#7B2FFF,#00C2FF)" : "rgba(123,47,255,0.2)", boxShadow: p.popular ? "0 0 80px rgba(123,47,255,0.35)" : "none" }}>
              <GlowingEffect spread={40} glow disabled={false} proximity={64} inactiveZone={0.01} borderWidth={3}/>
              <div className="relative rounded-[20px] p-8" style={{ background: "linear-gradient(145deg,#0D0D22,#0A0A1C)" }}>
                {p.popular && <div className="absolute -top-px left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-[11px] font-bold tracking-widest px-5 py-1 rounded-full whitespace-nowrap" style={{ background: "linear-gradient(135deg,#7B2FFF,#00C2FF)" }}>⭐ BEST SELLER</div>}
                <p style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 600, fontSize: "11px", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.38)", margin: "0 0 18px" }}>{p.name}</p>
                <div className="flex items-end gap-1 mb-3">
                  <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(48px,5vw,66px)", color: "white", lineHeight: 1 }}><PriceCount target={p.price}/></span>
                  <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "24px", background: "linear-gradient(135deg,#7B2FFF,#00C2FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", paddingBottom: "8px" }}>€</span>
                  <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.3)", paddingBottom: "10px", marginLeft: "4px" }}>{p.period}</span>
                </div>
                <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.62)", marginBottom: "24px", lineHeight: 1.65 }}>{p.desc}</p>
                <ul className="space-y-2 mb-7">
                  {p.features.map(f => (
                    <li key={f} className="flex items-center gap-2">
                      <Check size={13} style={{ color: "#10B981", flexShrink: 0 }} strokeWidth={2.5}/>
                      <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: "13px", color: "rgba(255,255,255,0.65)" }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <button onClick={() => nav(p.href)}
                  className="w-full h-12 rounded-xl font-semibold text-sm text-white cursor-pointer border-none transition-all"
                  style={{ background: p.popular ? "linear-gradient(135deg,#7B2FFF,#00C2FF)" : "rgba(123,47,255,0.1)", border: p.popular ? "none" : "1px solid rgba(123,47,255,0.35)", fontFamily: "DM Sans, sans-serif", boxShadow: p.popular ? "0 6px 24px rgba(123,47,255,0.45)" : "none" }}
                  onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-2px)")} onMouseLeave={e => (e.currentTarget.style.transform = "none")}>
                  Choisir ce forfait →
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ── TÉMOIGNAGES marquee ────────────────────────────────────
const TESTIMONIALS = [
  { name: "Marie Dupont", role: "Studio Floral Paris", text: "ALTÉRA a transformé notre présence. Les demandes ont triplé en 3 mois.", initials: "MD" },
  { name: "Thomas Bernard", role: "TechSolutions Lyon", text: "Notre e-commerce génère 40% de notre CA. Professionnalisme exemplaire.", initials: "TB" },
  { name: "Sophie Martin", role: "Agence Immo SM", text: "Livraison en 12 jours comme promis. Site parfait, je recommande à 100%.", initials: "SM" },
  { name: "Jean Morel", role: "Artisan Menuisier", text: "Un site pro qui me ramène des clients chaque semaine sans rien faire.", initials: "JM" },
  { name: "Camille Rousseau", role: "Boulangerie du Centre", text: "3× plus d'appels depuis la mise en ligne. Investissement ultra rentable.", initials: "CR" },
  { name: "Alexandre Chen", role: "Chen Consulting", text: "La maintenance vaut chaque euro. Site rapide, sécurisé, SEO meilleur chaque mois.", initials: "AC" },
];

function TestimonialsSection() {
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS];
  return (
    <section className="relative z-10 py-20 overflow-hidden">
      <div className="text-center mb-14 px-6">
        <span style={{ fontFamily: "DM Sans, sans-serif", fontWeight: 600, fontSize: "11px", letterSpacing: "0.22em", textTransform: "uppercase", color: "#7B2FFF", display: "block", marginBottom: "14px" }}>• ILS NOUS FONT CONFIANCE •</span>
        <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(28px,4vw,44px)", color: "white", margin: 0 }}>
          Ce qu'en disent nos <span style={{ background: "linear-gradient(135deg,#7B2FFF,#00C2FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>clients</span>
        </h2>
      </div>
      <div style={{ maskImage: "linear-gradient(to right,transparent,black 8%,black 92%,transparent)", WebkitMaskImage: "linear-gradient(to right,transparent,black 8%,black 92%,transparent)" }}>
        <div className="tmTrack flex gap-5 w-max" style={{ animation: "tmScroll 46s linear infinite" }}>
          {doubled.map((t, i) => (
            <div key={i} className="relative flex-shrink-0 w-72 rounded-xl p-6 overflow-hidden border"
              style={{ background: "linear-gradient(145deg,rgba(10,10,30,0.92),rgba(13,13,42,0.95))", borderColor: "rgba(123,47,255,0.18)" }}>
              <span className="absolute top-2 right-3 text-5xl opacity-10" style={{ color: "#7B2FFF", fontFamily: "Georgia" }}>
                "
              </span>
              <div className="mb-2">{Array(5).fill(0).map((_, j) => <span key={j} style={{ color: "#F59E0B", fontSize: "13px" }}>★</span>)}</div>
              <p className="text-[13px] italic mb-4 leading-relaxed" style={{ color: "rgba(255,255,255,0.72)", fontFamily: "DM Sans, sans-serif" }}>
                "{t.text}"
              </p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg,#7B2FFF,#00C2FF)" }}>
                  <span className="text-[11px] font-bold text-white" style={{ fontFamily: "Syne, sans-serif" }}>{t.initials}</span>
                </div>
                <div>
                  <p className="font-semibold text-[13px] text-white m-0" style={{ fontFamily: "DM Sans, sans-serif" }}>{t.name}</p>
                  <p className="text-[11px] m-0" style={{ color: "rgba(255,255,255,0.38)", fontFamily: "DM Sans, sans-serif" }}>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@keyframes tmScroll{from{transform:translateX(0)}to{transform:translateX(-50%)}} .tmTrack:hover{animation-play-state:paused}`}</style>
    </section>
  );
}

// ── CTA FINAL avec BorderBeam + MovingBorderButton ────────
function CTASection() {
  const nav = useNavigate();
  return (
    <section className="relative z-10 px-6 pb-36 pt-10">
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-2xl mx-auto text-center">
        <div className="relative rounded-[26px] p-[2px]" style={{ background: "linear-gradient(135deg,rgba(123,47,255,0.4),rgba(0,194,255,0.25))", boxShadow: "0 0 80px rgba(123,47,255,0.18)" }}>
          <BorderBeam size={280} duration={14} colorFrom="#7B2FFF" colorTo="#00C2FF" borderWidth={1.5}/>
          <div className="relative rounded-[24px] px-12 py-16" style={{ background: "linear-gradient(135deg,rgba(123,47,255,0.1),rgba(0,194,255,0.05))" }}>
            <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(26px,4vw,44px)", color: "white", margin: "0 0 14px", lineHeight: 1.1 }}>
              Prêt à lancer votre <span style={{ background: "linear-gradient(135deg,#7B2FFF,#00C2FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>projet ?</span>
            </h2>
            <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: "16px", color: "rgba(255,255,255,0.62)", maxWidth: "400px", margin: "0 auto 34px", lineHeight: 1.72 }}>
              Consultation 30 minutes offerte. Devis gratuit, sans engagement.
            </p>
            <MovingBorderButton
              onClick={() => nav("/contact")}
              containerClassName="mx-auto w-fit"
              className="font-bold text-base"
              borderClassName="bg-[radial-gradient(circle,#7B2FFF_40%,#00C2FF_80%,transparent_100%)]"
            >
              Démarrer mon projet →
            </MovingBorderButton>
            <div className="flex justify-center gap-6 mt-6 flex-wrap">
              {["✓ Réponse sous 24h", "✓ Devis gratuit", "✓ Sans engagement"].map(t => (
                <span key={t} style={{ fontFamily: "DM Sans, sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// ── EXPORT ────────────────────────────────────────────────
export default function Home() {
  return (
    <main style={{ background: "#03030A", minHeight: "100vh" }}>
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <ProcessSection />
      <PricingSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
}
