interface HeroBackgroundProps {
  variant: 'home' | 'services' | 'tarifs' | 'pourquoi' | 'contact';
}

const VARIANTS = {
  home: {
    bg: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(123,47,255,0.35) 0%, transparent 70%)',
    accent: 'radial-gradient(ellipse 40% 40% at 80% 20%, rgba(0,194,255,0.12) 0%, transparent 60%)',
    streaks: true,
  },
  services: {
    bg: 'radial-gradient(ellipse 70% 50% at 30% 0%, rgba(0,194,255,0.2) 0%, transparent 60%)',
    accent: 'radial-gradient(ellipse 50% 40% at 70% 50%, rgba(123,47,255,0.15) 0%, transparent 60%)',
    streaks: true,
  },
  tarifs: {
    bg: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(123,47,255,0.28) 0%, transparent 65%)',
    accent: 'radial-gradient(ellipse 30% 30% at 90% 30%, rgba(155,95,255,0.15) 0%, transparent 50%)',
    streaks: true,
  },
  pourquoi: {
    bg: 'radial-gradient(ellipse 70% 50% at 20% 10%, rgba(0,194,255,0.18) 0%, transparent 60%)',
    accent: 'radial-gradient(ellipse 60% 40% at 80% 0%, rgba(123,47,255,0.2) 0%, transparent 60%)',
    streaks: true,
  },
  contact: {
    bg: 'radial-gradient(ellipse 80% 60% at 50% -5%, rgba(123,47,255,0.3) 0%, transparent 70%)',
    accent: 'radial-gradient(ellipse 40% 40% at 10% 50%, rgba(0,194,255,0.1) 0%, transparent 60%)',
    streaks: false,
  },
};

const STREAKS = [
  { top: '12%', left: '15%', delay: '0s', duration: '2.8s', width: '120px' },
  { top: '28%', left: '60%', delay: '1.2s', duration: '2.2s', width: '80px' },
  { top: '8%', left: '75%', delay: '2.5s', duration: '3.1s', width: '150px' },
  { top: '45%', left: '25%', delay: '0.7s', duration: '2.6s', width: '90px' },
  { top: '18%', left: '40%', delay: '3.8s', duration: '2.4s', width: '110px' },
  { top: '60%', left: '80%', delay: '1.9s', duration: '2.9s', width: '70px' },
  { top: '5%', left: '50%', delay: '4.2s', duration: '2.1s', width: '130px' },
  { top: '35%', left: '90%', delay: '2.8s', duration: '3.3s', width: '95px' },
];

export default function HeroBackground({ variant }: HeroBackgroundProps) {
  const v = VARIANTS[variant];

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0, pointerEvents: 'none' }}>
      <div style={{ position: 'absolute', inset: 0, background: v.bg }} />
      <div style={{ position: 'absolute', inset: 0, background: v.accent }} />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(123,47,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(123,47,255,0.04) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {v.streaks && (
        <div style={{ position: 'absolute', inset: 0 }}>
          {STREAKS.map((s, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                top: s.top,
                left: s.left,
                width: s.width,
                height: '1.5px',
                background: 'linear-gradient(90deg, transparent, rgba(255,252,230,0.8), transparent)',
                transform: 'rotate(-35deg)',
                animation: `shootingStar ${s.duration} ease-in-out ${s.delay} infinite`,
                borderRadius: '999px',
              }}
            />
          ))}
        </div>
      )}

      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '200px',
          background: 'linear-gradient(to bottom, transparent, #03030A)',
        }}
      />

      <style>{`
        @keyframes shootingStar {
          0% { opacity: 0; transform: translateX(-60px) rotate(-35deg) scaleX(0.3); }
          10% { opacity: 1; }
          70% { opacity: 0.8; }
          100% { opacity: 0; transform: translateX(180px) rotate(-35deg) scaleX(1); }
        }
      `}</style>
    </div>
  );
}
