/** Shared constants and helpers for the glitch accents. Kept out of the
 *  component files so fast refresh keeps working. */

export type AppName =
  | 'notes'
  | 'database'
  | 'graph'
  | 'calendar'
  | 'mailbox'
  | 'chat'
  | 'files'
  | 'browser'
  | 'code'
  | 'whiteboard'
  | 'tasks'
  | 'agent';

/**
 * The subset drawn in the inline strip. `AppName` covers the full twelve that
 * AppGlyph can render; the full set read as clutter, so the strip shows these
 * eight.
 */
export const STRIP_APPS: AppName[] = [
  'notes',
  'database',
  'graph',
  'calendar',
  'chat',
  'files',
  'code',
  'agent',
];

/**
 * Wireframe vocabulary for the accents. The Brainstorm site ships five
 * (ico, tetra, triangle, diamond, ring); the rest extend that set with the
 * primitives it lacks, drawn in the same hairline, faceted style.
 */
export type GlitchShape =
  | 'ico'
  | 'tetra'
  | 'triangle'
  | 'diamond'
  | 'ring'
  | 'circle'
  | 'square'
  | 'hexagon'
  | 'octagon'
  | 'star'
  | 'cross'
  | 'chevron';

export const GLITCH_SHAPES: GlitchShape[] = [
  'ico',
  'tetra',
  'triangle',
  'diamond',
  'ring',
  'circle',
  'square',
  'hexagon',
  'octagon',
  'star',
  'cross',
  'chevron',
];

/** Stable per-instance variation, so accents don't flicker in unison. */
export function seedFrom(input: string) {
  let h = 0;
  for (let i = 0; i < input.length; i++) h = (h * 31 + input.charCodeAt(i)) | 0;
  return Math.abs(h);
}
