/**
 * Decorative wireframe icosahedron used as a small accent in the Hero
 * section. Echoes the central form in the 3D scene at a glyph scale.
 */
export function HeroAccent() {
  return (
    <svg
      className="text-fog-1"
      width="44"
      height="44"
      viewBox="0 0 44 44"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <polygon points="22,4 38,14 38,30 22,40 6,30 6,14" />
      <line x1="22" y1="4" x2="22" y2="40" opacity="0.5" />
      <line x1="6" y1="14" x2="38" y2="30" opacity="0.5" />
      <line x1="38" y1="14" x2="6" y2="30" opacity="0.5" />
      <line x1="22" y1="4" x2="6" y2="30" opacity="0.3" />
      <line x1="22" y1="4" x2="38" y2="30" opacity="0.3" />
      <line x1="22" y1="40" x2="6" y2="14" opacity="0.3" />
      <line x1="22" y1="40" x2="38" y2="14" opacity="0.3" />
    </svg>
  );
}
