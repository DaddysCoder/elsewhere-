import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Wordmark } from "../components/Wordmark";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { api, formatWhen } from "../lib/api";
import { useAuth } from "../lib/auth";
import styles from "./Thread.module.css";

type ThreadRecord = {
  id: string;
  authorName: string;
  authorInitials: string;
  title: string;
  body: string;
  createdAt: string;
};

type ReplyRecord = {
  id: string;
  authorName: string;
  authorInitials: string;
  body: string;
  createdAt: string;
};

export function Thread() {
  const { id = "" } = useParams();
  const { user } = useAuth();
  const [thread, setThread] = useState<ThreadRecord | null | undefined>(undefined);
  const [replies, setReplies] = useState<ReplyRecord[]>([]);
  const [body, setBody] = useState("");
  const [guestName, setGuestName] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    void api<{ ok: true; thread: ThreadRecord; replies: ReplyRecord[] }>(`/api/threads/${id}`, {
      method: "GET",
    })
      .then((data) => {
        setThread(data.thread);
        setReplies(data.replies);
      })
      .catch(() => setThread(null));
  }, [id]);

  if (thread === null) return <Navigate to="/community" replace />;
  if (!thread) {
    return (
      <div className={styles.page}>
        <p className={styles.loading}>Loading thread…</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.topRow}>
        <Wordmark size={16} />
        <Link to="/community" className={styles.backLink}>
          ← all threads
        </Link>
      </div>

      <article className={`fade-up ${styles.thread}`}>
        <div className={styles.meta}>
          <div className={styles.avatar} aria-hidden="true">
            {thread.authorInitials}
          </div>
          <div>
            <div className={styles.byline}>
              <span className={styles.author}>{thread.authorName}</span>
              <span>· {formatWhen(thread.createdAt)}</span>
            </div>
            <h1 className={styles.title}>{thread.title}</h1>
          </div>
        </div>
        <p className={styles.body}>{thread.body}</p>
      </article>

      <div className={styles.replies}>
        <p className={styles.replyCount}>
          {replies.length} {replies.length === 1 ? "reply" : "replies"}
        </p>
        {replies.map((reply) => (
          <article key={reply.id} className={styles.reply}>
            <div className={styles.avatar} aria-hidden="true">
              {reply.authorInitials}
            </div>
            <div>
              <div className={styles.byline}>
                <span className={styles.author}>{reply.authorName}</span>
                <span>· {formatWhen(reply.createdAt)}</span>
              </div>
              <p className={styles.replyBody}>{reply.body}</p>
            </div>
          </article>
        ))}
      </div>

      <form
        className={styles.composer}
        onSubmit={async (e) => {
          e.preventDefault();
          setStatus("submitting");
          setError("");
          try {
            await api(`/api/threads/${thread.id}/replies`, {
              method: "POST",
              body: JSON.stringify({ body, name: user ? undefined : guestName }),
            });
            const data = await api<{ ok: true; thread: ThreadRecord; replies: ReplyRecord[] }>(
              `/api/threads/${thread.id}`,
              { method: "GET" },
            );
            setReplies(data.replies);
            setBody("");
            setStatus("idle");
          } catch (err) {
            setStatus("error");
            setError(err instanceof Error ? err.message : "Could not post reply.");
          }
        }}
      >
        {!user && (
          <Input
            type="text"
            label="Name"
            placeholder="your name"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            required
          />
        )}
        <Input
          type="text"
          label="Reply"
          placeholder="add to the thread..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          disabled={status === "submitting"}
          required
        />
        <Button type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Posting…" : "Reply"}
        </Button>
        {error && (
          <p className={styles.formNote} role="status" aria-live="polite">
            {error}
          </p>
        )}
      </form>
    </div>
  );
}
