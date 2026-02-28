import { useState, useEffect } from "react";
import "@/styles/pencil-loader.css";

const LoadingScreen = () => {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const triggerExit = () => {
      setTimeout(() => {
        setExiting(true);
        setTimeout(() => setVisible(false), 1000);
      }, 1500);
    };

    if (document.readyState === "complete") {
      triggerExit();
    } else {
      window.addEventListener("load", triggerExit);
      return () => window.removeEventListener("load", triggerExit);
    }
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ backgroundColor: "hsl(214 30% 6%)" }}
    >
      {/* Spiraling ripple reveal — a growing circle clip-path that expands from center */}
      <div
        className="fixed inset-0 z-[101]"
        style={{
          clipPath: exiting
            ? "circle(150% at 50% 50%)"
            : "circle(0% at 50% 50%)",
          transition: "clip-path 1s cubic-bezier(0.4, 0, 0.2, 1)",
          backgroundColor: "transparent",
          pointerEvents: "none",
        }}
      >
        {/* This div punches through the loading screen to reveal content behind */}
      </div>

      {/* Ripple rings that spiral outward when exiting */}
      {exiting && (
        <>
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="absolute rounded-full border-2"
              style={{
                borderColor: `hsl(180 45% 53% / ${0.6 - i * 0.12})`,
                width: 0,
                height: 0,
                animation: `rippleExpand 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${i * 0.12}s forwards`,
              }}
            />
          ))}
        </>
      )}

      {/* Loading content — fades & scales down when exiting */}
      <div
        className="flex flex-col items-center gap-8"
        style={{
          opacity: exiting ? 0 : 1,
          transform: exiting ? "scale(0.5) rotate(180deg)" : "scale(1) rotate(0deg)",
          transition: "opacity 0.5s ease-out, transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="200px"
          width="200px"
          viewBox="0 0 200 200"
          className="pencil"
        >
          <defs>
            <clipPath id="pencil-eraser">
              <rect height="30" width="30" ry="5" rx="5" />
            </clipPath>
          </defs>
          <circle
            transform="rotate(-113,100,100)"
            strokeLinecap="round"
            strokeDashoffset="439.82"
            strokeDasharray="439.82 439.82"
            strokeWidth="2"
            stroke="hsl(180 45% 53%)"
            fill="none"
            r="70"
            className="pencil__stroke"
          />
          <g transform="translate(100,100)" className="pencil__rotate">
            <g fill="none">
              <circle
                transform="rotate(-90)"
                strokeDashoffset="402"
                strokeDasharray="402.12 402.12"
                strokeWidth="30"
                stroke="hsl(180 45% 50%)"
                r="64"
                className="pencil__body1"
              />
              <circle
                transform="rotate(-90)"
                strokeDashoffset="465"
                strokeDasharray="464.96 464.96"
                strokeWidth="10"
                stroke="hsl(180 45% 60%)"
                r="74"
                className="pencil__body2"
              />
              <circle
                transform="rotate(-90)"
                strokeDashoffset="339"
                strokeDasharray="339.29 339.29"
                strokeWidth="10"
                stroke="hsl(180 45% 40%)"
                r="54"
                className="pencil__body3"
              />
            </g>
            <g transform="rotate(-90) translate(49,0)" className="pencil__eraser">
              <g className="pencil__eraser-skew">
                <rect height="30" width="30" ry="5" rx="5" fill="hsl(180 45% 70%)" />
                <rect clipPath="url(#pencil-eraser)" height="30" width="5" fill="hsl(180 45% 60%)" />
                <rect height="20" width="30" fill="hsl(180 10% 90%)" />
                <rect height="20" width="15" fill="hsl(180 10% 70%)" />
                <rect height="20" width="5" fill="hsl(180 10% 80%)" />
                <rect height="2" width="30" y="6" fill="hsla(180 10% 10% / 0.2)" />
                <rect height="2" width="30" y="13" fill="hsla(180 10% 10% / 0.2)" />
              </g>
            </g>
            <g transform="rotate(-90) translate(49,-30)" className="pencil__point">
              <polygon points="15 0,30 30,0 30" fill="hsl(33 90% 70%)" />
              <polygon points="15 0,6 30,0 30" fill="hsl(33 90% 50%)" />
              <polygon points="15 0,20 10,10 10" fill="hsl(180 10% 10%)" />
            </g>
          </g>
        </svg>
        <p
          className="text-sm tracking-[0.3em] uppercase"
          style={{ color: "hsl(180 45% 53%)", fontFamily: "Montserrat, sans-serif" }}
        >
          Loading...
        </p>
      </div>

      {/* Inline keyframes for ripple rings */}
      <style>{`
        @keyframes rippleExpand {
          0% {
            width: 0;
            height: 0;
            opacity: 1;
          }
          100% {
            width: 300vmax;
            height: 300vmax;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
