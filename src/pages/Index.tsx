import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Check, Globe, ShoppingCart, Shield, ArrowRight, Star } from 'lucide-react';
import { GlobalBackground } from '@/components/GlobalBackground';

// ── CountUp ──────────────────────────────────────
function AnimatedNumber({ target, suffix = '' }: { target: number | string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  const isNum = typeof target === 'number';
  useEffect(() => {
    if (!inView || !isNum) return;
    let n = 0; const steps = 40;
    const id = setInterval(() => {
      n += (target as number) / steps;
      if (n >= (target as number)) { setVal(target as number); clearInterval(id); return; }
      setVal(Math.round(n));
    }, 600 / steps);
    return () => clearInterval(id);
  }, [inView, isNum, target]);
  return <span ref={ref}>{isNum ? val : target}{suffix}</span>;
}

// ── HERO ──────────────────────────────────────────
const WORDS = ['artisans', 'commerçants', 'restaurants', 'PME locales', 'indépendants'];

function HeroSection() {
  const [idx, setIdx] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const id = setInterval(() => setIdx(p => (p + 1) % WORDS.length), 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <section style={{ position:'relative', minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'clamp(100px,12vh,140px) 24px 80px', textAlign:'center', overflow:'hidden' }}>
      {/* Fond violet avec étoiles filantes violettes */}
      <GlobalBackground variant="hero" />

      <div style={{ position:'relative', zIndex:1, maxWidth:'860px', width:'100%' }}>
        {/* Badge */}
        <motion.div initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}} transition={{delay:.1}}
          style={{ display:'inline-flex', alignItems:'center', gap:'8px', padding:'7px 20px', borderRadius:'999px', marginBottom:'36px', background:'rgba(123,47,255,0.12)', border:'1px solid rgba(123,47,255,0.35)' }}>
          <span style={{ width:'7px', height:'7px', borderRadius:'50%', background:'#7B2FFF', boxShadow:'0 0 10px #7B2FFF', display:'inline-block', animation:'badgePulse 2s ease-in-out infinite' }}/>
          <span style={{ fontFamily:'DM Sans,sans-serif', fontWeight:600, fontSize:'11px', letterSpacing:'0.22em', textTransform:'uppercase', color:'#B090FF' }}>AGENCE WEB PREMIUM</span>
        </motion.div>

        {/* H1 — overflow visible pour que les lettres ne soient pas coupées */}
        <motion.h1 initial={{opacity:0,y:28}} animate={{opacity:1,y:0}} transition={{delay:.22, ease:[.22,1,.36,1]}}
          style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'clamp(36px,5.2vw,62px)', lineHeight:1.08, color:'white', margin:'0 0 4px', overflow:'visible' }}>
          Votre présence en ligne,
        </motion.h1>

        {/* Mot animé — overflow visible pour éviter la coupure des lettres */}
        <div style={{ height:'clamp(46px,7vw,76px)', overflow:'visible', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'28px' }}>
          <AnimatePresence mode="wait">
            <motion.span key={idx}
              initial={{y:60,opacity:0,rotateX:-15}}
              animate={{y:0,opacity:1,rotateX:0}}
              exit={{y:-60,opacity:0,rotateX:15}}
              transition={{duration:.44,ease:[.22,1,.36,1]}}
              style={{ display:'block', fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'clamp(36px,5.2vw,62px)', lineHeight:1.08, background:'linear-gradient(135deg,#7B2FFF,#00C2FF)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', overflow:'visible' }}>
              {WORDS[idx]}.
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Sous-titre — blanc lisible */}
        <motion.p initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:.52}}
          style={{ fontFamily:'DM Sans,sans-serif', fontSize:'clamp(15px,1.7vw,18px)', color:'rgba(255,255,255,0.78)', lineHeight:1.72, maxWidth:'510px', margin:'0 auto 44px' }}>
          Sites web performants pour artisans, commerces et PME.<br/>Design sur-mesure, livraison en 14 jours.
        </motion.p>

        {/* CTAs */}
        <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:.66}}
          style={{ display:'flex', gap:'14px', justifyContent:'center', flexWrap:'wrap' }}>
          <button onClick={()=>navigate('/contact')} style={{ padding:'14px 38px', borderRadius:'12px', border:'none', cursor:'pointer', background:'linear-gradient(135deg,#7B2FFF,#00C2FF)', fontFamily:'DM Sans,sans-serif', fontWeight:600, fontSize:'15px', color:'white', boxShadow:'0 8px 30px rgba(123,47,255,0.45)', transition:'transform 250ms,box-shadow 250ms' }}
            onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-3px)';e.currentTarget.style.boxShadow='0 14px 40px rgba(123,47,255,0.65)';}}
            onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow='0 8px 30px rgba(123,47,255,0.45)';}}>
            Démarrer mon projet →
          </button>
          <button onClick={()=>navigate('/services')} style={{ padding:'14px 38px', borderRadius:'12px', border:'1px solid rgba(255,255,255,0.18)', background:'rgba(255,255,255,0.04)', cursor:'pointer', fontFamily:'DM Sans,sans-serif', fontWeight:600, fontSize:'15px', color:'white', transition:'all 250ms' }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(123,47,255,0.5)';e.currentTarget.style.background='rgba(123,47,255,0.1)';}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,255,255,0.18)';e.currentTarget.style.background='rgba(255,255,255,0.04)';}}>
            Découvrir nos services
          </button>
        </motion.div>
      </div>
      <style>{`@keyframes badgePulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.65)}}`}</style>
    </section>
  );
}

