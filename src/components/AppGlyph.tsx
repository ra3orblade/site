/**
 * The Brainstorm app set as monochrome hairline glyphs — notes, database,
 * graph, calendar and the rest. The shell ships these as filled Phosphor icons
 * in per-app brand colors; redrawn here as strokes in currentColor so they sit
 * in this site's black-and-fog palette instead of fighting it.
 */
import type { AppName } from './glitch';

function Paths({ app }: { app: AppName }) {
  switch (app) {
    case 'notes':
      return (
        <>
          <path d="M4 3h13l3 3v15H4z" />
          <path d="M8 8h8M8 12h8M8 16h5" opacity="0.6" />
        </>
      );
    case 'database':
      return (
        <>
          <ellipse cx="12" cy="6" rx="7" ry="3" />
          <path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
          <path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" opacity="0.6" />
        </>
      );
    case 'graph':
      return (
        <>
          <circle cx="6" cy="6" r="2.2" />
          <circle cx="18" cy="8" r="2.2" />
          <circle cx="12" cy="15" r="2.6" />
          <circle cx="5" cy="19" r="1.8" />
          <path d="M7.6 7.4 10 13m6.2-3.1L13.9 13M10.2 16.6 6.6 18.2" opacity="0.6" />
        </>
      );
    case 'calendar':
      return (
        <>
          <rect x="3" y="5" width="18" height="16" rx="1.5" />
          <path d="M3 10h18M8 3v4M16 3v4" />
          <path d="M8 14h2M14 14h2M8 18h2M14 18h2" opacity="0.6" />
        </>
      );
    case 'mailbox':
      return (
        <>
          <rect x="3" y="5" width="18" height="14" rx="1.5" />
          <path d="m3.5 6.5 8.5 7 8.5-7" opacity="0.7" />
        </>
      );
    case 'chat':
      return (
        <>
          <path d="M4 4h16v12H9l-5 4z" />
          <path d="M8 9h8M8 12h5" opacity="0.6" />
        </>
      );
    case 'files':
      return (
        <>
          <path d="M3 6h6l2 3h10v11H3z" />
          <path d="M3 12h18" opacity="0.5" />
        </>
      );
    case 'browser':
      return (
        <>
          <rect x="3" y="4" width="18" height="16" rx="1.5" />
          <path d="M3 9h18" />
          <path d="M6 6.5h1.5M9.5 6.5H11" opacity="0.7" />
        </>
      );
    case 'code':
      return (
        <>
          <rect x="3" y="4" width="18" height="16" rx="1.5" />
          <path d="m9 10-2.5 2.5L9 15m6-5 2.5 2.5L15 15" opacity="0.75" />
        </>
      );
    case 'whiteboard':
      return (
        <>
          <rect x="3" y="4" width="18" height="13" rx="1.5" />
          <path d="M12 17v4M8 21h8" opacity="0.6" />
          <path d="M7 9.5h4M7 13h7" opacity="0.7" />
        </>
      );
    case 'tasks':
      return (
        <>
          <rect x="3" y="4" width="18" height="16" rx="1.5" />
          <path d="m7 9.5 1.8 1.8L12 8" />
          <path d="M14.5 10.5H18M7 15.5h11" opacity="0.6" />
        </>
      );
    default:
      // agent — the shell's own mark: a vessel with a spark in it
      return (
        <>
          <path d="M12 3 20 8v8l-8 5-8-5V8z" />
          <circle cx="12" cy="12" r="2.4" opacity="0.8" />
          <path d="M12 3v6.6M12 14.4V21" opacity="0.45" />
        </>
      );
  }
}

export function AppGlyph({
  app,
  size = 24,
  className = '',
}: {
  app: AppName;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <Paths app={app} />
    </svg>
  );
}
