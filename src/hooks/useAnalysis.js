/**
 * useAnalysis — data access hook for resume analysis results.
 *
 * Connects components to AnalysisContext for real client-side resume analysis.
 */
import { useAnalysisContext } from "../context/AnalysisContext";

export function useAnalysis() {
  const {
    analysis,
    history,
    jobMatch,
    isMatchAnalyzing,
    analyzeJobMatch,
    clearJobMatch,
    selectHistoryItem,
    error,
  } = useAnalysisContext();

  return {
    analysis,
    history,
    jobMatch,
    isMatchAnalyzing,
    analyzeJobMatch,
    clearJobMatch,
    selectHistoryItem,
    error,
  };
}
