import React from "react";
import { reviews } from "../../data/reviewsData";

/**
 * Reviews — Testimonials / User feedback section for the landing page.
 *
 * Adheres to the calm, professional ResumeIQ design system:
 * - Clean card hierarchy with subtle borders and shadows
 * - Star rating visualization with accessible aria labels
 * - Author initials avatar and role/context attribution
 * - Transparent and respectful formatting for reviews
 */
export function Reviews() {
  return (
    <section
      id="reviews"
      className="py-20 px-6 max-w-6xl mx-auto"
      aria-label="User reviews and feedback"
    >
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 bg-soft-green text-accent text-caption font-medium px-3 py-1 rounded-full border border-accent/20 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
          User Feedback
        </div>
        <h2 className="text-h1 font-semibold text-text mb-3">
          Trusted by serious job seekers
        </h2>
        <p className="text-body text-muted max-w-xl mx-auto">
          See how job seekers use ResumeIQ to eliminate ATS blind spots and present their strongest credentials.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {reviews.map((review, i) => (
          <article
            key={review.id}
            className={`bg-surface border border-border rounded-xl p-6 shadow-card flex flex-col justify-between animate-slide-up animate-fill-both animate-delay-${i + 1}`}
          >
            <div>
              {/* Star Rating */}
              <div className="flex items-center gap-1 mb-4" aria-label={`Rating: ${review.rating} out of 5 stars`}>
                {Array.from({ length: 5 }).map((_, starIdx) => (
                  <StarIcon key={starIdx} filled={starIdx < review.rating} />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-sm text-text leading-relaxed mb-6">
                &ldquo;{review.quote}&rdquo;
              </blockquote>
            </div>

            {/* Author Attribution */}
            <div className="flex items-center gap-3 pt-4 border-t border-border">
              <div
                className="w-9 h-9 rounded-full bg-soft-green text-primary flex items-center justify-center text-xs font-semibold shrink-0"
                aria-hidden="true"
              >
                {review.avatarInitials}
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-text truncate">{review.author}</div>
                <div className="text-caption text-muted truncate">
                  {review.role} &middot; {review.company}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function StarIcon({ filled }) {
  return (
    <svg
      className={`w-4 h-4 ${filled ? "text-amber" : "text-border"}`}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}
