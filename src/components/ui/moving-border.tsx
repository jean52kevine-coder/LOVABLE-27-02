"use client";
import React, { useRef } from "react";
import { motion, useAnimationFrame, useMotionTemplate, useMotionValue, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export function MovingBorderButton({
  children, duration = 3000, className, containerClassName, borderClassName, ...props
}: {
  children: React.ReactNode; duration?: number; className?: string
  containerClassName?: string; borderClassName?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const pathRef = useRef<SVGRectElement>(null);
  const progress = useMotionValue<number>(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMs = length / duration;
      progress.set((time * pxPerMs) % length);
    }
  });

  const x = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val).x ?? 0);
  const y = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val).y ?? 0);
  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <button className={cn("relative h-14 overflow-hidden rounded-xl p-[1px]", containerClassName)} {...props}>
      <div className="absolute inset-0">
        <svg className="absolute h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <rect fill="none" width="100" height="100" rx="12" ry="12" ref={pathRef} />
        </svg>
        <motion.div
          style={{ position: "absolute", top: 0, left: 0, display: "inline-block", transform }}
          className={cn("h-4 w-4 rounded-full bg-[radial-gradient(circle,#7B2FFF_40%,#00C2FF_80%,transparent_100%)]", borderClassName)}
        />
      </div>
      <div className={cn("relative flex h-full items-center justify-center rounded-xl bg-[#0a0a1c] antialiased text-white px-6", className)}>
        {children}
      </div>
    </button>
  );
}
