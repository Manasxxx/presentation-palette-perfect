import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);
  const [sweepActive, setSweepActive] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.remove("light");
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
    }
  }, [isDark]);

  const handleToggle = () => {
    setSweepActive(true);
    // Apply theme immediately to avoid jitter
    setIsDark(!isDark);
    setTimeout(() => {
      setSweepActive(false);
    }, 700);
  };

  return (
    <>
      {/* Circular sweep overlay */}
      <AnimatePresence>
        {sweepActive && (
          <motion.div
            initial={{ clipPath: "circle(0% at calc(100% - 38px) calc(100% - 38px))" }}
            animate={{ clipPath: "circle(200% at calc(100% - 38px) calc(100% - 38px))" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[60] pointer-events-none"
            style={{
              backgroundColor: isDark ? "hsl(0 0% 0%)" : "hsl(0 0% 100%)",
            }}
          />
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 300, damping: 20 }}
        className="fixed bottom-6 right-6 z-[70]"
      >
        <button
          onClick={handleToggle}
          className="relative w-16 h-8 rounded-full bg-muted/60 backdrop-blur-md border border-border p-1 flex items-center cursor-pointer transition-colors"
          aria-label="Toggle theme"
        >
          {/* Track icons */}
          <Sun className="absolute left-1.5 w-3.5 h-3.5 text-muted-foreground/50" />
          <Moon className="absolute right-1.5 w-3.5 h-3.5 text-muted-foreground/50" />

          {/* Sliding knob */}
          <motion.div
            layout
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
            className="w-6 h-6 rounded-full bg-primary shadow-lg flex items-center justify-center"
            style={{ marginLeft: isDark ? "auto" : 0 }}
          >
            <AnimatePresence mode="wait">
              {isDark ? (
                <motion.div
                  key="moon"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Moon className="w-3.5 h-3.5 text-primary-foreground" />
                </motion.div>
              ) : (
                <motion.div
                  key="sun"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sun className="w-3.5 h-3.5 text-primary-foreground" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </button>
      </motion.div>
    </>
  );
};

export default ThemeToggle;
