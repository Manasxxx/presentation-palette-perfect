import { useEffect, useRef, useState } from "react";
import { animate, stagger, createSpring } from "animejs";
import { Eye, Users, Share2, Smartphone, Zap } from "lucide-react";
import baxsaaCreative1 from "@/assets/baxsaa-creative-1.png";
import baxsaaCreative2 from "@/assets/baxsaa-creative-2.webp";
import { LiquidGlassCard } from "react-liquid-glass-card";
import { useIsMobile } from "@/hooks/use-mobile";
import ParallaxCardSlider from "@/components/ParallaxCardSlider";

const stats = [
  { icon: Eye, value: "2.76M", label: "Impressions" },
  { icon: Users, value: "14.6K", label: "Followers" },
  { icon: Share2, value: "3.9M", label: "Reach" },
  { icon: Zap, value: "3x", label: "CTR" },
  { icon: Smartphone, value: "97/100", label: "Mobile" },
];

const baxsaaMaroon = "0 68% 33%";
const baxsaaCream = "36 33% 93%";

const sliderImages = [
  { image: baxsaaCreative1, alt: "Baxsaa Co. creative 1" },
  { image: baxsaaCreative2, alt: "Baxsaa Co. creative 2" },
];

const BaxsaaCaseStudy = () => {
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

          animate(el.querySelector(".bg-wipe")!, {
            clipPath: ["circle(5% at 50% 50%)", "circle(150% at 50% 50%)"],
            opacity: [0, 1],
            duration: 1800,
            ease: "cubicBezier(0.22, 1, 0.36, 1)",
          });

          animate(el.querySelector(".cs-heading")!, {
            opacity: [0, 1], translateY: [80, 0],
            duration: 800,
            ease: createSpring({ stiffness: 100, damping: 15 }),
          });

          animate(el.querySelector(".cs-subtitle")!, {
            opacity: [0, 1], translateY: [30, 0],
            duration: 600, delay: 200, ease: "out(3)",
          });

          if (!isMobile) {
            animate(el.querySelectorAll(".cs-image"), {
              opacity: [0, 1], translateX: [-50, 0], rotate: [-5, 0],
              delay: stagger(100, { start: 300 }),
              ease: createSpring({ stiffness: 100, damping: 15 }),
            });
          } else {
            animate(el.querySelector(".cs-slider")!, {
              opacity: [0, 1], scale: [0.9, 1],
              duration: 800, ease: "out(3)",
            });
          }

          animate(el.querySelectorAll(".cs-stat"), {
            opacity: [0, 1], translateX: [-50, 0], rotate: [-5, 0],
            delay: stagger(100, { start: 300 }),
            ease: createSpring({ stiffness: 100, damping: 15 }),
          });

          // SEO card
          const seoCard = el.querySelector(".cs-seo");
          if (seoCard) {
            animate(seoCard, {
              opacity: [0, 1], translateY: [40, 0], scale: [0.9, 1],
              duration: 700, delay: 500, ease: "out(3)",
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
      <div className="bg-wipe absolute inset-0 z-0" style={{ opacity: 0, clipPath: "circle(5% at 50% 50%)", background: `linear-gradient(160deg, hsl(${baxsaaCream}), hsl(36 25% 88%), hsl(${baxsaaMaroon} / 0.15))` }} />
      <div className="absolute inset-0 z-[-1]" style={{ background: `linear-gradient(160deg, hsl(${baxsaaCream}), hsl(36 25% 88%), hsl(${baxsaaMaroon} / 0.15))` }} />

      <div className={`max-w-6xl mx-auto w-full relative z-10 ${isMobile ? 'flex flex-col flex-1' : ''}`}>

        <h2 className="cs-heading text-2xl md:text-5xl font-black tracking-tight text-center" style={{ opacity: 0, color: "hsl(0 0% 15%)", marginBottom: isMobile ? '0.25rem' : '0.75rem' }}>
          The Baxsaa Co.{" "}<span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, hsl(${baxsaaMaroon}), hsl(0 55% 45%))` }}>Success</span>
        </h2>

        <p className="cs-subtitle text-center max-w-2xl mx-auto text-sm md:text-base" style={{ opacity: 0, color: "hsl(0 0% 40%)", marginBottom: isMobile ? '0.75rem' : '1.5rem' }}>
          Grew followers and reach through targeted social campaigns aligned with the marketing funnel.
        </p>

        {isMobile ? (
          <div className="cs-slider flex justify-center flex-1 items-center" style={{ opacity: 0 }}>
            <ParallaxCardSlider slides={sliderImages} accentColor={baxsaaMaroon} />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:gap-6 mb-5 max-w-3xl mx-auto">
            {[baxsaaCreative1, baxsaaCreative2].map((src, i) => (
              <div key={i} className="cs-image aspect-square rounded-2xl overflow-hidden" style={{ opacity: 0 }}>
                <img src={src} alt={`Baxsaa Co. creative ${i + 1}`} loading="lazy" className="w-full h-full object-cover rounded-2xl" />
              </div>
            ))}
          </div>
        )}

        <div className={`flex flex-wrap gap-3 ${isMobile ? 'mt-auto pt-4 justify-start gap-1.5' : 'justify-center mb-8'}`}>
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="cs-stat" style={{ opacity: 0 }}>
                <LiquidGlassCard padding={isMobile ? "0.4rem 0.75rem" : "0.5rem 1rem"} borderRadius="9999px" blur={12} brightness={1.15} backgroundColor="rgba(255, 255, 255, 0.3)">
                  <div className="flex items-center gap-2">
                    <Icon className={`${isMobile ? 'w-3 h-3' : 'w-3.5 h-3.5'}`} style={{ color: `hsl(${baxsaaMaroon})` }} />
                    <span className={`${isMobile ? 'text-xs' : 'text-sm md:text-base'} font-bold`} style={{ color: "hsl(0 0% 15%)" }}>{stat.value}</span>
                    <span className={`${isMobile ? 'text-[9px]' : 'text-[10px] md:text-xs'} font-medium uppercase tracking-wider`} style={{ color: "hsl(0 0% 35%)" }}>{stat.label}</span>
                  </div>
                </LiquidGlassCard>
              </div>
            );
          })}
        </div>

        {!isMobile && (
          <div className="cs-seo max-w-2xl mx-auto" style={{ opacity: 0 }}>
            <LiquidGlassCard padding="1.5rem 2rem" borderRadius="1rem" blur={12} brightness={1.15} backgroundColor="rgba(255, 255, 255, 0.25)">
              <div className="text-center">
                <p className="text-lg md:text-xl font-semibold mb-2" style={{ color: "hsl(0 0% 15%)" }}>SEO Transformation</p>
                <p className="text-sm md:text-base" style={{ color: "hsl(0 0% 40%)" }}>
                  Reduced website errors from <span style={{ color: `hsl(${baxsaaMaroon})` }} className="font-bold">3000+</span> to <span style={{ color: "hsl(145 60% 40%)" }} className="font-bold">0</span> and improved page load time by <span style={{ color: "hsl(145 60% 40%)" }} className="font-bold">34%</span>
                </p>
              </div>
            </LiquidGlassCard>
          </div>
        )}
      </div>
    </section>
  );
};

export default BaxsaaCaseStudy;
