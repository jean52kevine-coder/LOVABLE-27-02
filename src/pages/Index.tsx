import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Check, Globe, ShoppingCart, Shield, ArrowRight, Calendar, Code, FileText, Clock, Zap } from 'lucide-react';
import { Meteors } from '@/components/ui/meteors';
import { BorderBeam } from '@/components/ui/border-beam';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { MovingBorderButton } from '@/components/ui/moving-border';

function CountUp({ to, suffix = '' }: { to: number | string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  const isNum = typeof to === 'number';
  useEffect(() => {
    if (!inView || !isNum) return;
    let n = 0; const steps = 40;
    const id = setInterval(() => {
      n += (to as number) / steps;
      if (n >= (to as number)) { setVal(to as number); clearInterval(id); return; }
      setVal(Math.round(n));
    }, 600 / steps);
    return () => clearInterval(id);
  }, [inView, isNum, to]);
  return <span ref={ref}>{isNum ? val : to}{suffix}</span>;
}

const WORDS = ['artisans', 'commerçants', 'restaurants', 'PME locales', 'indépendants'];

function HeroSection() {
  const [idx, setIdx] = useState(0);
  const nav = useNavigate();
  useEffect(() => {
    const id = setInterval(() => setIdx(p => (p + 1) % WORDS.length), 2500);
    return () => clearInterval(id);
  }, []);
  return (
    <section style={{ position:'relative', minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'clamp(110px,13vh,150px) 24px 80px', textAlign:'center', overflow:'hidden' }}>
      <div style={{ position:'absolute', inset:0, zIndex:0 }}>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 85% 60% at 50% -5%, rgba(123,47,255,0.45), rgba(3,3,10,0) 72%)' }}/>
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 45% 40% at 85% 20%, rgba(0,194,255,0.16), transparent 65%)' }}/>
        <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(123,47,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(123,47,255,0.04) 1px,transparent 1px)', backgroundSize:'64px 64px' }}/>
        <Meteors number={20} color="#9B5FFF"/>
        <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'220px', background:'linear-gradient(to bottom, transparent, #03030A)', zIndex:1 }}/>
      </div>
      <div style={{ position:'relative', zIndex:2, maxWidth:'880px', width:'100%' }}>
        <motion.div initial={{ opacity:0, y:-20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }} style={{ display:'inline-flex', alignItems:'center', gap:'8px', padding:'7px 22px', borderRadius:'999px', marginBottom:'36px', background:'rgba(123,47,255,0.12)', border:'1px solid rgba(123,47,255,0.38)' }}>
          <span style={{ width:'7px', height:'7px', borderRadius:'50%', background:'#7B2FFF', boxShadow:'0 0 12px #7B2FFF', display:'inline-block', animation:'badgePulse 2s ease-in-out infinite' }}/>
          <span style={{ fontFamily:'DM Sans,sans-serif', fontWeight:600, fontSize:'11px', letterSpacing:'0.22em', textTransform:'uppercase', color:'#B090FF' }}>AGENCE WEB PREMIUM</span>
        </motion.div>

        {/* H1 ligne fixe + mot rotatif — overflow:visible OBLIGATOIRE pour ne pas couper j/g/p/y */}
        <motion.div initial={{ opacity:0, y:28 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.22, ease:[0.22,1,0.36,1] }}>
          <h1 style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'clamp(34px,5vw,60px)', lineHeight:1.1, color:'white', margin:'0 0 6px', overflow:'visible', padding:0 }}>
            Votre présence en ligne,
          </h1>
          {/* Mot rotatif — height fixe + overflow:visible pour descentes */}
          <div style={{ height:'clamp(50px,7.5vw,82px)', overflow:'visible', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'30px' }}>
            <AnimatePresence mode="wait">
              <motion.span
                key={idx}
                initial={{ y:65, opacity:0 }}
                animate={{ y:0, opacity:1 }}
                exit={{ y:-65, opacity:0 }}
                transition={{ duration:0.42, ease:[0.22,1,0.36,1] }}
                style={{
                  display:'block',
                  fontFamily:'Syne,sans-serif',
                  fontWeight:800,
                  fontSize:'clamp(34px,5vw,60px)',
                  lineHeight:1.1,
                  background:'linear-gradient(135deg,#7B2FFF,#00C2FF)',
                  WebkitBackgroundClip:'text',
                  WebkitTextFillColor:'transparent',
                  overflow:'visible',
                  paddingBottom:'6px', // ← espace pour les descentes (j, g, p, y)
                }}>
                {WORDS[idx]}.
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.p initial={{ opacity:0, y:18 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.52 }} style={{ fontFamily:'DM Sans,sans-serif', fontSize:'clamp(15px,1.8vw,18px)', color:'rgba(255,255,255,0.80)', lineHeight:1.75, maxWidth:'520px', margin:'0 auto 46px' }}>
          Sites web performants pour artisans, commerces et PME.<br/>Design sur-mesure, livraison en 14 jours.
        </motion.p>

        <motion.div initial={{ opacity:0, y:18 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.65 }} style={{ display:'flex', gap:'14px', justifyContent:'center', flexWrap:'wrap' }}>
          <button onClick={() => nav('/contact')} style={{ padding:'14px 40px', borderRadius:'12px', border:'none', cursor:'pointer', background:'linear-gradient(135deg,#7B2FFF,#00C2FF)', fontFamily:'DM Sans,sans-serif', fontWeight:600, fontSize:'15px', color:'white', boxShadow:'0 8px 30px rgba(123,47,255,0.5)', transition:'transform 250ms,box-shadow 250ms' }}
            onMouseEnter={e => { e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow='0 16px 42px rgba(123,47,255,0.7)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 8px 30px rgba(123,47,255,0.5)'; }}>
            Démarrer mon projet →
          </button>
          <MovingBorderButton containerClassName="w-auto" className="px-10 text-sm" duration={3000} onClick={() => nav('/services')}>
            Découvrir nos services
          </MovingBorderButton>
        </motion.div>
      </div>
      <style>{`@keyframes badgePulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.35;transform:scale(.6)}}`}</style>
    </section>
  );
}

