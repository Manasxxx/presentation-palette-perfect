import { useEffect, useRef, useState } from "react";
import { animate, createSpring, stagger } from "animejs";
import ParallaxCardSlider from "@/components/ParallaxCardSlider";
import { useIsMobile } from "@/hooks/use-mobile";

type SlideImage = {
  image: string;
  alt: string;
};

type ProofStat = {
  value: string;
  label: string;
};

type CaseStudyLayoutProps = {
  caseNumber: string;
  title: string;
  accentTitle: string;
  subtitle: string;
  slides: SlideImage[];
  stats?: ProofStat[];
  accentColor: string;
  secondaryColor: string;
  background: string;
  lightMode?: boolean;
};

const CaseStudyLayout = ({
  caseNumber,
  title,
  accentTitle,
  subtitle,
  slides,
  stats = [],
  accentColor,
  secondaryColor,
  background,
  lightMode = false,
}: CaseStudyLayoutProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [triggered, setTriggered] = useState(false);
  const isMobile = useIsMobile();
  const ink = lightMode ? "hsl(0 0% 15%)" : "white";
  const muted = lightMode ? "hsl(0 0% 36%)" : "hsl(0 0% 100% / 0.7)";
  const statBorder = lightMode ? "hsl(0 0% 0% / 0.14)" : "hsl(0 0% 100% / 0.18)";
  const statInk = lightMode ? "hsl(0 0% 15%)" : "white";

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
            opacity: [0, 1],
            translateY: [70, 0],
            scale: [0.94, 1],
            delay: stagger(80),
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

          animate(el.querySelector(".cs-subtitle")!, {
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 600,
            delay: 280,
            ease: "out(3)",
          });

          animate(el.querySelector(".cs-slider")!, {
            opacity: [0, 1],
            scale: [0.78, 1.04, 1],
            translateX: [180, -18, 0],
            rotate: [6, -1, 0],
            duration: 1350,
            delay: 360,
            ease: "out(4)",
          });

          animate(el.querySelectorAll(".cs-stat"), {
            opacity: [0, 1],
            translateY: [24, 0],
            scale: [0.96, 1],
            delay: stagger(90, { start: 520 }),
            duration: 760,
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
    <section ref={sectionRef} className="slide overflow-hidden relative bg-background">
      <div
        className="bg-wipe absolute inset-0 z-0"
        style={{ opacity: 0, clipPath: "circle(5% at 50% 50%)", background }}
      />
      <div className="absolute inset-0 z-[-1]" style={{ background }} />

      <div className="relative z-10 flex h-full w-full flex-col gap-8 px-6 pt-20 pb-8 md:block md:px-12 md:pt-24 md:pb-14">
        <header className="text-left md:absolute md:left-12 md:top-24 md:w-[30%] lg:w-[28%]">
          <span
            className="cs-heading text-[10px] md:text-xs tracking-[0.3em] font-medium mb-3 block uppercase"
            style={{ opacity: 0, color: `hsl(${accentColor})` }}
          >
            Case study {caseNumber}
          </span>
          <h2
            className="cs-heading font-sans text-[clamp(2.45rem,4vw,4.8rem)] font-black uppercase leading-[0.95] tracking-normal text-left pb-2"
            style={{ opacity: 0, color: ink }}
          >
            <span className="font-sans not-italic block">{title}</span>
            <span
              className="cs-title-accent font-sans not-italic bg-clip-text text-transparent inline-block pr-2"
              style={{ backgroundImage: `linear-gradient(135deg, hsl(${accentColor}), hsl(${secondaryColor}))` }}
            >
              {accentTitle}
            </span>
          </h2>
          <p
            className="cs-subtitle mt-3 font-body leading-snug text-base md:text-[1.05rem] max-w-md"
            style={{ opacity: 0, color: muted }}
          >
            {subtitle}
          </p>
        </header>

        {stats.length > 0 && (
          <div className="cs-stats grid grid-cols-2 gap-x-4 gap-y-3 md:absolute md:right-12 md:top-[8.45rem] md:w-[52%] md:grid-cols-5 md:gap-x-4 lg:w-[50%]">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="cs-stat flex min-w-0 flex-col items-center border-t pt-3 text-center"
                style={{ opacity: 0, borderColor: statBorder }}
              >
                <div
                  className="flex h-11 items-center justify-center gap-1.5 font-sans tabular-nums text-[clamp(1.55rem,2.05vw,2.4rem)] font-black leading-none tracking-normal"
                  style={{ color: statInk }}
                >
                  {stat.value}
                </div>
                <div
                  className="mt-2 flex min-h-7 w-full max-w-[10.5rem] items-center justify-center rounded-full border px-2.5 py-1 text-center font-body text-[10px] font-semibold uppercase leading-[1.05] tracking-[0.08em] md:text-[9px] lg:text-[10px]"
                  style={{
                    color: lightMode ? "hsl(0 0% 18% / 0.92)" : "hsl(0 0% 100% / 0.92)",
                    backgroundColor: `hsl(${accentColor} / 0.15)`,
                    borderColor: `hsl(${accentColor} / 0.3)`,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex min-h-0 min-w-0 flex-1 items-center justify-center self-center md:absolute md:bottom-[6%] md:left-1/2 md:top-[36%] md:w-[78%] md:-translate-x-1/2">
          <div className="cs-slider flex h-full w-full items-center justify-center" style={{ opacity: 0 }}>
            <ParallaxCardSlider
              slides={slides}
              accentColor={accentColor}
              cardWidth={isMobile ? undefined : "min(24vw, 320px)"}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudyLayout;
