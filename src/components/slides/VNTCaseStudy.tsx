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
            duration: 800,
            ease: createSpring({ stiffness: 100, damping: 15 }),
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
              translateY: [50, 0],
              scale: [0.9, 1],
              delay: stagger(100, { start: 300 }),
              ease: createSpring({ stiffness: 100, damping: 15 }),
            });
          } else {
            animate(el.querySelector(".cs-slider")!, {
              opacity: [0, 1],
              scale: [0.9, 1],
              duration: 800,
              ease: "out(3)",
            });
          }
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

      <div className={`max-w-6xl mx-auto w-full relative z-10 ${isMobile ? 'flex flex-col flex-1' : ''}`}>

        <h2 className="cs-heading text-2xl md:text-5xl font-black tracking-tight text-center" style={{ opacity: 0, color: "hsl(0 0% 15%)" }}>
          VNT{" "}<span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, hsl(${vntGreen}), hsl(${vntTeal}))` }}>Mobility</span>
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
