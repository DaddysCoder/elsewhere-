import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SubpageHeader } from "../components/SubpageHeader";
import { TexturePlate } from "../components/TexturePlate";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { api, formatWhen } from "../lib/api";
import { useAuth } from "../lib/auth";
import styles from "./Community.module.css";
import oasisSide from "../assets/stills/03_oasis_side_view.png";

type ThreadRow = {
  id: string;
  authorName: string;
  authorInitials: string;
  title: string;
  body: string;
  createdAt: string;
  replyCount: number;
};

type FormStatus = "idle" | "submitting" | "error";

export function Community() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [draft, setDraft] = useState("");
  const [guestName, setGuestName] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState("");
  const [threads, setThreads] = useState<ThreadRow[] | null>(null);

  useEffect(() => {
    void api<{ ok: true; threads: ThreadRow[] }>("/api/threads", { method: "GET" })
      .then((data) => setThreads(data.threads))
      .catch(() => setThreads([]));
  }, []);

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
              setError("");
              try {
                const data = await api<{ ok: true; id: string }>("/api/thread", {
                  method: "POST",
                  body: JSON.stringify({
                    message: draft,
                    name: user ? undefined : guestName,
                  }),
                });
                setDraft("");
                navigate(`/community/${data.id}`);
              } catch (err) {
                setStatus("error");
                setError(err instanceof Error ? err.message : "Something went wrong.");
              }
            }}
          >
            {!user && (
              <Input
                type="text"
                label="Name"
                placeholder="your name"
                className={styles.nameInput}
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                required
              />
            )}
            <Input
              type="text"
              label="Start a thread"
              placeholder="start a thread..."
              className={styles.composerInput}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              disabled={status === "submitting"}
              required
            />
            <Button type="submit" disabled={status === "submitting"}>
              {status === "submitting" ? "Posting…" : "Post"}
            </Button>
          </form>
          {error && (
            <p className={styles.formNote} role="status" aria-live="polite">
              {error}
            </p>
          )}
        </div>
      </div>

      <div className={styles.list}>
        {(threads ?? []).map((thread, i) => (
          <Link
            key={thread.id}
            to={`/community/${thread.id}`}
            className={`fade-up ${styles.thread}`}
            style={{ animationDelay: `${0.05 + i * 0.07}s` }}
          >
            <div className={styles.threadRow}>
              <div className={styles.avatar} aria-hidden="true">
                {thread.authorInitials}
              </div>
              <div className={styles.threadBody}>
                <div className={styles.threadMeta}>
                  <span className={styles.author}>{thread.authorName}</span>
                  <span>· {formatWhen(thread.createdAt)}</span>
                </div>
                <h3 className={styles.threadTitle}>{thread.title}</h3>
                <p className={styles.threadDek}>{thread.body}</p>
                <span className={styles.replies}>
                  {thread.replyCount} {thread.replyCount === 1 ? "reply" : "replies"}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
