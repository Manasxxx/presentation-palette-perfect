import * as React from "react";

/**
 * Tracks the user's `prefers-reduced-motion` setting.
 *
 * Returns `true` when the OS/browser requests reduced motion, so callers can
 * disable auto-advancing carousels, smooth scrolling, and large entrance
 * animations. This is a product accessibility requirement, not polish.
 */
export function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

  React.useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setPrefersReducedMotion(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return prefersReducedMotion;
}
