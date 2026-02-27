import { useEffect, useRef } from 'react';

export const CosmicBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const stars = Array.from({ length: 150 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      opacity: Math.random() * 0.6 + 0.1,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinkleDir: 1,
    }));

    let shootingStarTimer = 0;
    let shootingStar: { x: number; y: number; angle: number; len: number; progress: number; active: boolean } | null = null;

    const spawnShootingStar = () => {
      shootingStar = {
        x: Math.random() * canvas.width * 0.7 + canvas.width * 0.3,
        y: Math.random() * canvas.height * 0.3,
        angle: (Math.random() * 25 + 20) * Math.PI / 180,
        len: Math.random() * 80 + 120,
        progress: 0,
        active: true,
      };
    };

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const bg = ctx.createRadialGradient(canvas.width * 0.2, canvas.height * 0.2, 0, canvas.width * 0.2, canvas.height * 0.2, canvas.width * 0.8);
      bg.addColorStop(0, 'rgba(123,47,255,0.10)');
      bg.addColorStop(1, 'transparent');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach(star => {
        star.opacity += star.twinkleSpeed * star.twinkleDir;
        if (star.opacity > 0.9 || star.opacity < 0.1) star.twinkleDir *= -1;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${star.opacity})`;
        ctx.fill();
      });

      shootingStarTimer++;
      if (!shootingStar && shootingStarTimer > 200 + Math.random() * 250) {
        spawnShootingStar();
        shootingStarTimer = 0;
      }
      if (shootingStar && shootingStar.active) {
        shootingStar.progress += 0.04;
        if (shootingStar.progress >= 1) {
          shootingStar.active = false;
          shootingStar = null;
        } else {
          const sx = shootingStar.x - Math.cos(shootingStar.angle) * shootingStar.len * shootingStar.progress;
          const sy = shootingStar.y + Math.sin(shootingStar.angle) * shootingStar.len * shootingStar.progress;
          const ex = sx + Math.cos(shootingStar.angle) * shootingStar.len * 0.3;
          const ey = sy - Math.sin(shootingStar.angle) * shootingStar.len * 0.3;
          const grad = ctx.createLinearGradient(sx, sy, ex, ey);
          grad.addColorStop(0, 'rgba(255,255,255,0)');
          grad.addColorStop(0.5, 'rgba(0,194,255,0.9)');
          grad.addColorStop(1, 'rgba(255,255,255,0)');
          ctx.beginPath();
          ctx.moveTo(sx, sy);
          ctx.lineTo(ex, ey);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      }

      animId = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-bg-deep" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsla(264,100%,59%,0.3) 1px, transparent 1px), linear-gradient(90deg, hsla(264,100%,59%,0.3) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div
        className="absolute top-[15%] left-[10%] w-[500px] h-[500px] rounded-full opacity-40 blur-[120px]"
        style={{
          background: 'radial-gradient(circle, hsla(264,100%,59%,0.25), transparent 70%)',
          animation: 'orbDrift1 15s ease-in-out infinite alternate',
        }}
      />
      <div
        className="absolute bottom-[20%] right-[15%] w-[400px] h-[400px] rounded-full opacity-30 blur-[100px]"
        style={{
          background: 'radial-gradient(circle, hsla(195,100%,50%,0.2), transparent 70%)',
          animation: 'orbDrift2 18s ease-in-out infinite alternate',
        }}
      />
    </div>
  );
};
