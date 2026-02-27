import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQAccordion = ({ items }: { items: FAQItem[] }) => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-4">
      {items.map((item, i) => (
        <div
          key={i}
          className="bg-gradient-card border border-glow rounded-2xl overflow-hidden cursor-pointer"
          onClick={() => setOpen(open === i ? null : i)}
        >
          <div className="flex items-center justify-between p-6">
            <h4 className="font-heading font-semibold text-lg text-foreground">{item.question}</h4>
            <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
              <ChevronDown size={20} className="text-violet" />
            </motion.div>
          </div>
          <AnimatePresence>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="px-6 pb-6 text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};
