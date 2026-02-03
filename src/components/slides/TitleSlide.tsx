import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import logo from "@/assets/logo.jpg";

const TitleSlide = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    <section ref={ref} className="slide hexagon-pattern">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-owl-darker" />
      
      <motion.div 
        style={{ y, opacity, scale }}
        className="relative z-10 flex flex-col items-center justify-center text-center px-6"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-primary/20 p-4 animate-pulse-glow">
            <img src={logo} alt="OwlSurf Digital" className="w-full h-full object-contain rounded-full" />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-xl md:text-2xl font-light tracking-[0.3em] text-secondary mb-4"
        >
          OWLSURF
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-5xl md:text-8xl font-black tracking-tight mb-6"
        >
          <span className="text-foreground">DIGITAL</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex items-center gap-4 mb-8"
        >
          <div className="h-px w-16 bg-owl-orange" />
          <p className="text-lg md:text-xl font-medium tracking-widest text-muted-foreground">
            PORTFOLIO AND CREDENTIALS
          </p>
          <div className="h-px w-16 bg-owl-orange" />
        </motion.div>

        <motion.a
          href="https://www.owlsurf.com"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="text-sm font-medium tracking-widest text-primary hover:text-primary/80 transition-colors"
        >
          www.owlsurf.com
        </motion.a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-xs tracking-widest">SCROLL</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-px h-8 bg-gradient-to-b from-primary to-transparent"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default TitleSlide;