function StatsSection() {
  const stats = [
    { to:14,     suffix:'j',   label:'Livraison moyenne' },
    { to:'4.9',  suffix:'/5',  label:'Satisfaction client' },
    { to:24,     suffix:'h',   label:'Réponse devis' },
    { to:'+180', suffix:'%',   label:'Leads moyens générés' },
  ];
  return (
    <section style={{ position:'relative', zIndex:2, padding:'0 clamp(16px,4vw,48px) 80px', maxWidth:'1200px', margin:'0 auto' }}>
      <div style={{ position:'fixed', inset:0, zIndex:0, pointerEvents:'none', overflow:'hidden' }}>
        <Meteors number={12} color="#FFE066"/>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'16px', position:'relative', zIndex:1 }}>
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.09, duration:.5 }}>
            <div style={{ position:'relative', overflow:'hidden', background:'linear-gradient(145deg,rgba(123,47,255,0.09),rgba(0,194,255,0.04))', border:'1px solid rgba(123,47,255,0.2)', borderRadius:'18px', padding:'28px 20px', textAlign:'center' }}>
              <GlowingEffect spread={30} glow proximity={60} borderWidth={1.5}/>
              <BorderBeam size={120} duration={12} colorFrom="#7B2FFF" colorTo="#00C2FF" borderWidth={1}/>
              <div style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'clamp(30px,3.2vw,46px)', lineHeight:1, background:'linear-gradient(135deg,#7B2FFF,#00C2FF)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', marginBottom:'8px' }}>
                <CountUp to={typeof s.to === 'number' ? s.to : s.to} suffix={s.suffix}/>
              </div>
              <p style={{ fontFamily:'DM Sans,sans-serif', fontSize:'13px', color:'rgba(255,255,255,0.60)', margin:0 }}>{s.label}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

