"use client"

import React, { useRef, useEffect, useImperativeHandle, forwardRef } from 'react'
import styles from './Line.module.scss'
import gsap from 'gsap'

type LineProps = {
  text: string;
  index: number;
  fontSize: number;
  color: string;
  blockColor: string;
  animationSpeed: number;
  staggerDelay: number;
  direction: 'bottom-to-top' | 'top-to-bottom' | 'left-to-right' | 'right-to-left';
  lineHeight: number;
}

export type LineRef = {
  replay: () => void;
}

const Line = forwardRef<LineRef, LineProps>(
  ({ text, index, fontSize, color, blockColor, animationSpeed, staggerDelay, direction, lineHeight }, ref) => {
    const textRef = useRef<HTMLSpanElement>(null);
    const blockRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    useEffect(() => {
      if (!blockRef.current || !textRef.current) return;

      // Clear previous timeline
      if (timelineRef.current) {
        timelineRef.current.kill();
      }

      // Determine animation properties based on direction
      const getAnimationProps = () => {
        switch (direction) {
          case 'bottom-to-top':
            return {
              startPos: { x: '0%', y: '101%' },
              coverPos: { x: '0%', y: '0%' },
              exitPos: { x: '0%', y: '-101%' }
            };
          case 'top-to-bottom':
            return {
              startPos: { x: '0%', y: '-101%' },
              coverPos: { x: '0%', y: '0%' },
              exitPos: { x: '0%', y: '101%' }
            };
          case 'left-to-right':
            return {
              startPos: { x: '-101%', y: '0%' },
              coverPos: { x: '0%', y: '0%' },
              exitPos: { x: '101%', y: '0%' }
            };
          case 'right-to-left':
            return {
              startPos: { x: '101%', y: '0%' },
              coverPos: { x: '0%', y: '0%' },
              exitPos: { x: '-101%', y: '0%' }
            };
        }
      };

      const animProps = getAnimationProps();
      const delay = 1 + (index * staggerDelay); // 1s initial delay + stagger

      // Create timeline for this line
      const tl = gsap.timeline({ delay });
      timelineRef.current = tl;

      // Set initial state
      gsap.set(blockRef.current, animProps.startPos);
      gsap.set(textRef.current, { opacity: 0 });

      // Block covers the text
      tl.to(blockRef.current, {
        ...animProps.coverPos,
        duration: animationSpeed / 2,
        ease: 'power2.inOut'
      });

      // Text becomes visible instantly AFTER block completes
      tl.to(textRef.current, {
        opacity: 1,
        duration: 0.01,
      }, `-=${0.01}`);

      // Block exits
      tl.to(blockRef.current, {
        ...animProps.exitPos,
        duration: animationSpeed / 2,
        ease: 'power2.inOut'
      }, `+=${0}`);


      return () => {
        if (timelineRef.current) {
          timelineRef.current.kill();
        }
      };
    }, [index, fontSize, color, blockColor, animationSpeed, staggerDelay, direction, lineHeight]);

    // Expose replay function
    useImperativeHandle(ref, () => ({
      replay: () => {
        if (timelineRef.current) {
          timelineRef.current.restart(true); // Include delay to respect stagger
        }
      }
    }), []);

    return (
      <div className={styles.lineWrapper}>
        <span
          className={styles.lineText}
          style={{ fontSize, color, lineHeight }}
          ref={textRef}
        >
          {text || '\u00A0'}
        </span>
        <div
          className={styles.block}
          ref={blockRef}
          style={{ background: blockColor }}
        />
      </div>
    );
  }
);

Line.displayName = 'Line';

export default Line;
