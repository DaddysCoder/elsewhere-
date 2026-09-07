import { Link } from "react-router-dom";
import { Wordmark } from "../components/Wordmark";
import { CornerBrackets } from "../components/CornerBrackets";
import { HeroVideo } from "../components/HeroVideo";
import { Button } from "../components/Button";
import styles from "./Home.module.css";

const navItems = [
  { label: "Essays", href: "/essays", tag: "PHILOSOPHY · DISCOVERY", delay: "0.15s" },
  { label: "Notes", href: "/notes", tag: "FIELD NOTES", delay: "0.22s" },
  { label: "Research", href: "/research", tag: "BENCHMARKS · EXPERIMENTS", delay: "0.29s" },
  { label: "Community", href: "/community", tag: "SIGNALS", delay: "0.36s" },
];

export function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <HeroVideo />
        <div className={styles.colorOverlay} />
        <div className={styles.vignette} />
        <div className={styles.scrim} />
        <CornerBrackets />

        <div className={`fade-up ${styles.topRow}`}>
          <Wordmark />
          <span className={styles.coord}>27.9881° N, 34.1267° E</span>
        </div>

        <div className={styles.navWrap}>
          <p className={`fade-up ${styles.kicker}`} style={{ animationDelay: "0.1s" }}>
            // research lab
          </p>
          <nav className={styles.nav}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`fade-up ${styles.navItem}`}
                style={{ animationDelay: item.delay }}
              >
                <span className={styles.navLabel}>{item.label}</span>
                <span className={styles.navCoord}>{item.tag}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className={`fade-up ${styles.scrollHint}`} style={{ animationDelay: "0.5s" }}>
          <span>Scroll ↓</span>
        </div>
      </div>

      <div className={styles.contact}>
        <div className={styles.contactInner}>
          <p style={{ margin: 0, fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--accent)" }}>
            Get in touch
          </p>
          <h2 className={styles.contactHeadline}>Have something worth wandering into?</h2>
          <p className={styles.contactBody}>
            Questions, collaboration ideas, or a benchmark you think we got wrong — reach out.
          </p>
          <Button as="a" href="mailto:hello@elsewhere-lab.com" className={styles.cta}>
            Enquire →
          </Button>
          <a href="https://primitivelabs.com" className={styles.backLink}>
            ← Back to Primitive
          </a>
        </div>
      </div>
    </div>
  );
}
