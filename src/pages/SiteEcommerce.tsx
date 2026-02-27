import { SectionLabel } from '@/components/SectionLabel';
import { GradientButton } from '@/components/GradientButton';
import { FAQAccordion } from '@/components/FAQAccordion';
import { useReveal } from '@/hooks/useReveal';
import { Check, Clock, Shield, Headphones, ShoppingCart, CreditCard, Package, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  'Tout du Site Vitrine inclus',
  'Catalogue produits illimité',
  'Panier d\'achat intuitif',
  'Paiement sécurisé (Stripe / PayPal)',
  'Gestion des commandes',
  'Dashboard administrateur',
  'Notifications email automatiques',
  'Gestion des stocks',
  'Filtres et recherche produits',
  'Pages produits optimisées SEO',
];

const timeline = [
  { icon: ShoppingCart, title: 'Jour 1-5', desc: 'Configuration boutique, design et catalogue produits.' },
  { icon: CreditCard, title: 'Jour 6-14', desc: 'Intégration paiement, panier et gestion commandes.' },
  { icon: Package, title: 'Jour 15-21', desc: 'Tests, optimisation et mise en ligne de votre boutique.' },
];

const faqItems = [
  { question: 'Quels moyens de paiement sont intégrés ?', answer: 'Nous intégrons Stripe et PayPal par défaut. D\'autres solutions comme Mollie ou PayPlug peuvent être ajoutées sur demande.' },
  { question: 'Puis-je gérer mes produits moi-même ?', answer: 'Oui, vous aurez un dashboard intuitif pour ajouter, modifier et supprimer vos produits en toute autonomie.' },
  { question: 'Y a-t-il des frais de transaction ?', answer: 'ALTÉRA ne prélève aucune commission. Les seuls frais sont ceux du prestataire de paiement (Stripe ~1.4% + 0.25€ par transaction).' },
];

const SiteEcommerce = () => {
  const featuresReveal = useReveal(0.1);

  return (
    <div className="relative">
      {/* Hero */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-glow bg-gradient-dark text-xs font-body font-semibold uppercase tracking-widest text-cyan mb-6">
              <Clock size={12} /> Livraison 14-21 jours ouvrés
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="font-heading font-extrabold text-[44px] md:text-[68px] leading-[1.05] text-foreground"
          >
            Votre <span className="text-gradient">boutique en ligne</span> clé en main
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="mt-6 max-w-lg text-lg text-muted-foreground">
            Vendez vos produits 24h/24 avec une boutique performante et sécurisée.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
            className="mt-8 flex gap-4">
            <GradientButton to="/contact?type=ecommerce">Lancer ma boutique →</GradientButton>
          </motion.div>
        </div>
      </section>

      {/* Features + Price */}
      <section className="py-20 px-4" ref={featuresReveal.ref} style={featuresReveal.style}>
        <div className="container mx-auto max-w-5xl flex flex-col md:flex-row gap-12">
          <div className="flex-1">
            <SectionLabel>Fonctionnalités</SectionLabel>
            <h2 className="font-heading font-bold text-3xl text-foreground mt-4 mb-8">
              Une boutique <span className="text-gradient">complète</span>
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {features.map((f, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
                    <Check size={12} className="text-foreground" />
                  </div>
                  <span className="text-sm text-muted-foreground">{f}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="md:w-[380px]">
            <div className="sticky top-24 bg-gradient-card border border-glow rounded-2xl p-8 text-center"
              style={{ animation: 'pulsGlow 3s ease-in-out infinite' }}>
              <span className="inline-block px-4 py-1 rounded-full bg-gradient-primary text-xs font-body font-semibold text-foreground mb-6">
                OFFRE DE LANCEMENT EXCLUSIVE
              </span>
              <div className="mb-6">
                <span className="font-heading font-extrabold text-[80px] leading-none text-foreground">747</span>
                <span className="text-gradient text-4xl font-heading font-extrabold"> €</span>
              </div>
              <div className="flex flex-col gap-3 mb-8 text-sm text-muted-foreground">
                <div className="flex items-center justify-center gap-2"><Clock size={14} className="text-violet" /> Livraison 14-21 jours</div>
                <div className="flex items-center justify-center gap-2"><Headphones size={14} className="text-violet" /> Support inclus</div>
                <div className="flex items-center justify-center gap-2"><Shield size={14} className="text-violet" /> Devis gratuit</div>
              </div>
              <GradientButton to="/contact?type=ecommerce" className="w-full">Lancer ma boutique →</GradientButton>
              <p className="mt-4 text-xs text-muted-foreground">Paiement 50% commande, 50% livraison</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-16">
            <SectionLabel>Planning</SectionLabel>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mt-4">
              Votre boutique en <span className="text-gradient">3 étapes</span>
            </h2>
          </div>
          <div className="flex flex-col gap-6">
            {timeline.map((t, i) => (
              <div key={i} className="flex gap-6 items-start">
                <div className="w-14 h-14 rounded-2xl bg-gradient-dark flex items-center justify-center flex-shrink-0">
                  <t.icon size={22} className="text-violet" />
                </div>
                <div className="bg-gradient-card border border-glow rounded-2xl p-6 flex-1 card-lift">
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-1">{t.title}</h3>
                  <p className="text-sm text-muted-foreground">{t.desc}</p>
                </div>
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

export default SiteEcommerce;
