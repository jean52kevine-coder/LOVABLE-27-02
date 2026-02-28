import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Check, Globe, ShoppingCart, Shield, ArrowRight } from 'lucide-react';

function CountUp({ target, suffix = '' }: { target: number | string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [displayed, setDisplayed] = useState(0);
  const isNumber = typeof target === 'number';

  useEffect(() => {
    if (!inView || !isNumber) return;
    let n = 0;
    const steps = 40;
    const inc = (target as number) / steps;
    const id = setInterval(() => {
      n += inc;
      if (n >= (target as number)) {
        setDisplayed(target as number);
        clearInterval(id);
        return;
      }
      setDisplayed(Math.round(n));
    }, 600 / steps);
    return () => clearInterval(id);
  }, [inView, target, isNumber]);

  return <span ref={ref}>{isNumber ? displayed : target}{suffix}</span>;
}

const STREAKS = [
  { top: '8%', left: '10%', delay: '0s', dur: '3s', w: '140px' },
  { top: '22%', left: '55%', delay: '1.4s', dur: '2.5s', w: '90px' },
  { top: '6%', left: '72%', delay: '3s', dur: '3.2s', w: '160px' },
  { top: '40%', left: '20%', delay: '0.8s', dur: '2.8s', w: '110px' },
  { top: '15%', left: '38%', delay: '4.2s', dur: '2.6s', w: '120px' },
  { top: '55%', left: '78%', delay: '2.1s', dur: '3s', w: '75px' },
  { top: '3%', left: '48%', delay: '5s', dur: '2.4s', w: '130px' },
  { top: '32%', left: '88%', delay: '3.5s', dur: '3.4s', w: '95px' },
];

function ShootingStars() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {STREAKS.map((s, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: s.top,
            left: s.left,
            width: s.w,
            height: '1.5px',
            borderRadius: '999px',
            background: 'linear-gradient(90deg, transparent, rgba(255,250,220,0.85), transparent)',
            transform: 'rotate(-35deg)',
            animation: `streak ${s.dur} ease-in-out ${s.delay} infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes streak {
          0%   { opacity:0; transform:translateX(-80px) rotate(-35deg) scaleX(0.2); }
          15%  { opacity:1; }
          75%  { opacity:0.7; }
          100% { opacity:0; transform:translateX(200px) rotate(-35deg) scaleX(1); }
        }
      `}</style>
    </div>
  );
}

const WORDS = ['artisans', 'commerçants', 'restaurants', 'PME locales', 'indépendants'];

function HeroSection() {
  const [idx, setIdx] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const id = setInterval(() => setIdx((p) => (p + 1) % WORDS.length), 2400);
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
        padding: 'clamp(100px,12vh,140px) 24px 80px',
        textAlign: 'center',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          background: 'radial-gradient(ellipse 85% 55% at 50% -5%, rgba(123,47,255,0.4) 0%, rgba(3,3,10,0) 70%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          background: 'radial-gradient(ellipse 45% 45% at 85% 15%, rgba(0,194,255,0.14) 0%, transparent 65%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          backgroundImage:
            'linear-gradient(rgba(123,47,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(123,47,255,0.04) 1px,transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '180px',
          zIndex: 0,
          background: 'linear-gradient(to bottom, transparent, #03030A)',
          pointerEvents: 'none',
        }}
      />
      <ShootingStars />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '860px', width: '100%' }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '7px 20px',
            borderRadius: '999px',
            marginBottom: '36px',
            background: 'rgba(123,47,255,0.12)',
            border: '1px solid rgba(123,47,255,0.35)',
          }}
        >
          <span
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              background: '#7B2FFF',
              boxShadow: '0 0 10px #7B2FFF',
              display: 'inline-block',
              animation: 'pulse2 2s infinite',
            }}
          />
          <span
            style={{
              fontFamily: 'DM Sans,sans-serif',
              fontWeight: 600,
              fontSize: '11px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#B090FF',
            }}
          >
            AGENCE WEB PREMIUM
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: 'Syne,sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(38px,5.8vw,68px)',
            lineHeight: 1.04,
            color: 'white',
            margin: '0 0 4px',
          }}
        >
          Votre présence en ligne,
        </motion.h1>

        <div
          style={{
            height: 'clamp(48px,7.5vw,80px)',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '28px',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={idx}
              initial={{ y: 65, opacity: 0, rotateX: -18 }}
              animate={{ y: 0, opacity: 1, rotateX: 0 }}
              exit={{ y: -65, opacity: 0, rotateX: 18 }}
              transition={{ duration: 0.44, ease: [0.22, 1, 0.36, 1] }}
              style={{
                display: 'block',
                fontFamily: 'Syne,sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(38px,5.8vw,68px)',
                lineHeight: 1.04,
                background: 'linear-gradient(135deg,#7B2FFF,#00C2FF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {WORDS[idx]}.
            </motion.span>
          </AnimatePresence>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.52 }}
          style={{
            fontFamily: 'DM Sans,sans-serif',
            fontSize: 'clamp(15px,1.8vw,18px)',
            color: 'rgba(255,255,255,0.78)',
            lineHeight: 1.72,
            maxWidth: '510px',
            margin: '0 auto 44px',
          }}
        >
          Sites web performants pour artisans, commerces et PME.
          <br />
          Design sur-mesure, livraison en 14 jours.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.66 }}
          style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <button
            onClick={() => navigate('/contact')}
            style={{
              padding: '14px 38px',
              borderRadius: '12px',
              border: 'none',
              cursor: 'pointer',
              background: 'linear-gradient(135deg,#7B2FFF,#00C2FF)',
              fontFamily: 'DM Sans,sans-serif',
              fontWeight: 600,
              fontSize: '15px',
              color: 'white',
              boxShadow: '0 8px 30px rgba(123,47,255,0.45)',
              transition: 'transform 250ms,box-shadow 250ms',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 14px 40px rgba(123,47,255,0.65)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(123,47,255,0.45)';
            }}
          >
            Démarrer mon projet →
          </button>
          <button
            onClick={() => navigate('/services')}
            style={{
              padding: '14px 38px',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.18)',
              background: 'rgba(255,255,255,0.04)',
              cursor: 'pointer',
              fontFamily: 'DM Sans,sans-serif',
              fontWeight: 600,
              fontSize: '15px',
              color: 'white',
              transition: 'border-color 250ms,background 250ms',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(123,47,255,0.5)';
              e.currentTarget.style.background = 'rgba(123,47,255,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
            }}
          >
            Découvrir nos services
          </button>
        </motion.div>
      </div>

      <style>{`@keyframes pulse2{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.65)}}`}</style>
    </section>
  );
}

