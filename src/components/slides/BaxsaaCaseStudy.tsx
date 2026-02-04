import { motion } from "framer-motion";
import { Eye, Users, Share2, Smartphone, Zap } from "lucide-react";

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
          className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 mb-10"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={statVariants}
              whileHover={{ y: -8, scale: 1.05 }}
              className="card-glass rounded-2xl p-4 md:p-6 text-center"
            >
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring", bounce: 0.6 }}
                viewport={{ once: true }}
                className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 rounded-lg bg-primary/20 flex items-center justify-center"
              >
                <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </motion.div>
              <div className="text-2xl md:text-3xl font-black text-gradient-green mb-1">{stat.value}</div>
              <div className="text-xs md:text-sm font-semibold text-foreground mb-1">{stat.label}</div>
              <div className="text-xs text-muted-foreground">{stat.subtext}</div>
            </motion.div>
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
