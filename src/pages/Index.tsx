import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import TestimonialsMarquee from '@/components/TestimonialsMarquee';

function AnimatedHero() {
  const titles = useMemo(() => ['artisans', 'commerçants', 'restaurants', 'PME locales', 'indépendants'], []);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % titles.length);
    }, 2200);
    return () => window.clearInterval(timer);
  }, [titles.length]);

  return (
    <section className="min-h-screen flex items-center justify-center px-4 pt-24">
      <div className="max-w-4xl mx-auto text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(123,47,255,0.25)] px-4 py-2 text-xs tracking-[0.18em] text-white/75 font-semibold">
          <span className="h-2 w-2 rounded-full bg-[#7B2FFF] animate-pulse" />AGENCE WEB PREMIUM
        </span>
        <h1 className="mt-6 font-heading text-white text-5xl md:text-7xl font-extrabold">Le site web des</h1>
        <div className="h-[84px] mt-2 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span
              key={titles[index]}
              initial={{ y: 60, opacity: 0, rotateX: -15 }}
              animate={{ y: 0, opacity: 1, rotateX: 0 }}
              exit={{ y: -60, opacity: 0, rotateX: 15 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block font-heading text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-[#7B2FFF] to-[#00C2FF] bg-clip-text text-transparent"
            >
              {titles[index]}
            </motion.span>
          </AnimatePresence>
        </div>
        <p className="mt-4 text-[18px] text-[rgba(255,255,255,0.55)] max-w-2xl mx-auto">
          ALTÉRA crée des sites vitrines et e-commerce premium pour transformer votre visibilité locale en résultats concrets.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/contact?type=vitrine" className="rounded-xl px-7 py-3 text-white font-semibold bg-gradient-to-r from-[#7B2FFF] to-[#00C2FF]">
            Démarrer mon projet
          </Link>
          <Link to="/tarifs" className="rounded-xl px-7 py-3 text-white border border-[rgba(123,47,255,0.35)]">
            Voir les tarifs
          </Link>
        </div>
        <div className="mt-8 whitespace-nowrap overflow-hidden text-sm text-white/50">
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 16, ease: 'linear', repeat: Infinity }}
            className="inline-flex gap-4"
          >
            {Array.from({ length: 2 }).map((_, i) => (
              <span key={i}>Site Vitrine · Site E-commerce · Maintenance · Refonte · SEO local · Support premium ·</span>
            ))}
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes pulseDot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.75)}}
        @keyframes marqueeRoll{from{transform:translateX(0)}to{transform:translateX(-50%)}}
      `}</style>
    </section>
  );
}

function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / 60;
    const id = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(id);
      } else setCount(Math.floor(start));
    }, 25);
    return () => clearInterval(id);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

function StatsSection() {
  const stats = [
    { value: 50, suffix: '+', label: 'Sites livrés' },
    { value: 14, suffix: 'j', label: 'Délai moyen' },
    { value: 98, suffix: '%', label: 'Clients satisfaits' },
    { value: 497, suffix: '€', label: 'À partir de' },
  ];
  return (
    <section style={{ padding: '60px 24px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '20px' }}>
        {stats.map((s) => (
          <div key={s.label} style={{ background: 'linear-gradient(145deg,rgba(10,10,30,0.7),rgba(13,13,40,0.8))', border: '1px solid rgba(123,47,255,0.15)', borderRadius: '20px', padding: '32px 24px', textAlign: 'center', backdropFilter: 'blur(8px)' }}>
            <div style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 'clamp(36px,4vw,52px)', lineHeight: 1, background: 'linear-gradient(135deg,#7B2FFF,#00C2FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '8px' }}>
              <CountUp target={s.value} suffix={s.suffix} />
            </div>
            <p style={{ fontFamily: 'DM Sans,sans-serif', fontSize: '14px', color: 'rgba(255,255,255,0.5)', margin: 0 }}>{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ServicesSection() {
  const services = [
    {
      icon: Globe, title: 'Site Vitrine', price: '497€',
      desc: 'Présentez votre activité avec un site professionnel qui convertit les visiteurs en clients.',
      features: ['Design sur-mesure', '1 à 5 pages', 'SEO optimisé', 'Formulaire de contact', 'Hébergement 1 an'],
      color: '#00C2FF',
    },
    {
      icon: ShoppingCart, title: 'Site E-commerce', price: '747€',
      desc: 'Vendez en ligne 24h/24 avec une boutique complète et un parcours d\'achat optimisé.',
      features: ['Produits illimités', 'Paiement Stripe/PayPal', 'Gestion stocks', 'Dashboard admin', 'Formation incluse'],
      color: '#7B2FFF', featured: true,
    },
    {
      icon: Wrench, title: 'Maintenance & SEO', price: 'dès 39€/mois',
      desc: 'Votre site toujours sécurisé, rapide et visible sur Google. Sans effort de votre part.',
      features: ['Sécurité & pare-feu', 'Sauvegardes hebdo', 'Monitoring 24/7', 'SEO continu', '1 modif/mois'],
      color: '#9B5FFF',
    },
  ];

  return (
    <section style={{ padding: '100px 24px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '64px' }}>
        <span style={{ fontFamily: 'DM Sans,sans-serif', fontWeight: 600, fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#7B2FFF', display: 'block', marginBottom: '16px' }}>• NOS SERVICES •</span>
        <h2 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 'clamp(32px,4.5vw,56px)', color: 'white', lineHeight: 1.08, margin: 0 }}>
          Ce que nous créons <span style={{ background: 'linear-gradient(135deg,#7B2FFF,#00C2FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>pour vous</span>
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '24px' }}>
        {services.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(145deg,#0A0A1E,#0D0D28)', border: s.featured ? `2px solid ${s.color}` : '1px solid rgba(123,47,255,0.18)', borderRadius: '24px', padding: '36px 32px', boxShadow: s.featured ? '0 0 60px rgba(123,47,255,0.25)' : 'none', transition: 'transform 350ms cubic-bezier(.22,1,.36,1), box-shadow 350ms', cursor: 'default' }}
              whileHover={{ y: -8, boxShadow: '0 20px 60px rgba(123,47,255,0.3)' }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg,${s.color},#7B2FFF)` }} />
              {s.featured && (
                <div style={{ position: 'absolute', top: '20px', right: '20px', background: 'linear-gradient(135deg,#7B2FFF,#00C2FF)', borderRadius: '999px', padding: '4px 14px', fontFamily: 'DM Sans,sans-serif', fontWeight: 700, fontSize: '11px', letterSpacing: '0.12em', color: 'white' }}>
                  BEST SELLER
                </div>
              )}
              <div style={{ width: '52px', height: '52px', borderRadius: '14px', marginBottom: '24px', background: 'linear-gradient(135deg,rgba(123,47,255,0.2),rgba(0,194,255,0.1))', border: '1px solid rgba(123,47,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={24} color={s.color} />
              </div>
              <h3 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: '22px', color: 'white', margin: '0 0 8px' }}>{s.title}</h3>
              <div style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: '28px', background: `linear-gradient(135deg,${s.color},#7B2FFF)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '16px' }}>{s.price}</div>
              <p style={{ fontFamily: 'DM Sans,sans-serif', fontSize: '15px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, marginBottom: '24px' }}>{s.desc}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {s.features.map((f) => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Check size={15} color="#10B981" strokeWidth={2.5} style={{ flexShrink: 0 }} />
                    <span style={{ fontFamily: 'DM Sans,sans-serif', fontSize: '14px', color: 'rgba(255,255,255,0.65)' }}>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href={`/contact?type=${s.title === 'Site Vitrine' ? 'vitrine' : s.title === 'Site E-commerce' ? 'ecommerce' : 'maintenance'}`}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'DM Sans,sans-serif', fontWeight: 600, fontSize: '14px', color: s.color, textDecoration: 'none', transition: 'gap 200ms' }}
                onMouseEnter={(e) => (e.currentTarget.style.gap = '12px')}
                onMouseLeave={(e) => (e.currentTarget.style.gap = '6px')}
              >
                En savoir plus <ArrowRight size={15} />
              </a>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function ProcessSection() {
  const steps = [
    { num: '01', emoji: '💬', title: 'Échange découverte', desc: 'Consultation 30min offerte. On analyse votre activité, vos objectifs et votre marché.', delay: 'Jour 1' },
    { num: '02', emoji: '🎨', title: 'Design sur-mesure', desc: 'Maquettes aux couleurs de votre marque. Vous validez avant qu\'on code une seule ligne.', delay: 'Jours 2–5' },
    { num: '03', emoji: '⚡', title: 'Développement', desc: 'Code propre, rapide, SEO-optimisé. Mobile-first, accessible sur tous les écrans.', delay: 'Jours 5–12' },
    { num: '04', emoji: '🚀', title: 'Livraison & formation', desc: 'Tests complets, mise en ligne et formation personnalisée. Vous êtes 100% autonome.', delay: 'Jours 12–14' },
  ];
  return (
    <section style={{ padding: '100px 24px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '64px' }}>
        <span style={{ fontFamily: 'DM Sans,sans-serif', fontWeight: 600, fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#7B2FFF', display: 'block', marginBottom: '16px' }}>• NOTRE PROCESSUS •</span>
        <h2 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 'clamp(32px,4.5vw,56px)', color: 'white', lineHeight: 1.08, margin: 0 }}>
          Votre site en <span style={{ background: 'linear-gradient(135deg,#7B2FFF,#00C2FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>4 étapes</span>
        </h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '20px' }}>
        {steps.map((s, i) => (
          <motion.div
            key={s.num}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.55 }}
            style={{ background: 'linear-gradient(145deg,rgba(123,47,255,0.06),rgba(0,194,255,0.03))', border: '1px solid rgba(123,47,255,0.15)', borderRadius: '20px', padding: '32px 28px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <span style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: '40px', background: 'linear-gradient(135deg,#7B2FFF,#00C2FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', opacity: 0.4, lineHeight: 1 }}>{s.num}</span>
              <span style={{ fontSize: '28px' }}>{s.emoji}</span>
              <span style={{ fontFamily: 'DM Sans,sans-serif', fontSize: '11px', fontWeight: 600, background: 'rgba(0,194,255,0.12)', border: '1px solid rgba(0,194,255,0.2)', color: '#00C2FF', borderRadius: '999px', padding: '4px 12px' }}>{s.delay}</span>
            </div>
            <h3 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: '17px', color: 'white', margin: '0 0 10px' }}>{s.title}</h3>
            <p style={{ fontFamily: 'DM Sans,sans-serif', fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, margin: 0 }}>{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function WhyAlteraSection() {
  const reasons = [
    { icon: Zap, title: 'Livraison rapide', desc: '14 jours ouvrés en moyenne. Délai tenu ou remboursé.' },
    { icon: Shield, title: 'Prix fixes', desc: 'Devis définitif signé. Zéro surprise sur la facture finale.' },
    { icon: TrendingUp, title: 'ROI mesurable', desc: 'Nos clients voient leurs demandes de contact augmenter en moyenne de +180%.' },
    { icon: Star, title: 'Support dédié', desc: 'Un interlocuteur unique du premier échange à la livraison et après.' },
  ];
  return (
    <section style={{ padding: '100px 24px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '64px' }}>
        <span style={{ fontFamily: 'DM Sans,sans-serif', fontWeight: 600, fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#7B2FFF', display: 'block', marginBottom: '16px' }}>• POURQUOI ALTÉRA •</span>
        <h2 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 'clamp(32px,4.5vw,56px)', color: 'white', lineHeight: 1.08, margin: 0 }}>
          Ce qui nous <span style={{ background: 'linear-gradient(135deg,#7B2FFF,#00C2FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>distingue</span>
        </h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '20px' }}>
        {reasons.map((r, i) => {
          const Icon = r.icon;
          return (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.55 }}
              whileHover={{ y: -6, borderColor: 'rgba(123,47,255,0.4)' }}
              style={{ background: 'linear-gradient(145deg,#0A0A1E,#0D0D28)', border: '1px solid rgba(123,47,255,0.18)', borderRadius: '20px', padding: '32px', transition: 'transform 300ms, border-color 300ms' }}
            >
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', marginBottom: '20px', background: 'linear-gradient(135deg,rgba(123,47,255,0.2),rgba(0,194,255,0.1))', border: '1px solid rgba(123,47,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={22} color="#7B2FFF" />
              </div>
              <h3 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: '18px', color: 'white', margin: '0 0 10px' }}>{r.title}</h3>
              <p style={{ fontFamily: 'DM Sans,sans-serif', fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, margin: 0 }}>{r.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function PricingSection() {
  const plans = [
    {
      name: 'SITE VITRINE', price: '497', period: 'paiement unique',
      desc: 'Pour présenter votre activité et générer des leads qualifiés.',
      features: ['Design 100% sur-mesure', '1 à 5 pages', 'Responsive mobile', 'SEO standard', 'Formulaire contact', 'Hébergement 1 an offert'],
      cta: 'Choisir ce pack', href: '/contact?type=vitrine', popular: false,
    },
    {
      name: 'SITE E-COMMERCE', price: '747', period: 'paiement unique',
      desc: 'Pour vendre en ligne et transformer vos visiteurs en acheteurs.',
      features: ['Pages & produits illimités', 'Paiement Stripe & PayPal', 'Gestion des stocks', 'Dashboard admin', 'SEO e-commerce', 'Hébergement 1 an offert', 'Formation 2h incluse'],
      cta: 'Choisir ce pack', href: '/contact?type=ecommerce', popular: true,
    },
    {
      name: 'MAINTENANCE', price: '39', period: '/mois',
      desc: 'Pour garder votre site rapide, sécurisé et visible en permanence.',
      features: ['Sécurité & pare-feu', 'Sauvegardes hebdomadaires', 'Monitoring 24/7', 'Optimisation SEO continue', '1 modification/mois', 'Rapport mensuel'],
      cta: 'Choisir ce forfait', href: '/contact?type=maintenance', popular: false,
    },
  ];

  return (
    <section style={{ padding: '100px 24px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '64px' }}>
        <span style={{ fontFamily: 'DM Sans,sans-serif', fontWeight: 600, fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#7B2FFF', display: 'block', marginBottom: '16px' }}>• TARIFS •</span>
        <h2 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 'clamp(32px,4.5vw,56px)', color: 'white', lineHeight: 1.08, margin: 0 }}>
          Des prix clairs. <span style={{ background: 'linear-gradient(135deg,#7B2FFF,#00C2FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Zéro surprise.</span>
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: '24px', alignItems: 'end' }}>
        {plans.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: p.popular ? -16 : 0, scale: p.popular ? 1.03 : 0.97 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.7, type: 'spring', stiffness: 100 }}
            style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(145deg,#0A0A1E,#0D0D28)', border: p.popular ? '2px solid #7B2FFF' : '1px solid rgba(123,47,255,0.18)', borderRadius: '24px', padding: '40px 32px', boxShadow: p.popular ? '0 0 80px rgba(123,47,255,0.3)' : 'none', animation: p.popular ? 'glowPulse 3s ease-in-out infinite' : 'none', zIndex: p.popular ? 2 : 1 }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg,#7B2FFF,#00C2FF)' }} />
            {p.popular && (
              <div style={{ position: 'absolute', top: '-1px', left: '50%', transform: 'translateX(-50%) translateY(-50%)', background: 'linear-gradient(135deg,#7B2FFF,#00C2FF)', borderRadius: '999px', padding: '6px 22px', whiteSpace: 'nowrap', fontFamily: 'DM Sans,sans-serif', fontWeight: 700, fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'white' }}>
                ⭐ BEST SELLER
              </div>
            )}

            <p style={{ fontFamily: 'DM Sans,sans-serif', fontWeight: 600, fontSize: '12px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '20px' }}>{p.name}</p>

            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', marginBottom: '8px' }}>
              <span style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 'clamp(56px,6vw,76px)', color: 'white', lineHeight: 1 }}>{p.price}</span>
              <span style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: '28px', background: 'linear-gradient(135deg,#7B2FFF,#00C2FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', paddingBottom: '8px' }}>€</span>
              <span style={{ fontFamily: 'DM Sans,sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.35)', paddingBottom: '10px', marginLeft: '4px' }}>{p.period}</span>
            </div>

            <p style={{ fontFamily: 'DM Sans,sans-serif', fontSize: '14px', color: 'rgba(255,255,255,0.45)', marginBottom: '28px', lineHeight: 1.6 }}>{p.desc}</p>

            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px', display: 'flex', flexDirection: 'column', gap: '11px' }}>
              {p.features.map((f) => (
                <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Check size={14} color="#10B981" strokeWidth={2.5} style={{ flexShrink: 0 }} />
                  <span style={{ fontFamily: 'DM Sans,sans-serif', fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>{f}</span>
                </li>
              ))}
            </ul>

            <a
              href={p.href}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '52px', borderRadius: '12px', background: p.popular ? 'linear-gradient(135deg,#7B2FFF,#00C2FF)' : 'transparent', border: p.popular ? 'none' : '1px solid rgba(123,47,255,0.35)', fontFamily: 'DM Sans,sans-serif', fontWeight: 600, fontSize: '15px', color: 'white', textDecoration: 'none', boxShadow: p.popular ? '0 8px 28px rgba(123,47,255,0.4)' : 'none', transition: 'transform 200ms, box-shadow 200ms' }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; }}
            >
              {p.cta} →
            </a>
          </motion.div>
        ))}
      </div>

      <style>{`
        @keyframes glowPulse{
          0%,100%{box-shadow:0 0 40px rgba(123,47,255,0.2),0 40px 80px rgba(123,47,255,0.15)}
          50%{box-shadow:0 0 80px rgba(123,47,255,0.45),0 40px 100px rgba(123,47,255,0.3)}
        }
      `}</style>
    </section>
  );
}

function TestimonialsSection() {
  const testimonials = [
    { name: 'Marie Dupont', role: 'Fondatrice, Studio Floral Paris', text: 'ALTÉRA a transformé notre présence en ligne. Les demandes ont triplé en 3 mois.', initials: 'MD' },
    { name: 'Thomas Bernard', role: 'Gérant, TechSolutions Lyon', text: 'Notre e-commerce génère 40% de notre CA. Professionnalisme exemplaire.', initials: 'TB' },
    { name: 'Sophie Martin', role: 'Directrice, Agence Immo SM', text: 'Livraison en 12 jours comme promis. Site parfait, je recommande à 100%.', initials: 'SM' },
    { name: 'Jean-Laurent Morel', role: 'Artisan Menuisier', text: 'Je ne suis pas informaticien, ils ont tout géré. Maintenant j\'ai un site pro.', initials: 'JM' },
    { name: 'Camille Rousseau', role: 'Gérante, Boulangerie du Centre', text: 'Référencement Google explosé. 3× plus d\'appels. Investissement ultra rentable.', initials: 'CR' },
    { name: 'Alexandre Chen', role: 'Fondateur, Chen Consulting', text: 'La maintenance vaut son prix. Site rapide, sécurisé, SEO meilleur chaque mois.', initials: 'AC' },
  ];

  const Card = ({ name, role, text, initials }: (typeof testimonials)[0]) => (
    <div style={{ flexShrink: 0, width: '300px', background: 'linear-gradient(145deg,rgba(10,10,30,0.85),rgba(13,13,40,0.9))', border: '1px solid rgba(123,47,255,0.15)', borderRadius: '20px', padding: '28px', position: 'relative', overflow: 'hidden' }}>
      <span style={{ position: 'absolute', top: '12px', right: '18px', fontSize: '52px', color: 'rgba(123,47,255,0.1)', fontFamily: 'Georgia', lineHeight: 1 }}>"</span>
      <div style={{ marginBottom: '12px' }}>{'★★★★★'.split('').map((s, i) => <span key={i} style={{ color: '#F59E0B', fontSize: '13px' }}>{s}</span>)}</div>
      <p style={{ fontFamily: 'DM Sans,sans-serif', fontSize: '14px', fontStyle: 'italic', color: 'rgba(255,255,255,0.62)', lineHeight: 1.72, marginBottom: '20px' }}>"{text}"</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '11px' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0, background: 'linear-gradient(135deg,#7B2FFF,#00C2FF)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: '12px', color: 'white' }}>{initials}</span>
        </div>
        <div>
          <p style={{ fontFamily: 'DM Sans,sans-serif', fontWeight: 600, fontSize: '13px', color: 'white', margin: 0 }}>{name}</p>
          <p style={{ fontFamily: 'DM Sans,sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.35)', margin: 0 }}>{role}</p>
        </div>
      </div>
    </div>
  );

  return (
    <section style={{ padding: '100px 0', overflow: 'hidden' }}>
      <div style={{ textAlign: 'center', marginBottom: '56px', padding: '0 24px' }}>
        <span style={{ fontFamily: 'DM Sans,sans-serif', fontWeight: 600, fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#7B2FFF', display: 'block', marginBottom: '16px' }}>• ILS NOUS FONT CONFIANCE •</span>
        <h2 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 'clamp(32px,4.5vw,56px)', color: 'white', lineHeight: 1.08, margin: 0 }}>
          Ce qu'en disent nos <span style={{ background: 'linear-gradient(135deg,#7B2FFF,#00C2FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>clients</span>
        </h2>
      </div>
      <div style={{ maskImage: 'linear-gradient(to right,transparent,black 8%,black 92%,transparent)', WebkitMaskImage: 'linear-gradient(to right,transparent,black 8%,black 92%,transparent)' }}>
        <div className="group" style={{ display: 'flex', gap: '20px', width: 'max-content' }}>
          <div style={{ display: 'flex', gap: '20px', animation: 'testimonialRoll 42s linear infinite' }} className="testimonial-track">
            {[...testimonials, ...testimonials].map((t, i) => <Card key={i} {...t} />)}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes testimonialRoll{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        .group:hover .testimonial-track { animation-play-state: paused; }
      `}</style>
    </section>
  );
}

