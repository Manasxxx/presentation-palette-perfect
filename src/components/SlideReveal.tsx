import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SlideRevealProps {
  children: ReactNode;
  className?: string;
}

const slideVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

const SlideReveal = ({ children, className = "" }: SlideRevealProps) => {
  return (
    <motion.div
      variants={slideVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className={className}
    >
      {/* Top wipe line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
        className="absolute top-0 left-[5%] right-[5%] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent z-20"
      />
      {/* Bottom wipe line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
        className="absolute bottom-0 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent z-20"
      />
      {children}
    </motion.div>
  );
};

export default SlideReveal;
