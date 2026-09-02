import React, { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { Breadcrumb } from "../shared/Breadcrumb";

/**
 * DashboardShell — persistent shell wrapping all /dashboard/* routes.
 * Renders desktop sidebar + mobile bottom nav + main content area.
 *
 * [21ST_COMPONENT_SLOT: DASHBOARD_TRANSITION] — page content uses CSS fade on route change
 */

/**
 * Route → breadcrumb trail map.
 * Each entry is the ordered trail for that exact pathname.
 * The last item in each array is the current page (no `to`).
 */
const ROUTE_BREADCRUMBS = {
  "/dashboard/overview": [
    { label: "Home", to: "/" },
    { label: "Resume Analysis" },
  ],
  "/dashboard/ats": [
    { label: "Home", to: "/" },
    { label: "Resume Analysis", to: "/dashboard/overview" },
    { label: "ATS Compatibility" },
  ],
  "/dashboard/job-match": null, // JobMatchPage renders its own breadcrumb
  "/dashboard/recommendations": [
    { label: "Home", to: "/" },
    { label: "Resume Analysis", to: "/dashboard/overview" },
    { label: "Recommendations" },
  ],
  "/dashboard/improve": [
    { label: "Home", to: "/" },
    { label: "Resume Analysis", to: "/dashboard/overview" },
    { label: "Resume Improvement" },
  ],
  "/dashboard/history": [
    { label: "Home", to: "/" },
    { label: "Resume Analysis", to: "/dashboard/overview" },
    { label: "Analysis History" },
  ],
  "/dashboard/settings": [
    { label: "Home", to: "/" },
    { label: "Resume Analysis", to: "/dashboard/overview" },
    { label: "Settings" },
  ],
};

export function DashboardShell() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const location = useLocation();

  const breadcrumbItems = ROUTE_BREADCRUMBS[location.pathname];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Mobile overlay sidebar */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-text/20"
            onClick={() => setMobileSidebarOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-surface shadow-modal">
            <Sidebar mobile onClose={() => setMobileSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-sidebar">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center justify-between px-4 h-14 bg-surface border-b border-border">
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="p-2 rounded text-muted hover:text-text transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Open navigation"
          >
            <HamburgerIcon />
          </button>
          <div className="flex items-center gap-2">
            <LogoMark />
            <span className="font-semibold text-h3 text-primary">ResumeIQ</span>
          </div>
          <div className="w-9" aria-hidden="true" />
        </div>

        {/* Page content area with transition */}
        <main
          key={location.pathname}
          className="flex-1 p-6 lg:p-8 animate-slide-up animate-fill-both"
          id="main-content"
          tabIndex="-1"
        >
          {/* Shell-level breadcrumb — rendered for most dashboard pages.
              null means the page renders its own (e.g. JobMatchPage). */}
          {breadcrumbItems != null && (
            <Breadcrumb items={breadcrumbItems} />
          )}
          <Outlet />
        </main>

        {/* Mobile bottom nav */}
        <MobileNav />
      </div>
    </div>
  );
}


function LogoMark() {
  return (
    <svg width="24" height="24" viewBox="0 0 28 28" fill="none" aria-hidden="true">
      <rect width="28" height="28" rx="7" fill="#164E45" />
      <rect x="7" y="8" width="10" height="1.5" rx="0.75" fill="white" />
      <rect x="7" y="12" width="14" height="1.5" rx="0.75" fill="white" />
      <rect x="7" y="16" width="11" height="1.5" rx="0.75" fill="white" />
      <circle cx="20" cy="19" r="4" fill="#3F8F6B" />
      <path d="M18 19l1.5 1.5L22 17" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HamburgerIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
