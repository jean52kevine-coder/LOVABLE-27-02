import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import HeroBackground from '@/components/HeroBackground';
import TestimonialsMarquee from '@/components/TestimonialsMarquee';

const WORDS = ['artisans', 'commerçants', 'restaurants', 'PME locales', 'indépendants'];

const MAINTENANCE_PLANS = [
  { name: 'Essentiel', price: 39, features: ['Sécurité & pare-feu', 'Sauvegardes hebdo', 'Monitoring 24/7'] },
  { name: 'Pro', price: 44, features: ['Tout Essentiel', 'SEO continu', '1 modification/mois', 'Rapport mensuel'] },
  { name: 'Premium', price: 49, features: ['Tout Pro', 'Support prioritaire', '3 modifications/mois', 'Audit trimestriel'] },
];

export default function Home() {
  return (
    <main className="pt-[60px] pb-[76px] md:pt-0 md:pb-0">
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <ProcessSection />
      <PricingSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
}

function HeroSection() {
  const [idx, setIdx] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const id = setInterval(() => setIdx((p) => (p + 1) % WORDS.length), 2300);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 24px 80px',
        textAlign: 'center',
      }}
    >
      <HeroBackground variant="home" />
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px' }}>
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '7px 20px',
            borderRadius: '999px',
            marginBottom: '36px',
            background: 'rgba(123,47,255,0.1)',
            border: '1px solid rgba(123,47,255,0.3)',
          }}
        >
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#7B2FFF', boxShadow: '0 0 8px #7B2FFF' }} />
          <span style={{ fontWeight: 600, fontSize: '11px', letterSpacing: '.22em', textTransform: 'uppercase', color: '#B090FF' }}>
            AGENCE WEB PREMIUM
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 'clamp(36px,5.5vw,64px)', lineHeight: 1.05, margin: '0 0 6px' }}
        >
          Votre présence en ligne,
        </motion.h1>

        <div style={{ height: 'clamp(44px,7vw,76px)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '28px' }}>
          <AnimatePresence mode="wait">
            <motion.span
              key={idx}
              initial={{ y: 60, opacity: 0, rotateX: -15 }}
              animate={{ y: 0, opacity: 1, rotateX: 0 }}
              exit={{ y: -60, opacity: 0, rotateX: 15 }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              style={{
                display: 'block',
                fontFamily: 'Syne,sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(36px,5.5vw,64px)',
                background: 'linear-gradient(135deg, #7B2FFF, #00C2FF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {WORDS[idx]}.
            </motion.span>
          </AnimatePresence>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          style={{ fontSize: 'clamp(15px,1.8vw,18px)', color: 'rgba(255,255,255,0.78)', lineHeight: 1.75, maxWidth: '520px', margin: '0 auto 44px' }}
        >
          Sites web performants pour artisans, commerces et PME.
          <br />
          Design sur-mesure, livraison en 14 jours.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => navigate('/contact')} style={{ padding: '14px 36px', borderRadius: '12px', border: 'none', background: 'linear-gradient(135deg,#7B2FFF,#00C2FF)', fontWeight: 600, color: 'white' }}>
            Démarrer mon projet →
          </button>
          <button onClick={() => navigate('/services')} style={{ padding: '14px 36px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.18)', background: 'rgba(255,255,255,0.04)', fontWeight: 600, color: 'white' }}>
            Découvrir nos services
          </button>
        </motion.div>
      </div>
    </section>
  );
}

function StatsSection() {
  const items = [
    { value: '14j', label: 'Livraison moyenne' },
    { value: '4.9/5', label: 'Satisfaction client' },
    { value: '24h', label: 'Réponse devis' },
    { value: '+180%', label: 'Leads moyens générés' },
  ];

  return (
    <section style={{ maxWidth: 1100, margin: '0 auto', padding: '70px 24px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '14px' }}>
        {items.map((item) => (
          <div key={item.label} style={{ border: '1px solid rgba(123,47,255,0.18)', borderRadius: 16, padding: 18, background: 'rgba(255,255,255,0.02)' }}>
            <p style={{ margin: 0, fontSize: 28, fontWeight: 800, fontFamily: 'Syne,sans-serif' }}>{item.value}</p>
            <p style={{ margin: '4px 0 0', color: 'rgba(255,255,255,0.78)' }}>{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ServicesSection() {
  const items = [
    { t: 'Site vitrine', p: '497€', d: 'Présence premium locale et conversion optimisée.' },
    { t: 'E-commerce', p: '747€', d: 'Tunnel d\'achat et paiement sécurisé intégrés.' },
    { t: 'Maintenance', p: 'dès 39€/mois', d: 'Sécurité, SEO et performances en continu.' },
  ];
  return (
    <section style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px 80px' }}>
      <h2 style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(30px,4vw,48px)', marginBottom: 20 }}>Services premium</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: 16 }}>
        {items.map((item) => (
          <div key={item.t} style={{ borderRadius: 18, border: '1px solid rgba(123,47,255,0.2)', background: 'linear-gradient(155deg,#0A0A1F,#0C0C26)', padding: 20 }}>
            <p style={{ margin: 0, fontWeight: 700 }}>{item.p}</p>
            <h3 style={{ fontFamily: 'Syne,sans-serif', margin: '8px 0' }}>{item.t}</h3>
            <p style={{ margin: 0, color: 'rgba(255,255,255,0.78)' }}>{item.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProcessSection() {
  const steps = ['Découverte', 'Design', 'Développement', 'Livraison'];
  return (
    <section style={{ maxWidth: 1100, margin: '0 auto', padding: '20px 24px 80px' }}>
      <h2 style={{ fontFamily: 'Syne,sans-serif' }}>Notre processus en 4 étapes</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 14, marginTop: 18 }}>
        {steps.map((s, i) => (
          <div key={s} style={{ border: '1px solid rgba(255,255,255,0.12)', borderRadius: 14, padding: 16 }}>
            <p style={{ color: '#00C2FF', margin: 0 }}>0{i + 1}</p>
            <p style={{ margin: '4px 0 0', fontWeight: 600 }}>{s}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section style={{ maxWidth: 1100, margin: '0 auto', padding: '20px 24px 80px' }}>
      <h2 style={{ fontFamily: 'Syne,sans-serif' }}>Forfaits maintenance</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: 16, marginTop: 18 }}>
        {MAINTENANCE_PLANS.map((plan) => (
          <div key={plan.name} style={{ borderRadius: 18, border: '1px solid rgba(123,47,255,0.2)', padding: 20, background: 'rgba(255,255,255,0.02)' }}>
            <p style={{ margin: 0, color: '#00C2FF' }}>{plan.name}</p>
            <p style={{ margin: '6px 0', fontSize: 34, fontWeight: 800, fontFamily: 'Syne,sans-serif' }}>{plan.price}€<span style={{ fontSize: 14 }}>/mois</span></p>
            {plan.features.map((f) => (
              <p key={f} style={{ margin: '6px 0', display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.78)' }}><Check size={14} color="#10B981" /> {f}</p>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section style={{ maxWidth: 1200, margin: '0 auto', padding: '20px 24px 80px' }}>
      <h2 style={{ fontFamily: 'Syne,sans-serif', marginBottom: 18 }}>Ils nous recommandent</h2>
      <TestimonialsMarquee />
    </section>
  );
}

function CTASection() {
  const navigate = useNavigate();
  return (
    <section style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px 90px' }}>
      <div style={{ border: '1px solid rgba(123,47,255,0.2)', borderRadius: 24, padding: 28, background: 'linear-gradient(135deg, rgba(123,47,255,0.14), rgba(0,194,255,0.08))', textAlign: 'center' }}>
        <Sparkles size={22} style={{ marginBottom: 8 }} />
        <h3 style={{ fontFamily: 'Syne,sans-serif', margin: '0 0 8px' }}>Prêt à transformer votre visibilité ?</h3>
        <p style={{ color: 'rgba(255,255,255,0.78)', marginBottom: 16 }}>Un devis clair, une livraison rapide, des résultats mesurables.</p>
        <button onClick={() => navigate('/contact')} style={{ border: 'none', padding: '12px 24px', borderRadius: 12, color: 'white', background: 'linear-gradient(135deg,#7B2FFF,#00C2FF)', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          Demander un devis <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
}
