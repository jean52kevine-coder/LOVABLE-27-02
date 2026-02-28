import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, ChevronDown, Globe, Shield, ShoppingCart, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import HeroBackground from '@/components/HeroBackground';

const WORDS = ['performantes', 'rapides', 'optimisées', 'sur-mesure'];

const SERVICES = [
  {
    id: 'vitrine',
    icon: Globe,
    color: '#00C2FF',
    price: '497€',
    title: 'Site Vitrine Premium',
    tagline: 'Présentez votre activité. Convertissez vos visiteurs.',
    desc: 'Un site professionnel qui travaille pour vous 24h/24. Design moderne, SEO local optimisé, formulaire de contact performant.',
    features: ['Design 100% sur-mesure', '1 à 5 pages stratégiques', 'SEO local (Google Maps inclus)', 'Formulaire de contact + notifications', 'Hébergement 1 an offert', 'Livraison en 7 à 14 jours'],
  },
  {
    id: 'ecommerce',
    icon: ShoppingCart,
    color: '#7B2FFF',
    price: '747€',
    title: 'E-commerce Performance',
    tagline: 'Vendez en ligne. Automatisez vos ventes.',
    desc: "Une boutique complète avec tunnel d'achat optimisé, gestion des stocks et tableau de bord intuitif.",
    features: ['Produits illimités', 'Paiement Stripe & PayPal', 'Gestion stocks & commandes', 'Dashboard admin intuitif', 'SEO e-commerce avancé', 'Formation 2h incluse'],
    featured: true,
  },
  {
    id: 'maintenance',
    icon: Shield,
    color: '#10B981',
    price: 'dès 39€/mois',
    title: 'Maintenance & Croissance',
    tagline: 'Protégez votre site. Améliorez votre SEO.',
    desc: 'Votre site toujours sécurisé, rapide et visible sur Google. Zéro effort de votre côté.',
    features: ['Sécurité & pare-feu actif', 'Sauvegardes hebdomadaires', 'Monitoring 24/7', 'Optimisation SEO continue', '1 à 3 modifications/mois', 'Rapport mensuel détaillé'],
  },
];

const FAQ = [
  { q: 'Combien de temps pour créer mon site ?', a: 'Entre 7 et 14 jours ouvrés pour un site vitrine. 14 à 21 jours pour un e-commerce.' },
  { q: 'Je peux modifier moi-même le contenu ?', a: "Oui, on vous forme à l'utilisation du CMS. Vous êtes autonome après livraison." },
  { q: 'Que se passe-t-il si je ne suis pas satisfait ?', a: '3 mois de corrections gratuites inclus. On est là jusqu\'à ce que vous soyez 100% satisfait.' },
  { q: 'Mon site sera-t-il bien positionné sur Google ?', a: 'On optimise votre SEO dès la création : balises, vitesse, mobile-first. Résultats visibles en 2-3 mois.' },
  { q: 'Comment se passent les paiements ?', a: '50% à la commande, 50% à la livraison. Paiement en 2 fois possible pour les forfaits supérieurs à 700€.' },
];

