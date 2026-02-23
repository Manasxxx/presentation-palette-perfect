import { motion } from "framer-motion";
import { TrendingUp, Users, Eye, MousePointer, Gauge } from "lucide-react";
import AnimatedStat from "@/components/AnimatedStat";
import mitsuiCreative1 from "@/assets/mitsui-creative-1.png";
import mitsuiCreative2 from "@/assets/mitsui-creative-2.png";

const stats = [
  { icon: Eye, value: "5.8M", label: "Social Impressions", subtext: "Over 1 year" },
  { icon: Users, value: "1000%", label: "Follower Growth", subtext: "Year-over-year" },
  { icon: TrendingUp, value: "99.2%", label: "Engagement Increase", subtext: "Social platforms" },
  { icon: MousePointer, value: "104K", label: "Ad Clicks", subtext: "16% CTR increase" },
  { icon: Gauge, value: "3X", label: "ROI Increase", subtext: "Google Ads" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 }
  }
};

const statVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.8 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring" as const, stiffness: 100 }
  }
};

const CaseStudySlide = () => {
  return (
    <section className="slide py-20 px-6 bg-background overflow-hidden">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <span className="text-xs tracking-[0.3em] text-secondary font-medium">CASE STUDY</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 60, rotateX: 30 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-center"
        >
          <span className="text-foreground">Mitsui Chemicals </span>
          <span className="text-gradient-green">Success</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto text-sm md:text-base"
        >
          Boosted brand visibility, engagement, and qualified leads through strategic digital marketing.
        </motion.p>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 gap-4 md:gap-6 mb-10"
        >
          {[mitsuiCreative1, mitsuiCreative2].map((src, i) => (
            <motion.div
              key={i}
              variants={statVariants}
              className="aspect-square rounded-2xl overflow-hidden"
            >
              <img src={src} alt={`Mitsui Chemicals creative ${i + 1}`} className="w-full h-full object-cover rounded-2xl" />
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6"
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
      </div>
    </section>
  );
};

export default CaseStudySlide;
