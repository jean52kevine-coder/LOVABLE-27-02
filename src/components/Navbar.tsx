import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Home, Layers, Euro, HelpCircle } from 'lucide-react';

const NAV_ITEMS = [
  { name: 'Accueil',            url: '/',                 icon: Home },
  { name: 'Services',           url: '/services',         icon: Layers },
  { name: 'Tarifs',             url: '/tarifs',           icon: Euro },
  { name: 'Pourquoi un site ?', url: '/pourquoi-un-site', icon: HelpCircle },
];

function AlteraLogo({ size = 44 }: { size?: number }) {
  const fs = size * 0.48;
  return (
    <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
      <svg width={size} height={size} viewBox="0 0 200 200" fill="none">
        <defs>
          <linearGradient id="lg1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#7B2FFF"/><stop offset="100%" stopColor="#00C2FF"/></linearGradient>
          <linearGradient id="lg2" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#7B2FFF" stopOpacity="0.15"/><stop offset="50%" stopColor="#00C2FF" stopOpacity="1"/><stop offset="100%" stopColor="#7B2FFF" stopOpacity="0.15"/></linearGradient>
          <linearGradient id="lg3" x1="100%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#7B2FFF" stopOpacity="0.15"/><stop offset="50%" stopColor="#7B2FFF" stopOpacity="1"/><stop offset="100%" stopColor="#00C2FF" stopOpacity="0.15"/></linearGradient>
          <filter id="glo"><feGaussianBlur in="SourceGraphic" stdDeviation="3" result="b"/><feComposite in="SourceGraphic" in2="b" operator="over"/></filter>
        </defs>
        <ellipse cx="100" cy="100" rx="82" ry="32" transform="rotate(-35 100 100)" stroke="url(#lg2)" strokeWidth="1.8" fill="none" opacity="0.8"/>
        <ellipse cx="100" cy="100" rx="82" ry="32" transform="rotate(55 100 100)" stroke="url(#lg3)" strokeWidth="1.2" fill="none" opacity="0.5"/>
        <circle cx="100" cy="100" r="48" stroke="url(#lg1)" strokeWidth="0.8" fill="none" opacity="0.2" strokeDasharray="80 220"/>
        <circle cx="152" cy="74" r="6" fill="url(#lg1)" filter="url(#glo)"/>
        <circle cx="152" cy="74" r="11" fill="none" stroke="url(#lg1)" strokeWidth="0.8" opacity="0.35"/>
        <circle cx="52" cy="132" r="3.5" fill="#00C2FF" opacity="0.75"/>
        <circle cx="100" cy="100" r="22" fill="url(#lg1)" opacity="0.1"/>
        <line x1="100" y1="84" x2="89" y2="112" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="100" y1="84" x2="111" y2="112" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="91" y1="102" x2="109" y2="102" stroke="url(#lg1)" strokeWidth="2.2" strokeLinecap="round" filter="url(#glo)"/>
        <circle cx="100" cy="83" r="3" fill="url(#lg1)" filter="url(#glo)"/>
      </svg>
      <span style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:`${fs}px`, lineHeight:1 }}>
        <span style={{ color:'white' }}>ALT</span>
        <span style={{ background:'linear-gradient(135deg,#7B2FFF,#00C2FF)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>É</span>
        <span style={{ color:'white' }}>RA</span>
      </span>
    </div>
  );
}

