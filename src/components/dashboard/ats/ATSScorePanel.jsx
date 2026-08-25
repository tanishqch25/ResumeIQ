import React from "react";
import { Card } from "../../shared/Card";
import { Badge } from "../../shared/Badge";
import { ScoreRing } from "../../shared/ScoreRing";

/**
 * ATSScorePanel — ATS analysis summary card.
 *
 * [21ST_COMPONENT_SLOT: ATS_SCORE_COMPONENT] — hand-built fallback.
 * Reuses ScoreRing at "md" size + keyword coverage lists + formatting issues.
 */

export function ATSScorePanel({ ats }) {
  return (
    <div className="flex flex-col gap-5">
      {/* Score + keyword overview */}
      <Card padding="lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          {/* Ring */}
          <div className="shrink-0">
            <ScoreRing score={ats.score} size="md" label="ATS Score" color="green" />
          </div>

          {/* Keyword summary */}
          <div className="flex-1">
            <h2 className="text-h3 font-semibold text-text mb-1">Keyword Coverage</h2>
            <p className="text-sm text-muted mb-4">
              {ats.matchedKeywords.length} of{" "}
              {ats.matchedKeywords.length + ats.missingKeywords.length} target keywords matched
            </p>

            <div className="flex flex-col gap-3">
              {/* Matched */}
              <div>
                <p className="text-caption font-medium text-accent mb-2 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
                  Matched keywords
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {ats.matchedKeywords.map((kw) => (
                    <Badge key={kw} label={kw} variant="good" showDot={false} />
                  ))}
                </div>
              </div>

              {/* Missing */}
              <div>
                <p className="text-caption font-medium text-warning mb-2 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-warning" aria-hidden="true" />
                  Missing keywords
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {ats.missingKeywords.map((kw) => (
                    <Badge key={kw} label={kw} variant="weak" showDot={false} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Formatting issues */}
      <Card padding="none">
        <div className="px-5 py-4 border-b border-border">
          <h2 className="text-h3 font-semibold text-text">Formatting Issues</h2>
          <p className="text-caption text-muted mt-0.5">Issues that may affect how ATS systems parse your resume</p>
        </div>
        <div className="px-5 py-2">
          {ats.formattingIssues.map((issue, i) => (
            <div key={i} className="flex items-start gap-3 py-3 border-b border-border last:border-0">
              <IssueIcon severity={issue.severity} />
              <p className="text-sm text-muted leading-relaxed">{issue.message}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Section recognition */}
      <Card padding="none">
        <div className="px-5 py-4 border-b border-border">
          <h2 className="text-h3 font-semibold text-text">Section Recognition</h2>
          <p className="text-caption text-muted mt-0.5">Which sections the ATS parser could clearly identify</p>
        </div>
        <div className="px-5 py-2">
          {ats.sectionRecognition.map((sec, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
              <span className="text-sm text-text">{sec.name}</span>
              {sec.recognized ? (
                <span className="flex items-center gap-1.5 text-caption font-medium text-accent">
                  <CheckIcon /> Recognized
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-caption font-medium text-warning">
                  <XIcon /> Not detected
                </span>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function IssueIcon({ severity }) {
  const color = severity === "warning" ? "text-warning" : "text-amber";
  return (
    <div className={`shrink-0 mt-0.5 ${color}`}>
      {severity === "warning" ? (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-label="Warning" role="img">
          <path d="M8 2L14 13H2L8 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
          <path d="M8 6v4M8 11v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-label="Information" role="img">
          <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M8 7v5M8 5.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      )}
    </div>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M4.5 7l2 2 3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M5 5l4 4M9 5l-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );
}
