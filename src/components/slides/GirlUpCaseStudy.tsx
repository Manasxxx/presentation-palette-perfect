import { useEffect, useRef, useState } from "react";
import { animate, stagger, createSpring } from "animejs";
import { Eye, Users, TrendingUp, MousePointer, Gauge } from "lucide-react";
import girlupCreative1 from "@/assets/girlup-creative-1.png";
import girlupCreative2 from "@/assets/girlup-creative-2.png";
import { LiquidGlassCard } from "react-liquid-glass-card";
import { useIsMobile } from "@/hooks/use-mobile";
import ParallaxCardSlider from "@/components/ParallaxCardSlider";

const girlUpTeal = "168 100% 36%";
const girlUpPurple = "268 48% 63%";

const stats = [
  { icon: Eye, value: "3.1M", label: "Impressions" },
  { icon: Users, value: "620%", label: "Follower Growth" },
  { icon: TrendingUp, value: "18.7%", label: "Engagement" },
  { icon: MousePointer, value: "52K", label: "Link Clicks" },
  { icon: Gauge, value: "3.8X", label: "ROI" },
];

const sliderImages = [
  { image: girlupCreative1, alt: "Girl Up creative 1" },
  { image: girlupCreative2, alt: "Girl Up creative 2" },
];

const GirlUpCaseStudy = () => {
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
              opacity: [0, 1], translateY: [50, 0], scale: [0.9, 1],
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
            opacity: [0, 1], translateY: [50, 0], scale: [0.9, 1],
            delay: stagger(100, { start: 300 }),
            ease: createSpring({ stiffness: 100, damping: 15 }),
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
      <div className="bg-wipe absolute inset-0 z-0" style={{ opacity: 0, clipPath: "circle(5% at 50% 50%)", background: `linear-gradient(145deg, hsl(${girlUpTeal} / 0.85), hsl(168 60% 22% / 0.7), hsl(${girlUpPurple} / 0.35))` }} />
      <div className="absolute inset-0 z-[-1]" style={{ background: `linear-gradient(145deg, hsl(${girlUpTeal} / 0.85), hsl(168 60% 22% / 0.7), hsl(${girlUpPurple} / 0.35))` }} />

      <div className={`max-w-6xl mx-auto w-full relative z-10 ${isMobile ? 'flex flex-col flex-1' : ''}`}>

        <h2 className="cs-heading text-2xl md:text-5xl font-black tracking-tight text-center text-white" style={{ opacity: 0, marginBottom: isMobile ? '0.25rem' : '0.75rem' }}>
          Girl Up{" "}<span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, hsl(${girlUpTeal}), hsl(${girlUpPurple}))` }}>Success</span>
        </h2>

        <p className="cs-subtitle text-center max-w-2xl mx-auto text-sm md:text-base" style={{ opacity: 0, color: "hsl(168 30% 75%)", marginBottom: isMobile ? '0.75rem' : '1.5rem' }}>
          Amplified youth-led advocacy through vibrant social media content and community-driven engagement strategies.
        </p>

        {isMobile ? (
          <div className="cs-slider flex justify-center flex-1 items-center" style={{ opacity: 0 }}>
            <ParallaxCardSlider slides={sliderImages} accentColor={girlUpTeal} />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:gap-6 mb-5 max-w-3xl mx-auto">
            {[girlupCreative1, girlupCreative2].map((src, i) => (
              <div key={i} className="cs-image rounded-2xl overflow-hidden" style={{ opacity: 0 }}>
                <img src={src} alt={`Girl Up creative ${i + 1}`} loading="lazy" className="w-full h-auto object-contain rounded-2xl" />
              </div>
            ))}
          </div>
        )}

        <div className={`flex flex-wrap gap-3 ${isMobile ? 'mt-auto pt-4 justify-start gap-1.5' : 'justify-center'}`}>
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="cs-stat" style={{ opacity: 0 }}>
                <LiquidGlassCard padding={isMobile ? "0.4rem 0.75rem" : "0.5rem 1rem"} borderRadius="9999px" blur={12} brightness={1.15} backgroundColor="rgba(255, 255, 255, 0.08)">
                  <div className="flex items-center gap-2">
                    <Icon className={`${isMobile ? 'w-3 h-3' : 'w-3.5 h-3.5'}`} style={{ color: `hsl(${girlUpTeal})` }} />
                    <span className={`${isMobile ? 'text-xs' : 'text-sm md:text-base'} font-bold text-white`}>{stat.value}</span>
                    <span className={`${isMobile ? 'text-[9px]' : 'text-[10px] md:text-xs'} font-medium uppercase tracking-wider`} style={{ color: "hsl(168 20% 80%)" }}>{stat.label}</span>
                  </div>
                </LiquidGlassCard>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GirlUpCaseStudy;
