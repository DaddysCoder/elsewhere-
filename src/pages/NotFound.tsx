import { Link } from "react-router-dom";
import { Wordmark } from "../components/Wordmark";

export function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--ground)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
      }}
    >
      <Wordmark size={22} />
      <p style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--muted-3)" }}>
        404 — this coordinate doesn't resolve to anything.
      </p>
      <Link to="/" style={{ fontFamily: "var(--font-mono)", fontSize: 13 }}>
        ← back home
      </Link>
    </div>
  );
}