function StatsSection() {
  const stats = [
    { value: 14, suffix: 'j', label: 'Livraison moyenne' },
    { value: '4.9', suffix: '/5', label: 'Satisfaction client' },
    { value: 24, suffix: 'h', label: 'Réponse devis' },
    { value: '+180', suffix: '%', label: 'Leads moyens générés' },
  ];

  return (
    <section style={{ padding: '0 24px 80px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px' }}>
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.55 }}
            style={{
              background: 'linear-gradient(145deg,rgba(123,47,255,0.07),rgba(0,194,255,0.04))',
              border: '1px solid rgba(123,47,255,0.18)',
              borderRadius: '18px',
              padding: '28px 20px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontFamily: 'Syne,sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(32px,3.5vw,48px)',
                lineHeight: 1,
                background: 'linear-gradient(135deg,#7B2FFF,#00C2FF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '8px',
              }}
            >
              <CountUp target={typeof s.value === 'number' ? s.value : s.value} suffix={s.suffix} />
            </div>
            <p style={{ fontFamily: 'DM Sans,sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.55)', margin: 0 }}>
              {s.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

const SERVICES = [
  {
    icon: Globe,
    color: '#00C2FF',
    price: '497€',
    id: 'vitrine',
    title: 'Site Vitrine Premium',
    desc: 'Un site professionnel qui travaille pour vous 24h/24. Design moderne, SEO local, formulaire de contact.',
    features: ['Design 100% sur-mesure', '1 à 5 pages stratégiques', 'SEO local optimisé', 'Formulaire de contact', 'Hébergement 1 an offert', 'Livraison 7-14 jours'],
  },
  {
    icon: ShoppingCart,
    color: '#7B2FFF',
    price: '747€',
    id: 'ecommerce',
    title: 'E-commerce Performance',
    desc: "Vendez en ligne 24h/24. Tunnel d'achat optimisé, paiements sécurisés, tableau de bord intuitif.",
    features: ['Produits illimités', 'Paiement Stripe & PayPal', 'Gestion stocks & commandes', 'Dashboard admin', 'SEO e-commerce avancé', 'Formation 2h incluse'],
    featured: true,
  },
  {
    icon: Shield,
    color: '#10B981',
    price: 'dès 39€/mois',
    id: 'maintenance',
    title: 'Maintenance & Croissance',
    desc: 'Votre site toujours sécurisé, rapide et visible sur Google. Sans effort de votre côté.',
    features: ['Sécurité & pare-feu actif', 'Sauvegardes hebdomadaires', 'Monitoring 24/7', 'SEO continu', 'Modifications incluses', 'Rapport mensuel'],
  },
];

function ServicesSection() {
  const navigate = useNavigate();
  return (
    <section style={{ padding: '80px 24px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '56px' }}>
        <span
          style={{
            fontFamily: 'DM Sans,sans-serif',
            fontWeight: 600,
            fontSize: '11px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#7B2FFF',
            display: 'block',
            marginBottom: '14px',
          }}
        >
          • NOS SERVICES •
        </span>
        <h2 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 'clamp(28px,4vw,44px)', color: 'white', margin: 0, lineHeight: 1.1 }}>
          Services{' '}
          <span style={{ background: 'linear-gradient(135deg,#7B2FFF,#00C2FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            premium
          </span>
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '24px' }}>
        {SERVICES.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8 }}
              style={{
                position: 'relative',
                overflow: 'hidden',
                background: 'linear-gradient(145deg,#0D0D22,#0A0A1C)',
                border: s.featured ? `2px solid ${s.color}` : '1px solid rgba(123,47,255,0.2)',
                borderRadius: '22px',
                padding: '32px 28px',
                boxShadow: s.featured ? `0 0 60px rgba(123,47,255,0.22)` : 'none',
                transition: 'box-shadow 300ms',
                cursor: 'default',
              }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg,${s.color},#7B2FFF)` }} />
              {s.featured && (
                <div
                  style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    background: 'linear-gradient(135deg,#7B2FFF,#00C2FF)',
                    borderRadius: '999px',
                    padding: '4px 14px',
                    fontFamily: 'DM Sans,sans-serif',
                    fontWeight: 700,
                    fontSize: '11px',
                    letterSpacing: '0.1em',
                    color: 'white',
                  }}
                >
                  BEST SELLER
                </div>
              )}
              <div
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '14px',
                  marginBottom: '22px',
                  background: `linear-gradient(135deg,${s.color}22,${s.color}11)`,
                  border: `1px solid ${s.color}44`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon size={24} color={s.color} />
              </div>
              <h3 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: '20px', color: 'white', margin: '0 0 6px' }}>{s.title}</h3>
              <div
                style={{
                  fontFamily: 'Syne,sans-serif',
                  fontWeight: 800,
                  fontSize: '26px',
                  background: `linear-gradient(135deg,${s.color},#7B2FFF)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '14px',
                }}
              >
                {s.price}
              </div>
              <p style={{ fontFamily: 'DM Sans,sans-serif', fontSize: '14px', color: 'rgba(255,255,255,0.72)', lineHeight: 1.7, marginBottom: '22px' }}>
                {s.desc}
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 26px', display: 'flex', flexDirection: 'column', gap: '9px' }}>
                {s.features.map((f) => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Check size={14} color="#10B981" strokeWidth={2.5} style={{ flexShrink: 0 }} />
                    <span style={{ fontFamily: 'DM Sans,sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.68)' }}>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate(`/contact?type=${s.id}`)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontFamily: 'DM Sans,sans-serif',
                  fontWeight: 600,
                  fontSize: '14px',
                  color: s.color,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'gap 200ms',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.gap = '12px')}
                onMouseLeave={(e) => (e.currentTarget.style.gap = '6px')}
              >
                Voir l'offre <ArrowRight size={15} />
              </button>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

const STEPS = [
  { n: '01', emoji: '💬', title: 'Découverte', desc: 'Consultation 30min offerte. On analyse votre activité, objectifs et marché.', delay: 'Jour 1' },
  { n: '02', emoji: '🎨', title: 'Design', desc: "Maquettes aux couleurs de votre marque. Vous validez avant qu'on code.", delay: 'J. 2–5' },
  { n: '03', emoji: '⚡', title: 'Développement', desc: 'Code propre, rapide, SEO-optimisé. Mobile-first, accessible partout.', delay: 'J. 5–12' },
  { n: '04', emoji: '🚀', title: 'Livraison', desc: 'Tests complets, mise en ligne et formation. Vous êtes 100% autonome.', delay: 'J. 12–14' },
];

function ProcessSection() {
  return (
    <section style={{ padding: '80px 24px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '52px' }}>
        <span style={{ fontFamily: 'DM Sans,sans-serif', fontWeight: 600, fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#7B2FFF', display: 'block', marginBottom: '14px' }}>
          • NOTRE MÉTHODE •
        </span>
        <h2 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 'clamp(28px,4vw,44px)', color: 'white', margin: 0, lineHeight: 1.1 }}>
          Votre projet en{' '}
          <span style={{ background: 'linear-gradient(135deg,#7B2FFF,#00C2FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>4 étapes</span>
        </h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(230px,1fr))', gap: '18px' }}>
        {STEPS.map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.55 }}
            style={{
              background: 'linear-gradient(145deg,rgba(123,47,255,0.07),rgba(0,194,255,0.03))',
              border: '1px solid rgba(123,47,255,0.16)',
              borderRadius: '18px',
              padding: '28px 24px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
              <span style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: '36px', lineHeight: 1, background: 'linear-gradient(135deg,#7B2FFF,#00C2FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', opacity: 0.45 }}>
                {s.n}
              </span>
              <span style={{ fontSize: '26px' }}>{s.emoji}</span>
              <span
                style={{
                  fontFamily: 'DM Sans,sans-serif',
                  fontSize: '11px',
                  fontWeight: 600,
                  background: 'rgba(0,194,255,0.1)',
                  border: '1px solid rgba(0,194,255,0.2)',
                  color: '#00C2FF',
                  borderRadius: '999px',
                  padding: '3px 10px',
                }}
              >
                {s.delay}
              </span>
            </div>
            <h3 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: '17px', color: 'white', margin: '0 0 8px' }}>{s.title}</h3>
            <p style={{ fontFamily: 'DM Sans,sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.58)', lineHeight: 1.65, margin: 0 }}>{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

const PLANS = [
  {
    name: 'SITE VITRINE',
    price: 497,
    period: 'paiement unique',
    desc: 'Pour présenter votre activité et générer des leads qualifiés.',
    features: ['Design sur-mesure', '1 à 5 pages', 'SEO local', 'Formulaire contact', 'Hébergement 1 an'],
    href: '/contact?type=vitrine',
  },
  {
    name: 'E-COMMERCE',
    price: 747,
    period: 'paiement unique',
    desc: 'Pour vendre en ligne et convertir vos visiteurs en clients.',
    features: ['Produits illimités', 'Paiement Stripe & PayPal', 'Gestion stocks', 'Dashboard admin', 'Formation 2h'],
    href: '/contact?type=ecommerce',
    popular: true,
  },
  {
    name: 'MAINTENANCE',
    price: 39,
    period: '/mois dès',
    desc: 'Sécurité, SEO et performances en continu.',
    features: ['Sécurité & pare-feu', 'Sauvegardes hebdo', 'Monitoring 24/7', 'SEO continu', 'Rapport mensuel'],
    href: '/contact?type=maintenance',
  },
];

function AnimatedPrice({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let n = 0;
    const steps = 28;
    const id = setInterval(() => {
      n += target / steps;
      if (n >= target) {
        setVal(target);
        clearInterval(id);
        return;
      }
      setVal(Math.round(n));
    }, 350 / steps);
    return () => clearInterval(id);
  }, [inView, target]);

  return <span ref={ref}>{val}</span>;
}

function PricingSection() {
  const navigate = useNavigate();
  return (
    <section style={{ padding: '80px 24px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '56px' }}>
        <span style={{ fontFamily: 'DM Sans,sans-serif', fontWeight: 600, fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#7B2FFF', display: 'block', marginBottom: '14px' }}>
          • TARIFS •
        </span>
        <h2 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 'clamp(28px,4vw,44px)', color: 'white', margin: 0, lineHeight: 1.1 }}>
          Des prix clairs.{' '}
          <span style={{ background: 'linear-gradient(135deg,#7B2FFF,#00C2FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Zéro surprise.
          </span>
        </h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '24px', alignItems: 'center' }}>
        {PLANS.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 44 }}
            whileInView={{ opacity: 1, y: p.popular ? -12 : 0, scale: p.popular ? 1.03 : 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.65, type: 'spring', stiffness: 100 }}
            style={{
              position: 'relative',
              overflow: 'hidden',
              background: 'linear-gradient(145deg,#0D0D22,#0A0A1C)',
              border: p.popular ? '2px solid #7B2FFF' : '1px solid rgba(123,47,255,0.18)',
              borderRadius: '22px',
              padding: '38px 30px',
              boxShadow: p.popular ? '0 0 80px rgba(123,47,255,0.28)' : 'none',
              zIndex: p.popular ? 2 : 1,
            }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg,#7B2FFF,#00C2FF)' }} />
            {p.popular && (
              <div
                style={{
                  position: 'absolute',
                  top: '-1px',
                  left: '50%',
                  transform: 'translateX(-50%) translateY(-50%)',
                  background: 'linear-gradient(135deg,#7B2FFF,#00C2FF)',
                  borderRadius: '999px',
                  padding: '5px 20px',
                  fontFamily: 'DM Sans,sans-serif',
                  fontWeight: 700,
                  fontSize: '11px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'white',
                  whiteSpace: 'nowrap',
                }}
              >
                ⭐ BEST SELLER
              </div>
            )}
            <p style={{ fontFamily: 'DM Sans,sans-serif', fontWeight: 600, fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.38)', margin: '0 0 18px' }}>
              {p.name}
            </p>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', marginBottom: '10px' }}>
              <span style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 'clamp(52px,5.5vw,70px)', color: 'white', lineHeight: 1 }}>
                <AnimatedPrice target={p.price} />
              </span>
              <span style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: '26px', background: 'linear-gradient(135deg,#7B2FFF,#00C2FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', paddingBottom: '8px' }}>
                €
              </span>
              <span style={{ fontFamily: 'DM Sans,sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.32)', paddingBottom: '10px', marginLeft: '4px' }}>{p.period}</span>
            </div>
            <p style={{ fontFamily: 'DM Sans,sans-serif', fontSize: '14px', color: 'rgba(255,255,255,0.62)', marginBottom: '24px', lineHeight: 1.65 }}>
              {p.desc}
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {p.features.map((f) => (
                <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Check size={13} color="#10B981" strokeWidth={2.5} style={{ flexShrink: 0 }} />
                  <span style={{ fontFamily: 'DM Sans,sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.65)' }}>{f}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => navigate(p.href)}
              style={{
                width: '100%',
                height: '50px',
                borderRadius: '11px',
                border: 'none',
                cursor: 'pointer',
                background: p.popular ? 'linear-gradient(135deg,#7B2FFF,#00C2FF)' : 'rgba(123,47,255,0.12)',
                fontFamily: 'DM Sans,sans-serif',
                fontWeight: 600,
                fontSize: '14px',
                color: 'white',
                boxShadow: p.popular ? '0 6px 24px rgba(123,47,255,0.4)' : 'none',
                transition: 'transform 200ms',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'none')}
            >
              Choisir ce forfait →
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

const TESTIMONIALS = [
  { name: 'Marie Dupont', role: 'Fondatrice, Studio Floral Paris', text: 'ALTÉRA a transformé notre présence en ligne. Les demandes ont triplé en 3 mois.', initials: 'MD' },
  { name: 'Thomas Bernard', role: 'Gérant, TechSolutions Lyon', text: 'Notre e-commerce génère 40% de notre CA. Professionnalisme exemplaire.', initials: 'TB' },
  { name: 'Sophie Martin', role: 'Directrice, Agence Immo SM', text: 'Livraison en 12 jours comme promis. Site parfait, je recommande à 100%.', initials: 'SM' },
  { name: 'Jean-Laurent Morel', role: 'Artisan Menuisier', text: "Je ne suis pas informaticien, ils ont tout géré. Maintenant j'ai un site pro qui me ramène des clients.", initials: 'JM' },
  { name: 'Camille Rousseau', role: 'Boulangerie du Centre', text: "Référencement Google explosé. 3× plus d'appels. Investissement ultra rentable.", initials: 'CR' },
  { name: 'Alexandre Chen', role: 'Fondateur, Chen Consulting', text: 'La maintenance vaut chaque euro. Site toujours rapide, sécurisé, SEO meilleur chaque mois.', initials: 'AC' },
];

function TestimonialsSection() {
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS];
  return (
    <section style={{ padding: '80px 0', overflow: 'hidden' }}>
      <div style={{ textAlign: 'center', marginBottom: '52px', padding: '0 24px' }}>
        <span style={{ fontFamily: 'DM Sans,sans-serif', fontWeight: 600, fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#7B2FFF', display: 'block', marginBottom: '14px' }}>
          • ILS NOUS FONT CONFIANCE •
        </span>
        <h2 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 'clamp(28px,4vw,44px)', color: 'white', margin: 0, lineHeight: 1.1 }}>
          Ce qu'en disent nos{' '}
          <span style={{ background: 'linear-gradient(135deg,#7B2FFF,#00C2FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>clients</span>
        </h2>
      </div>
      <div style={{ maskImage: 'linear-gradient(to right,transparent,black 8%,black 92%,transparent)', WebkitMaskImage: 'linear-gradient(to right,transparent,black 8%,black 92%,transparent)' }}>
        <div className="marquee-track" style={{ display: 'flex', gap: '20px', width: 'max-content', animation: 'marqueeAnim 44s linear infinite' }}>
          {doubled.map((t, i) => (
            <div key={i} style={{ flexShrink: 0, width: '300px', background: 'linear-gradient(145deg,rgba(10,10,30,0.88),rgba(13,13,42,0.92))', border: '1px solid rgba(123,47,255,0.16)', borderRadius: '20px', padding: '26px', position: 'relative', overflow: 'hidden' }}>
              <span style={{ position: 'absolute', top: '10px', right: '16px', fontSize: '50px', color: 'rgba(123,47,255,0.1)', fontFamily: 'Georgia', lineHeight: 1 }}>
                "
              </span>
              <div style={{ marginBottom: '10px' }}>{'★★★★★'.split('').map((s, j) => <span key={j} style={{ color: '#F59E0B', fontSize: '13px' }}>{s}</span>)}</div>
              <p style={{ fontFamily: 'DM Sans,sans-serif', fontSize: '13px', fontStyle: 'italic', color: 'rgba(255,255,255,0.68)', lineHeight: 1.72, marginBottom: '18px' }}>
                "{t.text}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '35px', height: '35px', borderRadius: '50%', background: 'linear-gradient(135deg,#7B2FFF,#00C2FF)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: '12px', color: 'white' }}>{t.initials}</span>
                </div>
                <div>
                  <p style={{ fontFamily: 'DM Sans,sans-serif', fontWeight: 600, fontSize: '13px', color: 'white', margin: 0 }}>{t.name}</p>
                  <p style={{ fontFamily: 'DM Sans,sans-serif', fontSize: '11px', color: 'rgba(255,255,255,0.35)', margin: 0 }}>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes marqueeAnim{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        .marquee-track:hover{animation-play-state:paused}
      `}</style>
    </section>
  );
}

