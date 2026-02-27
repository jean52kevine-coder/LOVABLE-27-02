import { useEffect, useRef, useCallback } from 'react';

interface ThermodynamicGridProps {
  resolution?: number;
  coolingFactor?: number;
  className?: string;
}

export const ThermodynamicGrid = ({ resolution = 18, coolingFactor = 0.97, className = '' }: ThermodynamicGridProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>();
  const gridRef = useRef<number[][]>([]);
  const mouseRef = useRef({ x: -1, y: -1 });

  const initGrid = useCallback((cols: number, rows: number) => {
    gridRef.current = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => 0)
    );
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const cols = Math.ceil(canvas.width / resolution);
      const rows = Math.ceil(canvas.height / resolution);
      initGrid(cols, rows);
    };
    resize();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: Math.floor((e.clientX - rect.left) / resolution),
        y: Math.floor((e.clientY - rect.top) / resolution),
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1, y: -1 };
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const animate = () => {
      const grid = gridRef.current;
      if (!grid.length) { rafRef.current = requestAnimationFrame(animate); return; }
      
      const rows = grid.length;
      const cols = grid[0].length;
      const { x: mx, y: my } = mouseRef.current;

      // Heat source at mouse
      if (mx >= 0 && my >= 0 && my < rows && mx < cols) {
        for (let dy = -2; dy <= 2; dy++) {
          for (let dx = -2; dx <= 2; dx++) {
            const ny = my + dy, nx = mx + dx;
            if (ny >= 0 && ny < rows && nx >= 0 && nx < cols) {
              const dist = Math.sqrt(dx * dx + dy * dy);
              grid[ny][nx] = Math.min(1, grid[ny][nx] + Math.max(0, 1 - dist * 0.4));
            }
          }
        }
      }

      // Cool down and diffuse
      const newGrid = grid.map(row => [...row]);
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          let sum = grid[y][x] * 4;
          let count = 4;
          if (y > 0) { sum += grid[y-1][x]; count++; }
          if (y < rows-1) { sum += grid[y+1][x]; count++; }
          if (x > 0) { sum += grid[y][x-1]; count++; }
          if (x < cols-1) { sum += grid[y][x+1]; count++; }
          newGrid[y][x] = (sum / count) * coolingFactor;
        }
      }
      gridRef.current = newGrid;

      // Render
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const heat = newGrid[y][x];
          if (heat < 0.01) continue;
          
          // Violet to cyan gradient based on heat
          const r = Math.floor(123 * heat);
          const g = Math.floor(47 + (194 - 47) * heat * heat);
          const b = Math.floor(255 * Math.min(1, heat + 0.3));
          
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${heat * 0.6})`;
          ctx.fillRect(x * resolution, y * resolution, resolution - 1, resolution - 1);
          
          // Glow on hot cells
          if (heat > 0.5) {
            ctx.shadowColor = `rgba(123, 47, 255, ${heat * 0.4})`;
            ctx.shadowBlur = heat * 20;
            ctx.fillRect(x * resolution, y * resolution, resolution - 1, resolution - 1);
            ctx.shadowBlur = 0;
          }
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    window.addEventListener('resize', resize);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [resolution, coolingFactor, initGrid]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ opacity: 0.7 }}
    />
  );
};