const SERVICES = [
  { icon:Globe,        color:'#00C2FF', price:'497€',         id:'vitrine',     title:'Site Vitrine Premium',    desc:'Un site pro qui travaille 24h/24. Design moderne, SEO local, formulaire optimisé.', features:['Design 100% sur-mesure','1 à 5 pages stratégiques','SEO local Google Maps','Formulaire + notifications','Hébergement 1 an offert','Livraison 7–14 jours'] },
  { icon:ShoppingCart, color:'#7B2FFF', price:'747€',         id:'ecommerce',   title:'E-commerce Performance', desc:'Boutique complète 24h/24. Paiements sécurisés, dashboard admin, tunnel optimisé.', features:['Produits illimités','Paiement Stripe & PayPal','Gestion stocks & commandes','Dashboard admin','SEO e-commerce avancé','Formation 2h incluse'], featured:true },
  { icon:Shield,       color:'#10B981', price:'dès 39€/mois', id:'maintenance', title:'Maintenance & Croissance', desc:'Sécurité, vitesse et SEO en continu. Zéro effort de votre côté.', features:['Sécurité & pare-feu actif','Sauvegardes hebdomadaires','Monitoring 24/7','SEO continu','Modifications incluses','Rapport mensuel'] },
];

function ServicesSection() {
  const nav = useNavigate();
  return (
    <section style={{ position:'relative', zIndex:2, padding:'80px clamp(16px,4vw,48px)', maxWidth:'1200px', margin:'0 auto' }}>
      <div style={{ textAlign:'center', marginBottom:'56px' }}>
        <span style={{ fontFamily:'DM Sans,sans-serif', fontWeight:600, fontSize:'11px', letterSpacing:'0.22em', textTransform:'uppercase', color:'#7B2FFF', display:'block', marginBottom:'14px' }}>• NOS SERVICES •</span>
        <h2 style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'clamp(28px,4vw,44px)', color:'white', margin:0 }}>Services <span style={{ background:'linear-gradient(135deg,#7B2FFF,#00C2FF)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>premium</span></h2>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:'24px' }}>
        {SERVICES.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div key={s.id} initial={{ opacity:0, y:36 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.12, duration:.6 }} whileHover={{ y:-10, transition:{duration:.2} }}>
              <div style={{ position:'relative', overflow:'hidden', background:'linear-gradient(145deg,#0D0D22,#0A0A1C)', border: s.featured ? `2px solid ${s.color}` : '1px solid rgba(123,47,255,0.22)', borderRadius:'22px', padding:'32px 28px', boxShadow: s.featured ? `0 0 60px rgba(123,47,255,0.25)` : 'none', height:'100%' }}>
                <div style={{ position:'absolute', top:0, left:0, right:0, height:'3px', background:`linear-gradient(90deg,${s.color},#7B2FFF)`, borderRadius:'22px 22px 0 0' }}/>
                <GlowingEffect spread={40} glow proximity={80} borderWidth={2}/>
                {s.featured && <BorderBeam size={200} duration={8} colorFrom="#7B2FFF" colorTo="#00C2FF" borderWidth={2}/>}
                {s.featured && <div style={{ position:'absolute', top:'18px', right:'18px', background:'linear-gradient(135deg,#7B2FFF,#00C2FF)', borderRadius:'999px', padding:'4px 14px', fontFamily:'DM Sans,sans-serif', fontWeight:700, fontSize:'11px', color:'white' }}>BEST SELLER</div>}
                <div style={{ width:'52px', height:'52px', borderRadius:'14px', marginBottom:'22px', background:`${s.color}18`, border:`1px solid ${s.color}44`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <Icon size={24} color={s.color}/>
                </div>
                <h3 style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'20px', color:'white', margin:'0 0 6px' }}>{s.title}</h3>
                <div style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'24px', background:`linear-gradient(135deg,${s.color},#7B2FFF)`, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', marginBottom:'14px' }}>{s.price}</div>
                <p style={{ fontFamily:'DM Sans,sans-serif', fontSize:'14px', color:'rgba(255,255,255,0.75)', lineHeight:1.7, marginBottom:'22px' }}>{s.desc}</p>
                <ul style={{ listStyle:'none', padding:0, margin:'0 0 26px', display:'flex', flexDirection:'column', gap:'9px' }}>
                  {s.features.map(f => (<li key={f} style={{ display:'flex', alignItems:'center', gap:'10px' }}><Check size={14} color="#10B981" strokeWidth={2.5} style={{ flexShrink:0 }}/><span style={{ fontFamily:'DM Sans,sans-serif', fontSize:'13px', color:'rgba(255,255,255,0.70)' }}>{f}</span></li>))}
                </ul>
                <button onClick={() => nav(`/contact?type=${s.id}`)} style={{ display:'flex', alignItems:'center', gap:'6px', fontFamily:'DM Sans,sans-serif', fontWeight:600, fontSize:'14px', color:s.color, background:'none', border:'none', cursor:'pointer', padding:0, transition:'gap 200ms' }}
                  onMouseEnter={e => (e.currentTarget.style.gap='12px')} onMouseLeave={e => (e.currentTarget.style.gap='6px')}>
                  Voir l'offre <ArrowRight size={15}/>
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

const PROCESS_STEPS = [
  { id:1, n:'01', emoji:'💬', title:'Découverte',    desc:'Consultation 30min offerte. On analyse votre activité, objectifs et marché local.', badge:'Jour 1',  energy:100, icon:Calendar },
  { id:2, n:'02', emoji:'🎨', title:'Design',         desc:'Maquettes sur-mesure aux couleurs de votre marque. Vous validez avant qu\'on code.', badge:'J. 2–5', energy:90,  icon:FileText },
  { id:3, n:'03', emoji:'⚡', title:'Développement',  desc:'Code propre, rapide, SEO-optimisé. 100% mobile-first.', badge:'J. 5–12',energy:60,  icon:Code    },
  { id:4, n:'04', emoji:'🚀', title:'Livraison',       desc:'Tests complets, mise en ligne et formation. Vous êtes totalement autonome.', badge:'J. 12–14',energy:30,  icon:Clock   },
];

function ProcessSection() {
  const [activeId, setActiveId] = useState<number | null>(null);
  return (
    <section style={{ position:'relative', zIndex:2, padding:'80px clamp(16px,4vw,48px)', maxWidth:'1200px', margin:'0 auto' }}>
      <div style={{ textAlign:'center', marginBottom:'52px' }}>
        <span style={{ fontFamily:'DM Sans,sans-serif', fontWeight:600, fontSize:'11px', letterSpacing:'0.22em', textTransform:'uppercase', color:'#7B2FFF', display:'block', marginBottom:'14px' }}>• NOTRE MÉTHODE •</span>
        <h2 style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'clamp(28px,4vw,44px)', color:'white', margin:0 }}>Votre projet en <span style={{ background:'linear-gradient(135deg,#7B2FFF,#00C2FF)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>4 étapes</span></h2>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))', gap:'20px' }}>
        {PROCESS_STEPS.map((s, i) => {
          const Icon = s.icon;
          const isActive = activeId === s.id;
          return (
            <motion.div key={s.id} initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.1, duration:.55 }} whileHover={{ y:-6, transition:{duration:.2} }} onClick={() => setActiveId(isActive ? null : s.id)} style={{ cursor:'pointer' }}>
              <div style={{ position:'relative', overflow:'hidden', background:'linear-gradient(145deg,rgba(123,47,255,0.07),rgba(0,194,255,0.03))', border: isActive ? '1px solid rgba(123,47,255,0.6)' : '1px solid rgba(123,47,255,0.17)', borderRadius:'20px', padding:'28px 24px', height:'100%', boxShadow: isActive ? '0 0 40px rgba(123,47,255,0.2)' : 'none', transition:'all 300ms' }}>
                <GlowingEffect spread={25} glow proximity={50} borderWidth={1}/>
                {isActive && <BorderBeam size={150} duration={10} colorFrom="#7B2FFF" colorTo="#00C2FF" borderWidth={1.5}/>}
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'18px' }}>
                  <span style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'32px', lineHeight:1, background:'linear-gradient(135deg,#7B2FFF,#00C2FF)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', opacity:.38 }}>{s.n}</span>
                  <span style={{ fontSize:'26px' }}>{s.emoji}</span>
                  <span style={{ fontFamily:'DM Sans,sans-serif', fontSize:'11px', fontWeight:600, background:'rgba(0,194,255,0.1)', border:'1px solid rgba(0,194,255,0.22)', color:'#00C2FF', borderRadius:'999px', padding:'3px 10px' }}>{s.badge}</span>
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'10px' }}>
                  <div style={{ width:'28px', height:'28px', borderRadius:'8px', background:'rgba(123,47,255,0.15)', border:'1px solid rgba(123,47,255,0.3)', display:'flex', alignItems:'center', justifyContent:'center' }}><Icon size={14} color="#7B2FFF"/></div>
                  <h3 style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'17px', color:'white', margin:0 }}>{s.title}</h3>
                </div>
                <p style={{ fontFamily:'DM Sans,sans-serif', fontSize:'13px', color:'rgba(255,255,255,0.62)', lineHeight:1.65, margin:'0 0 16px' }}>{s.desc}</p>
                <div>
                  <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'4px' }}>
                    <span style={{ fontFamily:'DM Sans,sans-serif', fontSize:'10px', color:'rgba(255,255,255,0.35)', display:'flex', alignItems:'center', gap:'4px' }}><Zap size={9}/> Progression</span>
                    <span style={{ fontFamily:'monospace', fontSize:'10px', color:'rgba(255,255,255,0.35)' }}>{s.energy}%</span>
                  </div>
                  <div style={{ width:'100%', height:'3px', background:'rgba(255,255,255,0.08)', borderRadius:'999px', overflow:'hidden' }}>
                    <motion.div initial={{ width:0 }} whileInView={{ width:`${s.energy}%` }} viewport={{ once:true }} transition={{ duration:.8, delay:.2 }} style={{ height:'100%', background:'linear-gradient(90deg,#7B2FFF,#00C2FF)', borderRadius:'999px' }}/>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function PriceCountUp({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once:true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let n = 0; const steps = 28;
    const id = setInterval(() => { n += target/steps; if (n >= target) { setVal(target); clearInterval(id); return; } setVal(Math.round(n)); }, 380/steps);
    return () => clearInterval(id);
  }, [inView, target]);
  return <span ref={ref}>{val}</span>;
}

