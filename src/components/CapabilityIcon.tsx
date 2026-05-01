type Variant = 'architecture' | 'data' | 'platform';

/**
 * Small geometric vignette specific to each capability card. Hairline
 * outline, monochrome, 32×32 viewBox.
 */
export function CapabilityIcon({ variant }: { variant: Variant }) {
  const common = {
    width: 36,
    height: 36,
    viewBox: '0 0 32 32',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
    className: 'text-fog-3',
  };

  if (variant === 'architecture') {
    return (
      <svg {...common}>
        <rect x="6" y="4" width="20" height="4" />
        <rect x="4" y="14" width="24" height="4" />
        <rect x="2" y="24" width="28" height="4" />
        <line x1="10" y1="8" x2="10" y2="14" opacity="0.5" />
        <line x1="22" y1="8" x2="22" y2="14" opacity="0.5" />
        <line x1="8" y1="18" x2="8" y2="24" opacity="0.5" />
        <line x1="24" y1="18" x2="24" y2="24" opacity="0.5" />
      </svg>
    );
  }
  if (variant === 'data') {
    return (
      <svg {...common}>
        <line x1="8" y1="6" x2="24" y2="6" />
        <line x1="8" y1="6" x2="16" y2="18" />
        <line x1="24" y1="6" x2="16" y2="18" />
        <line x1="16" y1="18" x2="6" y2="26" />
        <line x1="16" y1="18" x2="26" y2="26" />
        <circle cx="8" cy="6" r="1.5" fill="currentColor" />
        <circle cx="24" cy="6" r="1.5" fill="currentColor" />
        <circle cx="16" cy="18" r="2" fill="currentColor" />
        <circle cx="6" cy="26" r="1.5" fill="currentColor" />
        <circle cx="26" cy="26" r="1.5" fill="currentColor" />
      </svg>
    );
  }
  // platform
  return (
    <svg {...common}>
      <rect x="2" y="6" width="10" height="14" />
      <rect x="14" y="6" width="10" height="14" />
      <rect x="26" y="6" width="4" height="14" />
      <line x1="2" y1="24" x2="30" y2="24" />
      <line x1="6" y1="26" x2="6" y2="28" />
      <line x1="20" y1="26" x2="20" y2="28" />
      <line x1="28" y1="26" x2="28" y2="28" />
    </svg>
  );
}
