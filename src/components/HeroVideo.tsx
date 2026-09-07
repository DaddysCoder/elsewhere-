import styles from "./HeroVideo.module.css";
import heroPoster from "../assets/stills/01_aerial_oasis_plain.png";

interface HeroVideoProps {
  className?: string;
}

/**
 * Duotone hero background video — the poster still (a night-desert aerial)
 * shows before the video loads, or if playback fails.
 */
export function HeroVideo({ className }: HeroVideoProps) {
  return (
    <video
      className={className ?? styles.video}
      autoPlay
      muted
      loop
      playsInline
      poster={heroPoster}
      src="/uploads/Untitled video.mp4"
    />
  );
}
