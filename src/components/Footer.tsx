import { Link } from 'react-router-dom';

export const Footer = () => (
  <footer className="border-t border-white/10 bg-[#030309]">
    <div className="max-w-[1280px] mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <Link to="/" className="font-playfair italic text-2xl">ALT<span className="text-gradient">É</span>RA</Link>
          <p className="mt-3 text-sm text-white/60">Agence web premium française. Des sites performants pour artisans, commerçants et PME.</p>
        </div>
        <div>
          <h4 className="font-mono text-xs tracking-[0.18em] text-[#C9A84C] mb-4">Navigation</h4>
          <div className="flex flex-col gap-2 text-white/70 text-sm">
            <Link to="/services">Services</Link>
            <Link to="/realisations">Réalisations</Link>
            <Link to="/tarifs">Tarifs</Link>
            <Link to="/pourquoi-un-site">Pourquoi un site ?</Link>
          </div>
        </div>
        <div>
          <h4 className="font-mono text-xs tracking-[0.18em] text-[#C9A84C] mb-4">Preuves</h4>
          <p className="text-sm text-white/70">200+ sites livrés</p>
          <p className="text-sm text-white/70">Note moyenne 4.9/5 ★★★★★</p>
          <p className="text-sm text-white/70">🔒 Site sécurisé SSL</p>
        </div>
        <div>
          <h4 className="font-mono text-xs tracking-[0.18em] text-[#C9A84C] mb-4">Contact</h4>
          <p className="text-sm text-white/70">contact@altera.fr</p>
          <Link to="/contact" className="text-sm text-[#06B6D4]">Démarrer un projet →</Link>
        </div>
      </div>
    </div>
  </footer>
);
