import { useEffect, useRef } from "react";
import { signatureSweep, type SignatureSweepValues } from "@/theatre/deck";
import { useDeckScrollContainer } from "./deck-scroll-context";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

const DEFAULTS: SignatureSweepValues = {
  tealOpacity: 0.7,
  travelY: 50,
  blurPx: 10,
  glowScale: 1.25,
  markOpacity: 0.7,
};

/**
 * Mobile-only signature transition (Phase B). A full-bleed teal field + a
 * centred glow mark, SCRUBBED by the scroll between two slides: as the user
 * travels from slide A to slide B the field grows and pans with the scroll,
 * peaking mid-journey, then clears as B settles. Because it's tied to scroll
 * position (not a timed pop on slide-change), it bridges the two slides as one
 * continuous motion that follows the finger — the "journey" between them.
 *
 * The look (opacity, travel, blur, glow) is authored via a Theatre.js object so
 * it can be tuned live in the studio. Desktop keeps the animejs
 * `DeckTransitionLayer`.
 */
const MobileTransitionLayer = () => {
  const container = useDeckScrollContainer();
  const reduced = usePrefersReducedMotion();
  const washRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
  const params = useRef<SignatureSweepValues>(DEFAULTS);

  // Keep the latest Theatre-authored values without re-rendering React.
  useEffect(() => {
    const unsubscribe = signatureSweep.onValuesChange((v) => {
      params.current = v as SignatureSweepValues;
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (reduced) return;
    const el = container?.current;
    if (!el) return;

    let raf = 0;
    let idleTimer: ReturnType<typeof setTimeout> | null = null;
    let running = false;

    const apply = (washOpacity: number, markOpacity: number, f: number) => {
      const p = params.current;
      const wash = washRef.current;
      const mark = markRef.current;
      // Signed progress through the crossover: -1 (leaving A) .. 0 (mid) .. +1
      // (arriving B). Drives the pan so the field travels with the scroll.
      const pan = (f - 0.5) * 2;
      if (wash) {
        wash.style.opacity = String(washOpacity);
        wash.style.transform = `translateY(${pan * p.travelY * 1.6}px) scale(${1 + (p.glowScale - 1) * (washOpacity / Math.max(p.tealOpacity, 0.001))})`;
        wash.style.filter = `blur(${p.blurPx}px)`;
      }
      if (mark) {
        mark.style.opacity = String(markOpacity);
        mark.style.transform = `translate(-50%, calc(-50% + ${-pan * p.travelY}px)) scale(${0.9 + 0.18 * (markOpacity / Math.max(p.markOpacity, 0.001))})`;
      }
    };

    const clear = () => apply(0, 0, 0.5);

    const tick = () => {
      const top = el.scrollTop;
      const slideH = el.clientHeight || 1;
      const f = (top / slideH) % 1; // 0..1 position within the current slide span
      // 0 when settled on a slide, broad plateau across the crossover.
      const intensity = Math.pow(Math.sin(Math.PI * Math.abs(f)), 0.4);
      const p = params.current;
      apply(p.tealOpacity * intensity, p.markOpacity * intensity, f);
      raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        running = false;
        cancelAnimationFrame(raf);
        clear();
      }, 240);
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      if (idleTimer) clearTimeout(idleTimer);
    };
  }, [container, reduced]);

  if (reduced) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[44] overflow-hidden"
      aria-hidden="true"
    >
      <div ref={washRef} className="deck-sig-wash absolute inset-0" style={{ opacity: 0 }} />
      <div ref={markRef} className="deck-sig-mark absolute left-1/2 top-1/2" style={{ opacity: 0 }} />
    </div>
  );
};

export default MobileTransitionLayer;
