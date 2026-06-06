import { useEffect, useRef } from "react";
import { animate, createTimeline, cubicBezier, spring, stagger } from "animejs";

import { getDeckTransitionMotionProfile, getDeckTransitionState } from "@/pages/deck-transition";

interface DeckTransitionLayerProps {
  currentSlide: number;
  reducedMotion: boolean;
  isMobile: boolean;
}

const DeckTransitionLayer = ({ currentSlide, reducedMotion, isMobile }: DeckTransitionLayerProps) => {
  const previousSlideRef = useRef(currentSlide);
  const layerRef = useRef<HTMLDivElement>(null);
  const washRef = useRef<HTMLDivElement>(null);
  const crestRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previousSlide = previousSlideRef.current;
    const transition = getDeckTransitionState(currentSlide, previousSlide);
    previousSlideRef.current = currentSlide;

    if (transition.direction === "idle") return;

    const activeSlide = document.querySelector<HTMLElement>(
      `[data-slide-index="${currentSlide}"] [data-slide-content]`,
    );

    if (reducedMotion) {
      if (activeSlide) {
        animate(activeSlide, {
          opacity: [0.82, 1],
          duration: 180,
          ease: "outQuad",
        });
      }
      return;
    }

    const layer = layerRef.current;
    const wash = washRef.current;
    const crest = crestRef.current;
    if (!layer || !wash || !crest || !activeSlide) return;

    const profile = getDeckTransitionMotionProfile(isMobile);
    const fromY = (transition.direction === "forward" ? 42 : -42) * profile.slideTravelMultiplier;
    const sweepStart = transition.direction === "forward" ? 42 : -42;
    const sweepEnd = transition.direction === "forward" ? -18 : 18;
    const settleY = (transition.direction === "forward" ? 16 : -16) * profile.slideTravelMultiplier;
    const opacityPeak = 0.28 * transition.intensity * profile.washOpacityMultiplier;
    const liquidEase = cubicBezier(0.22, 0.72, 0.12, 1);
    const driftEase = cubicBezier(0.33, 0.02, 0.18, 1);
    const settleEase = spring({ bounce: 0.18, duration: profile.slideDuration });

    const movingPieces = activeSlide.querySelectorAll<HTMLElement>(
      "[data-deck-motion], h1, h2, p, a, button",
    );

    layer.style.opacity = "1";
    wash.style.opacity = "0";
    crest.style.opacity = "0";
    wash.style.transform = `translate3d(0, ${sweepStart}%, 0) scaleY(0.62)`;
    crest.style.transform = `translate3d(0, ${sweepStart * 0.55}%, 0) scaleX(0.86)`;
    activeSlide.style.willChange = "transform, opacity, filter";

    const tl = createTimeline({
      onComplete: () => {
        activeSlide.style.willChange = "";
        layer.style.opacity = "0";
      },
    });

    tl.add(wash, {
      opacity: [0, opacityPeak, 0],
      translateY: [`${sweepStart}%`, `${sweepEnd}%`],
      scaleY: [0.58, 1.24, 0.82],
      duration: profile.washDuration,
      ease: liquidEase,
    })
      .add(
        crest,
        {
          opacity: [0, 0.38 * transition.intensity, 0],
          translateY: [`${sweepStart * 0.55}%`, `${sweepEnd * 0.7}%`],
          scaleX: [0.82, 1.1, 0.95],
          duration: profile.crestDuration,
          ease: liquidEase,
        },
        110,
      )
      .add(
        activeSlide,
        {
          opacity: [0.78, 1],
          translateY: [fromY, 0],
          scale: [0.988, 1],
          filter: [`blur(${profile.blurPx}px)`, "blur(0px)"],
          duration: profile.slideDuration,
          ease: settleEase,
        },
        70,
      )
      .add(
        movingPieces,
        {
          opacity: [0.64, 1],
          translateY: [settleY, 0],
          duration: profile.pieceDuration,
          delay: stagger(profile.pieceStagger, { start: profile.pieceDelay }),
          ease: driftEase,
        },
        80,
      );
  }, [currentSlide, isMobile, reducedMotion]);

  return (
    <div
      ref={layerRef}
      className="pointer-events-none fixed inset-0 z-[45] overflow-hidden opacity-0"
      aria-hidden="true"
    >
      <div
        ref={washRef}
        className={`deck-liquid-wash absolute inset-x-[-18%] top-[-24%] h-[148%]${isMobile ? " deck-liquid-wash-mobile" : ""}`}
      />
      <div
        ref={crestRef}
        className={`deck-liquid-crest absolute inset-x-[-12%] top-[42%] h-[18vh]${isMobile ? " deck-liquid-crest-mobile" : ""}`}
      />
    </div>
  );
};

export default DeckTransitionLayer;
