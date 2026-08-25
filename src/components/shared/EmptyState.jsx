import React from "react";
import { Button } from "./Button";

/**
 * EmptyState — typography-led empty state with a minimal line-icon, heading, supporting text, and CTA.
 * No mascots, no cartoon illustrations. Whitespace-forward design.
 */

function DefaultIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect x="8" y="6" width="24" height="30" rx="3" stroke="#DDE5DF" strokeWidth="1.5" />
      <line x1="13" y1="14" x2="27" y2="14" stroke="#DDE5DF" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="13" y1="19" x2="27" y2="19" stroke="#DDE5DF" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="13" y1="24" x2="21" y2="24" stroke="#DDE5DF" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function EmptyState({
  icon: Icon = DefaultIcon,
  heading,
  description,
  action,
  actionLabel,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="mb-4 text-border">
        <Icon />
      </div>
      <h2 className="text-h3 font-medium text-text mb-2">{heading}</h2>
      {description && (
        <p className="text-body text-muted max-w-sm mb-6">{description}</p>
      )}
      {action && actionLabel && (
        <Button variant="primary" onClick={action}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
