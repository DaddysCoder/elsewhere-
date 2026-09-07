import { useSyncExternalStore } from "react";
import styles from "./HeroVideo.module.css";
import heroPoster from "../assets/stills/01_aerial_oasis_plain.png";

interface HeroVideoProps {
  className?: string;
}

function subscribeReducedMotion(onStoreChange: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

function getReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Duotone hero background video — the poster still (a night-desert aerial)
 * shows before the video loads, if playback fails, or when reduced motion
 * is preferred.
 */
export function HeroVideo({ className }: HeroVideoProps) {
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    () => false,
  );

  return (
    <video
      className={className ?? styles.video}
      autoPlay={!reducedMotion}
      muted
      loop={!reducedMotion}
      playsInline
      poster={heroPoster}
      src={reducedMotion ? undefined : "/uploads/Untitled video.mp4"}
    />
  );
}
