'use client'
import React from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import Model from './Models'
import { type SimpleItemsProps } from './SimpleItemsControls'

const Scene = ({ simpleItemsProps }: { simpleItemsProps: SimpleItemsProps }) => {
  return (
    <Canvas style={{ background: "black" }}>
      <directionalLight position={[0, 3, 2]} intensity={3} />
      <Environment preset="city" />
      <Model simpleItemsProps={simpleItemsProps} />
    </Canvas>
  )
}

export default Scene
