import type { InputHTMLAttributes } from "react";
import styles from "./Input.module.css";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  tone?: "surface" | "onVideo";
};

export function Input({ tone = "surface", className, ...rest }: InputProps) {
  return (
    <input
      className={[styles.input, styles[tone], className].filter(Boolean).join(" ")}
      {...rest}
    />
  );
}
