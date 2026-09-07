import styles from "./TexturePlate.module.css";

interface TexturePlateProps {
  height: number;
  opacity?: number;
}

/**
 * Stand-in for the duotone field-plate photography referenced in the handoff
 * (src/assets/dune-texture.png, field-plate-01.png, terrain-model-03.png,
 * signal-path-02.png). Drop the real asset in as an <img> with the same
 * mask-image/opacity treatment once production photography is available.
 */
export function TexturePlate({ height, opacity = 0.5 }: TexturePlateProps) {
  return (
    <div
      className={styles.plate}
      style={{ height, opacity }}
      aria-hidden="true"
    />
  );
}
