import { Link } from 'react-router-dom';

const projects = [
  ['01', 'Studio Lumière', 'Photographie', 'Site vitrine', '+340% de demandes en 2 mois', 'from-sky-900/60 to-slate-900'],
  ['02', 'Menuiserie Artisan Morel', 'Artisanat', 'Site vitrine', 'Classement #1 Google local', 'from-emerald-900/60 to-slate-900'],
  ['03', 'Épicerie Fine Chen', 'Commerce', 'E-commerce', '18 000€ de ventes le premier trimestre', 'from-violet-900/60 to-slate-900'],
  ['04', 'Cabinet Rousseau', 'Notariat', 'Site vitrine', 'Crédibilité et image transformées', 'from-amber-900/60 to-slate-900'],
  ['05', 'Atelier Martin', 'Bijouterie', 'E-commerce', '240 commandes/mois en régime de croisière', 'from-rose-900/60 to-slate-900'],
  ['06', 'Restaurant La Forge', 'Restauration', 'Site vitrine', 'Réservations en ligne x3', 'from-zinc-800/70 to-slate-900'],
];

export default function Realisations() {
  return (
    <main className="px-[clamp(20px,6vw,100px)] py-32 text-[#F8F8FF] min-h-screen">
      <div className="max-w-[1280px] mx-auto">
        <h1 className="font-playfair text-[clamp(42px,6vw,72px)] leading-tight">Nos réalisations.<br /><span className="italic text-gradient">Chaque site est une preuve.</span></h1>
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(([n, client, sector, type, result, gradient]) => (
            <article key={n} className={`group relative rounded-2xl aspect-[4/3] p-6 bg-gradient-to-br ${gradient} border border-white/10 overflow-hidden`}>
              <span className="absolute right-4 top-2 font-playfair italic text-7xl text-white/10">{n}</span>
              <p className="text-xs text-white/60 uppercase tracking-[0.16em]">{sector}</p>
              <h2 className="font-semibold mt-2">{client}</h2>
              <span className="absolute bottom-5 left-5 rounded-full border border-white/20 px-3 py-1 text-[11px] font-mono">{type}</span>
              <p className="absolute bottom-5 right-5 max-w-[60%] text-sm opacity-0 translate-y-4 transition group-hover:opacity-100 group-hover:translate-y-0">{result}</p>
            </article>
          ))}
        </div>
        <div className="mt-16 rounded-3xl border border-white/15 p-10 text-center bg-white/[0.02]">
          <p className="font-playfair text-4xl">Un projet comme le vôtre ?</p>
          <Link to="/contact" className="inline-block mt-6 rounded-full px-8 py-3 bg-gradient-to-r from-[#6D28D9] to-[#06B6D4]">Discutons-en gratuitement</Link>
        </div>
      </div>
    </main>
  );
}