// ── STATS ──────────────────────────────────────────
function StatsSection() {
  const stats = [
    { value:14,    suffix:'j',   label:'Livraison moyenne' },
    { value:'4.9', suffix:'/5',  label:'Satisfaction client' },
    { value:24,    suffix:'h',   label:'Réponse devis' },
    { value:'+180',suffix:'%',   label:'Leads moyens générés' },
  ];
  return (
    <section style={{ position:'relative', padding:'0 24px 80px', maxWidth:'1200px', margin:'0 auto' }}>
      {/* Étoiles filantes jaunes dès ici */}
      <GlobalBackground variant="content" />
      <div style={{ position:'relative', zIndex:1, display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'16px' }}>
        {stats.map((s,i) => (
          <motion.div key={s.label} initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.09,duration:.5}}
            style={{ background:'linear-gradient(145deg,rgba(123,47,255,0.08),rgba(0,194,255,0.04))', border:'1px solid rgba(123,47,255,0.2)', borderRadius:'18px', padding:'28px 20px', textAlign:'center' }}>
            <div style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'clamp(30px,3.2vw,46px)', lineHeight:1, background:'linear-gradient(135deg,#7B2FFF,#00C2FF)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', marginBottom:'8px' }}>
              <AnimatedNumber target={typeof s.value === 'number' ? s.value : s.value} suffix={s.suffix}/>
            </div>
            <p style={{ fontFamily:'DM Sans,sans-serif', fontSize:'13px', color:'rgba(255,255,255,0.58)', margin:0 }}>{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ── SERVICES ───────────────────────────────────────
const SERVICES = [
  { icon:Globe,        color:'#00C2FF', price:'497€',        id:'vitrine',     title:'Site Vitrine Premium',    desc:'Un site professionnel qui travaille 24h/24. Design moderne, SEO local, formulaire de contact optimisé.', features:['Design 100% sur-mesure','1 à 5 pages stratégiques','SEO local Google Maps','Formulaire + notifications','Hébergement 1 an offert','Livraison 7–14 jours'] },
  { icon:ShoppingCart, color:'#7B2FFF', price:'747€',        id:'ecommerce',   title:'E-commerce Performance', desc:'Vendez en ligne 24h/24. Tunnel d\'achat fluide, paiements sécurisés, dashboard intuitif.', features:['Produits illimités','Paiement Stripe & PayPal','Gestion stocks & commandes','Dashboard admin','SEO e-commerce avancé','Formation 2h incluse'], featured:true },
  { icon:Shield,       color:'#10B981', price:'dès 39€/mois', id:'maintenance', title:'Maintenance & Croissance', desc:'Votre site sécurisé, rapide et visible sur Google. Sans effort de votre côté.', features:['Sécurité & pare-feu actif','Sauvegardes hebdomadaires','Monitoring 24/7','SEO continu','Modifications incluses','Rapport mensuel'] },
];

function ServicesSection() {
  const navigate = useNavigate();
  return (
    <section style={{ position:'relative', padding:'80px 24px', maxWidth:'1200px', margin:'0 auto' }}>
      <div style={{ position:'relative', zIndex:1 }}>
        <div style={{ textAlign:'center', marginBottom:'56px' }}>
          <span style={{ fontFamily:'DM Sans,sans-serif', fontWeight:600, fontSize:'11px', letterSpacing:'0.22em', textTransform:'uppercase', color:'#7B2FFF', display:'block', marginBottom:'14px' }}>• NOS SERVICES •</span>
          <h2 style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'clamp(28px,4vw,44px)', color:'white', margin:0, lineHeight:1.1 }}>
            Services <span style={{ background:'linear-gradient(135deg,#7B2FFF,#00C2FF)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>premium</span>
          </h2>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:'24px' }}>
          {SERVICES.map((s,i) => {
            const Icon = s.icon;
            return (
              <motion.div key={s.id}
                initial={{opacity:0,y:36}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
                transition={{delay:i*0.12,duration:.6,ease:[.22,1,.36,1]}}
                whileHover={{ y:-8, transition:{duration:.2} }}
                style={{ position:'relative', overflow:'hidden', background:'linear-gradient(145deg,#0D0D22,#0A0A1C)', border: s.featured ? `2px solid ${s.color}` : '1px solid rgba(123,47,255,0.22)', borderRadius:'22px', padding:'32px 28px', boxShadow: s.featured ? `0 0 60px rgba(123,47,255,0.25)` : 'none', cursor:'default' }}>
                {/* Barre top */}
                <div style={{ position:'absolute', top:0, left:0, right:0, height:'3px', background:`linear-gradient(90deg,${s.color},#7B2FFF)` }}/>
                {/* Badge best seller */}
                {s.featured && <div style={{ position:'absolute', top:'18px', right:'18px', background:'linear-gradient(135deg,#7B2FFF,#00C2FF)', borderRadius:'999px', padding:'4px 14px', fontFamily:'DM Sans,sans-serif', fontWeight:700, fontSize:'11px', letterSpacing:'0.1em', color:'white' }}>BEST SELLER</div>}
                {/* Icône */}
                <div style={{ width:'52px', height:'52px', borderRadius:'14px', marginBottom:'22px', background:`linear-gradient(135deg,${s.color}22,${s.color}11)`, border:`1px solid ${s.color}44`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <Icon size={24} color={s.color}/>
                </div>
                <h3 style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'20px', color:'white', margin:'0 0 6px' }}>{s.title}</h3>
                <div style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'24px', background:`linear-gradient(135deg,${s.color},#7B2FFF)`, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', marginBottom:'14px' }}>{s.price}</div>
                <p style={{ fontFamily:'DM Sans,sans-serif', fontSize:'14px', color:'rgba(255,255,255,0.72)', lineHeight:1.7, marginBottom:'22px' }}>{s.desc}</p>
                <ul style={{ listStyle:'none', padding:0, margin:'0 0 26px', display:'flex', flexDirection:'column', gap:'9px' }}>
                  {s.features.map(f => (
                    <li key={f} style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                      <Check size={14} color="#10B981" strokeWidth={2.5} style={{ flexShrink:0 }}/>
                      <span style={{ fontFamily:'DM Sans,sans-serif', fontSize:'13px', color:'rgba(255,255,255,0.68)' }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <button onClick={()=>navigate(`/contact?type=${s.id}`)} style={{ display:'flex', alignItems:'center', gap:'6px', fontFamily:'DM Sans,sans-serif', fontWeight:600, fontSize:'14px', color:s.color, background:'none', border:'none', cursor:'pointer', padding:0, transition:'gap 200ms' }}
                  onMouseEnter={e=>(e.currentTarget.style.gap='12px')}
                  onMouseLeave={e=>(e.currentTarget.style.gap='6px')}>
                  Voir l'offre <ArrowRight size={15}/>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── PROCESSUS ──────────────────────────────────────
const STEPS = [
  { n:'01', emoji:'💬', title:'Découverte',       desc:'Consultation 30min offerte. On analyse votre activité, objectifs et marché local.',        badge:'Jour 1' },
  { n:'02', emoji:'🎨', title:'Design',            desc:'Maquettes sur-mesure aux couleurs de votre marque. Vous validez avant qu\'on code.',       badge:'J. 2–5' },
  { n:'03', emoji:'⚡', title:'Développement',     desc:'Code propre, rapide, SEO-optimisé. 100% mobile-first, accessible partout.',               badge:'J. 5–12' },
  { n:'04', emoji:'🚀', title:'Livraison',          desc:'Tests complets, mise en ligne et formation. Vous êtes totalement autonome.',              badge:'J. 12–14' },
];

function ProcessSection() {
  return (
    <section style={{ position:'relative', padding:'80px 24px', maxWidth:'1200px', margin:'0 auto' }}>
      <div style={{ position:'relative', zIndex:1 }}>
        <div style={{ textAlign:'center', marginBottom:'52px' }}>
          <span style={{ fontFamily:'DM Sans,sans-serif', fontWeight:600, fontSize:'11px', letterSpacing:'0.22em', textTransform:'uppercase', color:'#7B2FFF', display:'block', marginBottom:'14px' }}>• NOTRE MÉTHODE •</span>
          <h2 style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'clamp(28px,4vw,44px)', color:'white', margin:0, lineHeight:1.1 }}>
            Votre projet en <span style={{ background:'linear-gradient(135deg,#7B2FFF,#00C2FF)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>4 étapes</span>
          </h2>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(230px,1fr))', gap:'18px' }}>
          {STEPS.map((s,i) => (
            <motion.div key={s.n} initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.1,duration:.55}}
              style={{ background:'linear-gradient(145deg,rgba(123,47,255,0.07),rgba(0,194,255,0.03))', border:'1px solid rgba(123,47,255,0.16)', borderRadius:'18px', padding:'28px 24px' }}>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'18px' }}>
                <span style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'34px', lineHeight:1, background:'linear-gradient(135deg,#7B2FFF,#00C2FF)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', opacity:.4 }}>{s.n}</span>
                <span style={{ fontSize:'26px' }}>{s.emoji}</span>
                <span style={{ fontFamily:'DM Sans,sans-serif', fontSize:'11px', fontWeight:600, background:'rgba(0,194,255,0.1)', border:'1px solid rgba(0,194,255,0.2)', color:'#00C2FF', borderRadius:'999px', padding:'3px 10px' }}>{s.badge}</span>
              </div>
              <h3 style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'17px', color:'white', margin:'0 0 8px' }}>{s.title}</h3>
              <p style={{ fontFamily:'DM Sans,sans-serif', fontSize:'13px', color:'rgba(255,255,255,0.6)', lineHeight:1.65, margin:0 }}>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── TARIFS ─────────────────────────────────────────
function AnimatedPrice({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let n = 0; const steps = 28;
    const id = setInterval(() => {
      n += target / steps;
      if (n >= target) { setVal(target); clearInterval(id); return; }
      setVal(Math.round(n));
    }, 350 / steps);
    return () => clearInterval(id);
  }, [inView, target]);
  return <span ref={ref}>{val}</span>;
}

const PLANS = [
  { name:'SITE VITRINE',  price:497, period:'paiement unique', desc:'Présence professionnelle et génération de leads qualifiés.', features:['Design sur-mesure','1 à 5 pages','SEO local','Formulaire contact','Hébergement 1 an'], href:'/contact?type=vitrine' },
  { name:'E-COMMERCE',    price:747, period:'paiement unique', desc:'Boutique en ligne complète pour vendre 24h/24.', features:['Produits illimités','Paiement Stripe & PayPal','Gestion stocks','Dashboard admin','Formation 2h'], href:'/contact?type=ecommerce', popular:true },
  { name:'MAINTENANCE',   price:39,  period:'/mois dès',       desc:'Sécurité, SEO et performances en continu.', features:['Sécurité & pare-feu','Sauvegardes hebdo','Monitoring 24/7','SEO continu','Rapport mensuel'], href:'/contact?type=maintenance' },
];

function PricingSection() {
  const navigate = useNavigate();
  return (
    <section style={{ position:'relative', padding:'80px 24px', maxWidth:'1200px', margin:'0 auto' }}>
      <div style={{ position:'relative', zIndex:1 }}>
        <div style={{ textAlign:'center', marginBottom:'56px' }}>
          <span style={{ fontFamily:'DM Sans,sans-serif', fontWeight:600, fontSize:'11px', letterSpacing:'0.22em', textTransform:'uppercase', color:'#7B2FFF', display:'block', marginBottom:'14px' }}>• TARIFS •</span>
          <h2 style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'clamp(28px,4vw,44px)', color:'white', margin:0, lineHeight:1.1 }}>
            Des prix clairs. <span style={{ background:'linear-gradient(135deg,#7B2FFF,#00C2FF)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>Zéro surprise.</span>
          </h2>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:'24px', alignItems:'center' }}>
          {PLANS.map((p,i) => (
            <motion.div key={p.name}
              initial={{opacity:0,y:44}}
              whileInView={{opacity:1,y:p.popular?-14:0,scale:p.popular?1.03:1}}
              viewport={{once:true}}
              transition={{delay:i*0.12,type:'spring',stiffness:90}}
              style={{ position:'relative', overflow:'hidden', background:'linear-gradient(145deg,#0D0D22,#0A0A1C)', border: p.popular ? '2px solid #7B2FFF' : '1px solid rgba(123,47,255,0.18)', borderRadius:'22px', padding:'38px 30px', boxShadow: p.popular ? '0 0 80px rgba(123,47,255,0.3)' : 'none', zIndex: p.popular ? 2 : 1 }}>
              <div style={{ position:'absolute', top:0, left:0, right:0, height:'3px', background:'linear-gradient(90deg,#7B2FFF,#00C2FF)' }}/>
              {p.popular && <div style={{ position:'absolute', top:'-1px', left:'50%', transform:'translateX(-50%) translateY(-50%)', background:'linear-gradient(135deg,#7B2FFF,#00C2FF)', borderRadius:'999px', padding:'5px 20px', fontFamily:'DM Sans,sans-serif', fontWeight:700, fontSize:'11px', letterSpacing:'0.1em', color:'white', whiteSpace:'nowrap' }}>⭐ BEST SELLER</div>}
              <p style={{ fontFamily:'DM Sans,sans-serif', fontWeight:600, fontSize:'11px', letterSpacing:'0.18em', textTransform:'uppercase', color:'rgba(255,255,255,0.38)', margin:'0 0 18px' }}>{p.name}</p>
              <div style={{ display:'flex', alignItems:'flex-end', gap:'3px', marginBottom:'10px' }}>
                <span style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'clamp(50px,5.2vw,68px)', color:'white', lineHeight:1 }}><AnimatedPrice target={p.price}/></span>
                <span style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'24px', background:'linear-gradient(135deg,#7B2FFF,#00C2FF)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', paddingBottom:'8px' }}>€</span>
                <span style={{ fontFamily:'DM Sans,sans-serif', fontSize:'13px', color:'rgba(255,255,255,0.32)', paddingBottom:'10px', marginLeft:'4px' }}>{p.period}</span>
              </div>
              <p style={{ fontFamily:'DM Sans,sans-serif', fontSize:'14px', color:'rgba(255,255,255,0.62)', marginBottom:'24px', lineHeight:1.65 }}>{p.desc}</p>
              <ul style={{ listStyle:'none', padding:0, margin:'0 0 28px', display:'flex', flexDirection:'column', gap:'10px' }}>
                {p.features.map(f => (
                  <li key={f} style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                    <Check size={13} color="#10B981" strokeWidth={2.5} style={{ flexShrink:0 }}/>
                    <span style={{ fontFamily:'DM Sans,sans-serif', fontSize:'13px', color:'rgba(255,255,255,0.65)' }}>{f}</span>
                  </li>
                ))}
              </ul>
              <button onClick={()=>navigate(p.href)} style={{ width:'100%', height:'50px', borderRadius:'11px', border: p.popular ? 'none' : '1px solid rgba(123,47,255,0.3)', cursor:'pointer', background: p.popular ? 'linear-gradient(135deg,#7B2FFF,#00C2FF)' : 'rgba(123,47,255,0.1)', fontFamily:'DM Sans,sans-serif', fontWeight:600, fontSize:'14px', color:'white', boxShadow: p.popular ? '0 6px 24px rgba(123,47,255,0.4)' : 'none', transition:'transform 200ms' } as any}
                onMouseEnter={e=>(e.currentTarget.style.transform='translateY(-2px)')}
                onMouseLeave={e=>(e.currentTarget.style.transform='none')}>
                Choisir ce forfait →
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── TÉMOIGNAGES ────────────────────────────────────
const TESTIMONIALS = [
  { name:'Marie Dupont',        role:'Studio Floral Paris',       text:'ALTÉRA a transformé notre présence en ligne. Les demandes ont triplé en 3 mois.', initials:'MD' },
  { name:'Thomas Bernard',      role:'TechSolutions Lyon',         text:'Notre e-commerce génère 40% de notre CA. Professionnalisme exemplaire.',          initials:'TB' },
  { name:'Sophie Martin',       role:'Agence Immo SM',             text:'Livraison en 12 jours comme promis. Site parfait, je recommande à 100%.',          initials:'SM' },
  { name:'Jean-Laurent Morel',  role:'Artisan Menuisier',          text:'Maintenant j\'ai un site pro qui me ramène des clients chaque semaine.',           initials:'JM' },
  { name:'Camille Rousseau',    role:'Boulangerie du Centre',      text:'Référencement Google explosé. 3× plus d\'appels. Investissement ultra rentable.',  initials:'CR' },
  { name:'Alexandre Chen',      role:'Chen Consulting',            text:'La maintenance vaut chaque euro. Site rapide, sécurisé, SEO meilleur chaque mois.', initials:'AC' },
];

function TestimonialsSection() {
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS];
  return (
    <section style={{ position:'relative', padding:'80px 0', overflow:'hidden' }}>
      <div style={{ position:'relative', zIndex:1 }}>
        <div style={{ textAlign:'center', marginBottom:'52px', padding:'0 24px' }}>
          <span style={{ fontFamily:'DM Sans,sans-serif', fontWeight:600, fontSize:'11px', letterSpacing:'0.22em', textTransform:'uppercase', color:'#7B2FFF', display:'block', marginBottom:'14px' }}>• ILS NOUS FONT CONFIANCE •</span>
          <h2 style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'clamp(28px,4vw,44px)', color:'white', margin:0, lineHeight:1.1 }}>
            Ce qu'en disent nos <span style={{ background:'linear-gradient(135deg,#7B2FFF,#00C2FF)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>clients</span>
          </h2>
        </div>
        <div style={{ maskImage:'linear-gradient(to right,transparent,black 8%,black 92%,transparent)', WebkitMaskImage:'linear-gradient(to right,transparent,black 8%,black 92%,transparent)' }}>
          <div className="testimonials-track" style={{ display:'flex', gap:'20px', width:'max-content', animation:'testimonialsScroll 44s linear infinite' }}>
            {doubled.map((t,i) => (
              <div key={i} style={{ flexShrink:0, width:'300px', background:'linear-gradient(145deg,rgba(10,10,30,0.9),rgba(13,13,42,0.95))', border:'1px solid rgba(123,47,255,0.18)', borderRadius:'20px', padding:'26px', position:'relative', overflow:'hidden' }}>
                <span style={{ position:'absolute', top:'8px', right:'14px', fontSize:'52px', color:'rgba(123,47,255,0.1)', fontFamily:'Georgia', lineHeight:1 }}>"</span>
                <div style={{ marginBottom:'10px' }}>{'★★★★★'.split('').map((_,j)=><span key={j} style={{ color:'#F59E0B', fontSize:'13px' }}>★</span>)}</div>
                <p style={{ fontFamily:'DM Sans,sans-serif', fontSize:'13px', fontStyle:'italic', color:'rgba(255,255,255,0.68)', lineHeight:1.72, marginBottom:'18px' }}>"{t.text}"</p>
                <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
                  <div style={{ width:'35px', height:'35px', borderRadius:'50%', background:'linear-gradient(135deg,#7B2FFF,#00C2FF)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <span style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'12px', color:'white' }}>{t.initials}</span>
                  </div>
                  <div>
                    <p style={{ fontFamily:'DM Sans,sans-serif', fontWeight:600, fontSize:'13px', color:'white', margin:0 }}>{t.name}</p>
                    <p style={{ fontFamily:'DM Sans,sans-serif', fontSize:'11px', color:'rgba(255,255,255,0.35)', margin:0 }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes testimonialsScroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        .testimonials-track:hover{animation-play-state:paused}
      `}</style>
    </section>
  );
}

// ── CTA FINAL ──────────────────────────────────────
function CTASection() {
  const navigate = useNavigate();
  return (
    <section style={{ position:'relative', padding:'80px 24px 120px' }}>
      <div style={{ position:'relative', zIndex:1 }}>
        <motion.div initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
          style={{ maxWidth:'720px', margin:'0 auto', textAlign:'center', background:'linear-gradient(135deg,rgba(123,47,255,0.1),rgba(0,194,255,0.06))', border:'1px solid rgba(123,47,255,0.3)', borderRadius:'26px', padding:'clamp(44px,6vw,72px) clamp(24px,5vw,60px)', boxShadow:'0 0 80px rgba(123,47,255,0.15)' }}>
          <h2 style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'clamp(26px,4vw,44px)', color:'white', margin:'0 0 16px', lineHeight:1.1 }}>
            Prêt à lancer votre <span style={{ background:'linear-gradient(135deg,#7B2FFF,#00C2FF)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>projet ?</span>
          </h2>
          <p style={{ fontFamily:'DM Sans,sans-serif', fontSize:'16px', color:'rgba(255,255,255,0.62)', maxWidth:'400px', margin:'0 auto 34px', lineHeight:1.72 }}>
            Consultation 30 minutes offerte. Devis gratuit, sans engagement.
          </p>
          <button onClick={()=>navigate('/contact')} style={{ padding:'15px 42px', borderRadius:'12px', border:'none', cursor:'pointer', background:'linear-gradient(135deg,#7B2FFF,#00C2FF)', fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'16px', color:'white', boxShadow:'0 8px 30px rgba(123,47,255,0.4)', transition:'transform 250ms,box-shadow 250ms', display:'block', margin:'0 auto 22px' }}
            onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-3px)';e.currentTarget.style.boxShadow='0 16px 44px rgba(123,47,255,0.6)';}}
            onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow='0 8px 30px rgba(123,47,255,0.4)';}}>
            Démarrer mon projet →
          </button>
          <div style={{ display:'flex', justifyContent:'center', gap:'22px', flexWrap:'wrap' }}>
            {['✓ Réponse sous 24h','✓ Devis gratuit','✓ Sans engagement'].map(t=>(
              <span key={t} style={{ fontFamily:'DM Sans,sans-serif', fontSize:'12px', color:'rgba(255,255,255,0.3)' }}>{t}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── PAGE PRINCIPALE ────────────────────────────────
export default function Home() {
  return (
    <main style={{ background:'#03030A', position:'relative' }}>
      <HeroSection />        {/* fond violet + étoiles filantes violettes */}
      <StatsSection />       {/* transition → étoiles jaunes/blanches */}
      <ServicesSection />
      <ProcessSection />
      <PricingSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
}
