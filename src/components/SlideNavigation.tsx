import { motion } from "framer-motion";

interface SlideNavigationProps {
  totalSlides: number;
  currentSlide: number;
  onNavigate: (index: number) => void;
}

const SlideNavigation = ({ totalSlides, currentSlide, onNavigate }: SlideNavigationProps) => {
  return (
    <motion.nav
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
      className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2"
    >
      {Array.from({ length: totalSlides }).map((_, i) => (
        <button
          key={i}
          onClick={() => onNavigate(i)}
          className={`w-1.5 rounded-full transition-all duration-300 ${
            currentSlide === i 
              ? "h-6 md:h-8 bg-primary shadow-lg shadow-primary/50" 
              : "h-2.5 md:h-3 bg-muted-foreground/30 hover:bg-muted-foreground/60"
          }`}
          aria-label={`Go to slide ${i + 1}`}
        />
      ))}
    </motion.nav>
  );
};

export default SlideNavigation;
