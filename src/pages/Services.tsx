import { HeroAnimatedTitle } from '@/components/HeroAnimatedTitle';
import { SectionLabel } from '@/components/SectionLabel';
import { GradientButton } from '@/components/GradientButton';
import { useReveal } from '@/hooks/useReveal';
import { Globe, ShoppingCart, Wrench, MessageSquare, Palette, Code, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const services = [
  {
    icon: Globe, title: 'Site Vitrine', price: '497€',
    desc: 'Une présence en ligne professionnelle avec un design soigné, optimisé pour le référencement et la conversion.',
    features: ['Jusqu\'à 5 pages', 'Design responsive', 'SEO optimisé', 'Formulaire de contact'],
    link: '/site-vitrine',
  },
  {
    icon: ShoppingCart, title: 'Site E-commerce', price: '747€',
    desc: 'Une boutique en ligne complète avec catalogue, panier, paiement sécurisé et gestion des commandes.',
    features: ['Tout du Site Vitrine', 'Catalogue produits', 'Panier + Paiement', 'Dashboard admin'],
    link: '/site-ecommerce',
  },
  {
    icon: Wrench, title: 'Maintenance & SEO', price: 'dès 39€/mois',
    desc: 'Gardez votre site performant, sécurisé et visible sur les moteurs de recherche.',
    features: ['Mises à jour régulières', 'Sauvegardes', 'Monitoring', 'Rapports mensuels'],
    link: '/maintenance',
  },
];

const processSteps = [
  { icon: MessageSquare, title: 'Échange', step: '01', desc: 'Nous discutons de votre projet, vos objectifs et vos besoins pour définir la solution idéale.' },
  { icon: Palette, title: 'Conception', step: '02', desc: 'Nous créons la maquette et le design de votre site, validés avec vous avant développement.' },
  { icon: Code, title: 'Développement', step: '03', desc: 'Votre site est développé avec les meilleures technologies, testé sur tous les appareils.' },
  { icon: Rocket, title: 'Livraison', step: '04', desc: 'Mise en ligne, formation et remise des accès. Votre site est prêt à convertir.' },
];

const Services = () => {
  const processReveal = useReveal(0.1);

  return (
    <div className="relative">
      {/* Hero */}
      <section className="pt-24 pb-16 px-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-glow bg-gradient-dark text-xs font-body font-semibold uppercase tracking-widest text-violet mb-6">
            Nos services
          </span>
        </motion.div>
        <HeroAnimatedTitle
          fixedText="Propulsez votre présence"
          words={['au sommet.', 'en avant.', 'vers l\'avenir.', 'plus loin.', 'autrement.']}
        />
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
          className="mt-6 max-w-lg mx-auto text-lg text-muted-foreground"
        >
          Des solutions digitales adaptées à chaque besoin et chaque budget.
        </motion.p>
      </section>

      {/* Services Cards */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl flex flex-col gap-16">
          {services.map((s, i) => {
            const reveal = useReveal(0.1, i % 2 === 0 ? 'up' : 'left');
            return (
              <div key={i} ref={reveal.ref} style={reveal.style}
                className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}
              >
                <div className="flex-1">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-dark flex items-center justify-center mb-5">
                    <s.icon size={26} className="text-violet" />
                  </div>
                  <span className="text-gradient font-heading font-bold text-sm">{s.price}</span>
                  <h3 className="font-heading font-bold text-3xl text-foreground mt-2 mb-3">{s.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">{s.desc}</p>
                  <ul className="space-y-2 mb-6">
                    {s.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-violet" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link to={s.link} className="inline-flex items-center gap-2 text-sm font-medium text-violet hover:text-violet-soft transition-colors">
                    En savoir plus →
                  </Link>
                </div>
                <div className="flex-1 w-full">
                  <div className="bg-gradient-card border border-glow rounded-2xl aspect-[4/3] flex items-center justify-center">
                    <s.icon size={64} className="text-violet/20" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Processus */}
      <section className="py-24 px-4" ref={processReveal.ref} style={processReveal.style}>
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <SectionLabel>Notre méthode</SectionLabel>
            <h2 className="font-heading font-bold text-[34px] md:text-[52px] leading-[1.1] mt-4 text-foreground">
              Notre Méthode en <span className="text-gradient">4 Étapes</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {processSteps.map((step, i) => (
              <div key={i} className="bg-gradient-card border border-glow rounded-2xl p-8 card-lift">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-gradient font-heading font-extrabold text-3xl">{step.step}</span>
                  <div className="w-10 h-10 rounded-xl bg-gradient-dark flex items-center justify-center">
                    <step.icon size={18} className="text-violet" />
                  </div>
                </div>
                <h3 className="font-heading font-semibold text-xl text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">
            Prêt à <span className="text-gradient">commencer</span> ?
          </h2>
          <p className="text-muted-foreground mb-8">Discutons de votre projet. Devis gratuit en 24h.</p>
          <GradientButton to="/contact">Demander un devis →</GradientButton>
        </div>
      </section>
    </div>
  );
};

export default Services;
