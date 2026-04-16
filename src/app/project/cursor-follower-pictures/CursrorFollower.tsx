'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './CursorFollower.module.scss';
import Image from 'next/image';
import { useMouseMovement } from '@/components/hooks/useMouseMovement';
import { FOLLOWER_IMAGES } from './images';

interface Picture {
  id: number;
  x: number;
  y: number;
  createdAt: number;
  imageSrc: string;
  rotation: number;
}

interface CursorFollowerProps {
  pictureSize: number;
  trailLength: number;
  lifespan: number;
  spawnDistance: number;
  opacity: number;
}

const CursorFollower = ({ opacity, lifespan, pictureSize, trailLength, spawnDistance }: CursorFollowerProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pictureIdRef = useRef(0);
  // Store per-picture removal timers so they are never cancelled on re-render
  const timersRef = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());
  const [pictures, setPictures] = useState<Picture[]>([]);
  const { spawnPosition } = useMouseMovement({ spawnDistance });

  // Clear all timers on unmount
  useEffect(() => {
    const timers = timersRef.current;
    return () => timers.forEach((t) => clearTimeout(t));
  }, []);

  // Spawn a new picture each time spawnPosition changes
  useEffect(() => {
    if (!spawnPosition) return;

    const id = pictureIdRef.current++;
    const newPicture: Picture = {
      id,
      x: spawnPosition.x,
      y: spawnPosition.y,
      createdAt: performance.now(),
      imageSrc: FOLLOWER_IMAGES[Math.floor(Math.random() * FOLLOWER_IMAGES.length)],
      rotation: (Math.random() - 0.5) * 30,
    };

    setPictures((prev) => {
      const next = [...prev, newPicture];
      // Enforce trail length cap — remove oldest
      return next.length > trailLength ? next.slice(next.length - trailLength) : next;
    });

    // Each picture has its own independent timer — never cancelled on re-render
    const timer = setTimeout(() => {
      setPictures((prev) => prev.filter((p) => p.id !== id));
      timersRef.current.delete(id);
    }, lifespan);
    timersRef.current.set(id, timer);
  }, [spawnPosition, trailLength, lifespan]);

  return (
    <div
      ref={containerRef}
      className={styles.container}
    >
      <p className={styles.headline}>
        CURSOR<br />FOLLOWER
      </p>

      {pictures.map((picture) => (
        <img
          key={picture.id}
          src={picture.imageSrc}
          alt=""
          style={{
            position: 'fixed',
            maxWidth: pictureSize,
            left: picture.x,
            top: picture.y,
            // transform: `translate(-50%, -50%)`,
            opacity: opacity,
            animation: `fadeOut ${lifespan}ms linear forwards`,
            pointerEvents: 'none',
            border: '1px solid rgba(0, 0, 0, 0.2)',
            objectFit: 'cover',
            zIndex: 10,
          }}
        />
      ))}
    </div>
  );
};

export default CursorFollower;
