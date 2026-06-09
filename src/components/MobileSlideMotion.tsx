import { useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "motion/react";
import { useDeckScrollContainer } from "./deck-scroll-context";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

interface MobileSlideMotionProps {
  children: ReactNode;
}

/**
 * Mobile-only, scroll-linked slide reveal. With scroll-snap removed on mobile,
 * each slide cross-fades as it moves through the viewport: it rises + sharpens
 * on entry and recedes + softens on exit, so neighbours blend continuously
 * instead of hard-cutting. Driven by Motion `useScroll` against the deck's real
 * scroll container (via context), not the window.
 *
 * Desktop never renders this — it keeps the existing animejs `SlideReveal`.
 */
const MobileSlideMotion = ({ children }: MobileSlideMotionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const container = useDeckScrollContainer();
  const reducedMotion = usePrefersReducedMotion();

  // 0 = slide's top hits viewport bottom (entering), ~0.5 = centred,
  // 1 = slide's bottom passes viewport top (leaving).
  const { scrollYProgress } = useScroll({
    target: ref,
    container,
    offset: ["start end", "end start"],
  });

  // NOTE: no `scale` transform here. This wrapper is an ancestor of each slide's
  // `.slide` element, and a CSS scale would shrink that element's measured
  // getBoundingClientRect height — which `getSlideHeight` in Index relies on for
  // the scroll→index math and programmatic scrollTo. translateY/opacity/blur do
  // not affect measured height, so the cross-fade is built from those only.
  // Kept gentle: the proximity snap now settles each slide centred, and the
  // seam fades blend the joints, so the cross-fade only needs a light lift —
  // never fully blanks a slide (opacity floors at 0.4).
  const opacity = useTransform(scrollYProgress, [0, 0.22, 0.78, 1], [0.4, 1, 1, 0.4]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [26, 0, -26]);
  const blurPx = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [5, 0, 0, 5]);
  const filter = useMotionTemplate`blur(${blurPx}px)`;

  if (reducedMotion) {
    return <div className="relative">{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className="relative"
      style={{ opacity, y, filter, willChange: "transform, opacity, filter" }}
    >
      {children}
    </motion.div>
  );
};

export default MobileSlideMotion;
