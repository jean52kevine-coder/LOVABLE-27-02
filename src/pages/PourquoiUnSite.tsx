import { SectionLabel } from '@/components/SectionLabel';
import { GradientButton } from '@/components/GradientButton';
import { useReveal } from '@/hooks/useReveal';
import { useCountUp } from '@/hooks/useCountUp';
import { Eye, Award, TrendingUp, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';

const stats = [
  { value: 81, suffix: '%', label: 'des consommateurs recherchent en ligne avant d\'acheter' },
  { value: 46, suffix: '%', label: 'des recherches Google sont locales' },
  { value: 75, suffix: '%', label: 'jugent la crédibilité sur le design du site' },
  { value: 90, suffix: '%', label: 'des interactions commencent sur mobile' },
];

const pillars = [
  { icon: Eye, title: 'Visibilité Absolue', desc: 'Soyez trouvé par vos clients potentiels 24h/24 sur Google et les réseaux.' },
  { icon: Award, title: 'Crédibilité Instantanée', desc: 'Un site professionnel inspire confiance et démarque votre activité de la concurrence.' },
  { icon: TrendingUp, title: 'Croissance Organique', desc: 'Générez des leads qualifiés sans dépendre uniquement de la publicité payante.' },
  { icon: Smartphone, title: 'Expérience Mobile-First', desc: 'Offrez une navigation parfaite sur tous les appareils pour ne perdre aucun visiteur.' },
];

const StatCounter = ({ value, suffix, label }: { value: number; suffix: string; label: string }) => {
  const { count, ref } = useCountUp(value);
  return (
    <div ref={ref} className="text-center">
      <span className="font-heading font-extrabold text-[56px] md:text-[88px] leading-none text-gradient">
        {count}{suffix}
      </span>
      <p className="mt-3 text-sm text-muted-foreground max-w-[200px] mx-auto">{label}</p>
    </div>
  );
};

const PourquoiUnSite = () => {
  const pillarsReveal = useReveal(0.1);

  return (
    <div className="relative">
      {/* Hero */}
      <section className="pt-24 pb-16 px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-glow bg-gradient-dark text-xs font-body font-semibold uppercase tracking-widest text-violet mb-6">
            Votre avantage digital
          </span>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="font-heading font-extrabold text-[44px] md:text-[68px] leading-[1.05] text-foreground max-w-4xl mx-auto">
          Pourquoi votre entreprise a <span className="text-gradient">besoin d'un site</span> ?
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="mt-6 max-w-lg mx-auto text-lg text-muted-foreground">
          Les chiffres parlent d'eux-mêmes. Ne laissez pas votre concurrence prendre l'avantage.
        </motion.p>
      </section>

      {/* Stats */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <StatCounter key={i} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-24 px-4" ref={pillarsReveal.ref} style={pillarsReveal.style}>
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <SectionLabel>Les 4 piliers</SectionLabel>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mt-4">
              Les raisons <span className="text-gradient">essentielles</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pillars.map((p, i) => (
              <div key={i} className="bg-gradient-card border border-glow rounded-2xl p-8 card-lift">
                <div className="w-12 h-12 rounded-xl bg-gradient-dark flex items-center justify-center mb-5">
                  <p.icon size={22} className="text-violet" />
                </div>
                <h3 className="font-heading font-semibold text-xl text-foreground mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Citation + CTA */}
      <section className="py-24 px-4 text-center">
        <div className="container mx-auto max-w-3xl">
          <p className="font-heading font-semibold text-2xl md:text-[32px] leading-relaxed text-foreground italic mb-8">
            «&nbsp;Un site internet n'est pas une dépense, c'est un <span className="text-gradient">investissement</span> dans la croissance de votre entreprise.&nbsp;»
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <GradientButton to="/contact">Démarrer mon projet →</GradientButton>
            <GradientButton to="/tarifs" variant="outline">Voir les tarifs</GradientButton>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PourquoiUnSite;
