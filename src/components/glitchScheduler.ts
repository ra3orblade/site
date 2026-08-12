/**
 * One shared scheduler that flashes a randomly chosen accent at random
 * intervals.
 *
 * The previous approach gave every accent its own CSS animation with a
 * seed-derived period. Those periods are fixed, so the whole set settles into
 * a visible rhythm within a few cycles — legible as a pattern, not as noise.
 * Here nothing has a period at all: a single timer picks one registered node
 * and one delay at a time, so no cadence can establish itself.
 */

/** Node → relative pick weight. Large feature elements (the photo frames) sit
 *  well above the small accents, so they fire often enough to be part of the
 *  composition rather than once a minute. */
const nodes = new Map<HTMLElement, number>();
let timer: number | undefined;
let running = false;

const FLASH_MS = 820;
const MIN_GAP = 220;
const MAX_GAP = 2200;

function reduced() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function flash(el: HTMLElement) {
  // Re-adding the class alone won't restart an already-applied animation;
  // reading offsetWidth between the remove and the add forces the reflow that
  // does.
  el.classList.remove('is-glitching');
  void el.offsetWidth;
  el.classList.add('is-glitching');
  window.setTimeout(() => el.classList.remove('is-glitching'), FLASH_MS);
}

function pick(): HTMLElement | undefined {
  let total = 0;
  for (const w of nodes.values()) total += w;
  if (!total) return undefined;
  let r = Math.random() * total;
  for (const [el, w] of nodes) {
    r -= w;
    if (r <= 0) return el;
  }
  return undefined;
}

function tick() {
  const el = pick();
  if (el) {
    flash(el);
    // Occasionally a second one goes at nearly the same moment — clustering is
    // what makes it read as interference rather than a metronome.
    if (nodes.size > 1 && Math.random() < 0.28) {
      const other = pick();
      if (other) window.setTimeout(() => flash(other), 60 + Math.random() * 220);
    }
  }
  schedule();
}

function schedule() {
  timer = window.setTimeout(tick, MIN_GAP + Math.random() * (MAX_GAP - MIN_GAP));
}

function start() {
  if (running || reduced()) return;
  running = true;
  schedule();
}

function stop() {
  running = false;
  window.clearTimeout(timer);
  timer = undefined;
}

if (typeof document !== 'undefined') {
  // A background tab throttles timers; restart cleanly on return rather than
  // letting a long-delayed batch fire all at once.
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else if (nodes.size) start();
  });
}

/** Register a node to be flashed. Returns its unregister function. */
export function registerAccent(el: HTMLElement, weight = 1) {
  nodes.set(el, weight);
  start();
  return () => {
    nodes.delete(el);
    el.classList.remove('is-glitching');
    if (!nodes.size) stop();
  };
}
