'use client'
import React from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import Model from './Model'
import { type TorusMaterialProps } from './TorusControls'

const Scene = ({ materialProps }: { materialProps: TorusMaterialProps }) => {
  return (
    <Canvas style={{ background: "black" }}>
      <directionalLight position={[0, 3, 2]} intensity={3} />
      <Environment preset="city" />
      <Model materialProps={materialProps} />
    </Canvas>
  )
}

export default Scene
