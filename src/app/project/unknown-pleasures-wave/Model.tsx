'use client';
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { type UnknownPleasuresProps } from './UnknownPleasuresPageClient';

const POINTS_PER_LINE = 120;
const LINE_WIDTH = 6;

function smoothNoise(x: number, y: number, t: number): number {
  const s = Math.sin(x * 2.3 + y * 1.7 + t) * 0.5
    + Math.sin(x * 1.1 - y * 0.9 + t * 1.3) * 0.2
    + Math.sin(x * 4.1 + t * 0.7) * 0.3;
  const envelope = Math.exp(-Math.pow((x / (LINE_WIDTH / 3)) * 1.5, 2));

  // Small trembling that is strongest at the edges and vanishes toward center
  const edgeFactor = Math.pow(Math.abs(x / (LINE_WIDTH / 0.5)), 3);
  const tremble = (Math.sin(x * 18.7 + y * 5.3 + t * 6.1) * 0.4
    + Math.sin(x * 31.1 - y * 3.7 + t * 8.3) * 0.3) * edgeFactor * 0.15;

  return Math.abs(s * envelope + tremble);
}

type Props = { waveProps: UnknownPleasuresProps };

export default function Model({ waveProps }: Props) {
  const { lineCount, amplitude, speed, noiseScale, lineColor } = waveProps;
  const timeRef = useRef(0);
  const groupRef = useRef<THREE.Group>(null);

  // Rebuild geometry arrays when lineCount changes
  const lineRefs = useMemo(
    () => Array.from({ length: lineCount }, () => React.createRef<THREE.BufferGeometry>()),
    [lineCount]
  );

  const initialPositions = useMemo(() => {
    return Array.from({ length: lineCount }, () => {
      const positions = new Float32Array(POINTS_PER_LINE * 3);
      for (let i = 0; i < POINTS_PER_LINE; i++) {
        positions[i * 3] = (i / (POINTS_PER_LINE - 1)) * LINE_WIDTH - LINE_WIDTH / 2;
        positions[i * 3 + 1] = 0;
        positions[i * 3 + 2] = 0;
      }
      return positions;
    });
  }, [lineCount]);

  useFrame((_, delta) => {
    timeRef.current += delta * speed;
    const t = timeRef.current;

    lineRefs.forEach((ref, row) => {
      if (!ref.current) return;
      const posAttr = ref.current.attributes.position as THREE.BufferAttribute;

      for (let i = 0; i < POINTS_PER_LINE; i++) {
        const x = (i / (POINTS_PER_LINE - 1)) * LINE_WIDTH - LINE_WIDTH / 2;
        const noise = smoothNoise(x * noiseScale, row * 0.4, t - row * 0.05);
        posAttr.setY(i, noise * amplitude);
      }
      posAttr.needsUpdate = true;
    });
  });

  const totalHeight = LINE_WIDTH;
  const color = new THREE.Color(lineColor);

  return (
    <group ref={groupRef}>
      {Array.from({ length: lineCount }, (_, row) => {
        const y = (row / (lineCount - 1)) * totalHeight - totalHeight / 2;
        return (
          // @ts-expect-error: <line> conflicts with SVG intrinsic; this is THREE.Line via R3F
          <line key={row} position={[0, y, row * 0.001]}>
            <bufferGeometry ref={lineRefs[row]}>
              <bufferAttribute
                attach="attributes-position"
                array={initialPositions[row]}
                count={POINTS_PER_LINE}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color={color} />
          </line>
        );
      })}
    </group>
  );
}
