import { useState, useRef, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface SlideData {
  image: string;
  alt: string;
}

interface ParallaxCardSliderProps {
  slides: SlideData[];
  accentColor?: string;
  cardWidth?: string;
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const ParallaxCardSlider = ({ slides, accentColor = "193 100% 42%", cardWidth = "min(32vw, 340px)" }: ParallaxCardSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("right");
  const [isAnimating, setIsAnimating] = useState(false);
  const [tilt, setTilt] = useState({ rotX: 0, rotY: 0, bgX: 0, bgY: 0 });
  const tiltTarget = useRef({ rotX: 0, rotY: 0, bgX: 0, bgY: 0 });
  const rafRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const timeoutsRef = useRef<number[]>([]);
  const isMobile = useIsMobile();

  const total = slides.length;
  const getPrev = useCallback((i: number) => (i - 1 + total) % total, [total]);
  const getNext = useCallback((i: number) => (i + 1) % total, [total]);

  const changeSlide = useCallback((newIndex: number, direction: "left" | "right") => {
    if (isAnimating) return;
    setIsAnimating(true);
    setSlideDirection(direction);

    // Start exit animation, then after transition swap
    const swapTimeout = window.setTimeout(() => {
      setDisplayIndex(newIndex);
      setCurrentIndex(newIndex);
      tiltTarget.current = { rotX: 0, rotY: 0, bgX: 0, bgY: 0 };
      const finishTimeout = window.setTimeout(() => setIsAnimating(false), 400);
      timeoutsRef.current.push(finishTimeout);
    }, 200);
    timeoutsRef.current.push(swapTimeout);
  }, [isAnimating]);

  const goNext = useCallback(() => {
    changeSlide(getNext(currentIndex), "right");
  }, [currentIndex, getNext, changeSlide]);

  const goPrev = useCallback(() => {
    changeSlide(getPrev(currentIndex), "left");
  }, [currentIndex, getPrev, changeSlide]);

  // Visibility observer
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(window.clearTimeout);
      timeoutsRef.current = [];
    };
  }, []);

  // Auto-advance
  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      if (isAnimating) return;
      changeSlide(getNext(currentIndex), "right");
    }, 4000);
    return () => clearInterval(interval);
  }, [isVisible, currentIndex, isAnimating, getNext, changeSlide]);

  // Tilt animation loop - desktop only
  useEffect(() => {
    if (isMobile || !isVisible) return;
    const animateTilt = () => {
      setTilt((prev) => ({
        rotX: lerp(prev.rotX, tiltTarget.current.rotX, 0.08),
        rotY: lerp(prev.rotY, tiltTarget.current.rotY, 0.08),
        bgX: lerp(prev.bgX, tiltTarget.current.bgX, 0.08),
        bgY: lerp(prev.bgY, tiltTarget.current.bgY, 0.08),
      }));
      rafRef.current = requestAnimationFrame(animateTilt);
    };
    rafRef.current = requestAnimationFrame(animateTilt);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isMobile, isVisible]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    const ox = (offsetX - rect.width * 0.5) / (Math.PI * 3);
    const oy = -(offsetY - rect.height * 0.5) / (Math.PI * 4);
    tiltTarget.current = { rotX: ox, rotY: oy, bgX: -ox * 0.3, bgY: oy * 0.3 };
  }, []);

  const handleMouseLeave = useCallback(() => {
    tiltTarget.current = { rotX: 0, rotY: 0, bgX: 0, bgY: 0 };
  }, []);

  // Touch swipe support for mobile
  const touchStartX = useRef(0);
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);
  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goPrev();
      else goNext();
    }
  }, [goNext, goPrev]);

  const getSlideStyle = (index: number): React.CSSProperties => {
    const slideWidth = cardWidth;

    if (index === currentIndex) {
      return {
        transform: `perspective(1000px) translate3d(0, 0, 0) rotateY(0deg) scale(1.2)`,
        zIndex: 20,
        opacity: 1,
        pointerEvents: "auto",
      };
    }
    if (index === getNext(currentIndex)) {
      return {
        transform: `perspective(1000px) translate3d(calc(${slideWidth} * 1.05), 0, 0) rotateY(-45deg) scale(1)`,
        zIndex: 10,
        opacity: 0.46,
        pointerEvents: "none",
      };
    }
    if (index === getPrev(currentIndex)) {
      return {
        transform: `perspective(1000px) translate3d(calc(-1 * ${slideWidth} * 1.05), 0, 0) rotateY(45deg) scale(1)`,
        zIndex: 30,
        opacity: 0.46,
        pointerEvents: "none",
      };
    }
    return {
      transform: `perspective(1000px) scale(0) rotateY(0deg)`,
      zIndex: 0,
      opacity: 0,
      pointerEvents: "none",
    };
  };

  // ─── Mobile: single full-width image with CSS transition ───
  if (isMobile) {
    const exitTransform = slideDirection === "right" ? "translateX(-60px)" : "translateX(60px)";
    const enterTransform = slideDirection === "right" ? "translateX(60px)" : "translateX(-60px)";

    return (
      <div
        ref={containerRef}
        className="relative w-full flex flex-col items-center select-none"
        style={{ width: "92vw", margin: "0 auto" }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative w-full overflow-hidden rounded-2xl" style={{ aspectRatio: "1 / 1" }}>
          <img
            key={displayIndex}
            src={slides[displayIndex].image}
            alt={slides[displayIndex].alt}
            className="absolute inset-0 w-full h-full object-contain rounded-2xl"
            style={{
              opacity: isAnimating ? 0 : 1,
              transform: isAnimating ? (displayIndex === currentIndex ? exitTransform : enterTransform) : "translateX(0)",
              transition: "opacity 0.4s ease-in-out, transform 0.4s ease-in-out",
            }}
          />
        </div>

        {/* Dot navigation */}
        <div className="flex gap-2 mt-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => changeSlide(i, i > currentIndex ? "right" : "left")}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                background: i === currentIndex ? `hsl(${accentColor})` : "hsl(0 0% 50% / 0.3)",
                transform: i === currentIndex ? "scale(1.4)" : "scale(1)",
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    );
  }

  // ─── Desktop: 3D parallax card layout ───
  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center select-none"
      style={{ width: `calc(3 * ${cardWidth})`, height: `calc(${cardWidth} * 1.3)` }}
    >
      <button
        onClick={goPrev}
        className="absolute left-0 z-[999] p-2 opacity-70 hover:opacity-100 transition-opacity"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-8 h-8" style={{ color: `hsl(${accentColor})` }} />
      </button>

      <div className="w-full h-full grid place-items-center">
        <div className="w-full h-full grid place-items-center" style={{ gridArea: "1 / -1" }}>
          {slides.map((slide, i) => {
            const isCurrent = i === currentIndex;
            return (
              <div
                key={i}
                className="col-start-1 row-start-1"
                style={{
                  width: cardWidth,
                  aspectRatio: "1 / 1",
                  perspective: "800px",
                  transition: "transform 800ms ease, opacity 800ms ease",
                  ...getSlideStyle(i),
                }}
                onMouseMove={isCurrent ? handleMouseMove : undefined}
                onMouseLeave={isCurrent ? handleMouseLeave : undefined}
              >
                <div
                  className="relative w-full h-full"
                  style={{
                    transformStyle: "preserve-3d",
                    transform: isCurrent
                      ? `rotateX(${tilt.rotY.toFixed(2)}deg) rotateY(${tilt.rotX.toFixed(2)}deg)`
                      : undefined,
                    transition: isCurrent ? undefined : "transform 800ms ease",
                  }}
                >
                  <div className="relative w-full h-full overflow-hidden">
                    <img
                      src={slide.image}
                      alt={slide.alt}
                      loading="lazy"
                      className="w-full h-full object-contain"
                      style={{
                        transform: isCurrent
                          ? `scale(1.05) translate3d(${tilt.bgX.toFixed(2)}%, ${tilt.bgY.toFixed(2)}%, 0)`
                          : "scale(1.05)",
                        filter: isCurrent ? "brightness(0.88)" : "brightness(0.42)",
                        transition: "filter 800ms ease",
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <button
        onClick={goNext}
        className="absolute right-0 z-[999] p-2 opacity-70 hover:opacity-100 transition-opacity"
        aria-label="Next slide"
      >
        <ChevronRight className="w-8 h-8" style={{ color: `hsl(${accentColor})` }} />
      </button>

      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-50">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => changeSlide(i, i > currentIndex ? "right" : "left")}
            className="w-2 h-2 rounded-full transition-all duration-300"
            style={{
              background: i === currentIndex ? `hsl(${accentColor})` : "hsl(0 0% 100% / 0.3)",
              transform: i === currentIndex ? "scale(1.4)" : "scale(1)",
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ParallaxCardSlider;
