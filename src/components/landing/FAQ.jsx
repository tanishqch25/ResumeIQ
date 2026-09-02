import React, { useState } from "react";
import { faqs } from "../../data/faqData";

/**
 * FAQ — Accessible accordion section for the landing page.
 *
 * - Real <button> triggers for keyboard operability (Tab / Enter / Space)
 * - aria-expanded reflects open state
 * - aria-controls / id pairing for screen readers
 * - Chevron icon (not color-only) indicates open / closed state
 * - Smooth max-height transition; respects prefers-reduced-motion via CSS
 * - Data lives in src/data/faqData.js — edit content there, not here
 */

export function FAQ() {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <section id="faq" className="py-20 px-6 max-w-6xl mx-auto">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-h1 font-semibold text-text mb-3">
            Frequently asked questions
          </h2>
          <p className="text-body text-muted">
            Common questions about how ResumeIQ works and what to expect from
            your analysis.
          </p>
        </div>

        <ol className="list-none flex flex-col gap-2" role="list">
          {faqs.map((faq, i) => {
            const isOpen = openId === faq.id;
            const panelId = `faq-panel-${faq.id}`;
            const buttonId = `faq-btn-${faq.id}`;

            return (
              <li
                key={faq.id}
                className={[
                  "bg-surface border rounded-lg overflow-hidden",
                  "transition-colors duration-150",
                  isOpen ? "border-primary/30" : "border-border",
                  `animate-slide-up animate-fill-both animate-delay-${Math.min(i + 1, 8)}`,
                ].join(" ")}
              >
                <h3 className="m-0">
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(faq.id)}
                    className={[
                      "w-full flex items-center justify-between gap-4",
                      "px-5 py-4 text-left",
                      "text-sm font-medium",
                      "transition-colors duration-150",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset",
                      isOpen ? "text-primary" : "text-text hover:text-primary",
                    ].join(" ")}
                  >
                    <span>{faq.question}</span>
                    <ChevronIcon isOpen={isOpen} />
                  </button>
                </h3>

                {/*
                  Panel: max-height trick for smooth animation.
                  prefers-reduced-motion handled in index.css via
                  the global .faq-panel rule added below.
                */}
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="faq-panel"
                  style={{ "--faq-open": isOpen ? "1" : "0" }}
                  hidden={!isOpen}
                >
                  <div className="px-5 pb-5 pt-0">
                    <p className="text-sm text-muted leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        {/* Contextual link to the analyzer */}
        <p className="text-center text-sm text-muted mt-10">
          Still have questions?{" "}
          <a
            href="/#/upload"
            className="text-primary font-medium underline underline-offset-2 hover:text-accent transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
          >
            Analyze your resume now
          </a>{" "}
          and see what the results look like firsthand.
        </p>
      </div>
    </section>
  );
}

function ChevronIcon({ isOpen }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={[
        "shrink-0 transition-transform duration-200",
        isOpen ? "rotate-180" : "rotate-0",
      ].join(" ")}
      style={{
        transitionTimingFunction: "ease",
      }}
    >
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
