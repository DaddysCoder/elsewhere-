import { Link, Navigate, useParams } from "react-router-dom";
import { Wordmark } from "../components/Wordmark";
import { getEssayBySlug, getNextEssay } from "../data/essays";
import styles from "./EssayDetail.module.css";

export function EssayDetail() {
  const { slug = "" } = useParams();
  const essay = getEssayBySlug(slug);

  if (!essay) return <Navigate to="/essays" replace />;

  const next = getNextEssay(slug);

  return (
    <div className={styles.page}>
      <div className={styles.topRow}>
        <Wordmark size={16} />
        <Link to="/essays" className={styles.backLink}>
          ← all essays
        </Link>
      </div>

      <div className={`fade-up ${styles.header}`}>
        <div className={styles.metaRow}>
          <span className={styles.metaIndex}>{essay.index}</span>
          <span className={styles.metaCategory}>{essay.category}</span>
          {essay.isCoverStory && (
            <>
              <span className={styles.metaDivider}>·</span>
              <span className={styles.metaTag}>cover story</span>
            </>
          )}
        </div>
        <h1 className={styles.title}>{essay.title}</h1>
        <p className={styles.dek}>{essay.dek}</p>
        <div className={styles.byline}>
          <div className={styles.avatar} aria-hidden="true" />
          <span>Notes from Elsewhere</span>
          <span>·</span>
          <span>{essay.readTime}</span>
        </div>
      </div>

      <div className={styles.divider} />

      <article className={`fade-up ${styles.article}`} style={{ animationDelay: "0.15s" }}>
        {essay.body.map((para, i) =>
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
          <Link to={`/essays/${next.slug}`} className={styles.nextLink}>
            <span className={styles.nextCategory}>
              {next.category} · {next.index}
            </span>
            <span className={styles.nextTitle}>{next.title}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
