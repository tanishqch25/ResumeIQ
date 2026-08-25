import React from "react";

/**
 * Button — shared primitive.
 * Variants: primary (deep green fill), secondary (outlined), ghost (text only), danger.
 * Sizes: sm, md (default), lg.
 */
const variantStyles = {
  primary:   "bg-primary text-white hover:bg-opacity-90 border border-transparent",
  secondary: "bg-surface text-primary border border-border hover:bg-background",
  ghost:     "bg-transparent text-primary border border-transparent hover:bg-background",
  danger:    "bg-warning text-white border border-transparent hover:bg-opacity-90",
  blue:      "bg-secondary text-white hover:bg-opacity-90 border border-transparent",
};

const sizeStyles = {
  sm: "px-3 py-1.5 text-sm gap-1.5",
  md: "px-4 py-2 text-body gap-2",
  lg: "px-6 py-3 text-body gap-2",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  type = "button",
  onClick,
  className = "",
  icon,
  fullWidth = false,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={[
        "inline-flex items-center justify-center font-medium rounded-lg",
        "transition-all duration-150 ease-in-out",
        "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none",
        variantStyles[variant] ?? variantStyles.primary,
        sizeStyles[size] ?? sizeStyles.md,
        disabled ? "opacity-40 cursor-not-allowed pointer-events-none" : "cursor-pointer",
        fullWidth ? "w-full" : "",
        className,
      ].join(" ")}
      {...props}
    >
      {icon && <span className="shrink-0 w-4 h-4">{icon}</span>}
      {children}
    </button>
  );
}
