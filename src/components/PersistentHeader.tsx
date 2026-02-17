import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.jpg";

interface PersistentHeaderProps {
  visible: boolean;
}

const PersistentHeader = ({ visible }: PersistentHeaderProps) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.header
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-10 py-3"
          style={{
            background: "linear-gradient(180deg, hsl(var(--background) / 0.85), hsl(var(--background) / 0))",
            backdropFilter: "blur(12px) saturate(1.3)",
            WebkitBackdropFilter: "blur(12px) saturate(1.3)",
          }}
        >
          {/* Left spacer */}
          <div className="w-10" />

          {/* Center title */}
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            className="text-xs md:text-sm font-semibold tracking-[0.25em] text-muted-foreground uppercase"
          >
            Portfolio & Credentials
          </motion.p>

          {/* Logo on the right */}
          <motion.img
            src={logo}
            alt="OwlSurf Digital"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="w-9 h-9 md:w-10 md:h-10 rounded-full object-cover border border-white/15"
          />
        </motion.header>
      )}
    </AnimatePresence>
  );
};

export default PersistentHeader;
