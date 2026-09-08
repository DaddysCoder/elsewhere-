import { Link } from "react-router-dom";
import { Wordmark } from "./Wordmark";
import { useAuth } from "../lib/auth";
import styles from "./SubpageHeader.module.css";

const SECTION_LINKS = [
  { label: "essays", to: "/essays" },
  { label: "notes", to: "/notes" },
  { label: "research", to: "/research" },
  { label: "community", to: "/community" },
] as const;

type SectionPath = (typeof SECTION_LINKS)[number]["to"];

interface SubpageHeaderProps {
  active: SectionPath;
  maxWidth?: number;
}

export function SubpageHeader({ active, maxWidth = 900 }: SubpageHeaderProps) {
  const { user, logout } = useAuth();

  return (
    <div className={styles.row} style={{ maxWidth }}>
      <Wordmark size={16} />
      <nav className={styles.nav} aria-label="Sections">
        {SECTION_LINKS.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={link.to === active ? styles.active : styles.link}
            aria-current={link.to === active ? "page" : undefined}
          >
            {link.label}
          </Link>
        ))}
        {user ? (
          <button
            type="button"
            className={styles.avatar}
            onClick={() => void logout()}
            title={`Signed in as ${user.displayName}. Click to sign out.`}
            aria-label={`Signed in as ${user.displayName}. Sign out`}
          >
            {user.initials}
          </button>
        ) : (
          <Link to="/login" className={styles.link}>
            sign in
          </Link>
        )}
      </nav>
    </div>
  );
}
