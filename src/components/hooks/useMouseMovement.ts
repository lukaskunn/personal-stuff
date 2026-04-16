import { useEffect, useRef, useState } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

interface UseMouseMovementOptions {
  /**
   * Minimum distance in pixels the cursor must travel from the *last spawn point*
   * before a new spawn position is emitted. Defaults to 80px.
   */
  spawnDistance?: number;
}

/**
 * Tracks mouse movement and emits a new `spawnPosition` only when the cursor
 * has travelled at least `spawnDistance` pixels from the previous spawn point.
 * This enables distance-based spawning rather than time-based spawning.
 */
export const useMouseMovement = (options: UseMouseMovementOptions = {}) => {
  const { spawnDistance = 80 } = options;

  const [spawnPosition, setSpawnPosition] = useState<MousePosition | null>(null);
  const lastSpawnRef = useRef<MousePosition | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const current = { x: e.clientX, y: e.clientY };

      if (!lastSpawnRef.current) {
        // First move — initialise but don't spawn yet
        lastSpawnRef.current = current;
        return;
      }

      const distance = Math.hypot(
        current.x - lastSpawnRef.current.x,
        current.y - lastSpawnRef.current.y
      );

      if (distance >= spawnDistance) {
        setSpawnPosition({ ...current });
        lastSpawnRef.current = current;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [spawnDistance]);

  return { spawnPosition };
};
