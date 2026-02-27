import { useEffect, useState } from 'react';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<'enter' | 'show' | 'exit'>('enter');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('show'), 500);
    const t2 = setTimeout(() => setPhase('exit'), 1900);
    const t3 = setTimeout(() => onComplete(), 2300);
    const iv = setInterval(() =>
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(iv);
          return 100;
        }
        return p + 2;
      }), 30);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearInterval(iv);
    };
  }, [onComplete]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#03030A',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 400ms ease, transform 400ms ease',
        opacity: phase === 'exit' ? 0 : 1,
        transform: phase === 'exit' ? 'scale(1.03)' : 'scale(1)',
        pointerEvents: phase === 'exit' ? 'none' : 'all',
      }}
    >
      {[{ top: '20%', left: '25%', color: 'rgba(123,47,255,0.1)' }, { bottom: '20%', right: '20%', color: 'rgba(0,194,255,0.08)' }].map((o, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: `radial-gradient(circle,${o.color} 0%,transparent 70%)`,
            filter: 'blur(40px)',
            animation: 'orbFloat 4s ease-in-out infinite',
            animationDelay: i === 1 ? '2s' : '0s',
            ...o,
          }}
        />
      ))}

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
          transform: phase === 'enter' ? 'scale(0.7) translateY(16px)' : 'scale(1) translateY(0)',
          opacity: phase === 'enter' ? 0 : 1,
          transition: 'all 550ms cubic-bezier(.22,1,.36,1)',
        }}
      >
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div
            style={{
              position: 'absolute',
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              border: '1px solid rgba(123,47,255,0.25)',
              animation: 'ringCW 7s linear infinite',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: '-4px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg,#7B2FFF,#00C2FF)',
                boxShadow: '0 0 10px #7B2FFF',
              }}
            />
          </div>
          <div
            style={{
              position: 'absolute',
              width: '88px',
              height: '88px',
              borderRadius: '50%',
              border: '1px dashed rgba(0,194,255,0.2)',
              animation: 'ringCCW 5s linear infinite',
            }}
          />
          <div
            style={{
              position: 'absolute',
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'radial-gradient(circle,rgba(123,47,255,0.35) 0%,transparent 70%)',
              filter: 'blur(10px)',
              animation: phase === 'show' ? 'logoPulse 1.8s ease-in-out infinite' : 'none',
            }}
          />
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '16px',
              zIndex: 1,
              background: 'linear-gradient(135deg,#7B2FFF,#00C2FF)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 40px rgba(123,47,255,0.6)',
            }}
          >
            <span style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: '30px', color: 'white' }}>A</span>
          </div>
        </div>

        <div style={{ display: 'flex', letterSpacing: '0.18em' }}>
          {['A', 'L', 'T', 'É', 'R', 'A'].map((l, i) => (
            <span
              key={i}
              style={{
                fontFamily: 'Syne,sans-serif',
                fontWeight: 800,
                fontSize: '34px',
                background: i === 3 ? 'linear-gradient(135deg,#7B2FFF,#00C2FF)' : 'white',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: `letterIn .4s cubic-bezier(.22,1,.36,1) ${0.08 + i * 0.06}s both`,
              }}
            >
              {l}
            </span>
          ))}
        </div>

        <p
          style={{
            fontFamily: 'DM Sans,sans-serif',
            fontWeight: 400,
            fontSize: '12px',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.28)',
            animation: 'fadeUp .5s ease .55s both',
          }}
        >
          Agence Web Premium
        </p>
      </div>

      <div style={{ position: 'absolute', bottom: '72px', width: '180px', animation: 'fadeUp .5s ease .35s both' }}>
        <div style={{ height: '2px', borderRadius: '999px', background: 'rgba(255,255,255,0.07)', overflow: 'hidden' }}>
          <div
            style={{
              height: '100%',
              borderRadius: '999px',
              background: 'linear-gradient(90deg,#7B2FFF,#00C2FF)',
              width: `${progress}%`,
              transition: 'width 30ms linear',
              boxShadow: '0 0 8px rgba(123,47,255,0.8)',
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes letterIn{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes ringCW{to{transform:rotate(360deg)}}
        @keyframes ringCCW{to{transform:rotate(-360deg)}}
        @keyframes logoPulse{0%,100%{opacity:.6;transform:scale(1)}50%{opacity:1;transform:scale(1.35)}}
        @keyframes orbFloat{0%,100%{transform:scale(1);opacity:.7}50%{transform:scale(1.1);opacity:1}}
      `}</style>
    </div>
  );
}
