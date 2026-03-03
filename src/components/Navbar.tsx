import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AlteraLogo } from './AlteraLogo';

const NAV_ITEMS = [
  { name: 'Services', url: '/services' },
  { name: 'Réalisations', url: '/realisations' },
  { name: 'Tarifs', url: '/tarifs' },
  { name: 'Pourquoi un site ?', url: '/pourquoi-un-site' },
];

export default function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-[#030309]/90 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10 h-[70px] flex items-center justify-between">
          <Link to="/" className="no-underline"><AlteraLogo size={44} textSize={22} /></Link>
          <div className="hidden md:flex items-center gap-7">
            {NAV_ITEMS.map((item) => (
              <Link key={item.url} to={item.url} className={`nav-link ${location.pathname.startsWith(item.url) ? 'text-white' : 'text-white/60'}`}>{item.name}</Link>
            ))}
          </div>
          <Link to="/contact" className="hidden md:inline-block rounded-full px-6 py-2.5 bg-gradient-to-r from-[#6D28D9] to-[#06B6D4] text-white">Démarrer un projet</Link>
          <button onClick={() => setOpen(true)} className="md:hidden text-white">Menu</button>
        </div>
      </nav>

      <aside className={`fixed top-0 right-0 h-screen w-[80%] max-w-[320px] bg-[#070710] border-l border-white/10 z-[120] transition ${open ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
        <div className="p-6 flex justify-between items-center border-b border-white/10">
          <span className="font-mono text-xs tracking-[0.2em] text-[#C9A84C]">NAVIGATION</span>
          <button onClick={() => setOpen(false)} className="text-white/70">Fermer</button>
        </div>
        <div className="p-6 flex flex-col gap-4">
          {NAV_ITEMS.map((item) => (
            <Link key={item.url} to={item.url} onClick={() => setOpen(false)} className="text-white/80">{item.name}</Link>
          ))}
          <Link to="/contact" onClick={() => setOpen(false)} className="mt-4 rounded-full px-5 py-3 text-center bg-gradient-to-r from-[#6D28D9] to-[#06B6D4]">Démarrer un projet</Link>
        </div>
      </aside>
      <div className="h-[70px]" />
    </>
  );
}
