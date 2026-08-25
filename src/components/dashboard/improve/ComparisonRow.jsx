import React from "react";

/**
 * ComparisonRow — before/after resume improvement pair.
 *
 * [21ST_COMPONENT_SLOT: RESUME_COMPARISON] — hand-built fallback.
 * Two blocks (Original / Improved) with soft-green left border on Improved.
 * No diff-style colors or flashing.
 */

export function ComparisonRow({ improvement, index = 0 }) {
  return (
    <div
      className={[
        "bg-surface border border-border rounded-lg shadow-card overflow-hidden",
        "animate-slide-up animate-fill-both",
        `animate-delay-${Math.min(index + 1, 8)}`,
      ].join(" ")}
    >
      {/* Section label */}
      <div className="px-5 py-3 border-b border-border bg-background">
        <p className="text-caption font-medium text-muted">{improvement.section}</p>
      </div>

      <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
        {/* Original */}
        <div className="p-5">
          <div className="flex items-center gap-1.5 mb-3">
            <span className="w-2 h-2 rounded-full bg-muted/40" aria-hidden="true" />
            <p className="text-caption font-semibold text-muted uppercase tracking-wide">Original</p>
          </div>
          <p className="text-sm text-muted leading-relaxed whitespace-pre-line">{improvement.original}</p>
        </div>

        {/* Improved */}
        <div className="p-5 border-l-4 border-l-accent bg-soft-green/20">
          <div className="flex items-center gap-1.5 mb-3">
            <span className="w-2 h-2 rounded-full bg-accent" aria-hidden="true" />
            <p className="text-caption font-semibold text-accent uppercase tracking-wide">Improved</p>
          </div>
          <p className="text-sm text-text leading-relaxed whitespace-pre-line">{improvement.improved}</p>
        </div>
      </div>
    </div>
  );
}
