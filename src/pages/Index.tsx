import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import TestimonialsMarquee from '@/components/TestimonialsMarquee';

function AnimatedHero() {
  const titles = useMemo(() => ['artisans', 'commerçants', 'restaurants', 'PME locales', 'indépendants'], []);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % titles.length);
    }, 2200);
    return () => window.clearInterval(timer);
  }, [titles.length]);

  return (
    <section className="min-h-screen flex items-center justify-center px-4 pt-24">
      <div className="max-w-4xl mx-auto text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(123,47,255,0.25)] px-4 py-2 text-xs tracking-[0.18em] text-white/75 font-semibold">
          <span className="h-2 w-2 rounded-full bg-[#7B2FFF] animate-pulse" />AGENCE WEB PREMIUM
        </span>
        <h1 className="mt-6 font-heading text-white text-5xl md:text-7xl font-extrabold">Le site web des</h1>
        <div className="h-[84px] mt-2 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span
              key={titles[index]}
              initial={{ y: 60, opacity: 0, rotateX: -15 }}
              animate={{ y: 0, opacity: 1, rotateX: 0 }}
              exit={{ y: -60, opacity: 0, rotateX: 15 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block font-heading text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-[#7B2FFF] to-[#00C2FF] bg-clip-text text-transparent"
            >
              {titles[index]}
            </motion.span>
          </AnimatePresence>
        </div>
        <p className="mt-4 text-[18px] text-[rgba(255,255,255,0.55)] max-w-2xl mx-auto">
          ALTÉRA crée des sites vitrines et e-commerce premium pour transformer votre visibilité locale en résultats concrets.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/contact?type=vitrine" className="rounded-xl px-7 py-3 text-white font-semibold bg-gradient-to-r from-[#7B2FFF] to-[#00C2FF]">
            Démarrer mon projet
          </Link>
          <Link to="/tarifs" className="rounded-xl px-7 py-3 text-white border border-[rgba(123,47,255,0.35)]">
            Voir les tarifs
          </Link>
        </div>
        <div className="mt-8 whitespace-nowrap overflow-hidden text-sm text-white/50">
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 16, ease: 'linear', repeat: Infinity }}
            className="inline-flex gap-4"
          >
            {Array.from({ length: 2 }).map((_, i) => (
              <span key={i}>Site Vitrine · Site E-commerce · Maintenance · Refonte · SEO local · Support premium ·</span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function Index() {
  return (
    <div className="relative z-10">
      <AnimatedHero />

      <section className="px-4 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-3xl border border-[rgba(123,47,255,0.15)] bg-[rgba(8,8,24,0.75)] p-8 md:p-10">
            <h2 className="font-heading text-3xl md:text-5xl text-white font-bold text-center">
              Ce qu'en disent nos <span className="bg-gradient-to-r from-[#7B2FFF] to-[#00C2FF] bg-clip-text text-transparent">clients</span>
            </h2>
            <div className="mt-10">
              <TestimonialsMarquee />
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24 px-4">
        <div className="max-w-4xl mx-auto rounded-2xl border border-[rgba(123,47,255,0.15)] p-10 text-center bg-[rgba(10,10,30,0.75)]">
          <h3 className="font-heading text-white text-3xl font-bold">Prêt à passer au niveau supérieur ?</h3>
          <p className="mt-3 text-white/60">Demandez votre devis gratuit et recevez une réponse sous 24h.</p>
          <Link to="/contact" className="mt-7 inline-flex items-center gap-2 rounded-xl px-7 py-3 text-white font-semibold bg-gradient-to-r from-[#7B2FFF] to-[#00C2FF]">
            Demander un devis <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
