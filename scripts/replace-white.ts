import sharp from 'sharp';

// Detect contact-sheet gridlines and black them out.
// Strategy:
//   1. Compute the global row-brightness profile and find horizontal gridlines.
//   2. Split the image into bands separated by those gridlines.
//   3. Within each band, compute the column-brightness profile and find
//      vertical gridlines local to that band (top and bottom halves can
//      have different sub-photo widths).
//   4. Zero out detected pixels.

const PEAK_DIFF = 50;
const PEAK_BRIGHTNESS = 150;
const PADDING = 2;
const SURROUND_RADIUS = 8;

function findGridlines(profile: Float32Array): Set<number> {
  const n = profile.length;
  const peaks = new Uint8Array(n);
  for (let i = SURROUND_RADIUS; i < n - SURROUND_RADIUS; i++) {
    let sum = 0;
    let count = 0;
    for (let d = -SURROUND_RADIUS; d <= SURROUND_RADIUS; d++) {
      if (Math.abs(d) <= 2) continue;
      sum += profile[i + d];
      count++;
    }
    const surround = sum / count;
    if (profile[i] >= PEAK_BRIGHTNESS && profile[i] - surround >= PEAK_DIFF) {
      peaks[i] = 1;
    }
  }

  const clusters: Array<[number, number]> = [];
  let start = -1;
  for (let i = 0; i < n; i++) {
    if (peaks[i] && start === -1) start = i;
    else if (!peaks[i] && start !== -1) {
      if (i - start <= 8) clusters.push([start, i - 1]);
      start = -1;
    }
  }
  if (start !== -1 && n - start <= 8) clusters.push([start, n - 1]);

  const out = new Set<number>();
  for (const [s, e] of clusters) {
    for (let i = s - PADDING; i <= e + PADDING; i++) {
      if (i >= 0 && i < n) out.add(i);
    }
  }
  return out;
}

function bandColAvg(
  data: Buffer | Uint8Array,
  w: number,
  ch: number,
  yStart: number,
  yEnd: number
): Float32Array {
  const out = new Float32Array(w);
  const rows = yEnd - yStart;
  if (rows <= 0) return out;
  for (let x = 0; x < w; x++) {
    let s = 0;
    for (let y = yStart; y < yEnd; y++) {
      const i = (y * w + x) * ch;
      s += (data[i] + data[i + 1] + data[i + 2]) / 3;
    }
    out[x] = s / rows;
  }
  return out;
}

async function run(input: string, output: string) {
  const { data, info } = await sharp(input).raw().toBuffer({ resolveWithObject: true });
  const ch = info.channels;
  const w = info.width;
  const h = info.height;

  // Row profile -> horizontal gridlines
  const rowAvg = new Float32Array(h);
  for (let y = 0; y < h; y++) {
    let s = 0;
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * ch;
      s += (data[i] + data[i + 1] + data[i + 2]) / 3;
    }
    rowAvg[y] = s / w;
  }
  const killRows = findGridlines(rowAvg);

  // Split image into bands separated by horizontal gridlines
  const bands: Array<[number, number]> = [];
  let bandStart = 0;
  for (let y = 0; y < h; y++) {
    if (killRows.has(y)) {
      if (bandStart < y) bands.push([bandStart, y]);
      bandStart = y + 1;
    }
  }
  if (bandStart < h) bands.push([bandStart, h]);

  // For each band, find its own vertical gridlines
  const killColsPerBand = new Map<number, Set<number>>();
  for (const [yStart, yEnd] of bands) {
    if (yEnd - yStart < 30) continue;
    const colAvg = bandColAvg(data, w, ch, yStart, yEnd);
    killColsPerBand.set(yStart, findGridlines(colAvg));
  }

  // Apply
  let killedPixels = 0;
  for (let y = 0; y < h; y++) {
    if (killRows.has(y)) {
      for (let x = 0; x < w; x++) {
        const i = (y * w + x) * ch;
        data[i] = 0;
        data[i + 1] = 0;
        data[i + 2] = 0;
        killedPixels++;
      }
      continue;
    }
    let band: [number, number] | null = null;
    for (const b of bands) {
      if (y >= b[0] && y < b[1]) {
        band = b;
        break;
      }
    }
    if (!band) continue;
    const cols = killColsPerBand.get(band[0]);
    if (!cols) continue;
    for (const x of cols) {
      const i = (y * w + x) * ch;
      data[i] = 0;
      data[i + 1] = 0;
      data[i + 2] = 0;
      killedPixels++;
    }
  }

  console.log(
    `${input}: bands=${bands.length}, rows zeroed=${killRows.size}, ` +
      `band cols=${[...killColsPerBand.values()].map((s) => s.size).join('/')}`
  );

  await sharp(data, { raw: { width: w, height: h, channels: ch } })
    .png()
    .toFile(output);
  console.log(`wrote ${output}`);
}

const [, , input, output] = Bun.argv;
if (!input || !output) {
  console.error('usage: bun run replace-white.ts <input> <output>');
  process.exit(1);
}
await run(input, output);
