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
      
      <motion.div 
        style={{ y, opacity, scale }}
        className="relative z-10 flex flex-col items-center justify-center text-center px-6"
      >
        {/* Logo with glass effect */}
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
            className="w-32 h-32 md:w-40 md:h-40 rounded-full p-1 animate-pulse-glow flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, hsl(180 45% 53% / 0.12), hsl(200 20% 50% / 0.08))",
              backdropFilter: "blur(24px) saturate(1.4)",
              WebkitBackdropFilter: "blur(24px) saturate(1.4)",
              border: "1.5px solid hsl(0 0% 100% / 0.18)",
              boxShadow: "0 8px 32px hsl(180 45% 53% / 0.15), inset 0 1px 0 hsl(0 0% 100% / 0.15), inset 0 -1px 0 hsl(0 0% 0% / 0.05)",
            }}
          >
            <img src={logo} alt="OwlSurf Digital" className="w-full h-full object-cover rounded-full" />
          </motion.div>
        </motion.div>

        {/* Title with glass backdrop */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-4 px-8 py-4 rounded-2xl"
          style={{
            background: "linear-gradient(135deg, hsl(200 20% 50% / 0.1), hsl(200 15% 60% / 0.05))",
            backdropFilter: "blur(20px) saturate(1.3)",
            WebkitBackdropFilter: "blur(20px) saturate(1.3)",
            border: "1.5px solid hsl(0 0% 100% / 0.15)",
            boxShadow: "0 4px 24px hsl(0 0% 0% / 0.1), inset 0 1px 0 hsl(0 0% 100% / 0.12), inset 0 -1px 0 hsl(0 0% 0% / 0.04)",
          }}
        >
          <h1 className="text-5xl md:text-8xl font-black tracking-tight">
            <span className="text-gradient-green">OWLSURF</span>
          </h1>
          <p className="text-xl md:text-3xl font-light tracking-[0.3em] text-muted-foreground mt-2">
            DIGITAL
          </p>
        </motion.div>

        {/* Portfolio pill with glass effect */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex items-center gap-4 mb-8 px-8 py-3 rounded-full"
          style={{
            background: "linear-gradient(135deg, hsl(200 20% 50% / 0.1), hsl(200 15% 60% / 0.05))",
            backdropFilter: "blur(16px) saturate(1.3)",
            WebkitBackdropFilter: "blur(16px) saturate(1.3)",
            border: "1.5px solid hsl(0 0% 100% / 0.15)",
            boxShadow: "0 2px 16px hsl(0 0% 0% / 0.08), inset 0 1px 0 hsl(0 0% 100% / 0.12), inset 0 -1px 0 hsl(0 0% 0% / 0.04)",
          }}
        >
          <div className="h-px w-10 bg-owl-orange" />
          <p className="text-sm md:text-base font-semibold tracking-[0.25em] text-muted-foreground">
            PORTFOLIO & CREDENTIALS
          </p>
          <div className="h-px w-10 bg-owl-orange" />
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
