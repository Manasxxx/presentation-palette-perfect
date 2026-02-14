import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SlideRevealProps {
  children: ReactNode;
  className?: string;
}

const SlideReveal = ({ children, className = "" }: SlideRevealProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      className={className}
    >
      {/* Top wipe line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
        className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent z-20"
      />
      {children}
    </motion.div>
  );
};

export default SlideReveal;
