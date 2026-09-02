import React from "react";
import { Link } from "react-router-dom";

/**
 * Breadcrumb — reusable semantic breadcrumb component.
 *
 * Props:
 *   items: Array<{ label: string, to?: string }>
 *     - All items except the last should have `to` (they become links)
 *     - The last item is the current page — rendered as text, not a link
 *
 * Accessibility:
 *   - <nav aria-label="Breadcrumb"> wrapping element
 *   - <ol> ordered list structure (semantic for breadcrumbs)
 *   - aria-current="page" on current (last) item
 *   - Separator characters are aria-hidden
 *   - Visible focus ring on all links
 *
 * Responsive:
 *   - flex-wrap so long trails wrap gracefully on narrow screens
 */
export function Breadcrumb({ items }) {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol
        className="flex flex-wrap items-center gap-x-1.5 gap-y-1 list-none"
        role="list"
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.label} className="flex items-center gap-x-1.5">
              {/* Separator — not shown before the first item */}
              {index > 0 && (
                <span
                  aria-hidden="true"
                  className="text-caption text-border select-none"
                >
                  /
                </span>
              )}

              {isLast ? (
                /* Current page — not a link */
                <span
                  aria-current="page"
                  className="text-caption text-text font-medium truncate max-w-[180px] sm:max-w-none"
                >
                  {item.label}
                </span>
              ) : (
                /* Ancestor page — clickable link */
                <Link
                  to={item.to}
                  className={[
                    "text-caption text-muted",
                    "hover:text-text transition-colors duration-150",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
