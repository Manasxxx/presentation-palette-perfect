import { useEffect, useRef, useState } from "react";
import { Rocket } from "lucide-react";
import { animate, stagger, createSpring } from "animejs";
import LightRays from "@/components/LightRays";

const letters = "SKYROCKETING".split("");

const SkyrocketSlide = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

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
    <section ref={sectionRef} className="slide bg-background overflow-hidden">
      <LightRays
        raysColor="#4bc2c2"
        raysOrigin="top-center"
        raysSpeed={0.8}
        lightSpread={0.5}
        rayLength={3}
        fadeDistance={1}
        saturation={0.8}
        mouseInfluence={0.1}
        className="opacity-50 pointer-events-none"
      />
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
