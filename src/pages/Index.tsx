import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Check,
  Clock3,
  Globe,
  Layers,
  Megaphone,
  MessageSquare,
  Palette,
  Rocket,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Target,
  Wrench,
} from "lucide-react";
import { GlobalBackground } from "@/components/GlobalBackground";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Compare } from "@/components/ui/compare";
import { RadialOrbitalTimeline } from "@/components/ui/radial-orbital-timeline";

const heroWords = ["repenser", "accélérer", "moderniser"];

const stats = [
  { value: 14, suffix: "j", label: "Livraison moyenne" },
  { value: 4.9, suffix: "/5", label: "Satisfaction client" },
  { value: 24, suffix: "h", label: "Réponse commerciale" },
  { value: 180, suffix: "%", label: "Leads supplémentaires" },
];

const testimonials = [
  { name: "Marie Dupont", role: "Studio Floral", text: "Site livré vite, plus de demandes qualifiées." },
  { name: "Thomas Bernard", role: "TechSolutions", text: "Refonte premium et conversions en forte hausse." },
  { name: "Camille Rousseau", role: "Boulangerie du Centre", text: "Visibilité Google multipliée en quelques semaines." },
  { name: "Alexandre Chen", role: "Chen Consulting", text: "Design, performance et SEO : tout est carré." },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const duration = 1000;
    const frame = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      setCount(Number((value * progress).toFixed(value % 1 ? 1 : 0)));
      if (progress < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const id = setInterval(() => setWordIndex((prev) => (prev + 1) % heroWords.length), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative flex min-h-[92vh] items-center px-5 pb-16 pt-24 md:pt-32">
      <div className="mx-auto w-full max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs tracking-[0.2em] text-white/70 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-yellow-300" /> AGENCE WEB PREMIUM
          </span>
          <h1 className="mt-6 text-balance font-heading text-4xl font-bold leading-tight text-white md:text-6xl">
            Propulsez votre entreprise avec un site web d'exception.
          </h1>
          <div className="mt-3 h-12 md:h-16">
            <AnimatePresence mode="wait">
              <motion.p
                key={wordIndex}
                initial={{ y: 28, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -28, opacity: 0 }}
                className="text-3xl font-semibold text-transparent md:text-5xl bg-gradient-to-r from-cyan-300 to-violet-400 bg-clip-text"
              >
                {heroWords[wordIndex]} votre présence en ligne.
              </motion.p>
            </AnimatePresence>
          </div>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-gray-400 md:text-lg">
            Sites web ultra-performants, sur-mesure et optimisés SEO pour artisans, commerçants et PME. Livrés en 14 jours.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button onClick={() => navigate("/contact")} className="rounded-xl bg-gradient-to-r from-blue-500 to-violet-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_28px_rgba(99,102,241,0.45)] transition hover:-translate-y-0.5 hover:shadow-[0_0_36px_rgba(139,92,246,0.7)]">
              Démarrer mon projet <ArrowRight className="ml-1 inline h-4 w-4" />
            </button>
            <button onClick={() => navigate("/services")} className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:border-violet-400/60">
              Voir nos services
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const items = useMemo(
    () => [
      { title: "Site vitrine", icon: Globe, text: "Présentez votre activité avec un design premium et des pages qui convertissent.", points: ["SEO local", "Performance 90+", "Livraison rapide"] },
      { title: "E-commerce", icon: ShoppingCart, text: "Vendez 24/7 avec un tunnel d'achat optimisé, fiable et sécurisé.", points: ["Catalogue flexible", "Paiement Stripe", "Tracking conversions"], featured: true },
      { title: "Maintenance", icon: Wrench, text: "Sécurité, mises à jour et améliorations continues sans charge mentale.", points: ["Monitoring 24/7", "Sauvegardes", "Support prioritaire"] },
      { title: "Branding digital", icon: Palette, text: "Une identité visuelle cohérente pour renforcer la confiance instantanément.", points: ["UI system", "Cohérence marque", "Templates prêts à publier"] },
    ],
    []
  );

  return (
    <section className="relative mx-auto max-w-6xl px-5 py-24">
      <div className="mb-10 text-center">
        <p className="text-xs tracking-[0.2em] text-violet-300">NOS SERVICES</p>
        <h2 className="mt-2 text-3xl font-bold text-white md:text-5xl">Une offre plus moderne, pensée conversion</h2>
      </div>

      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.li key={item.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className={`relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md ${item.featured ? "md:col-span-2" : ""}`}>
              <GlowingEffect spread={40} glow disabled={false} proximity={70} inactiveZone={0.05} borderWidth={2} />
              <div className="relative z-10">
                <div className="mb-4 inline-flex rounded-xl border border-white/10 bg-black/30 p-2">
                  <Icon className="h-5 w-5 text-cyan-300" />
                </div>
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-gray-400">{item.text}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.points.map((point) => (
                    <span key={point} className="rounded-full border border-white/10 px-3 py-1 text-xs text-gray-300">{point}</span>
                  ))}
                </div>
              </div>
            </motion.li>
          );
        })}
      </ul>
    </section>
  );
}

