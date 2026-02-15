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
      <div className="absolute inset-0 bg-background" />

      {/* Liquid glass decorative elements */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute -top-20 -left-20 w-80 h-80 rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(180 45% 53% / 0.08) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(180 45% 53% / 0.06) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1 }}
          className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(180 45% 53% / 0.04) 0%, transparent 60%)",
            filter: "blur(50px)",
          }}
        />

        {/* Liquid glass card shapes */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotate: -12 }}
          animate={{ opacity: 1, y: 0, rotate: -12 }}
          transition={{ duration: 1.2, delay: 1.2 }}
          className="absolute top-[15%] left-[8%] w-40 h-28 rounded-3xl border border-primary/10 animate-float"
          style={{
            background: "linear-gradient(135deg, hsl(180 45% 53% / 0.06), hsl(180 45% 53% / 0.02))",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: -30, rotate: 8 }}
          animate={{ opacity: 1, y: 0, rotate: 8 }}
          transition={{ duration: 1.2, delay: 1.5 }}
          className="absolute bottom-[18%] right-[10%] w-48 h-32 rounded-3xl border border-primary/10"
          style={{
            background: "linear-gradient(135deg, hsl(180 45% 53% / 0.05), hsl(0 0% 100% / 0.02))",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            animation: "float 8s ease-in-out infinite 1s",
          }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="absolute top-[55%] left-[5%] w-24 h-24 rounded-full border border-primary/8"
          style={{
            background: "radial-gradient(circle, hsl(180 45% 53% / 0.05), transparent)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            animation: "float 7s ease-in-out infinite 2s",
          }}
        />
      </div>
      
      <motion.div 
        style={{ y, opacity, scale }}
        className="relative z-10 flex flex-col items-center justify-center text-center px-6"
      >
        {/* Logo reveal animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 relative"
        >
          <motion.div
            initial={{ clipPath: "circle(0% at 50% 50%)" }}
            animate={{ clipPath: "circle(50% at 50% 50%)" }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-primary/20 p-3 animate-pulse-glow flex items-center justify-center"
          >
            <img src={logo} alt="OwlSurf Digital" className="w-full h-full object-cover rounded-full" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 1.5 }}
            animate={{ opacity: 0, scale: 2.5 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="absolute inset-0 rounded-full border-2 border-primary/40"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-5xl md:text-8xl font-black tracking-tight mb-4"
        >
          <span className="text-gradient-green">OWLSURF</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-xl md:text-3xl font-light tracking-[0.3em] text-muted-foreground mb-6"
        >
          DIGITAL
        </motion.p>

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
