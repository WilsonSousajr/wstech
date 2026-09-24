import { describe, it, expect } from 'vitest';
import { buildDisplacementMap, edgeProfile, MAP_CACHE_SIZE } from './displacementMap';

const px = (map: ReturnType<typeof buildDisplacementMap>, x: number, y: number) => {
  const i = (y * map.width + x) * 4;
  return { r: map.data[i], g: map.data[i + 1], b: map.data[i + 2], a: map.data[i + 3] };
};

describe('edgeProfile', () => {
  it('is 1 at the edge and 0 at the inner end of the bezel', () => {
    expect(edgeProfile(0)).toBe(1);
    expect(edgeProfile(1)).toBe(0);
  });

  it('decreases monotonically', () => {
    let prev = Infinity;
    for (let t = 0; t <= 1; t += 0.05) {
      const v = edgeProfile(t);
      expect(v).toBeLessThanOrEqual(prev);
      prev = v;
    }
  });

  it('is flat where it meets the interior', () => {
    const slope = (edgeProfile(1) - edgeProfile(0.999)) / 0.001;
    expect(Math.abs(slope)).toBeLessThan(0.01);
  });
});

describe('buildDisplacementMap', () => {
  const W = 120;
  const H = 80;
  const R = 20;
  const B = 16;
  const map = buildDisplacementMap(W, H, R, B);

  it('returns an RGBA buffer of the requested size', () => {
    expect(map.width).toBe(W);
    expect(map.height).toBe(H);
    expect(map.data.length).toBe(W * H * 4);
  });

  it('is opaque', () => {
    for (let i = 3; i < map.data.length; i += 4) expect(map.data[i]).toBe(255);
  });

  it('carries edge strength in blue: ~255 at the edge, 0 past the bezel, fading inward', () => {
    expect(px(map, 0, H / 2).b).toBeGreaterThanOrEqual(250); // pixel centre sits half a pixel inside the edge
    expect(px(map, W / 2, H / 2).b).toBe(0);
    expect(px(map, B + 1, H / 2).b).toBe(0);
    expect(px(map, 0, 0).b).toBe(0); // outside the rounded corner
    let prev = Infinity;
    for (let x = 0; x <= B; x++) {
      const v = px(map, x, H / 2).b;
      expect(v).toBeLessThanOrEqual(prev);
      prev = v;
    }
  });

  it('is exactly neutral deeper than the bezel', () => {
    for (let y = B + 1; y < H - B - 1; y += 3) {
      for (let x = B + 1; x < W - B - 1; x += 3) {
        const p = px(map, x, y);
        expect([p.r, p.g]).toEqual([128, 128]);
      }
    }
  });

  it('points inward: left edge shifts +x, top edge shifts +y', () => {
    expect(px(map, 0, H / 2).r).toBeGreaterThan(128);
    expect(px(map, W - 1, H / 2).r).toBeLessThan(128);
    expect(px(map, W / 2, 0).g).toBeGreaterThan(128);
    expect(px(map, W / 2, H - 1).g).toBeLessThan(128);
  });

  it('is antisymmetric under mirroring', () => {
    for (let y = 0; y < H; y += 7) {
      for (let x = 0; x < W; x += 5) {
        expect(Math.abs(px(map, x, y).r + px(map, W - 1 - x, y).r - 256)).toBeLessThanOrEqual(1);
        expect(Math.abs(px(map, x, y).g + px(map, x, H - 1 - y).g - 256)).toBeLessThanOrEqual(1);
      }
    }
  });

  it('has no cross-axis shift on the straight edges', () => {
    for (let x = R; x < W - R; x += 4) expect(px(map, x, 0).r).toBe(128);
    for (let y = R; y < H - R; y += 4) expect(px(map, 0, y).g).toBe(128);
  });

  it('falls off monotonically from the edge inward', () => {
    let prev = Infinity;
    for (let x = 0; x <= B; x++) {
      const v = Math.abs(px(map, x, H / 2).r - 128);
      expect(v).toBeLessThanOrEqual(prev);
      prev = v;
    }
  });

  it('is neutral outside the rounded corner', () => {
    const p = px(map, 0, 0);
    expect([p.r, p.g]).toEqual([128, 128]);
  });

  it('shifts on both axes inside the corner bezel', () => {
    const d = Math.round(R - R / Math.SQRT2) + 2; // just inside the arc on the diagonal
    const p = px(map, d, d);
    expect(p.r).toBeGreaterThan(128);
    expect(p.g).toBeGreaterThan(128);
  });

  it('keeps every value in the valid byte range (no NaN)', () => {
    for (let i = 0; i < map.data.length; i += 4) {
      expect(map.data[i]).toBeGreaterThanOrEqual(1);
      expect(map.data[i]).toBeLessThanOrEqual(255);
      expect(map.data[i + 1]).toBeGreaterThanOrEqual(1);
      expect(map.data[i + 1]).toBeLessThanOrEqual(255);
    }
  });

  it('clamps an oversized radius (pill)', () => {
    const pill = buildDisplacementMap(200, 60, 999, 20);
    expect(px(pill, 0, 30).r).toBeGreaterThan(128);
    expect([px(pill, 0, 0).r, px(pill, 0, 0).g]).toEqual([128, 128]);
  });

  it('is all neutral with a zero bezel', () => {
    const flat = buildDisplacementMap(40, 30, 10, 0);
    for (let i = 0; i < flat.data.length; i += 4) {
      expect([flat.data[i], flat.data[i + 1], flat.data[i + 2]]).toEqual([128, 128, 0]);
    }
  });

  it('handles an oversized bezel and tiny or fractional sizes', () => {
    expect(() => buildDisplacementMap(40, 30, 10, 500)).not.toThrow();
    const tiny = buildDisplacementMap(0, 0.4, 5, 5);
    expect([tiny.width, tiny.height]).toEqual([1, 1]);
    const frac = buildDisplacementMap(50.6, 20.2, 5, 5);
    expect([frac.width, frac.height]).toEqual([51, 20]);
  });

  it('caches by size and evicts the oldest entry at the cap', () => {
    const a = buildDisplacementMap(64, 64, 12, 10);
    expect(buildDisplacementMap(64, 64, 12, 10)).toBe(a);
    expect(buildDisplacementMap(64, 64, 12, 11)).not.toBe(a);
    for (let i = 0; i < MAP_CACHE_SIZE; i++) buildDisplacementMap(10 + i, 10, 2, 2);
    expect(buildDisplacementMap(64, 64, 12, 10)).not.toBe(a);
  });
});

