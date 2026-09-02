"use client";

import { useState } from "react";

function Star({
  filled,
  className,
  style,
}: {
  filled: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={filled ? 0 : 1.4}
      className={className}
      style={style}
      aria-hidden
    >
      <path d="M10 1.5l2.59 5.25 5.79.84-4.19 4.08.99 5.77L10 14.77l-5.18 2.67.99-5.77L1.62 7.59l5.79-.84L10 1.5z" />
    </svg>
  );
}

// Read-only — used on review cards.
export function StarRatingDisplay({
  rating,
  size = 16,
}: {
  rating: number;
  size?: number;
}) {
  return (
    <div className="flex gap-0.5 text-gold" role="img" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} filled={n <= rating} className="shrink-0" style={{ width: size, height: size }} />
      ))}
    </div>
  );
}

// Interactive — used in the feedback form.
export function StarRatingInput({
  value,
  onChange,
}: {
  value: number;
  onChange: (rating: number) => void;
}) {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex gap-1" onMouseLeave={() => setHovered(0)}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          onMouseEnter={() => setHovered(n)}
          className="p-0.5 text-gold transition-transform hover:scale-110"
          aria-label={`Rate ${n} out of 5`}
        >
          <Star filled={n <= (hovered || value)} className="h-7 w-7" />
        </button>
      ))}
    </div>
  );
}
