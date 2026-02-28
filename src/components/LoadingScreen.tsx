import { useEffect } from "react";

const LoadingScreen = () => {
  useEffect(() => {
    const preloader = document.getElementById("preloader");
    if (!preloader) return;

    // Give a brief moment for React content to paint, then fade out
    const timer = setTimeout(() => {
      preloader.classList.add("hidden");
      setTimeout(() => preloader.remove(), 700);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return null;
};

export default LoadingScreen;
