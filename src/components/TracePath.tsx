import styles from "./TracePath.module.css";

interface TraceDot {
  cx: number;
  cy: number;
  r: number;
  delay: string;
  color?: string;
}

interface TracePathProps {
  viewBox?: string;
  path: string;
  dots: TraceDot[];
  animated?: boolean;
  className?: string;
}

export function TracePath({
  viewBox = "0 0 1920 1080",
  path,
  dots,
  animated = true,
  className,
}: TracePathProps) {
  return (
    <svg
      className={[styles.svg, className].filter(Boolean).join(" ")}
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <path
        className={animated ? styles.tracePath : undefined}
        d={path}
        fill="none"
        stroke="#c9b8ea"
        strokeWidth={2}
        strokeLinecap="round"
        opacity={0.4}
      />
      {dots.map((dot, i) => (
        <circle
          key={i}
          className={animated ? styles.traceDot : undefined}
          cx={dot.cx}
          cy={dot.cy}
          r={dot.r}
          fill={dot.color ?? "#c9b8ea"}
          style={{ animationDelay: dot.delay }}
        />
      ))}
    </svg>
  );
}
