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
 * Hairline rule with a + mark in the centre. Print-proof divider — used to
 * break content blocks within a section without the heaviness of a header.
 */
export function Divider({ className = '' }: { className?: string }) {
  return (
    <div
      className={`relative flex items-center text-fog-1 ${className}`}
      aria-hidden
    >
      <span className="h-px flex-1 bg-white/[0.08]" />
      <span className="mx-3">
        <PlusMark />
      </span>
      <span className="h-px flex-1 bg-white/[0.08]" />
    </div>
  );
}
