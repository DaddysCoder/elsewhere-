import { Link } from "react-router-dom";
import { Logo } from "../components/Logo";
import { AppIcon } from "../components/AppIcon";
import { Loader } from "../components/Loader";
import styles from "./Brand.module.css";

const swatches = [
  { hex: "#0c0f14", name: "ground" },
  { hex: "#141824", name: "surface" },
  { hex: "#9b7bd8", name: "accent" },
  { hex: "#6b9e78", name: "comment" },
  { hex: "#5b6270", name: "muted" },
  { hex: "#f0ede8", name: "ink (on dark)" },
];

export function Brand() {
  return (
    <div className={styles.page}>
      <div className={styles.section}>
        <p className={styles.sectionLabel}>Brand Book</p>
        <h1 className={styles.title}>else{"{where}"} research lab</h1>
        <p style={{ color: "var(--muted-3)", fontSize: 14, margin: 0 }}>
          Internal style-guide route — inspectable design tokens, not a public site page.
        </p>
      </div>

      <div className={styles.section}>
        <p className={styles.subLabel}>Logo</p>
        <div className={styles.logoPanel}>
          <Logo />
        </div>
      </div>

      <div className={styles.section}>
        <p className={styles.subLabel}>App icon</p>
        <div className={styles.iconRow}>
          <AppIcon size={96} shape="squircle" />
          <AppIcon size={96} shape="circle" />
          <AppIcon size={96} shape="square" />
          <AppIcon size={48} shape="squircle" />
        </div>
      </div>

      <div className={styles.section}>
        <p className={styles.subLabel}>Color palette</p>
        <div className={styles.swatchGrid}>
          {swatches.map((s) => (
            <div key={s.hex} className={styles.swatch}>
              <div className={styles.swatchBlock} style={{ background: s.hex }} />
              <span className={styles.swatchLabel}>
                {s.hex} — {s.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <p className={styles.subLabel}>Typography</p>
        <div className={styles.typeGrid}>
          <div className={styles.typePanel}>
            <span className={styles.swatchLabel}>Public Sans — display &amp; body</span>
            <span className={styles.typeSample}>Aa Bb Cc</span>
            <p className={styles.typeCaption}>
              Regular / Medium / Semibold / Bold — used for headlines, wordmark base, and
              running copy.
            </p>
          </div>
          <div className={styles.typePanel}>
            <span className={styles.swatchLabel}>JetBrains Mono — code voice</span>
            <span
              className={styles.typeSample}
              style={{ fontFamily: "var(--font-mono)", color: "var(--accent)" }}
            >
              Aa Bb Cc
            </span>
            <p className={styles.typeCaption}>
              Used for the wordmark, labels, comments, and anywhere the lab's coding voice
              should show.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <p className={styles.subLabel}>Loader</p>
        <div className={styles.loaderPanel}>
          <Loader />
        </div>
      </div>

      <Link to="/" className={styles.backLink}>
        ← back to site
      </Link>
    </div>
  );
}
