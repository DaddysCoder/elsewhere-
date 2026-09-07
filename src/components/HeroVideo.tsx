import styles from "./HeroVideo.module.css";

/**
 * Drop the production file at public/uploads/Untitled video.mp4 and set
 * `src` below to enable it — the filter/overlay treatment is already wired
 * up per the brand book's duotone hero-imagery spec.
 */
export function HeroVideo() {
  return (
    <video
      className={styles.video}
      autoPlay
      muted
      loop
      playsInline
      // src="/uploads/Untitled video.mp4"
    />
  );
}
