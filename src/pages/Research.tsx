import { SubpageHeader } from "../components/SubpageHeader";
import { TexturePlate } from "../components/TexturePlate";
import styles from "./Research.module.css";
import minimalDune from "../assets/stills/02_minimal_close_dune.png";

const papers = [
  {
    category: "routing",
    year: "2026",
    title: "Shortest-Path Routing Under Structural Drift",
    dek: "A routing model that tracks its own confidence as the graph it operates on continues to change.",
  },
  {
    category: "representation",
    year: "2025",
    title: "Boundary Instability in Learned Object Categories",
    dek: "Measuring how category boundaries shift under distribution change across five vision benchmarks.",
  },
  {
    category: "compression",
    year: "2025",
    title: "Minimal Descriptions of Self-Referential Systems",
    dek: "A working paper on compression bounds for systems that model themselves.",
  },
  {
    category: "observation",
    year: "2024",
    title: "External Observer Assumptions in Coupled Systems",
    dek: 'A survey of where "external observer" models quietly break down in practice.',
  },
];

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
          <article
            key={paper.title}
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
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
