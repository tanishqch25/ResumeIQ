import React from "react";
import { useAnalysis } from "../../hooks/useAnalysis";
import { ComparisonRow } from "../../components/dashboard/improve/ComparisonRow";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";

export default function ImprovePage() {
  useDocumentTitle("Resume Improvement Suggestions | ResumeIQ");
  const { analysis } = useAnalysis();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-h1 font-semibold text-text">Resume Improvement</h1>
        <p className="text-body text-muted mt-1 max-w-xl">
          Concrete before-and-after rewrites for the weakest parts of your resume.
          Use these as starting points — adjust them to reflect your actual experience.
        </p>
      </div>

      {/* [21ST_COMPONENT_SLOT: RESUME_COMPARISON] */}
      <div className="flex flex-col gap-4">
        {analysis.improvements.map((imp, i) => (
          <ComparisonRow key={imp.id} improvement={imp} index={i} />
        ))}
      </div>
    </div>
  );
}
