import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAnalysis } from "../../hooks/useAnalysis";
import { ScoreRing } from "../../components/shared/ScoreRing";
import { ScoreBreakdownCard } from "../../components/dashboard/score/ScoreBreakdownCard";
import { SectionCard } from "../../components/dashboard/sections/SectionCard";
import { Button } from "../../components/shared/Button";
import { Badge, statusToVariant } from "../../components/shared/Badge";
import { Toast } from "../../components/shared/Toast";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";

export default function OverviewPage() {
  useDocumentTitle("Resume Overview | ResumeIQ");
  const { analysis } = useAnalysis();
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);

  const handleDownload = () => {
    setShowToast(true);
  };

  return (
    <div>
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-h1 font-semibold text-text">{analysis.fileName}</h1>
          <p className="text-sm text-muted mt-1">
            Analyzed on {analysis.analyzedAt}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={() => navigate("/upload")}>
            Re-analyze
          </Button>
          <Button variant="secondary" size="sm" onClick={handleDownload}>
            Download Report
          </Button>
        </div>
      </div>

      {/* [21ST_COMPONENT_SLOT: SUCCESS_STATE] — Toast for download confirmation */}
      {showToast && (
        <div className="mb-6">
          <Toast
            message="Report downloaded successfully."
            type="success"
            onDismiss={() => setShowToast(false)}
          />
        </div>
      )}

      {/* Overall Score — [21ST_COMPONENT_SLOT: SCORE_VISUALIZATION] */}
      <div className="bg-surface border border-border rounded-xl shadow-card p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <ScoreRing
            score={analysis.overallScore}
            size="lg"
            label="Overall Score"
            animate
          />
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-display font-semibold text-text">{analysis.overallScore}</span>
              <span className="text-h2 text-muted">/100</span>
              <Badge
                label={analysis.overallLabel}
                variant={statusToVariant(analysis.overallLabel)}
                size="md"
              />
            </div>
            <p className="text-body text-muted max-w-md leading-relaxed">
              {scoreDescription(analysis.overallScore)}
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
              <Button variant="primary" size="sm" onClick={() => navigate("/dashboard/recommendations")}>
                View Recommendations
              </Button>
              <Button variant="secondary" size="sm" onClick={() => navigate("/dashboard/ats")}>
                ATS Analysis
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Score Breakdown + Sections — two column on lg */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <ScoreBreakdownCard breakdown={analysis.breakdown} />

        {/* Section-by-section */}
        <div>
          <div className="mb-3">
            <h2 className="text-h3 font-semibold text-text">Section Analysis</h2>
            <p className="text-caption text-muted mt-0.5">Expand each section for detailed feedback</p>
          </div>
          <div className="flex flex-col gap-2">
            {analysis.sections.map((section, i) => (
              <SectionCard key={section.name} section={section} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* Quick actions bar */}
      <div className="bg-surface border border-border rounded-lg shadow-card p-5">
        <h2 className="text-h3 font-medium text-text mb-3">Next steps</h2>
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { label: "See ATS Analysis",            to: "/dashboard/ats",             desc: "Check your ATS score and keyword gaps." },
            { label: "Match a Job Description",     to: "/dashboard/job-match",       desc: "See how your resume fits a specific role." },
            { label: "View Improvement Suggestions", to: "/dashboard/improve",         desc: "Before/after rewrites for weak bullets." },
          ].map((action) => (
            <button
              key={action.to}
              onClick={() => navigate(action.to)}
              className="text-left p-4 rounded-lg border border-border hover:border-primary/40 hover:bg-soft-green/20 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <p className="text-sm font-medium text-primary mb-1">{action.label} →</p>
              <p className="text-caption text-muted">{action.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function scoreDescription(score) {
  if (score >= 90) return "Excellent resume. Minor polish will bring it to near-perfect.";
  if (score >= 75) return "Strong resume. A few targeted improvements will make it substantially more competitive.";
  if (score >= 55) return "Solid foundation, but meaningful gaps remain. Work through the recommendations below.";
  return "The resume needs significant work before it will perform well with recruiters or ATS systems.";
}
