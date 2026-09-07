import { Link, Navigate, useParams } from "react-router-dom";
import { Wordmark } from "../components/Wordmark";
import { getNextPaper, getPaperBySlug } from "../data/research";
import styles from "./EssayDetail.module.css";

export function ResearchDetail() {
  const { slug = "" } = useParams();
  const paper = getPaperBySlug(slug);

  if (!paper) return <Navigate to="/research" replace />;

  const next = getNextPaper(slug);

  return (
    <div className={styles.page}>
      <div className={styles.topRow}>
        <Wordmark size={16} />
        <Link to="/research" className={styles.backLink}>
          ← all research
        </Link>
      </div>

      <div className={`fade-up ${styles.header}`}>
        <div className={styles.metaRow}>
          <span className={styles.metaCategory}>{paper.category}</span>
          <span className={styles.metaDivider}>·</span>
          <span className={styles.metaTag}>{paper.year}</span>
        </div>
        <h1 className={styles.title}>{paper.title}</h1>
        <p className={styles.dek}>{paper.dek}</p>
        <div className={styles.byline}>
          <div className={styles.avatar} aria-hidden="true" />
          <span>Elsewhere research</span>
          <span>·</span>
          <span>working paper</span>
        </div>
      </div>

      <div className={styles.divider} />

      <article className={`fade-up ${styles.article}`} style={{ animationDelay: "0.15s" }}>
        {paper.body.map((para, i) =>
          para.startsWith("//") ? (
            <p key={i} className={styles.workingDef}>
              {para}
            </p>
          ) : (
            <p key={i}>{para}</p>
          ),
        )}
      </article>

      <div className={styles.nextWrap}>
        <div className={styles.nextInner}>
          <span className={styles.nextLabel}>Next</span>
          <Link to={`/research/${next.slug}`} className={styles.nextLink}>
            <span className={styles.nextCategory}>
              {next.category} · {next.year}
            </span>
            <span className={styles.nextTitle}>{next.title}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
