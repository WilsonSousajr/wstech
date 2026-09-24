import { useEffect, type ReactNode } from 'react';
import { startLight } from './light';

/** Starts the shared light source (see light.ts) for everything rendered inside. */
export default function LightProvider({ children }: { children: ReactNode }) {
  useEffect(() => startLight(), []);
  return children;
}
