import { useEffect, useState } from 'react';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'enter' | 'pulse' | 'exit'>('enter');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('pulse'), 600);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) { clearInterval(interval); return 100; }
        return prev + 2;
      });
    }, 30);

    const t2 = setTimeout(() => setPhase('exit'), 1800);
    const t3 = setTimeout(() => onComplete(), 2200);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearInterval(interval); };
  }, [onComplete]);

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: '#03030A',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        opacity: phase === 'exit' ? 0 : 1,
        transition: 'opacity 0.4s ease',
        pointerEvents: phase === 'exit' ? 'none' : 'all',
      }}
    >
      {/* Orbes cosmiques */}
      <div style={{
        position: 'absolute', top: '20%', left: '30%', width: 300, height: 300,
        borderRadius: '50%', filter: 'blur(120px)', opacity: 0.4,
        background: 'radial-gradient(circle, rgba(123,47,255,0.4), transparent 70%)',
        animation: 'orbPulse 4s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute', bottom: '20%', right: '25%', width: 250, height: 250,
        borderRadius: '50%', filter: 'blur(100px)', opacity: 0.3,
        background: 'radial-gradient(circle, rgba(0,194,255,0.3), transparent 70%)',
        animation: 'orbPulse 5s ease-in-out infinite 1s',
      }} />

      {/* Logo central */}
      <div style={{
        opacity: phase === 'enter' ? 0 : 1,
        transform: phase === 'enter' ? 'scale(0.8)' : 'scale(1)',
        transition: 'all 0.6s cubic-bezier(0.22,1,0.36,1)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24,
      }}>
        {/* Icône avec rings */}
        <div style={{ position: 'relative', width: 120, height: 120 }}>
          {/* Ring externe */}
          <div style={{
            position: 'absolute', inset: -10, borderRadius: '50%',
            border: '1px solid rgba(123,47,255,0.3)',
            animation: 'ringRotate 8s linear infinite',
          }}>
            <div style={{
              position: 'absolute', top: -4, left: '50%', transform: 'translateX(-50%)',
              width: 8, height: 8, borderRadius: '50%',
              background: '#7B2FFF', boxShadow: '0 0 12px rgba(123,47,255,0.8)',
            }} />
          </div>

          {/* Ring interne */}
          <div style={{
            position: 'absolute', inset: -24, borderRadius: '50%',
            border: '1px solid rgba(0,194,255,0.2)',
            animation: 'ringRotateReverse 12s linear infinite',
          }} />

          {/* Glow */}
          <div style={{
            position: 'absolute', inset: -20, borderRadius: '50%', filter: 'blur(40px)',
            background: 'radial-gradient(circle, rgba(123,47,255,0.3), transparent 70%)',
            animation: 'logoPulse 2s ease-in-out infinite',
          }} />

          {/* Carré gradient */}
          <div style={{
            position: 'absolute', inset: 0,
            borderRadius: 24,
            background: 'linear-gradient(135deg, #7B2FFF, #00C2FF)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'Syne', fontWeight: 800, fontSize: 52, color: 'white',
            boxShadow: '0 0 60px rgba(123,47,255,0.4)',
          }}>
            A
          </div>
        </div>

        {/* Lettres ALTÉRA */}
        <div style={{ display: 'flex', gap: 4 }}>
          {['A','L','T','É','R','A'].map((letter, i) => (
            <span key={i} style={{
              fontFamily: 'Syne', fontWeight: 800, fontSize: 36, color: 'white',
              opacity: 0, animation: `letterReveal 0.4s ease forwards ${0.6 + i * 0.08}s`,
            }}>
              {letter}
            </span>
          ))}
        </div>

        {/* Tagline */}
        <span style={{
          fontFamily: 'DM Sans', fontSize: 14, fontWeight: 500,
          color: 'rgba(255,255,255,0.5)', letterSpacing: '0.2em', textTransform: 'uppercase',
          opacity: 0, animation: 'fadeInUp 0.5s ease forwards 1.2s',
        }}>
          Agence Web Premium
        </span>
      </div>

      {/* Barre de progression */}
      <div style={{
        position: 'absolute', bottom: 80, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
      }}>
        <div style={{
          width: 200, height: 3, borderRadius: 4,
          background: 'rgba(255,255,255,0.08)', overflow: 'hidden',
        }}>
          <div style={{
            height: '100%', borderRadius: 4,
            background: 'linear-gradient(90deg, #7B2FFF, #00C2FF)',
            width: `${progress}%`, transition: 'width 0.1s linear',
          }} />
        </div>
        <span style={{
          fontFamily: 'DM Sans', fontSize: 12, fontWeight: 500,
          color: 'rgba(255,255,255,0.35)',
        }}>
          {progress < 100 ? `${progress}%` : 'Prêt'}
        </span>
      </div>

      <style>{`
        @keyframes letterReveal {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes logoPulse {
          0%,100% { transform: scale(1); opacity: 0.6; }
          50%     { transform: scale(1.4); opacity: 1; }
        }
        @keyframes ringRotate {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes ringRotateReverse {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
        @keyframes orbPulse {
          0%,100% { opacity: 0.6; transform: scale(1); }
          50%     { opacity: 1; transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
}
