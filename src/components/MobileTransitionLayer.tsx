import { useEffect, useRef } from "react";
import { signatureSweep, type SignatureSweepValues } from "@/theatre/deck";
import { useDeckScrollContainer } from "./deck-scroll-context";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

const DEFAULTS: SignatureSweepValues = {
  tealOpacity: 0.8,
  blurPx: 18,
  glowScale: 1,
};

/** Crest wrapper height in px — transform math recenters the line on the seam. */
const CREST_H = 180;

/**
 * Mobile-only signature transition (Phase B) — the "liquid crest".
 *
 * Instead of a full-bleed teal wash, a thin teal crest line with a soft bloom
 * rides the PHYSICAL boundary between two slides: it is position-locked to the
 * seam, so as the user drags from slide A to slide B the crest enters at the
 * viewport bottom, travels up with the finger, and exits at the top exactly
 * where the slides meet. This is the mobile analog of the desktop animejs
 * liquid-wash — same watery brand signature, scaled down so it reads as a
 * surface highlight on the seam rather than a screen-wide effect.
 *
 * Opacity uses an eased follower (fast attack, slow release) so the proximity
 * snap can't reduce the crest to a blip and the idle stop fades out instead of
 * snapping. Position is NOT eased — the crest must stay glued to the seam.
 *
 * The look (opacity, bloom blur, scale) is authored via a Theatre.js object so
 * it can be tuned live in the studio. Desktop keeps `DeckTransitionLayer`.
 */
const MobileTransitionLayer = () => {
  const container = useDeckScrollContainer();
  const reduced = usePrefersReducedMotion();
  const crestRef = useRef<HTMLDivElement>(null);
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
    let running = false;
    let lastScrollAt = 0;
    let lastFrameAt = 0;
    let shownIntensity = 0;

    const apply = (intensity: number, seamY: number) => {
      const p = params.current;
      const crest = crestRef.current;
      if (!crest) return;
      crest.style.opacity = String(p.tealOpacity * intensity);
      crest.style.transform = `translateY(${seamY - CREST_H / 2}px) scaleY(${p.glowScale * (0.7 + 0.3 * intensity)})`;
      const bloom = crest.firstElementChild as HTMLElement | null;
      if (bloom) bloom.style.filter = `blur(${p.blurPx}px)`;
    };

    const tick = (now: number) => {
      const dt = lastFrameAt ? Math.min((now - lastFrameAt) / 1000, 0.1) : 1 / 60;
      lastFrameAt = now;

      const top = el.scrollTop;
      const slideH = el.clientHeight || 1;
      const f = (top / slideH) % 1; // 0..1 position within the current slide span
      // Viewport y of the seam between the slide being left and the next one:
      // f→0 puts it at the bottom edge, f→1 at the top edge.
      const seamY = slideH * (1 - f);
      const idle = now - lastScrollAt > 160;
      // 0 when settled on a slide, broad plateau across the crossover.
      // While idle the target is 0 so the crest releases instead of holding.
      const targetIntensity = idle ? 0 : Math.pow(Math.sin(Math.PI * Math.abs(f)), 0.4);

      // Frame-rate-independent eased follower on opacity only: fast attack so
      // the crest answers the finger, slow release (~450ms tail) so it glows
      // through the snap settle instead of flashing off.
      const rate = targetIntensity > shownIntensity ? 14 : 5;
      shownIntensity += (targetIntensity - shownIntensity) * (1 - Math.exp(-rate * dt));

      apply(shownIntensity, seamY);

      if (idle && shownIntensity < 0.004) {
        shownIntensity = 0;
        apply(0, seamY);
        running = false;
        lastFrameAt = 0;
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      lastScrollAt = performance.now();
      if (!running) {
        running = true;
        lastFrameAt = 0;
        raf = requestAnimationFrame(tick);
      }
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [container, reduced]);

  if (reduced) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[44] overflow-hidden"
      aria-hidden="true"
    >
      <div
        ref={crestRef}
        className="absolute inset-x-0 top-0"
        style={{ height: CREST_H, opacity: 0, willChange: "transform, opacity" }}
      >
        <div className="deck-sig-crest-bloom absolute inset-0" />
        <div className="deck-sig-crest-line absolute" />
      </div>
    </div>
  );
};

export default MobileTransitionLayer;
