import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlteraMarquee } from '@/components/AlteraMarquee';
import { SectionLabel } from '@/components/SectionLabel';
import { GradientButton } from '@/components/GradientButton';
import { useReveal } from '@/hooks/useReveal';
import { MapPin, Zap, Diamond, Headphones, Globe, ShoppingCart, Wrench, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const whyCards = [
  { icon: MapPin, title: 'Expertise locale', desc: 'Nous comprenons les enjeux des entrepreneurs locaux et adaptons chaque projet.' },
  { icon: Zap, title: 'Livraison rapide', desc: 'Votre site livré en 7 à 21 jours ouvrés, sans compromis sur la qualité.' },
  { icon: Diamond, title: 'Design premium', desc: 'Des interfaces soignées qui reflètent le professionnalisme de votre activité.' },
  { icon: Headphones, title: 'Support dédié', desc: 'Un interlocuteur unique et réactif, disponible pour vous accompagner.' },
];

const services = [
  { icon: Globe, title: 'Site Vitrine', desc: 'Une présence en ligne professionnelle et performante pour votre activité.', price: '497€', link: '/site-vitrine' },
  { icon: ShoppingCart, title: 'Site E-commerce', desc: 'Vendez en ligne avec une boutique optimisée et sécurisée.', price: '747€', link: '/site-ecommerce' },
  { icon: Wrench, title: 'Maintenance & SEO', desc: 'Gardez votre site à jour, sécurisé et visible sur Google.', price: 'dès 39€/mois', link: '/maintenance' },
];

const testimonials = [
  { name: "Marie Dupont", role: "Fondatrice, Studio Floral Paris", text: "ALTÉRA a transformé notre présence en ligne. Les demandes de devis ont triplé en 3 mois. Résultat au-delà de mes espérances.", initials: "MD" },
  { name: "Thomas Bernard", role: "Gérant, TechSolutions Lyon", text: "Professionnalisme et réactivité exemplaires. Notre site e-commerce génère désormais 40% de notre chiffre d'affaires.", initials: "TB" },
  { name: "Sophie Martin", role: "Directrice, Agence Immobilière SM", text: "Livraison en 12 jours comme promis. Le site reflète parfaitement notre image de marque. Je recommande à 100%.", initials: "SM" },
  { name: "Jean-Laurent Morel", role: "Artisan Menuisier", text: "Je suis artisan, pas informaticien. L'équipe ALTÉRA a tout géré et m'a formé. Maintenant j'ai un site pro que je maîtrise.", initials: "JM" },
  { name: "Camille Rousseau", role: "Gérante, Boulangerie du Centre", text: "Mon référencement Google a explosé depuis la refonte. On reçoit 3x plus d'appels qu'avant. Investissement ultra rentable.", initials: "CR" },
  { name: "Alexandre Chen", role: "Fondateur, Chen Consulting", text: "La maintenance mensuelle vaut vraiment son prix. Mon site est toujours rapide, sécurisé, et mon SEO s'améliore chaque mois.", initials: "AC" },
];

function TestimonialCard({ name, role, text, initials }: typeof testimonials[0]) {
  return (
    <div className="flex-shrink-0 w-[360px] bg-gradient-card border border-[rgba(123,47,255,0.12)] rounded-2xl p-7 relative overflow-hidden group hover:border-[rgba(123,47,255,0.3)] transition-colors duration-300">
      <span className="absolute top-4 right-6 text-5xl font-heading text-violet/10 select-none">"</span>
      <div className="flex gap-1 mb-4">
        {'★★★★★'.split('').map((s, i) => (
          <span key={i} className="text-[#FACC15] text-lg">{s}</span>
        ))}
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-4">{text}</p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-xs font-heading font-bold text-foreground flex-shrink-0">
          {initials}
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">{name}</p>
          <p className="text-xs text-muted-foreground">{role}</p>
        </div>
      </div>
    </div>
  );
}

function AnimatedHero() {
  const [titleIndex, setTitleIndex] = useState(0);
  const titles = useMemo(() => ["artisans", "commerçants", "restaurants", "PME locales", "indépendants"], []);

  useEffect(() => {
    const id = setInterval(() => {
      setTitleIndex(prev => (prev + 1) % titles.length);
    }, 2200);
    return () => clearInterval(id);
  }, [titles]);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-8">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(123,47,255,0.18)] bg-gradient-dark text-xs font-body font-semibold uppercase tracking-widest text-violet">
          <span className="w-2 h-2 rounded-full bg-violet animate-pulse" />
          Agence Web Premium
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="font-heading font-extrabold text-[44px] md:text-[76px] leading-[1.05] text-foreground"
      >
        Le site web des
      </motion.h1>

      <div className="h-[60px] md:h-[90px] overflow-hidden mt-2">
        <AnimatePresence mode="wait">
          <motion.span
            key={titleIndex}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="block font-heading font-extrabold text-[44px] md:text-[76px] leading-[1.05] text-gradient"
          >
            {titles[titleIndex]}
          </motion.span>
        </AnimatePresence>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="mt-6 max-w-[560px] text-lg text-muted-foreground leading-relaxed"
      >
        Nous créons des sites professionnels qui attirent des clients. Design sur-mesure, livraison rapide, résultats concrets.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="mt-8 flex flex-col sm:flex-row gap-4"
      >
        <GradientButton to="/contact">Démarrer mon projet →</GradientButton>
        <GradientButton to="/services" variant="outline">Découvrir nos services</GradientButton>
      </motion.div>

      <div className="mt-20 w-full max-w-5xl">
        <AlteraMarquee />
      </div>
    </section>
  );
}

