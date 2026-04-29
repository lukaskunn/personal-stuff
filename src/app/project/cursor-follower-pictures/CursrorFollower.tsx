'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import styles from './CursorFollower.module.scss';
import { useMouseMovement } from '@/components/hooks/useMouseMovement';
import { FOLLOWER_IMAGES } from './images';

interface Picture {
  id: number;
  x: number;
  y: number;
  createdAt: number;
  imageSrc: string;
}

interface CursorFollowerProps {
  pictureSize: number;
  lifespan: number;
  spawnDistance: number;
  opacity: number;
}

interface PictureItemProps {
  picture: Picture;
  pictureSize: number;
  opacity: number;
  lifespan: number;
  isActive: boolean;
}

const PictureItem = ({ picture, pictureSize, opacity, lifespan, isActive }: PictureItemProps) => {
  const imgRef = useRef<HTMLImageElement | null>(null);

  // Entrance scale animation
  useEffect(() => {
    if (!imgRef.current) return;
    gsap.fromTo(imgRef.current, { scale: 0.9 }, { scale: 1, duration: 0.05, ease: 'power2.out' });
  }, []);

  // Follow mouse while active
  useEffect(() => {
    if (!isActive || !imgRef.current) return;
    const el = imgRef.current;
    const quickX = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power2.out' });
    const quickY = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power2.out' });

    const handleMouseMove = (e: MouseEvent) => {
      quickX(e.clientX - picture.x);
      quickY(e.clientY - picture.y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isActive, picture.x, picture.y]);

  return (
    <img
      ref={imgRef}
      src={picture.imageSrc}
      alt=""
      style={{
        position: 'fixed',
        maxWidth: pictureSize,
        left: picture.x,
        top: picture.y,
        opacity: opacity,
        animation: `fadeOut ${lifespan}ms linear forwards`,
        pointerEvents: 'none',
        border: '1px solid rgba(0, 0, 0, 0.2)',
        objectFit: 'cover',
        zIndex: 10,
      }}
    />
  );
};

const CursorFollower = ({ opacity, lifespan, pictureSize, spawnDistance }: CursorFollowerProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pictureIdRef = useRef(0);
  const imageIndexRef = useRef(0);
  // Store per-picture removal timers so they are never cancelled on re-render
  const timersRef = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());
  const [pictures, setPictures] = useState<Picture[]>([]);
  const [activeId, setActiveId] = useState<number | null>(null);
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
    setActiveId(id);
    const newPicture: Picture = {
      id,
      x: spawnPosition.x,
      y: spawnPosition.y,
      createdAt: performance.now(),
      imageSrc: FOLLOWER_IMAGES[imageIndexRef.current++ % FOLLOWER_IMAGES.length],
    };

    setPictures((prev) => [...prev, newPicture]);

    // Each picture has its own independent timer — never cancelled on re-render
    const timer = setTimeout(() => {
      setPictures((prev) => prev.filter((p) => p.id !== id));
      timersRef.current.delete(id);
    }, lifespan);
    timersRef.current.set(id, timer);
  }, [spawnPosition, lifespan]);

  return (
    <div
      ref={containerRef}
      className={styles.container}
    >
      <p className={styles.headline}>
        CURSOR<br />FOLLOWER
      </p>

      <p className={styles["left-span-text"]}>loren ipsun dolor sit amet</p>
      <p className={styles["right-span-text"]}>loren ipsun dolor sit amet</p>

      {pictures.map((picture) => (
        <PictureItem
          key={picture.id}
          picture={picture}
          pictureSize={pictureSize}
          opacity={opacity}
          lifespan={lifespan}
          isActive={picture.id === activeId}
        />
      ))}
    </div>
  );
};

export default CursorFollower;