function FinalCTASection() {
  const navigate = useNavigate();
  return (
    <section style={{ padding: '100px 24px 140px' }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center', background: 'linear-gradient(135deg,rgba(123,47,255,0.1),rgba(0,194,255,0.06))', border: '1px solid rgba(123,47,255,0.3)', borderRadius: '28px', padding: 'clamp(48px,6vw,80px) clamp(28px,5vw,64px)', boxShadow: '0 0 80px rgba(123,47,255,0.15)' }}
      >
        <h2 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 'clamp(32px,4.5vw,52px)', color: 'white', lineHeight: 1.1, marginBottom: '18px' }}>
          Prêt à lancer votre <span style={{ background: 'linear-gradient(135deg,#7B2FFF,#00C2FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>projet ?</span>
        </h2>
        <p style={{ fontFamily: 'DM Sans,sans-serif', fontSize: '17px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, maxWidth: '460px', margin: '0 auto 36px' }}>
          Discutons de votre projet. Consultation 30 minutes offerte,
          devis gratuit et sans engagement.
        </p>
        <button
          onClick={() => navigate('/contact')}
          style={{ padding: '16px 44px', borderRadius: '12px', border: 'none', cursor: 'pointer', background: 'linear-gradient(135deg,#7B2FFF,#00C2FF)', fontFamily: 'Syne,sans-serif', fontWeight: 600, fontSize: '18px', color: 'white', boxShadow: '0 8px 32px rgba(123,47,255,0.4)', transition: 'transform 250ms, box-shadow 250ms', marginBottom: '24px' }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 16px 44px rgba(123,47,255,0.6)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(123,47,255,0.4)'; }}
        >
          Démarrer mon projet →
        </button>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap' }}>
          {['✓ Réponse sous 24h', '✓ Devis gratuit', '✓ Sans engagement'].map((t) => (
            <span key={t} style={{ fontFamily: 'DM Sans,sans-serif', fontSize: '13px', color: 'rgba(255,255,255,0.3)' }}>{t}</span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
