import { AppIcon } from "./AppIcon";
import { Wordmark } from "./Wordmark";
import styles from "./Logo.module.css";

interface LogoProps {
  iconSize?: number;
  wordmarkSize?: number;
}

export function Logo({ iconSize = 96, wordmarkSize = 34 }: LogoProps) {
  return (
    <div className={styles.stack}>
      <AppIcon size={iconSize} />
      <div className={styles.wordmarkGroup}>
        <Wordmark as="span" size={wordmarkSize} weight={500} />
        <span className={styles.tagline}>// research lab</span>
      </div>
    </div>
  );
}
