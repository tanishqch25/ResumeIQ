import React from "react";

/**
 * HowItWorks — 3-step flow section.
 *
 * [21ST_COMPONENT_SLOT: PROCESS_STEPS] — hand-built fallback:
 * horizontal (desktop) / vertical (mobile) numbered step flow with connecting line.
 */

const steps = [
  {
    number: "01",
    title: "Upload Your Resume",
    description: "Drop your resume PDF or DOCX file into the upload area. No account required to get started.",
  },
  {
    number: "02",
    title: "ResumeIQ Analyzes It",
    description: "We check your resume across six dimensions: ATS compatibility, structure, content, skills, keywords, and formatting.",
  },
  {
    number: "03",
    title: "Receive Actionable Recommendations",
    description: "Get a clear score, section-by-section feedback, and concrete rewrites — all in plain language, nothing unexplained.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-20 px-6 max-w-6xl mx-auto"
    >
      <div className="text-center mb-14">
        <h2 className="text-h1 font-semibold text-text mb-3">How it works</h2>
        <p className="text-body text-muted max-w-md mx-auto">
          Three steps from resume to clarity. No sign-up required for your first analysis.
        </p>
      </div>

      {/* Steps — horizontal desktop, vertical mobile */}
      <div className="relative">
        {/* Connecting line (desktop only) */}
        <div
          className="hidden lg:block absolute top-9 left-0 right-0 h-px bg-border"
          style={{ left: "calc(16.66% + 18px)", right: "calc(16.66% + 18px)" }}
          aria-hidden="true"
        />

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-6 relative">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`flex lg:flex-col gap-5 lg:gap-4 lg:items-center lg:text-center animate-slide-up animate-fill-both animate-delay-${i + 1}`}
            >
              {/* Step circle */}
              <div className="relative shrink-0">
                <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center text-caption font-semibold z-10 relative">
                  {step.number}
                </div>
                {/* Vertical connecting line (mobile only) */}
                {i < steps.length - 1 && (
                  <div className="lg:hidden absolute left-4 top-9 w-px h-8 bg-border" aria-hidden="true" />
                )}
              </div>

              <div>
                <h3 className="text-h3 font-medium text-text mb-1.5">{step.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
