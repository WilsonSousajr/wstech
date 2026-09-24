/**
 * The single light source shared by the backdrop spotlight and every glass rim.
 *
 * - Fine pointer: the light follows the cursor (one rAF-throttled listener).
 * - Touch / no hover: CSS keyframes drift the spotlight and sway the rims — no JS per frame.
 * - Reduced motion: the light stays fixed at the top-left.
 *
 * Nothing is written to :root (that would restyle the whole document): the
 * spotlight node is moved with a transform and each rim gets its own
 * `--rim-angle` / `--rim-strength`, computed from cached page-relative rects.
 */

interface GlassEntry {
  el: HTMLElement;
  fixed: boolean;
  cx: number;
  cy: number;
  visible: boolean;
  angle: number;
  strength: number;
}

type Mode = 'pointer' | 'auto' | 'static';

const entries = new Map<HTMLElement, GlassEntry>();
const light = { x: 0, y: 0 };
let spot: HTMLElement | null = null;
let mode: Mode = 'static';
let running = false;
let raf = 0;
let intersection: IntersectionObserver | null = null;
let resize: ResizeObserver | null = null;

const AUTO_CLASS = 'light-auto';
const RIM_SWAY_SECONDS = 9;

function measure(e: GlassEntry) {
  const r = e.el.getBoundingClientRect();
  e.cx = r.left + r.width / 2 + (e.fixed ? 0 : window.scrollX);
  e.cy = r.top + r.height / 2 + (e.fixed ? 0 : window.scrollY);
}

function measureAll() {
  entries.forEach(measure);
}

function schedule() {
  if (!raf && running) raf = requestAnimationFrame(frame);
}

function frame() {
  raf = 0;
  if (mode === 'auto') return;

  spot?.style.setProperty('transform', `translate3d(${light.x}px, ${light.y}px, 0) translate(-50%, -50%)`);

  entries.forEach((e) => {
    if (!e.visible) return;
    const dx = light.x - (e.cx - (e.fixed ? 0 : window.scrollX));
    const dy = light.y - (e.cy - (e.fixed ? 0 : window.scrollY));
    // conic-gradient 0deg points up and runs clockwise; atan2 0 points right
    const angle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
    const strength = Math.min(1, Math.max(0.35, 1.1 - Math.hypot(dx, dy) / 1100));

    const delta = Math.abs(((angle - e.angle + 540) % 360) - 180);
    // Negated so the first frame (NaN previous values) always writes
    if (!(delta <= 1)) {
      e.angle = angle;
      e.el.style.setProperty('--rim-angle', `${angle.toFixed(1)}deg`);
    }
    if (!(Math.abs(strength - e.strength) <= 0.03)) {
      e.strength = strength;
      e.el.style.setProperty('--rim-strength', strength.toFixed(2));
    }
  });
}

function resetLight() {
  light.x = window.innerWidth * 0.18;
  light.y = window.innerHeight * 0.12;
}

function observe(e: GlassEntry) {
  intersection?.observe(e.el);
  resize?.observe(e.el);
}

const onPointerMove = (ev: PointerEvent) => {
  light.x = ev.clientX;
  light.y = ev.clientY;
  schedule();
};

const onResize = () => {
  if (mode !== 'pointer') resetLight();
  measureAll();
  schedule();
};

// iOS only fires :active (the press effect) once a touch listener exists
const onTouchStart = () => {};

export function startLight(): () => void {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  mode = reduced ? 'static' : finePointer ? 'pointer' : 'auto';
  document.documentElement.classList.toggle(AUTO_CLASS, mode === 'auto');
  resetLight();

  intersection = new IntersectionObserver((records) => {
    records.forEach((r) => {
      const e = entries.get(r.target as HTMLElement);
      if (e) e.visible = r.isIntersecting;
    });
    schedule();
  });
  resize = new ResizeObserver(() => {
    measureAll();
    schedule();
  });
  // Content above a card can move it without resizing it; body size changes catch that
  resize.observe(document.body);
  entries.forEach(observe);

  if (mode === 'pointer') window.addEventListener('pointermove', onPointerMove, { passive: true });
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', onResize, { passive: true });
  document.addEventListener('touchstart', onTouchStart, { passive: true });
  document.fonts?.ready.then(() => {
    measureAll();
    schedule();
  });

  running = true;
  measureAll();
  schedule();

  return () => {
    running = false;
    cancelAnimationFrame(raf);
    raf = 0;
    intersection?.disconnect();
    resize?.disconnect();
    intersection = resize = null;
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('scroll', schedule);
    window.removeEventListener('resize', onResize);
    document.removeEventListener('touchstart', onTouchStart);
    document.documentElement.classList.remove(AUTO_CLASS);
  };
}

/** `fixed` elements are positioned against the viewport, so scroll doesn't move them. */
export function registerGlass(el: HTMLElement, fixed: boolean): () => void {
  const entry: GlassEntry = { el, fixed, cx: 0, cy: 0, visible: true, angle: NaN, strength: NaN };
  entries.set(el, entry);
  // Desynchronizes the CSS rim sway between cards on touch devices
  el.style.setProperty('--rim-phase', `${(-Math.random() * RIM_SWAY_SECONDS).toFixed(2)}s`);

  if (running) {
    observe(entry);
    measure(entry);
    schedule();
  }

  return () => {
    entries.delete(el);
    intersection?.unobserve(el);
    resize?.unobserve(el);
  };
}

export function registerSpot(el: HTMLElement): () => void {
  spot = el;
  schedule();
  return () => {
    if (spot === el) spot = null;
  };
}
