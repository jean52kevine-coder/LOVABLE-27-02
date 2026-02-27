import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Home, Layers, Euro, HelpCircle } from 'lucide-react';

const ITEMS = [
  { name: 'Accueil', url: '/', icon: Home },
  { name: 'Services', url: '/services', icon: Layers },
  { name: 'Tarifs', url: '/tarifs', icon: Euro },
  { name: 'Pourquoi un site ?', url: '/pourquoi-un-site', icon: HelpCircle },
];

export default function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  const active = ITEMS.find((i) =>
    i.url === '/' ? location.pathname === '/' : location.pathname.startsWith(i.url),
  )?.name ?? ITEMS[0].name;

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      <nav
        className="hidden md:flex"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: 'all 400ms ease',
          background: scrolled ? 'rgba(3,3,10,0.90)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(123,47,255,0.15)' : '1px solid transparent',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 48px',
            height: '72px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg,#7B2FFF,#00C2FF)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 20px rgba(123,47,255,0.5)',
              }}
            >
              <span style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: '18px', color: 'white' }}>A</span>
            </div>
            <span style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: '21px' }}>
              <span style={{ color: 'white' }}>ALT</span>
              <span style={{ background: 'linear-gradient(135deg,#7B2FFF,#00C2FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>É</span>
              <span style={{ color: 'white' }}>RA</span>
            </span>
          </Link>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '999px',
              padding: '4px',
              backdropFilter: 'blur(10px)',
            }}
          >
            {ITEMS.map((item) => {
              const isActive = active === item.name;
              return (
                <Link
                  key={item.name}
                  to={item.url}
                  style={{
                    position: 'relative',
                    textDecoration: 'none',
                    padding: '8px 22px',
                    borderRadius: '999px',
                    fontFamily: 'DM Sans,sans-serif',
                    fontWeight: 500,
                    fontSize: '14px',
                    color: isActive ? 'white' : 'rgba(255,255,255,0.5)',
                    transition: 'color 200ms ease',
                    display: 'block',
                  }}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="tubelight-desktop"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '999px',
                        background: 'rgba(123,47,255,0.18)',
                        zIndex: -1,
                      }}
                      transition={{ type: 'spring', stiffness: 380, damping: 38 }}
                    >
                      <div
                        style={{
                          position: 'absolute',
                          top: '-2px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: '50%',
                          height: '2px',
                          borderRadius: '999px',
                          background: 'linear-gradient(90deg,#7B2FFF,#00C2FF)',
                          boxShadow: '0 0 10px #7B2FFF, 0 0 20px rgba(123,47,255,0.5)',
                        }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          top: '-8px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: '70%',
                          height: '16px',
                          background: 'rgba(123,47,255,0.12)',
                          borderRadius: '50%',
                          filter: 'blur(6px)',
                        }}
                      />
                    </motion.div>
                  )}
                </Link>
              );
            })}
          </div>

          <Link
            to="/contact"
            style={{
              textDecoration: 'none',
              padding: '10px 26px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg,#7B2FFF,#00C2FF)',
              fontFamily: 'DM Sans,sans-serif',
              fontWeight: 600,
              fontSize: '14px',
              color: 'white',
              boxShadow: '0 4px 20px rgba(123,47,255,0.35)',
              transition: 'transform 200ms, box-shadow 200ms',
              display: 'inline-block',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 28px rgba(123,47,255,0.55)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(123,47,255,0.35)';
            }}
          >
            Devis gratuit
          </Link>
        </div>
      </nav>

      <nav
        className="flex md:hidden"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: '12px 16px 20px',
          background: 'rgba(3,3,10,0.92)',
          backdropFilter: 'blur(24px)',
          borderTop: '1px solid rgba(123,47,255,0.15)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            width: '100%',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '999px',
            padding: '6px',
          }}
        >
          {ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.name;
            return (
              <Link
                key={item.name}
                to={item.url}
                style={{
                  position: 'relative',
                  textDecoration: 'none',
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '8px 4px',
                  borderRadius: '999px',
                  gap: '2px',
                  color: isActive ? 'white' : 'rgba(255,255,255,0.4)',
                  transition: 'color 200ms',
                }}
              >
                {isActive && (
                  <motion.div
                    layoutId="tubelight-mobile"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '999px',
                      background: 'rgba(123,47,255,0.2)',
                      zIndex: -1,
                    }}
                    transition={{ type: 'spring', stiffness: 380, damping: 38 }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        top: '-2px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '40%',
                        height: '2px',
                        borderRadius: '999px',
                        background: 'linear-gradient(90deg,#7B2FFF,#00C2FF)',
                        boxShadow: '0 0 8px #7B2FFF',
                      }}
                    />
                  </motion.div>
                )}
                <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
                <span style={{ fontFamily: 'DM Sans,sans-serif', fontSize: '10px', fontWeight: 500 }}>{item.name.split(' ')[0]}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="hidden md:block" style={{ height: '72px' }} />
      <div className="flex md:hidden" style={{ height: '80px' }} />
    </>
  );
}
