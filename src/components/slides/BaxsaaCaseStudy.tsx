import { motion } from "framer-motion";
import { Eye, Users, Share2, Smartphone, Zap } from "lucide-react";
import AnimatedStat from "@/components/AnimatedStat";

const stats = [
  { icon: Eye, value: "2.76M", label: "Impressions", subtext: "32.7% increase in 3 months" },
  { icon: Users, value: "14.6K", label: "Followers", subtext: "37.7% increase in 3 months" },
  { icon: Share2, value: "3.9M", label: "Profile Reach", subtext: "35.1% increase in 3 months" },
  { icon: Zap, value: "3x", label: "Click-Through Rate", subtext: "Higher on social content" },
  { icon: Smartphone, value: "97/100", label: "Mobile Score", subtext: "Optimization score" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 }
  }
};

const statVariants = {
  hidden: { opacity: 0, x: -50, rotate: -5 },
  visible: { 
    opacity: 1, 
    x: 0, 
    rotate: 0,
    transition: { type: "spring" as const, stiffness: 100 }
  }
};

const BaxsaaCaseStudy = () => {
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
          <span className="text-foreground">The Baxsaa Co. </span>
          <span className="text-gradient-green">Success</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto text-sm md:text-base"
        >
          Grew followers and reach through targeted social campaigns aligned with the marketing funnel.
        </motion.p>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-3 gap-4 md:gap-6 mb-10"
        >
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              variants={statVariants}
              className="aspect-[4/3] rounded-2xl overflow-hidden"
              style={{
                background: "linear-gradient(135deg, hsl(180 45% 53% / 0.3), hsl(180 45% 40% / 0.5))"
              }}
            >
              <div className="w-full h-full flex items-center justify-center border border-primary/20 rounded-2xl">
                <span className="text-primary/50 text-sm font-medium">Creative {i}</span>
              </div>
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
          <p className="text-lg md:text-xl font-semibold text-foreground mb-2">SEO Transformation</p>
          <p className="text-muted-foreground text-sm md:text-base">
            Reduced website errors from <span className="text-destructive font-bold">3000+</span> to <span className="text-primary font-bold">0</span> and improved page load time by <span className="text-primary font-bold">34%</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default BaxsaaCaseStudy;
