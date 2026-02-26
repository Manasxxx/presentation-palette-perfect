import { useCallback, useEffect, useRef, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnimatedThemeTogglerProps extends React.ComponentPropsWithoutRef<"button"> {
  duration?: number;
}

const ThemeToggle = ({
  className,
  duration = 400,
  ...props
}: AnimatedThemeTogglerProps) => {
  const [isDark, setIsDark] = useState(true);
  const buttonRef = useRef<HTMLButtonElement>(null);

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

  const toggleTheme = useCallback(() => {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const maxRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    // Use View Transitions API if available
    if (document.startViewTransition) {
      const transition = document.startViewTransition(() => {
        setIsDark((prev) => !prev);
      });

      transition.ready.then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${maxRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration,
            easing: "ease-in-out",
            pseudoElement: "::view-transition-new(root)",
          }
        );
      });
    } else {
      setIsDark((prev) => !prev);
    }
  }, [duration]);

  return (
    <div className="fixed bottom-6 right-6 z-[70]">
      <button
        ref={buttonRef}
        onClick={toggleTheme}
        className={cn(
          "relative w-10 h-10 rounded-full flex items-center justify-center",
          "bg-muted/60 backdrop-blur-md border border-border",
          "transition-colors hover:bg-muted/80",
          className
        )}
        aria-label="Toggle theme"
        {...props}
      >
        {isDark ? (
          <Sun className="w-5 h-5 text-foreground" />
        ) : (
          <Moon className="w-5 h-5 text-foreground" />
        )}
        <span className="sr-only">Toggle theme</span>
      </button>
    </div>
  );
};

export default ThemeToggle;
