'use client';
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Model from './Model';
import { type UnknownPleasuresProps } from './UnknownPleasuresPageClient';

const Scene = ({ waveProps }: { waveProps: UnknownPleasuresProps }) => {
  return (
    <Canvas
      orthographic
      camera={{ zoom: 80, position: [0, 0, 10] }}
      style={{ background: waveProps.bgColor }}
    >
      <OrbitControls enableDamping dampingFactor={0.08} />
      <Model waveProps={waveProps} />
    </Canvas>
  );
};

export default Scene;
