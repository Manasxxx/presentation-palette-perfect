import { useEffect, useRef, useState } from "react";
import { animate, stagger, createSpring } from "animejs";
import { Lightbulb, Target, Zap } from "lucide-react";
import { LiquidGlassCard } from "react-liquid-glass-card";
import LightRays from "@/components/LightRays";
import { useIsMobile } from "@/hooks/use-mobile";

const WhoAreWeSlide = () => {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement>(null);
  const [triggered, setTriggered] = useState(false);

  // Scroll-driven parallax
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const bgEl = el.querySelector(".wa-parallax-bg") as HTMLElement;
    if (!bgEl) return;

    let raf = 0;
    const onScroll = () => {
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const progress = (rect.top + rect.height) / (window.innerHeight + rect.height);
        const y = -10 + progress * 20; // -10% to 10%
        bgEl.style.transform = `translateY(${y}%)`;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Reveal animations
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          setTriggered(true);

          animate(el.querySelector(".wa-heading")!, {
            opacity: [0, 1],
            translateY: [80, 0],
            duration: 900,
            ease: "out(3)",
          });

          animate(el.querySelector(".wa-card")!, {
            opacity: [0, 1],
            scale: [0.8, 1],
            translateY: [60, 0],
            duration: 800,
            delay: 200,
            ease: createSpring({ stiffness: 100, damping: 12 }),
          });

          animate(el.querySelectorAll(".wa-icon"), {
            opacity: [0, 1],
            translateY: [50, 0],
            scale: [0.8, 1],
            delay: stagger(150, { start: 300 }),
            ease: createSpring({ stiffness: 100, damping: 12 }),
          });
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [triggered]);

  return (
    <section ref={sectionRef} className="slide hexagon-pattern py-20 overflow-hidden">
      <div className="wa-parallax-bg absolute inset-0 bg-background" />
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

      <div className="relative z-10 flex flex-col items-center justify-center px-6 max-w-5xl mx-auto">
        <h2 className="wa-heading text-4xl md:text-6xl font-black tracking-tight mb-12 text-center" style={{ opacity: 0 }}>
          <span className="text-foreground">WHO ARE </span>
          <span className="text-gradient-green">WE?</span>
        </h2>

        <div className="wa-card mb-10 max-w-3xl text-center" style={{ opacity: 0 }}>
          <LiquidGlassCard padding={isMobile ? "1.5rem 1rem" : "2rem 3rem"} borderRadius="1.5rem" blur={12} brightness={1.15} backgroundColor="rgba(255, 255, 255, 0.08)">
            <p className="text-lg md:text-2xl leading-relaxed text-muted-foreground">
              We are <span className="text-secondary font-bold">OWLSURF DIGITAL</span>, a 360° digital marketing agency where <span className="text-primary font-semibold">Tech Meets Design</span>.
            </p>
          </LiquidGlassCard>
        </div>

        <div className="grid grid-cols-3 gap-6 md:gap-12">
          {[
            { icon: Lightbulb, label: "Innovation" },
            { icon: Target, label: "Strategy" },
            { icon: Zap, label: "Execution" },
          ].map((item, i) => (
            <div key={i} className="wa-icon flex flex-col items-center gap-3" style={{ opacity: 0 }}>
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 transition-transform duration-300 hover:scale-110 hover:rotate-[5deg]">
                <item.icon className="w-7 h-7 md:w-8 md:h-8 text-primary" />
              </div>
              <span className="text-xs md:text-sm font-medium tracking-wider text-muted-foreground">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoAreWeSlide;
