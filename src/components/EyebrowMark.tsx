/**
 * Tiny geometric dot rendered as a hairline diamond. Used inline before
 * eyebrow text as a small technical accent.
 */
export function EyebrowMark() {
  return (
    <svg
      className="mr-3 inline-block align-middle text-fog-1"
      width="6"
      height="6"
      viewBox="0 0 6 6"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.8"
      aria-hidden
    >
      <polygon points="3,0 6,3 3,6 0,3" />
    </svg>
  );
}
