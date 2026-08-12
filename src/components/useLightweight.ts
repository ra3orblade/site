import { useEffect, useState } from 'react';

/**
 * True on phones — pointer-coarse or a narrow viewport.
 *
 * Gates the WebGL scenes. The three.js bundle is ~880KB minified (234KB
 * gzipped) and no amount of tuning makes that cheap to parse on a phone CPU,
 * so those devices get a still of the hero form instead and never fetch the
 * chunk at all.
 */
export function useLightweight() {
  const [light, setLight] = useState(
    () =>
      typeof window !== 'undefined' &&
      (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 820),
  );

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 819px), (pointer: coarse)');
    const on = () => setLight(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  return light;
}
