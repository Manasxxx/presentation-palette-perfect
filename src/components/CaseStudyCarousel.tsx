import { useRef, useEffect, useState, type ElementRef } from "react";
import { BlossomCarousel } from "@blossom-carousel/react";
import { useIsMobile } from "@/hooks/use-mobile";

interface SlideData {
  image: string;
  alt: string;
}

interface CaseStudyCarouselProps {
  slides: SlideData[];
  accentColor?: string;
  mobileWide?: boolean;
  mobileTableWidth?: boolean;
  mobileStack?: boolean;
  /** Wide-aspect desktop cards for landscape creatives (e.g. DEHN 1256x650). */
  desktopWide?: boolean;
}

const CaseStudyCarousel = ({
  slides,
  accentColor = "193 100% 42%",
  mobileWide = false,
  mobileTableWidth = false,
  mobileStack = false,
  desktopWide = false,
}: CaseStudyCarouselProps) => {
  const blossomRef = useRef<ElementRef<typeof BlossomCarousel>>(null);
  const isMobile = useIsMobile();
  const [mobileStackIndex, setMobileStackIndex] = useState(0);
  const [desktopStackIndex, setDesktopStackIndex] = useState(0);

  // Auto-advance. Desktop uses our deterministic stack, not scroll-timeline state.
  useEffect(() => {
    const interval = window.setInterval(() => {
      if (isMobile && mobileStack) {
        setMobileStackIndex((index) => (index + 1) % slides.length);
        return;
      }
      if (!isMobile) {
        setDesktopStackIndex((index) => (index + 1) % slides.length);
        return;
      }
      blossomRef.current?.next();
    }, isMobile ? 3000 : 4000);
    return () => window.clearInterval(interval);
  }, [isMobile, mobileStack, slides.length]);

  if (isMobile && mobileStack) {
    return (
      <div className={`cs-mobile-stack${mobileWide ? " cs-mobile-stack--wide" : ""}`} aria-label="Case-study creative carousel">
        {slides.map((slide, index) => {
          const offset = (index - mobileStackIndex + slides.length) % slides.length;
          const position = offset === 0 ? "active" : offset === 1 ? "next" : offset === slides.length - 1 ? "prev" : "hidden";
          return (
            <div
              key={slide.image}
              className={`cs-mobile-stack-card cs-mobile-stack-card--${position}`}
              style={{ borderColor: `hsl(${accentColor} / 0.22)` }}
            >
              <img src={slide.image} alt={slide.alt} loading="lazy" />
            </div>
          );
        })}
      </div>
    );
  }

  // ─── Mobile default: Blossom cover-flow carousel ───
  if (isMobile) {
    return (
      <BlossomCarousel
        as="ul"
        load="always"
        ref={blossomRef}
        className={`cs-coverflow${mobileWide ? " cs-coverflow--wide" : ""}${mobileTableWidth ? " cs-coverflow--table" : ""}`}
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

  // ─── Desktop: deterministic fanned stack. No horizontal scroll state. ───
  return (
    <div
      className={`cs-desktop-stack${desktopWide ? " cs-desktop-stack--wide" : ""}`}
      aria-label="Case-study creative carousel"
    >
      {slides.map((slide, index) => {
        const offset = (index - desktopStackIndex + slides.length) % slides.length;
        const position = offset === 0 ? "active" : offset === 1 ? "next" : offset === slides.length - 1 ? "prev" : "hidden";
        return (
          <div
            key={slide.image}
            className={`cs-desktop-stack-card cs-desktop-stack-card--${position}`}
            style={{ borderColor: `hsl(${accentColor} / 0.28)` }}
          >
            <img src={slide.image} alt={slide.alt} loading="lazy" />
          </div>
        );
      })}
    </div>
  );
};

export default CaseStudyCarousel;
