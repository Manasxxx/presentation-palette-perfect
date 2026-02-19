import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.jpg";

const slideLabels = [
  "Intro", "Why Us", "About", "Team",
  "Services", "Clients", "Case Study", "Baxsaa", "Contact"
];

interface PersistentHeaderProps {
  visible: boolean;
  currentSlide: number;
  onNavigate: (index: number) => void;
}

const PersistentHeader = ({ visible, currentSlide, onNavigate }: PersistentHeaderProps) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.header
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed top-0 left-0 right-0 z-40 flex flex-col"
          style={{
            background: "linear-gradient(180deg, hsl(var(--background) / 0.92), hsl(var(--background) / 0.7), hsl(var(--background) / 0))",
            backdropFilter: "blur(14px) saturate(1.3)",
            WebkitBackdropFilter: "blur(14px) saturate(1.3)",
          }}
        >
          {/* Top row: spacer, title, logo */}
          <div className="flex items-center justify-between px-6 md:px-10 pt-3 pb-1">
            <div className="w-10" />
            <motion.p
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="text-xs md:text-sm font-semibold tracking-[0.25em] text-muted-foreground uppercase"
            >
              Portfolio & Credentials
            </motion.p>
            <motion.img
              src={logo}
              alt="OwlSurf Digital"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="w-9 h-9 md:w-10 md:h-10 rounded-full object-cover border border-white/15"
            />
          </div>

          {/* Section nav labels */}
          <nav className="flex items-center gap-1 px-4 md:px-10 pb-2 overflow-x-auto scrollbar-hide">
            {slideLabels.map((label, i) => (
              <button
                key={label}
                onClick={() => onNavigate(i)}
                className="relative px-2.5 md:px-3 py-1.5 text-[10px] md:text-xs font-medium tracking-wider uppercase whitespace-nowrap transition-colors duration-200"
                style={{
                  color: currentSlide === i
                    ? "hsl(var(--primary))"
                    : "hsl(var(--muted-foreground))",
                }}
              >
                {label}
                {/* Active indicator */}
                <motion.div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full bg-primary"
                  initial={false}
                  animate={{
                    width: currentSlide === i ? "60%" : "0%",
                    opacity: currentSlide === i ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </button>
            ))}
          </nav>
        </motion.header>
      )}
    </AnimatePresence>
  );
};

export default PersistentHeader;
