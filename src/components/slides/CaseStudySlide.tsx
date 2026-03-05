import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Eye, Users, TrendingUp, MousePointer, Gauge, LucideIcon } from "lucide-react";
import { animate } from "animejs";
import mitsuiCreative1 from "@/assets/mitsui-creative-1.png";
import mitsuiCreative2 from "@/assets/mitsui-creative-2.png";
import mitsuiCreative3 from "@/assets/mitsui-creative-3.png";
import mitsuiCreative4 from "@/assets/mitsui-creative-4.png";
import ParallaxCardSlider from "@/components/ParallaxCardSlider";
import { LiquidGlassCard } from "react-liquid-glass-card";
import { useIsMobile } from "@/hooks/use-mobile";

interface StatDef {
  icon: LucideIcon;
  rawValue: string;
  label: string;
  num: number;
  suffix: string;
  decimals: number;
}

const statDefs: StatDef[] = [
  { icon: Eye, rawValue: "5.8M", label: "Impressions", num: 5.8, suffix: "M", decimals: 1 },
  { icon: Users, rawValue: "1000%", label: "Follower Growth", num: 1000, suffix: "%", decimals: 0 },
  { icon: TrendingUp, rawValue: "99.2%", label: "Engagement ↑", num: 99.2, suffix: "%", decimals: 1 },
  { icon: MousePointer, rawValue: "104K", label: "Ad Clicks", num: 104, suffix: "K", decimals: 0 },
  { icon: Gauge, rawValue: "3X", label: "ROI", num: 3, suffix: "X", decimals: 0 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring" as const, stiffness: 100 }
  }
};

const mitsuiBlue = "210 100% 30%";
const mitsuiCyan = "193 100% 42%";

const sliderImages = [
  { image: mitsuiCreative1, alt: "Mitsui Chemicals creative 1" },
  { image: mitsuiCreative2, alt: "Mitsui Chemicals creative 2" },
  { image: mitsuiCreative3, alt: "Mitsui Chemicals creative 3" },
  { image: mitsuiCreative4, alt: "Mitsui Chemicals creative 4" },
];

function AnimatedStatValue({ num, suffix, decimals, triggered }: { num: number; suffix: string; decimals: number; triggered: boolean }) {
  const [display, setDisplay] = useState("0" + suffix);
  const objRef = useRef({ value: 0 });

  useEffect(() => {
    if (!triggered) return;
    objRef.current.value = 0;
    animate(objRef.current, {
      value: [0, num],
      duration: 2000,
      ease: "outExpo",
      onUpdate: () => {
        setDisplay(objRef.current.value.toFixed(decimals) + suffix);
      },
    });
  }, [triggered, num, suffix, decimals]);

  return <>{display}</>;
}

const CaseStudySlide = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsTriggered, setStatsTriggered] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !statsTriggered) {
          setStatsTriggered(true);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [statsTriggered]);

  return (
    <section className="slide py-10 px-6 overflow-hidden relative flex flex-col">
      <motion.div
        initial={{ clipPath: "circle(5% at 50% 50%)", opacity: 0 }}
        whileInView={{ clipPath: "circle(150% at 50% 50%)", opacity: 1 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, amount: 0.5 }}
        className="absolute inset-0 z-0"
        style={{
          background: `linear-gradient(160deg, hsl(${mitsuiBlue} / 0.85), hsl(210 60% 22% / 0.7), hsl(${mitsuiCyan} / 0.3))`,
        }}
      />
      <div
        className="absolute inset-0 z-[-1]"
        style={{
          background: `linear-gradient(160deg, hsl(${mitsuiBlue} / 0.85), hsl(210 60% 22% / 0.7), hsl(${mitsuiCyan} / 0.3))`,
        }}
      />
      <div className={`max-w-6xl mx-auto w-full relative z-10 ${isMobile ? 'flex flex-col flex-1' : ''}`}>
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className={`text-center ${isMobile ? 'mb-1' : 'mb-3'}`}
        >
          <span
            className="text-xs tracking-[0.3em] font-medium uppercase"
            style={{ color: `hsl(${mitsuiCyan})` }}
          >
            Case Study
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className={`text-3xl md:text-5xl font-black tracking-tight text-center text-white ${isMobile ? 'mb-1' : 'mb-3'}`}
        >
          Mitsui Chemicals{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(135deg, hsl(${mitsuiCyan}), hsl(193 80% 65%))`,
            }}
          >
            Success
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className={`text-center max-w-2xl mx-auto text-sm md:text-base ${isMobile ? 'mb-3' : 'mb-6'}`}
          style={{ color: "hsl(210 30% 75%)" }}
        >
          Boosted brand visibility, engagement, and qualified leads through strategic digital marketing.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className={`flex justify-center ${isMobile ? 'flex-1 items-center' : 'mb-14'}`}
        >
          <ParallaxCardSlider slides={sliderImages} accentColor={mitsuiCyan} />
        </motion.div>

        <motion.div
          ref={statsRef}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={`flex flex-wrap justify-center gap-3 ${isMobile ? 'mt-4' : ''}`}
        >
          {statDefs.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div key={stat.label} variants={itemVariants}>
                <LiquidGlassCard padding="0.5rem 1rem" borderRadius="9999px" blur={12} brightness={1.15} backgroundColor="rgba(255, 255, 255, 0.08)">
                  <div className="flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5" style={{ color: `hsl(${mitsuiCyan})` }} />
                    <span className="text-sm md:text-base font-bold text-white">
                      <AnimatedStatValue
                        num={stat.num}
                        suffix={stat.suffix}
                        decimals={stat.decimals}
                        triggered={statsTriggered}
                      />
                    </span>
                    <span
                      className="text-[10px] md:text-xs font-medium uppercase tracking-wider"
                      style={{ color: "hsl(210 20% 75%)" }}
                    >
                      {stat.label}
                    </span>
                  </div>
                </LiquidGlassCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudySlide;
