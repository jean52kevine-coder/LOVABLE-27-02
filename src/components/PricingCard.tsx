import { Check } from 'lucide-react';
import { GradientButton } from './GradientButton';
import { GlowingEffect } from './ui/glowing-effect';

interface PricingCardProps {
  title: string;
  price: string;
  unit?: string;
  features: string[];
  badge?: string;
  featured?: boolean;
  ctaText?: string;
  ctaLink?: string;
}

export const PricingCard = ({
  title, price, unit = '', features, badge, featured = false,
  ctaText = 'Démarrer mon projet →', ctaLink = '/contact',
}: PricingCardProps) => (
  <div
    className={`relative bg-gradient-card rounded-2xl border border-[rgba(123,47,255,0.18)] p-8 flex flex-col card-lift ${
      featured ? 'scale-[1.04] border-violet shadow-[0_0_60px_hsla(264,100%,59%,0.3)]' : ''
    }`}
    style={featured ? { animation: 'pulsGlow 3s ease-in-out infinite' } : {}}
  >
    <GlowingEffect spread={40} glow proximity={70} />
    {badge && (
      <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-primary text-xs font-body font-semibold text-foreground z-10">
        {badge}
      </span>
    )}
    <h3 className="font-heading font-bold text-xl text-foreground mb-4">{title}</h3>
    <div className="mb-6">
      <span className="font-heading font-extrabold text-5xl text-foreground">{price}</span>
      <span className="text-gradient text-3xl font-heading font-extrabold"> €</span>
      {unit && <span className="text-sm text-muted-foreground ml-1">{unit}</span>}
    </div>
    <div className="flex flex-col gap-3 mb-8 flex-1">
      {features.map((f, i) => (
        <div key={i} className="flex items-start gap-3">
          <Check size={16} className="mt-0.5 text-success flex-shrink-0" />
          <span className="text-sm text-muted-foreground">{f}</span>
        </div>
      ))}
    </div>
    <GradientButton to={ctaLink} variant={featured ? 'primary' : 'outline'}>
      {ctaText}
    </GradientButton>
  </div>
);
