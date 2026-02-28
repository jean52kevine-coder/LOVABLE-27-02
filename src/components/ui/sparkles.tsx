"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type ParticlesProps = {
  className?: string;
  particleColor?: string;
  particleDensity?: number;
  minSize?: number;
  maxSize?: number;
};

export const SparklesCore = ({
  className,
  particleColor = "#ffffff",
  particleDensity = 60,
  minSize = 1,
  maxSize = 3,
}: ParticlesProps) => {
  const dots = Array.from({ length: particleDensity });

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      {dots.map((_, i) => {
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const size = minSize + Math.random() * (maxSize - minSize);
        return (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{ left: `${left}%`, top: `${top}%`, width: size, height: size, background: particleColor }}
            animate={{ opacity: [0.15, 1, 0.2], scale: [0.9, 1.3, 1] }}
            transition={{ duration: 1.8 + Math.random() * 2.2, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 2 }}
          />
        );
      })}
    </div>
  );
};
