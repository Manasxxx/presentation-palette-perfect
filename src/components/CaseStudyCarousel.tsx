import { useEffect, useState } from "react";
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
  desktopWide = false,
}: CaseStudyCarouselProps) => {
  const isMobile = useIsMobile();
  const [mobileStackIndex, setMobileStackIndex] = useState(0);
  const [desktopStackIndex, setDesktopStackIndex] = useState(0);

  // The original viewer is a simple timed card stack on both breakpoints.
  useEffect(() => {
    const interval = window.setInterval(() => {
      if (isMobile) {
        setMobileStackIndex((index) => (index + 1) % slides.length);
        return;
      }
      setDesktopStackIndex((index) => (index + 1) % slides.length);
    }, isMobile ? 3000 : 4000);
    return () => window.clearInterval(interval);
  }, [isMobile, slides.length]);

  // ─── Mobile: original timed glass-card stack. No drag surface. ───
  if (isMobile) {
    return (
      <div
        className={`cs-mobile-stack${mobileWide ? " cs-mobile-stack--wide" : ""}${mobileTableWidth ? " cs-mobile-stack--table" : ""}`}
        aria-label="Case-study creative carousel"
      >
        {slides.map((slide, index) => {
          const offset = (index - mobileStackIndex + slides.length) % slides.length;
          const position = offset === 0 ? "active" : offset === 1 ? "next" : offset === slides.length - 1 ? "prev" : "hidden";
          return (
            <div
              key={slide.image}
              className={`cs-mobile-stack-card cs-mobile-stack-card--${position}`}
              data-carousel-state={position}
              style={{ borderColor: `hsl(${accentColor} / 0.22)` }}
            >
              <img src={slide.image} alt={slide.alt} loading="lazy" />
            </div>
          );
        })}
      </div>
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
