import { useEffect, useMemo, useRef, useState } from "react";
import { FlaskConical, GraduationCap, Pill, Warehouse, Zap } from "lucide-react";
import { animate, createSpring, stagger } from "animejs";
import Hyperspeed from "@/components/ui/Hyperspeed/Hyperspeed";
import industrialEngineerImage from "@/assets/industrial-engineer-slide-2.png";

const sectors = [
  { label: "Chemicals", icon: FlaskConical },
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

          animate(el.querySelectorAll(".who-word"), {
            opacity: [0, 1],
            translateX: [-28, 0],
            delay: stagger(90, { start: 420 }),
            duration: 900,
            ease: "out(4)",
          });

          animate(el.querySelectorAll(".who-sector"), {
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
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_63%_50%,rgba(75,194,194,0.18),transparent_34%),linear-gradient(90deg,hsl(214_30%_6%/0.98),hsl(214_30%_6%/0.92)_48%,hsl(182_70%_18%/0.38))]" />

      <div className="relative z-10 h-full w-full max-w-[1720px] overflow-hidden bg-[#090d12]/92 shadow-2xl">
        <div className="absolute inset-y-0 right-0 z-10 hidden w-[58%] overflow-hidden md:block">
          <img
            src={industrialEngineerImage}
            alt=""
            className="h-full w-full origin-right translate-x-[23%] scale-[1.72] object-contain object-right opacity-90 mix-blend-screen"
            loading="lazy"
          />
        </div>

        <div className="relative z-30 hidden h-full w-[54%] max-w-[960px] flex-col justify-end px-[3.8%] pb-[3.2%] md:flex">
          <IntroBlock />
          <SectorsBlock />
        </div>

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
    <div className={`who-copy flex flex-col ${mobile ? "h-[31rem]" : "h-[31rem] max-w-[960px] pb-7"}`} style={{ opacity: 0 }}>
      <div className={`who-kicker mb-8 flex items-center gap-3 font-sans font-black uppercase text-owl-teal ${mobile ? "text-[10px] tracking-[0.2em]" : "text-xs tracking-[0.28em]"}`}>
        <span className={`${mobile ? "w-8" : "w-12"} who-rule h-px origin-left bg-owl-teal/80`} />
        B2B demand for complex markets
      </div>
      <div className={`font-sans font-black uppercase leading-[0.78] text-white drop-shadow-[0_0_34px_rgba(75,194,194,0.16)] ${mobile ? "text-[3.4rem]" : "text-[clamp(5.3rem,7.6vw,8.8rem)]"}`}>
        <span className="who-word block whitespace-nowrap">
          WHO <span className="text-gradient-green">WE</span>
        </span>
        <span className="who-word block">ARE?</span>
      </div>
      <div className={`mt-auto max-w-[860px] font-body font-semibold leading-[1.28] text-white ${mobile ? "text-2xl" : "mb-[3.1rem] text-[clamp(2.2rem,2.86vw,3.4rem)]"}`}>
        We translate{" "}
        <HighlightPhrase>technical depth</HighlightPhrase>{" "}
        into{" "}
        <HighlightPhrase tilt="right">market momentum.</HighlightPhrase>
      </div>
    </div>
  </>
);

const HighlightPhrase = ({
  children,
  tilt = "left",
}: {
  children: string;
  tilt?: "left" | "right";
}) => (
  <span className="relative inline-block whitespace-nowrap px-[0.6em] py-[0.1em] font-serif italic font-semibold text-[#061112]">
    <svg
      className={`absolute -inset-x-[0.5em] -bottom-[0.36em] -top-[0.24em] -z-10 h-[2.18em] w-[calc(100%+1em)] ${
        tilt === "left" ? "-rotate-1" : "rotate-1"
      }`}
      viewBox="0 0 240 64"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M9 34 C33 20 71 16 116 19 C158 22 199 15 230 25 C218 44 173 48 125 45 C80 42 36 51 9 34 Z"
        fill="rgba(75,194,194,0.96)"
      />
      <path
        d="M14 39 C52 27 94 31 135 26 C176 22 208 26 232 35"
        fill="none"
        stroke="rgba(125,216,216,0.76)"
        strokeLinecap="round"
        strokeWidth="10"
      />
      <path
        d="M18 30 C55 18 94 22 138 20 C180 18 209 20 228 28"
        fill="none"
        stroke="rgba(45,158,158,0.62)"
        strokeLinecap="round"
        strokeWidth="7"
      />
    </svg>
    <span className="relative z-10">{children}</span>
  </span>
);

const SectorsBlock = ({ mobile = false }: { mobile?: boolean }) => (
  <>
    <div className={`${mobile ? "mb-4" : "mb-5"} h-px w-full bg-white/10`} />
    <div className={`${mobile ? "mb-4" : "mb-6"} flex items-center gap-3`}>
      <span className={`${mobile ? "w-8" : "w-10"} h-px bg-owl-teal/70`} />
      <span className={`font-sans font-black text-owl-teal ${mobile ? "text-[9px] tracking-[0.18em]" : "text-[10px] tracking-[0.22em] md:text-xs"}`}>
        Sectors We Serve
      </span>
    </div>
    <div className={`grid ${mobile ? "grid-cols-1 gap-3" : "grid-cols-3 gap-x-10 gap-y-5"}`}>
      {(mobile ? sectors : sectors).map((sector) => {
        const Icon = sector.icon;
        return (
          <div key={sector.label} className="who-sector flex min-w-0 items-center gap-4">
            <span className={`${mobile ? "h-10 w-10" : "h-12 w-12"} flex shrink-0 items-center justify-center rounded-md border border-white/45 bg-transparent text-white/90`}>
              <Icon className={mobile ? "h-5 w-5" : "h-[1.35rem] w-[1.35rem]"} strokeWidth={1.8} />
            </span>
            <span className={`font-sans font-black leading-tight text-white ${mobile ? "text-sm" : "text-[clamp(0.92rem,1vw,1.12rem)]"}`}>
              {sector.label}
            </span>
          </div>
        );
      })}
    </div>
  </>
);

export default SkyrocketSlide;
