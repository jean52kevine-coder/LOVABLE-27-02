import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Accueil', path: '/' },
  {
    label: 'Services',
    path: '/services',
    dropdown: [
      { label: 'Site Vitrine', price: '497€', path: '/site-vitrine', icon: '🌐' },
      { label: 'Site E-commerce', price: '747€', path: '/site-ecommerce', icon: '🛒' },
      { label: 'Maintenance & SEO', price: 'dès 39€/mois', path: '/maintenance', icon: '🛡️' },
    ],
  },
  { label: 'Tarifs', path: '/tarifs' },
  { label: 'Pourquoi un site ?', path: '/pourquoi-un-site' },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  return (
    <nav
      className={`sticky top-0 z-50 h-[72px] flex items-center transition-all duration-300 ${
        scrolled
          ? 'bg-bg-deep/85 backdrop-blur-2xl border-b border-glow'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-heading font-extrabold text-2xl text-foreground tracking-tight">
          ALT<span className="text-gradient">É</span>RA
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
            link.dropdown ? (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <button className="flex items-center gap-1 text-sm font-body font-medium text-muted-foreground hover:text-foreground transition-colors">
                  {link.label}
                  <ChevronDown size={14} className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-bg-mid/95 backdrop-blur-xl border border-glow rounded-2xl p-3 shadow-2xl"
                    >
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gradient-dark transition-colors group"
                        >
                          <span className="text-lg">{item.icon}</span>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-foreground group-hover:text-gradient">{item.label}</div>
                            <div className="text-xs text-muted-foreground">{item.price}</div>
                          </div>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={link.label}
                to={link.path}
                className={`text-sm font-body font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        {/* CTA + Mobile */}
        <div className="flex items-center gap-4">
          <Link
            to="/contact"
            className="hidden md:inline-flex px-6 py-2.5 rounded-full bg-gradient-primary text-sm font-body font-semibold text-foreground hover:opacity-90 transition-opacity"
          >
            Devis gratuit
          </Link>
          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-[72px] left-0 right-0 bg-bg-deep/95 backdrop-blur-2xl border-b border-glow p-6 flex flex-col gap-4 md:hidden"
          >
            {navLinks.map((link) =>
              link.dropdown ? (
                <div key={link.label} className="flex flex-col gap-2">
                  <span className="text-sm font-medium text-muted-foreground">{link.label}</span>
                  {link.dropdown.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="pl-4 py-2 text-sm text-foreground hover:text-gradient transition-colors"
                    >
                      {item.icon} {item.label} — {item.price}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={link.label}
                  to={link.path}
                  className="text-sm font-medium text-foreground"
                >
                  {link.label}
                </Link>
              )
            )}
            <Link
              to="/contact"
              className="mt-2 text-center px-6 py-3 rounded-full bg-gradient-primary text-sm font-semibold text-foreground"
            >
              Devis gratuit
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
