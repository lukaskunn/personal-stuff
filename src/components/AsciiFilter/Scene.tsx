'use client'
import React from 'react'
import { Canvas} from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { EffectComposer } from '@react-three/postprocessing'
import Model from './Model'
import ASCIIEffect from './AsciiEffect'
import { useControls } from 'leva'

const Scene = () => {
    const { density, fontSize, cellSize, color, invert } = useControls({
        density: {
            value: "Ñ@#WMB%$&O08GCLft1i;:,. ",
            label: "Density string",
        },
        fontSize: {
            value: 54,
            label: "Font Size",
            min: 1,
            max: 100,
        },
        cellSize: {
            value: 9,
            label: "Cell Size",
            min: 1,
            max: 100,
        },
        color: {
            value: "white",
            label: "Color",
        },
        invert: {
            value: true,
            label: "Invert",
        },
    })

    // const density = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\|()1{}[]?-_+~<>i!lI;:,\"^`'. "

    const asciiEffect = React.useMemo(() => new ASCIIEffect({
        characters: density,
        fontSize: fontSize,
        cellSize: cellSize,
        color: color,
        invert: invert,
    }), [cellSize, color, density, fontSize, invert]);

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