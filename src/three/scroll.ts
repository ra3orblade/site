/**
 * Scroll progress across the full document, in [0, 1].
 * 0 = top of page; 1 = scrolled to the very bottom.
 */
export function getScrollProgress(): number {
  if (typeof window === 'undefined') return 0;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  return max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
}

/**
 * Hero-relative dim factor in [0, 1]. 0 at top, 1 once one viewport scrolled.
 * Used for fading the cinematic look into a quieter background presence.
 */
export function getHeroDim(): number {
  if (typeof window === 'undefined') return 0;
  return Math.min(1, window.scrollY / Math.max(1, window.innerHeight * 0.9));
}

/**
 * Returns a 0..1 visibility envelope for a shape with a scroll window.
 * Fades in at `start`, peaks at `peak`, fades out by `end`.
 */
export function envelope(progress: number, start: number, peak: number, end: number): number {
  if (progress <= start || progress >= end) return 0;
  const v = progress < peak ? (progress - start) / (peak - start) : 1 - (progress - peak) / (end - peak);
  return Math.max(0, Math.min(1, v));
}
