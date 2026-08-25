import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { primaryAnalysis, jobMatchResult as defaultJobMatch, analysisHistory as defaultHistory } from "../data/mockData";
import { extractTextFromPDF } from "../utils/pdfExtractor";
import { extractTextFromDOCX } from "../utils/docxExtractor";
import { analyzeResume, analyzeJobMatchClient } from "../utils/resumeAnalyzer";

const AnalysisContext = createContext(null);

const STORAGE_KEY_ANALYSIS = "resumeiq_current_analysis";
const STORAGE_KEY_HISTORY = "resumeiq_analysis_history";
const STORAGE_KEY_FULL_ANALYSES = "resumeiq_full_analyses";

export function AnalysisProvider({ children }) {
  const [analysis, setAnalysis] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ANALYSIS);
      return saved ? JSON.parse(saved) : primaryAnalysis;
    } catch (e) {
      return primaryAnalysis;
    }
  });

  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_HISTORY);
      return saved ? JSON.parse(saved) : defaultHistory;
    } catch (e) {
      return defaultHistory;
    }
  });

  const [fullAnalyses, setFullAnalyses] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_FULL_ANALYSES);
      return saved ? JSON.parse(saved) : { [primaryAnalysis.id]: primaryAnalysis };
    } catch (e) {
      return { [primaryAnalysis.id]: primaryAnalysis };
    }
  });

  const [pendingFile, setPendingFile] = useState(null);
  const [jobMatch, setJobMatch] = useState(null);
  const [isMatchAnalyzing, setIsMatchAnalyzing] = useState(false);
  const [error, setError] = useState(null);

  // Synchronize to localStorage
  useEffect(() => {
    try {
      if (analysis) {
        localStorage.setItem(STORAGE_KEY_ANALYSIS, JSON.stringify(analysis));
      }
    } catch (e) {
      console.warn("Could not save analysis to localStorage", e);
    }
  }, [analysis]);

  useEffect(() => {
    try {
      if (history) {
        localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(history));
      }
    } catch (e) {
      console.warn("Could not save history to localStorage", e);
    }
  }, [history]);

  useEffect(() => {
    try {
      if (fullAnalyses) {
        localStorage.setItem(STORAGE_KEY_FULL_ANALYSES, JSON.stringify(fullAnalyses));
      }
    } catch (e) {
      console.warn("Could not save fullAnalyses to localStorage", e);
    }
  }, [fullAnalyses]);

  /**
   * Process and analyze an uploaded PDF or DOCX file
   */
  const processFile = useCallback(async (file) => {
    if (!file) return null;
    setError(null);

    const isPdf = file.name.toLowerCase().endsWith(".pdf") || file.type === "application/pdf";
    const isDocx = file.name.toLowerCase().endsWith(".docx") || file.type.includes("wordprocessingml");

    if (!isPdf && !isDocx) {
      const errMessage = "Unsupported file type. Please upload a PDF (.pdf) or Word document (.docx).";
      setError(errMessage);
      throw new Error(errMessage);
    }

    try {
      let extracted;
      if (isPdf) {
        extracted = await extractTextFromPDF(file);
      } else {
        extracted = await extractTextFromDOCX(file);
      }

      const result = analyzeResume(extracted.text, file.name);
      setAnalysis(result);

      // Save full analysis object into fullAnalyses map
      setFullAnalyses((prev) => ({
        ...prev,
        [result.id]: result,
      }));

      // Create history item
      const historyItem = {
        id: result.id,
        fileName: result.fileName,
        analyzedAt: result.analyzedAt,
        overallScore: result.overallScore,
        overallLabel: result.overallLabel,
        atsScore: result.ats.score,
        jobMatchScore: null,
      };

      setHistory((prev) => [historyItem, ...prev.filter((item) => item.id !== result.id)]);
      setJobMatch(null);
      setPendingFile(null);

      return result;
    } catch (err) {
      console.error("Resume analysis error:", err);
      setError(err.message || "Failed to analyze resume.");
      throw err;
    }
  }, []);

  /**
   * Client-side job match analysis
   */
  const analyzeJobMatch = useCallback(
    async (jobDescription) => {
      if (!jobDescription.trim()) return;
      setIsMatchAnalyzing(true);

      // Brief UI pause for dynamic transition feel
      await new Promise((resolve) => setTimeout(resolve, 800));

      const matchResult = analyzeJobMatchClient(analysis?.rawText, jobDescription);
      setJobMatch(matchResult || defaultJobMatch);
      setIsMatchAnalyzing(false);
    },
    [analysis]
  );

  const clearJobMatch = useCallback(() => setJobMatch(null), []);

  const selectHistoryItem = useCallback(
    (id) => {
      if (fullAnalyses && fullAnalyses[id]) {
        setAnalysis(fullAnalyses[id]);
      } else if (id === primaryAnalysis.id) {
        setAnalysis(primaryAnalysis);
      }
    },
    [fullAnalyses]
  );

  return (
    <AnalysisContext.Provider
      value={{
        analysis,
        history,
        pendingFile,
        setPendingFile,
        processFile,
        jobMatch,
        isMatchAnalyzing,
        analyzeJobMatch,
        clearJobMatch,
        selectHistoryItem,
        error,
        setError,
      }}
    >
      {children}
    </AnalysisContext.Provider>
  );
}

export function useAnalysisContext() {
  const ctx = useContext(AnalysisContext);
  if (!ctx) {
    throw new Error("useAnalysisContext must be used within an AnalysisProvider");
  }
  return ctx;
}
