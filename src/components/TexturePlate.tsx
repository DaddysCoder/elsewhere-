import styles from "./TexturePlate.module.css";

interface TexturePlateProps {
  height: number;
  opacity?: number;
  /** Duotone-graded desert still to show behind the page header. */
  image: string;
}

/**
 * Duotone field-plate photography treatment used behind page headers — a
 * masked, faded still that fades to transparent toward the bottom of the
 * header so it never competes with the real copy stacked on top of it.
 */
export function TexturePlate({ height, opacity = 0.5, image }: TexturePlateProps) {
  return (
    <div className={styles.plate} style={{ height, opacity }} aria-hidden="true">
      <img className={styles.image} src={image} alt="" />
    </div>
  );
}
