import { useEffect } from 'react';

export default function CustomCursor() {
  useEffect(() => {
    if (window.matchMedia('(max-width: 767px)').matches) return;
    const dot = document.createElement('div');
    const ring = document.createElement('div');
    dot.style.cssText = 'position:fixed;width:8px;height:8px;border-radius:999px;background:#F8F8FF;pointer-events:none;z-index:200;left:0;top:0;transform:translate(-50%,-50%)';
    ring.style.cssText = 'position:fixed;width:28px;height:28px;border-radius:999px;border:1px solid rgba(248,248,255,.45);pointer-events:none;z-index:199;left:0;top:0;transform:translate(-50%,-50%);transition:transform .2s ease,border-color .2s ease';
    document.body.append(dot, ring);
    let x = 0, y = 0, rx = 0, ry = 0;
    const mm = (e: MouseEvent) => { x = e.clientX; y = e.clientY; dot.style.left = `${x}px`; dot.style.top = `${y}px`; };
    const loop = () => { rx += (x - rx) * 0.15; ry += (y - ry) * 0.15; ring.style.left = `${rx}px`; ring.style.top = `${ry}px`; requestAnimationFrame(loop); };
    const enter = (e: Event) => {
      const t = e.target as HTMLElement;
      if (t.closest('a,button')) {
        ring.style.transform = 'translate(-50%,-50%) scale(2.5)';
        ring.style.borderColor = '#6D28D9';
      }
    };
    const leave = () => { ring.style.transform = 'translate(-50%,-50%) scale(1)'; ring.style.borderColor = 'rgba(248,248,255,.45)'; };
    window.addEventListener('mousemove', mm);
    document.addEventListener('mouseover', enter);
    document.addEventListener('mouseout', leave);
    requestAnimationFrame(loop);
    return () => { window.removeEventListener('mousemove', mm); document.removeEventListener('mouseover', enter); document.removeEventListener('mouseout', leave); dot.remove(); ring.remove(); };
  }, []);
  return null;
}
