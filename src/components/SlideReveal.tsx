import { useEffect, useRef, type HTMLAttributes, type ReactNode } from "react";
import { animate, cubicBezier } from "animejs";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileSlideMotion from "./MobileSlideMotion";

interface SlideRevealProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  nativeMotion?: boolean;
  /**
   * Mobile seam blend (see slide-edge-colors.ts): the shared color this slide
   * melts into at its top/bottom joint with the neighbouring slide. Rendered
   * as short edge gradients so the boundary never reads as a divider line.
   */
  seamTopColor?: string;
  seamBottomColor?: string;
}

const SlideReveal = ({
  children,
  className = "",
  nativeMotion = false,
  seamTopColor,
  seamBottomColor,
  ...props
}: SlideRevealProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const triggered = useRef(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Mobile uses the Motion scroll-linked reveal (see render branch below);
    // skip the animejs reveal entirely so the two systems never overlap.
    if (isMobile) return;

    const content = contentRef.current;
    if (!content) return;

    if (nativeMotion || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      content.style.opacity = "1";
      content.style.transform = "none";
      content.style.filter = "none";
      return;
    }

    content.style.opacity = "0";
    content.style.transform = `translateY(${isMobile ? -18 : -28}px)`;
    const slideRevealEase = cubicBezier(0.18, 0.82, 0.18, 1);

    const reveal = () => {
      if (triggered.current) return;
      triggered.current = true;

      // Promote to a compositor layer only for the reveal itself — a standing
      // will-change here holds a full-viewport GPU layer per slide forever.
      content.style.willChange = "transform, opacity, filter";

      // Content reveal — only animate the inner wrapper, not the outer container
      animate(content, {
        opacity: [0, 1],
        translateY: [isMobile ? -18 : -28, 0],
        filter: ["blur(10px)", "blur(0px)"],
        duration: isMobile ? 720 : 980,
        ease: slideRevealEase,
        onComplete: () => {
          content.style.willChange = "";
        },
      });

      // Top wipe line
      animate(content.querySelector(".sr-top-line")!, {
        scaleX: [0, 1],
        duration: isMobile ? 680 : 900,
        delay: isMobile ? 160 : 250,
        ease: slideRevealEase,
      });

      // Bottom wipe line
      animate(content.querySelector(".sr-bottom-line")!, {
        scaleX: [0, 1],
        duration: isMobile ? 680 : 900,
        delay: isMobile ? 260 : 450,
        ease: slideRevealEase,
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) reveal();
      },
      { threshold: isMobile ? 0.08 : 0.15 }
    );
    observer.observe(content);
    const fallback = window.setTimeout(reveal, isMobile ? 700 : 900);
    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, [isMobile, nativeMotion]);

  // Mobile: hand off to the Motion scroll-linked cross-fade. No animejs reveal,
  // no wipe lines. Desktop keeps the exact markup + animation below, untouched.
  if (isMobile) {
    return (
      <div className={`${className} bg-background`} {...props}>
        <MobileSlideMotion nativeMotion={nativeMotion}>{children}</MobileSlideMotion>
        {/* Seam blend: both sides of a slide joint fade to the same mixed
            color, so the boundary is one continuous wash instead of a line.
            Static color overlays (not motion), so not reduced-motion gated. */}
        {seamTopColor && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 z-20 h-[6.5svh]"
            style={{ background: `linear-gradient(to bottom, ${seamTopColor} 0%, color-mix(in oklab, ${seamTopColor} 45%, transparent) 45%, transparent 100%)` }}
          />
        )}
        {seamBottomColor && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[6.5svh]"
            style={{ background: `linear-gradient(to top, ${seamBottomColor} 0%, color-mix(in oklab, ${seamBottomColor} 45%, transparent) 45%, transparent 100%)` }}
          />
        )}
      </div>
    );
  }

  return (
    <div className={`${className} bg-background`} {...props}>
      <div
        ref={contentRef}
        data-slide-content
        data-native-slide-motion={nativeMotion ? "true" : undefined}
        className="relative"
        style={{ opacity: 1 }}
      >
        {!nativeMotion && (
          <>
            <div
              className="sr-top-line absolute top-0 left-[5%] right-[5%] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent z-20"
              style={{ transform: "scaleX(0)" }}
            />
            <div
              className="sr-bottom-line absolute bottom-0 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent z-20"
              style={{ transform: "scaleX(0)" }}
            />
          </>
        )}
        {children}
      </div>
    </div>
  );
};

export default SlideReveal;
