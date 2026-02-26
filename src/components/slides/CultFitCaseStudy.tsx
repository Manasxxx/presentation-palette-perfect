import { motion } from "framer-motion";
import { Eye, Users, TrendingUp, MousePointer, Gauge } from "lucide-react";
import cultfitCreative1 from "@/assets/cultfit-creative-1.png";
import cultfitCreative2 from "@/assets/cultfit-creative-2.png";
import { LiquidGlassCard } from "react-liquid-glass-card";

/* Cult Fit brand: dark black, pink/magenta #E91E63, yellow #FFC107 */
const cultPink = "340 82% 52%";
const cultYellow = "45 100% 51%";

const stats = [
  { icon: Eye, value: "4.2M", label: "Impressions" },
  { icon: Users, value: "850%", label: "Follower Growth" },
  { icon: TrendingUp, value: "12.4%", label: "Engagement" },
  { icon: MousePointer, value: "78K", label: "Link Clicks" },
  { icon: Gauge, value: "4.5X", label: "ROI" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring" as const, stiffness: 100 }
  }
};

const CultFitCaseStudy = () => {
  return (
    <section className="slide py-10 px-6 overflow-hidden relative">
      {/* Circular wipe background — rich dark gradient with pink/yellow glow */}
      <motion.div
        initial={{ clipPath: "circle(5% at 50% 50%)", opacity: 0 }}
        whileInView={{ clipPath: "circle(150% at 50% 50%)", opacity: 1 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, amount: 0.5 }}
        className="absolute inset-0 z-0"
        style={{
          background: `linear-gradient(145deg, hsl(260 20% 8%), hsl(340 30% 12%), hsl(${cultPink} / 0.25), hsl(${cultYellow} / 0.08))`,
        }}
      />
      <div
        className="absolute inset-0 z-[-1]"
        style={{
          background: `linear-gradient(145deg, hsl(260 20% 8%), hsl(340 30% 12%), hsl(${cultPink} / 0.25), hsl(${cultYellow} / 0.08))`,
        }}
      />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-3"
        >
          <span
            className="text-xs tracking-[0.3em] font-medium uppercase"
            style={{ color: `hsl(${cultPink})` }}
          >
            Case Study
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-black tracking-tight mb-3 text-center text-white"
        >
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(135deg, hsl(${cultPink}), hsl(${cultYellow}))`,
            }}
          >
            Cult Fit
          </span>{" "}
          Success
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mb-6 max-w-2xl mx-auto text-sm md:text-base"
          style={{ color: "hsl(0 0% 65%)" }}
        >
          Drove membership growth and brand awareness through performance marketing and engaging social content.
        </motion.p>

        {/* Creatives */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-4 md:gap-6 mb-5 items-center max-w-4xl mx-auto"
        >
          {[cultfitCreative1, cultfitCreative2].map((src, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="rounded-2xl overflow-hidden"
            >
              <img src={src} alt={`Cult Fit creative ${i + 1}`} className="w-full h-auto object-contain rounded-2xl" />
            </motion.div>
          ))}
        </motion.div>

        {/* Stats as liquid glass pills */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                variants={itemVariants}
              >
                <LiquidGlassCard padding="0.5rem 1rem" borderRadius="9999px" blur={12} brightness={1.15} backgroundColor="rgba(255, 255, 255, 0.08)">
                  <div className="flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5" style={{ color: `hsl(${cultPink})` }} />
                    <span className="text-sm md:text-base font-bold text-white">
                      {stat.value}
                    </span>
                    <span
                      className="text-[10px] md:text-xs font-medium uppercase tracking-wider"
                      style={{ color: "hsl(0 0% 65%)" }}
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

export default CultFitCaseStudy;
