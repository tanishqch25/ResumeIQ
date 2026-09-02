import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/shared/Button";
import { useAnalysis } from "../hooks/useAnalysis";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

/**
 * ThankYouPage — Dedicated success confirmation page after resume submission and analysis.
 *
 * Provides honest, transparent status of the analysis, key top-level metrics,
 * and direct primary/secondary calls-to-action.
 */
export default function ThankYouPage() {
  useDocumentTitle("Analysis Complete | ResumeIQ");
  const { analysis } = useAnalysis();
  const navigate = useNavigate();

  const fileName = analysis?.fileName || "Your resume";
  const overallScore = analysis?.overallScore;
  const atsScore = analysis?.ats?.score;

  return (
    <div className="min-h-screen bg-background flex flex-col justify-between">
      {/* Top minimal header */}
      <header className="bg-surface border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-primary font-semibold text-h3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
            aria-label="ResumeIQ Home"
          >
            <LogoMark />
            <span>ResumeIQ</span>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/dashboard/overview")}
          >
            Go to Dashboard
          </Button>
        </div>
      </header>

      {/* Main thank you content */}
      <main id="main-content" className="max-w-xl mx-auto px-6 py-16 text-center animate-slide-up animate-fill-both">
        {/* Animated Checkmark Indicator */}
        <div className="w-16 h-16 rounded-full bg-soft-green text-accent flex items-center justify-center mx-auto mb-6 border border-accent/20">
          <svg
            className="w-8 h-8 text-accent"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-soft-green text-accent text-caption font-medium border border-accent/20 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
          Analysis Complete
        </div>

        <h1 className="text-h1 font-semibold text-text mb-3">
          Thank you for your submission
        </h1>

        <p className="text-body text-muted mb-8 leading-relaxed">
          <strong className="text-text font-medium">{fileName}</strong> has been successfully analyzed.
          We have evaluated your ATS readiness, content structure, skills alignment, and prepared actionable recommendations.
        </p>

        {/* Highlight Score Summary Card */}
        {overallScore !== undefined && (
          <div className="bg-surface border border-border rounded-xl p-6 mb-8 text-left shadow-card">
            <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
              <div>
                <span className="text-caption text-muted uppercase tracking-wider font-semibold">Overall Resume Score</span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-display font-semibold text-text">{overallScore}</span>
                  <span className="text-sm text-muted">/100</span>
                </div>
              </div>
              {atsScore !== undefined && (
                <div className="text-right">
                  <span className="text-caption text-muted uppercase tracking-wider font-semibold">ATS Compatibility</span>
                  <div className="flex items-baseline justify-end gap-2 mt-0.5">
                    <span className="text-h1 font-semibold text-primary">{atsScore}%</span>
                  </div>
                </div>
              )}
            </div>

            <p className="text-sm text-muted">
              Your personalized report is ready with prioritized improvements and keyword insights.
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate("/dashboard/overview")}
            className="w-full sm:w-auto"
          >
            View Analysis Dashboard
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => navigate("/")}
            className="w-full sm:w-auto"
          >
            Back to Home
          </Button>
        </div>

        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-caption text-muted">
            Want to test another version?{" "}
            <Link
              to="/upload"
              className="text-primary font-medium underline underline-offset-2 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
            >
              Upload a new resume
            </Link>
          </p>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-border py-6 text-center">
        <p className="text-caption text-muted">
          &copy; {new Date().getFullYear()} ResumeIQ. Client-side privacy-first resume analysis.
        </p>
      </footer>
    </div>
  );
}

function LogoMark() {
  return (
    <svg width="24" height="24" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect width="28" height="28" rx="7" fill="#164E45" />
      <rect x="7" y="8" width="10" height="1.5" rx="0.75" fill="white" />
      <rect x="7" y="12" width="14" height="1.5" rx="0.75" fill="white" />
      <rect x="7" y="16" width="11" height="1.5" rx="0.75" fill="white" />
      <circle cx="20" cy="19" r="4" fill="#3F8F6B" />
      <path d="M18 19l1.5 1.5L22 17" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
