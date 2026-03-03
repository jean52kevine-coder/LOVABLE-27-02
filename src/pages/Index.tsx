import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const sectionAnim = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const offers = [
  {
    label: 'VITRINE',
    price: '497€',
    title: 'Site Vitrine',
    subtitle: 'Pour être trouvé et inspirer confiance.',
    accent: '#06B6D4',
    cta: 'En savoir plus →',
    href: '/services/vitrine',
    features: ['Design sur-mesure', '5 pages stratégiques', 'SEO local Google Maps', 'Formulaire de contact', 'Hébergement 1 an', 'Livraison en 14 jours'],
  },
  {
    label: 'E-COMMERCE',
    price: '747€',
    title: 'E-commerce',
    subtitle: 'Pour vendre en ligne sans intermédiaire.',
    accent: 'linear-gradient(90deg,#6D28D9,#06B6D4)',
    cta: 'Lancer ma boutique →',
    href: '/services/ecommerce',
    popular: true,
    features: ['Boutique complète', 'Produits illimités', 'Stripe & PayPal intégré', 'Gestion des stocks', 'Dashboard admin', 'SEO e-commerce', 'Formation 2h', '3 mois de support'],
  },
  {
    label: 'MAINTENANCE',
    price: 'dès 39€/mois',
    title: 'Maintenance',
    subtitle: 'Pour que votre site reste un actif, pas un passif.',
    accent: '#10B981',
    cta: 'Protéger mon site →',
    href: '/services/maintenance',
    features: ['Mises à jour continues', 'Sauvegardes quotidiennes', 'Monitoring 24/7', 'SEO continu', '2 modifications/mois', 'Rapport mensuel'],
  },
];

const projects = [
  ['01', 'Studio Lumière', 'Site vitrine', '+340% de demandes en 2 mois', 'from-sky-900/60 to-slate-900'],
  ['02', 'Menuiserie Artisan Morel', 'Site vitrine', 'Classement #1 Google local', 'from-emerald-900/60 to-slate-900'],
  ['03', 'Épicerie Fine Chen', 'E-commerce', '18 000€ de ventes le premier trimestre', 'from-violet-900/60 to-slate-900'],
  ['04', 'Cabinet Rousseau', 'Site vitrine', 'Crédibilité et image transformées', 'from-amber-900/60 to-slate-900'],
  ['05', 'Atelier Martin', 'E-commerce', '240 commandes/mois en régime de croisière', 'from-rose-900/60 to-slate-900'],
  ['06', 'Restaurant La Forge', 'Site vitrine', 'Réservations en ligne x3', 'from-zinc-800/70 to-slate-900'],
];

const testimonials = [
  ['MD', 'Marie D. — Studio floral, Paris', 'Avant Altéra, j\'avais une page Facebook et des clients uniquement par bouche-à-oreille. Trois mois après le lancement, je reçois 12 demandes par semaine via Google. Le site s\'est rentabilisé en trois semaines.'],
  ['TB', 'Thomas B. — Consultant IT, Lyon', 'J\'ai travaillé avec deux autres agences avant eux. Aucune n\'a tenu ses délais ni son budget. Altéra a livré en 11 jours. Exactement ce qui était prévu.'],
  ['SM', 'Sophie M. — Agence immobilière, Bordeaux', 'Le design est au-delà de ce que j\'espérais. Mes clients me disent systématiquement que notre site est le plus beau de notre secteur local.'],
  ['JM', 'Jean M. — Menuisier artisan, Nantes', 'Je suis artisan, pas commercial. Mon site parle pour moi désormais. Je n\'ai plus à expliquer ce que je fais — les gens arrivent déjà convaincus.'],
  ['CR', 'Camille R. — Boulangerie artisanale, Toulouse', 'Trois fois plus d\'appels depuis la mise en ligne. Le formulaire de contact déborde. J\'ai dû embaucher quelqu\'un pour gérer les demandes. C\'est le meilleur problème que j\'aie eu.'],
  ['AC', 'Alexandre C. — Cabinet de conseil, Marseille', 'La maintenance Pro vaut largement son prix. Mon site est plus rapide qu\'avant, mon classement Google progresse chaque mois, et je n\'ai jamais eu à m\'en inquiéter.'],
];

