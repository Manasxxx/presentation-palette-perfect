import React, { useEffect, useRef, useState } from "react";

const DURATION = 360;
const FPS = 30;

function interpolate(
  value: number,
  inputRange: [number, number, number],
  outputRange: [number, number, number]
): number {
  const [i0, i1, i2] = inputRange;
  const [o0, o1, o2] = outputRange;
  if (value <= i0) return o0;
  if (value <= i1) return o0 + ((value - i0) / (i1 - i0)) * (o1 - o0);
  if (value <= i2) return o1 + ((value - i1) / (i2 - i1)) * (o2 - o1);
  return o2;
}

interface OwlSurfLogoProps {
  className?: string;
  style?: React.CSSProperties;
}

export const OwlSurfLogo: React.FC<OwlSurfLogoProps> = ({ className, style }) => {
  const [frame, setFrame] = useState(0);
  const svgRef = useRef<SVGSVGElement>(null);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const lastFrameRef = useRef<number>(-1);
  const [inView, setInView] = useState(false);

  // The deck keeps neighbour slides mounted — only run the 30fps frame loop
  // while the logo is actually on screen.
  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;

    const animate = (timestamp: number) => {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const currentFrame = Math.floor((elapsed / 1000) * FPS) % DURATION;

      if (currentFrame !== lastFrameRef.current) {
        lastFrameRef.current = currentFrame;
        setFrame(currentFrame);
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [inView]);

  const t = (frame / DURATION) * Math.PI * 2;
  const earAngle = Math.sin(t * 3) * 3;

  const cycle = 120;
  const burst = 20;
  const flapPhase = frame % cycle;
  const wingAngle =
    flapPhase < burst
      ? Math.sin((flapPhase / burst) * Math.PI * 2 * 3) * 2.5
      : 0;

  const blinkPhase = frame % 90;
  const eyeScaleY =
    blinkPhase < 8
      ? interpolate(blinkPhase, [0, 4, 8], [1, 0.05, 1])
      : 1;

  const scaleAround = (px: number, py: number, sy: number) =>
    `translate(${px} ${py}) scale(1 ${sy}) translate(${-px} ${-py})`;

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 800 816.29"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      role="img"
      aria-label="OwlSurf logo"
    >
      <circle cx="400" cy="400" r="400" fill="#4dc1c1" />

      <g transform={`rotate(${-earAngle} 196 235)`}>
        <polygon fill="#231f20" points="195.67 279.69 155.96 190.54 286.8 242.73 195.67 279.69" />
        <path fill="#231f20" d="m192.61,287.27l-47.91-107.54,157.84,62.95-109.94,44.59Zm-25.4-85.91l31.51,70.74,72.32-29.33-103.83-41.41Z" />
      </g>

      <g transform={`rotate(${earAngle} 512 235)`}>
        <polygon fill="#231f20" points="512.18 276.34 551.89 187.19 421.05 239.38 512.18 276.34" />
        <path fill="#231f20" d="m515.23,283.92l-109.94-44.59,157.84-62.95-47.9,107.54Zm-78.43-44.5l72.32,29.33,31.51-70.74-103.83,41.41Z" />
      </g>

      <g transform={`rotate(${wingAngle} 370 380)`}>
        <path fill="#231f20" d="m238.69,328.59s-103.28,358.7,316.38,471.46c0,0,135.58-506.38-316.38-471.46Z" />
      </g>

      <ellipse cx="357.63" cy="302.87" rx="216.5" ry="156.99" fill="#231f20" />
      <path fill="#ffffff" d="m539.71,287.25c0,36.44-19.02,68.42-47.66,86.61-24.97,17.71-72.39,29.66-126.87,29.66-57.77,0-107.66-13.45-131.18-32.95-.05-.05-.1-.1-.15-.15-25.89-18.58-42.68-48.92-42.68-83.18,0-56.66,45.92-102.58,102.58-102.58,27.92,0,53.23,11.13,71.66,29.27,18.44-18.15,43.74-29.27,71.71-29.27,56.66,0,102.58,45.92,102.58,102.58Z" />
      <path fill="#231f20" d="m365.18,406.47c-57.05,0-108.04-12.89-133.05-33.63l-.19-.17c-27.37-19.74-43.7-51.65-43.7-85.42,0-58.18,47.34-105.52,105.52-105.52,26.85,0,52.18,9.97,71.66,28.14,19.48-18.17,44.83-28.14,71.71-28.14,58.18,0,105.52,47.34,105.52,105.52,0,36.29-18.33,69.6-49.02,89.09-26.14,18.55-75.4,30.12-128.45,30.12Zm-71.42-218.85c-54.94,0-99.64,44.7-99.64,99.64,0,31.96,15.5,62.16,41.45,80.79l.36.31c23.59,19.57,74.34,32.24,129.24,32.24,51.89,0,99.85-11.16,125.17-29.12,29.12-18.5,46.42-49.95,46.42-84.22,0-54.94-44.7-99.64-99.64-99.64-26.29,0-51.02,10.1-69.65,28.43l-2.06,2.03-2.06-2.03c-18.63-18.33-43.34-28.43-69.6-28.43Z" />

      <circle fill="#231f20" cx="268.18" cy="276.83" r="43.34" />
      <path fill="#231f20" d="m268.18,328.33c-28.39,0-51.49-23.1-51.49-51.49s23.1-51.49,51.49-51.49,51.49,23.1,51.49,51.49-23.1,51.49-51.49,51.49Zm0-86.67c-19.4,0-35.18,15.78-35.18,35.18s15.78,35.18,35.18,35.18,35.18-15.78,35.18-35.18-15.78-35.18-35.18-35.18Z" />

      <circle fill="#231f20" cx="463.49" cy="275.41" r="43.34" />
      <path fill="#231f20" d="m463.49,326.91c-28.39,0-51.49-23.1-51.49-51.49s23.1-51.49,51.49-51.49,51.49,23.1,51.49,51.49-23.1,51.49-51.49,51.49Zm0-86.67c-19.4,0-35.18,15.78-35.18,35.18s15.78,35.18,35.18,35.18,35.18-15.78,35.18-35.18-15.78-35.18-35.18-35.18Z" />

      <polygon fill="#231f20" points="348.87 288.11 381.11 288.11 364.99 316.01 348.87 288.11" />

      <path fill="#ffffff" d="m592.71,685.55l-109,99.37c-15.11-5.59-32.08-13.28-51.17-23.39-204.57-108.39-151.65-389.94-151.65-389.94l105.94-41.67,205.88,355.63Z" />
      <path fill="#231f20" d="m640.36,810.97c-18.24-116.54-46.15-239.08-96.06-345.52-32.7-69.73-92.9-145.96-166.34-89.03-24.7,19.15-40.86,49.45-48.77,81.73-12.63,51.51-8.66,111.34,3.42,163.5,0,.01,42.36,182.79,307.76,189.32Z" />
      <path fill="#ffffff" d="m646.42,816.29l-6.19-.15c-138.79-3.41-216.32-55.51-256.93-98.61-44.23-46.95-55.29-92.77-55.73-94.7-13.81-59.61-15.02-118.53-3.41-165.9,8.85-36.1,26.83-66.13,50.62-84.59,23.65-18.34,47.77-24.71,71.7-18.95,49.99,12.04,85.67,74.01,102.49,109.87,42.61,90.86,74.17,204.34,96.49,346.91l.96,6.11Zm-216.9-454.6c-16.03,0-32.26,6.3-48.41,18.82-21.96,17.03-38.63,45.04-46.92,78.88-11.23,45.83-10.01,103.04,3.44,161.1.41,1.77,44.12,176.13,296.65,185.13-22.11-138.71-53.09-249.31-94.67-337.97-16.03-34.19-49.76-93.18-95.56-104.21-4.82-1.16-9.67-1.74-14.54-1.74Z" />

      <circle fill="#ffffff" cx="268.18" cy="276.83" r="10.09" transform={scaleAround(268.18, 276.83, eyeScaleY)} />
      <circle fill="#ffffff" cx="462.91" cy="275.41" r="10.09" transform={scaleAround(462.91, 275.41, eyeScaleY)} />
    </svg>
  );
};
