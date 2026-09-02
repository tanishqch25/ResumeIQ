import React from "react";
import { useAnalysis } from "../../hooks/useAnalysis";
import { JobDescriptionInput, MatchResults } from "../../components/dashboard/jobmatch/MatchResults";
import { Breadcrumb } from "../../components/shared/Breadcrumb";

const JOB_MATCH_BREADCRUMBS = [
  { label: "Home", to: "/" },
  { label: "Resume Analysis", to: "/dashboard/overview" },
  { label: "Job Description Matching" },
];

export default function JobMatchPage() {
  const { jobMatch, isMatchAnalyzing, analyzeJobMatch, clearJobMatch } = useAnalysis();

  return (
    <div>
      <Breadcrumb items={JOB_MATCH_BREADCRUMBS} />

      <div className="mb-8">
        <h1 className="text-h1 font-semibold text-text">Job Description Matching</h1>
        <p className="text-body text-muted mt-1 max-w-xl">
          Paste any job description to see how your resume aligns with the specific requirements
          of that role — and what to add to strengthen your application.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input */}
        <div>
          <div className="bg-surface border border-border rounded-lg shadow-card p-5">
            {/* CTA above the textarea */}
            <div className="mb-4 p-3 bg-soft-blue rounded-lg border border-secondary/20">
              <p className="text-sm font-medium text-secondary mb-1">
                Paste a job description to match against your resume
              </p>
              <p className="text-sm text-muted leading-relaxed">
                The analysis compares your resume&rsquo;s skills and keywords
                against the role&rsquo;s requirements. A more complete job
                description produces a more accurate match result.
              </p>
            </div>

            {/* [21ST_COMPONENT_SLOT: JOB_MATCH_ANALYSIS] — input half */}
            <JobDescriptionInput onAnalyze={analyzeJobMatch} isLoading={isMatchAnalyzing} />
            {jobMatch && (
              <button
                onClick={clearJobMatch}
                className="mt-3 text-caption text-muted hover:text-text transition-colors duration-150 underline underline-offset-2"
              >
                Clear and start over
              </button>
            )}
          </div>
        </div>

        {/* Results */}
        <div>
          {/* [21ST_COMPONENT_SLOT: JOB_MATCH_ANALYSIS] — results half */}
          <MatchResults result={jobMatch} />
        </div>
      </div>
    </div>
  );
}

