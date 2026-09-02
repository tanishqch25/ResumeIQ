import React from "react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-surface border-t border-border mt-20" aria-label="Site footer">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <LogoMark />
              <span className="font-semibold text-h3 text-primary">ResumeIQ</span>
            </div>
            <p className="text-sm text-muted leading-relaxed max-w-xs">
              Understand what your resume is really saying — and make it work harder for you.
            </p>
          </div>

          {/* Product — links to real sections */}
          <div>
            <h3 className="text-caption font-semibold text-text uppercase tracking-wider mb-3">
              Product
            </h3>
            <ul className="flex flex-col gap-2 list-none">
              <li>
                <a
                  href="#features"
                  className="text-sm text-muted hover:text-text transition-colors duration-150"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className="text-sm text-muted hover:text-text transition-colors duration-150"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="#faq"
                  className="text-sm text-muted hover:text-text transition-colors duration-150"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Tools — links to real app sections */}
          <div>
            <h3 className="text-caption font-semibold text-text uppercase tracking-wider mb-3">
              Tools
            </h3>
            <ul className="flex flex-col gap-2 list-none">
              <li>
                <Link
                  to="/upload"
                  className="text-sm text-muted hover:text-text transition-colors duration-150"
                >
                  Resume Analyzer
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/ats"
                  className="text-sm text-muted hover:text-text transition-colors duration-150"
                >
                  ATS Compatibility Check
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/job-match"
                  className="text-sm text-muted hover:text-text transition-colors duration-150"
                >
                  Job Description Matcher
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/improve"
                  className="text-sm text-muted hover:text-text transition-colors duration-150"
                >
                  Resume Improvement
                </Link>
              </li>
            </ul>
          </div>

          {/* Get started */}
          <div>
            <h3 className="text-caption font-semibold text-text uppercase tracking-wider mb-3">
              Get Started
            </h3>
            <ul className="flex flex-col gap-2 list-none">
              <li>
                <Link
                  to="/upload"
                  className="text-sm text-muted hover:text-text transition-colors duration-150"
                >
                  Analyze My Resume
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/overview"
                  className="text-sm text-muted hover:text-text transition-colors duration-150"
                >
                  View Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/recommendations"
                  className="text-sm text-muted hover:text-text transition-colors duration-150"
                >
                  View Recommendations
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-caption text-muted">
            &copy; {new Date().getFullYear()} ResumeIQ. All rights reserved.
          </p>
          <p className="text-caption text-muted">
            Built for job seekers who take their careers seriously.
          </p>
        </div>
      </div>
    </footer>
  );
}

function LogoMark() {
  return (
    <svg width="22" height="22" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect width="28" height="28" rx="7" fill="#164E45" />
      <rect x="7" y="8" width="10" height="1.5" rx="0.75" fill="white" />
      <rect x="7" y="12" width="14" height="1.5" rx="0.75" fill="white" />
      <rect x="7" y="16" width="11" height="1.5" rx="0.75" fill="white" />
      <circle cx="20" cy="19" r="4" fill="#3F8F6B" />
      <path d="M18 19l1.5 1.5L22 17" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

