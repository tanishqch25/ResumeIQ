import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../shared/Button";

/**
 * Hero — landing page hero section.
 *
 * [21ST_COMPONENT_SLOT: HERO_PRODUCT_PREVIEW] — hand-built fallback:
 * a styled static preview card mimicking the Overview score panel.
 */

export function Hero() {
  const navigate = useNavigate();

  return (
    <section className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left — copy */}
        <div className="animate-slide-up animate-fill-both">
          <div className="inline-flex items-center gap-2 bg-soft-green text-accent text-caption font-medium px-3 py-1 rounded-full border border-accent/20 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
            Resume Intelligence Platform
          </div>

          <h1 className="text-h1 lg:text-display font-semibold text-text mb-5 leading-tight">
            Understand what your resume is{" "}
            <span className="text-primary">really saying.</span>
          </h1>

          <p className="text-body text-muted mb-8 max-w-md leading-relaxed">
            ResumeIQ analyzes your resume's structure, ATS readiness, skills coverage,
            keyword density, and formatting — then gives you a clear, prioritized action
            plan to improve it.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate("/upload")}
            >
              Analyze My Resume
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
            >
              See How It Works
            </Button>
          </div>


        </div>

        {/* Right — [21ST_COMPONENT_SLOT: HERO_PRODUCT_PREVIEW] */}
        {/* Hand-built static preview card mimicking the dashboard Overview */}
        <div
          className="animate-slide-up animate-fill-both animate-delay-2 relative"
          aria-hidden="true"
        >
          <DashboardPreview />
        </div>
      </div>
    </section>
  );
}

function DashboardPreview() {
  return (
    <div className="relative">
      {/* Subtle depth shadow behind the card */}
      <div className="absolute -inset-2 bg-soft-green/30 rounded-xl blur-2xl" aria-hidden="true" />

      {/* Main card */}
      <div className="relative bg-surface border border-border rounded-xl shadow-modal overflow-hidden">
        {/* Card header */}
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-text">john_doe_resume.pdf</div>
            <div className="text-caption text-muted mt-0.5">Analyzed on Aug 10, 2026</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="px-3 py-1 text-caption font-medium bg-soft-blue text-secondary rounded border border-secondary/20">Re-analyze</div>
          </div>
        </div>

        {/* Score row */}
        <div className="px-5 py-5 flex items-center gap-6">
          {/* Mini score ring */}
          <MiniScoreRing score={82} />

          {/* Breakdown */}
          <div className="flex-1">
            <div className="text-caption text-muted mb-2 font-medium">Score Breakdown</div>
            {[
              { label: "ATS Compatibility", score: 88, color: "#3F8F6B" },
              { label: "Content Quality",   score: 79, color: "#2563EB" },
              { label: "Formatting",        score: 91, color: "#3F8F6B" },
              { label: "Keywords",          score: 76, color: "#B8863A" },
            ].map((item) => (
              <div key={item.label} className="mb-2.5">
                <div className="flex justify-between text-caption mb-1">
                  <span className="text-muted">{item.label}</span>
                  <span className="font-medium text-text">{item.score}</span>
                </div>
                <div className="h-1 rounded-full bg-border overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${item.score}%`, backgroundColor: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section status list */}
        <div className="px-5 pb-5">
          <div className="text-caption text-muted mb-2 font-medium">Section Analysis</div>
          <div className="flex flex-col gap-1.5">
            {[
              { name: "Contact Information",   status: "Good",             dot: "#3F8F6B" },
              { name: "Professional Summary",  status: "Needs Improvement", dot: "#B8863A" },
              { name: "Experience",            status: "Good",             dot: "#3F8F6B" },
              { name: "Skills",                status: "Needs Improvement", dot: "#B8863A" },
            ].map((s) => (
              <div key={s.name} className="flex items-center justify-between py-1.5 border-b border-border last:border-0">
                <span className="text-caption text-muted">{s.name}</span>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.dot }} />
                  <span className="text-caption font-medium text-text">{s.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniScoreRing({ score }) {
  const r    = 30;
  const circ = 2 * Math.PI * r;
  const fill = circ - (score / 100) * circ;

  return (
    <div className="flex flex-col items-center shrink-0">
      <svg width="80" height="80" viewBox="0 0 80 80">
        <circle cx="40" cy="40" r={r} fill="none" stroke="#DDE5DF" strokeWidth="6" />
        <circle
          cx="40" cy="40" r={r}
          fill="none"
          stroke="#3F8F6B"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={fill}
          transform="rotate(-90 40 40)"
        />
        <text x="40" y="40" textAnchor="middle" dominantBaseline="central"
          fill="#17211D" fontFamily="Inter, system-ui, sans-serif" fontWeight="600" fontSize="18">
          {score}
        </text>
      </svg>
      <span className="text-caption text-muted mt-0.5">Strong</span>
    </div>
  );
}
