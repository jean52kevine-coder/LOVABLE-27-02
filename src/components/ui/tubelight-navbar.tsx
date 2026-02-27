import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { LucideIcon, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem { name: string; url: string; icon: LucideIcon }

export function TubelightNavBar({ items }: { items: NavItem[] }) {
  const location = useLocation();
  const [active, setActive] = useState(items[0].name);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const match = items.find(i => location.pathname === i.url || (i.url !== '/' && location.pathname.startsWith(i.url)));
    if (match) setActive(match.name);
  }, [location.pathname, items]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className="sticky top-0 z-50">
      <div className={cn(
        "h-[72px] flex items-center transition-all duration-300",
        scrolled
          ? "bg-[rgba(3,3,10,0.85)] backdrop-blur-2xl border-b border-[rgba(123,47,255,0.15)]"
          : "bg-transparent"
      )}>
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-primary flex items-center justify-center font-heading font-extrabold text-sm text-foreground shadow-[0_0_20px_rgba(123,47,255,0.3)]">
              A
            </div>
            <span className="font-heading font-extrabold text-xl text-foreground tracking-tight">
              ALT<span className="text-gradient">É</span>RA
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {items.map((item) => {
              const isActive = active === item.name;
              return (
                <Link
                  key={item.name}
                  to={item.url}
                  onClick={() => setActive(item.name)}
                  className={cn(
                    "relative px-5 py-2 rounded-full text-sm font-body font-medium transition-colors duration-200",
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="tubelight"
                      className="absolute inset-0 rounded-full -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    >
                      {/* Glow bar top */}
                      <div className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-8 h-[2px] rounded-full bg-violet shadow-[0_0_10px_rgba(123,47,255,0.6),0_0_30px_rgba(123,47,255,0.3)]" />
                      {/* Background pill */}
                      <div className="absolute inset-0 rounded-full bg-[rgba(123,47,255,0.08)] border border-[rgba(123,47,255,0.15)]" />
                    </motion.div>
                  )}
                </Link>
              );
            })}
          </div>

          {/* CTA + Mobile */}
          <div className="flex items-center gap-4">
            <Link
              to="/contact"
              className="hidden md:inline-flex px-6 py-2.5 rounded-full bg-gradient-primary text-sm font-body font-semibold text-foreground hover:opacity-90 transition-all duration-200 shadow-[0_4px_20px_rgba(123,47,255,0.3)] hover:shadow-[0_8px_30px_rgba(123,47,255,0.5)] hover:-translate-y-[2px]"
            >
              Devis gratuit
            </Link>
            <button
              className="md:hidden text-foreground"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-[72px] left-0 right-0 bg-[rgba(3,3,10,0.95)] backdrop-blur-2xl border-b border-[rgba(123,47,255,0.15)] p-6 flex flex-col gap-2 md:hidden"
          >
            {items.map(item => (
              <Link
                key={item.name}
                to={item.url}
                onClick={() => { setActive(item.name); setMenuOpen(false); }}
                className={cn(
                  "py-3 text-sm font-body font-medium border-b border-[rgba(255,255,255,0.05)]",
                  active === item.name ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="mt-4 text-center px-6 py-3 rounded-xl bg-gradient-primary text-sm font-semibold text-foreground"
            >
              Devis gratuit
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
