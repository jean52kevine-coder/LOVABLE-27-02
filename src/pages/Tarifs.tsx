import { PricingCard } from '@/components/PricingCard';
import { SectionLabel } from '@/components/SectionLabel';
import { FAQAccordion } from '@/components/FAQAccordion';
import { useReveal } from '@/hooks/useReveal';
import { useCountUp } from '@/hooks/useCountUp';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const pricingCards = [
  {
    title: 'Site Vitrine',
    price: '497',
    features: ['Jusqu\'à 5 pages', 'Design responsive', 'SEO optimisé', 'Formulaire de contact', 'SSL + Hébergement 1 an', 'Livraison 7-14 jours'],
    ctaLink: '/contact?type=vitrine',
  },
  {
    title: 'Site E-commerce',
    price: '747',
    badge: 'BEST SELLER',
    featured: true,
    features: ['Tout du Site Vitrine', 'Catalogue produits', 'Panier + Paiement sécurisé', 'Dashboard admin', 'Gestion commandes', 'Livraison 14-21 jours'],
    ctaLink: '/contact?type=ecommerce',
  },
  {
    title: 'Maintenance & SEO',
    price: '39',
    unit: '/mois',
    features: ['Mises à jour régulières', 'Sauvegardes automatiques', 'Monitoring 24/7', 'Support dédié', 'Rapports mensuels'],
    ctaLink: '/contact?type=maintenance',
    ctaText: 'Souscrire →',
  },
];

const compareFeatures = [
  ['Pages personnalisées', '5', '5+', '—'],
  ['Design responsive', true, true, '—'],
  ['SEO de base', true, true, true],
  ['SSL inclus', true, true, true],
  ['Formulaire de contact', true, true, '—'],
  ['Google Maps', true, true, '—'],
  ['Hébergement 1 an', true, true, '—'],
  ['Catalogue produits', false, true, '—'],
  ['Panier d\'achat', false, true, '—'],
  ['Paiement sécurisé', false, true, '—'],
  ['Dashboard admin', false, true, '—'],
  ['Sauvegardes auto', false, false, true],
  ['Monitoring 24/7', false, false, true],
  ['Support prioritaire', false, false, true],
];

const faqItems = [
  { question: 'Quels sont les délais de livraison ?', answer: 'Site Vitrine : 7-14 jours ouvrés. Site E-commerce : 14-21 jours ouvrés. Les délais commencent après validation de la maquette.' },
  { question: 'Le nom de domaine est-il inclus ?', answer: 'Oui ! Le nom de domaine est offert la première année avec tout site vitrine ou e-commerce.' },
  { question: 'Puis-je faire évoluer mon site ?', answer: 'Bien sûr ! Un site vitrine peut évoluer vers un e-commerce, et des fonctionnalités peuvent être ajoutées à tout moment.' },
  { question: 'Comment se passe le paiement ?', answer: '50% à la commande, 50% à la livraison. Paiement par virement ou carte bancaire.' },
];

const Tarifs = () => {
  const tableReveal = useReveal(0.1);

  return (
    <div className="relative">
      {/* Hero */}
      <section className="pt-24 pb-16 px-4 text-center">
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          className="font-heading font-extrabold text-[44px] md:text-[68px] leading-[1.05] text-foreground">
          Des Tarifs <span className="text-gradient">Clairs.</span> Zéro Surprise.
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          className="mt-6 max-w-lg mx-auto text-lg text-muted-foreground">
          Des solutions adaptées à chaque budget, sans frais cachés.
        </motion.p>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingCards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
              >
                <PricingCard {...card} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-24 px-4" ref={tableReveal.ref} style={tableReveal.style}>
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <SectionLabel>Comparatif</SectionLabel>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mt-4">
              Comparez nos <span className="text-gradient">offres</span>
            </h2>
          </div>
          <div className="bg-gradient-card border border-glow rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-bg-card">
                  <tr className="border-b border-glow">
                    <th className="text-left p-4 text-muted-foreground font-body">Fonctionnalité</th>
                    <th className="p-4 text-center text-foreground font-heading font-bold">Vitrine</th>
                    <th className="p-4 text-center text-foreground font-heading font-bold">E-commerce</th>
                    <th className="p-4 text-center text-foreground font-heading font-bold">Maintenance</th>
                  </tr>
                </thead>
                <tbody>
                  {compareFeatures.map(([feature, ...vals], i) => (
                    <tr key={i} className="border-b border-glow/50 last:border-0">
                      <td className="p-4 text-muted-foreground">{feature as string}</td>
                      {(vals as (boolean | string)[]).map((v, j) => (
                        <td key={j} className="p-4 text-center">
                          {v === true ? <Check size={16} className="inline text-success" /> :
                           v === false ? <span className="text-muted-foreground/30">—</span> :
                           <span className="text-muted-foreground">{v}</span>}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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

export default Tarifs;
