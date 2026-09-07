import styles from "./Loader.module.css";

export function Loader() {
  return (
    <div className={styles.wrap} role="status" aria-label="Loading">
      <svg className={styles.svg} viewBox="0 0 200 200">
        <path
          className={styles.path}
          d="M 30 140 L 75 110 L 120 125 L 170 70"
          fill="none"
          stroke="#c9b8ea"
          strokeWidth={2.5}
          strokeLinecap="round"
        />
        <circle className={styles.dot} cx={30} cy={140} r={5} fill="#c9b8ea" style={{ animationDelay: "0s" }} />
        <circle className={styles.dot} cx={120} cy={125} r={5} fill="#c9b8ea" style={{ animationDelay: "0.8s" }} />
        <circle className={styles.dot} cx={170} cy={70} r={6} fill="#e0d4f4" style={{ animationDelay: "1.6s" }} />
      </svg>
    </div>
  );
}