export default function Services() {
  const [wordIndex, setWordIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const id = setInterval(() => setWordIndex((p) => (p + 1) % WORDS.length), 2300);
    return () => clearInterval(id);
  }, []);

  return (
    <main className="pt-[60px] pb-[76px] md:pt-0 md:pb-0">
      <section style={{ position: 'relative', minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '120px 24px 80px' }}>
        <HeroBackground variant="services" />
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(38px,6vw,68px)', margin: 0 }}>Nos expertises</h1>
          <AnimatePresence mode="wait">
            <motion.p key={wordIndex} initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -24, opacity: 0 }} style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 'clamp(32px,5vw,56px)', margin: '8px 0', background: 'linear-gradient(135deg,#7B2FFF,#00C2FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{WORDS[wordIndex]}</motion.p>
          </AnimatePresence>
          <p style={{ color: 'rgba(255,255,255,0.78)', maxWidth: 600, margin: '16px auto 0' }}>Des solutions web robustes pour générer plus de prospects, améliorer votre image et accélérer votre croissance.</p>
        </div>
      </section>

      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '70px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 18 }}>
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <motion.article whileHover={{ y: -8 }} key={service.id} style={{ borderRadius: 22, border: `1px solid ${service.featured ? 'rgba(123,47,255,0.45)' : 'rgba(255,255,255,0.1)'}`, background: 'linear-gradient(155deg,#090916,#0E0E25)', padding: 24, boxShadow: `0 0 0 rgba(0,0,0,0)` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ width: 56, height: 56, borderRadius: '50%', display: 'grid', placeItems: 'center', background: `linear-gradient(135deg, ${service.color}, rgba(255,255,255,0.15))` }}><Icon color="white" /></div>
                  <span style={{ padding: '6px 12px', borderRadius: 999, fontWeight: 700, fontSize: 13, background: 'rgba(255,255,255,0.08)' }}>{service.price}</span>
                </div>
                <h3 style={{ fontFamily: 'Syne,sans-serif', fontSize: 22, marginBottom: 4 }}>{service.title}</h3>
                <p style={{ marginTop: 0, color: service.color }}>{service.tagline}</p>
                <p style={{ color: 'rgba(255,255,255,0.78)' }}>{service.desc}</p>
                {service.features.map((f) => (
                  <p key={f} style={{ margin: '8px 0', display: 'flex', gap: 8, alignItems: 'center', color: 'rgba(255,255,255,0.82)' }}><Check size={14} color="#10B981" /> {f}</p>
                ))}
                <div style={{ height: 3, margin: '16px 0', borderRadius: 999, background: service.color }} />
                <Link to={`/contact?type=${service.id}`} style={{ color: 'white' }}>Parler de mon projet →</Link>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '20px 24px 70px' }}>
        <h2 style={{ fontFamily: 'Syne,sans-serif' }}>Inclus dans tous nos projets</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 14 }}>
          {['Design responsive', 'Optimisation SEO', 'Sécurité SSL', 'Performance mobile', 'Formation livraison', 'Support après mise en ligne'].map((item) => (
            <div key={item} style={{ border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: 14, background: 'repeating-linear-gradient(135deg, rgba(255,255,255,0.02), rgba(255,255,255,0.02) 10px, rgba(123,47,255,0.03) 10px, rgba(123,47,255,0.03) 20px)' }}>
              <Sparkles size={14} color="#00C2FF" />
              <p style={{ marginBottom: 0 }}>{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '20px 24px 70px' }}>
        <h2 style={{ fontFamily: 'Syne,sans-serif' }}>Processus</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 12 }}>
          {['01 Découverte', '02 Design', '03 Développement', '04 Livraison'].map((step) => (
            <div key={step} style={{ border: '1px solid rgba(255,255,255,0.12)', borderRadius: 14, padding: 14 }}>
              <p style={{ margin: 0 }}>{step}</p>
              <div style={{ marginTop: 8, height: 2, background: 'linear-gradient(90deg,#7B2FFF,#00C2FF)' }} />
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 900, margin: '0 auto', padding: '20px 24px 100px' }}>
        <h2 style={{ fontFamily: 'Syne,sans-serif' }}>FAQ</h2>
        {FAQ.map((item, i) => {
          const open = openFaq === i;
          return (
            <div key={item.q} style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, marginBottom: 10, overflow: 'hidden' }}>
              <button onClick={() => setOpenFaq(open ? null : i)} style={{ width: '100%', background: 'transparent', color: 'white', border: 'none', textAlign: 'left', padding: 14, display: 'flex', justifyContent: 'space-between' }}>
                {item.q} <ChevronDown size={16} style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} style={{ overflow: 'hidden' }}>
                    <p style={{ margin: 0, padding: '0 14px 14px', color: 'rgba(255,255,255,0.78)' }}>{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </section>
    </main>
  );
}
