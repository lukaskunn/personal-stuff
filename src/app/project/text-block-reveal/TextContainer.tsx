"use client"

import React, { useRef, useMemo, useImperativeHandle, forwardRef } from 'react'
import styles from './TextContainer.module.scss'
import Line, { LineRef } from './Line'

type TextContainerProps = {
  text: string;
  fontSize: number;
  color: string;
  blockColor: string;
  animationSpeed: number;
  staggerDelay: number;
  direction: 'bottom-to-top' | 'top-to-bottom' | 'left-to-right' | 'right-to-left';
  maxWidth: number;
  lineHeight: number;
}

export type TextContainerRef = {
  replay: () => void;
}

// Helper function to split text into lines with word wrapping
const splitTextIntoLines = (text: string, maxWidth: number, fontSize: number): string[] => {
  // Handle explicit newlines first
  const paragraphs = text.split('\n');
  const allLines: string[] = [];

  // Create a canvas for text measurement
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) return paragraphs;

  context.font = `500 ${fontSize}px Roboto`;

  paragraphs.forEach((paragraph, paragraphIndex) => {
    // Handle empty paragraphs (from \n)
    if (!paragraph.trim()) {
      // Only add empty line if it's not the last paragraph
      if (paragraphIndex < paragraphs.length - 1) {
        allLines.push(' ');
      }
      return;
    }

    const words = paragraph.split(' ');
    let currentLine = '';

    words.forEach((word, index) => {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const metrics = context.measureText(testLine);
      const testWidth = metrics.width;

      if (testWidth > maxWidth && currentLine) {
        allLines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }

      // Push the last line
      if (index === words.length - 1) {
        allLines.push(currentLine);
      }
    });
  });

  return allLines;
};

const TextContainer = forwardRef<TextContainerRef, TextContainerProps>(
  ({ text, fontSize, blockColor, color, animationSpeed, staggerDelay, direction, maxWidth, lineHeight }, ref) => {
    const lineRefs = useRef<(LineRef | null)[]>([]);

    const lines = useMemo(
      () => splitTextIntoLines(text, maxWidth, fontSize),
      [text, maxWidth, fontSize]
    );

    // Expose replay function that triggers all line replays
    useImperativeHandle(ref, () => ({
      replay: () => {
        lineRefs.current.forEach(lineRef => {
          lineRef?.replay();
        });
      }
    }), []);

    return (
      <div className={styles.container}>
        <div className={styles.textWrapper}>
          {lines.map((line, index) => (
            <Line
              key={index}
              ref={(el) => {
                lineRefs.current[index] = el;
              }}
              text={line}
              index={index}
              fontSize={fontSize}
              color={color}
              blockColor={blockColor}
              animationSpeed={animationSpeed}
              staggerDelay={staggerDelay}
              direction={direction}
              lineHeight={lineHeight}
            />
          ))}
        </div>
      </div>
    )
  }
);

TextContainer.displayName = 'TextContainer';

export default TextContainer
