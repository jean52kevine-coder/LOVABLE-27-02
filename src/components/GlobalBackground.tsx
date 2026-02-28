import { ShootingStars } from '@/components/ui/shooting-stars';
import { StarsBackground } from '@/components/ui/stars-background';

interface GlobalBackgroundProps {
  variant?: 'hero' | 'content';
}

export function GlobalBackground({ variant = 'content' }: GlobalBackgroundProps) {
  if (variant === 'hero') {
    return (
      <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 80% 55% at 50% -5%, rgba(123,47,255,0.42) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 40% 40% at 85% 20%, rgba(0,194,255,0.15) 0%, transparent 60%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(123,47,255,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(123,47,255,0.05) 1px,transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
        <StarsBackground className="absolute inset-0" starDensity={0.00012} allStarsTwinkle />
        <ShootingStars
          starColor="#7B2FFF"
          trailColor="#B090FF"
          minSpeed={8}
          maxSpeed={20}
          minDelay={1500}
          maxDelay={4000}
          starWidth={12}
          starHeight={2.2}
        />
        <ShootingStars
          starColor="#00C2FF"
          trailColor="#7B2FFF"
          minSpeed={12}
          maxSpeed={25}
          minDelay={2000}
          maxDelay={6000}
          starWidth={8}
          starHeight={1.6}
        />
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
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
      <StarsBackground className="absolute inset-0" starDensity={0.00014} allStarsTwinkle />
      <ShootingStars
        starColor="#FFE066"
        trailColor="#FFF4B0"
        minSpeed={10}
        maxSpeed={28}
        minDelay={2000}
        maxDelay={6000}
        starWidth={20}
        starHeight={2.2}
      />
      <ShootingStars
        starColor="#FFFFFF"
        trailColor="#FFE066"
        minSpeed={8}
        maxSpeed={22}
        minDelay={3500}
        maxDelay={8000}
        starWidth={14}
        starHeight={1.6}
      />
    </div>
  );
}
