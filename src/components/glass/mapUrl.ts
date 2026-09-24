import { buildDisplacementMap, type DisplacementMap } from './displacementMap';

/** Above this area maps are generated at half size; feImage stretches them back. */
const HALF_RES_AREA = 250_000;
/** Unused object URLs kept around for reuse before being revoked. */
const IDLE_CAP = 24;

interface Entry {
  url: Promise<string>;
  refs: number;
}

export interface MapLease {
  url: string;
  release: () => void;
}

const entries = new Map<string, Entry>();

/**
 * Returns an object URL for the displacement map of an element this size.
 * URLs are shared and ref-counted: a URL is only revoked once no filter uses
 * it and it has fallen out of the idle pool.
 */
export async function acquireMapUrl(
  width: number,
  height: number,
  radius: number,
  bezel: number,
  lens: number,
): Promise<MapLease> {
  const k = width * height > HALF_RES_AREA ? 0.5 : 1;
  const w = Math.max(1, Math.round(width * k));
  const h = Math.max(1, Math.round(height * k));
  const key = `${w}x${h}r${radius * k}b${bezel * k}l${lens}`;

  let entry = entries.get(key);
  if (entry) {
    entries.delete(key);
  } else {
    const map = buildDisplacementMap(w, h, radius * k, bezel * k, lens);
    entry = { url: encode(map), refs: 0 };
  }
  entries.set(key, entry);
  entry.refs++;

  const owned = entry;
  try {
    const url = await owned.url;
    let released = false;
    return {
      url,
      release: () => {
        if (released) return;
        released = true;
        owned.refs--;
        trimIdle();
      },
    };
  } catch (err) {
    owned.refs--;
    entries.delete(key);
    throw err;
  }
}

function trimIdle() {
  const idle = [...entries].filter(([, e]) => e.refs === 0);
  while (idle.length > IDLE_CAP) {
    const [key, entry] = idle.shift()!;
    entries.delete(key);
    entry.url.then(URL.revokeObjectURL, () => {});
  }
}

function encode(map: DisplacementMap): Promise<string> {
  const canvas = document.createElement('canvas');
  canvas.width = map.width;
  canvas.height = map.height;
  canvas.getContext('2d')!.putImageData(new ImageData(map.data, map.width, map.height), 0, 0);
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => (blob ? resolve(URL.createObjectURL(blob)) : reject(new Error('toBlob failed'))));
  });
}
