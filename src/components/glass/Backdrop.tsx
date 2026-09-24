import { useEffect, useRef } from 'react';
import { registerSpot } from './light';

/**
 * The scene the glass refracts: a monochrome dune photograph (portrait crop on
 * portrait screens), toned per theme in index.css, plus a soft spotlight that
 * follows the light source and a touch of grain.
 * Must stay mounted outside Suspense so filters never lose their backdrop.
 *
 * Photo: Kunj Parekh, Unsplash License (unsplash.com/photos/Y5BD-H9qGvs).
 */
export default function Backdrop() {
  const spotRef = useRef<HTMLDivElement>(null);

  useEffect(() => registerSpot(spotRef.current!), []);

  const src = (size: 'desktop' | 'mobile', format: 'avif' | 'webp') => `/backgrounds/dunes-${size}.${format}`;

  return (
    <div className="backdrop" aria-hidden="true">
      <picture>
        <source media="(max-aspect-ratio: 1/1)" type="image/avif" srcSet={src('mobile', 'avif')} />
        <source media="(max-aspect-ratio: 1/1)" type="image/webp" srcSet={src('mobile', 'webp')} />
        <source type="image/avif" srcSet={src('desktop', 'avif')} />
        <img className="backdrop__photo" src={src('desktop', 'webp')} alt="" decoding="async" />
      </picture>
      <div className="backdrop__wash" />
      <div ref={spotRef} className="backdrop__spot" />
      <div className="backdrop__grain" />
    </div>
  );
}
