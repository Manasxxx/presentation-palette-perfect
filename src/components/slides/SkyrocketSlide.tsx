import { useEffect, useMemo, useRef, useState } from "react";
import { FlaskConical, GraduationCap, Pill, Warehouse, Zap, ArrowUpRight, Layers, Cpu, Target, type LucideIcon } from "lucide-react";
import { animate, createSpring, stagger } from "animejs";
import Hyperspeed from "@/components/ui/Hyperspeed/Hyperspeed";
import { useIsMobile } from "@/hooks/use-mobile";

type Sector = { label: string; tag: string; icon: LucideIcon };

const sectors: Sector[] = [
  { label: "Chemicals", tag: "Specialty, process, materials", icon: FlaskConical },
  { label: "Industrial", tag: "Manufacturing, equipment, plants", icon: Warehouse },
  { label: "Pharma", tag: "Regulated, clinical, B2B", icon: Pill },
  { label: "Infrastructure", tag: "Power, mobility, built systems", icon: Zap },
  { label: "Institutions", tag: "Education, foundations, public trust", icon: GraduationCap },
];

type Differentiator = { icon: LucideIcon; label: string; desc: string };

const differentiators: Differentiator[] = [
  { icon: Layers, label: "Deck to demand", desc: "Positioning, assets, campaigns, and follow-through." },
  { icon: Cpu, label: "Technical fluency", desc: "We can read the product before we write the pitch." },
  { icon: Target, label: "Buyer proof", desc: "Built around sales conversations, not vanity activity." },
];

