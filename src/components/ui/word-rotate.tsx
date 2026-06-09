import { type HTMLAttributes, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { animate, eases } from "animejs";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

type WordRotateProps = {
  words: string[];
  duration?: number;
  className?: string;
  /**
   * When true the shell is sized once to the widest word (via a CSS grid stack)
   * and never animates its width. The word just cross-fades in place. Use this
   * inside wrapping flex layouts where a per-word width tween would rewrap the
   * line and make everything jump. Default (false) keeps the dynamic-width
   * behaviour the cover pills rely on.
   */
  lockWidth?: boolean;
  motionProps?: HTMLAttributes<HTMLSpanElement>;
};

export function WordRotate({ words, duration = 2500, className, lockWidth = false, motionProps }: WordRotateProps) {
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
        translateY: [0, -12],
        filter: ["blur(0px)", "blur(6px)"],
        duration: 300,
        ease: eases.inOut(2),
      });

      timeoutRef.current = window.setTimeout(() => {
        setIndex((current) => (current + 1) % safeWords.length);
      }, 270);
    }, duration);

    return () => {
      window.clearInterval(timer);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, [duration, reduceMotion, safeWords.length]);

  useLayoutEffect(() => {
    const word = wordRef.current;
    if (!word) return;

    // Dynamic-width mode: tween the shell width to the next word so neighbours
    // shift smoothly. (lockWidth mode skips this — the grid stack holds a
    // stable width, so there is no reflow to animate.)
    if (!lockWidth) {
      const shell = shellRef.current;
      const measure = measureRef.current;
      if (shell && measure) {
        const nextWidth = measure.offsetWidth + 6;
        if (reduceMotion) {
          shell.style.width = `${nextWidth}px`;
        } else {
          animate(shell, { width: nextWidth, duration: 430, ease: eases.out(4) });
        }
      }
    }

    if (reduceMotion) {
      word.style.opacity = "1";
      word.style.transform = "translateY(0)";
      word.style.filter = "blur(0px)";
      return;
    }

    word.style.opacity = "0";
    word.style.transform = "translateY(12px)";
    word.style.filter = "blur(6px)";

    animate(word, {
      opacity: [0, 1],
      translateY: [12, 0],
      filter: ["blur(6px)", "blur(0px)"],
      duration: 440,
      delay: 90,
      ease: eases.out(3),
    });
  }, [index, reduceMotion, lockWidth]);

  if (!safeWords.length) return null;

  // Stable-width mode: every word is stacked in the same grid cell so the shell
  // measures to the widest word and never changes size; the visible word
  // cross-fades over the top. No width tween => no line rewrap => no jitter.
  if (lockWidth) {
    return (
      <span
        className={cn("relative inline-grid justify-items-center align-baseline", className)}
        aria-live="polite"
      >
        {safeWords.map((w, i) => (
          <span
            key={i}
            aria-hidden="true"
            className="invisible col-start-1 row-start-1 block whitespace-nowrap text-center"
          >
            {w}
          </span>
        ))}
        <span
          ref={wordRef}
          className="col-start-1 row-start-1 block whitespace-nowrap text-center"
          {...motionProps}
        >
          {safeWords[index]}
        </span>
      </span>
    );
  }

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
