import type { CSSProperties, ReactNode } from "react";
import styles from "./EyebrowLabel.module.css";

interface EyebrowLabelProps {
  children: ReactNode;
  color?: string;
  style?: CSSProperties;
  className?: string;
}

export function EyebrowLabel({ children, color, style, className }: EyebrowLabelProps) {
  return (
    <p
      className={[styles.eyebrow, className].filter(Boolean).join(" ")}
      style={{ color, ...style }}
    >
      {children}
    </p>
  );
}
