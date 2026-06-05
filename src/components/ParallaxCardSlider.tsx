import { useRef, useEffect, type ElementRef } from "react";
import { BlossomCarousel } from "@blossom-carousel/react";
import { useIsMobile } from "@/hooks/use-mobile";

interface SlideData {
  image: string;
  alt: string;
}

interface ParallaxCardSliderProps {
  slides: SlideData[];
  accentColor?: string;
}

const ParallaxCardSlider = ({ slides, accentColor = "193 100% 42%" }: ParallaxCardSliderProps) => {
  const blossomRef = useRef<ElementRef<typeof BlossomCarousel>>(null);
  const isMobile = useIsMobile();

  // Auto-advance both layouts (mobile cover-flow + desktop card stack).
  useEffect(() => {
    const interval = window.setInterval(() => {
      blossomRef.current?.next();
    }, isMobile ? 3000 : 4000);
    return () => window.clearInterval(interval);
  }, [isMobile]);

  // ─── Mobile: Blossom cover-flow carousel ───
  if (isMobile) {
    return (
      <BlossomCarousel
        as="ul"
        load="always"
        ref={blossomRef}
        className="cs-coverflow"
        aria-label="Case-study creative carousel"
      >
        {slides.map((slide) => (
          <li key={slide.image} className="cs-coverflow-item">
            <div className="cs-coverflow-stage">
              <div
                className="cs-coverflow-card"
                style={{ borderColor: `hsl(${accentColor} / 0.24)` }}
              >
                <img src={slide.image} alt={slide.alt} loading="lazy" />
              </div>
            </div>
          </li>
        ))}
      </BlossomCarousel>
    );
  }

  // ─── Desktop: Blossom "cards" stack (scroll/view-timeline driven) ───
  return (
    <BlossomCarousel
      as="ul"
      load="always"
      ref={blossomRef}
      className="cs-cards"
      aria-label="Case-study creative carousel"
    >
      {slides.map((slide) => (
        <li key={slide.image} className="cs-cards-slide">
          <div
            className="cs-cards-card"
            style={{ borderColor: `hsl(${accentColor} / 0.28)` }}
          >
            <img src={slide.image} alt={slide.alt} loading="lazy" />
          </div>
        </li>
      ))}
    </BlossomCarousel>
  );
};

export default ParallaxCardSlider;
