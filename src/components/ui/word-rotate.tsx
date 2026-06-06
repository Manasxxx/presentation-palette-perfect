import { type HTMLAttributes, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { animate, eases } from "animejs";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

type WordRotateProps = {
  words: string[];
  duration?: number;
  className?: string;
  motionProps?: HTMLAttributes<HTMLSpanElement>;
};

export function WordRotate({ words, duration = 2500, className, motionProps }: WordRotateProps) {
  const reduceMotion = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const safeWords = useMemo(() => words.filter(Boolean), [words]);
  const shellRef = useRef<HTMLSpanElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const timeoutRef = useRef<number>();

  useEffect(() => {
    if (safeWords.length <= 1) return;

    const timer = window.setInterval(() => {
      if (reduceMotion) {
        setIndex((current) => (current + 1) % safeWords.length);
        return;
      }

      const activeWord = wordRef.current;
      if (!activeWord) return;

      animate(activeWord, {
        opacity: [1, 0],
        translateY: [0, -18],
        filter: ["blur(0px)", "blur(8px)"],
        duration: 260,
        ease: eases.in(2),
      });

      timeoutRef.current = window.setTimeout(() => {
        setIndex((current) => (current + 1) % safeWords.length);
      }, 230);
    }, duration);

    return () => {
      window.clearInterval(timer);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, [duration, reduceMotion, safeWords.length]);

  useLayoutEffect(() => {
    const shell = shellRef.current;
    const word = wordRef.current;
    const measure = measureRef.current;
    if (!shell || !word || !measure) return;

    // +6px buffer so bold/uppercase glyph side-bearing on the last letter
    // isn't clipped by the shell's overflow-hidden.
    const nextWidth = measure.offsetWidth + 6;

    if (reduceMotion) {
      shell.style.width = `${nextWidth}px`;
      word.style.opacity = "1";
      word.style.transform = "translateY(0)";
      word.style.filter = "blur(0px)";
      return;
    }

    animate(shell, {
      width: nextWidth,
      duration: 430,
      ease: eases.out(4),
    });

    word.style.opacity = "0";
    word.style.transform = "translateY(18px)";
    word.style.filter = "blur(8px)";

    animate(word, {
      opacity: [0, 1],
      translateY: [18, 0],
      filter: ["blur(8px)", "blur(0px)"],
      duration: 420,
      delay: 80,
      ease: eases.out(4),
    });
  }, [index, reduceMotion]);

  if (!safeWords.length) return null;

  return (
    <span ref={shellRef} className={cn("relative inline-block overflow-hidden align-baseline", className)} aria-live="polite">
      <span ref={measureRef} className="invisible absolute left-0 top-0 whitespace-nowrap" aria-hidden="true">
        {safeWords[index]}
      </span>
      <span ref={wordRef} className="block whitespace-nowrap text-center" {...motionProps}>
        {safeWords[index]}
      </span>
    </span>
  );
}
