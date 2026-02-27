import { SectionLabel } from '@/components/SectionLabel';
import { GradientButton } from '@/components/GradientButton';
import { FAQAccordion } from '@/components/FAQAccordion';
import { useReveal } from '@/hooks/useReveal';
import { Check, Clock, Shield, Headphones, MessageSquare, Palette, Code, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  'Jusqu\'à 5 pages personnalisées',
  'Design responsive (mobile, tablette, desktop)',
  'Référencement SEO de base',
  'Certificat SSL inclus',
  'Formulaire de contact',
  'Intégration Google Maps',
  'Hébergement inclus 1 an',
  'Nom de domaine offert la 1ère année',
  'Optimisation vitesse de chargement',
  'Analytics & suivi des visites',
];

const processSteps = [
  { icon: MessageSquare, title: 'Échange', step: '01', desc: 'Discussion de votre projet et de vos objectifs.' },
  { icon: Palette, title: 'Conception', step: '02', desc: 'Maquette et design validés avec vous.' },
  { icon: Code, title: 'Développement', step: '03', desc: 'Développement et tests sur tous les appareils.' },
  { icon: Rocket, title: 'Livraison', step: '04', desc: 'Mise en ligne et formation.' },
];

const faqItems = [
  { question: 'Quel est le délai de livraison ?', answer: 'Votre site vitrine est livré en 7 à 14 jours ouvrés après validation de la maquette.' },
  { question: 'Le nom de domaine est-il inclus ?', answer: 'Oui, le nom de domaine est offert la première année. Ensuite, le renouvellement est à votre charge (environ 10-15€/an).' },
  { question: 'Puis-je faire évoluer mon site plus tard ?', answer: 'Absolument ! Votre site peut évoluer vers un e-commerce ou intégrer de nouvelles fonctionnalités à tout moment.' },
];

const SiteVitrine = () => {
  const featuresReveal = useReveal(0.1);
  const processReveal = useReveal(0.1);

  return (
    <div className="relative">
      {/* Hero */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-glow bg-gradient-dark text-xs font-body font-semibold uppercase tracking-widest text-cyan mb-6">
              <Clock size={12} /> Livraison 7-14 jours ouvrés
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="font-heading font-extrabold text-[44px] md:text-[68px] leading-[1.05] text-foreground"
          >
            Votre <span className="text-gradient">site vitrine</span> professionnel
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="mt-6 max-w-lg text-lg text-muted-foreground"
          >
            Une présence en ligne qui reflète votre expertise et convertit vos visiteurs en clients.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
            className="mt-8 flex gap-4"
          >
            <GradientButton to="/contact?type=vitrine">Démarrer mon projet →</GradientButton>
          </motion.div>
        </div>
      </section>

      {/* Features + Price */}
      <section className="py-20 px-4" ref={featuresReveal.ref} style={featuresReveal.style}>
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row gap-12">
            {/* Features */}
            <div className="flex-1">
              <SectionLabel>Ce qui est inclus</SectionLabel>
              <h2 className="font-heading font-bold text-3xl text-foreground mt-4 mb-8">
                Tout pour <span className="text-gradient">réussir</span> en ligne
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {features.map((f, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={featuresReveal.visible ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
                      <Check size={12} className="text-foreground" />
                    </div>
                    <span className="text-sm text-muted-foreground">{f}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Price Card */}
            <div className="md:w-[380px]">
              <div className="sticky top-24 bg-gradient-card border border-glow rounded-2xl p-8 text-center"
                style={{ animation: 'pulsGlow 3s ease-in-out infinite' }}>
                <span className="inline-block px-4 py-1 rounded-full bg-gradient-primary text-xs font-body font-semibold text-foreground mb-6">
                  OFFRE DE LANCEMENT
                </span>
                <div className="mb-6">
                  <span className="font-heading font-extrabold text-[80px] leading-none text-foreground">497</span>
                  <span className="text-gradient text-4xl font-heading font-extrabold"> €</span>
                </div>
                <div className="flex flex-col gap-3 mb-8 text-sm text-muted-foreground">
                  <div className="flex items-center justify-center gap-2">
                    <Clock size={14} className="text-violet" /> Livraison 7-14 jours
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Headphones size={14} className="text-violet" /> Support inclus
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Shield size={14} className="text-violet" /> Devis gratuit
                  </div>
                </div>
                <GradientButton to="/contact?type=vitrine" className="w-full">Démarrer mon projet →</GradientButton>
                <p className="mt-4 text-xs text-muted-foreground">Paiement 50% commande, 50% livraison</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Processus */}
      <section className="py-24 px-4" ref={processReveal.ref} style={processReveal.style}>
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <SectionLabel>Processus</SectionLabel>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mt-4">
              Comment ça <span className="text-gradient">marche</span> ?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {processSteps.map((step, i) => (
              <div key={i} className="bg-gradient-card border border-glow rounded-2xl p-8 card-lift">
                <span className="text-gradient font-heading font-extrabold text-3xl">{step.step}</span>
                <h3 className="font-heading font-semibold text-xl text-foreground mt-3 mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-12">
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="font-heading font-bold text-3xl text-foreground mt-4">Questions <span className="text-gradient">fréquentes</span></h2>
          </div>
          <FAQAccordion items={faqItems} />
        </div>
      </section>
    </div>
  );
};

export default SiteVitrine;
