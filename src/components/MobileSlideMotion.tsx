import { useEffect, useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "motion/react";
import { animate, stagger, cubicBezier } from "animejs";
import { useDeckScrollContainer } from "./deck-scroll-context";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

interface MobileSlideMotionProps {
  children: ReactNode;
  /**
   * Slides that own their own animejs entrance (Services, Clients, case
   * studies) skip the staggered child reveal so content is never animated
   * twice. They still get the scroll-linked cross-fade.
   */
  nativeMotion?: boolean;
}

const staggerEase = cubicBezier(0.22, 1, 0.36, 1);

/**
 * Walks down through single-child wrapper layers and returns the first node
 * with several element children — the slide's real content row/stack. Those
 * children are what stagger in one by one.
 */
const findStaggerTargets = (root: HTMLElement): HTMLElement[] => {
  let node: HTMLElement = root;
  for (let depth = 0; depth < 6; depth++) {
    const kids = Array.from(node.children).filter(
      (c): c is HTMLElement => c instanceof HTMLElement
    );
    if (kids.length === 0) return [];
    if (kids.length > 1) return kids.slice(0, 12);
    node = kids[0];
  }
  return [];
};

/**
 * Mobile-only, scroll-linked slide reveal. With scroll-snap removed on mobile,
 * each slide cross-fades as it moves through the viewport: it rises + sharpens
 * on entry and recedes + softens on exit, so neighbours blend continuously
 * instead of hard-cutting. Driven by Motion `useScroll` against the deck's real
 * scroll container (via context), not the window.
 *
 * On top of the cross-fade, non-native-motion slides get a staggered child
 * reveal when they settle into view: top-level elements rise in one by one
 * (animejs), and the sequence replays each time the slide is revisited. This
 * is what makes the snap feel "presented" rather than one flat fade.
 *
 * Desktop never renders this — it keeps the existing animejs `SlideReveal`.
 */
const MobileSlideMotion = ({ children, nativeMotion = false }: MobileSlideMotionProps) => {
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
  const opacity = useTransform(scrollYProgress, [0, 0.22, 0.78, 1], [0.45, 1, 1, 0.45]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [18, 0, -18]);
  const blurPx = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [3.5, 0, 0, 3.5]);
  const filter = useMotionTemplate`blur(${blurPx}px)`;

  useEffect(() => {
    if (nativeMotion || reducedMotion) return;
    const root = ref.current;
    if (!root) return;

    const targets = findStaggerTargets(root);
    if (targets.length < 2) return;

    let armed = true; // hidden + waiting to play

    const hide = () => {
      for (const t of targets) {
        t.style.opacity = "0";
        t.style.transform = "translateY(14px)";
      }
    };

    const play = () => {
      animate(targets, {
        opacity: [0, 1],
        translateY: [14, 0],
        duration: 640,
        delay: stagger(95),
        ease: staggerEase,
      });
    };

    hide();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.5 && armed) {
          armed = false;
          play();
        } else if (entry.intersectionRatio === 0 && !armed) {
          // Fully offscreen: re-arm so the sequence replays on the next visit.
          armed = true;
          hide();
        }
      },
      { threshold: [0, 0.5] }
    );
    observer.observe(root);
    // Safety net: if the observer never fires ≥0.5 (e.g. slide taller than the
    // viewport), reveal anyway so content can't stay hidden.
    const fallback = window.setTimeout(() => {
      if (armed) {
        armed = false;
        play();
      }
    }, 1600);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
      for (const t of targets) {
        t.style.opacity = "";
        t.style.transform = "";
      }
    };
  }, [nativeMotion, reducedMotion]);

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
