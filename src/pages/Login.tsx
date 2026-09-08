import { useState, type FormEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Wordmark } from "../components/Wordmark";
import { TracePath } from "../components/TracePath";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { HeroVideo } from "../components/HeroVideo";
import { api } from "../lib/api";
import { useAuth } from "../lib/auth";
import styles from "./Login.module.css";

type Mode = "signin" | "access";

export function Login() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { refresh } = useAuth();
  const [mode, setMode] = useState<Mode>("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting">("idle");
  const [error, setError] = useState(
    params.get("error") === "github"
      ? "GitHub sign-in isn’t configured on this host yet."
      : "",
  );

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setError("");
    try {
      if (mode === "signin") {
        await api("/api/login", {
          method: "POST",
          body: JSON.stringify({ email, password }),
        });
      } else {
        await api("/api/request-access", {
          method: "POST",
          body: JSON.stringify({ name, email, password }),
        });
      }
      await refresh();
      navigate("/community");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not complete that.");
    } finally {
      setStatus("idle");
    }
  }

  return (
    <div className={styles.page}>
      <HeroVideo className={styles.video} />
      <div className={styles.colorOverlay} />
      <div className={styles.vignette} />
      <div className={styles.scrim} />

      <TracePath
        path="M 300 780 L 620 700 L 980 730 L 1400 600 L 1680 540"
        dots={[
          { cx: 300, cy: 780, r: 5, delay: "0s" },
          { cx: 980, cy: 730, r: 5, delay: "0.8s" },
          { cx: 1680, cy: 540, r: 6, delay: "1.6s", color: "#e0d4f4" },
        ]}
      />

      <div className={styles.card}>
        <div className={styles.brandBlock}>
          <Wordmark as="span" size={24} variant="onVideo" />
          <span className={styles.signInLabel}>
            {mode === "signin" ? "sign in" : "request access"}
          </span>
        </div>

        <form className={styles.fields} onSubmit={onSubmit}>
          {mode === "access" && (
            <Input
              tone="onVideo"
              type="text"
              label="Name"
              placeholder="how we should address you"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <Input
            tone="onVideo"
            type="email"
            label="Email"
            placeholder="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            tone="onVideo"
            type="password"
            label="Password"
            placeholder="password"
            autoComplete={mode === "signin" ? "current-password" : "new-password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={mode === "access" ? 8 : undefined}
            required
          />
          <Button type="submit" className={styles.submit} disabled={status === "submitting"}>
            {status === "submitting"
              ? "Working…"
              : mode === "signin"
                ? "Sign in"
                : "Create account"}
          </Button>
        </form>

        {error && (
          <p className={styles.error} role="status" aria-live="polite">
            {error}
          </p>
        )}

        <div className={styles.dividerRow}>
          <div className={styles.dividerLine} />
          <span className={styles.dividerLabel}>or</span>
          <div className={styles.dividerLine} />
        </div>

        <Button as="a" href="/api/auth/github" variant="ghost">
          continue with github
        </Button>

        <p className={styles.footerText}>
          {mode === "signin" ? (
            <>
              no account?{" "}
              <button type="button" className={styles.textButton} onClick={() => setMode("access")}>
                request access
              </button>
            </>
          ) : (
            <>
              already have an account?{" "}
              <button type="button" className={styles.textButton} onClick={() => setMode("signin")}>
                sign in
              </button>
            </>
          )}
        </p>
        <Link to="/" className={styles.homeLink}>
          ← back home
        </Link>
      </div>
    </div>
  );
}
