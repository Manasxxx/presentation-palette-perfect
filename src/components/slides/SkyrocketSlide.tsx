import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
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
          animate(el.querySelectorAll(".sky-letter"), {
            translateY: [100, 0],
            opacity: [0, 1],
            scale: [0.3, 1],
            delay: stagger(40, { from: "center" }),
            ease: createSpring({ stiffness: 300, damping: 18 }),
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
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-5xl"
      >
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: "spring", bounce: 0.4 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center glow-green">
            <Rocket className="w-10 h-10 text-primary" />
          </div>
        </motion.div>

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
          <motion.span
            className="text-foreground inline-block"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            YOUR PRESENCE
          </motion.span>
        </h2>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          viewport={{ once: true }}
          className="h-1 w-32 bg-gradient-to-r from-primary via-secondary to-primary rounded-full mt-8"
        />
      </motion.div>
    </section>
  );
};

export default SkyrocketSlide;
