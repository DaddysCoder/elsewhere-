import { Link } from "react-router-dom";
import styles from "./Wordmark.module.css";

interface WordmarkProps {
  size?: number;
  weight?: 400 | 500 | 700;
  variant?: "default" | "onVideo";
  as?: "link" | "span";
}

export function Wordmark({
  size = 18,
  weight = 700,
  variant = "default",
  as = "link",
}: WordmarkProps) {
  const content = (
    <span
      className={styles.wordmark}
      style={{ fontSize: size, fontWeight: weight }}
      data-variant={variant}
    >
      <span className={styles.else}>else</span>
      <span className={styles.brace}>{"{"}</span>
      <span className={styles.where}>where</span>
      <span className={styles.brace}>{"}"}</span>
    </span>
  );

  if (as === "span") return content;

  return (
    <Link to="/" className={styles.link} aria-label="else{where} home">
      {content}
    </Link>
  );
}
