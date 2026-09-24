interface NavigatorWithHints extends Navigator {
  userAgentData?: { brands?: { brand: string }[] };
  deviceMemory?: number;
}

const REFRACT_CLASS = 'glass-refract';

/**
 * Enables SVG refraction (`html.glass-refract`) only where it renders and is
 * wanted. SVG filters inside `backdrop-filter` can't be feature-detected —
 * Safari reports support it doesn't have — so this checks for Chromium via
 * UA Client Hints (only exposed in secure contexts; plain-http LAN testing
 * gets the frosted fallback). Everyone else gets the CSS frosted glass.
 */
export function detectGlassSupport() {
  const nav = navigator as NavigatorWithHints;
  const chromium = nav.userAgentData?.brands?.some((b) => b.brand === 'Chromium') ?? false;
  const lowEnd = (nav.hardwareConcurrency ?? 8) <= 4 || (nav.deviceMemory ?? 8) <= 4;
  const prefersSolid = window.matchMedia(
    '(prefers-reduced-transparency: reduce), (prefers-contrast: more), (forced-colors: active)',
  ).matches;

  document.documentElement.classList.toggle(REFRACT_CLASS, chromium && !lowEnd && !prefersSolid);
}

export function refractionEnabled() {
  return document.documentElement.classList.contains(REFRACT_CLASS);
}
