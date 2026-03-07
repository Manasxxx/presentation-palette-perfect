import { useEffect, useRef, useState } from "react";
import { Phone, Globe, Mail } from "lucide-react";
import { animate, stagger, createSpring } from "animejs";
import logo from "@/assets/logo-icon.png";
import { LiquidGlassCard } from "react-liquid-glass-card";
import LightRays from "@/components/LightRays";

const ContactSlide = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          setTriggered(true);

          // Logo spin-in
          animate(el.querySelector(".ct-logo")!, {
            opacity: [0, 1],
            scale: [0, 1],
            rotate: [-180, 0],
            duration: 1000,
            ease: createSpring({ stiffness: 100, damping: 12 }),
          });

          // Heading
          animate(el.querySelector(".ct-heading")!, {
            opacity: [0, 1],
            translateY: [60, 0],
            duration: 800,
            delay: 200,
            ease: "out(3)",
          });

          // Subtitle
          animate(el.querySelector(".ct-subtitle")!, {
            opacity: [0, 1],
            translateX: [-50, 0],
            duration: 600,
            delay: 300,
            ease: "out(3)",
          });

          // Contact cards
          animate(el.querySelectorAll(".contact-card"), {
            translateY: [60, 0],
            opacity: [0, 1],
            scale: [0.8, 1],
            delay: stagger(120),
            ease: createSpring({ stiffness: 200, damping: 15 }),
          });

          // Footer
          animate(el.querySelector(".ct-footer")!, {
            opacity: [0, 1],
            scaleX: [0, 1],
            duration: 800,
            delay: 600,
            ease: "out(3)",
          });
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [triggered]);

  return (
    <section ref={sectionRef} className="slide hexagon-pattern overflow-visible">
      <div className="absolute inset-0 bg-background" />
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

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-3xl">
        <div className="ct-logo mb-8" style={{ opacity: 0 }}>
          <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-primary/20 p-2 animate-pulse-glow overflow-visible">
            <img src={logo} alt="OwlSurf Digital" className="w-full h-full object-contain" />
          </div>
        </div>

        <h2 className="ct-heading text-3xl md:text-5xl font-black tracking-tight mb-4" style={{ opacity: 0 }}>
          <span className="text-foreground">REACH OUT </span>
          <span className="text-gradient-green">WHERE</span>
        </h2>

        <p className="ct-subtitle text-xl md:text-2xl font-bold tracking-wider text-secondary mb-10" style={{ opacity: 0 }}>
          TECH MEETS DESIGN
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-2xl">
          <a
            href="tel:+919520367546"
            className="contact-card transition-all duration-300 hover:scale-105 hover:-translate-y-1"
            style={{ opacity: 0 }}
          >
            <LiquidGlassCard padding="1.5rem" borderRadius="1rem" blur={10} brightness={1.1} backgroundColor="rgba(255, 255, 255, 0.06)">
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">+91 9520 367546</span>
              </div>
            </LiquidGlassCard>
          </a>

          <a
            href="https://www.owlsurf.com"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card transition-all duration-300 hover:scale-105 hover:-translate-y-1"
            style={{ opacity: 0 }}
          >
            <LiquidGlassCard padding="1.5rem" borderRadius="1rem" blur={10} brightness={1.1} backgroundColor="rgba(255, 255, 255, 0.06)">
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">www.owlsurf.com</span>
              </div>
            </LiquidGlassCard>
          </a>

          <a
            href="mailto:growth@owlsurf.com"
            className="contact-card transition-all duration-300 hover:scale-105 hover:-translate-y-1"
            style={{ opacity: 0 }}
          >
            <LiquidGlassCard padding="1.5rem" borderRadius="1rem" blur={10} brightness={1.1} backgroundColor="rgba(255, 255, 255, 0.06)">
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">growth@owlsurf.com</span>
              </div>
            </LiquidGlassCard>
          </a>
        </div>

        <div className="ct-footer mt-12 flex items-center gap-4" style={{ opacity: 0, transform: "scaleX(0)" }}>
          <div className="h-px w-12 bg-border" />
          <span className="text-xs tracking-widest text-muted-foreground">© OWLSURF DIGITAL</span>
          <div className="h-px w-12 bg-border" />
        </div>
      </div>
    </section>
  );
};

export default ContactSlide;
