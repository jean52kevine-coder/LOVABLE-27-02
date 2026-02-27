const testimonials = [
  { name: 'Marie Dupont', role: 'Fondatrice, Studio Floral Paris', text: 'ALTÉRA a transformé notre présence en ligne. Les demandes de devis ont triplé en 3 mois.', initials: 'MD' },
  { name: 'Thomas Bernard', role: 'Gérant, TechSolutions Lyon', text: 'Notre site e-commerce génère désormais 40% de notre CA. Professionnalisme exemplaire.', initials: 'TB' },
  { name: 'Sophie Martin', role: 'Directrice, Agence Immobilière SM', text: 'Livraison en 12 jours comme promis. Le site reflète parfaitement notre image. Je recommande à 100%.', initials: 'SM' },
  { name: 'Jean-Laurent Morel', role: 'Artisan Menuisier', text: "Je suis artisan, pas informaticien. L'équipe a tout géré et m'a formé. Maintenant j'ai un site pro.", initials: 'JM' },
  { name: 'Camille Rousseau', role: 'Gérante, Boulangerie du Centre', text: "Mon référencement Google a explosé. On reçoit 3× plus d'appels. Investissement ultra rentable.", initials: 'CR' },
  { name: 'Alexandre Chen', role: 'Fondateur, Chen Consulting', text: "La maintenance mensuelle vaut son prix. Site toujours rapide, sécurisé, SEO qui s'améliore chaque mois.", initials: 'AC' },
];

export default function TestimonialsMarquee() {
  const rows = [...testimonials, ...testimonials];

  return (
    <div className="group relative overflow-hidden">
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-[#03030A] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-[#03030A] to-transparent" />
      <div className="flex w-max gap-3 [--duration:40s] animate-marquee group-hover:[animation-play-state:paused]">
        {rows.map((item, index) => (
          <article
            key={`${item.name}-${index}`}
            className="w-[320px] rounded-[20px] border p-5 relative"
            style={{
              background: 'linear-gradient(145deg, rgba(10,10,30,0.85), rgba(13,13,40,0.9))',
              border: '1px solid rgba(123,47,255,0.15)',
            }}
          >
            <span className="absolute right-5 top-2 text-[56px] leading-none text-[rgba(123,47,255,0.1)]">"</span>
            <p className="text-[#F59E0B] text-sm">★★★★★</p>
            <p className="mt-3 text-sm italic text-[rgba(255,255,255,0.65)] font-body">{item.text}</p>
            <div className="mt-5 flex items-center gap-3">
              <div className="h-[38px] w-[38px] rounded-full flex items-center justify-center text-xs font-bold text-white bg-gradient-to-br from-[#7B2FFF] to-[#00C2FF]">
                {item.initials}
              </div>
              <div>
                <p className="text-sm text-white">{item.name}</p>
                <p className="text-xs text-white/55">{item.role}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
