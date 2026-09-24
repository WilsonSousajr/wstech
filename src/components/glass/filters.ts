const SVG_NS = 'http://www.w3.org/2000/svg';

export interface FilterParams {
  width: number;
  height: number;
  mapUrl: string | null;
  /** Frost, in px (feGaussianBlur stdDeviation). */
  blur: number;
  /** Max displacement, in px. */
  scale: number;
  saturation: number;
}

let defs: SVGDefsElement | null = null;
let counter = 0;

/**
 * One hidden <svg> on <body> holds every glass filter. It lives outside React
 * so Suspense and StrictMode remounts never drop a `url(#id)` in use. Never
 * `display: none` — some engines stop resolving filters inside it.
 */
function ensureDefs(): SVGDefsElement {
  if (defs?.isConnected) return defs;
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  svg.setAttribute('width', '0');
  svg.setAttribute('height', '0');
  svg.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden;pointer-events:none';
  defs = document.createElementNS(SVG_NS, 'defs');
  svg.append(defs);
  document.body.append(svg);
  return defs;
}

export function createFilterId() {
  return `glass-f-${++counter}`;
}

function el<K extends keyof SVGElementTagNameMap>(tag: K, attrs: Record<string, string | number>) {
  const node = document.createElementNS(SVG_NS, tag);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, String(v));
  return node;
}

/** Turns the map's blue channel (lens strength) into alpha. */
const EDGE_MASK_MATRIX = '0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 1 0 0';

const displace = (input: string, result: string) =>
  el('feDisplacementMap', { in: input, in2: 'map', xChannelSelector: 'R', yChannelSelector: 'G', result });

/**
 * Filter graph: the backdrop is frosted and bent everywhere (the map carries a
 * gentle whole-surface lens plus a stronger bezel bend), then a sharp bent copy
 * is masked in along the bezel — frosted middle for text, crisp lensing at the
 * edges.
 */
function build(id: string): SVGFilterElement {
  const filter = el('filter', {
    id,
    x: 0,
    y: 0,
    filterUnits: 'userSpaceOnUse',
    'color-interpolation-filters': 'sRGB',
  });
  filter.append(
    el('feImage', { x: 0, y: 0, preserveAspectRatio: 'none', result: 'map' }),
    el('feColorMatrix', { in: 'SourceGraphic', type: 'saturate', result: 'vivid' }),
    el('feGaussianBlur', { in: 'vivid', edgeMode: 'duplicate', result: 'frost' }),
    displace('frost', 'frostBent'),
    displace('vivid', 'sharpBent'),
    el('feColorMatrix', { in: 'map', type: 'matrix', values: EDGE_MASK_MATRIX, result: 'edgeMask' }),
    el('feComposite', { in: 'sharpBent', in2: 'edgeMask', operator: 'in', result: 'sharpEdge' }),
    el('feComposite', { in: 'sharpEdge', in2: 'frostBent', operator: 'over' }),
  );
  return filter;
}

/** Creates or updates the filter used as `backdrop-filter: url(#id)`. */
export function upsertFilter(id: string, p: FilterParams) {
  const root = ensureDefs();
  let filter = root.querySelector<SVGFilterElement>(`#${id}`);
  if (!filter) {
    filter = build(id);
    root.append(filter);
  }

  const image = filter.querySelector('feImage')!;
  filter.setAttribute('width', String(p.width));
  filter.setAttribute('height', String(p.height));
  filter.querySelector('feGaussianBlur')!.setAttribute('stdDeviation', String(p.blur));
  filter.querySelector('feColorMatrix[type="saturate"]')!.setAttribute('values', String(p.saturation));
  filter.querySelectorAll('feDisplacementMap').forEach((node) => node.setAttribute('scale', String(p.scale)));
  image.setAttribute('width', String(p.width));
  image.setAttribute('height', String(p.height));
  if (p.mapUrl && image.getAttribute('href') !== p.mapUrl) image.setAttribute('href', p.mapUrl);
}

export function removeFilter(id: string) {
  defs?.querySelector(`#${id}`)?.remove();
}
