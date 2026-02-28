import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import HeroBackground from '@/components/HeroBackground';

const STATS = [
  { value: '4,6×', label: 'Plus de prospects', detail: 'Un site bien référencé génère en moyenne 4,6× plus de contacts que le bouche-à-oreille seul.' },
  { value: '81%', label: 'Vérifient en ligne', detail: "Des consommateurs vérifient la présence en ligne d'un commerce avant de s'y rendre." },
  { value: '14j', label: 'Pour être en ligne', detail: 'Délai de livraison ALTÉRA garanti. Vous commencez à générer des clients en 2 semaines.' },
  { value: '4-6m', label: 'Retour sur invest.', detail: 'Nos clients récupèrent leur investissement en 4 à 6 mois grâce aux nouveaux contacts générés.' },
];

const sectors = [
  { name: 'Artisan', problem: 'Dépendance au bouche-à-oreille.', answer: 'Un site avec galerie + avis augmente votre crédibilité locale.', stat: '+42% d\'appels qualifiés' },
  { name: 'Restaurant', problem: 'Clients perdus sans menu ni réservation en ligne.', answer: 'Page menu mobile + réservation rapide depuis Google.', stat: '+37% de réservations' },
  { name: 'Commerce', problem: 'Horaires et produits difficiles à trouver.', answer: 'Fiche locale optimisée et pages produits attractives.', stat: '+2.8x de visites en magasin' },
  { name: 'Profession libérale', problem: 'Image peu professionnelle sans vitrine digitale.', answer: 'Positionnement expert + prise de rendez-vous automatisée.', stat: '+55% de demandes de contact' },
];

export default function PourquoiUnSite() {
  const [active, setActive] = useState(0);

  return (
    <main className="pt-[60px] pb-[76px] md:pt-0 md:pb-0">
      <section style={{ position: 'relative', minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '120px 24px 80px' }}>
        <HeroBackground variant="pourquoi" />
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 900 }}>
          <h1 style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(36px,5.5vw,62px)', marginBottom: 10 }}>Invisible en ligne = client perdu.</h1>
          <p style={{ color: 'rgba(255,255,255,0.78)' }}>93% des achats commencent par une recherche Google. Où en êtes-vous ?</p>
        </div>
      </section>

      <section style={{ maxWidth: 980, margin: '0 auto', padding: '70px 24px', textAlign: 'center' }}>
        <p style={{ margin: 0, fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 'clamp(72px,18vw,120px)', background: 'linear-gradient(135deg,#7B2FFF,#00C2FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>93%</p>
        <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: 20, margin: '6px 0' }}>des recherches locales commencent sur Google.</p>
        <p style={{ color: 'rgba(255,255,255,0.78)', margin: 0 }}>Votre concurrent qui a un site capte ces clients.</p>
      </section>

      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '10px 24px 70px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 14 }}>
          <div style={{ borderRadius: 16, border: '1px solid rgba(239,68,68,0.3)', background: 'rgba(127,29,29,0.22)', padding: 18 }}>
            <h3>❌ Sans site web</h3>
            {['Invisible Google', 'Clients perdus', 'Image amateure', 'Zéro crédibilité', '0€ de CA digital'].map((x) => <p key={x}>{x}</p>)}
          </div>
          <div style={{ borderRadius: 16, border: '1px solid rgba(16,185,129,0.35)', background: 'rgba(5,46,22,0.32)', padding: 18 }}>
            <h3>✅ Avec ALTÉRA</h3>
            {['1ère page Google', 'Leads 24h/24', 'Image professionnelle', 'Confiance client', '+180% de CA moyen'].map((x) => <p key={x}>{x}</p>)}
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '10px 24px 70px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 14 }}>
          {sectors.map((sector, i) => (
            <button key={sector.name} onClick={() => setActive(i)} style={{ border: '1px solid rgba(255,255,255,0.18)', background: active === i ? 'rgba(123,47,255,0.28)' : 'transparent', color: 'white', borderRadius: 999, padding: '8px 14px' }}>{sector.name}</button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={sectors[active].name} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: 18 }}>
            <p><strong>Problème :</strong> {sectors[active].problem}</p>
            <p><strong>Réponse ALTÉRA :</strong> {sectors[active].answer}</p>
            <p style={{ color: '#00C2FF', marginBottom: 0 }}>{sectors[active].stat}</p>
          </motion.div>
        </AnimatePresence>
      </section>

      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '10px 24px 100px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 14 }}>
          {STATS.map((stat) => (
            <div key={stat.label} style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: 14, padding: 14 }}>
              <p style={{ margin: 0, fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 48 }}>{stat.value}</p>
              <p style={{ margin: '4px 0', fontWeight: 700 }}>{stat.label}</p>
              <p style={{ margin: 0, color: 'rgba(255,255,255,0.78)', fontSize: 14 }}>{stat.detail}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
