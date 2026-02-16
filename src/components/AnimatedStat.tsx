import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useCountUp } from "@/hooks/use-count-up";
import { LucideIcon } from "lucide-react";

interface AnimatedStatProps {
  icon: LucideIcon;
  value: string;
  label: string;
  subtext: string;
  delay?: number;
}

function parseValue(raw: string): { num: number; suffix: string; prefix: string; decimals: number } {
  // e.g. "5.8M", "1000%", "99.2%", "104K", "3X", "3x", "2.76M", "14.6K", "97/100"
  const match = raw.match(/^([^\d]*)(\d+\.?\d*)\s*(.*)$/);
  if (!match) return { num: 0, suffix: raw, prefix: "", decimals: 0 };
  const prefix = match[1];
  const num = parseFloat(match[2]);
  const suffix = match[3];
  const decPart = match[2].split(".")[1];
  const decimals = decPart ? decPart.length : 0;
  return { num, suffix, prefix, decimals };
}

const statVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 100 },
  },
};

const AnimatedStat = ({ icon: Icon, value, label, subtext, delay = 0 }: AnimatedStatProps) => {
  const { num, suffix, prefix, decimals } = parseValue(value);
  const { display, done, start } = useCountUp({ end: num, suffix, prefix, decimals, duration: 2 });
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setTimeout(() => {
            setHasStarted(true);
            start();
          }, delay);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasStarted, delay]);

  return (
    <motion.div
      ref={ref}
      variants={statVariants}
      whileHover={{ y: -8, scale: 1.05 }}
      className="card-glass rounded-2xl p-4 md:p-6 text-center"
    >
      <motion.div
        initial={{ rotate: -180, scale: 0 }}
        whileInView={{ rotate: 0, scale: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
        viewport={{ once: true }}
        className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 rounded-lg bg-primary/20 flex items-center justify-center"
      >
        <Icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
      </motion.div>
      <div className={`text-2xl md:text-3xl font-black text-gradient-green mb-1 ${done ? "shimmer-text" : ""}`}>
        {hasStarted ? display : `${prefix}0${suffix}`}
      </div>
      <div className="text-xs md:text-sm font-semibold text-foreground mb-1">{label}</div>
      <div className="text-xs text-muted-foreground">{subtext}</div>
    </motion.div>
  );
};

export default AnimatedStat;
