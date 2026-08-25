import React from "react";
import { useAnalysis } from "../../hooks/useAnalysis";
import { JobDescriptionInput, MatchResults } from "../../components/dashboard/jobmatch/MatchResults";

export default function JobMatchPage() {
  const { jobMatch, isMatchAnalyzing, analyzeJobMatch, clearJobMatch } = useAnalysis();

  return (
    <div>
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
