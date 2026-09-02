import React from "react";
import { NavLink } from "react-router-dom";

const mobileNavItems = [
  {
    label: "Overview",
    to: "/dashboard/overview",
    icon: (
      <svg width="20" height="20" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <rect x="2" y="2" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="10" y="2" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="2" y="10" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="10" y="10" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    label: "ATS",
    to: "/dashboard/ats",
    icon: (
      <svg width="20" height="20" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 5.5v4l2.5 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Match",
    to: "/dashboard/job-match",
    icon: (
      <svg width="20" height="20" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M2 9h4l2-5 3 10 2-5h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Tips",
    to: "/dashboard/recommendations",
    icon: (
      <svg width="20" height="20" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M9 2l1.8 3.6 4 .6-2.9 2.8.7 4L9 11l-3.6 1.9.7-4L3.2 6.2l4-.6L9 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "History",
    to: "/dashboard/history",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
        <path d="M12 7v5l4 2" />
      </svg>
    ),
  },
];

export function MobileNav() {
  return (
    <nav
      className="lg:hidden flex bg-surface border-t border-border"
      aria-label="Mobile navigation"
    >
      {mobileNavItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            [
              "flex-1 flex flex-col items-center justify-center gap-1 py-2.5 text-caption font-medium transition-colors duration-150",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset",
              isActive ? "text-primary" : "text-muted hover:text-text",
            ].join(" ")
          }
        >
          {item.icon}
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
