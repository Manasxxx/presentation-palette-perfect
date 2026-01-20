import { motion } from "framer-motion";
import { Eye, Users, Share2, Smartphone, Zap } from "lucide-react";

const stats = [
  { icon: Eye, value: "2.76M", label: "Impressions", subtext: "32.7% increase in 3 months" },
  { icon: Users, value: "14.6K", label: "Followers", subtext: "37.7% increase in 3 months" },
  { icon: Share2, value: "3.9M", label: "Profile Reach", subtext: "35.1% increase in 3 months" },
  { icon: Zap, value: "3x", label: "Click-Through Rate", subtext: "Higher on social content" },
  { icon: Smartphone, value: "97/100", label: "Mobile Score", subtext: "Optimization score" },
];

const BaxsaaCaseStudy = () => {
  return (
    <section className="slide py-20 px-6">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <span className="text-xs tracking-[0.3em] text-secondary font-medium">CASE STUDY</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-center"
        >
          <span className="text-foreground">The Baxsaa Co. </span>
          <span className="text-gradient-gold">Success</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto text-sm md:text-base"
        >
          We effectively communicated the core brand values of The Baxsaa Co., resulting in significant follower growth and expanded profile reach through targeted digital activities centered around the Marketing Funnel.
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 mb-10">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="card-glass rounded-2xl p-4 md:p-6 text-center"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 rounded-lg bg-secondary/20 flex items-center justify-center">
                <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-secondary" />
              </div>
              <div className="text-2xl md:text-3xl font-black text-gradient-gold mb-1">{stat.value}</div>
              <div className="text-xs md:text-sm font-semibold text-foreground mb-1">{stat.label}</div>
              <div className="text-xs text-muted-foreground">{stat.subtext}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
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