const PLANS = [
  { name:'SITE VITRINE', price:497, period:'paiement unique', desc:'Présence professionnelle et génération de leads.', features:['Design sur-mesure','1 à 5 pages','SEO local','Formulaire contact','Hébergement 1 an'], href:'/contact?type=vitrine' },
  { name:'E-COMMERCE',   price:747, period:'paiement unique', desc:'Boutique en ligne complète pour vendre 24h/24.', features:['Produits illimités','Paiement Stripe & PayPal','Gestion stocks','Dashboard admin','Formation 2h'], href:'/contact?type=ecommerce', popular:true },
  { name:'MAINTENANCE',  price:39,  period:'/mois dès',       desc:'Sécurité, SEO et performance en continu.', features:['Sécurité & pare-feu','Sauvegardes hebdo','Monitoring 24/7','SEO continu','Rapport mensuel'], href:'/contact?type=maintenance' },
];

function PricingSection() {
  const nav = useNavigate();
  return (
    <section style={{ position:'relative', zIndex:2, padding:'80px clamp(16px,4vw,48px)', maxWidth:'1200px', margin:'0 auto' }}>
      <div style={{ textAlign:'center', marginBottom:'56px' }}>
        <span style={{ fontFamily:'DM Sans,sans-serif', fontWeight:600, fontSize:'11px', letterSpacing:'0.22em', textTransform:'uppercase', color:'#7B2FFF', display:'block', marginBottom:'14px' }}>• TARIFS •</span>
        <h2 style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'clamp(28px,4vw,44px)', color:'white', margin:0 }}>Des prix clairs. <span style={{ background:'linear-gradient(135deg,#7B2FFF,#00C2FF)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Zéro surprise.</span></h2>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:'24px', alignItems:'center' }}>
        {PLANS.map((p, i) => (
          <motion.div key={p.name} initial={{ opacity:0, y:44 }} whileInView={{ opacity:1, y: p.popular ? -14 : 0, scale: p.popular ? 1.03 : 1 }} viewport={{ once:true }} transition={{ delay:i*0.12, type:'spring', stiffness:90 }} style={{ zIndex: p.popular ? 2 : 1 }}>
            <div style={{ position:'relative', overflow:'hidden', background:'linear-gradient(145deg,#0D0D22,#0A0A1C)', border: p.popular ? '2px solid #7B2FFF' : '1px solid rgba(123,47,255,0.18)', borderRadius:'22px', padding:'38px 30px', boxShadow: p.popular ? '0 0 80px rgba(123,47,255,0.3)' : 'none', height:'100%' }}>
              <div style={{ position:'absolute', top:0, left:0, right:0, height:'3px', background:'linear-gradient(90deg,#7B2FFF,#00C2FF)' }}/>
              <GlowingEffect spread={35} glow proximity={70} borderWidth={1.5}/>
              {p.popular && <BorderBeam size={250} duration={8} colorFrom="#7B2FFF" colorTo="#00C2FF" borderWidth={2}/>}
              {p.popular && <div style={{ position:'absolute', top:'-1px', left:'50%', transform:'translateX(-50%) translateY(-50%)', background:'linear-gradient(135deg,#7B2FFF,#00C2FF)', borderRadius:'999px', padding:'5px 20px', fontFamily:'DM Sans,sans-serif', fontWeight:700, fontSize:'11px', color:'white', whiteSpace:'nowrap' }}>⭐ BEST SELLER</div>}
              <p style={{ fontFamily:'DM Sans,sans-serif', fontWeight:600, fontSize:'11px', letterSpacing:'0.18em', textTransform:'uppercase', color:'rgba(255,255,255,0.38)', margin:'0 0 18px' }}>{p.name}</p>
              <div style={{ display:'flex', alignItems:'flex-end', gap:'3px', marginBottom:'10px' }}>
                <span style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'clamp(48px,5vw,66px)', color:'white', lineHeight:1 }}><PriceCountUp target={p.price}/></span>
                <span style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'24px', background:'linear-gradient(135deg,#7B2FFF,#00C2FF)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', paddingBottom:'8px' }}>€</span>
                <span style={{ fontFamily:'DM Sans,sans-serif', fontSize:'13px', color:'rgba(255,255,255,0.3)', paddingBottom:'10px', marginLeft:'4px' }}>{p.period}</span>
              </div>
              <p style={{ fontFamily:'DM Sans,sans-serif', fontSize:'14px', color:'rgba(255,255,255,0.62)', marginBottom:'24px', lineHeight:1.65 }}>{p.desc}</p>
              <ul style={{ listStyle:'none', padding:0, margin:'0 0 28px', display:'flex', flexDirection:'column', gap:'10px' }}>
                {p.features.map(f => (<li key={f} style={{ display:'flex', alignItems:'center', gap:'10px' }}><Check size={13} color="#10B981" strokeWidth={2.5} style={{ flexShrink:0 }}/><span style={{ fontFamily:'DM Sans,sans-serif', fontSize:'13px', color:'rgba(255,255,255,0.68)' }}>{f}</span></li>))}
              </ul>
              <button onClick={() => nav(p.href)} style={{ width:'100%', height:'50px', borderRadius:'11px', border: p.popular ? 'none' : '1px solid rgba(123,47,255,0.35)', cursor:'pointer', background: p.popular ? 'linear-gradient(135deg,#7B2FFF,#00C2FF)' : 'rgba(123,47,255,0.1)', fontFamily:'DM Sans,sans-serif', fontWeight:600, fontSize:'14px', color:'white', boxShadow: p.popular ? '0 6px 24px rgba(123,47,255,0.45)' : 'none', transition:'transform 200ms' } as React.CSSProperties}
                onMouseEnter={e => (e.currentTarget.style.transform='translateY(-2px)')} onMouseLeave={e => (e.currentTarget.style.transform='none')}>
                Choisir ce forfait →
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

const TESTIMONIALS = [
  { name:'Marie Dupont',       role:'Studio Floral Paris',   text:'ALTÉRA a transformé notre présence en ligne. Les demandes ont triplé en 3 mois.', initials:'MD' },
  { name:'Thomas Bernard',     role:'TechSolutions Lyon',    text:'Notre e-commerce génère 40% du CA. Professionnalisme exemplaire.', initials:'TB' },
  { name:'Sophie Martin',      role:'Agence Immo SM',        text:'Livraison en 12 jours comme promis. Site parfait, je recommande à 100%.', initials:'SM' },
  { name:'Jean Morel',         role:'Artisan Menuisier',     text:'Maintenant j\'ai un site pro qui me ramène des clients chaque semaine.', initials:'JM' },
  { name:'Camille Rousseau',   role:'Boulangerie du Centre', text:'3× plus d\'appels depuis la mise en ligne. Investissement ultra rentable.', initials:'CR' },
  { name:'Alexandre Chen',     role:'Chen Consulting',       text:'La maintenance vaut chaque euro. Site rapide, sécurisé, SEO meilleur chaque mois.', initials:'AC' },
];

function TestimonialsSection() {
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS];
  return (
    <section style={{ position:'relative', zIndex:2, padding:'80px 0', overflow:'hidden' }}>
      <div style={{ textAlign:'center', marginBottom:'52px', padding:'0 24px' }}>
        <span style={{ fontFamily:'DM Sans,sans-serif', fontWeight:600, fontSize:'11px', letterSpacing:'0.22em', textTransform:'uppercase', color:'#7B2FFF', display:'block', marginBottom:'14px' }}>• ILS NOUS FONT CONFIANCE •</span>
        <h2 style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'clamp(28px,4vw,44px)', color:'white', margin:0 }}>Ce qu'en disent nos <span style={{ background:'linear-gradient(135deg,#7B2FFF,#00C2FF)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>clients</span></h2>
      </div>
      <div style={{ maskImage:'linear-gradient(to right,transparent,black 8%,black 92%,transparent)', WebkitMaskImage:'linear-gradient(to right,transparent,black 8%,black 92%,transparent)' }}>
        <div className="tmTrack" style={{ display:'flex', gap:'20px', width:'max-content', animation:'tmScroll 46s linear infinite' }}>
          {doubled.map((t, i) => (
            <div key={i} style={{ flexShrink:0, width:'310px', position:'relative', overflow:'hidden', background:'linear-gradient(145deg,rgba(10,10,30,0.9),rgba(13,13,42,0.95))', border:'1px solid rgba(123,47,255,0.18)', borderRadius:'20px', padding:'26px' }}>
              <GlowingEffect spread={25} proximity={40} borderWidth={1}/>
              <span style={{ position:'absolute', top:'8px', right:'14px', fontSize:'52px', color:'rgba(123,47,255,0.1)', fontFamily:'Georgia', lineHeight:1 }}>"</span>
              <div style={{ marginBottom:'10px' }}>{Array(5).fill(0).map((_,j) => <span key={j} style={{ color:'#F59E0B', fontSize:'13px' }}>★</span>)}</div>
              <p style={{ fontFamily:'DM Sans,sans-serif', fontSize:'13px', fontStyle:'italic', color:'rgba(255,255,255,0.72)', lineHeight:1.72, marginBottom:'18px' }}>"{t.text}"</p>
              <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                <div style={{ width:'35px', height:'35px', borderRadius:'50%', background:'linear-gradient(135deg,#7B2FFF,#00C2FF)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <span style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'12px', color:'white' }}>{t.initials}</span>
                </div>
                <div>
                  <p style={{ fontFamily:'DM Sans,sans-serif', fontWeight:600, fontSize:'13px', color:'white', margin:0 }}>{t.name}</p>
                  <p style={{ fontFamily:'DM Sans,sans-serif', fontSize:'11px', color:'rgba(255,255,255,0.38)', margin:0 }}>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@keyframes tmScroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}.tmTrack:hover{animation-play-state:paused}`}</style>
    </section>
  );
}

function CTASection() {
  const nav = useNavigate();
  return (
    <section style={{ position:'relative', zIndex:2, padding:'80px clamp(16px,4vw,48px) 130px' }}>
      <motion.div initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}>
        <div style={{ maxWidth:'720px', margin:'0 auto', textAlign:'center', position:'relative', overflow:'hidden', background:'linear-gradient(135deg,rgba(123,47,255,0.1),rgba(0,194,255,0.06))', border:'1px solid rgba(123,47,255,0.3)', borderRadius:'26px', padding:'clamp(44px,6vw,72px) clamp(24px,5vw,60px)', boxShadow:'0 0 80px rgba(123,47,255,0.16)' }}>
          <GlowingEffect spread={60} glow proximity={100} borderWidth={2}/>
          <BorderBeam size={300} duration={12} colorFrom="#7B2FFF" colorTo="#00C2FF" borderWidth={1.5}/>
          <Meteors number={8} color="#7B2FFF"/>
          <h2 style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'clamp(26px,4vw,44px)', color:'white', margin:'0 0 16px', lineHeight:1.1, position:'relative', zIndex:1 }}>
            Prêt à lancer votre <span style={{ background:'linear-gradient(135deg,#7B2FFF,#00C2FF)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>projet ?</span>
          </h2>
          <p style={{ fontFamily:'DM Sans,sans-serif', fontSize:'16px', color:'rgba(255,255,255,0.65)', maxWidth:'400px', margin:'0 auto 34px', lineHeight:1.72, position:'relative', zIndex:1 }}>Consultation 30 minutes offerte. Devis gratuit, sans engagement.</p>
          <button onClick={() => nav('/contact')} style={{ padding:'15px 44px', borderRadius:'12px', border:'none', cursor:'pointer', background:'linear-gradient(135deg,#7B2FFF,#00C2FF)', fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'16px', color:'white', boxShadow:'0 8px 30px rgba(123,47,255,0.45)', transition:'transform 250ms,box-shadow 250ms', display:'block', margin:'0 auto 22px', position:'relative', zIndex:1 }}
            onMouseEnter={e => { e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow='0 18px 46px rgba(123,47,255,0.65)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 8px 30px rgba(123,47,255,0.45)'; }}>
            Démarrer mon projet →
          </button>
          <div style={{ display:'flex', justifyContent:'center', gap:'22px', flexWrap:'wrap', position:'relative', zIndex:1 }}>
            {['✓ Réponse sous 24h','✓ Devis gratuit','✓ Sans engagement'].map(t => (<span key={t} style={{ fontFamily:'DM Sans,sans-serif', fontSize:'12px', color:'rgba(255,255,255,0.3)' }}>{t}</span>))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default function Home() {
  return (
    <main style={{ background:'#03030A', position:'relative' }}>
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
