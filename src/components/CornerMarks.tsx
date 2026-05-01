function PlusMark() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.8"
      aria-hidden
    >
      <line x1="5" y1="0" x2="5" y2="10" />
      <line x1="0" y1="5" x2="10" y2="5" />
    </svg>
  );
}

/**
 * Tiny + marks at the four corners of the parent (which must be `relative`).
 * Print-proof / cinematic registration aesthetic — purely decorative.
 */
export function CornerMarks() {
  return (
    <span className="pointer-events-none text-fog-1" aria-hidden>
      <span className="absolute left-3 top-3 md:left-4 md:top-4">
        <PlusMark />
      </span>
      <span className="absolute right-3 top-3 md:right-4 md:top-4">
        <PlusMark />
      </span>
      <span className="absolute bottom-3 left-3 md:bottom-4 md:left-4">
        <PlusMark />
      </span>
      <span className="absolute bottom-3 right-3 md:bottom-4 md:right-4">
        <PlusMark />
      </span>
    </span>
  );
}
