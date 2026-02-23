import { motion } from "framer-motion";
import { Eye, Users, TrendingUp, MousePointer, Gauge } from "lucide-react";
import mitsuiCreative1 from "@/assets/mitsui-creative-1.png";
import mitsuiCreative2 from "@/assets/mitsui-creative-2.png";

const stats = [
  { icon: Eye, value: "5.8M", label: "Impressions" },
  { icon: Users, value: "1000%", label: "Follower Growth" },
  { icon: TrendingUp, value: "99.2%", label: "Engagement ↑" },
  { icon: MousePointer, value: "104K", label: "Ad Clicks" },
  { icon: Gauge, value: "3X", label: "ROI" },
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

/* Mitsui brand: deep blue #004B97, accent cyan #00B4D8, white */
const mitsuiBlue = "210 100% 30%";
const mitsuiCyan = "193 100% 42%";

const CaseStudySlide = () => {
  return (
    <section
      className="slide py-20 px-6 overflow-hidden"
      style={{
        background: `linear-gradient(160deg, hsl(${mitsuiBlue} / 0.85), hsl(210 60% 22% / 0.7), hsl(${mitsuiCyan} / 0.3))`,
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-5"
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
          className="text-3xl md:text-5xl font-black tracking-tight mb-3 text-center text-white"
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
          className="text-center mb-10 max-w-2xl mx-auto text-sm md:text-base"
          style={{ color: "hsl(210 30% 75%)" }}
        >
          Boosted brand visibility, engagement, and qualified leads through strategic digital marketing.
        </motion.p>

        {/* Creatives */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-4 md:gap-6 mb-8"
        >
          {[mitsuiCreative1, mitsuiCreative2].map((src, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="aspect-square rounded-2xl overflow-hidden"
            >
              <img src={src} alt={`Mitsui Chemicals creative ${i + 1}`} className="w-full h-full object-cover rounded-2xl" />
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
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/15"
                style={{
                  background: "linear-gradient(135deg, hsl(210 60% 40% / 0.3), hsl(193 80% 50% / 0.15))",
                  backdropFilter: "blur(20px) saturate(1.5)",
                  WebkitBackdropFilter: "blur(20px) saturate(1.5)",
                  boxShadow: "inset 0 1px 0 hsl(0 0% 100% / 0.1), 0 4px 16px hsl(210 100% 10% / 0.3)",
                }}
              >
                <Icon className="w-3.5 h-3.5" style={{ color: `hsl(${mitsuiCyan})` }} />
                <span
                  className="text-sm md:text-base font-bold text-white"
                >
                  {stat.value}
                </span>
                <span
                  className="text-[10px] md:text-xs font-medium uppercase tracking-wider"
                  style={{ color: "hsl(210 20% 75%)" }}
                >
                  {stat.label}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudySlide;