function CTASection() {
  const navigate = useNavigate();
  return (
    <section style={{ padding: '80px 24px 120px' }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{
          maxWidth: '720px',
          margin: '0 auto',
          textAlign: 'center',
          background: 'linear-gradient(135deg,rgba(123,47,255,0.1),rgba(0,194,255,0.06))',
          border: '1px solid rgba(123,47,255,0.3)',
          borderRadius: '26px',
          padding: 'clamp(44px,6vw,72px) clamp(24px,5vw,60px)',
          boxShadow: '0 0 80px rgba(123,47,255,0.14)',
        }}
      >
        <h2 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 'clamp(28px,4vw,46px)', color: 'white', margin: '0 0 16px', lineHeight: 1.1 }}>
          Prêt à lancer votre{' '}
          <span style={{ background: 'linear-gradient(135deg,#7B2FFF,#00C2FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>projet ?</span>
        </h2>
        <p style={{ fontFamily: 'DM Sans,sans-serif', fontSize: '16px', color: 'rgba(255,255,255,0.6)', maxWidth: '420px', margin: '0 auto 34px', lineHeight: 1.72 }}>
          Consultation 30 minutes offerte. Devis gratuit, sans engagement.
        </p>
        <button
          onClick={() => navigate('/contact')}
          style={{
            padding: '15px 42px',
            borderRadius: '12px',
            border: 'none',
            cursor: 'pointer',
            background: 'linear-gradient(135deg,#7B2FFF,#00C2FF)',
            fontFamily: 'Syne,sans-serif',
            fontWeight: 700,
            fontSize: '16px',
            color: 'white',
            boxShadow: '0 8px 30px rgba(123,47,255,0.4)',
            transition: 'transform 250ms,box-shadow 250ms',
            display: 'block',
            margin: '0 auto 22px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 16px 44px rgba(123,47,255,0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = '0 8px 30px rgba(123,47,255,0.4)';
          }}
        >
          Démarrer mon projet →
        </button>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '22px', flexWrap: 'wrap' }}>
          {['✓ Réponse sous 24h', '✓ Devis gratuit', '✓ Sans engagement'].map((t) => (
            <span key={t} style={{ fontFamily: 'DM Sans,sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>
              {t}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default function Home() {
  return (
    <main style={{ background: '#03030A', position: 'relative' }}>
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
