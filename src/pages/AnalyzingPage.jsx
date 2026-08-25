import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AnalysisProgress } from "../components/analyzing/AnalysisProgress";
import { useAnalysisContext } from "../context/AnalysisContext";
import { Button } from "../components/shared/Button";

export default function AnalyzingPage() {
  const navigate = useNavigate();
  const { pendingFile, processFile } = useAnalysisContext();
  const [analysisError, setAnalysisError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let isMounted = true;
    if (!pendingFile) return;

    setIsProcessing(true);
    setAnalysisError(null);

    processFile(pendingFile)
      .then(() => {
        if (isMounted) {
          setIsDone(true);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setAnalysisError(err.message || "Failed to process uploaded file.");
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsProcessing(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [pendingFile, processFile]);

  const handleComplete = useCallback(() => {
    navigate("/dashboard/overview", { replace: true });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      {/* Logo */}
      <div className="mb-10">
        <LogoWithName />
      </div>

      <div className="bg-surface border border-border rounded-xl shadow-card px-8 py-10 w-full max-w-md animate-fade-in animate-fill-both">
        {analysisError ? (
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-warning/10 text-warning flex items-center justify-center mx-auto mb-4 font-bold text-lg">
              !
            </div>
            <h2 className="text-h3 font-semibold text-text mb-2">Analysis Error</h2>
            <p className="text-body text-muted mb-6">{analysisError}</p>
            <Button variant="primary" fullWidth onClick={() => navigate("/upload")}>
              Try Another Resume
            </Button>
          </div>
        ) : (
          <>
            <h1 className="text-h3 font-semibold text-text mb-6 text-center">
              Analyzing {pendingFile ? pendingFile.name : "your resume"}
            </h1>
            <AnalysisProgress onComplete={handleComplete} />
          </>
        )}
      </div>

      {!analysisError && (
        <p className="text-caption text-muted mt-6">
          This usually takes a few seconds.
        </p>
      )}
    </div>
  );
}

function LogoWithName() {
  return (
    <div className="flex items-center gap-2.5">
      <svg width="32" height="32" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <rect width="28" height="28" rx="7" fill="#164E45" />
        <rect x="7" y="8" width="10" height="1.5" rx="0.75" fill="white" />
        <rect x="7" y="12" width="14" height="1.5" rx="0.75" fill="white" />
        <rect x="7" y="16" width="11" height="1.5" rx="0.75" fill="white" />
        <circle cx="20" cy="19" r="4" fill="#3F8F6B" />
        <path d="M18 19l1.5 1.5L22 17" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="font-semibold text-h2 text-primary">ResumeIQ</span>
    </div>
  );
}
