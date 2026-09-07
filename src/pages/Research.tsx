import { Link } from "react-router-dom";
import { SubpageHeader } from "../components/SubpageHeader";
import { TexturePlate } from "../components/TexturePlate";
import { papers } from "../data/research";
import styles from "./Research.module.css";
import minimalDune from "../assets/stills/02_minimal_close_dune.png";

export function Research() {
  return (
    <div className={styles.page}>
      <div className={styles.headerWrap}>
        <TexturePlate height={380} opacity={0.6} image={minimalDune} />
        <div className={styles.headerContent}>
          <SubpageHeader maxWidth={900} active="/research" />
          <div className={styles.intro}>
            <p className={styles.kicker}>// research</p>
            <h1 className={styles.headline}>The formal record.</h1>
            <p className={styles.body}>
              Where the essays speculate, this is where we show our work — methods, data, and
              results we're willing to stand behind.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.list}>
        {papers.map((paper, i) => (
          <Link
            key={paper.slug}
            to={`/research/${paper.slug}`}
            className={`fade-up ${styles.paper}`}
            style={{ animationDelay: `${0.05 + i * 0.07}s` }}
          >
            <div className={styles.row}>
              <div className={styles.meta}>
                <div className={styles.tagRow}>
                  <span className={styles.category}>{paper.category}</span>
                  <span className={styles.year}>· {paper.year}</span>
                </div>
                <h3 className={styles.title}>{paper.title}</h3>
                <p className={styles.dek}>{paper.dek}</p>
              </div>
              <span className={styles.formats}>read</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
