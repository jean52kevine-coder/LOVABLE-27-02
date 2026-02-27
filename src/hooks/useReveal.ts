import { useRef, useState, useEffect, CSSProperties } from 'react';

export const useReveal = (delay = 0, direction: 'up' | 'left' | 'scale' = 'up') => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const transforms = {
    up: visible ? 'translateY(0)' : 'translateY(36px)',
    left: visible ? 'translateX(0)' : 'translateX(-36px)',
    scale: visible ? 'scale(1)' : 'scale(0.94)',
  };

  const style: CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: transforms[direction],
    transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
  };

  return { ref, style, visible };
};
