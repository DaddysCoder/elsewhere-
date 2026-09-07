import { Link } from "react-router-dom";
import { Wordmark } from "./Wordmark";
import styles from "./SubpageHeader.module.css";

interface NavItem {
  label: string;
  to: string;
  active?: boolean;
}

interface SubpageHeaderProps {
  links: NavItem[];
  avatarInitials?: string;
  maxWidth?: number;
}

export function SubpageHeader({ links, avatarInitials, maxWidth = 900 }: SubpageHeaderProps) {
  return (
    <div className={styles.row} style={{ maxWidth }}>
      <Wordmark size={16} />
      <div className={styles.nav}>
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={link.active ? styles.active : styles.link}
          >
            {link.label}
          </Link>
        ))}
        {avatarInitials && <div className={styles.avatar}>{avatarInitials}</div>}
      </div>
    </div>
  );
}
