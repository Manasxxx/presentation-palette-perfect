import { useEffect, useMemo, useRef, useState } from "react";
import { Rocket } from "lucide-react";
import { animate, stagger, createSpring } from "animejs";
import Hyperspeed from "@/components/ui/Hyperspeed/Hyperspeed";

const letters = "SKYROCKETING".split("");

const SkyrocketSlide = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);
  const hyperspeedOptions = useMemo(
    () => ({
      onSpeedUp: () => { },
      onSlowDown: () => { },
      distortion: 'turbulentDistortion',
      length: 400,
      roadWidth: 10,
      islandWidth: 2,
      lanesPerRoad: 3,
      fov: 90,
      fovSpeedUp: 150,
      speedUp: 2,
      carLightsFade: 0.4,
      totalSideLightSticks: 20,
      lightPairsPerRoadWay: 40,
      shoulderLinesWidthPercentage: 0.05,
      brokenLinesWidthPercentage: 0.1,
      brokenLinesLengthPercentage: 0.5,
      lightStickWidth: [0.12, 0.5] as [number, number],
      lightStickHeight: [1.3, 1.7] as [number, number],
      movingAwaySpeed: [60, 80] as [number, number],
      movingCloserSpeed: [-120, -160] as [number, number],
      carLightsLength: [400 * 0.03, 400 * 0.2] as [number, number],
      carLightsRadius: [0.05, 0.14] as [number, number],
      carWidthPercentage: [0.3, 0.5] as [number, number],
      carShiftX: [-0.8, 0.8] as [number, number],
      carFloorSeparation: [0, 5] as [number, number],
      colors: {
        roadColor: 0x080808,
        islandColor: 0x0a0a0a,
        background: 0x000000,
        shoulderLines: 0x131318,
        brokenLines: 0x131318,
        leftCars: [0x4bc2c2, 0x2dd4bf, 0x14b8a6],
        rightCars: [0x0f766e, 0x115e59, 0x134e4a],
        sticks: 0x4bc2c2
      }
    }),
    []
  );

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          setTriggered(true);

          // Letter entrance
          animate(el.querySelectorAll(".sky-letter"), {
            translateY: [100, 0],
            opacity: [0, 1],
            scale: [0.3, 1],
            delay: stagger(40, { from: "center" }),
            ease: createSpring({ stiffness: 300, damping: 18 }),
          });

          // Container fade
          animate(el.querySelector(".sky-content")!, {
            opacity: [0, 1],
            duration: 600,
            ease: "out(3)",
          });

          // Rocket icon
          animate(el.querySelector(".sky-rocket")!, {
            opacity: [0, 1],
            translateY: [-40, 0],
            duration: 700,
            ease: createSpring({ stiffness: 100, damping: 12 }),
          });

          // "YOUR PRESENCE" text
          animate(el.querySelector(".sky-presence")!, {
            opacity: [0, 1],
            translateX: [50, 0],
            duration: 800,
            delay: 500,
            ease: "out(3)",
          });

          // Bottom line
          animate(el.querySelector(".sky-line")!, {
            scaleX: [0, 1],
            duration: 1000,
            delay: 700,
            ease: "out(3)",
          });
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [triggered]);

  return (
    <section ref={sectionRef} className="slide bg-background overflow-hidden relative">
      <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
        <Hyperspeed effectOptions={hyperspeedOptions} />
      </div>
      <div className="sky-content relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-5xl" style={{ opacity: 0 }}>
        <div className="sky-rocket mb-8" style={{ opacity: 0 }}>
          <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center glow-green">
            <Rocket className="w-10 h-10 text-primary" />
          </div>
        </div>

        <h2 className="text-4xl md:text-7xl font-black tracking-tight">
          <span className="inline-flex">
            {letters.map((letter, i) => (
              <span
                key={i}
                className="sky-letter text-gradient-green inline-block"
                style={{ opacity: 0 }}
              >
                {letter}
              </span>
            ))}
          </span>
          <br />
          <span className="sky-presence text-foreground inline-block" style={{ opacity: 0 }}>
            YOUR PRESENCE
          </span>
        </h2>

        <div
          className="sky-line h-1 w-32 bg-gradient-to-r from-primary via-secondary to-primary rounded-full mt-8"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
    </section>
  );
};

export default SkyrocketSlide;
