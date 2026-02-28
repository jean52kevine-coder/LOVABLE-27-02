import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { Check, ChevronDown } from 'lucide-react';
import HeroBackground from '@/components/HeroBackground';

function AnimatedPrice({ target }: { target: number }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let n = 0;
    const steps = 25;
    const inc = target / steps;
    const id = setInterval(() => {
      n += inc;
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

const FAQ_TARIFS = [
  { q: 'Le paiement en 2 fois est possible ?', a: 'Oui, 50% à la commande et 50% à la livraison pour tous nos forfaits.' },
  { q: 'Y a-t-il des frais cachés ?', a: 'Aucun. Le devis signé est définitif. Seuls les ajouts que vous demandez après peuvent être facturés.' },
  { q: "L'hébergement est inclus à vie ?", a: "L'hébergement est offert la première année. Ensuite environ 60-90€/an selon votre formule." },
  { q: 'Puis-je changer de forfait maintenance ?', a: 'Oui, à tout moment et sans frais. Résiliable avec 30 jours de préavis.' },
  { q: 'Acceptez-vous les chèques et virements ?', a: 'Virement bancaire ou carte bancaire via Stripe. Les chèques ne sont pas acceptés.' },
];

export default function Tarifs() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const plans = [
    { name: 'Vitrine', price: 497 },
    { name: 'E-commerce', price: 747 },
    { name: 'Maintenance', price: 39 },
  ];

  return (
    <main className="pt-[60px] pb-[76px] md:pt-0 md:pb-0">
      <section style={{ position: 'relative', minHeight: '100vh', display: 'grid', placeItems: 'center', padding: '120px 24px 80px' }}>
        <HeroBackground variant="tarifs" />
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h1 style={{ fontFamily: 'Syne,sans-serif', fontSize: 'clamp(36px,5.5vw,64px)' }}>Des prix clairs, zéro surprise.</h1>
          <p style={{ color: 'rgba(255,255,255,0.78)' }}>Paiement en 2× · Réponse sous 24h · Devis gratuit</p>
        </div>
      </section>

      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '70px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 16 }}>
          {plans.map((p) => (
            <div key={p.name} style={{ border: '1px solid rgba(123,47,255,0.2)', borderRadius: 16, padding: 20 }}>
              <p style={{ margin: 0 }}>{p.name}</p>
              <p style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 38, margin: '8px 0' }}>
                <AnimatedPrice target={p.price} />€
              </p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 70px', overflowX: 'auto' }}>
        <div style={{ minWidth: 760 }}>
          {['Pages', 'SEO', 'Support', 'Paiement', 'Formation'].map((feature, i) => (
            <div key={feature} style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', padding: '12px 14px', background: i % 2 ? 'rgba(255,255,255,0.02)' : 'transparent', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <strong>{feature}</strong>
              <span><Check size={14} color="#10B981" /> oui</span>
              <span>{i > 0 ? <Check size={14} color="#10B981" /> : '—'}</span>
              <span>{i > 2 ? <Check size={14} color="#7B2FFF" /> : '—'}</span>
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 70px' }}>
        <h2 style={{ fontFamily: 'Syne,sans-serif' }}>Maintenance détaillée</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(230px,1fr))', gap: 16 }}>
          {[39, 44, 49].map((price, i) => (
            <div key={price} style={{ border: '1px solid rgba(123,47,255,0.18)', borderRadius: 14, padding: 16 }}>
              <p style={{ margin: 0 }}>{['Essentiel', 'Pro', 'Premium'][i]}</p>
              <p style={{ fontSize: 30, fontWeight: 800, margin: '4px 0' }}>{price}€/mois</p>
              <p style={{ margin: 0, color: 'rgba(255,255,255,0.78)' }}>Support, sécurité et SEO continu.</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px 100px' }}>
        <h2 style={{ fontFamily: 'Syne,sans-serif' }}>FAQ Tarifs</h2>
        {FAQ_TARIFS.map((item, i) => {
          const open = openFaq === i;
          return (
            <div key={item.q} style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, marginBottom: 10, overflow: 'hidden' }}>
              <button onClick={() => setOpenFaq(open ? null : i)} style={{ width: '100%', background: 'transparent', color: 'white', border: 'none', textAlign: 'left', padding: 14, display: 'flex', justifyContent: 'space-between' }}>
                {item.q} <ChevronDown size={16} style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>
              <AnimatePresence initial={false}>
                {open && <motion.p initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} style={{ margin: 0, padding: '0 14px 14px', overflow: 'hidden', color: 'rgba(255,255,255,0.78)' }}>{item.a}</motion.p>}
              </AnimatePresence>
            </div>
          );
        })}
      </section>
    </main>
  );
}
