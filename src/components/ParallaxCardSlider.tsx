import { useState, useRef, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SlideData {
  image: string;
  alt: string;
}

interface ParallaxCardSliderProps {
  slides: SlideData[];
  accentColor?: string;
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const ParallaxCardSlider = ({ slides, accentColor = "193 100% 42%" }: ParallaxCardSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [tilt, setTilt] = useState({ rotX: 0, rotY: 0, bgX: 0, bgY: 0 });
  const tiltTarget = useRef({ rotX: 0, rotY: 0, bgX: 0, bgY: 0 });
  const rafRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const total = slides.length;
  const getPrev = (i: number) => (i - 1 + total) % total;
  const getNext = (i: number) => (i + 1) % total;

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => getNext(prev));
    tiltTarget.current = { rotX: 0, rotY: 0, bgX: 0, bgY: 0 };
  }, [total]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => getPrev(prev));
    tiltTarget.current = { rotX: 0, rotY: 0, bgX: 0, bgY: 0 };
  }, [total]);

  // Tilt animation loop
  useEffect(() => {
    const animate = () => {
      setTilt((prev) => ({
        rotX: lerp(prev.rotX, tiltTarget.current.rotX, 0.08),
        rotY: lerp(prev.rotY, tiltTarget.current.rotY, 0.08),
        bgX: lerp(prev.bgX, tiltTarget.current.bgX, 0.08),
        bgY: lerp(prev.bgY, tiltTarget.current.bgY, 0.08),
      }));
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

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

  const getSlideStyle = (index: number): React.CSSProperties => {
    const slideWidth = "min(30vw, 280px)";

    if (index === currentIndex) {
      return {
        transform: `perspective(1000px) translate3d(0, 0, 0) rotateY(0deg) scale(1.2)`,
        zIndex: 20,
        pointerEvents: "auto",
      };
    }
    if (index === getNext(currentIndex)) {
      return {
        transform: `perspective(1000px) translate3d(calc(${slideWidth} * 1.05), 0, 0) rotateY(-45deg) scale(1)`,
        zIndex: 10,
        pointerEvents: "none",
      };
    }
    if (index === getPrev(currentIndex)) {
      return {
        transform: `perspective(1000px) translate3d(calc(-1 * ${slideWidth} * 1.05), 0, 0) rotateY(45deg) scale(1)`,
        zIndex: 30,
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

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center select-none"
      style={{ width: "calc(3 * min(30vw, 280px))", height: "calc(min(30vw, 280px) * 1.5 * 1.3)" }}
    >
      {/* Nav buttons */}
      <button
        onClick={goPrev}
        className="absolute left-0 z-[999] p-2 opacity-70 hover:opacity-100 transition-opacity"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-8 h-8" style={{ color: `hsl(${accentColor})` }} />
      </button>

      {/* Slides wrapper */}
      <div className="w-full h-full grid place-items-center">
        <div className="w-full h-full grid place-items-center" style={{ gridArea: "1 / -1" }}>
          {slides.map((slide, i) => {
            const isCurrent = i === currentIndex;
            return (
              <div
                key={i}
                className="col-start-1 row-start-1"
                style={{
                  width: "min(30vw, 280px)",
                  aspectRatio: "2 / 3",
                  perspective: "800px",
                  transition: "transform 800ms ease",
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
                  <div className="relative w-full h-full overflow-hidden rounded-2xl">
                    <img
                      src={slide.image}
                      alt={slide.alt}
                      className="absolute top-1/2 left-1/2 w-full h-full object-cover"
                      style={{
                        transform: isCurrent
                          ? `translate(-50%, -50%) scale(1.25) translate3d(${tilt.bgX.toFixed(2)}%, ${tilt.bgY.toFixed(2)}%, 0)`
                          : "translate(-50%, -50%) scale(1.25)",
                        filter: isCurrent ? "brightness(0.85)" : "brightness(0.5)",
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

      {/* Dot indicators */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 z-50">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
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
