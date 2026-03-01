"use client";
import React from "react";
import { motion, useAnimationFrame, useMotionTemplate, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export function MovingBorderButton({
  borderRadius = "0.75rem",
  children,
  as: Component = "button",
  containerClassName,
  duration = 3000,
  className,
  ...otherProps
}: {
  borderRadius?: string;
  children: React.ReactNode;
  as?: any;
  containerClassName?: string;
  duration?: number;
  className?: string;
  [key: string]: any;
}) {
  return (
    <Component
      className={cn("bg-transparent relative h-14 p-[1px] overflow-hidden", containerClassName)}
      style={{ borderRadius }}
      {...otherProps}
    >
      <div className="absolute inset-0" style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}>
        <MovingBorder duration={duration} rx="30%" ry="30%">
          <div className="h-20 w-20 opacity-80" style={{ background: "radial-gradient(#7B2FFF 40%, transparent 60%)" }} />
        </MovingBorder>
      </div>
      <div
        className={cn("relative border border-violet-500/20 backdrop-blur-xl text-white flex items-center justify-center w-full h-full text-sm font-semibold", className)}
        style={{ borderRadius: `calc(${borderRadius} * 0.96)`, background: "rgba(10,10,30,0.85)" }}
      >
        {children}
      </div>
    </Component>
  );
}

export const MovingBorder = ({ children, duration = 2000, rx, ry, ...otherProps }: { children: React.ReactNode; duration?: number; rx?: string; ry?: string; [key: string]: any }) => {
  const pathRef = useRef<any>();
  const progress = useMotionValue<number>(0);
  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) progress.set((time * (length / duration)) % length);
  });
  const x = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val).x);
  const y = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val).y);
  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;
  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="absolute h-full w-full" width="100%" height="100%" {...otherProps}>
        <rect fill="none" width="100%" height="100%" rx={rx} ry={ry} ref={pathRef} />
      </svg>
      <motion.div style={{ position: "absolute", top: 0, left: 0, display: "inline-block", transform }}>{children}</motion.div>
    </>
  );
};
