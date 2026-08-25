import React from "react";

/**
 * ProgressBar — slim horizontal bar for score breakdowns.
 * color: "green" (default) | "blue" | "amber" | "warning"
 */
const barColors = {
  green:   "bg-accent",
  blue:    "bg-secondary",
  amber:   "bg-amber",
  warning: "bg-warning",
};

export function ProgressBar({ value = 0, max = 100, color = "green", className = "", animate = true }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div
      className={`h-1.5 rounded-full bg-border overflow-hidden ${className}`}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
    >
      <div
        className={`h-full rounded-full ${barColors[color] ?? barColors.green}`}
        style={{
          width: `${pct}%`,
          transition: animate ? "width 0.9s cubic-bezier(0.4,0,0.2,1)" : "none",
        }}
      />
    </div>
  );
}
