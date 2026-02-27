import { useEffect, useMemo, useState } from 'react';

interface Props {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: Props) {
  const [phase, setPhase] = useState<'enter' | 'pulse' | 'exit'>('enter');
  const [progress, setProgress] = useState(0);
  const letters = useMemo(() => ['A', 'L', 'T', 'É', 'R', 'A'], []);

  useEffect(() => {
    const pulseTimer = window.setTimeout(() => setPhase('pulse'), 600);
    const progressInterval = window.setInterval(() => {
      setProgress((prev) => Math.min(100, prev + 2));
    }, 30);
    const exitTimer = window.setTimeout(() => setPhase('exit'), 1800);
    const completeTimer = window.setTimeout(onComplete, 2200);

    return () => {
      clearTimeout(pulseTimer);
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: '#03030A',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        transition: 'opacity 380ms ease, transform 420ms ease',
        opacity: phase === 'exit' ? 0 : 1,
        transform: phase === 'exit' ? 'scale(1.04)' : 'scale(1)',
      }}
    >
      <div className="orb orb-1" />
      <div className="orb orb-2" />

      <div style={{ position: 'relative', width: 120, height: 120, marginBottom: 28 }}>
        <div className="ring ring-outer" />
        <div className="ring ring-inner" />
        <div className="logo-box">A</div>
      </div>

      <div style={{ display: 'flex', gap: 2, marginBottom: 8 }}>
        {letters.map((letter, index) => (
          <span
            key={letter + index}
            className="letter"
            style={{
              animationDelay: `${index * 120}ms`,
              color: letter === 'É' ? 'transparent' : '#FFF',
              background: letter === 'É' ? 'linear-gradient(135deg, #7B2FFF, #00C2FF)' : 'none',
              WebkitBackgroundClip: letter === 'É' ? 'text' : 'initial',
            }}
          >
            {letter}
          </span>
        ))}
      </div>
      <p style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '0.24em', fontSize: 11, fontFamily: 'DM Sans, sans-serif' }}>
        Agence Web Premium
      </p>

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
      <div className="progress-wrap">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <style>{`
        .orb { position: fixed; width: 320px; height: 320px; border-radius: 50%; filter: blur(40px); animation: orbPulse 6s ease-in-out infinite; }
        .orb-1 { left: -100px; top: -80px; background: rgba(123,47,255,0.25); }
        .orb-2 { right: -120px; bottom: -100px; background: rgba(0,194,255,0.18); animation-delay: 1.6s; }
        .ring { position: absolute; inset: 0; border-radius: 9999px; }
        .ring-outer { border: 1px solid rgba(123,47,255,0.35); animation: ringRotate 8s linear infinite; }
        .ring-outer::after { content: ''; position: absolute; top: -4px; left: 50%; transform: translateX(-50%); width: 10px; height: 10px; border-radius: 9999px; background: linear-gradient(135deg, #7B2FFF, #00C2FF); box-shadow: 0 0 20px rgba(123,47,255,0.8); }
        .ring-inner { inset: 15px; border: 1px dashed rgba(0,194,255,0.45); animation: ringRotateReverse 5s linear infinite; }
        .logo-box { position: absolute; inset: 28px; border-radius: 16px; background: linear-gradient(135deg, #7B2FFF, #00C2FF); box-shadow: 0 0 28px rgba(123,47,255,0.5); display: flex; align-items: center; justify-content: center; font-family: Syne, sans-serif; font-size: 32px; font-weight: 800; color: #fff; opacity: ${phase === 'enter' ? 0 : 1}; transform: ${phase === 'enter' ? 'scale(0.9)' : 'scale(1)'}; transition: all 380ms ease; }
        .letter { font-family: Syne, sans-serif; font-size: 34px; font-weight: 800; opacity: 0; animation: letterReveal 520ms ease forwards; }
        .progress-wrap { position: fixed; bottom: 80px; width: 200px; height: 6px; border-radius: 9999px; background: rgba(255,255,255,0.06); overflow: hidden; }
        .progress-fill { height: 100%; border-radius: inherit; background: linear-gradient(135deg, #7B2FFF, #00C2FF); box-shadow: 0 0 14px rgba(123,47,255,0.55); transition: width 120ms linear; }
        @keyframes ringRotate { to { transform: rotate(360deg);} }
        @keyframes ringRotateReverse { to { transform: rotate(-360deg);} }
        @keyframes orbPulse { 0%,100% {transform: scale(1); opacity: .5;} 50% {transform: scale(1.12); opacity: .9;} }
        @keyframes letterReveal { from {opacity: 0; transform: translateY(8px);} to {opacity: 1; transform: translateY(0);} }
      `}</style>
    </div>
  );
}
