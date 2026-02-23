import { motion } from "framer-motion";
import { Eye, Users, TrendingUp, Dumbbell, Target } from "lucide-react";
import AnimatedStat from "@/components/AnimatedStat";
import cultfitCreative1 from "@/assets/cultfit-creative-1.png";
import cultfitCreative2 from "@/assets/cultfit-creative-2.png";
const stats = [
  { icon: Eye, value: "4.2M", label: "Impressions", subtext: "Across platforms" },
  { icon: Users, value: "25K", label: "New Members", subtext: "In 6 months" },
  { icon: TrendingUp, value: "180%", label: "Engagement Growth", subtext: "Social channels" },
  { icon: Target, value: "12%", label: "Conversion Rate", subtext: "From ads to sign-ups" },
  { icon: Dumbbell, value: "4.5X", label: "ROAS", subtext: "Return on ad spend" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 }
  }
};

const statVariants = {
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
    <section className="slide py-20 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <span className="text-xs tracking-[0.3em] text-primary font-medium">CASE STUDY</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-center"
        >
          <span className="text-foreground">Cult Fit </span>
          <span className="text-gradient-green">Success</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto text-sm md:text-base"
        >
          Drove membership growth and brand awareness through performance marketing and engaging social content.
        </motion.p>

        {/* Placeholder for creative images - upload images to replace */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-4 md:gap-6 mb-10"
        >
          {[cultfitCreative1, cultfitCreative2].map((src, i) => (
            <motion.div
              key={i}
              variants={statVariants}
              className="aspect-square rounded-2xl overflow-hidden"
            >
              <img src={src} alt={`Cult Fit creative ${i + 1}`} className="w-full h-full object-cover rounded-2xl" />
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 mb-10"
        >
          {stats.map((stat, i) => (
            <AnimatedStat
              key={stat.label}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              subtext={stat.subtext}
              delay={i * 150}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          viewport={{ once: true }}
          className="card-glass rounded-2xl p-6 md:p-8 text-center max-w-2xl mx-auto"
        >
          <p className="text-lg md:text-xl font-semibold text-foreground mb-2">Performance Marketing</p>
          <p className="text-muted-foreground text-sm md:text-base">
            Achieved <span className="text-primary font-bold">4.5X ROAS</span> through data-driven ad campaigns and <span className="text-primary font-bold">180%</span> engagement growth via creative social strategies
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CultFitCaseStudy;
