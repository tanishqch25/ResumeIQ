import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/shared/Button";

/**
 * NotFoundPage — catch-all 404 route.
 *
 * Registered as the path="*" fallback in App.jsx.
 * Uses existing design tokens: colors, typography, Button component.
 * No illustrations, no heavy animation — clean, professional.
 */
export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-20">
      <div className="text-center max-w-md w-full animate-slide-up animate-fill-both">
        {/* 404 numeral — understated, large typographic treatment */}
        <div
          className="text-[96px] font-semibold leading-none text-border select-none mb-6"
          aria-hidden="true"
        >
          404
        </div>

        <h1 className="text-h1 font-semibold text-text mb-3">
          Page not found
        </h1>

        <p className="text-body text-muted mb-10 leading-relaxed">
          The page you&rsquo;re looking for doesn&rsquo;t exist or may have
          been moved. Let&rsquo;s get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" tabIndex={-1}>
            <Button variant="primary" size="lg" className="w-full sm:w-auto">
              Back to Home
            </Button>
          </Link>
          <Link to="/upload" tabIndex={-1}>
            <Button variant="secondary" size="lg" className="w-full sm:w-auto">
              Analyze My Resume
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