function ProcessSection() {
  const timelineItems = [
    { id: 1, title: "Audit & stratégie", date: "Étape 1", content: "On définit vos objectifs business et vos priorités SEO.", category: "Découverte", icon: Target, status: "completed" as const },
    { id: 2, title: "UX & direction créative", date: "Étape 2", content: "Maquettes premium validées sur mobile avant le développement.", category: "Design", icon: Palette, status: "in-progress" as const },
    { id: 3, title: "Développement", date: "Étape 3", content: "Intégration rapide, animations fluides et optimisations techniques.", category: "Build", icon: Layers, status: "pending" as const },
    { id: 4, title: "Lancement & suivi", date: "Étape 4", content: "Mise en ligne, suivi analytics et plan d'amélioration continue.", category: "Go-live", icon: Rocket, status: "pending" as const },
  ];

  return (
    <section className="relative mx-auto max-w-6xl px-5 py-24">
      <div className="mb-10 text-center">
        <p className="text-xs tracking-[0.2em] text-violet-300">NOTRE MÉTHODE</p>
        <h2 className="mt-2 text-3xl font-bold text-white md:text-5xl">4 étapes qui tournent autour de votre résultat</h2>
      </div>
      <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-md md:p-8">
        <RadialOrbitalTimeline items={timelineItems} />
      </div>
    </section>
  );
}

function ComparisonSection() {
  return (
    <section className="relative mx-auto max-w-6xl px-5 py-24">
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <p className="text-xs tracking-[0.2em] text-violet-300">COMPARAISON</p>
          <h2 className="mt-2 text-3xl font-bold text-white md:text-5xl">Site vitrine vs site e-commerce</h2>
          <p className="mt-4 text-gray-400">Faites glisser le curseur pour visualiser la différence entre une page vitrine et une boutique complète.</p>
          <ul className="mt-6 space-y-2 text-sm text-gray-300">
            {["Vitrine : visibilité & crédibilité", "E-commerce : ventes et automatisation", "Les deux sont livrés mobile-first"].map((line) => (
              <li key={line} className="flex items-center gap-2"><Check className="h-4 w-4 text-green-400" />{line}</li>
            ))}
          </ul>
        </div>
        <Compare
          firstImage="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80"
          secondImage="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80"
          firstImageClassName="object-cover"
          secondImageClassname="object-cover"
          slideMode="hover"
          className="h-[340px] w-full"
        />
      </div>
    </section>
  );
}

function WhySection() {
  const reasons = [
    { icon: ShieldCheck, title: "Confiance", text: "Process clair, délais tenus et communication continue." },
    { icon: Clock3, title: "Rapidité", text: "Une équipe focalisée pour livrer vite sans sacrifier la qualité." },
    { icon: Megaphone, title: "Croissance", text: "Un site pensé pour générer des demandes et des ventes." },
    { icon: MessageSquare, title: "Accompagnement", text: "Vous n'êtes jamais seul : nous restons disponibles après lancement." },
  ];

  return (
    <section className="relative mx-auto max-w-6xl px-5 py-24">
      <div className="mb-8 text-center">
        <p className="text-xs tracking-[0.2em] text-violet-300">POURQUOI ALTÉRA</p>
        <h2 className="mt-2 text-3xl font-bold text-white md:text-5xl">Une refonte confiance, premium et orientée business</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {reasons.map((reason, i) => {
          const Icon = reason.icon;
          return (
            <motion.div key={reason.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <Icon className="h-5 w-5 text-yellow-300" />
              <h3 className="mt-3 text-lg font-semibold text-white">{reason.title}</h3>
              <p className="mt-2 text-sm text-gray-400">{reason.text}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const list = [...testimonials, ...testimonials];
  return (
    <section className="relative overflow-hidden py-24">
      <div className="mx-auto mb-8 max-w-6xl px-5 text-center">
        <h2 className="text-3xl font-bold text-white md:text-5xl">Ils nous font confiance</h2>
      </div>
      <div className="[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max gap-4 animate-[testimonials_30s_linear_infinite] px-5">
          {list.map((item, i) => (
            <article key={`${item.name}-${i}`} className="w-72 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <p className="text-sm text-gray-300">{item.text}</p>
              <p className="mt-4 text-sm font-semibold text-white">{item.name}</p>
              <p className="text-xs text-gray-500">{item.role}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="relative overflow-x-hidden bg-[#03030A]">
      <GlobalBackground variant="content" />
      <div className="relative z-10">
        <HeroSection />

        <section className="mx-auto max-w-6xl px-5 py-10 md:py-14">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {stats.map((item, i) => (
              <motion.div key={item.label} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur md:p-6">
                <p className="text-2xl font-bold text-transparent md:text-4xl bg-gradient-to-r from-cyan-300 to-violet-400 bg-clip-text">
                  <AnimatedCounter value={item.value} suffix={item.suffix} />
                </p>
                <p className="mt-1 text-xs text-gray-400 md:text-sm">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <ServicesSection />
        <ProcessSection />
        <ComparisonSection />
        <WhySection />
        <TestimonialsSection />
      </div>
      <style>{`@keyframes testimonials{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
    </main>
  );
}
