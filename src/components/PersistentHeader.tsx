import { motion, AnimatePresence } from "framer-motion";


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
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -30, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-40"
        >
          <nav
            className="flex items-center gap-0.5 px-2 py-1.5 rounded-full border border-white/20"
            style={{
              background: "linear-gradient(135deg, hsl(var(--background) / 0.45), hsl(var(--background) / 0.3))",
              backdropFilter: "blur(24px) saturate(1.6)",
              WebkitBackdropFilter: "blur(24px) saturate(1.6)",
              boxShadow: "0 8px 32px hsl(var(--background) / 0.4), inset 0 1px 0 hsl(var(--foreground) / 0.08)",
            }}
          >
            {slideLabels.map((label, i) => {
              const isActive = currentSlide === i;
              return (
                <button
                  key={label}
                  onClick={() => onNavigate(i)}
                  className="relative px-3 md:px-4 py-1.5 text-[10px] md:text-xs font-semibold tracking-wider uppercase whitespace-nowrap rounded-full"
                  style={{
                    color: isActive
                      ? "hsl(var(--primary-foreground))"
                      : "hsl(var(--muted-foreground) / 0.6)",
                    background: isActive
                      ? "hsl(var(--primary))"
                      : "transparent",
                    boxShadow: isActive
                      ? "0 2px 12px hsl(var(--primary) / 0.4)"
                      : "none",
                    transition: "all 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                >
                  {label}
                </button>
              );
            })}
          </nav>
        </motion.header>
      )}
    </AnimatePresence>
  );
};

export default PersistentHeader;
