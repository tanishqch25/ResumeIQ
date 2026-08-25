import React from "react";
import { useNavigate } from "react-router-dom";
import { useAnalysis } from "../../../hooks/useAnalysis";
import { Badge, statusToVariant } from "../../shared/Badge";
import { EmptyState } from "../../shared/EmptyState";
import { Button } from "../../shared/Button";

/**
 * HistoryTable — list of past analyses.
 * Desktop: table. Mobile: stacked cards.
 */

export function HistoryTable() {
  const navigate = useNavigate();
  const { history = [], selectHistoryItem } = useAnalysis();

  const handleSelect = (id) => {
    selectHistoryItem?.(id);
    navigate("/dashboard/overview");
  };

  if (!history.length) {
    return (
      <EmptyState
        heading="No previous analyses"
        description="Analyses you run will appear here so you can track your resume's progress over time."
        action={() => navigate("/upload")}
        actionLabel="Analyze a Resume"
      />
    );
  }

  return (
    <>
      {/* Desktop table */}
      <div className="hidden sm:block overflow-hidden border border-border rounded-lg shadow-card">
        <table className="w-full text-sm" aria-label="Resume analysis history">
          <thead>
            <tr className="bg-background border-b border-border">
              {["Resume", "Date", "Overall Score", "ATS Score", "Job Match", ""].map((h) => (
                <th
                  key={h}
                  scope="col"
                  className="px-5 py-3 text-left text-caption font-semibold text-muted uppercase tracking-wide"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {history.map((row) => (
              <tr
                key={row.id}
                className="bg-surface border-b border-border last:border-0 hover:bg-background/60 transition-colors duration-100"
              >
                <td className="px-5 py-4">
                  <span className="font-medium text-text">{row.fileName}</span>
                </td>
                <td className="px-5 py-4 text-muted">{row.analyzedAt}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-text">{row.overallScore}</span>
                    <Badge label={row.overallLabel} variant={statusToVariant(row.overallLabel)} />
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className="font-semibold text-text">{row.atsScore}</span>
                </td>
                <td className="px-5 py-4">
                  {row.jobMatchScore != null ? (
                    <span className="font-semibold text-text">{row.jobMatchScore}%</span>
                  ) : (
                    <span className="text-muted">—</span>
                  )}
                </td>
                <td className="px-5 py-4 text-right">
                  <Button variant="secondary" size="sm" onClick={() => handleSelect(row.id)}>
                    View Analysis
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile stacked cards */}
      <div className="sm:hidden flex flex-col gap-3">
        {history.map((row) => (
          <div key={row.id} className="bg-surface border border-border rounded-lg shadow-card p-4">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <p className="text-sm font-medium text-text">{row.fileName}</p>
                <p className="text-caption text-muted mt-0.5">{row.analyzedAt}</p>
              </div>
              <Badge label={row.overallLabel} variant={statusToVariant(row.overallLabel)} />
            </div>
            <div className="grid grid-cols-3 gap-3 mb-3 text-center">
              <div>
                <p className="text-h3 font-semibold text-text">{row.overallScore}</p>
                <p className="text-caption text-muted">Overall</p>
              </div>
              <div>
                <p className="text-h3 font-semibold text-text">{row.atsScore}</p>
                <p className="text-caption text-muted">ATS</p>
              </div>
              <div>
                <p className="text-h3 font-semibold text-text">
                  {row.jobMatchScore != null ? `${row.jobMatchScore}%` : "—"}
                </p>
                <p className="text-caption text-muted">Job Match</p>
              </div>
            </div>
            <Button variant="secondary" size="sm" fullWidth onClick={() => handleSelect(row.id)}>
              View Analysis
            </Button>
          </div>
        ))}
      </div>
    </>
  );
}
