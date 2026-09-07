import { useState } from "react";
import { Link } from "react-router-dom";
import { Wordmark } from "../components/Wordmark";
import { TexturePlate } from "../components/TexturePlate";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { essays } from "../data/essays";
import styles from "./Essays.module.css";

export function Essays() {
  const [email, setEmail] = useState("");
  const coverStory = essays.find((e) => e.isCoverStory)!;
  const rest = essays.filter((e) => !e.isCoverStory);

  return (
    <div className={styles.page}>
      <div className={styles.headerWrap}>
        <TexturePlate height={520} opacity={0.16} />
        <div className={styles.headerContent}>
          <div className={styles.intro}>
            <Wordmark />
            <h1 className={styles.headline}>The part where we're allowed to wander.</h1>
            <div className={styles.copy}>
              <p className={styles.authorTag}>// from the author</p>
              <p>
                Not every useful idea starts as a benchmark. Some start as questions, some as
                arguments, some as a metaphor that refuses to leave, and some at an unreasonable
                hour after thinking about one concept for far too long. This is where those live.
              </p>
              <p>
                Essays are deliberately separate from the formal research. An essay may contain
                speculation, philosophy, unfinished arguments, analogy, personal experience, or
                ideas we have no intention of pretending are proven. That's not a weakness — it's
                what essays are for.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.coverWrap}>
        <Link
          to={`/essays/${coverStory.slug}`}
          className={`fade-up ${styles.cover}`}
          style={{ animationDelay: "0.05s" }}
        >
          <div className={styles.metaRow}>
            <span className={styles.metaIndex}>{coverStory.index}</span>
            <span className={styles.metaCategory}>{coverStory.category}</span>
            <span className={styles.metaDivider}>·</span>
            <span className={styles.metaTag}>cover story</span>
          </div>
          <h2 className={styles.coverTitle}>{coverStory.title}</h2>
          <p className={styles.coverDek}>{coverStory.dek}</p>
        </Link>
      </div>

      <div className={styles.list}>
        {rest.map((essay, i) => (
          <Link
            key={essay.slug}
            to={`/essays/${essay.slug}`}
            className={`fade-up ${styles.row}`}
            style={{ animationDelay: `${0.1 + i * 0.04}s` }}
          >
            <div className={styles.rowMeta}>
              <span className={styles.rowCategory}>{essay.category}</span>
              <span className={styles.rowIndex}>· {essay.index}</span>
            </div>
            <h3 className={styles.rowTitle}>{essay.title}</h3>
            <p className={styles.rowDek}>{essay.dek}</p>
          </Link>
        ))}
      </div>

      <div className={styles.footer}>
        <div className={styles.footerInner}>
          <h3 className={styles.footerTitle}>Notes from Elsewhere</h3>
          <p className={styles.footerBody}>
            Occasional essays and things that broke. No growth-hacking sequence. Just the
            wandering.
          </p>
          <form
            className={styles.signupRow}
            onSubmit={(e) => e.preventDefault()}
          >
            <Input
              type="email"
              placeholder="you@email.com"
              className={styles.signupInput}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button type="submit">Subscribe</Button>
          </form>
          <Link to="/" className={styles.footerBack}>
            ← Elsewhere home
          </Link>
        </div>
      </div>
    </div>
  );
}
