import { useEffect, type RefObject } from 'react';
import { acquireMapUrl, type MapLease } from './mapUrl';
import { createFilterId, removeFilter, upsertFilter } from './filters';
import { refractionEnabled } from './support';

export interface RefractionParams {
  /** Width of the lensing band along the edges, in px. */
  bezel: number;
  /** Share of the bend spent on magnifying the whole surface (0–1); the rest bends the bezel. */
  lens: number;
  /** Max displacement at the very edge, in px. */
  scale: number;
  /** Frost, in px. */
  blur: number;
  saturation: number;
}

const REBUILD_DELAY = 150;

/**
 * Applies true refraction (Chromium only) as `backdrop-filter: url(#id)`.
 * Until the first map is ready — and in every other browser — the element
 * keeps its CSS frosted fallback.
 */
export function useRefraction(ref: RefObject<HTMLElement | null>, params: RefractionParams) {
  const { bezel, lens, scale, blur, saturation } = params;

  useEffect(() => {
    const node = ref.current;
    if (!node || !refractionEnabled()) return;

    const id = createFilterId();
    let lease: MapLease | null = null;
    let size = { width: 0, height: 0 };
    let timer: ReturnType<typeof setTimeout> | undefined;
    let generation = 0;
    let disposed = false;

    const apply = () => {
      const { width, height } = size;
      // Small controls get a proportionally smaller shift, or they'd sample far outside themselves
      const effectiveScale = Math.min(scale, Math.min(width, height) * 0.5);
      upsertFilter(id, {
        width,
        height,
        blur,
        saturation,
        scale: effectiveScale,
        mapUrl: lease?.url ?? null,
      });
    };

    const rebuild = async () => {
      const current = ++generation;
      const { width, height } = size;
      const radius = parseFloat(getComputedStyle(node).borderTopLeftRadius) || 0;
      try {
        const next = await acquireMapUrl(width, height, radius, bezel, lens);
        if (disposed || current !== generation) {
          next.release();
          return;
        }
        lease?.release();
        lease = next;
        apply();
        node.style.backdropFilter = `url(#${id})`;
      } catch {
        // Map encoding failed: stay on the frosted fallback
      }
    };

    const observer = new ResizeObserver(([entry]) => {
      const box = entry.borderBoxSize[0];
      size = { width: Math.round(box.inlineSize), height: Math.round(box.blockSize) };
      if (size.width === 0 || size.height === 0) return;
      // Resize the filter region right away (the old map stretches); rebuild the map once resizing settles
      if (lease) apply();
      clearTimeout(timer);
      timer = setTimeout(rebuild, lease ? REBUILD_DELAY : 0);
    });
    observer.observe(node, { box: 'border-box' });

    return () => {
      disposed = true;
      observer.disconnect();
      clearTimeout(timer);
      node.style.backdropFilter = '';
      removeFilter(id);
      lease?.release();
    };
  }, [ref, bezel, lens, scale, blur, saturation]);
}
