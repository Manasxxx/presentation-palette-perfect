import { useEffect, useRef, useState } from "react";
import { animate, stagger, createSpring } from "animejs";
import vntCreative1 from "@/assets/vnt-creative-1.webp";
import vntCreative2 from "@/assets/vnt-creative-2.png";
import { useIsMobile } from "@/hooks/use-mobile";
import ParallaxCardSlider from "@/components/ParallaxCardSlider";

const vntGreen = "100 55% 38%";
const vntTeal = "192 100% 32%";

const sliderImages = [
  { image: vntCreative1, alt: "VNT creative 1" },
  { image: vntCreative2, alt: "VNT creative 2" },
];

const VNTCaseStudy = () => {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          setTriggered(true);

          // Circle-wipe background
          animate(el.querySelector(".bg-wipe")!, {
            clipPath: ["circle(5% at 50% 50%)", "circle(150% at 50% 50%)"],
            opacity: [0, 1],
            duration: 1800,
            ease: "cubicBezier(0.22, 1, 0.36, 1)",
          });

          // Heading
          animate(el.querySelector(".cs-heading")!, {
            opacity: [0, 1],
            translateY: [80, 0],
            scale: [0.94, 1],
            duration: 900,
            ease: createSpring({ stiffness: 95, damping: 12 }),
          });

          animate(el.querySelector(".cs-title-accent")!, {
            translateX: [-26, 0],
            filter: ["blur(10px)", "blur(0px)"],
            duration: 900,
            delay: 160,
            ease: "out(4)",
          });

          // Subtitle
          animate(el.querySelector(".cs-subtitle")!, {
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 600,
            delay: 200,
            ease: "out(3)",
          });

          // Images
          if (!isMobile) {
            animate(el.querySelectorAll(".cs-image"), {
              opacity: [0, 1],
              translateY: [60, -12, 0],
              scale: [0.82, 1.05, 1],
              rotate: [-5, 1, 0],
              delay: stagger(100, { start: 300 }),
              duration: 1200,
              ease: "out(4)",
            });
          } else {
            animate(el.querySelector(".cs-slider")!, {
              opacity: [0, 1],
              scale: [0.78, 1.04, 1],
              translateX: [120, -12, 0],
              rotate: [5, -1, 0],
              duration: 1250,
              ease: "out(4)",
            });
          }

          animate(el.querySelector(".cs-scan-line")!, {
            scaleX: [0, 1, 0],
            transformOrigin: ["0% 50%", "0% 50%", "100% 50%"],
            opacity: [0, 0.82, 0],
            duration: 1600,
            delay: 520,
            ease: "inOut(3)",
          });

          animate(el.querySelector(".cs-glow-orbit")!, {
            opacity: [0, 0.52, 0.14],
            scale: [0.72, 1.08, 1],
            rotate: [0, 12],
            duration: 1500,
            delay: 420,
            ease: "out(3)",
          });
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [triggered, isMobile]);

  return (
    <section ref={sectionRef} className="slide pt-16 pb-6 md:py-10 px-4 md:px-6 overflow-hidden relative flex flex-col">
      <div
        className="bg-wipe absolute inset-0 z-0"
        style={{ opacity: 0, clipPath: "circle(5% at 50% 50%)", background: `linear-gradient(145deg, hsl(120 25% 75%), hsl(140 30% 68%), hsl(${vntGreen} / 0.5))` }}
      />
      <div className="absolute inset-0 z-[-1]" style={{ background: `linear-gradient(145deg, hsl(120 25% 75%), hsl(140 30% 68%), hsl(${vntGreen} / 0.5))` }} />
      <div
        className="cs-scan-line pointer-events-none absolute left-0 top-[52%] z-[1] h-px w-full"
        style={{ opacity: 0, transform: "scaleX(0)", background: `linear-gradient(90deg, transparent, hsl(${vntGreen}), hsl(${vntTeal}), transparent)` }}
      />
      <div
        className="cs-glow-orbit pointer-events-none absolute right-[14%] top-[18%] z-[1] h-[48%] w-[36%] rounded-full"
        style={{
          opacity: 0,
          border: `1px solid hsl(${vntGreen} / 0.2)`,
          boxShadow: `0 0 90px -34px hsl(${vntGreen} / 0.7), inset 0 0 80px -54px hsl(${vntTeal} / 0.65)`,
        }}
      />

      <div className={`max-w-6xl mx-auto w-full relative z-10 ${isMobile ? 'flex flex-col flex-1' : ''}`}>

        <h2 className="cs-heading text-2xl md:text-5xl font-black tracking-tight text-center" style={{ opacity: 0, color: "hsl(0 0% 15%)" }}>
          VNT{" "}<span className="cs-title-accent bg-clip-text text-transparent inline-block" style={{ backgroundImage: `linear-gradient(135deg, hsl(${vntGreen}), hsl(${vntTeal}))` }}>Mobility</span>
        </h2>

        <p className="cs-subtitle text-center max-w-2xl mx-auto text-sm md:text-base" style={{ opacity: 0, color: "hsl(0 0% 40%)", marginBottom: isMobile ? '0.75rem' : '1.5rem', marginTop: isMobile ? '0.25rem' : '0.75rem' }}>
          EV charging across India. We put them on the map. Literally.
        </p>

        {isMobile ? (
          <div className="cs-slider flex justify-center flex-1 items-center" style={{ opacity: 0 }}>
            <ParallaxCardSlider slides={sliderImages} accentColor={vntGreen} />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:gap-6 items-center max-w-3xl mx-auto">
            {[vntCreative1, vntCreative2].map((src, i) => (
              <div key={i} className="cs-image rounded-2xl overflow-hidden" style={{ opacity: 0 }}>
                <img src={src} alt={`VNT creative ${i + 1}`} loading="lazy" className="w-full h-auto object-contain rounded-2xl" />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default VNTCaseStudy;
