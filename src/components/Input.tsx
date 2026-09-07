import type { InputHTMLAttributes } from "react";
import styles from "./Input.module.css";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  tone?: "surface" | "onVideo";
  label?: string;
};

export function Input({ tone = "surface", className, label, id, ...rest }: InputProps) {
  const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);
  const field = (
    <input
      id={inputId}
      className={[styles.input, styles[tone], className].filter(Boolean).join(" ")}
      {...rest}
    />
  );

  if (!label) return field;

  return (
    <label className={styles.field} htmlFor={inputId}>
      <span className={styles.labelText}>{label}</span>
      {field}
    </label>
  );
}
