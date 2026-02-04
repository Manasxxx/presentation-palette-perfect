import { motion } from "framer-motion";
import { TrendingUp, Users, Eye, MousePointer, Gauge } from "lucide-react";

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
    <section className="slide py-20 px-6 bg-gradient-to-b from-owl-charcoal via-background to-owl-charcoal overflow-hidden">
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
          className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
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
                <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </motion.div>
              <div className="text-2xl md:text-3xl font-black text-gradient-green mb-1">{stat.value}</div>
              <div className="text-xs md:text-sm font-semibold text-foreground mb-1">{stat.label}</div>
              <div className="text-xs text-muted-foreground">{stat.subtext}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudySlide;
