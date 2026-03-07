import { useEffect, useRef, useState } from "react";
import { animate, createSpring } from "animejs";
import { useCountUp } from "@/hooks/use-count-up";
import { LucideIcon } from "lucide-react";
import { LiquidGlassCard } from "react-liquid-glass-card";

interface AnimatedStatProps {
  icon: LucideIcon;
  value: string;
  label: string;
  subtext: string;
  delay?: number;
}

function parseValue(raw: string): { num: number; suffix: string; prefix: string; decimals: number } {
  const match = raw.match(/^([^\d]*)(\d+\.?\d*)\s*(.*)$/);
  if (!match) return { num: 0, suffix: raw, prefix: "", decimals: 0 };
  const prefix = match[1];
  const num = parseFloat(match[2]);
  const suffix = match[3];
  const decPart = match[2].split(".")[1];
  const decimals = decPart ? decPart.length : 0;
  return { num, suffix, prefix, decimals };
}

const AnimatedStat = ({ icon: Icon, value, label, subtext, delay: delayMs = 0 }: AnimatedStatProps) => {
  const { num, suffix, prefix, decimals } = parseValue(value);
  const { display, done, start } = useCountUp({ end: num, suffix, prefix, decimals, duration: 2 });
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;

          // Reveal card
          animate(el, {
            opacity: [0, 1],
            translateY: [60, 0],
            scale: [0.8, 1],
            ease: createSpring({ stiffness: 100, damping: 12 }),
          });

          // Icon spin
          animate(el.querySelector(".as-icon")!, {
            rotate: [-180, 0],
            scale: [0, 1],
            delay: 500,
            ease: createSpring({ stiffness: 100, damping: 12 }),
          });

          setTimeout(() => {
            setHasStarted(true);
            start();
          }, delayMs);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delayMs]);

  return (
    <div
      ref={ref}
      className="text-center transition-transform duration-300 hover:-translate-y-2 hover:scale-105"
      style={{ opacity: 0 }}
    >
      <LiquidGlassCard padding="1rem 1.5rem" borderRadius="1rem" blur={10} brightness={1.1} backgroundColor="rgba(255, 255, 255, 0.06)">
        <div className="as-icon w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 rounded-lg bg-primary/20 flex items-center justify-center">
          <Icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
        </div>
        <div className={`text-2xl md:text-3xl font-black text-gradient-green mb-1 ${done ? "shimmer-text" : ""}`}>
          {hasStarted ? display : `${prefix}0${suffix}`}
        </div>
        <div className="text-xs md:text-sm font-semibold text-foreground mb-1">{label}</div>
        <div className="text-xs text-muted-foreground">{subtext}</div>
      </LiquidGlassCard>
    </div>
  );
};

export default AnimatedStat;
