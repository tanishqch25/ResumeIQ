import React from "react";
import { Navbar } from "../components/layout/Navbar";
import { Hero } from "../components/landing/Hero";
import { Features } from "../components/landing/Features";
import { HowItWorks } from "../components/landing/HowItWorks";
import { Reviews } from "../components/landing/Reviews";
import { FAQ } from "../components/landing/FAQ";
import { Footer } from "../components/layout/Footer";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export default function LandingPage() {
  useDocumentTitle("ResumeIQ — AI Resume Analyzer & ATS Optimization");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main id="main-content">
        <Hero />
        <Features />
        <HowItWorks />
        <Reviews />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

