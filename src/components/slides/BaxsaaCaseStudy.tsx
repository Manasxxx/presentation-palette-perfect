import { useEffect, useRef, useState } from "react";
import { animate, stagger, createSpring } from "animejs";
import { Eye, Users, Share2, Smartphone, Zap } from "lucide-react";
import baxsaaCreative1 from "@/assets/baxsaa-creative-1.png";
import baxsaaCreative2 from "@/assets/baxsaa-creative-2.webp";
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
const baxsaaMaroonLight = "0 55% 45%";
const baxsaaCream = "36 33% 93%";
const baxsaaInk = "0 0% 15%";
const baxsaaInkMuted = "0 0% 38%";

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

          animate(el.querySelectorAll(".cs-heading"), {
            opacity: [0, 1], translateY: [70, 0], scale: [0.94, 1],
            delay: stagger(80),
            duration: 900, ease: createSpring({ stiffness: 95, damping: 12 }),
          });

          animate(el.querySelector(".cs-title-accent")!, {
            translateX: [-26, 0],
            filter: ["blur(10px)", "blur(0px)"],
            duration: 900,
            delay: 160,
            ease: "out(4)",
          });

          animate(el.querySelector(".cs-subtitle")!, {
            opacity: [0, 1], translateY: [30, 0],
            duration: 600, delay: 280, ease: "out(3)",
          });

          if (!isMobile) {
            animate(el.querySelectorAll(".cs-image"), {
              opacity: [0, 1], translateY: [58, -10, 0], scale: [0.84, 1.04, 1], rotate: [-4, 1, 0],
              delay: stagger(120, { start: 400 }),
              duration: 1200, ease: "out(4)",
            });
          } else {
            animate(el.querySelector(".cs-slider")!, {
              opacity: [0, 1], scale: [0.78, 1.04, 1], translateX: [120, -12, 0], rotate: [5, -1, 0],
              duration: 1250, delay: 350, ease: "out(4)",
            });
          }

          animate(el.querySelector(".cs-scan-line")!, {
            scaleX: [0, 1, 0],
            transformOrigin: ["0% 50%", "0% 50%", "100% 50%"],
            opacity: [0, 0.75, 0],
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

          animate(el.querySelectorAll(".cs-stat"), {
            opacity: [0, 1], translateY: [30, 0],
            delay: stagger(80, { start: 600 }),
            ease: createSpring({ stiffness: 110, damping: 16 }),
          });
          animate(el.querySelectorAll(".cs-stat-icon"), {
            scale: [0.6, 1.28, 1],
            filter: [
              `drop-shadow(0 0 0 hsl(${baxsaaMaroon} / 0))`,
              `drop-shadow(0 0 12px hsl(${baxsaaMaroon} / 0.42))`,
              `drop-shadow(0 0 0 hsl(${baxsaaMaroon} / 0))`,
            ],
            delay: stagger(90, { start: 720 }),
            duration: 850,
            ease: "out(4)",
          });

          const seoCard = el.querySelector(".cs-seo");
          if (seoCard) {
            animate(seoCard, {
              opacity: [0, 1], translateY: [40, 0],
              duration: 700, delay: 800, ease: "out(3)",
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
    <section ref={sectionRef} className="slide overflow-hidden relative">
      <div
        className="bg-wipe absolute inset-0 z-0"
        style={{ opacity: 0, clipPath: "circle(5% at 50% 50%)", background: `linear-gradient(160deg, hsl(${baxsaaCream}), hsl(36 25% 88%), hsl(${baxsaaMaroon} / 0.15))` }}
      />
      <div className="absolute inset-0 z-[-1]" style={{ background: `linear-gradient(160deg, hsl(${baxsaaCream}), hsl(36 25% 88%), hsl(${baxsaaMaroon} / 0.15))` }} />
      <div
        className="cs-scan-line pointer-events-none absolute left-0 top-[52%] z-[1] h-px w-full"
        style={{ opacity: 0, transform: "scaleX(0)", background: `linear-gradient(90deg, transparent, hsl(${baxsaaMaroon}), transparent)` }}
      />
      <div
        className="cs-glow-orbit pointer-events-none absolute right-[18%] top-[20%] z-[1] h-[44%] w-[34%] rounded-full"
        style={{
          opacity: 0,
          border: `1px solid hsl(${baxsaaMaroon} / 0.18)`,
          boxShadow: `0 0 80px -36px hsl(${baxsaaMaroon} / 0.7), inset 0 0 70px -54px hsl(${baxsaaMaroon} / 0.65)`,
        }}
      />

      <div className="relative z-10 flex h-full w-full flex-col px-6 pt-20 pb-8 md:px-12 md:pt-20 md:pb-12 gap-6 md:gap-8">

        {/* HEADER */}
        <header className="text-center max-w-5xl mx-auto w-full">
          <span
            className="cs-heading text-[10px] md:text-xs tracking-[0.3em] font-medium mb-3 block uppercase"
            style={{ opacity: 0, color: `hsl(${baxsaaMaroon})` }}
          >
            Case study 02
          </span>
          <h2
            className="cs-heading font-sans text-[clamp(2.6rem,4.6vw,5.2rem)] font-black uppercase leading-[0.95] tracking-normal text-center pb-1"
            style={{ opacity: 0, color: `hsl(${baxsaaInk})` }}
          >
            <span className="font-sans not-italic">The Baxsaa </span>
            <span
              className="cs-title-accent font-sans not-italic bg-clip-text text-transparent inline-block pr-2"
              style={{ backgroundImage: `linear-gradient(135deg, hsl(${baxsaaMaroon}), hsl(${baxsaaMaroonLight}))` }}
            >
              Co.
            </span>
          </h2>
          <p
            className="cs-subtitle mt-3 md:mt-4 font-body leading-snug text-base md:text-lg max-w-xl mx-auto"
            style={{ opacity: 0, color: `hsl(${baxsaaInkMuted})` }}
          >
            D2C beauty. Grew the audience. Sharpened the funnel.
          </p>
        </header>

        {/* CREATIVES */}
        {isMobile ? (
          <div className="cs-slider flex justify-center flex-1 items-center" style={{ opacity: 0 }}>
            <ParallaxCardSlider slides={sliderImages} accentColor={baxsaaMaroon} />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto w-full">
            {[baxsaaCreative1, baxsaaCreative2].map((src, i) => (
              <div
                key={i}
                className="cs-image aspect-square rounded-2xl overflow-hidden shadow-[0_18px_48px_-24px_rgba(120,30,30,0.45)] ring-1"
                style={{ opacity: 0, ['--tw-ring-color' as never]: `hsl(${baxsaaMaroon} / 0.18)` } as React.CSSProperties}
              >
                <img
                  src={src}
                  alt={`Baxsaa Co. creative ${i + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}

        {/* STATS */}
        <div className="flex flex-wrap justify-center gap-2.5 md:gap-3">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="cs-stat flex items-center gap-2.5 rounded-full px-4 py-2 md:px-5 md:py-2.5"
                style={{
                  opacity: 0,
                  backgroundColor: "rgba(255, 255, 255, 0.55)",
                  border: `1px solid hsl(${baxsaaMaroon} / 0.18)`,
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                }}
              >
                <Icon className="cs-stat-icon w-3.5 h-3.5 md:w-4 md:h-4" style={{ color: `hsl(${baxsaaMaroon})` }} />
                <span className="font-sans text-sm md:text-base font-black tracking-tight" style={{ color: `hsl(${baxsaaInk})` }}>
                  {stat.value}
                </span>
                <span className="font-body text-[10px] md:text-[11px] uppercase tracking-[0.18em] font-medium" style={{ color: `hsl(${baxsaaInkMuted})` }}>
                  {stat.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* SEO CARD */}
        {!isMobile && (
          <div
            className="cs-seo max-w-2xl mx-auto w-full rounded-2xl px-8 py-5 text-center"
            style={{
              opacity: 0,
              backgroundColor: "rgba(255, 255, 255, 0.45)",
              border: `1px solid hsl(${baxsaaMaroon} / 0.2)`,
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
          >
            <span
              className="text-[10px] md:text-xs tracking-[0.3em] font-medium block uppercase mb-2"
              style={{ color: `hsl(${baxsaaMaroon})` }}
            >
              SEO clean-up
            </span>
            <p className="font-body text-base md:text-lg leading-snug" style={{ color: `hsl(${baxsaaInkMuted})` }}>
              <span className="font-sans font-black" style={{ color: `hsl(${baxsaaMaroon})` }}>3,000+</span>
              {" errors → "}
              <span className="font-sans font-black" style={{ color: "hsl(145 60% 35%)" }}>zero</span>
              {". Page load down "}
              <span className="font-sans font-black" style={{ color: "hsl(145 60% 35%)" }}>34%</span>
              {"."}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BaxsaaCaseStudy;
