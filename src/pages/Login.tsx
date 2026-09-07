import { useState } from "react";
import { Wordmark } from "../components/Wordmark";
import { TracePath } from "../components/TracePath";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import styles from "./Login.module.css";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={styles.page}>
      {/* drop production file at public/uploads/Untitled video.mp4 */}
      <video className={styles.video} autoPlay muted loop playsInline />
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
          <span className={styles.signInLabel}>sign in</span>
        </div>

        <form
          className={styles.fields}
          onSubmit={(e) => e.preventDefault()}
        >
          <Input
            tone="onVideo"
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            tone="onVideo"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" className={styles.submit}>
            Sign in
          </Button>
        </form>

        <div className={styles.dividerRow}>
          <div className={styles.dividerLine} />
          <span className={styles.dividerLabel}>or</span>
          <div className={styles.dividerLine} />
        </div>

        <Button as="a" href="#" variant="ghost" onClick={(e) => e.preventDefault()}>
          continue with github
        </Button>

        <p className={styles.footerText}>
          no account? <a href="#" onClick={(e) => e.preventDefault()}>request access</a>
        </p>
      </div>
    </div>
  );
}