const SkyrocketSlide = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);
  const isMobile = useIsMobile();
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
            delay: stagger(120),
            ease: "out(3)",
          });

          animate(el.querySelectorAll(".who-rule"), {
            scaleX: [0, 1],
            duration: 800,
            delay: 200,
            ease: "out(3)",
          });

          animate(el.querySelectorAll(".who-word"), {
            opacity: [0, 1],
            translateY: [28, 0],
            delay: stagger(90, { start: 240 }),
            duration: 900,
            ease: createSpring({ stiffness: 95, damping: 12 }),
          });

          animate(el.querySelector(".who-title-accent")!, {
            translateX: [-24, 0],
            filter: ["blur(10px)", "blur(0px)"],
            duration: 900,
            delay: 460,
            ease: "out(4)",
          });

          animate(el.querySelectorAll(".who-copy"), {
            opacity: [0, 1],
            translateY: [22, 0],
            delay: stagger(110, { start: 520 }),
            duration: 760,
            ease: "out(3)",
          });

          animate(el.querySelectorAll(".who-chip"), {
            opacity: [0, 1],
            scale: [0.85, 1],
            delay: stagger(70, { start: 640 }),
            duration: 560,
            ease: createSpring({ stiffness: 130, damping: 14 }),
          });

          animate(el.querySelectorAll(".who-sector"), {
            opacity: [0, 1],
            translateX: [40, 0],
            delay: stagger(90, { start: 560 }),
            duration: 760,
            ease: "out(4)",
          });
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [triggered]);

  return (
    <section ref={sectionRef} className="slide relative overflow-hidden bg-background p-3 sm:p-5 md:p-7">
      {/* Background running lines — desktop only (heavy WebGL gated off mobile per prod.md) */}
      {!isMobile && (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-70">
          <Hyperspeed effectOptions={hyperspeedOptions} />
        </div>
      )}
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_30%,rgba(75,194,194,0.16),transparent_46%),linear-gradient(180deg,hsl(214_30%_5%/0.86),hsl(214_30%_6%/0.62)_50%,hsl(214_30%_5%/0.9))]" />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1640px] flex-col justify-start gap-5 px-6 py-5 sm:px-10 md:justify-center md:gap-12 md:px-[4.5%] md:py-[4.4%]">
        {/* TOP — the message (left) + where we work (right) */}
        <div className="grid gap-5 md:grid-cols-12 md:items-start md:gap-14 lg:gap-20">
          {/* message */}
          <div className="md:col-span-7">
            <div className="who-kicker flex items-center gap-3 font-sans font-black uppercase text-owl-teal text-[10px] tracking-[0.24em] md:text-xs md:tracking-[0.3em]" style={{ opacity: 0 }}>
              <span className="who-rule h-px w-10 origin-left bg-owl-teal/80 md:w-14" />
                What we understand
              <span className="ml-1 font-sans text-white/30">/ 02</span>
            </div>

            <h2 className="mt-4 font-sans font-black leading-[0.98] text-white drop-shadow-[0_0_36px_rgba(75,194,194,0.16)] text-[2rem] sm:text-[2.5rem] md:mt-9 md:text-[clamp(2.7rem,5.6vw,5.4rem)]">
              <span className="who-word block">
                <span className="font-sans not-italic">Long sales.</span>
              </span>
              <span className="who-word block">
                <span className="font-sans not-italic">Technical </span>
                <span className="who-title-accent font-serif italic text-owl-teal inline-block pr-2">buyers.</span>
              </span>
            </h2>

            <p className="who-copy mt-3 max-w-[520px] font-body leading-[1.5] text-white/70 text-sm md:mt-9 md:text-[clamp(1rem,1.15vw,1.3rem)]" style={{ opacity: 0 }}>
              We turn dense product truth into market-facing clarity for teams selling into plants, labs, factories, institutions, and procurement rooms.
            </p>
          </div>

          {/* where we work */}
          <div className="md:col-span-5 md:border-l md:border-white/10 md:pl-12 lg:pl-16">
            <div className="who-kicker flex items-center gap-3" style={{ opacity: 0 }}>
              <span className="who-rule h-px w-10 origin-left bg-owl-teal/70" />
              <span className="font-sans text-[10px] font-black uppercase tracking-[0.22em] text-owl-teal md:text-xs md:tracking-[0.26em]">
                Priority sectors
              </span>
            </div>

            <div className="mt-4 flex flex-col md:mt-6">
              {sectors.map((sector) => {
                const Icon = sector.icon;
                return (
                  <div
                    key={sector.label}
                    className="who-sector group flex items-center gap-4 border-b border-white/10 py-2.5 transition-colors duration-300 first:border-t hover:border-owl-teal/40 md:py-4"
                    style={{ opacity: 0 }}
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-owl-teal/10 text-owl-teal transition-colors duration-300 group-hover:bg-owl-teal/20 md:h-11 md:w-11">
                      <Icon className="h-[1.2rem] w-[1.2rem]" strokeWidth={1.8} />
                    </span>
                    <span className="flex min-w-0 flex-col">
                      <span className="font-sans text-base font-black leading-tight text-white">
                        {sector.label}
                      </span>
                      <span className="font-body text-xs leading-tight text-white/45 md:text-[0.8rem]">
                        {sector.tag}
                      </span>
                    </span>
                    <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 -translate-x-1 text-white/0 transition-colors duration-300 group-hover:translate-x-0 group-hover:text-owl-teal" strokeWidth={2} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* BOTTOM — what makes us different (full width) */}
        <div className="border-t border-white/10 pt-4 md:pt-9">
          <div className="who-copy mb-3 flex items-center gap-3 md:mb-6" style={{ opacity: 0 }}>
            <span className="who-rule h-px w-10 origin-left bg-owl-teal/70" />
            <span className="font-sans text-[10px] font-black uppercase tracking-[0.22em] text-owl-teal md:text-xs md:tracking-[0.26em]">
              Why this replaces the PDF
            </span>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-1 sm:grid sm:grid-cols-3 sm:overflow-visible sm:pb-0 md:gap-6">
            {differentiators.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="who-chip group relative flex min-w-[78%] shrink-0 items-start gap-4 overflow-hidden rounded-xl border border-white/10 bg-white/[0.035] p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-owl-teal/45 hover:bg-owl-teal/[0.06] hover:shadow-[0_10px_30px_rgba(75,194,194,0.16)] sm:min-w-0 sm:p-5"
                  style={{ opacity: 0 }}
                >
                  <span className="pointer-events-none absolute left-0 top-0 h-full w-[3px] bg-owl-teal/0 transition-colors duration-300 group-hover:bg-owl-teal" />
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-owl-teal/30 bg-owl-teal/12 text-owl-teal transition-colors duration-300 group-hover:bg-owl-teal/20">
                    <Icon className="h-[1.25rem] w-[1.25rem]" strokeWidth={1.9} />
                  </span>
                  <span className="flex min-w-0 flex-col gap-1">
                    <span className="font-sans text-[0.95rem] font-black uppercase leading-tight tracking-tight text-white">
                      {item.label}
                    </span>
                    <span className="font-body text-sm leading-snug text-white/55">
                      {item.desc}
                    </span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkyrocketSlide;
