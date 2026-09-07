interface AppIconProps {
  size?: number;
  shape?: "squircle" | "circle" | "square";
}

export function AppIcon({ size = 96, shape = "squircle" }: AppIconProps) {
  const radius =
    shape === "circle" ? size / 2 : shape === "square" ? 0 : size * 0.22;

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        background: "#1a1a2e",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-mono)",
        fontWeight: 700,
        fontSize: size * 0.46,
        color: "var(--accent)",
        flexShrink: 0,
      }}
      aria-hidden="true"
    >
      {"{}"}
    </div>
  );
}
