const DEFAULT_ITEMS = [
  "Site Vitrine", "Site E-commerce", "Maintenance & SEO",
  "Design Premium", "Référencement Local", "Livraison Rapide",
  "Mobile First", "SSL Inclus", "Support Dédié",
];

interface MarqueeProps {
  items?: string[];
  speed?: number;
}

export const AlteraMarquee = ({ items = DEFAULT_ITEMS, speed = 30 }: MarqueeProps) => (
  <div className="w-full overflow-hidden py-6 border-y border-glow opacity-60">
    <div
      className="flex gap-12 whitespace-nowrap"
      style={{ animation: `marquee ${speed}s linear infinite` }}
    >
      {[...items, ...items].map((item, i) => (
        <span key={i} className="flex items-center gap-3 text-sm font-body font-medium text-muted-foreground uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-violet" />
          {item}
        </span>
      ))}
    </div>
  </div>
);