export default function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const active = NAV_ITEMS.find(i => i.url === '/' ? location.pathname === '/' : location.pathname.startsWith(i.url))?.name ?? 'Accueil';

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      {/* ═══ DESKTOP NAV — toujours visible ═══ */}
      <nav className="hidden md:flex" style={{
        position:'fixed', top:0, left:0, right:0, zIndex:100,
        background: scrolled ? 'rgba(3,3,10,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        borderBottom: `1px solid ${scrolled ? 'rgba(123,47,255,0.15)' : 'transparent'}`,
        transition:'all 350ms ease',
      }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto', padding:'0 48px', height:'72px', display:'flex', alignItems:'center', justifyContent:'space-between', width:'100%' }}>
          <Link to="/" style={{ textDecoration:'none', flexShrink:0 }}>
            <AlteraLogo size={46} />
          </Link>
          {/* Pills centrees */}
          <div style={{ display:'flex', alignItems:'center', gap:'2px', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:'999px', padding:'4px', backdropFilter:'blur(10px)' }}>
            {NAV_ITEMS.map(item => {
              const isActive = active === item.name;
              return (
                <Link key={item.name} to={item.url} style={{ position:'relative', textDecoration:'none', padding:'9px 22px', borderRadius:'999px', fontFamily:'DM Sans,sans-serif', fontWeight:500, fontSize:'14px', color: isActive ? 'white' : 'rgba(255,255,255,0.5)', transition:'color 200ms', whiteSpace:'nowrap' }}>
                  {item.name}
                  {isActive && (
                    <motion.div layoutId="desktop-pill" style={{ position:'absolute', inset:0, borderRadius:'999px', background:'rgba(123,47,255,0.2)', zIndex:-1 }} transition={{ type:'spring', stiffness:380, damping:38 }}>
                      <div style={{ position:'absolute', top:'-2px', left:'50%', transform:'translateX(-50%)', width:'50%', height:'2px', borderRadius:'999px', background:'linear-gradient(90deg,#7B2FFF,#00C2FF)', boxShadow:'0 0 12px #7B2FFF' }}/>
                      <div style={{ position:'absolute', top:'-8px', left:'50%', transform:'translateX(-50%)', width:'70%', height:'16px', background:'rgba(123,47,255,0.1)', borderRadius:'50%', filter:'blur(6px)' }}/>
                    </motion.div>
                  )}
                </Link>
              );
            })}
          </div>
          <Link to="/contact" style={{ textDecoration:'none', flexShrink:0, padding:'11px 28px', borderRadius:'10px', background:'linear-gradient(135deg,#7B2FFF,#00C2FF)', fontFamily:'DM Sans,sans-serif', fontWeight:600, fontSize:'14px', color:'white', boxShadow:'0 4px 20px rgba(123,47,255,0.4)', transition:'transform 220ms,box-shadow 220ms', display:'inline-block' }}
            onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.boxShadow='0 8px 30px rgba(123,47,255,0.6)';}}
            onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow='0 4px 20px rgba(123,47,255,0.4)';}}>
            Devis gratuit
          </Link>
        </div>
      </nav>

      {/* ═══ MOBILE : Logo+CTA en haut ═══ */}
      <header className="flex md:hidden" style={{ position:'fixed', top:0, left:0, right:0, zIndex:100, padding:'12px 20px', background:'rgba(3,3,10,0.94)', backdropFilter:'blur(20px)', borderBottom:'1px solid rgba(123,47,255,0.12)', alignItems:'center', justifyContent:'space-between' }}>
        <Link to="/" style={{ textDecoration:'none' }}><AlteraLogo size={36} /></Link>
        <Link to="/contact" style={{ textDecoration:'none', padding:'8px 18px', borderRadius:'8px', background:'linear-gradient(135deg,#7B2FFF,#00C2FF)', fontFamily:'DM Sans,sans-serif', fontWeight:600, fontSize:'13px', color:'white' }}>Devis gratuit</Link>
      </header>

      {/* ═══ MOBILE : Nav icones en bas ═══ */}
      <nav className="flex md:hidden" style={{ position:'fixed', bottom:0, left:0, right:0, zIndex:100, padding:'10px 8px 20px', background:'rgba(3,3,10,0.95)', backdropFilter:'blur(24px)', borderTop:'1px solid rgba(123,47,255,0.13)' }}>
        <div style={{ display:'flex', justifyContent:'space-around', alignItems:'center', width:'100%', background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.06)', borderRadius:'999px', padding:'6px' }}>
          {NAV_ITEMS.map(item => {
            const Icon = item.icon;
            const isActive = active === item.name;
            return (
              <Link key={item.name} to={item.url} style={{ position:'relative', textDecoration:'none', flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'8px 4px', borderRadius:'999px', gap:'3px', color: isActive ? 'white' : 'rgba(255,255,255,0.38)', transition:'color 200ms' }}>
                {isActive && <motion.div layoutId="mobile-pill" style={{ position:'absolute', inset:0, borderRadius:'999px', background:'rgba(123,47,255,0.22)', zIndex:-1 }} transition={{ type:'spring', stiffness:380, damping:38 }}><div style={{ position:'absolute', top:'-2px', left:'50%', transform:'translateX(-50%)', width:'40%', height:'2px', borderRadius:'999px', background:'linear-gradient(90deg,#7B2FFF,#00C2FF)', boxShadow:'0 0 8px #7B2FFF' }}/></motion.div>}
                <Icon size={19} strokeWidth={isActive ? 2.5 : 1.8}/>
                <span style={{ fontFamily:'DM Sans,sans-serif', fontSize:'10px', fontWeight: isActive ? 600 : 400 }}>{item.name === 'Pourquoi un site ?' ? 'Pourquoi ?' : item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Spacers */}
      <div className="hidden md:block" style={{ height:'72px' }}/>
      <div className="flex md:hidden" style={{ height:'60px' }}/>
    </>
  );
}
