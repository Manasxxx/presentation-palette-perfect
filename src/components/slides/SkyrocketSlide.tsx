import { useEffect, useMemo, useRef, useState } from "react";
import { Factory, FlaskConical, GraduationCap, Pill, Warehouse, Zap } from "lucide-react";
import { animate, createSpring, stagger } from "animejs";
import Hyperspeed from "@/components/ui/Hyperspeed/Hyperspeed";

const sectors = [
  { label: "Chemicals", icon: FlaskConical },
  { label: "Manufacturing", icon: Factory },
  { label: "Pharma", icon: Pill },
  { label: "Energy", icon: Zap },
  { label: "Infrastructure", icon: Warehouse },
  { label: "Education", icon: GraduationCap },
];

const SkyrocketSlide = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);
  const hyperspeedOptions = useMemo(
    () => ({
      onSpeedUp: () => { },
      onSlowDown: () => { },
      distortion: "turbulentDistortion",
      length: 400,
      roadWidth: 10,
      islandWidth: 2,
      lanesPerRoad: 3,
      fov: 90,
      fovSpeedUp: 150,
      speedUp: 2,
      carLightsFade: 0.4,
      totalSideLightSticks: 20,
      lightPairsPerRoadWay: 40,
      shoulderLinesWidthPercentage: 0.05,
      brokenLinesWidthPercentage: 0.1,
      brokenLinesLengthPercentage: 0.5,
      lightStickWidth: [0.12, 0.5] as [number, number],
      lightStickHeight: [1.3, 1.7] as [number, number],
      movingAwaySpeed: [60, 80] as [number, number],
      movingCloserSpeed: [-120, -160] as [number, number],
      carLightsLength: [400 * 0.03, 400 * 0.2] as [number, number],
      carLightsRadius: [0.05, 0.14] as [number, number],
      carWidthPercentage: [0.3, 0.5] as [number, number],
      carShiftX: [-0.8, 0.8] as [number, number],
      carFloorSeparation: [0, 5] as [number, number],
      colors: {
        roadColor: 0x080808,
        islandColor: 0x0a0a0a,
        background: 0x000000,
        shoulderLines: 0x131318,
        brokenLines: 0x131318,
        leftCars: [0x4bc2c2, 0x2dd4bf, 0x14b8a6],
        rightCars: [0x0f766e, 0x115e59, 0x134e4a],
        sticks: 0x4bc2c2,
      },
    }),
    []
  );

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          setTriggered(true);

          animate(el.querySelectorAll(".who-kicker"), {
            opacity: [0, 1],
            translateY: [16, 0],
            duration: 600,
            ease: "out(3)",
          });

          animate(el.querySelectorAll(".who-rule"), {
            scaleX: [0, 1],
            duration: 800,
            delay: 250,
            ease: "out(3)",
          });

          animate(el.querySelectorAll(".who-copy"), {
            opacity: [0, 1],
            translateY: [22, 0],
            delay: stagger(110, { start: 350 }),
            duration: 750,
            ease: "out(3)",
          });

          animate(el.querySelectorAll(".who-sector"), {
            opacity: [0, 1],
            translateY: [18, 0],
            delay: stagger(80, { start: 700 }),
            duration: 700,
            ease: createSpring({ stiffness: 120, damping: 15 }),
          });
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [triggered]);

  return (
    <section ref={sectionRef} className="slide relative overflow-hidden bg-background p-3 sm:p-5 md:p-7">
      <div className="absolute inset-0 z-0 pointer-events-none opacity-45">
        <Hyperspeed effectOptions={hyperspeedOptions} />
      </div>
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_78%_48%,rgba(75,194,194,0.12),transparent_26%),linear-gradient(90deg,hsl(214_30%_6%/0.97),hsl(214_30%_6%/0.9)_54%,hsl(214_30%_6%/0.78))]" />

      <div className="relative z-10 h-full w-full max-w-[1720px] overflow-hidden border border-white/10 bg-[#090d12]/92 shadow-2xl">
        <div className="absolute left-[5.6%] top-[6.2%] z-30 flex items-center gap-4">
          <span className="h-2.5 w-2.5 rounded-full bg-owl-teal shadow-[0_0_18px_rgba(75,194,194,0.75)]" />
          <span className="font-sans text-[10px] font-black uppercase tracking-[0.46em] text-white/45 md:text-xs">
            Owlsurf Digital
          </span>
        </div>

        <div className="absolute right-[5.9%] top-[6.5%] z-30 hidden text-right md:block">
          <div className="font-sans text-[11px] font-black uppercase tracking-[0.42em] text-white/45 md:text-sm">
            <span className="text-white/75">02</span> / 05
          </div>
          <div className="mt-4 flex items-center justify-end gap-3">
            <span className="h-px w-10 bg-owl-teal/50" />
            <span className="font-sans text-[10px] font-black uppercase tracking-[0.42em] text-white/35 md:text-xs">
              Built For Industry
            </span>
          </div>
        </div>

        <div className="relative z-20 hidden h-full w-[54%] max-w-[960px] flex-col justify-between px-[6.1%] pb-[6.6%] pt-[18.2%] md:flex">
          <IntroBlock />
          <SectorsBlock />
        </div>

        <div className="absolute bottom-[8%] right-[8%] hidden h-px w-[34%] bg-white/10 md:block" />
        <div className="absolute bottom-[6.6%] right-[6.2%] z-30 hidden font-sans text-[11px] font-black uppercase tracking-[0.44em] text-white/35 md:block md:text-sm">
          www.owlsurf.com
        </div>
        <div className="absolute right-[10%] top-[24%] hidden h-[46%] w-[36%] opacity-30 md:block [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:86px_86px]" />

        <div className="absolute inset-x-6 top-[15%] z-20 md:hidden">
          <IntroBlock mobile />
        </div>

        <div className="absolute inset-x-6 bottom-5 z-30 md:hidden">
          <SectorsBlock mobile />
        </div>
      </div>
    </section>
  );
};

