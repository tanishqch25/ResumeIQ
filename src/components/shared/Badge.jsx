import React from "react";

/**
 * Badge / StatusTag — color-coded status label, always paired with text (never color alone).
 * variants: "good" | "needs-improvement" | "weak" | "excellent" | "info" | "warning" | "amber"
 */
const variantMap = {
  excellent:        "bg-soft-green text-accent border border-accent/20",
  good:             "bg-soft-green text-accent border border-accent/20",
  "needs-improvement": "bg-amber-bg text-amber border border-amber/20",
  weak:             "bg-warning-bg text-warning border border-warning/20",
  info:             "bg-soft-blue text-secondary border border-secondary/20",
  warning:          "bg-warning-bg text-warning border border-warning/20",
  amber:            "bg-amber-bg text-amber border border-amber/20",
  neutral:          "bg-background text-muted border border-border",
};

const dotMap = {
  excellent:           "bg-accent",
  good:                "bg-accent",
  "needs-improvement": "bg-amber",
  weak:                "bg-warning",
  info:                "bg-secondary",
  warning:             "bg-warning",
  amber:               "bg-amber",
  neutral:             "bg-muted",
};

/**
 * Maps a status string to the correct badge variant.
 */
export function statusToVariant(status) {
  if (!status) return "neutral";
  const s = status.toLowerCase();
  if (s === "excellent")           return "excellent";
  if (s === "good" || s === "strong")  return "good";
  if (s.includes("needs"))        return "needs-improvement";
  if (s === "weak")                return "weak";
  return "neutral";
}

export function Badge({ label, variant = "neutral", size = "sm", showDot = true, className = "" }) {
  const styles = variantMap[variant] ?? variantMap.neutral;
  const dot    = dotMap[variant]    ?? dotMap.neutral;

  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 rounded font-medium",
        size === "sm" ? "px-2 py-0.5 text-caption" : "px-2.5 py-1 text-sm",
        styles,
        className,
      ].join(" ")}
    >
      {showDot && <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dot}`} aria-hidden="true" />}
      {label}
    </span>
  );
}
