import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

type FlipWordsProps = {
  words: string[];
  duration?: number;
  className?: string;
};

export const FlipWords = ({ words, duration = 3000, className }: FlipWordsProps) => {
  const [currentWord, setCurrentWord] = useState(words[0]);

  useEffect(() => {
    if (words.length <= 1) return;
    const id = window.setTimeout(() => {
      const index = words.indexOf(currentWord);
      setCurrentWord(words[(index + 1) % words.length]);
    }, duration);

    return () => window.clearTimeout(id);
  }, [currentWord, duration, words]);

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={currentWord}
        initial="initial"
        animate="animate"
        exit="exit"
        className={cn("inline-flex whitespace-nowrap [perspective:1000px]", className)}
        aria-label={currentWord}
      >
        {currentWord.split("").map((letter, index) => (
          <motion.span
            key={`${currentWord}-${index}`}
            aria-hidden="true"
            className="inline-block min-w-[0.08em] font-sans font-black [font-weight:900]"
            variants={{
              initial: { opacity: 0, y: 18, rotateX: -90, filter: "blur(8px)" },
              animate: { opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" },
              exit: { opacity: 0, y: -26, rotateX: 90, filter: "blur(8px)" },
            }}
            transition={{
              duration: 0.48,
              delay: index * 0.025,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {letter === " " ? " " : letter}
          </motion.span>
        ))}
      </motion.span>
    </AnimatePresence>
  );
};
