import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Euro, HelpCircle, Home, Layers } from 'lucide-react';
import { AlteraLogo } from './AlteraLogo';

const NAV_ITEMS = [
  { name: 'Accueil', url: '/', icon: Home },
  { name: 'Services', url: '/services', icon: Layers },
  { name: 'Tarifs', url: '/tarifs', icon: Euro },
  { name: 'Pourquoi un site ?', url: '/pourquoi-un-site', icon: HelpCircle },
];

export default function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  const active =
    NAV_ITEMS.find((i) => (i.url === '/' ? location.pathname === '/' : location.pathname.startsWith(i.url)))?.name ??
    NAV_ITEMS[0].name;

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
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
          transition: 'background 350ms ease, border-color 350ms ease, backdrop-filter 350ms ease',
          background: scrolled ? 'rgba(3,3,10,0.90)' : 'transparent',
          backdropFilter: scrolled ? 'blur(24px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'none',
          borderBottom: `1px solid ${scrolled ? 'rgba(123,47,255,0.13)' : 'transparent'}`,
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 48px',
            height: '70px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Link to="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
            <AlteraLogo size={34} textSize={19} />
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
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.name;
              return (
                <Link
                  key={item.name}
                  to={item.url}
                  style={{
                    position: 'relative',
                    textDecoration: 'none',
                    padding: '8px 20px',
                    borderRadius: '999px',
                    fontFamily: 'DM Sans, sans-serif',
                    fontWeight: 500,
                    fontSize: '14px',
                    color: isActive ? 'white' : 'rgba(255,255,255,0.48)',
                    transition: 'color 200ms ease',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-pill"
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
                          borderRadius: '0 0 2px 2px',
                          background: 'linear-gradient(90deg, #7B2FFF, #00C2FF)',
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
              flexShrink: 0,
              padding: '10px 24px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #7B2FFF, #00C2FF)',
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 600,
              fontSize: '14px',
              color: 'white',
              boxShadow: '0 4px 20px rgba(123,47,255,0.3)',
              transition: 'transform 220ms ease, box-shadow 220ms ease',
              display: 'inline-block',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 28px rgba(123,47,255,0.55)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(123,47,255,0.3)';
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
          padding: '10px 12px 20px',
          background: 'rgba(3,3,10,0.94)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderTop: '1px solid rgba(123,47,255,0.13)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            width: '100%',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '999px',
            padding: '6px',
          }}
        >
          {NAV_ITEMS.map((item) => {
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
                  gap: '3px',
                  color: isActive ? 'white' : 'rgba(255,255,255,0.38)',
                  transition: 'color 200ms',
                }}
              >
                {isActive && (
                  <motion.div
                    layoutId="navbar-pill-mobile"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '999px',
                      background: 'rgba(123,47,255,0.22)',
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
                        background: 'linear-gradient(90deg, #7B2FFF, #00C2FF)',
                        boxShadow: '0 0 8px #7B2FFF',
                      }}
                    />
                  </motion.div>
                )}
                <Icon size={19} strokeWidth={isActive ? 2.5 : 1.8} style={{ transition: 'all 200ms' }} />
                <span
                  style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '10px',
                    fontWeight: isActive ? 600 : 400,
                    lineHeight: 1,
                  }}
                >
                  {item.name === 'Pourquoi un site ?' ? 'Pourquoi ?' : item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="hidden md:block" style={{ height: '70px' }} />
      <div className="flex md:hidden" style={{ height: '76px' }} />
    </>
  );
}
