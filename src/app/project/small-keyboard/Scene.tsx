'use client'
import React from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import Model from './Model'
import { type KeyboardProps } from './KeyboardControls'

const Scene = ({ keyboardProps }: { keyboardProps: KeyboardProps }) => {
  return (
    <Canvas style={{ background: "black" }}>
      <directionalLight position={[0, 3, 2]} intensity={keyboardProps.lightIntensity} />
      <Environment preset="city" />
      <Model keyboardProps={keyboardProps} />
    </Canvas>
  )
}

export default Scene
