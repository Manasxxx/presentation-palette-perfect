import { motion } from "framer-motion";
import { Rocket } from "lucide-react";

const SkyrocketSlide = () => {
  return (
    <section className="slide bg-gradient-to-br from-background via-owl-darker to-background">
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center glow-teal">
            <Rocket className="w-10 h-10 text-primary" />
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-4xl md:text-7xl font-black tracking-tight"
        >
          <span className="text-gradient-teal">SKYROCKETING</span>
          <br />
          <span className="text-foreground">YOUR PRESENCE</span>
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="h-1 w-32 bg-gradient-to-r from-primary via-secondary to-primary rounded-full mt-8"
        />
      </div>
    </section>
  );
};

export default SkyrocketSlide;
