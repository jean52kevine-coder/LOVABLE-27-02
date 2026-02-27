import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Home, Layers, Euro, HelpCircle, LucideIcon, Menu, X } from 'lucide-react';

interface NavItem {
  name: string;
  url: string;
  icon: LucideIcon;
}

export function TubelightNavBar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const items: NavItem[] = [
    { name: 'Accueil', url: '/', icon: Home },
    { name: 'Services', url: '/services', icon: Layers },
    { name: 'Tarifs', url: '/tarifs', icon: Euro },
    { name: 'Pourquoi un site ?', url: '/pourquoi-un-site', icon: HelpCircle },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav
        className={`mx-auto mt-3 w-[min(1100px,calc(100%-1.2rem))] rounded-2xl border transition-all duration-300 ${
          scrolled
            ? 'backdrop-blur-[24px] bg-[rgba(3,3,10,0.88)] border-[rgba(123,47,255,0.18)]'
            : 'bg-transparent border-transparent'
        }`}
      >
        <div className="h-[72px] px-4 md:px-6 flex items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-[10px] bg-gradient-to-br from-[#7B2FFF] to-[#00C2FF] shadow-[0_0_20px_rgba(123,47,255,.45)]" />
            <span className="font-heading font-extrabold text-white tracking-tight text-xl">ALTÉRA</span>
          </Link>

          <div className="hidden md:flex items-center gap-1 relative">
            {items.map((item) => {
              const active = location.pathname === item.url;
              return (
                <Link key={item.url} to={item.url} className="relative px-4 py-2 rounded-full text-sm text-white/80 hover:text-white transition-colors">
                  {active && (
                    <motion.div
                      layoutId="lamp"
                      transition={{ type: 'spring', stiffness: 350, damping: 35 }}
                      className="absolute inset-0 rounded-full"
                    >
                      <div className="absolute inset-0 rounded-full bg-[rgba(123,47,255,0.15)]" />
                      <div
                        className="absolute -top-[3px] left-1/2 -translate-x-1/2 h-[3px] w-14 rounded-full bg-gradient-to-r from-[#7B2FFF] to-[#00C2FF]"
                        style={{ boxShadow: '0 0 12px #7B2FFF, 0 0 24px rgba(123,47,255,0.4)' }}
                      />
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 h-5 w-20 bg-[rgba(123,47,255,0.15)] blur-[8px]" />
                    </motion.div>
                  )}
                  <span className="relative z-10">{item.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              className="hidden md:inline-flex rounded-full px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#7B2FFF] to-[#00C2FF] shadow-[0_10px_30px_rgba(123,47,255,.35)]"
            >
              Devis gratuit
            </Link>
            <button className="md:hidden text-white" onClick={() => setOpen((s) => !s)}>
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="md:hidden px-4 pb-4 flex flex-col gap-2"
            >
              {items.map((item) => (
                <Link
                  key={item.url}
                  to={item.url}
                  className={`rounded-xl px-4 py-3 text-sm ${location.pathname === item.url ? 'bg-[rgba(123,47,255,0.14)] text-white' : 'text-white/75'}`}
                >
                  {item.name}
                </Link>
              ))}
              <Link to="/contact" className="mt-2 rounded-xl px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-[#7B2FFF] to-[#00C2FF]">
                Devis gratuit
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
