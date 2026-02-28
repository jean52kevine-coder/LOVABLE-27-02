import { useMemo } from 'react';

interface ShootingStarsProps {
  starColor?: string;
  trailColor?: string;
  minSpeed?: number;
  maxSpeed?: number;
  minDelay?: number;
  maxDelay?: number;
  starWidth?: number;
  starHeight?: number;
}

export function ShootingStars({
  starColor = '#fff',
  trailColor = '#fff',
  minSpeed = 10,
  maxSpeed = 25,
  minDelay = 1000,
  maxDelay = 5000,
  starWidth = 10,
  starHeight = 1.5,
}: ShootingStarsProps) {
  const stars = useMemo(
    () =>
      Array.from({ length: 10 }).map((_, i) => {
        const top = Math.random() * 70;
        const left = Math.random() * 90;
        const duration = (Math.random() * (maxSpeed - minSpeed) + minSpeed) / 10;
        const delay = Math.random() * (maxDelay - minDelay) + minDelay;
        const width = starWidth + Math.random() * starWidth;
        return { i, top, left, duration, delay, width };
      }),
    [maxDelay, maxSpeed, minDelay, minSpeed, starWidth],
  );

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {stars.map((s) => (
        <span
          key={s.i}
          style={{
            position: 'absolute',
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.width}px`,
            height: `${starHeight}px`,
            borderRadius: 999,
            background: `linear-gradient(90deg, transparent, ${trailColor}, ${starColor}, transparent)`,
            transform: 'rotate(-35deg)',
            animation: `shoot-${s.i} ${s.duration}s ease-in-out ${s.delay}ms infinite`,
            opacity: 0,
          }}
        />
      ))}
      <style>{`
        ${stars
          .map(
            (s) => `
          @keyframes shoot-${s.i} {
            0% { opacity: 0; transform: translateX(-80px) rotate(-35deg) scaleX(0.3); }
            15% { opacity: 1; }
            80% { opacity: .75; }
            100% { opacity: 0; transform: translateX(200px) rotate(-35deg) scaleX(1); }
          }
        `,
          )
          .join('')}
      `}</style>
    </div>
  );
}