export default function Index() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Altéra · Agence web premium · Sites sur-mesure en 14 jours';
  }, []);

  useEffect(() => {
    const canvas = document.querySelector('.constellation-canvas') as HTMLCanvasElement | null;
    if (!canvas || window.matchMedia('(max-width: 767px)').matches) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let raf = 0;
    const points = Array.from({ length: 80 }, () => ({ x: Math.random(), y: Math.random(), vx: (Math.random() - 0.5) * 0.0008, vy: (Math.random() - 0.5) * 0.0008 }));
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      points.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x <= 0 || p.x >= 1) p.vx *= -1;
        if (p.y <= 0 || p.y >= 1) p.vy *= -1;
      });
      for (let i = 0; i < points.length; i++) {
        const a = points[i];
        for (let j = i + 1; j < points.length; j++) {
          const b = points[j];
          const dx = (a.x - b.x) * canvas.width;
          const dy = (a.y - b.y) * canvas.height;
          const d = Math.hypot(dx, dy);
          if (d < 120) {
            ctx.strokeStyle = `rgba(109,40,217,${(1 - d / 120) * 0.15})`;
            ctx.beginPath();
            ctx.moveTo(a.x * canvas.width, a.y * canvas.height);
            ctx.lineTo(b.x * canvas.width, b.y * canvas.height);
            ctx.stroke();
          }
        }
      }
      points.forEach((p) => {
        ctx.fillStyle = 'rgba(255,255,255,0.25)';
        ctx.beginPath();
        ctx.arc(p.x * canvas.width, p.y * canvas.height, 1.6, 0, Math.PI * 2);
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <main className="relative overflow-hidden bg-[#030309] text-[#F8F8FF]">
      <section id="hero" className="relative min-h-screen px-[clamp(20px,6vw,100px)] pt-36 pb-24 flex items-center justify-center text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(109,40,217,0.18),transparent_55%)] animate-[gradientMove_12s_ease-in-out_infinite_alternate]" />
        <canvas className="constellation-canvas hidden md:block" />
        <div className="relative z-10 max-w-4xl">
          <p className="font-mono text-[10px] tracking-[0.25em] text-[#C9A84C] mb-8">◈ AGENCE WEB PREMIUM · DEPUIS 2024</p>
          <h1 className="font-playfair text-[clamp(42px,7vw,72px)] leading-[0.98] mb-4">Votre présence en ligne,</h1>
          <h1 className="font-playfair italic font-bold text-[clamp(42px,7vw,72px)] leading-[0.98] text-gradient mb-8">enfin à la hauteur.</h1>
          <p className="max-w-2xl mx-auto text-[rgba(248,248,255,.8)] text-lg">Altéra conçoit des sites web sur-mesure pour les artisans, commerçants et PME qui refusent de passer inaperçus. Design premium. Livraison en 14 jours.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button onClick={() => navigate('/contact')} className="rounded-full px-9 py-3.5 bg-gradient-to-r from-[#6D28D9] to-[#06B6D4] shadow-[0_0_40px_rgba(109,40,217,0.45)] font-medium">Démarrer mon projet →</button>
            <Link to="/realisations" className="rounded-full px-9 py-3.5 border border-white/20 bg-white/0 hover:bg-white/5 transition">Voir nos réalisations</Link>
          </div>
        </div>
        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 text-white/30 animate-bounce"><ChevronDown size={24} /></div>
      </section>

      <Section>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="grid grid-cols-2 gap-6">
            {[['+200', 'sites livrés'], ['14 j', 'délai moyen'], ['98%', 'clients satisfaits'], ['4.9/5', 'note moyenne']].map(([v, l]) => (
              <div key={l}>
                <p className="font-serif text-4xl">{v}</p><p className="text-xs text-white/50">{l}</p>
              </div>
            ))}
          </div>
          <div className="overflow-hidden whitespace-nowrap text-white/30 py-3 border border-white/10 rounded-full">
            <div className="inline-flex gap-10 px-8 animate-[marquee_30s_linear_infinite]">{['Menuiserie Morel', 'Studio Lumière', 'Cabinet Rousseau', 'Épicerie Chen', 'Atelier Martin', 'Plomberie Bernard'].map((l) => <span key={l} className="hover:text-white/60">{l}</span>)}</div>
          </div>
        </div>
      </Section>



      <Section id="pourquoi">
        <h2 className="section-title">Ce qui nous distingue<br /><em>des autres agences.</em></h2>
        <div className="mt-8 space-y-4">
          {[
            ['01', 'Rapidité sans compromis', 'Nous livrons en 14 jours parce que nous avons industrialisé notre processus — pas parce que nous faisons moins bien.', '◈ PROCESSUS RODÉ'],
            ['02', 'Design qui convertit', 'Chaque décision de design chez Altéra est guidée par une question : est-ce que ça convainc ? est-ce que ça vend ?', '◈ ORIENTÉ RÉSULTATS'],
            ['03', 'Transparence totale', 'Prix fixe annoncé, pas de surprise en cours de projet. Vous savez exactement ce que vous payez.', '◈ PRIX FIXE GARANTI'],
          ].map(([n,t,d,b]) => (
            <article key={t} className="relative rounded-2xl border border-white/10 p-6 hover:bg-[#6D28D9]/10 transition">
              <span className="absolute right-4 top-0 text-[110px] leading-none font-playfair text-white/5">{n}</span>
              <p className="font-mono text-xs tracking-[0.18em] text-[#C9A84C]">{b}</p>
              <h3 className="text-2xl mt-2">{t}</h3>
              <p className="text-white/70 mt-2 max-w-3xl">{d}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section id="offres">
        <h2 className="section-title">Trois solutions.<br />Zéro jargon.</h2>
        <div className="mt-8 grid lg:grid-cols-3 gap-6">
          {offers.map((o) => (
            <article key={o.title} className={`rounded-3xl border border-white/10 bg-white/[0.02] p-7 transition hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(0,0,0,0.4)] ${o.popular ? '-translate-y-3' : ''}`}>
              <div className="h-1 rounded-full mb-6" style={{ background: o.accent }} />
              {o.popular && <p className="inline-block mb-3 rounded-full border border-[#C9A84C]/50 text-[#C9A84C] px-3 py-1 text-xs tracking-[0.2em]">POPULAIRE</p>}
              <p className="font-mono text-xs tracking-[0.18em] text-white/50">{o.label}</p>
              <p className="font-serif text-5xl mt-3">{o.price}</p>
              <h3 className="text-2xl mt-3">{o.title}</h3>
              <p className="text-white/65 mt-1">{o.subtitle}</p>
              <ul className="mt-6 space-y-2 text-sm text-white/80">{o.features.map((f) => <li key={f}>• {f}</li>)}</ul>
              <Link to={o.href} className="inline-block mt-6 text-[#06B6D4]">{o.cta}</Link>
            </article>
          ))}
        </div>
      </Section>

      <Section id="realisations">
        <h2 className="section-title">Nos réalisations.</h2>
        <p className="text-white/70 mt-3">Chaque projet est unique. Voici quelques exemples de ce qu'Altéra a livré pour ses clients.</p>
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(([n, c, t, r, g]) => (
            <article key={n} className={`group relative rounded-2xl aspect-[4/3] p-6 bg-gradient-to-br ${g} border border-white/10 overflow-hidden`}>
              <span className="absolute right-4 top-2 font-playfair text-7xl text-white/10">{n}</span>
              <h3 className="font-semibold tracking-wide uppercase text-sm mt-6">{c}</h3>
              <span className="absolute bottom-5 left-5 rounded-full border border-white/20 px-3 py-1 text-[11px] font-mono">{t}</span>
              <p className="absolute bottom-5 right-5 max-w-[60%] text-sm opacity-0 translate-y-4 transition group-hover:opacity-100 group-hover:translate-y-0">{r}</p>
            </article>
          ))}
        </div>
        <Link to="/realisations" className="inline-flex items-center gap-2 mt-8 text-[#06B6D4]">Voir tous nos projets <ArrowRight size={16} /></Link>
      </Section>



      <Section id="methode">
        <h2 className="section-title">Notre méthode.<br />Quatre étapes, aucune improvisation.</h2>
        <div className="mt-8 grid md:grid-cols-4 gap-5">
          {[
            ['01', 'Découverte', 'Appel 30min. On apprend votre métier.', 'Jour 1'],
            ['02', 'Design', 'Maquette validée ensemble.', 'J.2–5'],
            ['03', 'Développement', 'Code propre, performant, SEO-ready.', 'J.5–12'],
            ['04', 'Livraison', 'En ligne. Formation incluse.', 'J.12–14'],
          ].map(([n,t,d,dl]) => (
            <article key={t} className="rounded-2xl border border-white/10 p-5 bg-white/[0.02]">
              <p className="font-playfair italic text-5xl text-gradient">{n}</p>
              <h3 className="mt-2 text-xl">{t}</h3>
              <p className="text-sm text-white/65 mt-2">{d}</p>
              <p className="mt-3 text-[#C9A84C] text-[11px] font-mono uppercase tracking-[0.14em]">{dl}</p>
            </article>
          ))}
        </div>
        <Link to="/contact" className="inline-block mt-8 rounded-full px-8 py-3 bg-gradient-to-r from-[#6D28D9] to-[#06B6D4]">Commencer maintenant →</Link>
      </Section>

      <Section id="stack">
        <h2 className="section-title">Construit avec les meilleurs outils.<br />Garanti pour durer.</h2>
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <div>
            <div className="flex flex-wrap gap-2">{['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Stripe', 'WooCommerce', 'Sanity CMS', 'Vercel', 'Cloudflare'].map((s) => <span key={s} className="rounded-full px-3 py-1 border border-white/15 text-xs font-mono">{s}</span>)}</div>
            <p className="mt-5 text-white/65">Nos sites sont construits avec les mêmes technologies utilisées par les équipes de Vercel, Stripe et Linear. Pas de page builder, pas de templates WordPress génériques.</p>
          </div>
          <div className="space-y-5">{['Satisfaction design — Vous validez chaque étape. Rien n\'est codé sans votre accord.', 'Délai garanti — Si nous dépassons le délai convenu, vous recevez une réduction de 10% sur votre facture finale.', 'Support post-livraison — 30 jours de support inclus sur chaque création.'].map((g, i) => <p key={g} className="text-white/70"><span className="text-[#C9A84C] font-mono mr-2">[{`0${i + 1}`}]</span>{g}</p>)}</div>
        </div>
      </Section>

      <Section id="temoignages">
        <h2 className="section-title">Ce qu'ils disent,<br />sans qu'on le leur demande.</h2>
        <div className="mt-8 columns-1 md:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
          {testimonials.map(([ini, who, quote], i) => (
            <article key={who} className="mb-6 break-inside-avoid rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:-translate-y-1 transition">
              <div className={`h-10 w-10 rounded-full bg-gradient-to-br ${['from-violet-600 to-cyan-500', 'from-amber-500 to-violet-600', 'from-cyan-600 to-sky-500'][i % 3]} grid place-items-center text-sm font-semibold`}>{ini}</div>
              <p className="mt-4 text-white/70 text-sm">“{quote}”</p>
              <p className="mt-4 text-sm">{who}</p>
              <p className="text-[#C9A84C] text-sm mt-1">★★★★★</p>
            </article>
          ))}
        </div>
      </Section>



      <Section id="faq">
        <h2 className="section-title">Questions fréquentes.</h2>
        <div className="mt-8 space-y-3">
          {[
            ['Pourquoi 497€ et pas 200€ ?', 'Parce que nous ne livrons pas des templates. Chaque site est conçu sur-mesure et optimisé pour le SEO.'],
            ['Que se passe-t-il si le résultat ne me convient pas ?', 'Vous validez la maquette avant le développement. Rien n'est codé sans votre accord.'],
            ['Je n'y connais rien en web. Est-ce que je peux gérer mon site ?', 'Chaque livraison inclut une formation de prise en main.'],
            ['Combien de temps pour être visible sur Google ?', 'Les premiers résultats apparaissent généralement en 4 à 8 semaines.'],
            ['La maintenance est-elle nécessaire ?', 'Oui, sécurité, sauvegardes et SEO continu protègent votre actif digital.'],
            ['Puis-je ajouter des pages après livraison ?', 'Oui, avec devis transparent avant intervention.'],
            ['Vous travaillez avec quels clients ?', 'Artisans, commerçants, restaurateurs, professions libérales, PME et consultants.'],
          ].map(([q,a]) => <details key={q} className="rounded-xl border border-white/10 p-5 bg-white/[0.02]"><summary className="cursor-pointer">{q}</summary><p className="mt-3 text-white/70">{a}</p></details>)}
        </div>
      </Section>

      <Section id="cta-final">
        <div className="rounded-3xl border border-white/15 bg-gradient-to-br from-violet-900/20 to-cyan-900/10 p-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 m-auto size-52 rounded-full bg-violet-600/20 blur-3xl animate-pulse" />
          <h2 className="font-playfair text-[clamp(36px,5vw,56px)] leading-tight relative">Votre prochain client<br /><span className="italic text-gradient">vous cherche en ce moment.</span></h2>
          <p className="mt-4 text-white/70 relative">Consultation gratuite de 30 minutes. Devis sous 24h. Sans engagement. Remboursé si délai non tenu.</p>
          <Link to="/contact" className="relative inline-block rounded-full px-10 py-3 mt-8 bg-gradient-to-r from-[#6D28D9] to-[#06B6D4]">Démarrer mon projet — gratuit →</Link>
          <p className="mt-4 text-[#C9A84C] text-xs font-mono tracking-[0.16em]">◈ Réponse sous 24h · ◈ Devis sans engagement · ◈ Délai garanti</p>
        </div>
      </Section>
    </main>
  );
}

function Section({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <motion.section id={id} variants={sectionAnim} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="px-[clamp(20px,6vw,100px)] py-[clamp(80px,10vw,140px)] border-t border-white/5 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-16 bg-gradient-to-r from-[#6D28D9] to-[#06B6D4]" />
      <div className="max-w-[1280px] mx-auto">{children}</div>
    </motion.section>
  );
}