const IntroBlock = ({ mobile = false }: { mobile?: boolean }) => (
  <>
    <div className={`who-kicker flex items-center gap-4 ${mobile ? "mb-5" : "mb-8"}`} style={{ opacity: 0 }}>
      <span className={`${mobile ? "w-9" : "w-12"} h-px bg-owl-teal/60`} />
      <span className="font-sans text-[10px] font-black uppercase tracking-[0.32em] text-owl-teal md:text-xs">01</span>
      <span className="font-sans text-[10px] font-black uppercase tracking-[0.38em] text-white md:text-xs">
        Introduction
      </span>
    </div>

    <div className={`who-rule origin-left bg-owl-orange ${mobile ? "mt-5 h-1 w-16" : "mt-8 h-1.5 w-[96px]"}`} style={{ transform: "scaleX(0)" }} />

    <div className={`who-copy ${mobile ? "mt-8 h-56" : "mt-12 h-[28rem] max-w-[780px]"}`} style={{ opacity: 0 }} />
  </>
);

const SectorsBlock = ({ mobile = false }: { mobile?: boolean }) => (
  <>
    <div className={`${mobile ? "mb-4" : "mb-4"} h-px w-full bg-white/10`} />
    <div className={`${mobile ? "mb-4" : "mb-5"} flex items-center gap-3`}>
      <span className={`${mobile ? "w-8" : "w-10"} h-px bg-owl-teal/70`} />
      <span className={`font-sans font-black text-owl-teal ${mobile ? "text-[9px] tracking-[0.18em]" : "text-[10px] tracking-[0.22em] md:text-xs"}`}>
        Sectors We Serve
      </span>
    </div>
    <div className={`grid ${mobile ? "grid-cols-2 gap-3" : "grid-cols-3 gap-x-8 gap-y-3"}`}>
      {(mobile ? sectors.slice(0, 4) : sectors).map((sector) => {
        const Icon = sector.icon;
        return (
          <div key={sector.label} className="who-sector flex min-w-0 items-center gap-4" style={{ opacity: 0 }}>
            <span className={`${mobile ? "h-8 w-8" : "h-9 w-9"} flex shrink-0 items-center justify-center rounded-md border border-white/45 bg-transparent text-white/85`}>
              <Icon className={mobile ? "h-4 w-4" : "h-4 w-4"} strokeWidth={1.8} />
            </span>
            <span className={`font-sans font-black text-white ${mobile ? "text-sm" : "text-[clamp(0.78rem,0.88vw,1rem)]"}`}>
              {sector.label}
            </span>
          </div>
        );
      })}
    </div>
    {!mobile && (
      <div className="mt-5 font-sans text-[11px] font-black uppercase tracking-[0.44em] text-white/35 md:text-sm">
        Portfolio &amp; Credentials
      </div>
    )}
  </>
);

export default SkyrocketSlide;
