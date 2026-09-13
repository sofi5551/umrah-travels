// A single reusable version of the wavy section-transition used across the
// site (was previously hand-copied into every page). `color` sets which
// section's background the wave "flows" from — pass the Tailwind text-color
// class of the section ABOVE (top placement) or BELOW (bottom placement,
// flipped) the seam. Needs a `relative overflow-hidden` ancestor.
// `dimOnFooterHover` is for the wave that sits directly above <Footer /> —
// it darkens in sync with the footer's own hover effect so the wave reads
// as one continuous surface with the footer instead of a separate element.
export default function WaveDivider({
  color,
  position = "top",
  dimOnFooterHover = false,
  className = "",
}: {
  color: string;
  position?: "top" | "bottom";
  dimOnFooterHover?: boolean;
  className?: string;
}) {
  return (
    <svg
      className={`pointer-events-none absolute inset-x-0 h-16 w-full sm:h-20 ${
        position === "top" ? "top-0" : "bottom-0 rotate-180"
      } ${color} ${
        dimOnFooterHover ? "transition-[filter] duration-300 [body:has(footer:hover)_&]:brightness-90" : ""
      } ${className}`}
      viewBox="0 0 1440 100"
      preserveAspectRatio="none"
      fill="currentColor"
      aria-hidden
    >
      <path d="M0,0 L1440,0 L1440,40 C1200,85 960,15 720,55 C480,90 240,10 0,55 Z" />
    </svg>
  );
}
