import { motion } from "framer-motion";
import { Eye, Users, TrendingUp, MousePointer, Gauge } from "lucide-react";
import girlupCreative1 from "@/assets/girlup-creative-1.png";
import girlupCreative2 from "@/assets/girlup-creative-2.png";

/* Girl Up brand: teal/green #00B89F, lavender/purple #9B72CF */
const girlUpTeal = "168 100% 36%";
const girlUpPurple = "268 48% 63%";

const stats = [
  { icon: Eye, value: "3.1M", label: "Impressions" },
  { icon: Users, value: "620%", label: "Follower Growth" },
  { icon: TrendingUp, value: "18.7%", label: "Engagement" },
  { icon: MousePointer, value: "52K", label: "Link Clicks" },
  { icon: Gauge, value: "3.8X", label: "ROI" },
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

const GirlUpCaseStudy = () => {
  return (
    <section className="slide py-20 px-6 overflow-hidden relative">
      {/* Circular wipe background — teal to purple glow */}
      <motion.div
        initial={{ clipPath: "circle(5% at 50% 50%)", opacity: 0 }}
        whileInView={{ clipPath: "circle(150% at 50% 50%)", opacity: 1 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, amount: 0.5 }}
        className="absolute inset-0 z-0"
        style={{
          background: `linear-gradient(145deg, hsl(${girlUpTeal} / 0.85), hsl(168 60% 22% / 0.7), hsl(${girlUpPurple} / 0.35))`,
        }}
      />
      <div
        className="absolute inset-0 z-[-1]"
        style={{
          background: `linear-gradient(145deg, hsl(${girlUpTeal} / 0.85), hsl(168 60% 22% / 0.7), hsl(${girlUpPurple} / 0.35))`,
        }}
      />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-5"
        >
          <span
            className="text-xs tracking-[0.3em] font-medium uppercase"
            style={{ color: `hsl(${girlUpPurple})` }}
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
          Girl Up{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(135deg, hsl(${girlUpTeal}), hsl(${girlUpPurple}))`,
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
          style={{ color: "hsl(168 30% 75%)" }}
        >
          Amplified youth-led advocacy through vibrant social media content and community-driven engagement strategies.
        </motion.p>

        {/* Creatives */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-4 md:gap-6 mb-8"
        >
          {[girlupCreative1, girlupCreative2].map((src, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="rounded-2xl overflow-hidden"
            >
              <img src={src} alt={`Girl Up creative ${i + 1}`} className="w-full h-auto object-contain rounded-2xl" />
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
                  background: `linear-gradient(135deg, hsl(${girlUpTeal} / 0.2), hsl(${girlUpPurple} / 0.1))`,
                  backdropFilter: "blur(20px) saturate(1.5)",
                  WebkitBackdropFilter: "blur(20px) saturate(1.5)",
                  boxShadow: "inset 0 1px 0 hsl(0 0% 100% / 0.1), 0 4px 16px hsl(168 100% 10% / 0.3)",
                }}
              >
                <Icon className="w-3.5 h-3.5" style={{ color: `hsl(${girlUpTeal})` }} />
                <span className="text-sm md:text-base font-bold text-white">
                  {stat.value}
                </span>
                <span
                  className="text-[10px] md:text-xs font-medium uppercase tracking-wider"
                  style={{ color: "hsl(168 20% 75%)" }}
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

export default GirlUpCaseStudy;
