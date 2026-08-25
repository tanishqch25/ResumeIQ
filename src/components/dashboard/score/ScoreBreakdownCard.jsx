import React from "react";
import { Card } from "../../shared/Card";
import { Badge, statusToVariant } from "../../shared/Badge";
import { ProgressBar } from "../../shared/ProgressBar";

/**
 * ScoreBreakdownCard — grid card showing all 6 score categories.
 * Uses small ProgressBar per category, score number + badge status.
 * Color: green for strong, blue for informational, amber for needs-improvement, warning for weak.
 */

function scoreToColor(score) {
  if (score >= 85) return "green";
  if (score >= 70) return "blue";
  if (score >= 55) return "amber";
  return "warning";
}

function ScoreCategoryRow({ label, score, badge, description }) {
  const color  = scoreToColor(score);
  const variant = statusToVariant(badge);

  return (
    <div className="flex items-start gap-4 py-4 border-b border-border last:border-0">
      {/* Score number */}
      <div className="shrink-0 w-10 text-right">
        <span className="text-h2 font-semibold text-text">{score}</span>
      </div>

      {/* Bar + info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1.5 gap-3">
          <span className="text-sm font-medium text-text">{label}</span>
          <Badge label={badge} variant={variant} size="sm" />
        </div>
        <ProgressBar value={score} color={color} />
        <p className="text-caption text-muted mt-1.5">{description}</p>
      </div>
    </div>
  );
}

export function ScoreBreakdownCard({ breakdown }) {
  const categories = [
    { key: "atsCompatibility", label: "ATS Compatibility" },
    { key: "contentQuality",   label: "Content Quality" },
    { key: "formatting",       label: "Formatting" },
    { key: "skills",           label: "Skills" },
    { key: "experience",       label: "Experience" },
    { key: "keywords",         label: "Keywords" },
  ];

  return (
    <Card padding="none" className="overflow-hidden">
      <div className="px-5 py-4 border-b border-border">
        <h2 className="text-h3 font-semibold text-text">Score Breakdown</h2>
        <p className="text-caption text-muted mt-0.5">Category-by-category assessment with action context</p>
      </div>
      <div className="px-5">
        {categories.map(({ key, label }) => {
          const data = breakdown[key];
          return (
            <ScoreCategoryRow
              key={key}
              label={label}
              score={data.score}
              badge={data.label}
              description={data.description}
            />
          );
        })}
      </div>
    </Card>
  );
}
