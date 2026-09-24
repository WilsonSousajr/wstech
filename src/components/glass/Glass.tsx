import { useEffect, useRef, type HTMLAttributes, type ReactNode } from 'react';
import { useRefraction, type RefractionParams } from './useRefraction';
import { registerGlass } from './light';
import { useTheme } from '../../contexts/ThemeContext';

export type GlassVariant = 'smoky' | 'clear';

const REFRACTION: Record<GlassVariant, RefractionParams> = {
  smoky: { bezel: 28, lens: 0.3, scale: 70, blur: 6, saturation: 1.4 },
  clear: { bezel: 30, lens: 0.5, scale: 100, blur: 0, saturation: 1.2 },
};

/** Light glass stays clear: less frost. */
const LIGHT_MAX_BLUR = 3;

interface GlassProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** `smoky` for cards (tinted, readable), `clear` for small floating controls (pure lens). */
  variant?: GlassVariant;
  /** Set when the glass sits in a `position: fixed` container, so the rim ignores scroll. */
  fixed?: boolean;
}

/**
 * Liquid glass surface. Never nest Glass, and never give an ancestor opacity < 1,
 * filter, mask, clip-path, backdrop-filter or mix-blend-mode — any of those
 * becomes the "backdrop root" and the glass stops seeing the page behind it.
 */
export default function Glass({ children, variant = 'smoky', fixed = false, className = '', ...rest }: GlassProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  const base = REFRACTION[variant];
  useRefraction(ref, { ...base, blur: theme === 'light' ? Math.min(base.blur, LIGHT_MAX_BLUR) : base.blur });
  useEffect(() => registerGlass(ref.current!, fixed), [fixed]);

  return (
    <div ref={ref} className={`glass glass--${variant} ${className}`} {...rest}>
      {children}
    </div>
  );
}
