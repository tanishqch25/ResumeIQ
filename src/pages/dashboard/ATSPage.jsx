import React from "react";
import { useAnalysis } from "../../hooks/useAnalysis";
import { ATSScorePanel } from "../../components/dashboard/ats/ATSScorePanel";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";

export default function ATSPage() {
  useDocumentTitle("ATS Compatibility Analysis | ResumeIQ");
  const { analysis } = useAnalysis();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-h1 font-semibold text-text">ATS Compatibility</h1>
        <p className="text-body text-muted mt-1 max-w-xl">
          Applicant Tracking Systems scan resumes before a human ever sees them.
          This analysis shows how well your resume survives that process.
        </p>
      </div>

      {/* [21ST_COMPONENT_SLOT: ATS_SCORE_COMPONENT] */}
      <ATSScorePanel ats={analysis.ats} />
    </div>
  );
}
