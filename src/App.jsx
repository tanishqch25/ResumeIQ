import React, { lazy, Suspense } from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { DashboardShell } from "./components/layout/DashboardShell";
import { AnalysisProvider } from "./context/AnalysisContext";
import InteractiveNeuralVortex from "@/components/ui/interactive-neural-vortex-background";

// ── Page-level code splitting for fast initial load ──────────────────────────
const LandingPage         = lazy(() => import("./pages/LandingPage"));
const UploadPage          = lazy(() => import("./pages/UploadPage"));
const AnalyzingPage       = lazy(() => import("./pages/AnalyzingPage"));
const OverviewPage        = lazy(() => import("./pages/dashboard/OverviewPage"));
const ATSPage             = lazy(() => import("./pages/dashboard/ATSPage"));
const JobMatchPage        = lazy(() => import("./pages/dashboard/JobMatchPage"));
const RecommendationsPage = lazy(() => import("./pages/dashboard/RecommendationsPage"));
const ImprovePage         = lazy(() => import("./pages/dashboard/ImprovePage"));
const HistoryPage         = lazy(() => import("./pages/dashboard/HistoryPage"));
const SettingsPage        = lazy(() => import("./pages/dashboard/SettingsPage"));
const NotFoundPage        = lazy(() => import("./pages/NotFoundPage"));

function PageLoader() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-border border-t-accent animate-spin" aria-label="Loading" role="status" />
    </div>
  );
}

export default function App() {
  return (
    <AnalysisProvider>
      <HashRouter>
        {/* Background Neural Vortex Canvas — persistent across all pages without crash */}
        <InteractiveNeuralVortex opacity={0.35} />

        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Public routes */}
            <Route path="/"         element={<LandingPage />} />
            <Route path="/upload"   element={<UploadPage />} />
            <Route path="/analyzing" element={<AnalyzingPage />} />

            {/* Dashboard shell — persistent sidebar layout */}
            <Route path="/dashboard" element={<DashboardShell />}>
              <Route index                   element={<Navigate to="overview" replace />} />
              <Route path="overview"         element={<OverviewPage />} />
              <Route path="ats"              element={<ATSPage />} />
              <Route path="job-match"        element={<JobMatchPage />} />
              <Route path="recommendations"  element={<RecommendationsPage />} />
              <Route path="improve"          element={<ImprovePage />} />
              <Route path="history"          element={<HistoryPage />} />
              <Route path="settings"         element={<SettingsPage />} />
            </Route>

            {/* Fallback — 404 for any unknown route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </HashRouter>
    </AnalysisProvider>
  );
}