describe('buildDisplacementMap with a lens', () => {
  const W = 200;
  const H = 100;
  const lensed = buildDisplacementMap(W, H, 20, 16, 0.3);
  const flat = buildDisplacementMap(W, H, 20, 16, 0);

  it('defaults to no lens', () => {
    expect(buildDisplacementMap(W, H, 20, 16)).toBe(buildDisplacementMap(W, H, 20, 16, 0));
  });

  it('is neutral at the very center', () => {
    const p = px(lensed, W / 2, H / 2);
    expect(Math.abs(p.r - 128)).toBeLessThanOrEqual(1);
    expect(Math.abs(p.g - 128)).toBeLessThanOrEqual(1);
  });

  it('magnifies: inside the bezel, samples are pulled toward the center', () => {
    expect(px(lensed, 40, H / 2).r).toBeGreaterThan(128);
    expect(px(lensed, W - 41, H / 2).r).toBeLessThan(128);
    expect(px(lensed, W / 2, 25).g).toBeGreaterThan(128);
    expect(px(lensed, W / 2, H - 26).g).toBeLessThan(128);
  });

  it('grows linearly with distance from the center', () => {
    const shift = (x: number) => px(lensed, x, H / 2).r - 128;
    const near = shift(W / 2 - 20);
    const far = shift(W / 2 - 40);
    expect(far).toBeGreaterThan(near);
    expect(Math.abs(far - 2 * near)).toBeLessThanOrEqual(2);
  });

  it('is isotropic: equal distances shift equally on both axes', () => {
    const dx = px(lensed, W / 2 - 30, H / 2).r - 128;
    const dy = px(lensed, W / 2, H / 2 - 30).g - 128;
    expect(Math.abs(dx - dy)).toBeLessThanOrEqual(1);
  });

  it('still bends harder at the bezel than the lens alone', () => {
    expect(px(lensed, 0, H / 2).r).toBeGreaterThan(px(lensed, 20, H / 2).r);
  });

  it('keeps the edge mask (blue) independent of the lens', () => {
    for (let i = 2; i < lensed.data.length; i += 4) expect(lensed.data[i]).toBe(flat.data[i]);
  });

  it('stays in the valid byte range', () => {
    for (let i = 0; i < lensed.data.length; i += 4) {
      expect(lensed.data[i]).toBeGreaterThanOrEqual(1);
      expect(lensed.data[i + 1]).toBeGreaterThanOrEqual(1);
    }
  });

  it('caches lens strength separately', () => {
    const a = buildDisplacementMap(W, H, 20, 16, 0.3);
    expect(buildDisplacementMap(W, H, 20, 16, 0.3)).toBe(a);
    expect(buildDisplacementMap(W, H, 20, 16, 0.31)).not.toBe(a);
  });
});
