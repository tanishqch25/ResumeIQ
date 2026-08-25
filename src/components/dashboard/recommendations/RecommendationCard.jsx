import React from "react";
import { Card } from "../../shared/Card";
import { Badge } from "../../shared/Badge";

/**
 * RecommendationCard — a single prioritized recommendation card.
 *
 * [21ST_COMPONENT_SLOT: RECOMMENDATION_CARDS] — hand-built fallback.
 * Structure: Problem → Why it matters → What to do.
 */

const priorityConfig = {
  high:   { label: "High Priority",   variant: "weak",              borderClass: "border-l-warning" },
  medium: { label: "Medium Priority", variant: "needs-improvement",  borderClass: "border-l-amber" },
  optional: { label: "Optional",      variant: "info",               borderClass: "border-l-secondary" },
};

export function RecommendationCard({ recommendation, priority, index = 0 }) {
  const cfg = priorityConfig[priority] ?? priorityConfig.optional;

  return (
    <div
      className={[
        "bg-surface border border-border border-l-4 rounded-lg shadow-card p-5",
        "animate-slide-up animate-fill-both",
        `animate-delay-${Math.min(index + 1, 8)}`,
        cfg.borderClass,
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-h3 font-medium text-text flex-1">{recommendation.problem}</h3>
        <Badge label={cfg.label} variant={cfg.variant} size="sm" className="shrink-0" />
      </div>

      <div className="flex flex-col gap-3">
        <div>
          <p className="text-caption font-medium text-muted uppercase tracking-wide mb-1">Why it matters</p>
          <p className="text-sm text-muted leading-relaxed">{recommendation.whyItMatters}</p>
        </div>
        <div className="border-t border-border pt-3">
          <p className="text-caption font-medium text-accent uppercase tracking-wide mb-1">What to do</p>
          <p className="text-sm text-text leading-relaxed">{recommendation.whatToDo}</p>
        </div>
      </div>
    </div>
  );
}

export function RecommendationGroup({ title, items, priority }) {
  if (!items?.length) return null;

  return (
    <section aria-labelledby={`rec-group-${priority}`} className="mb-8">
      <h2
        id={`rec-group-${priority}`}
        className="text-h3 font-semibold text-text mb-4 flex items-center gap-2"
      >
        <PriorityIcon priority={priority} />
        {title}
        <span className="ml-1 text-caption font-medium text-muted bg-background border border-border rounded px-2 py-0.5">
          {items.length}
        </span>
      </h2>
      <div className="flex flex-col gap-3">
        {items.map((rec, i) => (
          <RecommendationCard key={rec.id} recommendation={rec} priority={priority} index={i} />
        ))}
      </div>
    </section>
  );
}

function PriorityIcon({ priority }) {
  if (priority === "high") return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-warning" aria-hidden="true">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 5v4M8 10.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
  if (priority === "medium") return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-amber" aria-hidden="true">
      <path d="M8 2L14 13H2L8 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M8 6v4M8 11.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-secondary" aria-hidden="true">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 7v5M8 5.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}
