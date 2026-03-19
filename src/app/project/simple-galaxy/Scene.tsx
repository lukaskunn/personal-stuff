'use client'
import React from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import Model from './Model'
import { type GalaxyProps } from './GalaxyControls'

const Scene = ({ galaxyProps }: { galaxyProps: GalaxyProps }) => {
  return (
    <Canvas style={{ background: "black" }}>
      <directionalLight position={[0, 3, 2]} intensity={3} />
      <Environment preset="city" />
      <Model galaxyProps={galaxyProps} />
    </Canvas>
  )
}

export default Scene
