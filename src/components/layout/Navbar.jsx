import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../shared/Button";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Features",    href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
  ];

  return (
    <header
      className={[
        "fixed top-0 inset-x-0 z-50 transition-all duration-200",
        scrolled
          ? "bg-surface/95 backdrop-blur-sm border-b border-border shadow-card"
          : "bg-transparent",
      ].join(" ")}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between" aria-label="Main navigation">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
          aria-label="ResumeIQ home"
        >
          <LogoMark />
          <span className="font-semibold text-h3 text-primary">ResumeIQ</span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-6 list-none" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-body text-muted hover:text-text transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard/overview")}>
            Log in
          </Button>
          <Button variant="primary" size="sm" onClick={() => navigate("/upload")}>
            Analyze My Resume
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded text-muted hover:text-text transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <XIcon /> : <HamburgerIcon />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-surface border-b border-border px-6 py-4">
          <ul className="flex flex-col gap-4 list-none mb-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-body text-muted hover:text-text transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-2">
            <Button variant="secondary" fullWidth onClick={() => { navigate("/dashboard/overview"); setMenuOpen(false); }}>
              Log in
            </Button>
            <Button variant="primary" fullWidth onClick={() => { navigate("/upload"); setMenuOpen(false); }}>
              Analyze My Resume
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

function LogoMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
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

function XIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
