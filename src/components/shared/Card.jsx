import React from "react";

/**
 * Card — surface container with consistent elevation and border.
 * padding: "sm" | "md" (default) | "lg" | "none"
 */
const paddingStyles = {
  none: "",
  sm:   "p-4",
  md:   "p-5",
  lg:   "p-6",
};

export function Card({ children, padding = "md", className = "", as: Tag = "div", ...props }) {
  return (
    <Tag
      className={[
        "bg-surface border border-border rounded-lg shadow-card",
        paddingStyles[padding] ?? paddingStyles.md,
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </Tag>
  );
}
