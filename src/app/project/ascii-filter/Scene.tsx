'use client'
import React from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { EffectComposer } from '@react-three/postprocessing'
import Model from './Model'
import ASCIIEffect from './AsciiEffect'
import { type AsciiProps } from './AsciiControls'

const Scene = ({ asciiProps }: { asciiProps: AsciiProps }) => {
    const asciiEffect = React.useMemo(() => new ASCIIEffect({
        characters: asciiProps.density,
        fontSize: asciiProps.fontSize,
        cellSize: asciiProps.cellSize,
        color: asciiProps.color,
        invert: asciiProps.invert,
    }), [asciiProps.cellSize, asciiProps.color, asciiProps.density, asciiProps.fontSize, asciiProps.invert]);

  return (
    <Canvas style={{background: "black", zIndex: 1}} camera={{ position: [0, 0, 5] }} gl={{ preserveDrawingBuffer: true }}>
        <directionalLight position={[0, 3, 2]} intensity={3} />
        <Environment preset="city" />
        <Model />
        <EffectComposer>
          <primitive object={asciiEffect} />
        </EffectComposer>
    </Canvas>
  )
}

export default Scene
