import React, { useState } from "react";
import { ScoreRing } from "../../shared/ScoreRing";
import { Badge } from "../../shared/Badge";
import { Button } from "../../shared/Button";
import { EmptyState } from "../../shared/EmptyState";

/**
 * MatchResults — job description match result display.
 *
 * [21ST_COMPONENT_SLOT: JOB_MATCH_ANALYSIS] — hand-built fallback.
 * Score ring + two-column matching/missing skill tag lists + text suggestions.
 */

export function JobDescriptionInput({ onAnalyze, isLoading }) {
  const [text, setText] = useState("");

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label htmlFor="jd-input" className="block text-sm font-medium text-text mb-2">
          Paste a job description
        </label>
        <textarea
          id="jd-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste the full job description here. The more complete it is, the more accurate the match analysis will be."
          rows={10}
          className={[
            "w-full rounded-lg border border-border bg-surface px-4 py-3",
            "text-sm text-text placeholder-muted leading-relaxed resize-y",
            "transition-colors duration-150",
            "focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20",
          ].join(" ")}
        />
        <p className="text-caption text-muted mt-1.5">
          Supports plain text and copied HTML from job boards — formatting is ignored.
        </p>
      </div>
      <div>
        <Button
          variant="primary"
          size="md"
          disabled={!text.trim() || isLoading}
          onClick={() => onAnalyze(text)}
        >
          {isLoading ? "Analyzing…" : "Analyze Match"}
        </Button>
      </div>
    </div>
  );
}

export function MatchResults({ result }) {
  if (!result) {
    return (
      <EmptyState
        heading="No job description yet"
        description="Paste a job description above and click Analyze Match to see how well your resume aligns with the role."
      />
    );
  }

  return (
    <div className="flex flex-col gap-5 animate-slide-up animate-fill-both">
      {/* Score row */}
      <div className="bg-surface border border-border rounded-lg shadow-card p-5 flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <div className="shrink-0">
          <ScoreRing score={result.matchScore} size="md" label={result.matchLabel} color="blue" />
        </div>
        <div className="flex-1">
          <h2 className="text-h2 font-semibold text-text mb-1">Job Match Analysis</h2>
          <p className="text-sm text-muted leading-relaxed">
            Your resume matches <strong className="text-text">{result.matchScore}%</strong> of the keywords
            and skills in this job description. The analysis below shows where you align well
            and where targeted additions would strengthen your application.
          </p>
        </div>
      </div>

      {/* Skills columns */}
      <div className="grid sm:grid-cols-2 gap-4">
        {/* Matching skills */}
        <div className="bg-surface border border-border rounded-lg shadow-card p-5">
          <h3 className="text-h3 font-medium text-text mb-1 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent" aria-hidden="true" />
            Matching Skills
          </h3>
          <p className="text-caption text-muted mb-3">{result.matchingSkills.length} found in your resume</p>
          <div className="flex flex-wrap gap-1.5">
            {result.matchingSkills.map((skill) => (
              <Badge key={skill} label={skill} variant="good" showDot={false} />
            ))}
          </div>
        </div>

        {/* Missing skills */}
        <div className="bg-surface border border-border rounded-lg shadow-card p-5">
          <h3 className="text-h3 font-medium text-text mb-1 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-warning" aria-hidden="true" />
            Missing Skills
          </h3>
          <p className="text-caption text-muted mb-3">{result.missingSkills.length} skills to consider adding</p>
          <div className="flex flex-wrap gap-1.5">
            {result.missingSkills.map((skill) => (
              <Badge key={skill} label={skill} variant="weak" showDot={false} />
            ))}
          </div>
        </div>
      </div>

      {/* Keyword matches */}
      <div className="bg-surface border border-border rounded-lg shadow-card p-5">
        <h3 className="text-h3 font-medium text-text mb-3">Matching Keywords</h3>
        <div className="flex flex-wrap gap-1.5">
          {result.matchingKeywords.map((kw) => (
            <Badge key={kw} label={kw} variant="info" showDot={false} />
          ))}
        </div>
      </div>

      {/* Suggestions */}
      <div className="bg-surface border border-border rounded-lg shadow-card p-5">
        <h3 className="text-h3 font-medium text-text mb-3">Suggested Improvements</h3>
        <ul className="flex flex-col gap-2.5 list-none">
          {result.suggestions.map((s, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-muted leading-relaxed">
              <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-secondary" aria-hidden="true" />
              {s}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
