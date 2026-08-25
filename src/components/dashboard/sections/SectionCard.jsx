import React, { useState } from "react";
import { Card } from "../../shared/Card";
import { Badge, statusToVariant } from "../../shared/Badge";

/**
 * SectionCard — one card per resume section, collapsible.
 * Shows status badge + suggestions list.
 */

export function SectionCard({ section, index = 0 }) {
  const [expanded, setExpanded] = useState(index === 0);
  const variant = statusToVariant(section.status);

  return (
    <Card
      padding="none"
      className={`overflow-hidden animate-slide-up animate-fill-both animate-delay-${Math.min(index + 1, 8)}`}
    >
      <button
        className="w-full flex items-center justify-between px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-background rounded-lg flex items-center justify-center text-muted">
            <SectionIcon name={section.icon} />
          </div>
          <span className="text-h3 font-medium text-text">{section.name}</span>
        </div>
        <div className="flex items-center gap-3">
          <Badge label={section.status} variant={variant} />
          <ChevronIcon expanded={expanded} />
        </div>
      </button>

      {expanded && (
        <div className="px-5 pb-4 border-t border-border pt-3">
          <ul className="flex flex-col gap-2 list-none">
            {section.suggestions.map((s, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-muted">
                <span className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
}

function ChevronIcon({ expanded }) {
  return (
    <svg
      width="16" height="16" viewBox="0 0 16 16" fill="none"
      className={`text-muted transition-transform duration-150 ${expanded ? "rotate-180" : ""}`}
      aria-hidden="true"
    >
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SectionIcon({ name }) {
  const icons = {
    contact:    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.2"/><path d="M2 12a5 5 0 0110 0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>,
    summary:    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="2" y="2" width="10" height="10" rx="2" stroke="currentColor" strokeWidth="1.2"/><path d="M4 5h6M4 7.5h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>,
    experience: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="2" y="4" width="10" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.2"/><path d="M5 4V3a1 1 0 011-1h2a1 1 0 011 1v1" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/></svg>,
    education:  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 2L12 5l-5 3-5-3 5-3z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/><path d="M4 6.5V10a3 3 0 006 0V6.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>,
    skills:     <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="2" y="2" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.2"/><rect x="8" y="2" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.2"/><rect x="2" y="8" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.2"/><rect x="8" y="8" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="1.2"/></svg>,
    projects:   <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 10l3-1 6-6a1 1 0 00-2-2L3 7 2 10z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/></svg>,
  };
  return icons[name] ?? icons.summary;
}
