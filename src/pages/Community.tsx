import { useState } from "react";
import { SubpageHeader } from "../components/SubpageHeader";
import { TexturePlate } from "../components/TexturePlate";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { postNotification } from "../lib/notify";
import styles from "./Community.module.css";
import oasisSide from "../assets/stills/03_oasis_side_view.png";

const excerpts = [
  {
    initials: "rn",
    author: "r.nakamura",
    meta: "2 days ago · on ontology",
    title: 'If objects are just useful patterns, is "useful" doing all the work?',
    dek: "Re: essay 01 — feels like the definition just relocates the hard question rather than answering it.",
  },
  {
    initials: "kt",
    author: "k.tran",
    meta: "4 days ago",
    title: "Looking for the paper on shortest-path routing under drift",
    dek: "Someone mentioned it in a call, can't find it on the publications page.",
  },
  {
    initials: "ae",
    author: "a.ezra",
    meta: "1 week ago",
    title: "A half-finished thought about zero and unresolved state",
    dek: "Not sure this goes anywhere but writing it down before I lose it.",
  },
];

type FormStatus = "idle" | "submitting" | "success" | "error";

export function Community() {
  const [draft, setDraft] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");

  return (
    <div className={styles.page}>
      <div className={styles.headerWrap}>
        <TexturePlate height={460} opacity={0.55} image={oasisSide} />
        <div className={styles.headerContent}>
          <SubpageHeader maxWidth={900} active="/community" />
          <div className={styles.intro}>
            <p className={styles.kicker}>// discuss</p>
            <h1 className={styles.headline}>Threads, not feeds.</h1>
            <p className={styles.body}>
              A place to argue about a claim, ask what someone meant, or leave a half-formed
              idea for someone else to finish. No karma, no ranking — just conversations worth
              returning to.
            </p>
          </div>
          <form
            className={styles.composer}
            onSubmit={async (e) => {
              e.preventDefault();
              setStatus("submitting");
              try {
                await postNotification("/api/thread", { message: draft });
                setStatus("success");
                setDraft("");
              } catch {
                setStatus("error");
              }
            }}
          >
            <Input
              type="text"
              label="Discussion prompt"
              placeholder="a question or a half-formed idea..."
              className={styles.composerInput}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              disabled={status === "submitting"}
              required
            />
            <Button type="submit" disabled={status === "submitting"}>
              {status === "submitting" ? "Sending…" : "Send to Elsewhere"}
            </Button>
          </form>
          <p className={styles.destination}>
            This goes privately to the lab — it is not published as a thread.
          </p>
          {status === "success" && (
            <p className={styles.formNote} role="status" aria-live="polite">
              Sent — the lab reads every thread.
            </p>
          )}
          {status === "error" && (
            <p className={styles.formNote} role="status" aria-live="polite">
              Something went wrong — try again shortly.
            </p>
          )}
        </div>
      </div>

      <div className={styles.list}>
        {excerpts.map((excerpt, i) => (
          <article
            key={excerpt.title}
            className={`fade-up ${styles.thread}`}
            style={{ animationDelay: `${0.05 + i * 0.07}s` }}
          >
            <div className={styles.threadRow}>
              <div className={styles.avatar} aria-hidden="true">
                {excerpt.initials}
              </div>
              <div className={styles.threadBody}>
                <div className={styles.threadMeta}>
                  <span className={styles.author}>{excerpt.author}</span>
                  <span>· {excerpt.meta}</span>
                </div>
                <h3 className={styles.threadTitle}>{excerpt.title}</h3>
                <p className={styles.threadDek}>{excerpt.dek}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
