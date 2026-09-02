import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const navItems = [
  {
    label: "Overview",
    to: "/dashboard/overview",
    icon: (active) => (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" fill={active ? "currentColor" : "none"} fillOpacity={active ? "0.12" : "0"} />
        <rect x="10" y="2" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" fill={active ? "currentColor" : "none"} fillOpacity={active ? "0.12" : "0"} />
        <rect x="2" y="10" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" fill={active ? "currentColor" : "none"} fillOpacity={active ? "0.12" : "0"} />
        <rect x="10" y="10" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" fill={active ? "currentColor" : "none"} fillOpacity={active ? "0.12" : "0"} />
      </svg>
    ),
  },
  {
    label: "ATS Analysis",
    to: "/dashboard/ats",
    icon: (active) => (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 5.5v4l2.5 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Job Match",
    to: "/dashboard/job-match",
    icon: (active) => (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M2 9h4l2-5 3 10 2-5h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Recommendations",
    to: "/dashboard/recommendations",
    icon: (active) => (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M9 2l1.8 3.6 4 .6-2.9 2.8.7 4L9 11l-3.6 1.9.7-4L3.2 6.2l4-.6L9 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill={active ? "currentColor" : "none"} fillOpacity={active ? "0.12" : "0"} />
      </svg>
    ),
  },
  {
    label: "Improve Resume",
    to: "/dashboard/improve",
    icon: (active) => (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M3 14l3-1 8-8a1.41 1.41 0 00-2-2L4 11l-1 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M10 5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "History",
    to: "/dashboard/history",
    icon: (active) => (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
        <path d="M12 7v5l4 2" />
      </svg>
    ),
  },
  {
    label: "Settings",
    to: "/dashboard/settings",
    icon: (active) => (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <circle cx="9" cy="9" r="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 1v2M9 15v2M1 9h2M15 9h2M3.22 3.22l1.41 1.41M13.37 13.37l1.41 1.41M14.78 3.22l-1.41 1.41M4.63 13.37l-1.41 1.41" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

export function Sidebar({ mobile = false, onClose }) {
  const navigate = useNavigate();

  return (
    <aside
      className={[
        "flex flex-col bg-surface border-r border-border",
        mobile
          ? "w-64 h-full"
          : "hidden lg:flex fixed left-0 top-0 bottom-0 w-sidebar",
      ].join(" ")}
      aria-label="Dashboard navigation"
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 h-16 border-b border-border shrink-0">
        <button
          onClick={() => { navigate("/"); onClose?.(); }}
          className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
          aria-label="Go to home"
        >
          <LogoMark />
          <span className="font-semibold text-h3 text-primary">ResumeIQ</span>
        </button>
        {mobile && (
          <button
            onClick={onClose}
            className="ml-auto p-1.5 rounded text-muted hover:text-text transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Close navigation"
          >
            <XIcon />
          </button>
        )}
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <ul className="flex flex-col gap-0.5 list-none" role="list">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                onClick={onClose}
                className={({ isActive }) =>
                  [
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                    isActive
                      ? "bg-soft-green text-primary"
                      : "text-muted hover:text-text hover:bg-background",
                  ].join(" ")
                }
              >
                {({ isActive }) => (
                  <>
                    <span className={isActive ? "text-primary" : "text-muted"}>
                      {item.icon(isActive)}
                    </span>
                    {item.label}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Upload CTA at bottom */}
      <div className="px-4 py-4 border-t border-border shrink-0">
        <button
          onClick={() => { navigate("/upload"); onClose?.(); }}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-opacity-90 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          <UploadIcon />
          Analyze New Resume
        </button>
      </div>
    </aside>
  );
}

function LogoMark() {
  return (
    <svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect width="28" height="28" rx="7" fill="#164E45" />
      <rect x="7" y="8" width="10" height="1.5" rx="0.75" fill="white" />
      <rect x="7" y="12" width="14" height="1.5" rx="0.75" fill="white" />
      <rect x="7" y="16" width="11" height="1.5" rx="0.75" fill="white" />
      <circle cx="20" cy="19" r="4" fill="#3F8F6B" />
      <path d="M18 19l1.5 1.5L22 17" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 11V4M5 7l3-3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 12h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
