/**
 * Displacement maps for liquid-glass refraction.
 *
 * Encoding follows SVG <feDisplacementMap>: R shifts x, G shifts y, 128 is
 * neutral. A pixel samples the backdrop at `p + scale * (channel / 255 - 0.5)`,
 * so values above 128 on the left/top edges pull content from further inside
 * the glass — the lensing seen at the bezel.
 *
 * B carries the lens strength itself (255 at the edge, 0 inside): the filter
 * uses it as a mask to keep the bezel sharp while the middle stays frosted.
 */

export interface DisplacementMap {
  width: number;
  height: number;
  data: Uint8ClampedArray<ArrayBuffer>;
}

export const MAP_CACHE_SIZE = 24;

const NEUTRAL = 128;
const RANGE = 127;
const cache = new Map<string, DisplacementMap>();

/**
 * Lens strength across the bezel. `t` is depth into the bezel, 0 at the outer
 * edge and 1 where it meets the flat interior. Smooth at both ends so the rim
 * has no hard ring and blends into the neutral interior.
 */
export function edgeProfile(t: number): number {
  const s = 1 - Math.min(Math.max(t, 0), 1);
  return s * s * (3 - 2 * s);
}

/**
 * Sizes are rounded to whole pixels, minimum 1. Results are memoized (LRU).
 *
 * `lens` (0–1) blends in a gentle magnifying field across the whole surface:
 * every pixel samples a little closer to the center, proportionally to its
 * distance from it (isotropic, so shapes don't squash). The rest of the
 * strength goes to the stronger bend along the bezel. 0 = bezel only.
 */
export function buildDisplacementMap(
  width: number,
  height: number,
  radius: number,
  bezel: number,
  lens = 0,
): DisplacementMap {
  const w = Math.max(1, Math.round(width));
  const h = Math.max(1, Math.round(height));
  const r = Math.min(Math.max(radius, 0), w / 2, h / 2);
  const b = Math.max(bezel, 0);
  const l = Math.min(Math.max(lens, 0), 1);

  const key = `${w}x${h}r${r}b${b}l${l}`;
  const hit = cache.get(key);
  if (hit) {
    cache.delete(key);
    cache.set(key, hit);
    return hit;
  }

  const map = compute(w, h, r, b, l);
  cache.set(key, map);
  if (cache.size > MAP_CACHE_SIZE) cache.delete(cache.keys().next().value!);
  return map;
}

function compute(w: number, h: number, r: number, b: number, lens: number): DisplacementMap {
  const data = new Uint8ClampedArray(w * h * 4);
  // RGBA (128, 128, 0, 255) written as one little-endian word per pixel
  new Uint32Array(data.buffer).fill(0xff008080);
  if (b === 0 && lens === 0) return { width: w, height: h, data };

  const hw = w / 2;
  const hh = h / 2;
  const reach = Math.max(hw, hh);
  const bezelShare = 1 - lens;
  // Without a lens, only pixels within the bezel of an edge — or inside a corner's reach — can shift
  const margin = lens > 0 ? Infinity : Math.ceil(Math.max(b, r));

  for (let y = 0; y < h; y++) {
    const rowInBand = y < margin || y >= h - margin;
    for (let x = 0; x < w; x++) {
      if (!rowInBand && x >= margin && x < w - margin) {
        x = w - margin - 1;
        continue;
      }

      const px = x + 0.5 - hw;
      const py = y + 0.5 - hh;
      const qx = Math.abs(px) - (hw - r);
      const qy = Math.abs(py) - (hh - r);
      // Signed distance to the rounded rect, negative inside
      const sdf = Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) + Math.min(Math.max(qx, qy), 0) - r;
      const depth = -sdf;
      if (depth < 0) continue;

      // Magnifying lens: sample toward the center
      let dx = (-px / reach) * lens;
      let dy = (-py / reach) * lens;

      let strength = 0;
      if (b > 0 && depth < b) {
        let nx = 0;
        let ny = 0;
        if (qx > 0 && qy > 0) {
          const len = Math.hypot(qx, qy);
          nx = qx / len;
          ny = qy / len;
        } else if (qx > qy) {
          nx = 1;
        } else {
          ny = 1;
        }
        // Outward normal; displacement is its opposite
        nx *= px < 0 ? -1 : 1;
        ny *= py < 0 ? -1 : 1;
        strength = edgeProfile(depth / b);
        dx -= nx * strength * bezelShare;
        dy -= ny * strength * bezelShare;
      }

      const i = (y * w + x) * 4;
      data[i] = NEUTRAL + Math.max(-1, Math.min(1, dx)) * RANGE;
      data[i + 1] = NEUTRAL + Math.max(-1, Math.min(1, dy)) * RANGE;
      data[i + 2] = strength * 255;
    }
  }

  return { width: w, height: h, data };
}
