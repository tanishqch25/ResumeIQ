import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DropZone } from "../components/upload/DropZone";
import { Button } from "../components/shared/Button";
import { useAnalysisContext } from "../context/AnalysisContext";

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const { setPendingFile, setError } = useAnalysisContext();
  const navigate = useNavigate();

  const handleAnalyze = () => {
    if (!selectedFile) return;
    setError(null);
    setPendingFile(selectedFile);
    navigate("/analyzing");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-surface border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-primary font-semibold text-h3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
            aria-label="Back to home"
          >
            <LogoMark />
            ResumeIQ
          </button>
          <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard/overview")}>
            View Dashboard
          </Button>
        </div>
      </header>

      <main id="main-content" className="max-w-2xl mx-auto px-6 py-16">
        <div className="text-center mb-10 animate-slide-up animate-fill-both">
          <h1 className="text-h1 font-semibold text-text mb-3">Upload your resume</h1>
          <p className="text-body text-muted">
            We'll analyze structure, ATS readiness, keywords, and more — then give you a clear action plan.
          </p>
        </div>

        {/* CTA above the drop zone — explains what to do and what you get */}
        <div className="animate-slide-up animate-fill-both animate-delay-1 mb-4 p-4 bg-soft-green rounded-lg border border-accent/20">
          <p className="text-sm font-medium text-primary mb-1">
            Upload your resume — PDF or DOCX
          </p>
          <p className="text-sm text-muted leading-relaxed">
            Your resume will be checked for ATS compatibility, section
            structure, keyword coverage, formatting quality, and skills
            alignment. You&rsquo;ll receive a scored breakdown and a
            prioritized list of specific improvements.
          </p>
        </div>

        {/* DropZone */}
        <div className="animate-slide-up animate-fill-both animate-delay-2">
          <DropZone onFileSelected={setSelectedFile} />
        </div>

        {/* Analyze button */}
        <div className="mt-6 flex justify-center animate-slide-up animate-fill-both animate-delay-3">
          <Button
            variant="primary"
            size="lg"
            disabled={!selectedFile}
            onClick={handleAnalyze}
          >
            Analyze Resume
          </Button>
        </div>

        {/* Privacy note */}
        <p className="text-caption text-muted text-center mt-4 animate-fade-in animate-fill-both animate-delay-4">
          Your resume is processed 100% locally in your browser and never sent to any server.
        </p>
      </main>
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
