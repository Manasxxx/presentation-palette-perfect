import { motion } from "framer-motion";
import { Rocket } from "lucide-react";

const SkyrocketSlide = () => {
  return (
    <section className="slide bg-background overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-5xl"
      >
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: "spring", bounce: 0.4 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center glow-green">
            <Rocket className="w-10 h-10 text-primary" />
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          viewport={{ once: true }}
          className="text-4xl md:text-7xl font-black tracking-tight"
        >
          <motion.span 
            className="text-gradient-green inline-block"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            SKYROCKETING
          </motion.span>
          <br />
          <motion.span 
            className="text-foreground inline-block"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            YOUR PRESENCE
          </motion.span>
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          viewport={{ once: true }}
          className="h-1 w-32 bg-gradient-to-r from-primary via-secondary to-primary rounded-full mt-8"
        />
      </motion.div>
    </section>
  );
};

export default SkyrocketSlide;
