"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { SparklesCore } from "@/components/ui/sparkles";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { GripVertical } from "lucide-react";

interface CompareProps {
  firstImage?: string;
  secondImage?: string;
  className?: string;
  firstImageClassName?: string;
  secondImageClassname?: string;
  initialSliderPercentage?: number;
  slideMode?: "hover" | "drag";
  showHandlebar?: boolean;
  autoplay?: boolean;
  autoplayDuration?: number;
}

export const Compare = ({
  firstImage = "",
  secondImage = "",
  className,
  firstImageClassName,
  secondImageClassname,
  initialSliderPercentage = 50,
  slideMode = "hover",
  showHandlebar = true,
  autoplay = false,
  autoplayDuration = 5000,
}: CompareProps) => {
  const [sliderXPercent, setSliderXPercent] = useState(initialSliderPercentage);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoplay = useCallback(() => {
    if (!autoplay) return;
    const startTime = Date.now();
    const animate = () => {
      const elapsedTime = Date.now() - startTime;
      const progress = (elapsedTime % (autoplayDuration * 2)) / autoplayDuration;
      setSliderXPercent(progress <= 1 ? progress * 100 : (2 - progress) * 100);
      autoplayRef.current = setTimeout(animate, 16);
    };
    animate();
  }, [autoplay, autoplayDuration]);

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearTimeout(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [startAutoplay, stopAutoplay]);

  const handleMove = useCallback((clientX: number) => {
    if (!sliderRef.current) return;
    if (slideMode === "hover" || (slideMode === "drag" && isDragging)) {
      const rect = sliderRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      setSliderXPercent(Math.max(0, Math.min(100, (x / rect.width) * 100)));
    }
  }, [isDragging, slideMode]);

  return (
    <div
      ref={sliderRef}
      className={cn("relative h-[320px] w-full overflow-hidden rounded-2xl", className)}
      style={{ cursor: slideMode === "drag" ? "grab" : "col-resize" }}
      onMouseMove={(e) => handleMove(e.clientX)}
      onMouseEnter={() => stopAutoplay()}
      onMouseLeave={() => {
        if (slideMode === "hover") setSliderXPercent(initialSliderPercentage);
        setIsDragging(false);
        startAutoplay();
      }}
      onMouseDown={(e) => slideMode === "drag" && (setIsDragging(true), handleMove(e.clientX))}
      onMouseUp={() => setIsDragging(false)}
      onTouchStart={(e) => slideMode === "drag" && setIsDragging(true)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      onTouchEnd={() => setIsDragging(false)}
    >
      <motion.div
        className="absolute top-0 z-30 h-full w-px bg-gradient-to-b from-transparent via-indigo-500 to-transparent"
        style={{ left: `${sliderXPercent}%` }}
      >
        <div className="absolute left-0 top-1/2 h-1/2 w-12 -translate-y-1/2 bg-gradient-to-r from-cyan-400/80 to-transparent [mask-image:radial-gradient(50px_at_left,white,transparent)]" />
        <div className="absolute -right-10 top-1/2 h-5 w-5 -translate-y-1/2 rounded-md bg-white text-black shadow">
          {showHandlebar && <GripVertical className="h-5 w-5" />}
        </div>
        <div className="absolute left-0 top-1/2 h-3/4 w-12 -translate-y-1/2">
          <SparklesCore className="h-full w-full" particleDensity={35} />
        </div>
      </motion.div>

      {firstImage && (
        <motion.div className={cn("absolute inset-0 z-20 overflow-hidden", firstImageClassName)} style={{ clipPath: `inset(0 ${100 - sliderXPercent}% 0 0)` }}>
          <img alt="first image" src={firstImage} className={cn("h-full w-full object-cover", firstImageClassName)} draggable={false} />
        </motion.div>
      )}

      {secondImage && (
        <AnimatePresence initial={false}>
          <motion.img className={cn("absolute inset-0 z-10 h-full w-full object-cover", secondImageClassname)} alt="second image" src={secondImage} draggable={false} />
        </AnimatePresence>
      )}
    </div>
  );
};
