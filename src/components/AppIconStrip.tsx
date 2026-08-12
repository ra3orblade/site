import type { CSSProperties } from 'react';
import { AppGlyph } from './AppGlyph';
import { STRIP_APPS, seedFrom } from './glitch';

/**
 * A row of Brainstorm's app glyphs, each tearing on its own offset. Sits in
 * the content flow — unlike the gutter accents it is visible at every width.
 */
export function AppIconStrip({
  size = 20,
  className = '',
  seed = 'apps',
}: {
  size?: number;
  className?: string;
  seed?: string;
}) {
  const base = seedFrom(seed);

  return (
    <div
      className={`flex flex-wrap items-center gap-x-3 gap-y-3 ${className}`}
      aria-hidden
    >
      {STRIP_APPS.map((app, i) => {
        const n = base + i * 7;
        const vars = {
          '--glitch-duration': `${9 + (n % 6) * 1.1}s`,
          '--glitch-delay': `${((n % 17) * 0.94).toFixed(2)}s`,
        } as CSSProperties;
        return (
          <span key={app} className="glitch-icon inline-block" style={vars}>
            <AppGlyph app={app} size={size} />
          </span>
        );
      })}
    </div>
  );
}
