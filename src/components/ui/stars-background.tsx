import { useMemo } from 'react';

interface StarsBackgroundProps {
  className?: string;
  starDensity?: number;
  allStarsTwinkle?: boolean;
}

export function StarsBackground({ className, starDensity = 0.0001, allStarsTwinkle = true }: StarsBackgroundProps) {
  const count = Math.max(60, Math.floor(1200 * 800 * starDensity));
  const stars = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 2 + 0.8,
        delay: Math.random() * 4,
        duration: Math.random() * 2 + 2,
        opacity: Math.random() * 0.6 + 0.3,
      })),
    [count],
  );

  return (
    <div className={className} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {stars.map((s) => (
        <span
          key={s.id}
          style={{
            position: 'absolute',
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            borderRadius: '50%',
            background: '#ffffff',
            opacity: s.opacity,
            animation: allStarsTwinkle ? `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite` : undefined,
          }}
        />
      ))}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
