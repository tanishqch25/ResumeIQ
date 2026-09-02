import React from "react";
import { HistoryTable } from "../../components/dashboard/history/HistoryTable";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";

export default function HistoryPage() {
  useDocumentTitle("Analysis History | ResumeIQ");
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-h1 font-semibold text-text">Resume History</h1>
        <p className="text-body text-muted mt-1">
          All previous analyses, with scores and dates for easy comparison.
        </p>
      </div>
      <HistoryTable />
    </div>
  );
}
