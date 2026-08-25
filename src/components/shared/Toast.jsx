import React, { useEffect, useState } from "react";

/**
 * Toast — inline confirmation/notification banner.
 *
 * [21ST_COMPONENT_SLOT: SUCCESS_STATE]
 *
 * Props:
 *   message   — string
 *   type      — "success" | "info" | "warning" | "error"
 *   duration  — ms before auto-dismiss (default 4000, pass 0 for manual only)
 *   onDismiss — callback when dismissed
 */

const typeStyles = {
  success: "bg-soft-green border-accent/30 text-accent",
  info:    "bg-soft-blue border-secondary/30 text-secondary",
  warning: "bg-amber-bg border-amber/30 text-amber",
  error:   "bg-warning-bg border-warning/30 text-warning",
};

const icons = {
  success: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  info: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 7v5M8 5.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  warning: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 2L14 13H2L8 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M8 6v4M8 11.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  error: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 6l4 4M10 6l-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
};

export function Toast({ message, type = "success", duration = 4000, onDismiss }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (duration <= 0) return;
    const t = setTimeout(() => {
      setVisible(false);
      onDismiss?.();
    }, duration);
    return () => clearTimeout(t);
  }, [duration, onDismiss]);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={[
        "flex items-center gap-3 px-4 py-3 rounded-lg border",
        "shadow-card animate-fade-in animate-fill-both",
        typeStyles[type] ?? typeStyles.success,
      ].join(" ")}
    >
      <span className="shrink-0">{icons[type]}</span>
      <span className="text-sm font-medium flex-1">{message}</span>
      <button
        onClick={() => { setVisible(false); onDismiss?.(); }}
        className="shrink-0 opacity-60 hover:opacity-100 transition-opacity duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current rounded"
        aria-label="Dismiss notification"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
