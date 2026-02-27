import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: LucideIcon;
  status: 'completed' | 'in-progress' | 'pending';
}

interface RadialOrbitalTimelineProps {
  items: TimelineItem[];
}

export const RadialOrbitalTimeline = ({ items }: RadialOrbitalTimelineProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % items.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [autoPlay, items.length]);

  const activeItem = items[activeIndex];
  const Icon = activeItem.icon;

  // Calculate positions on a circle
  const getPosition = (index: number, total: number, radius: number) => {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    };
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
      {/* Orbital circle */}
      <div className="relative w-[280px] h-[280px] md:w-[340px] md:h-[340px] flex-shrink-0">
        {/* Orbit ring */}
        <div className="absolute inset-4 rounded-full border border-[rgba(123,47,255,0.15)]" />
        <div className="absolute inset-8 rounded-full border border-[rgba(123,47,255,0.08)]" />
        
        {/* Center active icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            key={activeIndex}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', bounce: 0.3 }}
            className="w-20 h-20 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-[0_0_40px_rgba(123,47,255,0.4)]"
          >
            <Icon size={36} className="text-foreground" />
          </motion.div>
        </div>

        {/* Orbital dots */}
        {items.map((item, i) => {
          const pos = getPosition(i, items.length, 130);
          const isActive = i === activeIndex;
          const ItemIcon = item.icon;
          return (
            <motion.button
              key={item.id}
              onClick={() => { setActiveIndex(i); setAutoPlay(false); }}
              className="absolute"
              style={{
                left: `calc(50% + ${pos.x}px - 22px)`,
                top: `calc(50% + ${pos.y}px - 22px)`,
              }}
              whileHover={{ scale: 1.2 }}
              animate={{
                scale: isActive ? 1.15 : 1,
              }}
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-primary shadow-[0_0_20px_rgba(123,47,255,0.5)]'
                  : item.status === 'completed'
                    ? 'bg-[rgba(123,47,255,0.15)] border border-[rgba(123,47,255,0.3)]'
                    : 'bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)]'
              }`}>
                <ItemIcon size={18} className={isActive ? 'text-foreground' : 'text-muted-foreground'} />
              </div>
              {/* Connecting line to center */}
              {isActive && (
                <motion.div
                  layoutId="connector"
                  className="absolute top-1/2 left-1/2 h-[1px] bg-gradient-to-r from-violet to-transparent origin-left"
                  style={{
                    width: Math.sqrt(pos.x * pos.x + pos.y * pos.y) - 50,
                    transform: `rotate(${Math.atan2(-pos.y, -pos.x)}rad)`,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.4 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Content panel */}
      <div className="flex-1 min-w-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <span className="inline-block px-3 py-1 rounded-full bg-gradient-dark text-xs font-body font-semibold text-violet mb-3">
              {activeItem.date}
            </span>
            <h3 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-3">
              {activeItem.title}
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {activeItem.content}
            </p>
            <span className={`inline-flex items-center gap-2 text-xs font-body font-semibold uppercase tracking-wider ${
              activeItem.status === 'completed' ? 'text-success' :
              activeItem.status === 'in-progress' ? 'text-violet' : 'text-muted-foreground'
            }`}>
              <span className={`w-2 h-2 rounded-full ${
                activeItem.status === 'completed' ? 'bg-success' :
                activeItem.status === 'in-progress' ? 'bg-violet' : 'bg-muted-foreground'
              }`} />
              {activeItem.category}
            </span>
          </motion.div>
        </AnimatePresence>

        {/* Step indicators */}
        <div className="flex gap-2 mt-8">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => { setActiveIndex(i); setAutoPlay(false); }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex ? 'w-8 bg-violet' : 'w-4 bg-[rgba(255,255,255,0.1)]'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
