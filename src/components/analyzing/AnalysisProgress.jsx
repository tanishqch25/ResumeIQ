import React, { useState, useEffect } from "react";

/**
 * AnalysisProgress — sequential stage stepper shown during analysis loading.
 *
 * [21ST_COMPONENT_SLOT: ANALYSIS_PROGRESS] — hand-built fallback.
 * Vertical stepper with timed stage progression and checkmark fade-in.
 * No spinners, no fake terminal output.
 *
 * Props:
 *   onComplete — callback fired when all stages finish
 */

const STAGES = [
  { id: 1, label: "Reading resume" },
  { id: 2, label: "Understanding structure" },
  { id: 3, label: "Checking ATS compatibility" },
  { id: 4, label: "Analyzing skills" },
  { id: 5, label: "Identifying keywords" },
  { id: 6, label: "Preparing recommendations" },
];

const STAGE_DURATION_MS = 600; // time per stage

export function AnalysisProgress({ onComplete }) {
  const [currentStage, setCurrentStage] = useState(0);
  const [completedStages, setCompletedStages] = useState([]);

  useEffect(() => {
    if (currentStage >= STAGES.length) {
      const t = setTimeout(() => onComplete?.(), 400);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => {
      setCompletedStages((prev) => [...prev, STAGES[currentStage].id]);
      setCurrentStage((prev) => prev + 1);
    }, STAGE_DURATION_MS);

    return () => clearTimeout(t);
  }, [currentStage, onComplete]);

  const totalCompleted = completedStages.length;
  const progress = (totalCompleted / STAGES.length) * 100;

  return (
    <div className="max-w-sm mx-auto">
      {/* Overall progress bar */}
      <div className="mb-8">
        <div className="flex justify-between text-caption text-muted mb-2">
          <span>Analyzing your resume</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 bg-border rounded-full overflow-hidden">
          <div
            className="h-full bg-accent rounded-full"
            style={{
              width: `${progress}%`,
              transition: "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            role="progressbar"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Analysis progress"
          />
        </div>
      </div>

      {/* Stage list */}
      <ol className="flex flex-col gap-3" aria-label="Analysis stages">
        {STAGES.map((stage, i) => {
          const isDone    = completedStages.includes(stage.id);
          const isActive  = currentStage === i && !isDone;
          const isPending = !isDone && !isActive;

          return (
            <li
              key={stage.id}
              className={[
                "flex items-center gap-3 transition-opacity duration-250",
                isPending ? "opacity-40" : "opacity-100",
              ].join(" ")}
            >
              {/* Stage indicator */}
              <div className="shrink-0 w-6 h-6 flex items-center justify-center">
                {isDone ? (
                  <CheckCircle className="text-accent" />
                ) : isActive ? (
                  <ActiveDot />
                ) : (
                  <PendingCircle />
                )}
              </div>

              {/* Stage label */}
              <span
                className={[
                  "text-sm",
                  isDone   ? "text-text font-medium" : "",
                  isActive ? "text-text font-medium" : "",
                  isPending ? "text-muted" : "",
                ].join(" ")}
                aria-current={isActive ? "step" : undefined}
              >
                {stage.label}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function CheckCircle({ className = "" }) {
  return (
    <svg
      width="20" height="20" viewBox="0 0 20 20" fill="none"
      className={`animate-fade-in animate-fill-both ${className}`}
      aria-hidden="true"
    >
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" fill="#E8F3EC" />
      <path d="M6.5 10l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ActiveDot() {
  return (
    <div className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center" aria-hidden="true">
      <div className="w-2 h-2 rounded-full bg-primary" />
    </div>
  );
}

function PendingCircle() {
  return (
    <div className="w-5 h-5 rounded-full border-2 border-border" aria-hidden="true" />
  );
}
