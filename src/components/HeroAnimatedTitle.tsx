import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HeroAnimatedTitleProps {
  fixedText: string;
  words: string[];
}

export const HeroAnimatedTitle = ({
  fixedText = "Votre présence en ligne,",
  words = ["repensée.", "transformée.", "propulsée.", "optimisée.", "modernisée."],
}: HeroAnimatedTitleProps) => {
  const memoWords = useMemo(() => words, []);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((i) => (i + 1) % memoWords.length);
    }, 2500);
    return () => clearTimeout(timer);
  }, [index, memoWords]);

  return (
    <h1 className="font-heading font-extrabold text-[44px] md:text-[76px] leading-[1.05] tracking-tight text-foreground">
      {fixedText}
      <br />
      <span className="relative inline-block h-[1.15em] overflow-hidden align-bottom">
        <AnimatePresence mode="wait">
          <motion.span
            key={memoWords[index]}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block text-gradient"
          >
            {memoWords[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </h1>
  );
};
