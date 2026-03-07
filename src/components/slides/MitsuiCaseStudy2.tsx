import { useEffect, useRef, useState } from "react";
import { animate, stagger, createSpring } from "animejs";
import mitsuiCreative3 from "@/assets/mitsui-creative-3.png";
import mitsuiCreative4 from "@/assets/mitsui-creative-4.png";

const mitsuiBlue = "210 100% 30%";
const mitsuiCyan = "193 100% 42%";

const MitsuiCaseStudy2 = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          setTriggered(true);

          animate(el.querySelector(".bg-wipe")!, {
            clipPath: ["circle(5% at 50% 50%)", "circle(150% at 50% 50%)"],
            opacity: [0, 1],
            duration: 1800,
            ease: "cubicBezier(0.22, 1, 0.36, 1)",
          });

          animate(el.querySelector(".cs-heading")!, {
            opacity: [0, 1],
            translateY: [80, 0],
            duration: 800,
            ease: createSpring({ stiffness: 100, damping: 15 }),
          });

          animate(el.querySelector(".cs-subtitle")!, {
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 600,
            delay: 200,
            ease: "out(3)",
          });

          animate(el.querySelectorAll(".cs-image"), {
            opacity: [0, 1],
            translateY: [50, 0],
            scale: [0.9, 1],
            delay: stagger(150, { start: 300 }),
            ease: createSpring({ stiffness: 100, damping: 15 }),
          });
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [triggered]);

  return (
    <section ref={sectionRef} className="slide py-10 px-6 overflow-hidden relative">
      <div
        className="bg-wipe absolute inset-0 z-0"
        style={{ opacity: 0, clipPath: "circle(5% at 50% 50%)", background: `linear-gradient(160deg, hsl(${mitsuiBlue} / 0.85), hsl(210 60% 22% / 0.7), hsl(${mitsuiCyan} / 0.3))` }}
      />
      <div className="absolute inset-0 z-[-1]" style={{ background: `linear-gradient(160deg, hsl(${mitsuiBlue} / 0.85), hsl(210 60% 22% / 0.7), hsl(${mitsuiCyan} / 0.3))` }} />

      <div className="max-w-6xl mx-auto w-full relative z-10">

        <h2 className="cs-heading text-3xl md:text-5xl font-black tracking-tight mb-3 text-center text-white" style={{ opacity: 0 }}>
          <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, hsl(${mitsuiCyan}), hsl(193 80% 65%))` }}>
            Mitsui Chemicals
          </span>{" "}
          Creatives
        </h2>

        <p className="cs-subtitle text-center mb-6 max-w-2xl mx-auto text-sm md:text-base" style={{ opacity: 0, color: "hsl(210 30% 75%)" }}>
          High-impact visual campaigns crafted for Mitsui Chemicals' product lines and sustainability initiatives.
        </p>

        <div className="grid grid-cols-2 gap-4 md:gap-6 items-center max-w-4xl mx-auto">
          {[mitsuiCreative3, mitsuiCreative4].map((src, i) => (
            <div key={i} className="cs-image rounded-2xl overflow-hidden" style={{ opacity: 0 }}>
              <img src={src} alt={`Mitsui Chemicals creative ${i + 3}`} loading="lazy" className="w-full h-auto object-contain rounded-2xl" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MitsuiCaseStudy2;