const Index = () => {
  const whyReveals = whyCards.map((_, i) => useReveal(i * 0.1));
  const servicesReveal = useReveal(0.1);
  const ctaReveal = useReveal(0.1);

  return (
    <div className="relative">
      {/* HERO */}
      <AnimatedHero />

      {/* POURQUOI ALTÉRA */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <SectionLabel>Pourquoi nous choisir</SectionLabel>
            <h2 className="font-heading font-bold text-[34px] md:text-[52px] leading-[1.1] mt-4 text-foreground">
              Pourquoi <span className="text-gradient">ALTÉRA</span> ?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {whyCards.map((card, i) => (
              <div key={i} ref={whyReveals[i].ref} style={whyReveals[i].style}>
                <div className="bg-gradient-card border border-[rgba(123,47,255,0.18)] rounded-2xl p-8 card-lift h-full">
                  <div className="w-12 h-12 rounded-xl bg-gradient-dark flex items-center justify-center mb-5">
                    <card.icon size={22} className="text-violet" />
                  </div>
                  <h3 className="font-heading font-semibold text-xl text-foreground mb-2">{card.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARATIF */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <SectionLabel>Comparez</SectionLabel>
            <h2 className="font-heading font-bold text-[34px] md:text-[52px] leading-[1.1] mt-4 text-foreground">
              Site Vitrine vs <span className="text-gradient">E-commerce</span> ?
            </h2>
          </div>
          <div className="bg-gradient-card border border-[rgba(123,47,255,0.18)] rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[rgba(123,47,255,0.18)]">
                    <th className="text-left p-4 text-muted-foreground font-body font-medium">Fonctionnalité</th>
                    <th className="p-4 text-center text-foreground font-heading font-bold">Vitrine</th>
                    <th className="p-4 text-center text-foreground font-heading font-bold">E-commerce</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Jusqu\'à 5 pages', true, true],
                    ['Design responsive', true, true],
                    ['Référencement SEO', true, true],
                    ['Certificat SSL', true, true],
                    ['Formulaire de contact', true, true],
                    ['Google Maps', true, true],
                    ['Hébergement 1 an', true, true],
                    ['Catalogue produits', false, true],
                    ['Panier d\'achat', false, true],
                    ['Paiement en ligne', false, true],
                    ['Gestion des commandes', false, true],
                    ['Dashboard admin', false, true],
                  ].map(([feature, vitrine, ecommerce], i) => (
                    <tr key={i} className="border-b border-[rgba(123,47,255,0.09)] last:border-0">
                      <td className="p-4 text-muted-foreground">{feature as string}</td>
                      <td className="p-4 text-center">{vitrine ? <span className="text-success">✓</span> : <span className="text-muted-foreground/30">—</span>}</td>
                      <td className="p-4 text-center">{ecommerce ? <span className="text-success">✓</span> : <span className="text-muted-foreground/30">—</span>}</td>
                    </tr>
                  ))}
                  <tr className="bg-gradient-dark">
                    <td className="p-4 font-heading font-bold text-foreground">Prix</td>
                    <td className="p-4 text-center">
                      <span className="font-heading font-extrabold text-2xl text-foreground">497</span>
                      <span className="text-gradient font-heading font-extrabold text-xl"> €</span>
                    </td>
                    <td className="p-4 text-center">
                      <span className="font-heading font-extrabold text-2xl text-foreground">747</span>
                      <span className="text-gradient font-heading font-extrabold text-xl"> €</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 px-4" ref={servicesReveal.ref} style={servicesReveal.style}>
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <SectionLabel>Nos offres</SectionLabel>
            <h2 className="font-heading font-bold text-[34px] md:text-[52px] leading-[1.1] mt-4 text-foreground">
              Des solutions <span className="text-gradient">sur mesure</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {services.map((s, i) => (
              <div key={i} className="bg-gradient-card border border-[rgba(123,47,255,0.18)] rounded-2xl p-8 card-lift relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-primary" />
                <div className="w-12 h-12 rounded-xl bg-gradient-dark flex items-center justify-center mb-5">
                  <s.icon size={22} className="text-violet" />
                </div>
                <h3 className="font-heading font-semibold text-xl text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{s.desc}</p>
                <span className="inline-block px-3 py-1 rounded-full bg-gradient-dark text-xs font-body font-semibold text-violet mb-6">{s.price}</span>
                <div>
                  <Link to={s.link} className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-violet transition-colors">
                    En savoir plus <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TÉMOIGNAGES — Marquee */}
      <section className="py-24 overflow-hidden">
        <div className="container mx-auto mb-12 px-4">
          <div className="text-center">
            <SectionLabel>Ils nous font confiance</SectionLabel>
            <h2 className="font-heading font-bold text-[34px] md:text-[52px] leading-[1.1] mt-4 text-foreground">
              Ce qu'en disent nos <span className="text-gradient">clients</span>
            </h2>
          </div>
        </div>
        {/* Marquee track */}
        <div className="relative w-full">
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-bg-deep to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-bg-deep to-transparent" />
          <div className="flex gap-6 hover:[animation-play-state:paused]" style={{ animation: 'marquee 40s linear infinite', width: 'max-content' }}>
            {[...testimonials, ...testimonials].map((t, i) => (
              <TestimonialCard key={i} {...t} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4" ref={ctaReveal.ref} style={ctaReveal.style}>
        <div className="container mx-auto max-w-3xl">
          <div className="bg-gradient-card border border-[rgba(123,47,255,0.18)] rounded-2xl p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-dark opacity-50" />
            <div className="relative z-10">
              <h2 className="font-heading font-bold text-[28px] md:text-[40px] text-foreground mb-4">
                Prêt à <span className="text-gradient">transformer</span> votre présence en ligne ?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Obtenez un devis gratuit en moins de 24h. Sans engagement.
              </p>
              <GradientButton to="/contact">Demander un devis gratuit →</GradientButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
