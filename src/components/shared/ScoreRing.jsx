import React, { useEffect, useRef, useState } from "react";

/**
 * ScoreRing — SVG circular progress ring with animated fill and count-up number.
 *
 * [21ST_COMPONENT_SLOT: SCORE_VISUALIZATION]
 * [21ST_COMPONENT_SLOT: ATS_SCORE_COMPONENT] (same component, smaller size prop)
 * [21ST_COMPONENT_SLOT: JOB_MATCH_ANALYSIS] (same component, smaller size prop)
 *
 * Props:
 *   score     — number 0–100
 *   size      — "lg" (180px, dashboard hero) | "md" (120px, sub-pages) | "sm" (80px, inline)
 *   label     — optional text beneath the number
 *   animate   — animate on mount (default true)
 *   color     — "green" (default) | "blue"
 */

const SIZES = {
  lg: { viewBox: 180, r: 76,  stroke: 10, numSize: "text-display", labelSize: "text-sm" },
  md: { viewBox: 120, r: 50,  stroke: 8,  numSize: "text-h1",      labelSize: "text-caption" },
  sm: { viewBox: 80,  r: 32,  stroke: 6,  numSize: "text-h3",      labelSize: "text-caption" },
};

const COLORS = {
  green: "#3F8F6B",
  blue:  "#2563EB",
};

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

export function ScoreRing({ score = 0, size = "lg", label, animate = true, color = "green" }) {
  const cfg  = SIZES[size] ?? SIZES.lg;
  const cx   = cfg.viewBox / 2;
  const cy   = cfg.viewBox / 2;
  const circ = 2 * Math.PI * cfg.r;
  const targetOffset = circ - (score / 100) * circ;

  const [displayScore, setDisplayScore] = useState(animate ? 0 : score);
  const [dashOffset, setDashOffset]    = useState(animate ? circ : targetOffset);
  const frameRef = useRef(null);

  useEffect(() => {
    if (!animate) {
      setDisplayScore(score);
      setDashOffset(targetOffset);
      return;
    }

    let start = null;
    const duration = 1000;

    function tick(now) {
      if (!start) start = now;
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = easeOutCubic(progress);
      const current  = Math.round(eased * score);
      const offset   = circ - (eased * score / 100) * circ;

      setDisplayScore(current);
      setDashOffset(offset);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        setDisplayScore(score);
        setDashOffset(targetOffset);
      }
    }

    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [score, circ, animate, targetOffset]);

  const trackColor = "#DDE5DF";
  const fillColor  = COLORS[color] ?? COLORS.green;

  return (
    <div
      className="inline-flex flex-col items-center"
      role="img"
      aria-label={`Score: ${score} out of 100${label ? `. ${label}` : ""}`}
    >
      <svg
        width={cfg.viewBox}
        height={cfg.viewBox}
        viewBox={`0 0 ${cfg.viewBox} ${cfg.viewBox}`}
        aria-hidden="true"
      >
        {/* Track */}
        <circle
          cx={cx}
          cy={cy}
          r={cfg.r}
          fill="none"
          stroke={trackColor}
          strokeWidth={cfg.stroke}
        />
        {/* Fill */}
        <circle
          cx={cx}
          cy={cy}
          r={cfg.r}
          fill="none"
          stroke={fillColor}
          strokeWidth={cfg.stroke}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={dashOffset}
          transform={`rotate(-90 ${cx} ${cy})`}
        />
        {/* Score text */}
        <text
          x={cx}
          y={cy}
          textAnchor="middle"
          dominantBaseline="central"
          fill="#17211D"
          fontFamily="Inter, system-ui, sans-serif"
          fontWeight="600"
          fontSize={cfg.viewBox === 180 ? "40" : cfg.viewBox === 120 ? "28" : "20"}
        >
          {displayScore}
        </text>
      </svg>
      {label && (
        <span className={`mt-1.5 font-medium text-muted ${cfg.labelSize}`}>{label}</span>
      )}
    </div>
  );
}
