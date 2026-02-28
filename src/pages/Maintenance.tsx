import { PricingCard } from '@/components/PricingCard';
import { SectionLabel } from '@/components/SectionLabel';
import { useReveal } from '@/hooks/useReveal';
import { Shield, RefreshCw, BarChart3, Headphones } from 'lucide-react';
import { motion } from 'framer-motion';

const plans = [
  {
    title: 'Essentielle',
    price: '39',
    unit: '/mois',
    features: ['Mises à jour CMS', 'Sauvegardes hebdomadaires', 'Monitoring uptime', 'Support email'],
  },
  {
    title: 'Professionnelle',
    price: '44',
    unit: '/mois',
    badge: '⭐ RECOMMANDÉ',
    featured: true,
    features: ['Tout de l\'Essentielle', 'Sauvegardes quotidiennes', 'Optimisation SEO mensuelle', 'Support prioritaire', 'Rapport mensuel'],
  },
  {
    title: 'Premium',
    price: '49',
    unit: '/mois',
    features: ['Tout de la Professionnelle', 'Modifications mineures incluses', 'Audit SEO trimestriel', 'Support téléphonique', 'Analyse de performance'],
  },
];

const blocks = [
  { icon: Shield, title: 'Sécurité', desc: 'Mises à jour régulières, SSL, protection contre les menaces.' },
  { icon: RefreshCw, title: 'Sauvegardes', desc: 'Sauvegardes automatiques pour ne jamais perdre vos données.' },
  { icon: BarChart3, title: 'SEO & Analytics', desc: 'Optimisation continue pour améliorer votre visibilité.' },
  { icon: Headphones, title: 'Support réactif', desc: 'Un interlocuteur dédié pour répondre à vos besoins.' },
];

const Maintenance = () => {
  const blocksReveal = useReveal(0.1);

  return (
    <div className="relative pt-[60px] pb-[76px] md:pt-0 md:pb-0">
      {/* Hero */}
      <section className="pt-24 pb-16 px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-glow bg-gradient-dark text-xs font-body font-semibold uppercase tracking-widest text-violet mb-6">
            Maintenance & SEO
          </span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="font-heading font-extrabold text-[44px] md:text-[68px] leading-[1.05] text-foreground max-w-3xl mx-auto">
          Gardez votre site <span className="text-gradient">performant</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="mt-6 max-w-lg mx-auto text-lg text-muted-foreground">
          Sécurité, mises à jour, SEO — on s'occupe de tout pour que vous puissiez vous concentrer sur votre activité.
        </motion.p>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <PricingCard
                key={i}
                {...plan}
                ctaText="Choisir cette offre →"
                ctaLink={`/contact?type=maintenance`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Feature blocks */}
      <section className="py-24 px-4" ref={blocksReveal.ref} style={blocksReveal.style}>
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <SectionLabel>Inclus dans chaque formule</SectionLabel>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mt-4">
              Votre site entre de <span className="text-gradient">bonnes mains</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blocks.map((b, i) => (
              <div key={i} className="bg-gradient-card border border-glow rounded-2xl p-8 card-lift">
                <div className="w-12 h-12 rounded-xl bg-gradient-dark flex items-center justify-center mb-5">
                  <b.icon size={22} className="text-violet" />
                </div>
                <h3 className="font-heading font-semibold text-xl text-foreground mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Maintenance;
