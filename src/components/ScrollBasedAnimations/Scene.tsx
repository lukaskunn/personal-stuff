'use client'
import React from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import Model from './Model'

import styles from "./ScrollBasedAnimations.module.scss"

const Scene = () => {

  return (
    <Canvas style={{background: "transparent", position: "absolute", pointerEvents: "none", top: "0px", zIndex: 1}} className={styles["scene-canvas"]}>
        <directionalLight position={[0, 3, 2]} intensity={3} />
        <Environment preset="city" />
        <Model />
    </Canvas>
  )
}

export default Scene