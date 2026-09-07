import styles from "./CornerBrackets.module.css";

export function CornerBrackets() {
  return (
    <>
      <span className={`${styles.bracket} ${styles.topLeft}`} />
      <span className={`${styles.bracket} ${styles.topRight}`} />
      <span className={`${styles.bracket} ${styles.bottomLeft}`} />
      <span className={`${styles.bracket} ${styles.bottomRight}`} />
    </>
  );
}
