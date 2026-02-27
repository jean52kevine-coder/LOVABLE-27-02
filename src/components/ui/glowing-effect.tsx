import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface GlowingEffectProps {
  spread?: number;
  glow?: boolean;
  disabled?: boolean;
  proximity?: number;
  inactiveZone?: number;
  className?: string;
}

export const GlowingEffect = ({
  spread = 40,
  glow = true,
  disabled = false,
  proximity = 64,
  inactiveZone = 0.01,
  className,
}: GlowingEffectProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (disabled) return;
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Check if mouse is within proximity
      const isNear =
        x >= -proximity && x <= rect.width + proximity &&
        y >= -proximity && y <= rect.height + proximity;

      if (isNear) {
        const centerX = x / rect.width;
        const centerY = y / rect.height;
        
        // Check inactive zone
        if (
          centerX > inactiveZone && centerX < 1 - inactiveZone &&
          centerY > inactiveZone && centerY < 1 - inactiveZone
        ) {
          container.style.opacity = '1';
          container.style.background = `radial-gradient(${spread * 2}px circle at ${x}px ${y}px, rgba(123, 47, 255, 0.15), rgba(0, 194, 255, 0.08), transparent 70%)`;
          
          if (glow) {
            container.style.boxShadow = `0 0 ${spread}px rgba(123, 47, 255, 0.15), inset 0 0 ${spread}px rgba(123, 47, 255, 0.05)`;
          }
        }
      } else {
        container.style.opacity = '0';
        container.style.boxShadow = 'none';
      }
    };

    const handleMouseLeave = () => {
      container.style.opacity = '0';
      container.style.boxShadow = 'none';
    };

    // Listen on document for proximity detection
    document.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [disabled, spread, glow, proximity, inactiveZone]);

  return (
    <div
      ref={containerRef}
      className={cn(
        'pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300',
        className
      )}
    />
  );
};
