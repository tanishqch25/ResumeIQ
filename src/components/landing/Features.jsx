import React from "react";

const features = [
  {
    title: "ATS Compatibility",
    description: "Find out if your resume will survive automated applicant tracking systems before it reaches a recruiter.",
    icon: <ATSIcon />,
  },
  {
    title: "Resume Score",
    description: "Get a clear overall quality score with a category-by-category breakdown so you know exactly where to focus.",
    icon: <ScoreIcon />,
  },
  {
    title: "Skill Analysis",
    description: "See how your listed skills compare against the standards for your target role and industry.",
    icon: <SkillIcon />,
  },
  {
    title: "Keyword Detection",
    description: "Identify the high-frequency keywords your resume is missing and understand why each one matters.",
    icon: <KeywordIcon />,
  },
  {
    title: "Section Review",
    description: "Receive structured feedback on every resume section — contact, summary, experience, education, and skills.",
    icon: <SectionIcon />,
  },
  {
    title: "Improvement Suggestions",
    description: "Get concrete before-and-after rewrites for weak bullets, not just abstract advice.",
    icon: <SuggestIcon />,
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-h1 font-semibold text-text mb-3">What ResumeIQ analyzes</h2>
        <p className="text-body text-muted max-w-xl mx-auto">
          Every analysis covers the six dimensions recruiters and ATS systems actually evaluate —
          so you know exactly what to improve.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((feature, i) => (
          <div
            key={feature.title}
            className={`flex gap-4 p-5 bg-surface border border-border rounded-lg shadow-card animate-slide-up animate-fill-both animate-delay-${i + 1}`}
          >
            <div className="shrink-0 w-9 h-9 bg-soft-green rounded-lg flex items-center justify-center text-accent">
              {feature.icon}
            </div>
            <div>
              <h3 className="text-h3 font-medium text-text mb-1">{feature.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ATSIcon()     { return <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.5"/><path d="M9 5.5v4l2.5 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>; }
function ScoreIcon()   { return <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M9 2l1.8 3.6 4 .6-2.9 2.8.7 4L9 11l-3.6 1.9.7-4L3.2 6.2l4-.6L9 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>; }
function SkillIcon()   { return <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><rect x="2" y="2" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><rect x="10" y="2" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><rect x="2" y="10" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><rect x="10" y="10" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5"/></svg>; }
function KeywordIcon() { return <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><circle cx="7.5" cy="7.5" r="5" stroke="currentColor" strokeWidth="1.5"/><path d="M11.5 11.5L16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>; }
function SectionIcon() { return <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><rect x="2" y="3" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M5 7h8M5 10h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>; }
function SuggestIcon() { return <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="M3 14l3-1 8-8a1.41 1.41 0 00-2-2L4 11l-1 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M10 5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>; }
