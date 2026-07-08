import { useCallback, useState, type CSSProperties, type ReactNode } from "react";

type BorderGlowProps = {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  backgroundColor?: string;
  borderRadius?: number;
  glowRadius?: number;
  glowIntensity?: number;
  edgeSensitivity?: number;
  coneSpread?: number;
  colors?: string[];
  fillOpacity?: number;
};

const positions = ["80% 55%", "69% 34%", "8% 6%", "41% 38%", "86% 85%", "82% 18%", "51% 4%"];
const colorMap = [0, 1, 2, 0, 1, 2, 1];

const buildMeshGradients = (colors: string[]) => [
  ...positions.map((position, index) => `radial-gradient(at ${position}, ${colors[Math.min(colorMap[index], colors.length - 1)]} 0px, transparent 52%)`),
  `linear-gradient(${colors[0]} 0 100%)`,
];

const buildBoxShadow = (glowColor: string, intensity: number) => {
  const layers: [number, number, number, number, number, boolean][] = [
    [0, 0, 1, 0, 70, true],
    [0, 0, 4, 0, 55, true],
    [0, 0, 12, 0, 35, true],
    [0, 0, 24, 2, 22, true],
    [0, 0, 4, 0, 45, false],
    [0, 0, 18, 1, 28, false],
    [0, 0, 46, 2, 16, false],
  ];

  return layers
    .map(([x, y, blur, spread, alpha, inset]) => `${inset ? "inset " : ""}${x}px ${y}px ${blur}px ${spread}px hsl(${glowColor} / ${Math.min(alpha * intensity, 100)}%)`)
    .join(", ");
};

const BorderGlow = ({
  children,
  className = "",
  glowColor = "180 45% 53%",
  backgroundColor = "linear-gradient(135deg,hsl(0 0% 100% / 0.07),hsl(0 0% 100% / 0.028))",
  borderRadius = 24,
  glowRadius = 34,
  glowIntensity = 1,
  edgeSensitivity = 24,
  coneSpread = 25,
  colors = ["rgba(75,194,194,0.78)", "rgba(20,184,166,0.58)", "rgba(255,255,255,0.42)"],
  fillOpacity = 0,
}: BorderGlowProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [cursorAngle, setCursorAngle] = useState(45);
  const [edgeProximity, setEdgeProximity] = useState(0);

  const handlePointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const dx = x - cx;
    const dy = y - cy;
    const kx = dx === 0 ? Infinity : cx / Math.abs(dx);
    const ky = dy === 0 ? Infinity : cy / Math.abs(dy);
    const proximity = Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
    const radians = Math.atan2(dy, dx);
    const degrees = ((radians * 180) / Math.PI + 450) % 360;

    setEdgeProximity(proximity);
    setCursorAngle(degrees);
  }, []);

  const isVisible = isHovered;
  const borderOpacity = isVisible ? Math.max(0, (edgeProximity * 100 - edgeSensitivity - 10) / (90 - edgeSensitivity)) : 0;
  const glowOpacity = isVisible ? Math.max(0, (edgeProximity * 100 - edgeSensitivity) / (100 - edgeSensitivity)) : 0;
  const meshGradients = buildMeshGradients(colors);
  const angleDeg = `${cursorAngle.toFixed(3)}deg`;
  const coneMask = `conic-gradient(from ${angleDeg} at center, black ${coneSpread}%, transparent ${coneSpread + 15}%, transparent ${100 - coneSpread - 15}%, black ${100 - coneSpread}%)`;

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      className={`relative isolate border border-white/10 ${className}`}
      style={{
        background: backgroundColor,
        borderRadius,
        transform: "translate3d(0,0,0.01px)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 -z-[1] rounded-[inherit]"
        style={{
          border: "1px solid transparent",
          background: [`linear-gradient(hsl(210 12% 8% / 0.96) 0 100%) padding-box`, ...meshGradients.map((gradient) => `${gradient} border-box`)].join(", "),
          maskImage: coneMask,
          WebkitMaskImage: coneMask,
          opacity: borderOpacity,
          transition: isVisible ? "opacity 180ms ease-out" : "opacity 520ms ease-in-out",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 -z-[1] rounded-[inherit]"
        style={{
          background: meshGradients.join(", "),
          maskImage: `radial-gradient(ellipse at 50% 50%, transparent 42%, black 70%), ${coneMask}`,
          WebkitMaskImage: `radial-gradient(ellipse at 50% 50%, transparent 42%, black 70%), ${coneMask}`,
          opacity: 0,
          mixBlendMode: "soft-light",
          transition: isVisible ? "opacity 180ms ease-out" : "opacity 520ms ease-in-out",
        } as CSSProperties}
      />
      <span
        className="pointer-events-none absolute z-[1] rounded-[inherit]"
        style={{
          inset: `${-glowRadius}px`,
          maskImage: `conic-gradient(from ${angleDeg} at center, black 3%, transparent 12%, transparent 88%, black 97%)`,
          WebkitMaskImage: `conic-gradient(from ${angleDeg} at center, black 3%, transparent 12%, transparent 88%, black 97%)`,
          opacity: glowOpacity,
          mixBlendMode: "plus-lighter",
          transition: isVisible ? "opacity 180ms ease-out" : "opacity 520ms ease-in-out",
        } as CSSProperties}
      >
        <span className="absolute rounded-[inherit]" style={{ inset: glowRadius, boxShadow: buildBoxShadow(glowColor, glowIntensity) }} />
      </span>
      <div className="relative z-[2] flex h-full flex-col">{children}</div>
    </div>
  );
};

export default BorderGlow;
