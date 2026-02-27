import { Link } from 'react-router-dom';

export const Footer = () => (
  <footer className="border-t border-glow bg-bg-deep/50 backdrop-blur-sm">
    <div className="container mx-auto py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo */}
        <div>
          <Link to="/" className="font-heading font-extrabold text-xl text-foreground">
            ALT<span className="text-gradient">É</span>RA
          </Link>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            Agence web premium française. Des sites performants pour artisans, commerçants et PME.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="section-label mb-4">Navigation</h4>
          <div className="flex flex-col gap-2">
            {[['Accueil', '/'], ['Services', '/services'], ['Tarifs', '/tarifs'], ['Pourquoi un site ?', '/pourquoi-un-site']].map(([label, path]) => (
              <Link key={path} to={path} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 className="section-label mb-4">Services</h4>
          <div className="flex flex-col gap-2">
            {[['Site Vitrine', '/site-vitrine'], ['Site E-commerce', '/site-ecommerce'], ['Maintenance & SEO', '/maintenance']].map(([label, path]) => (
              <Link key={path} to={path} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="section-label mb-4">Contact</h4>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <span>contact@altera.fr</span>
            <Link to="/contact" className="text-violet hover:text-violet-soft transition-colors">
              Demander un devis →
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-12 pt-6 border-t border-glow flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-muted-foreground">© 2025 ALTÉRA. Tous droits réservés.</p>
        <p className="text-xs text-muted-foreground">Fait avec ❤️ en France</p>
      </div>
    </div>
  </footer>
);
