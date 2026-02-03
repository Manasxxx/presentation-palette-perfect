import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Lightbulb, Target, Zap } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.8 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring" as const, stiffness: 100, damping: 12 }
  }
};

const WhoAreWeSlide = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={ref} className="slide hexagon-pattern py-20 overflow-hidden">
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-gradient-to-b from-owl-darker via-background to-background" 
      />
      
      <div className="relative z-10 flex flex-col items-center justify-center px-6 max-w-5xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 80, rotateX: 45 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-black tracking-tight mb-12 text-center"
        >
          <span className="text-foreground">WHO ARE </span>
          <span className="text-gradient-teal">WE?</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 60 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
          viewport={{ once: true }}
          className="card-glass rounded-3xl p-8 md:p-12 mb-10 max-w-3xl text-center"
        >
          <p className="text-lg md:text-2xl leading-relaxed text-muted-foreground">
            We are <span className="text-secondary font-bold">OWLSURF DIGITAL</span>, a 360° digital marketing agency where <span className="text-primary font-semibold">Tech Meets Design</span>.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-3 gap-6 md:gap-12"
        >
          {[
            { icon: Lightbulb, label: "Innovation" },
            { icon: Target, label: "Strategy" },
            { icon: Zap, label: "Execution" },
          ].map((item, i) => (
            <motion.div key={i} variants={itemVariants} className="flex flex-col items-center gap-3">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20"
              >
                <item.icon className="w-7 h-7 md:w-8 md:h-8 text-primary" />
              </motion.div>
              <span className="text-xs md:text-sm font-medium tracking-wider text-muted-foreground">{item.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhoAreWeSlide;
